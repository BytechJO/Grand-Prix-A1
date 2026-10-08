let currentAudio = null;

export const playGlobalAudio = (audioElement, soundPath) => {
  // إذا في صوت شغال
  if (currentAudio && !currentAudio.paused) {
    return false; // 🚫 امنع تشغيل صوت جديد
  }

  audioElement.src = soundPath;
  audioElement.play();

  currentAudio = audioElement;

  audioElement.onended = () => {
    currentAudio = null;
  };

  return true;
};