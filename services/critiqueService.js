const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function clampScore(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return 70;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function imageToBase64(imagePath) {
  const absolutePath = path.isAbsolute(imagePath)
    ? imagePath
    : path.join(process.cwd(), imagePath);

  const ext = path.extname(absolutePath).toLowerCase();

  const mimeType =
    ext === '.png' ? 'image/png'
    : ext === '.webp' ? 'image/webp'
    : 'image/jpeg';

  const base64 = fs.readFileSync(absolutePath, 'base64');

  return `data:${mimeType};base64,${base64}`;
}

function formatPhotoSettings(photoSettings) {
  if (!photoSettings) {
    return 'No EXIF/camera settings were found in the uploaded image.';
  }

  return `
Camera make: ${photoSettings.camera_make || 'Unknown'}
Camera model: ${photoSettings.camera_model || 'Unknown'}
Lens: ${photoSettings.lens_model || 'Unknown'}
Aperture: ${photoSettings.aperture || 'Unknown'}
Shutter speed: ${photoSettings.shutter_speed || 'Unknown'}
ISO: ${photoSettings.iso || 'Unknown'}
Focal length: ${photoSettings.focal_length || 'Unknown'}
Exposure mode: ${photoSettings.exposure_mode || 'Unknown'}
White balance: ${photoSettings.white_balance || 'Unknown'}
Flash: ${photoSettings.flash || 'Unknown'}
`;
}

function buildPrompt({ user, caption, challenge, photoSettings }) {
  return `
You are Sightline, an AI photography mentor for complete beginners.

The goal is NOT to judge the photo harshly.
The goal is to help the user understand how to take a better photo next time.

Sightline's product direction:
- Teach beginners how to see light, composition and story.
- Explain camera settings in simple language.
- Give one clear thing to try next.
- Avoid advanced jargon unless you explain it simply.

User profile:
- Experience level: ${user?.experience_level || 'Beginner'}
- Preferred style: ${user?.preferred_style || 'Not specified'}
- Goal: ${user?.goal || 'Improve photography'}
- Camera from onboarding: ${user?.camera || 'Unknown'}

Challenge:
- Title: ${challenge?.title || 'No challenge selected'}
- Description: ${challenge?.description || 'No description'}
- Focus area: ${challenge?.focus_area || 'Composition'}

User intention/caption:
${caption || 'No caption provided'}

Actual photo settings from EXIF:
${formatPhotoSettings(photoSettings)}

Return ONLY valid JSON with this structure:
{
  "composition_score": number,
  "lighting_score": number,
  "storytelling_score": number,
  "technical_score": number,
  "feedback_text": "string",
  "next_task": "string"
}

Feedback format:
Use this exact structure inside feedback_text:

What works:
...

Why the photo looks like this:
...

Camera lesson:
...

Try this setting next time:
...

Important rules:
- Write for a beginner who may not know what ISO, aperture or shutter speed means.
- If EXIF settings are available, explain how they affected the image.
- If EXIF settings are missing, still give likely camera advice based on the image.
- Give practical settings advice, but do not pretend to know exact settings if they are missing.
- Keep feedback_text under 220 words.
- Use simple language.
- No markdown bullets.
- No emojis.
- Scores must be 0-100.
- next_task must be one concrete photo exercise the user can try next.
`;
}

async function generateAICritique({ user, caption, challenge, image_path, photoSettings }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing in .env');
  }

  if (!image_path) {
    throw new Error('image_path is missing. AI critique needs an image.');
  }

  const imageUrl = imageToBase64(image_path);

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
    input: [
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: buildPrompt({
              user,
              caption,
              challenge,
              photoSettings
            }),
          },
          {
            type: 'input_image',
            image_url: imageUrl,
          },
        ],
      },
    ],
  });

  let parsed;

  try {
    parsed = JSON.parse(response.output_text);
  } catch (error) {
    console.error('Raw AI response:', response.output_text);
    throw new Error('Could not parse AI response as JSON.');
  }

  return {
    composition_score: clampScore(parsed.composition_score),
    lighting_score: clampScore(parsed.lighting_score),
    storytelling_score: clampScore(parsed.storytelling_score),
    technical_score: clampScore(parsed.technical_score),
    feedback_text: parsed.feedback_text || 'No feedback generated.',
    next_task: parsed.next_task || 'Take the same photo again, but change one camera setting deliberately.',
  };
}

module.exports = { generateAICritique };