import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { unit1, transcripts } from '../src/grandprix/unit1.js';
import { grade, normalize } from '../src/grandprix/grading.js';
const assets = JSON.parse(readFileSync(new URL('../src/grandprix/assets.json', import.meta.url)));

test('all required pages, 13 recordings, and every activity anchor are present', () => {
  for (const [book,start,end] of [['student',4,25],['grammar',4,9],['teacher',4,19]]) {
    assert.deepEqual(assets.pages.filter(p=>p.book===book).map(p=>p.page), Array.from({length:end-start+1},(_,i)=>i+start));
  }
  assert.equal(assets.tracks.length,13);
  assert.equal(new Set(unit1.map(a=>a.id)).size,unit1.length);
  assert.equal(new Set(unit1.filter(a=>a.audio).map(a=>a.audio)).size,13);
  for (const page of assets.pages) {
    assert.ok(existsSync(new URL(`../public${page.image}`,import.meta.url)));
    assert.ok(page.trimBox[0]>0 && page.trimBox[1]>0,'printer margins cropped');
    assert.ok(page.width>1000 && page.height>1000);
  }
  for (const a of unit1) {
    const page=assets.pages.find(p=>p.book===a.book&&p.page===a.page);
    assert.ok(page, a.id);
    const anchor=a.anchor||page.anchors.find(p=>p.number===Number(a.number));
    assert.ok(anchor,`missing adjacent button: ${a.id}`);
    assert.ok(anchor.x>0&&anchor.x<100&&anchor.y>0&&anchor.y<100,a.id);
    if(a.audio) { assert.ok(assets.tracks.some(t=>t.id===a.audio)); assert.ok(transcripts[a.audio]); }
  }
  for(const track of assets.tracks) assert.ok(statSync(fileURLToPath(new URL(`../public${track.src}`,import.meta.url))).size>10000);
});

test('all objective activities grade correct answers and reject blanks/wrong answers',()=>{
  for(const a of unit1.filter(a=>a.type!=='open')) {
    const correct=Object.fromEntries(a.fields.map((f,i)=>[i,f.answers[0]]));
    const result=grade(a,correct);
    assert.equal(result.score,result.total,a.id);
    assert.equal(grade(a,{}).score,0,a.id);
    assert.equal(grade(a,Object.fromEntries(a.fields.map((_,i)=>[i,'wrong-answer']))).score,0,a.id);
    for(const f of a.fields) if(f.options) for(const answer of f.answers) assert.ok(f.options.includes(answer),`${a.id}: ${answer}`);
  }
});

test('French accents matter; smart apostrophes, case and terminal punctuation do not',()=>{
  assert.equal(normalize('  J’AI   seize ans. '),normalize("j'ai seize ans"));
  assert.equal(normalize('DIX‑SEPT'),normalize('dix-sept'));
  assert.notEqual(normalize('être'),normalize('etre'));
  const a=unit1.find(a=>a.id==='grammar-8-11');
  const values=Object.fromEntries(a.fields.map((f,i)=>[i,f.answers.at(-1)]));
  assert.equal(grade(a,values).score,a.fields.length);
});

test('matching accepts either valid pairing, but never duplicate image assignments',()=>{
  const a=unit1.find(a=>a.id==='grammar-7-9');
  const values={0:'5',1:'3',2:'2',3:'7',4:'1',5:'6'};
  assert.equal(grade(a,values).score,6);
  values[2]='3';
  assert.equal(grade(a,values).score,4);
});

test('open answers have models and are not automatically scored',()=>{
  for(const a of unit1.filter(a=>a.type==='open')) { assert.ok(a.model); assert.equal(grade(a,{}),null); }
});

test('DELF weighted scores reflect printed objective-task weights',()=>{
  for(const [id,max] of [['student-23-oral',9],['student-23-reading',12]]) {
    const a=unit1.find(a=>a.id===id);
    assert.equal(grade(a,Object.fromEntries(a.fields.map((f,i)=>[i,f.answers[0]]))).points,max);
  }
});
import { activeWordAt } from '../src/grandprix/captions.js';
const timings=JSON.parse(readFileSync(new URL('../src/grandprix/wordTimings.json',import.meta.url)));
const media=JSON.parse(readFileSync(new URL('../src/grandprix/exerciseMedia.json',import.meta.url)));
test('word highlighting follows media time, silence, seeking and track boundaries',()=>{
 assert.deepEqual(Object.keys(timings).sort(),assets.tracks.map(t=>t.id).sort());
 for(const [id,entry] of Object.entries(timings)) {
  assert.ok(entry.words.length>10,id);
  let end=0;
  entry.words.forEach((word,i)=>{
   assert.ok(word.text.trim());assert.ok(word.start>=end-.001,`${id}: ordered words`);
   assert.ok(word.end>word.start&&word.end<=entry.duration+.1,id);
   assert.equal(activeWordAt(entry.words,(word.start+word.end)/2),i);
   if(word.start>end+.05)assert.equal(activeWordAt(entry.words,(end+word.start)/2),-1);
   end=word.end;
  });
  assert.equal(activeWordAt(entry.words,entry.duration+1),-1);
  assert.equal(activeWordAt(entry.words,-1),-1);
 }
});
test('activity illustrations exist, picture cards match questions, cover exists',()=>{
 assert.ok(existsSync(new URL('../public/grandprix/cover.png',import.meta.url)));
 for(const [id,item] of Object.entries(media)) {
  const activity=unit1.find(a=>a.id===id);assert.ok(activity,id);
  if(item.layout==='cards')assert.equal(item.images.length,activity.fields.length,id);
  for(const image of item.images)assert.ok(existsSync(new URL(`../public${image.src}`,import.meta.url)),image.src);
 }
 for(const id of ['grammar-4-1','student-18-7','student-7-9','student-15-7','student-19-9'])assert.ok(media[id],id);
});
