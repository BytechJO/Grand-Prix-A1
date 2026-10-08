from pathlib import Path
import json,re
p=Path('src/grandprix/wordTimings.json'); data=json.loads(p.read_text(encoding='utf-8'))
number_words=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix','onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit','dix-neuf','vingt']
for track,entry in data.items():
 words=entry['words'];out=[]
 for i,w in enumerate(words):
  text=w['text']
  if track=='u1-d-1' and ('titres' in text or 'Amara' in text or '.org' in text): continue
  text=text.replace('présente.','présenter.').replace('présentait,','présenter,').replace('Delph.','DELF.').replace('Denise.','Denice.').replace('Mme','madame').replace('Lily,','Lili,').replace('Luca.','Lucas.').replace('écrit','écris').replace('répond aux','réponds aux')
  if text.rstrip(',.?!')=='si': text=text.replace('si','ci')
  if track in ['u1-d-4','u1-d-6']:
   text=text.replace('six','suisses').replace('Russ.','russe.')
   if text=='et' and i>0 and words[i-1]['text']=='Boris':text='est'
  if track=='u1-d-4' and i<8:
   if text=='à':continue
   if text.startswith('un,'):text='A1,' if i<4 else 'un,'
  # Spell out the spoken numbers in the learning transcript.
  match=re.fullmatch(r'(-?)(\d+)([,\.?!]?)',text)
  if match and int(match[2])<=20:
   text=number_words[int(match[2])]+match[3]
  if track=='u1-b-4' and text=='le' and i+1<len(words) and words[i+1]['text'].startswith('Grand'):
   out.append({**w,'text':'Legrand,','end':words[i+1]['end']});continue
  if track=='u1-b-4' and text.startswith('Grand') and i>0 and words[i-1]['text']=='le':continue
  if track=='u1-b-4' and text=='du' and i+1<len(words) and words[i+1]['text'].startswith('Puy'):
   out.append({**w,'text':'Dupuis,','end':words[i+1]['end']});continue
  if track=='u1-b-4' and text.startswith('Puy') and i>0 and words[i-1]['text']=='du':continue
  if text.startswith(("'",'-')) and out:
   out[-1]['text']+=text.replace("'",'’');out[-1]['end']=w['end']
  else:out.append({**w,'text':text})
 entry['words']=out
p.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
