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

function buildPrompt({ user, caption, challenge, photoSettings }) {

  const hasExif = photoSettings && (
    photoSettings.shutter_speed ||
    photoSettings.iso ||
    photoSettings.aperture
  );

  const cameraInfo = user?.camera || 'Unknown camera';

  const flashFired = photoSettings?.flash &&
    typeof photoSettings.flash === 'string' &&
    photoSettings.flash.toLowerCase().includes('fired');

  const cameraAdvice = `
Based on your knowledge of "${cameraInfo}":
- First, determine if this is a compact/phone (no manual controls) or a camera with manual settings.
- If compact or phone: only suggest what the user CAN control — flash on/off, distance, composition, timing, zoom.
- If it has manual controls: give ONE concrete setting recommendation with exact values if the photo has a clear technical problem. Example: "skru ISO ned til 400" or "sett lukker til 1/500s". Explain in one plain sentence what that setting does.
- Never suggest a setting that doesn't exist on this specific camera.
- Never assume — if you are unsure what the camera can do, default to composition and light advice only.
`;

  return `
You are Sightline — a photography mentor for complete beginners.

Your tone is like a knowledgeable friend looking at the photo with them, not a teacher grading their work.

ABSOLUTE RULES:
- Never suggest changing aperture, ISO or shutter speed manually if the camera is a compact or phone.
- Never give more than ONE actionable suggestion. One. Not two. Not three.
- Always reference something SPECIFIC in this actual photo — never write advice that could apply to any photo.
- If the user had no caption, assume they were trying to capture what is obviously in the scene.
- If flash fired without the user choosing it: explain what the flash DID to this specific image, not just that they should turn it off. Help them understand cause and effect.
- Scores: 70 = a solid beginner photo. Not everything needs to be a problem.
- Write in Norwegian.
- No markdown. No emojis. No bullet points.

Camera: ${cameraInfo}
${cameraAdvice}

${flashFired ? `Note: Flash fired in this photo. Explain specifically what the flash did to this image — did it create white blobs on nearby objects? Did it wash out the subject? Did it create red-eye? Be specific about what happened physically, not just "flash can cause problems."` : ''}

User:
- Experience: ${user?.experience_level || 'Beginner'}
- Style: ${user?.preferred_style || 'Not specified'}
- Goal: ${user?.goal || 'Improve photography'}

Challenge:
- Title: ${challenge?.title || 'None'}
- Focus area: ${challenge?.focus_area || 'General'}

What the user was trying to capture:
"${caption || 'No caption — infer from the image.'}"

${hasExif
  ? `Settings used:
- Shutter: ${photoSettings.shutter_speed || 'Unknown'} — how long light hit the sensor
- Aperture: ${photoSettings.aperture || 'Unknown'} — how wide the lens opening was
- ISO: ${photoSettings.iso || 'Unknown'} — sensor sensitivity to light
- Flash: ${photoSettings.flash || 'Unknown'}
- Focal length: ${photoSettings.focal_length || 'Unknown'}

Reference these settings when explaining why the photo looks the way it does. Explain in plain language what each relevant setting actually did to this image.`
  : `No EXIF data. Analyze what you see in the image to explain likely camera behavior.`}

Return ONLY valid JSON — no markdown, no backticks:
{
  "composition_score": number,
  "lighting_score": number,
  "storytelling_score": number,
  "technical_score": number,
  "feedback_text": "string",
  "next_task": "string"
}

feedback_text structure — use these exact Norwegian headers:

Hva fungerer:
[Be specific. Name actual elements in the photo — the red chair, the church spire, the snowflakes. 1-2 sentences max.]

Hva som skjedde teknisk:
[Explain the single most important technical thing that shaped this photo. If flash fired, explain exactly what it hit and what it caused. If the scene is dark, explain why. Use cause-and-effect language: "Fordi blitsen din traff snøfnugg rett foran linsen, ble de hvite og store i stedet for gjennomsiktige." Never vague.]

Hva du faktisk kan gjøre med ${cameraInfo}:
[Be honest about what this camera can and cannot do. If they can't change aperture — say so and redirect to what they CAN do instead.]

Prøv dette neste gang:
[ONE thing. Hyper-specific. Not "experiment with light." Example: "Neste gang det snør, skru av blitsen og hold kameraet helt stille i 2 sekunder — scenen har nok lys til det, og du slipper de hvite prikkene." Must be doable with their exact camera.]

next_task: one concrete exercise matched to their camera and skill level. Max 2 sentences.

Max 220 words total in feedback_text.
`;
}

function parseFeedbackSections(feedbackText) {
  const sections = { what_works: '', technical: '', camera: '', next_time: '' };
  if (!feedbackText) return sections;

  // Split on the known Norwegian headers whether they appear on their own line or inline.
  // Capture group keeps the header in the parts array so we can identify each section.
  const pattern = /(Hva fungerer:|Hva som skjedde teknisk:|Hva du faktisk kan gjøre[^:]*:|Prøv dette neste gang:)/;
  const parts = feedbackText.split(pattern);

  for (let i = 1; i < parts.length; i += 2) {
    const header = parts[i];
    const body = (parts[i + 1] || '').trim();
    if (header.startsWith('Hva fungerer')) {
      sections.what_works = body;
    } else if (header.startsWith('Hva som skjedde teknisk')) {
      sections.technical = body;
    } else if (header.startsWith('Hva du faktisk kan gjøre')) {
      sections.camera = body;
    } else if (header.startsWith('Prøv dette neste gang')) {
      sections.next_time = body;
    }
  }

  return sections;
}

async function generateAICritique({ user, caption, challenge, image_path, photoSettings }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing in .env');
  }

  if (!image_path) {
    throw new Error('image_path is missing. AI critique needs an image.');
  }

  const imageUrl = imageToBase64(image_path);

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: buildPrompt({ user, caption, challenge, photoSettings }) },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      }
    ],
    max_tokens: 1000
  });

  let parsed;

  try {
    const raw = response.choices[0].message.content;
    const clean = raw.replace(/```json|```/g, '').trim();
    parsed = JSON.parse(clean);
  } catch (error) {
    console.error('Raw AI response:', response.choices[0].message.content);
    throw new Error('Could not parse AI response as JSON.');
  }

  const sections = parseFeedbackSections(parsed.feedback_text);

  return {
    composition_score: clampScore(parsed.composition_score),
    lighting_score: clampScore(parsed.lighting_score),
    storytelling_score: clampScore(parsed.storytelling_score),
    technical_score: clampScore(parsed.technical_score),
    feedback_text: parsed.feedback_text || 'No feedback generated.',
    feedback_what_works: sections.what_works,
    feedback_technical: sections.technical,
    feedback_camera: sections.camera,
    feedback_next_time: sections.next_time,
    next_task: parsed.next_task || 'Ta samme bilde igjen, men endre én ting bevisst.',
  };
}

module.exports = { generateAICritique };