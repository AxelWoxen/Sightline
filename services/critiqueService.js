function scoreAroundFocus(focusArea, currentArea) {
  const base = Math.floor(Math.random() * 17) + 70;
  const focusPenalty = focusArea === currentArea ? 8 : 0;
  return Math.max(58, base - focusPenalty);
}

function getFocusTip(focusArea) {
  const tips = {
    Composition: 'Before pressing the shutter, simplify the frame and decide exactly where the viewer should look first.',
    Lighting: 'Look for one clear light direction and move your subject or angle until the light supports the mood.',
    Storytelling: 'Include one detail that explains what is happening, not just what the scene looks like.',
    Technical: 'Slow down for one second and check focus, motion blur and distractions around the edges of the frame.'
  };

  return tips[focusArea] || 'Make one deliberate choice before shooting instead of reacting too quickly.';
}

function generateMockCritique({ user, caption, challenge }) {
  const style = user.preferred_style || 'your selected style';
  const level = user.experience_level || 'Beginner';
  const goal = user.goal || 'become more intentional with your photography';
  const camera = user.camera || 'your current camera or phone';
  const challengeTitle = challenge?.title || 'your selected challenge';
  const focusArea = challenge?.focus_area || 'Composition';

  const composition_score = scoreAroundFocus(focusArea, 'Composition');
  const lighting_score = scoreAroundFocus(focusArea, 'Lighting');
  const storytelling_score = scoreAroundFocus(focusArea, 'Storytelling');
  const technical_score = scoreAroundFocus(focusArea, 'Technical');

  const intentionText = caption
    ? `Your note was: "${caption}". That gives the image a clearer intention and makes the critique more useful.`
    : 'Next time, add one sentence about what you wanted the viewer to notice. That will make the feedback sharper.';

  const feedback_text = [
    `What works: This mock critique is based on your ${level.toLowerCase()} profile, ${style}, and the challenge "${challengeTitle}". The image is being judged through the lens of ${focusArea.toLowerCase()}, not just as a generic photo.`,
    intentionText,
    `What to improve: ${getFocusTip(focusArea)} Since you use ${camera}, the advice should eventually become even more practical when real AI is connected.`,
    `Why it matters: Your stated goal is to ${goal}. The point of Sightline is not only to score photos, but to help you learn to see one specific thing better each time.`
  ].join(' ');

  const next_task = `Repeat the same challenge once more, but make one deliberate ${focusArea.toLowerCase()} decision before taking the photo.`;

  return {
    composition_score,
    lighting_score,
    storytelling_score,
    technical_score,
    feedback_text,
    next_task,
  };
}

module.exports = { generateMockCritique };
