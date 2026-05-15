/**
 * challengeGeneratorService
 *
 * Generates 3 personalised photography challenges for a user via OpenAI.
 *
 * Parameters:
 *   user            — user row (experience_level, preferred_style, camera, biggest_challenge)
 *   recentWeaknesses — string[] of up to 2 focus-area names the user scored lowest on
 *
 * Returns:
 *   Array of 3 challenge objects:
 *   { title, description, focus_area, difficulty, why_this_challenge }
 *
 * Throws on API failure — callers must provide a fallback.
 */

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateChallengesForUser(user, recentWeaknesses = []) {
  const weakText = recentWeaknesses.length
    ? `Recent weak areas (lowest scores): ${recentWeaknesses.join(', ')}.`
    : 'No critique history yet.';

  const prompt = `You are a photography coach creating personalised practice challenges for a beginner.

User profile:
- Name: ${user.name}
- Experience: ${user.experience_level || 'Beginner'}
- Style focus: ${user.preferred_style || 'Landskap'}
- Camera: ${user.camera || 'unknown'}
- Biggest self-reported challenge: ${user.biggest_challenge || 'not specified'}
- ${weakText}

Create exactly 3 challenges. Rules:
- One easy (Nybegynner), one medium (Litt øvelse), one harder (Klar for mer)
- Each challenge must be actionable outdoors with their specific camera
- focus_area must be one of: Lys, Komposisjon, Timing, Motiv
- If the user has weak areas, at least one challenge should target them
- why_this_challenge: one sentence in Norwegian explaining why this suits THIS user specifically
- Write title and description in Norwegian
- Description max 2 sentences

Return ONLY valid JSON array, no markdown:
[
  {
    "title": "string",
    "description": "string",
    "focus_area": "Lys|Komposisjon|Timing|Motiv",
    "difficulty": "Nybegynner|Litt øvelse|Klar for mer",
    "why_this_challenge": "string"
  }
]`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 600,
  });

  const raw = response.choices[0].message.content;
  const clean = raw.replace(/```json|```/g, '').trim();
  const challenges = JSON.parse(clean);

  if (!Array.isArray(challenges) || challenges.length === 0) {
    throw new Error('Challenge generator returned invalid structure');
  }

  return challenges.slice(0, 3);
}

module.exports = { generateChallengesForUser };
