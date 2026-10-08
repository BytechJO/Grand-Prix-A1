import { useEffect, useRef, useState } from 'react';
import { FaCheck, FaUndo, FaEye, FaKey } from 'react-icons/fa';
import assets from './assets.json';
import { unit1, bookLabels, sections } from './unit1';
import { grade, readSaved, writeSaved } from './grading';
import useAudio from './useAudio';
import AudioPlayer from './AudioPlayer';
import exerciseMedia from './exerciseMedia.json';
import TopNavbar from '../component/Book/Navbar/TopNavbar';
import LeftSidebar from '../component/Book/Sidebars/LeftSidebar';
import RightSidebar from '../component/Book/Sidebars/RightSidebar';
import logo from '../assets/unit1/imgs/Page 01/PMAAlogo.svg';
import menu from '../assets/unit1/imgs/Page 01/menu.svg';
import home from '../assets/unit1/imgs/Page 01/home.svg';
import next from '../assets/unit1/imgs/Page 01/next btn.svg';
import back from '../assets/unit1/imgs/Page 01/back btn.svg';
import fullScreen from '../assets/unit1/imgs/Page 01/fullscreen.svg';
import zoomIn from '../assets/unit1/imgs/Page 01/zoom in.svg';
import zoomOut from '../assets/unit1/imgs/Page 01/zoom out.svg';
import onePage from '../assets/unit1/imgs/Page 01/one page.svg';
import openBook from '../assets/unit1/imgs/Page 01/open-book.svg';
import audioButton from '../assets/unit1/imgs/Page 01/Audio btn.svg';
import exerciseButton from '../assets/unit1/imgs/Page 01/Arrow.svg';
import '../component/AudioWithCaption.css';
import './grandprix.css';
import './right-identity.css';

const lookupPage = (book, page) => assets.pages.find(item => item.book === book && item.page === page);
const crossStarts = [5,2,5,1,2,1,2,0,4,3];

function Crossword({ activity, values, setValue, result, revealed }) {
  return <div className="gp-crossword" aria-label="Grille des nationalités">
    <p className="gp-hint">Une lettre par case. Les cases bleues forment un mot vertical.</p>
    <div className="gp-cross-example">Exemple : <strong>canadien</strong></div>
    {activity.fields.map((field,i) => <div className="gp-cross-row" key={field.label}>
      <label>{field.label}</label>
      <div className="gp-cross-cells" style={{ paddingLeft: `${crossStarts[i] * 27}px` }}>
        {Array.from(field.answers[0]).map((letter,j) => <input key={j} aria-label={`${field.label} · lettre ${j+1}`} maxLength={1}
          className={`${j + crossStarts[i] === 5 ? 'blue' : ''} ${result ? result.correct[i] ? 'correct' : 'incorrect' : ''}`}
          value={revealed || letter === '-' ? letter : (values[i] || '')[j]?.trim() || ''} readOnly={revealed || letter === '-'}
          onChange={e => { const chars = (values[i] || '').padEnd(field.answers[0].length,' ').split(''); chars[j] = e.target.value || ' '; if (field.answers[0].includes('-')) chars[3]='-'; setValue(i,chars.join('')); if(e.target.value) e.target.nextElementSibling?.focus(); }}
          onKeyDown={e => { if(e.key==='Backspace' && !e.currentTarget.value) e.currentTarget.previousElementSibling?.focus(); }} />)}
      </div>
      {result && <small className={result.correct[i]?'gp-success':'gp-error'}>{result.correct[i]?'✓ Correct':'À revoir'}</small>}
    </div>)}
  </div>;
}

function Exercise({ activity, onClose, audio, onSaved, onActivity }) {
  const dialog = useRef(null);
  const [values, setValues] = useState(() => {
    const saved = readSaved(activity.id, {});
    return saved?.values && typeof saved.values === 'object' && !Array.isArray(saved.values) ? saved.values : {};
  });
  const [result, setResult] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const media = exerciseMedia[activity.id];
  const section = activity.book==='student' && activity.page>=5 && activity.page<=20 ? 'ABCD'[Math.floor((activity.page-5)/4)] : null;
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    element.showModal();
    return () => { element.close(); previous?.focus(); };
  }, []);
  function persist(next, completed = false) {
    const ok = writeSaved(activity.id, { values: next, completed, updatedAt: Date.now() });
    if (!ok) setMessage('Le stockage local est indisponible. Garde cette fenêtre ouverte pour conserver tes réponses.');
    onSaved();
  }
  function setValue(index, value) {
    const next = { ...values, [index]: value }; setValues(next); setResult(null); setMessage(''); persist(next);
  }
  function check() {
    if (activity.type === 'open') {
      if (!Object.values(values).some(value => String(value).trim())) { setMessage('Écris ta réponse avant de la comparer au modèle.'); return; }
      setRevealed(true); persist(values,true); setMessage('Compare ta production au modèle. Une réponse personnelle ne reçoit pas de note automatique.'); return;
    }
    if (activity.fields.some((_,i) => !String(values[i] || '').trim() || (activity.type === 'crossword' && String(values[i]).includes(' ')))) {
      setMessage('Complète toutes les réponses avant de vérifier.'); return;
    }
    const next = grade(activity,values); setResult(next); setMessage(''); persist(values,next.score===next.total);
  }
  function reset() { setValues({}); setResult(null); setRevealed(false); setMessage(''); persist({}); }
  const prompts = activity.prompts || ['Ma réponse / mes notes'];
  return <dialog className="gp-dialog" ref={dialog} onCancel={e => { e.preventDefault(); onClose(); }} aria-labelledby="gp-exercise-title">
    <div className="right-activity-nav"><button onClick={() => onActivity(-1)} disabled={unit1.filter(a=>a.book===activity.book).findIndex(a=>a.id===activity.id)===0}>‹ Previous activity</button><button onClick={() => onActivity(1)} disabled={unit1.filter(a=>a.book===activity.book).at(-1).id===activity.id}>Next activity ›</button><button onClick={onClose} aria-label="Close activity" className="right-close">×</button></div>
    <header className="gp-dialog-header"><h2 id="gp-exercise-title">{section && <b className="activity-section">{section}</b>}<b className="activity-number">{activity.number.match(/^\d+$/)?activity.number:''}</b>{activity.title}</h2></header>
    <div className="gp-dialog-body">
      <div className="gp-answer-pane">
        {activity.audio && <AudioPlayer key={activity.audio} audio={audio} embedded />}
        {media?.layout==='context' && <div className="gp-exercise-context">{media.images.map((image,i)=><img key={image.src} src={image.src} alt={`Support de l’activité ${activity.number}${media.images.length>1?` · ${i+1}`:''}`} />)}</div>}
        {activity.context && <blockquote>{activity.context}</blockquote>}
        {activity.hint && <p className="gp-hint">{activity.hint}</p>}
        {activity.type==='open' ? <>
          <p className="gp-prompt">{activity.prompt}</p><p className="gp-open-label">Expression libre · modèle de réponse</p>
          {prompts.map((prompt,i) => <label className="gp-field" key={prompt}><span>{prompt}</span><textarea value={values[i] || ''} onChange={e => setValue(i,e.target.value)} rows={prompts.length>1?2:7} /></label>)}
          {revealed && <section className="gp-model"><h3>Exemple / pistes de réponse</h3><p>{activity.model}</p><small>Adapte ce modèle à tes informations. Plusieurs réponses sont possibles.</small></section>}
        </> : activity.type==='crossword' ? <Crossword activity={activity} values={values} setValue={setValue} result={result} revealed={revealed} /> : <div className={`gp-exercise-fields ${media?.layout==='cards'?'picture-cards':''}`}>{activity.fields.map((field,i) => <label className={`gp-field ${result ? result.correct[i]?'correct':'incorrect':''}`} key={i}>
          {media?.layout==='cards' && <img className="gp-exercise-card" src={media.images[i].src} alt={field.label} />}
          <span><b className="gp-field-number">{i+1}</b>{field.label}</span>
          {field.options ? <select aria-label={field.label} value={revealed?field.answers[0]:values[i] || ''} disabled={revealed} onChange={e => setValue(i,e.target.value)}><option value="">Choisir…</option>{field.options.map(option => <option key={option}>{option}</option>)}</select>
            : <input aria-label={field.label} value={revealed?field.answers[0]:values[i] || ''} readOnly={revealed} autoComplete="off" spellCheck={false} onChange={e => setValue(i,e.target.value)} />}
          {result && <small>{result.correct[i]?'✓ Correct':'↺ À revoir'}</small>}
          {revealed && field.answers.length>1 && <small className="gp-alternatives">Aussi accepté : {field.answers.slice(1).join(' / ')}</small>}
        </label>)}</div>}
        <div role="status" aria-live="polite">{message && <p className="gp-message">{message}</p>}{result && <p className={`gp-score ${result.score===result.total?'perfect':''}`}>{result.score===result.total?'Bravo !':'Continue, tu peux réessayer.'} · {result.score} / {result.total}{activity.points ? ` · ${result.points} / ${result.total*activity.points} points` : ''}</p>}{revealed && activity.type!=='open' && <p className="gp-message">Corrigé affiché. Appuie sur Réessayer pour recommencer.</p>}</div>
      </div>
    </div>
    <footer className="gp-dialog-footer"><span>{activity.source}</span><div><button className="gp-secondary" onClick={reset}><FaUndo /> Réessayer</button><button className="gp-secondary" onClick={() => {setRevealed(true);setResult(null);setMessage('');}}><FaEye /> {activity.type==='open'?'Voir le modèle':'Voir la solution'}</button><button className="gp-primary" disabled={revealed && activity.type!=='open'} onClick={check}><FaCheck /> {activity.type==='open'?'Comparer':'Vérifier'}</button></div></footer>
  </dialog>;
}

function pageActivities(page) {
  const items = unit1.filter(item => item.book===page.book && item.page===page.page);
  // DELF written comprehension starts on p.23 and continues at the top of p.24.
  if(page.book==='student' && page.page===24) items.unshift({...unit1.find(item=>item.id==='student-23-reading'),anchor:{x:10,y:11}});
  return items;
}

function Page({ page, onExercise, audio, savedVersion }) {
  const items = pageActivities(page);
  return <article className="gp-page" data-page={page.page} aria-label={`${bookLabels[page.book]} page ${page.page}`}>
    <img className="gp-page-image" src={page.image} alt={`${bookLabels[page.book]} · page ${page.page}`} draggable="false" />
    {items.map(item => {
      const anchor = item.anchor || page.anchors.find(a => a.number===Number(item.number));
      if (!anchor) return null;
      const completed = Boolean(savedVersion >= 0 && readSaved(item.id,{})?.completed);
      const playing = audio.track?.id===item.audio && audio.playing;
      return <div className="gp-hotspots" key={item.id} style={{ left:`${Math.max(.2,anchor.x-(item.audio?8.6:4.9))}%`,top:`${anchor.y}%` }}>
        {item.audio && <button className={`gp-hotspot audio ${playing?'playing':''}`} title={`Écouter · activité ${item.number}`} aria-label={`Écouter page ${page.page} activité ${item.number}`} onClick={() => audio.play(item.audio)}><img src={audioButton} alt="" /></button>}
        <button className={`gp-hotspot exercise ${completed?'completed':''}`} title={`Ouvrir l’activité ${item.number}`} aria-label={`Exercice page ${page.page} activité ${item.number}`} onClick={()=>onExercise(item)}><img src={exerciseButton} alt="" /></button>
      </div>;
    })}
  </article>;
}

export default function GrandPrixBook() {
  const [book,setBook] = useState('student');
  const [number,setNumber] = useState(4);
  const [showCover,setShowCover] = useState(true);
  const [spread,setSpread] = useState(window.innerWidth > 1200);
  const [isMobile,setIsMobile] = useState(window.innerWidth <= 1200);
  const [mobileTabsOpen,setMobileTabsOpen] = useState(false);
  const [rightSidebar,setRightSidebar] = useState(false);
  useEffect(() => { const resize = () => { setIsMobile(window.innerWidth <= 1200); if(window.innerWidth <= 1200) setSpread(false); }; window.addEventListener('resize',resize); return () => window.removeEventListener('resize',resize); }, []);
  const [zoom,setZoom] = useState(1);
  const [sidebar,setSidebar] = useState(false);
  const [active,setActive] = useState(null);
  const [savedVersion,setSavedVersion] = useState(0);
  const [pageInput,setPageInput] = useState('');
  const [notice,setNotice] = useState('');
  const audio = useAudio();
  const stage = useRef(null);
  const pages = assets.pages.filter(p=>p.book===book);
  const index = Math.max(0,pages.findIndex(p=>p.page===number));
  const visible = spread && !showCover ? pages.slice(index,index+2) : [pages[index]];
  useEffect(() => { writeSaved('location',{book,page:number}); },[book,number]);
  function navigate(page, targetBook=book) {
    if(!lookupPage(targetBook,page)) { setNotice(`Choisis une page entre ${pages[0].page} et ${pages.at(-1).page}.`); return; }
    audio.close(); setActive(null);setShowCover(false);setBook(targetBook);setNumber(page);setNotice('');setPageInput('');
    stage.current?.scrollTo({top:0,left:0});
  }
  function changeBook(next) { navigate(assets.pages.find(p=>p.book===next).page,next); setShowCover(next==='student'); setZoom(1); }
  function step(direction) { if(showCover) { navigate(4); return; } if(book==='student' && index===0 && direction<0) { audio.close();setShowCover(true);return; } navigate(pages[Math.min(pages.length-1,Math.max(0,index+direction*(spread?2:1)))].page); }
  async function fullscreen() { try { if(document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch {setNotice('Le plein écran n’est pas disponible dans ce navigateur.');} }
  function closeExercise() { audio.close();setActive(null); }
  function openExercise(item) { if(item.audio) audio.select(item.audio); else audio.close(); setActive(item); }
  const toc = book==='student' ? sections.map((s,i)=>({id:i,label:s.title,start:s.page,pages:(sections[i+1]?.page||26)-s.page})) : [{id:1,label:'Unit 1 · Se présenter',start:pages[0].page,pages:pages.length}];
  function changeActivity(direction) {
    const list=unit1.filter(a=>a.book===active.book);
    const item=list[list.findIndex(a=>a.id===active.id)+direction];
    if(item) { if(item.audio) audio.select(item.audio); else audio.close(); setActive(item); }
  }
  const iconControl=(name,src,action,selected=true)=><button aria-label={name} title={name} onClick={action}><img src={src} alt="" style={{opacity:selected?1:.4}} /></button>;
  return <main className="gp-app right-identity">
    <TopNavbar activeTab={book} setActiveTab={changeBook} logo={logo} menuIcon={menu} tabs={Object.entries(bookLabels).map(([id,label])=>({id,label}))} mobileTabsOpen={mobileTabsOpen} setMobileTabsOpen={setMobileTabsOpen} isMobile={isMobile} />
    <div className={`gp-stage ${spread?'spread':''}`} ref={stage} style={{'--zoom':zoom}}>
      <div className="gp-pages">{showCover ? <article className="gp-page gp-cover" aria-label="Couverture Grand Prix A1"><img className="gp-page-image" src="/grandprix/cover.png" alt="Grand Prix A1 · Méthode de français · Couverture" /></article> : visible.map(page=><Page key={`${book}-${page.page}`} page={page} onExercise={openExercise} audio={audio} savedVersion={savedVersion} />)}</div>
    </div>
    {!showCover && (index>0 || book==='student') && <button className="right-page-arrow previous" aria-label="Page précédente" onClick={()=>step(-1)}><img src={back} alt="" /></button>}
    {(showCover || index+(spread?2:1)<pages.length) && <button className="right-page-arrow next" aria-label="Page suivante" onClick={()=>step(1)}><img src={next} alt="" /></button>}
    {!active && audio.track && <AudioPlayer key={audio.track.id} audio={audio} />}
    <footer className="right-bottom-bar">
      <div className="right-bottom-left">{iconControl('Table of Contents',menu,()=>setSidebar(true))}{iconControl('Home',home,()=>changeBook(book))}</div>
      {iconControl('Zoom in',zoomIn,()=>setZoom(Math.min(2.4,zoom+.2)))}
      {iconControl('Reset zoom',zoomOut,()=>setZoom(1))}
      {iconControl('Fullscreen',fullScreen,fullscreen)}
      <form className="right-page-input" onSubmit={e=>{e.preventDefault();navigate(Number(pageInput));}}><input aria-label="Aller à la page" type="text" inputMode="numeric" placeholder={showCover?'Cover':visible.map(p=>p.page).join('-')} value={pageInput} onChange={e=>setPageInput(e.target.value)} /><span>| {pages.at(-1).page}</span></form>
      {!isMobile && <>{iconControl('Afficher une page',onePage,()=>setSpread(false),!spread)}{iconControl('Afficher deux pages',openBook,()=>setSpread(true),spread)}</>}
      <button className="right-key" aria-label="Icon Key" onClick={()=>setRightSidebar(true)}>{!isMobile && 'Icon Key'}<FaKey size={24} /></button>
    </footer>
    {notice && <div className="gp-notice" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="Fermer le message">×</button></div>}
    <LeftSidebar isOpen={sidebar} close={()=>setSidebar(false)} units={toc} goToPage={page=>navigate(page)} book={{cover:book==='student'?'/grandprix/cover.png':pages[0].image,title:`Grand Prix A1 ${bookLabels[book]}`,pages:pages.length}} />
    <RightSidebar isOpen={rightSidebar} close={()=>setRightSidebar(false)} menu={[{key:'audio',label:'Audio Button',icon:audioButton},{key:'exercise',label:'Arrow Button',icon:exerciseButton},{key:'prev',label:'Prev Button',icon:back},{key:'next',label:'Next Button',icon:next}]} />
    {active && <Exercise key={active.id} activity={active} audio={audio} onClose={closeExercise} onActivity={changeActivity} onSaved={()=>setSavedVersion(v=>v+1)} />}
  </main>;
}
