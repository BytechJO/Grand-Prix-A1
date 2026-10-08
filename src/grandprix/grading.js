// Keep French accents significant; accept typographic apostrophes, spacing,
// hyphens and terminal punctuation without penalizing the learner.
export function normalize(value) {
  return String(value ?? '').normalize('NFC').toLocaleLowerCase('fr')
    .replace(/[’‘`]/g, "'").replace(/[‐‑–—]/g, '-')
    .replace(/\s*'\s*/g, "'").replace(/\s*-\s*/g, '-')
    .replace(/[.,!?;:]+/g, ' ').replace(/\s+/g, ' ').trim();
}
export function grade(activity, values) {
  if (activity.type === 'open') return null;
  const normalized = activity.fields.map((_, i) => normalize(values[i]));
  const correct = activity.fields.map((field, i) => Boolean(normalized[i]) &&
    field.answers.some(answer => normalize(answer) === normalized[i]) &&
    (!activity.unique || normalized.filter(value => value === normalized[i]).length === 1));
  return { correct, score: correct.filter(Boolean).length, total: correct.length,
    points: correct.filter(Boolean).length * (activity.points || 1) };
}
export function readSaved(key, fallback) {
  try { return JSON.parse(localStorage.getItem(`grandprix:a1:${key}`)) ?? fallback; }
  catch { return fallback; }
}
export function writeSaved(key, value) {
  try { localStorage.setItem(`grandprix:a1:${key}`, JSON.stringify(value)); return true; }
  catch { return false; }
}
