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

function buildPrompt({ user, caption, challenge }) {
  return `
You are Sightline, an AI photography mentor.

Give practical, honest, beginner-friendly photography feedback.

User profile:
- Experience level: ${user?.experience_level || 'Beginner'}
- Preferred style: ${user?.preferred_style || 'Not specified'}
- Goal: ${user?.goal || 'Improve photography'}
- Camera: ${user?.camera || 'Unknown'}

Challenge:
- Title: ${challenge?.title || 'No challenge selected'}
- Description: ${challenge?.description || 'No description'}
- Focus area: ${challenge?.focus_area || 'Composition'}

User caption:
${caption || 'No caption provided'}

Return ONLY valid JSON with this structure:
{
  "composition_score": number,
  "lighting_score": number,
  "storytelling_score": number,
  "technical_score": number,
  "feedback_text": "string",
  "next_task": "string"
}

Rules:
- Scores must be 0-100.
- Feedback should be specific to the actual image.
- Do not be generic.
- Mention what works, what to improve, and why it matters.
- Keep feedback_text under 180 words.
- next_task should be one concrete thing the user can try next time.
`;
}

async function generateAICritique({ user, caption, challenge, image_path }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY mangler i .env');
  }

  if (!image_path) {
    throw new Error('image_path mangler. AI-kritikk trenger et bilde.');
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
            text: buildPrompt({ user, caption, challenge }),
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
  } catch (err) {
    throw new Error(`Kunne ikke lese AI-svaret som JSON: ${response.output_text}`);
  }

  return {
    composition_score: clampScore(parsed.composition_score),
    lighting_score: clampScore(parsed.lighting_score),
    storytelling_score: clampScore(parsed.storytelling_score),
    technical_score: clampScore(parsed.technical_score),
    feedback_text: parsed.feedback_text || 'No feedback generated.',
    next_task: parsed.next_task || 'Take one more version of the same photo with a clearer intention.',
  };
}

module.exports = { generateAICritique };