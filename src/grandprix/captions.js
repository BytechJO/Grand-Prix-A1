// Silence gaps deliberately have no highlighted word. Playback rate and seeking
// use the media clock, never a duration-based estimate or a separate timer.
export function activeWordAt(words, time) {
  return words.findIndex(word => time >= word.start && time < word.end);
}
