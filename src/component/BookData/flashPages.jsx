// استيراد كل الصور من المجلد
const images = import.meta.glob("../../assets/Right 1 FC/img/*.png", {
  eager: true,
});

// استيراد كل الأصوات
const audios = import.meta.glob("../../assets/Right 1 FC/audio/*.mp3", {
  eager: true,
});

// ترتيب الأصوات حسب الرقم داخل الاسم
const audioFiles = Object.keys(audios)
  .sort((a, b) => {
    const numA = Number(a.match(/(\d+)\.mp3$/)[1]);
    const numB = Number(b.match(/(\d+)\.mp3$/)[1]);
    return numA - numB;
  })
  .map((key) => audios[key].default);

// تحويل الصور إلى Flash Pages مع الأصوات المرتبة
export const flashPages = Object.keys(images)
  .sort((a, b) => {
    const numA = Number(a.match(/(\d+)\.png$/)[1]);
    const numB = Number(b.match(/(\d+)\.png$/)[1]);
    return numA - numB;
  })
  .map((key, index) => {
    return {
      img: images[key].default,

      // الصورة الأولى بدون صوت
      // الصور التالية تأخذ الأصوات بالتسلسل الصحيح
      audio: index === 0 ? null : audioFiles[index - 1] || null,
    };
  });
