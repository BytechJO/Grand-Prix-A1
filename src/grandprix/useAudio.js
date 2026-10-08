import { useEffect, useRef, useState } from 'react';
import assets from './assets.json';

export default function useAudio() {
  const ref = useRef(null);
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [rate, setRate] = useState(1);
  const [level, setLevel] = useState(1);
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    ref.current = audio;
    let frame;
    const tick = () => { if (!audio.paused) setTime(audio.currentTime); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    const events = {
      play: () => setPlaying(true), pause: () => setPlaying(false),
      timeupdate: () => setTime(audio.currentTime),
      loadedmetadata: () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0),
      ended: () => { setPlaying(false); audio.currentTime = 0; },
      error: () => { setPlaying(false); setError('Impossible de lire cet enregistrement. Réessaie.'); },
    };
    for (const [name, callback] of Object.entries(events)) audio.addEventListener(name, callback);
    return () => {
      cancelAnimationFrame(frame);
      audio.pause();
      for (const [name, callback] of Object.entries(events)) audio.removeEventListener(name, callback);
      audio.removeAttribute('src'); audio.load(); ref.current = null;
    };
  }, []);
  function select(id) {
    const audio = ref.current;
    const selected = assets.tracks.find(item => item.id === id);
    if (!audio || !selected || audio.dataset.track === id) return;
    audio.pause(); audio.src = selected.src; audio.dataset.track = id;
    setTrack(selected); setTime(0); setDuration(0); setError('');
  }
  async function play(id) {
    const audio = ref.current;
    const selected = assets.tracks.find(item => item.id === id);
    if (!audio || !selected) return;
    if (audio.dataset.track === id && !audio.paused) { audio.pause(); return; }
    if (audio.dataset.track !== id) {
      audio.pause(); audio.src = selected.src; audio.dataset.track = id;
      setTrack(selected); setTime(0); setDuration(0);
    }
    setError('');
    try { await audio.play(); }
    catch (e) { if (e.name !== 'AbortError') setError('La lecture n’a pas démarré. Appuie de nouveau sur Lecture.'); }
  }
  function stop() {
    if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; }
  }
  return { track, playing, time, duration, error, play, stop, select, rate, level,
    seek: value => { if (ref.current) { ref.current.currentTime = value; setTime(value); } },
    speed: value => { if (ref.current) { ref.current.playbackRate = value; setRate(value); } },
    volume: value => { if (ref.current) { ref.current.volume = value; setLevel(value); } },
    close: () => { stop(); setTrack(null); if (ref.current) ref.current.dataset.track = ''; },
  };
}
