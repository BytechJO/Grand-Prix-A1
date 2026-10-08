"""Render Unit 1 inside each PDF's TrimBox, excluding printer marks.

Original PDFs are read only. Requires pypdf, pdfplumber, Pillow and Poppler.
Run from any directory; source books are expected beside the project folder.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import json
import math
import shutil
import subprocess
import re
from pypdf import PdfReader
import pdfplumber

PROJECT = Path(__file__).resolve().parents[1]
ROOT = PROJECT.parent
OUT = PROJECT / 'public/grandprix'
SOURCES = {
    'student': (ROOT / 'Grand Prix A1 SB pdf/Grand Prix A1 SB.pdf', list(range(4, 26))),
    'grammar': (ROOT / 'Grand Prix A1  GB pdf/Grand Prix A1 GB.pdf', list(range(4, 10))),
    'teacher': (ROOT / 'Grand Prix A1 TB.pdf', list(range(4, 20))),
    'answers': (ROOT / 'GB- AK/Grand Prix A1 GR Ak.pdf', [2, 3]),
}

def render(job):
    kind, path, number, box, media = job
    scale = 2  # 144 DPI
    left, bottom, right, top = map(float, box)
    x = math.ceil(left * scale)
    y = math.ceil((float(media[3]) - top) * scale)
    width = math.floor(right * scale) - x
    height = math.floor((float(media[3]) - bottom) * scale) - y
    target = OUT / 'pages' / f'{kind}-{number:03}'
    subprocess.run(['pdftoppm', '-f', str(number), '-l', str(number), '-r', '144',
                    '-x', str(x), '-y', str(y), '-W', str(width), '-H', str(height),
                    '-singlefile', '-jpeg', '-jpegopt', 'quality=88', str(path), str(target)],
                   check=True, capture_output=True)
    return {'book': kind, 'page': number, 'image': f'/grandprix/pages/{target.name}.jpg',
            'width': width, 'height': height, 'trimBox': list(map(float, box))}

def main():
    (OUT / 'pages').mkdir(parents=True, exist_ok=True)
    (OUT / 'audio').mkdir(parents=True, exist_ok=True)
    jobs = []
    for kind, (path, numbers) in SOURCES.items():
        reader = PdfReader(path)
        for n in numbers:
            page = reader.pages[n - 1]
            jobs.append((kind, path, n, page.trimbox, page.mediabox))
    with ThreadPoolExecutor(max_workers=4) as pool:
        pages = list(pool.map(render, jobs))
    print(f'Rendered {len(pages)} cropped pages', flush=True)
    # Locate printed activity numbers in PDF coordinates; the app uses the same
    # normalized TrimBox coordinates for the adjacent exercise/audio buttons.
    for kind in ['student', 'grammar']:
        path, numbers = SOURCES[kind]
        with pdfplumber.open(path) as pdf:
            for n in numbers:
                p = pdf.pages[n - 1]
                words = p.extract_words(extra_attrs=['fontname', 'size'])
                entry = next(v for v in pages if v['book'] == kind and v['page'] == n)
                left, bottom, right, top = entry['trimBox']
                anchors = []
                for w in words:
                    if not re.fullmatch(r'\d{1,2}', w['text']):
                        continue
                    if 'Demi' not in w['fontname'] or not 10.5 <= w['size'] <= 14:
                        continue
                    # Activity numbers are aligned near the left margin (some
                    # split-column activities start in the right half).
                    next_words = sorted([v for v in words if abs(v['top']-w['top']) < 2
                                         and v['x0'] > w['x1'] and v['x0']-w['x1'] < 36], key=lambda v: v['x0'])
                    if not next_words or not re.match(r'[A-Za-zÀ-ÿ]', next_words[0]['text']):
                        continue
                    if w['x0'] > 110 and kind == 'grammar':
                        continue
                    anchors.append({'number': int(w['text']),
                                    'x': round((w['x0'] - left) / (right-left)*100, 3),
                                    'y': round((w['top'] - (p.height-top) + w['height']/2) / (top-bottom)*100, 3),
                                    'word': next_words[0]['text']})
                entry['anchors'] = anchors
        print(f'Located {kind} headings', flush=True)
    tracks = []
    for source in sorted((ROOT / 'GRAND PRIX A1 Audio').glob('Unite 1 *.mp3')):
        match = re.search(r'Section ([A-D]) Exercice (\d+)', source.name)
        track_id = f'u1-{match[1].lower()}-{match[2]}' if match else 'u1-delf-1'
        shutil.copy2(source, OUT / 'audio' / f'{track_id}.mp3')
        tracks.append({'id': track_id, 'src': f'/grandprix/audio/{track_id}.mp3', 'original': source.name})
    manifest = {'pages': pages, 'tracks': tracks}
    (PROJECT / 'src/grandprix/assets.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Copied {len(tracks)} recordings', flush=True)

if __name__ == '__main__':
    main()
