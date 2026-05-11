function randomScore(min = 62, max = 88) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMockCritique({ user, caption }) {
  const style = user.preferred_style || 'cinematic / street';
  const goal = user.goal || 'become more intentional with composition';

  const composition_score = randomScore();
  const lighting_score = randomScore();
  const storytelling_score = randomScore();
  const technical_score = randomScore();

  const feedback_text = `Dette er en MVP-feedback basert på profilen din. Siden du liker ${style}, vurderer Sightline bildet ut fra stemning, tydelig motiv og visuell retning. Bildet fungerer best når blikket får et klart sted å lande. ${caption ? `Notatet ditt var: "${caption}". Det gir bildet en tydeligere intensjon.` : 'Legg gjerne inn en kort intensjon neste gang, så kan feedbacken bli mer presis.'} Det viktigste forbedringspunktet nå er å gjøre hovedmotivet enda tydeligere gjennom lys, avstand eller vinkel.`;

  const next_task = `Neste gang: Ta samme type bilde, men bestem deg for én ting før du skyter: Hva skal seeren legge merke til først? Målet ditt er å ${goal}.`;

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
