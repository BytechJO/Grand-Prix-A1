import sys, os, json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parents[2] / 'tools/speech'))
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING']='1'
os.environ['HF_HUB_DISABLE_XET']='1'
from faster_whisper import WhisperModel
root=Path(__file__).resolve().parents[1]
model=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=6,download_root=str(root.parent/'tools/models'))
result={}
for path in sorted((root/'public/grandprix/audio').glob('*.mp3')):
    segments, info=model.transcribe(str(path),language='fr',word_timestamps=True,beam_size=5,vad_filter=True,condition_on_previous_text=False,initial_prompt='Cours de français Grand Prix. Loïc, Théo, Amélie, Emma, madame Rose, Antoine, Henri, Jean-Pierre, Sophia, Alison, Boris, Annabelle.')
    words=[]
    for segment in segments:
        for word in segment.words:
            if word.end>word.start:
                words.append(dict(text=word.word.strip(),start=round(word.start,3),end=round(word.end,3)))
    result[path.stem]={'duration':info.duration,'words':words}
    (root/'src/grandprix/wordTimings.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(path.stem, len(words), 'words', flush=True)
