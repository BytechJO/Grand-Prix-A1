import { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaTimes, FaUndo } from 'react-icons/fa';
import { TbMessageCircle } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';
import timings from './wordTimings.json';
import { activeWordAt } from './captions';
const clock = n => `${Math.floor(n / 60)}:${String(Math.floor(n % 60)).padStart(2, '0')}`;

export default function AudioPlayer({ audio, embedded = false }) {
  const [text, setText] = useState(true);
  const [settings, setSettings] = useState(false);
  const active = useRef(null);
  const words = timings[audio.track?.id]?.words || [];
  const index = activeWordAt(words, audio.time);
  useEffect(() => { active.current?.scrollIntoView({ block:'nearest', inline:'nearest' }); }, [index]);
  if (!audio.track) return null;
  return <section className={`gp-audio publisher-player ${embedded?'embedded':''}`} aria-label="Lecteur audio">
    {!embedded && <button className="player-close" onClick={audio.close} aria-label="Fermer le lecteur"><FaTimes /></button>}
    <div className="top-row">
      <span className="audio-time">{clock(audio.time)}</span>
      <input className="audio-slider" aria-label="Position audio" type="range" min="0" max={audio.duration || 0} step="0.01" value={Math.min(audio.time,audio.duration || 0)} onChange={e=>audio.seek(Number(e.target.value))} />
      <span className="audio-time">{clock(audio.duration)}</span>
    </div>
    <div className="bottom-row">
      <button className="round-btn" onClick={()=>setText(!text)} aria-label="Transcription synchronisée" aria-expanded={text}><TbMessageCircle size={32}/></button>
      <button className="play-btn2" onClick={()=>audio.play(audio.track.id)} aria-label={audio.playing?'Pause':'Lecture'}>{audio.playing?<FaPause size={24}/>:<FaPlay size={24}/>}</button>
      <button className="round-btn" onClick={()=>setSettings(!settings)} aria-label="Réglages audio" aria-expanded={settings}><IoMdSettings size={32}/></button>
    </div>
    {settings && <div className="gp-player-settings">
      <button onClick={()=>audio.seek(0)} aria-label="Revenir au début"><FaUndo /></button>
      <label>Vitesse <select aria-label="Vitesse audio" value={audio.rate} onChange={e=>audio.speed(Number(e.target.value))}>{[.5,.75,1,1.25,1.5,2].map(n=><option key={n} value={n}>{n}×</option>)}</select></label>
      <label>Volume <input aria-label="Volume" type="range" min="0" max="1" step=".05" value={audio.level} onChange={e=>audio.volume(Number(e.target.value))}/></label>
    </div>}
    {text && <div className="gp-word-transcript" aria-label="Texte de l’enregistrement">{words.map((word,i)=><span key={i} ref={i===index?active:null} className={i===index?'spoken-word':''} aria-current={i===index?'true':undefined}>{word.text}{' '}</span>)}</div>}
    {audio.error && <p role="alert" className="gp-error">{audio.error}</p>}
  </section>;
}
