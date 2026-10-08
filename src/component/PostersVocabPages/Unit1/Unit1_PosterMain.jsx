import page_1 from "../../../assets/U1Poster/U1/U1Poster.svg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import Unit1_Poster from "./Unit1_Poster";
import vocabulary from "../../../assets/unit1/sounds/Pg4_Vocabulary_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/U1Poster/U1/U1Poster.svg";
import num1 from "../../../assets/U1Poster/U1/U1Poster-01.svg";
import num2 from "../../../assets/U1Poster/U1/U1Poster-02.svg";
import num3 from "../../../assets/U1Poster/U1/U1Poster-03.svg";
import num4 from "../../../assets/U1Poster/U1/U1Poster-04.svg";
import num5 from "../../../assets/U1Poster/U1/U1Poster-05.svg";
import "../../../index.css";
import "./Unit1_PosterMain.css"
import sound1 from "../../../assets/unit1/sounds/pg4-vocabulary-1-goodbye.mp3";
import sound4 from "../../../assets/unit1/sounds/pg4-vocabulary-4-hello..mp3";
import sound5 from "../../../assets/unit1/sounds/pg4-vocabulary-5-good morning.mp3";
import sound2 from "../../../assets/unit1/sounds/pg4-vocabulary-2-how are you.mp3";
import sound3 from "../../../assets/unit1/sounds/pg4-vocabulary-3-fine thank you.mp3";

const Unit1_PosterMain = ({ openPopup }) => {
  const mainAudioRef = useRef(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const captions = [
    {
      start: 0,
      end: 3.0,
      text: "Page 4, Unit 1. Good morning, world.Vocabulary.",
    },
    { start: 3.02, end: 5.1, text: "1. Goodbye." },
    { start: 5.13, end: 7.0, text: "2. How are you?" },
    { start: 7.03, end: 10.5, text: "3. Fine, thank you." },
    { start: 10.52, end: 12.1, text: "4. Hello." },
    { start: 12.12, end: 15.0, text: "5. Good morning." },
  ];


  // ================================
  // ✔ INITIAL PLAY & STOP AT SECOND
  // ================================
  useEffect(() => {
    const audio = mainAudioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const interval = setInterval(() => {
      if (audio.currentTime >= stopAtSecond) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
        setShowContinue(true);
        clearInterval(interval);
      }
    }, 100);

    const handleEnded = () => {
      mainAudioRef.current.currentTime = 0;
      setIsPlaying(false);
      setPaused(true);
      setShowContinue(true);
      setActiveIndex(null);
      setActiveIndex2(null);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);


  const wordAudios = [sound1, sound2, sound3, sound4, sound5];
  const playWordAudio = (index) => {
    // أوقفي أي كلمة شغالة
    wordRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    const audio = wordRefs.current[index].current;
    if (!audio) return;

    // تشغيل الصوت من البداية
    audio.currentTime = 0;
    audio.play();

    // 🔥 فعل الأنيميشن على طول فترة التشغيل
    setClickedIndex(index);

    // 🔥 عند انتهاء الصوت -> أطفئ الأنيميشن
    audio.onended = () => {
      setClickedIndex(null);
    };
  };

  const wordRefs = useRef(wordAudios.map(() => React.createRef()));

  const nums = [num1, num2, num3, num4, num5];

  return (
    <div>
      {/* Image + Words */}
      <div
        style={{ position: "relative", width: "fit-content" }}
      >
        <div
          className="vocab_container_poster_vocab"
          style={{ bottom: "9%", right: "79.5%" }}
        >
          {[
            "Goodbye!",
            "How are you?",
            "Fine, thank you.",
            "Hello!",
            "Good morning!",
          ].map((text, i) => (
            <h6
              key={i}
              className={
                (activeIndex2 === i && current >= 2.8) || clickedIndex === i
                  ? "active"
                  : ""
              }
              onClick={() => playWordAudio(i)}
            >
              {i + 1} {text}
            </h6>
          ))}
        </div>

        {/* Numbers */}
        {nums.map((num, i) => (
          <img
            key={i}
            src={num}
            className={`num-img-posterVocab ${
              (activeIndex2 === i && current >= 2.8) || clickedIndex === i
                ? "active"
                : ""
            }`}
            style={{
              height: "25px",
              position: "absolute",
              top: ["46%", "44%", "42%", "25.5%", "27.5%"][i],
              left: ["20%", "52%", "66%", "41%", "34%"][i],
            }}
          />
        ))}
        <img
          src={page_1}
          alt="poster"
         
          className="poster-grammar-img max-w-full max-h-[80vh] object-fill rounded-xl shadow-lg"
        />
      </div>
      <div
        className="audio-btn-poster hover:scale-110 transition"
        onClick={() =>
          openPopup(
            "audio",
            <AudioWithCaption src={vocabulary} captions={captions} />
          )
        }
      >
        <svg width="22" height="22" viewBox="0 0 90 90">
          <image
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
      {wordAudios.map((src, i) => (
        <audio key={i} ref={wordRefs.current[i]} src={src} />
      ))}
    </div>
  );
};

export default Unit1_PosterMain;
