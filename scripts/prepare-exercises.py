"""Extract only the illustrations/dialogues needed by each exercise from source PDFs."""
from pathlib import Path
import json, math, shutil, subprocess
from pypdf import PdfReader
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/grandprix/exercises'; OUT.mkdir(parents=True,exist_ok=True)
# Coordinates are percentages inside the already-reviewed printer TrimBox.
regions={
 'student-4-1':[(4,57,76,95,97)],
 'student-5-1':[(5,5,19.3,48.7,60.1),(5,49.6,19.3,94.5,60.1)],
 'student-6-3':[(6,43,10,94,36)],
 'student-6-4':[(6,5,40,61,60)],
 'student-7-7':[(7,11,10,93,49)],
 'student-7-8':[(7,10,55,54,72)],
 'student-7-9':[(7,10,55,54,72)],
 'student-7-10':[(7,57,55,93,72)],
 'student-8-11':[(8,59,9,98,33)],
 'student-8-13':[(8,12,59,94,96)],
 'student-9-1':[(9,5,20,94,59)],
 'student-9-2':[(9,11,65,61,72)],
 'student-9-3':[(9,72,84,86,92)],
 'student-10-4':[(10,51,12,92,42)],
 'student-10-5':[(10,0,43,94,93)],
 'student-11-6':[(11,10,10,95,51)],
 'student-11-7':[(11,11,57,52,69)],
 'student-11-8':[(11,11,57,52,69)],
 'student-13-2':[(13,11,48,94,73)],
 'student-14-4':[(14,11,12,86,46)],
 'student-15-6':[(15,12,13,97,55)],
 'student-15-7':[(15,12,43,97,55)],
 'student-17-1':[(17,12,20,90,50)],
 'student-17-2':[(17,12,20,90,50)],
 'student-18-5':[(18,12,26,53,61)],
 'student-18-7':[(18,61,26,96,90)],
 'student-19-8':[(19,7,12,94,55)],
 'student-19-9':[(19,7,12,94,55)],
 'student-22-3':[(22,11,59,95,77)],
 'student-22-4':[(22,11,82,94,92)],
 'student-25-1':[(25,5,18,94,80)],
}
# First listening activity uses individual picture cards, as in the publisher example.
cards={'student-5-1':[(5,5,19.3,48.7,40),(5,49.6,19.3,94.5,40),(5,5,40.2,48.7,60.1),(5,49.6,40.2,94.5,60.1)]}
cards['grammar-4-1']=[(4,8,20,39,39),(4,40,20,64,38),(4,69,20,93,39),(4,12,47,35,66),(4,40,46,65,65),(4,66,46,97,67),(4,22,71,49,89),(4,56,72,73,89)]
regions['student-18-7'].insert(0,(18,12,26,53,61))
regions.pop('student-5-1')
source=ROOT.parent/'Grand Prix A1 SB pdf/Grand Prix A1 SB.pdf'
reader=PdfReader(source)
manifest={}
for kind, mapping in [('context',regions),('cards',cards)]:
 for activity,boxes in mapping.items():
  source=ROOT.parent/('Grand Prix A1  GB pdf/Grand Prix A1 GB.pdf' if activity.startswith('grammar') else 'Grand Prix A1 SB pdf/Grand Prix A1 SB.pdf')
  reader=PdfReader(source)
  images=[]
  for i,(number,x0,y0,x1,y1) in enumerate(boxes):
   page=reader.pages[number-1];l,b,r,t=map(float,page.trimbox);mw,mh=float(page.mediabox.right),float(page.mediabox.top)
   x=round((l+(r-l)*x0/100)*2);y=round((mh-t+(t-b)*y0/100)*2)
   w=round((r-l)*(x1-x0)/100*2);h=round((t-b)*(y1-y0)/100*2)
   target=OUT/f'{activity}-{i}'
   subprocess.run(['pdftoppm','-f',str(number),'-l',str(number),'-r','144','-x',str(x),'-y',str(y),'-W',str(w),'-H',str(h),'-singlefile','-png',str(source),str(target)],capture_output=True,check=True)
   images.append({'src':f'/grandprix/exercises/{target.name}.png','width':w,'height':h})
  manifest[activity]={'layout':kind,'images':images}
(ROOT/'src/grandprix/exerciseMedia.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
shutil.copy2(ROOT.parent/'Grand Prix A1 Cover.png',ROOT/'public/grandprix/cover.png')
print('Prepared',len(manifest),'exercise visuals and original cover')
