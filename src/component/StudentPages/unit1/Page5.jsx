import React, { useState, useRef, useEffect } from "react";
import page_5 from "../../../assets/unit1/imgs/Pages/Right 1 Unit 01 Good Morning World 2_page-0005.jpg";
import page5_CD2 from "../../../assets/unit1/sounds/P5 meet my cat.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import img1 from "../../../assets/unit1/imgs/P2 listen and read 01.svg";
import img2 from "../../../assets/unit1/imgs/Table22.svg";
import img3 from "../../../assets/unit1/imgs/taxi22.svg";
import img4 from "../../../assets/unit1/imgs/tiger22.svg";
import repeat1 from "../../../assets/unit1/imgs/P1 listen and repeat 02.svg";
import repeat2 from "../../../assets/unit1/imgs/P1 listen and repeat 03.svg";
import longsound from "../../../assets/unit1/sounds/pg5-instruction2-adult-lady_B2grO9RW.mp3";
import longsound2 from "../../../assets/unit1/sounds/cd3pg5-instruction1-adult-lady_6kd2jrIk.mp3";
import read from "../../../assets/unit1/imgs/P1 listen and repeat 01.svg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import Pg5_2_1_Adult from "../../../assets/unit1/sounds/Pg5_2.1_Adult Lady.mp3";
import Pg5_2_2_Adult from "../../../assets/unit1/sounds/Pg5_2.2_Adult Lady.mp3";
import Pg5_2_3_Adult from "../../../assets/unit1/sounds/Pg5_2.3_Adult Lady.mp3";
import Pg5_2_4_Adult from "../../../assets/unit1/sounds/Pg5_2.4_Adult Lady.mp3";
import Pg5_1_2_Lolo from "../../../assets/unit1/sounds/Pg5_1.2_Lolo.mp3";
import Pg5_1_1_Bebo from "../../../assets/unit1/sounds/Pg5_1.1_Bebo.mp3";
import sound2 from "../../../assets/unit1/sounds/pg4-vocabulary-2-how are you.mp3";
import sound3 from "../../../assets/unit1/sounds/pg4-vocabulary-3-fine thank you.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Page5 = ({ openPopup }) => {
    const { audioRef, activeId, setActiveId } = useContext(AudioContext);


  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 3.09, text: "Page 5. Meet my cat." },
    { start: 3.13, end: 5.02, text: "Hello. How are you? " },
    {
      start: 5.06,
      end: 8.19,
      text: "I'm Stella. This is my cat. Her name is Lolo.",
    },
    { start: 8.25, end: 11.25, text: "She is one year old. She likes people." },
  ];

  const captions = [
    { start: 0, end: 3.26, text: " Page 5. Listen, read, and repeat. " },
    { start: 3.28, end: 5.15, text: "Hello. How are you? " },
    { start: 5.17, end: 7.13, text: "Fine, thank you. " },
  ];

  const captions2 = [
    { start: 0, end: 3.19, text: " Page 5. Listen and read along. " },
    { start: 3.21, end: 7.22, text: "T. Table. Taxi. Tiger." },
  ];
  // أصوات الصور
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg5_2_1_Adult),
    new Audio(Pg5_2_2_Adult),
    new Audio(Pg5_2_3_Adult),
    new Audio(Pg5_2_4_Adult),
  ];
  const imageSounds2 = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg5_1_1_Bebo),
    new Audio(Pg5_1_2_Lolo),
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 7.1, y1: 46, x2: 11.4, y2: 48.8, sound: 1, isPrimary: true },

    // الصوت الأول – منطقة إضافية
    { x1: 4.6, y1: 34.1, x2: 15.2, y2: 67.8, sound: 1, isPrimary: false },

    // الصوت الثاني – الأساسية
    { x1: 33.8, y1: 43.3, x2: 37.7, y2: 46.1, sound: 2, isPrimary: true },

    // الصوت الثاني – الإضافية
    { x1: 26.9, y1: 32.8, x2: 35.8, y2: 68.9, sound: 2, isPrimary: false },
  ];
  const sounds = {
    1: sound2,
    2: sound3,
  };
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (path, id) => {
    if (!audioRef.current) return;

    // 🔥 وقف أي صوت شغال بأي صفحة
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    audioRef.current.src = path;
    audioRef.current.play();

    setActiveId(id); // 🔥 مهم للهايلايت

    audioRef.current.onended = () => {
      setActiveId(null);
    };
  };
  return (
    <div
      className="page1-img-wrapper"
      onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_5})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />
      {/* <img
        src={page_5}
        onClick={handleImageClick}
        style={{ display: "block" }}
      /> */}

      {areas.map((area, index) => {
               const isActive = activeId === `p5-${area.sound}`;

        // ============================
        // 1️⃣ المنطقة الأساسية → دائرة تظهر فقط عندما تكون Active
        // ============================
        if (area.isPrimary) {
          return (
            <div
              key={index}
                 className={`circle-area ${isActive ? "active" : ""}`}
              style={{
                left: `${area.x1}%`,
                top: `${area.y1}%`,
              }}
              onClick={() => {
                playSound(sounds[area.sound], `p5-${area.sound}`);
                }}
            ></div>
          );
        }

        // ============================
        // 2️⃣ المناطق الفرعية → مربعات داكنة مخفية ولازم
        //    عند الضغط عليها → تفعّل الدائرة الأساسية
        // ============================
        return (
          <div
            key={index}
            className="clickable-area"
            style={{
              position: "absolute",
              left: `${area.x1}%`,
              top: `${area.y1}%`,
              width: `${area.x2 - area.x1}%`,
              height: `${area.y2 - area.y1}%`,
            }}
            onClick={() => {
             playSound(sounds[area.sound], `p5-${area.sound}`);
                }}
          ></div>
        );
      })}

      <div
        id="CD-1-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <AudioWithCaption src={page5_CD2} captions={captionsExample} />
            )
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>

      <div
        id="CD-2-page5"
        className="headset-icon-CD-page5 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <FourImagesWithAudio
                images={[read, repeat1, repeat2]}
                audioSrc={longsound2}
                checkpoints={[0, 4, 5.9]}
                popupOpen={true}
                titleQ={`Listen, read, and repeat.`}
                audioArr={imageSounds2}
                captions={captions}
              />
            )
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={audioBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="click-icon-page5 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <FourImagesWithAudio
                images={[Rabbit, img1, img2, img3, img4]}
                audioSrc={longsound}
                checkpoints={[0, 3.4, 4, 4.9, 6]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions2}
              />
            )
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
    </div>
  );
};

export default Page5;
