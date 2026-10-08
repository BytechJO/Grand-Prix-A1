import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/unit7/img/Right 1 Unit 07 What are Matter2.jpg";
import img1 from "../../../assets/unit7/img/w.svg";
import img2 from "../../../assets/unit7/img/water.svg";
import img3 from "../../../assets/unit7/img/window.svg";
import img4 from "../../../assets/unit7/img/women.svg";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import soundListen from "../../../assets/unit7/sound/U7P59ListenAndRepeat.mp3";
import Pg11_1_1_Bebo from "../../../assets/unit7/sound/Pg59_1.1_Bebo.mp3";
import Pg11_1_1_Stella from "../../../assets/unit7/sound/U7P59ImHappy.mp3";
import Pg11_1_2_Lolo_Take from "../../../assets/unit7/sound/Pg59_1.2_Lolo_Take 2.mp3";
import repeat1 from "../../../assets/unit7/img/listen and repeat 02.svg";
import repeat2 from "../../../assets/unit7/img/listen and repeat 03.svg";
import Pg11_2_1_AdultLady from "../../../assets/unit7/sound/Pg59_2.1_Adult Lady.mp3";
import Pg11_2_2_AdultLady from "../../../assets/unit7/sound/Pg59_2.2_Adult Lady.mp3";
import Pg11_2_3_AdultLady from "../../../assets/unit7/sound/Pg59_2.3_Adult Lady.mp3";
import Pg11_2_4_AdultLady from "../../../assets/unit7/sound/Pg59_2.4_Adult Lady.mp3";
import longsound from "../../../assets/unit7/sound/U7P59ListenAndReadAlong.mp3";
import read from "../../../assets/unit1/imgs/P1 listen and repeat 01.svg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import sound5 from "../../../assets/unit7/sound/U7VOC-05.mp3";
import sound6 from "../../../assets/unit7/sound/U7VOC-06.mp3";
import sound8 from "../../../assets/unit7/sound/U7VOC-08.mp3";
import sound9 from "../../../assets/unit7/sound/U7VOC-09.mp3";
import sound10 from "../../../assets/unit7/sound/U7VOC-10.mp3";
import "./Unit7_Page2.css";

import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit7_Page2 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  // أصوات الصور
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg11_2_1_AdultLady),
    new Audio(Pg11_2_2_AdultLady),
    new Audio(Pg11_2_3_AdultLady),
    new Audio(Pg11_2_4_AdultLady),
  ];
  const imageSounds2 = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg11_1_1_Bebo),
    new Audio(Pg11_1_2_Lolo_Take),
  ];
  const captionsExample = [
    { start: 0, end: 2.58, text: "Page 59. I'm happy. " },
    { start: 2.6, end: 4.86, text: "I like to go to the park. " },
    {
      start: 5.0,
      end: 13.94,
      text: "I go with my grandparents. We talk about school. I am happy. Are you happy too?",
    },
  ];

  const captions = [
    { start: 0, end: 3.56, text: "Page 59. Listen, read, and repeat." },
    {
      start: 3.6,
      end: 5.18,
      text: "I'm happy.",
    },
    {
      start: 5.2,
      end: 6.78,
      text: " I am happy too",
    },
  ];
  const captions2 = [
    { start: 0, end: 3.33, text: "Page 59. Listen and read along. " },
    { start: 3.5, end: 7.65, text: "W. Water, window, woman." },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 33.3, y1: 25.7, sound: 1, isPrimary: true },

    // // // // الصوت الأول – منطقة إضافية
    { x1: 22.86, y1: 18.64, x2: 38.18, y2: 32.81, sound: 1, isPrimary: false },

    // // // // الصوت الثاني – الأساسية
    { x1: 9.5, y1: 34, sound: 2, isPrimary: true },

    // // // // الصوت الثاني – الإضافية
    { x1: 8.51, y1: 27.78, x2: 21.11, y2: 33.72, sound: 2, isPrimary: false },

    //     // الصوت الأول – المنطقة الأساسية
    { x1: 32.2, y1: 58.5, sound: 3, isPrimary: true },

    // // // // الصوت الأول – منطقة إضافية
    { x1: 35.8, y1: 53.9, x2: 45.74, y2: 75.76, sound: 3, isPrimary: false },

    // // // // الصوت الثاني – الأساسية
    { x1: 15.4, y1: 78.0, sound: 4, isPrimary: true },

    // // // // الصوت الثاني – الإضافية
    { x1: 18.01, y1: 81.54, x2: 34.11, y2: 77.74, sound: 4, isPrimary: false },
    // // // // الصوت الثاني – الأساسية
    { x1: 8.3, y1: 51.5, sound: 5, isPrimary: true },

    // // // // الصوت الثاني – الإضافية
    { x1: 10.26, y1: 45.75, x2: 42.27, y2: 69.05, sound: 5, isPrimary: false },
  ];
  const sounds = {
    1: sound5,
    2: sound6,
    3: sound8,
    4: sound9,
    5: sound10,
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
      style={{ backgroundImage: `url(${page_2})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />
      {/* <img
        src={page_2}
        onClick={handleImageClick}
        style={{ display: "block" }}
      /> */}
      {areas.map((area, index) => {
        const isActive = activeId === `p59-${area.sound}`;

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
                playSound(sounds[area.sound], `p59-${area.sound}`);
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
              playSound(sounds[area.sound], `p59-${area.sound}`);
            }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit7-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <AudioWithCaption
                src={Pg11_1_1_Stella}
                captions={captionsExample}
              />,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="headset-icon-CD-unit7-page2-2 hover:scale-110 transition"
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
                audioSrc={soundListen}
                checkpoints={[0, 4.3, 5.18]}
                popupOpen={true}
                titleQ={`Listen, read, and repeat.`}
                audioArr={imageSounds2}
                captions={captions}
              />,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="click-icon-unit7-page2-1 hover:scale-110 transition"
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
                checkpoints={[0, 4.37, 5.29, 6.19, 6.77]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions2}
              />,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit7_Page2;
