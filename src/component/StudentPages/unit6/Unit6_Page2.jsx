import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/unit6/imgs/Right 1 Unit 06 Can We Go to the Park2.jpg";
import soundSong from "../../../assets/unit6/sounds/U6P47LookatmyKite.mp3";
import sound1 from "../../../assets/unit6/sounds/Pg47_1.1_Bebo.mp3";
import sound2 from "../../../assets/unit6/sounds/Pg47_1.2_Lolo.mp3";
import sound3 from "../../../assets/unit6/sounds/Pg47_2.1_Adult Lady.mp3";
import sound4 from "../../../assets/unit6/sounds/Pg47_2.2_Adult Lady.mp3";
import sound5 from "../../../assets/unit6/sounds/Pg47_2.3_Adult Lady.mp3";
import sound6 from "../../../assets/unit6/sounds/Pg47_2.4_Adult Lady.mp3";
import sound7 from "../../../assets/unit6/sounds/U6P47Listenandread.mp3";
import img1 from "../../../assets/unit6/imgs/short i.svg";
import img2 from "../../../assets/unit6/imgs/wig.svg";
import img3 from "../../../assets/unit6/imgs/mitt.svg";
import img4 from "../../../assets/unit6/imgs/dig.svg";
import CD21_Pg23_Instruction1_AdultLady from "../../../assets/unit6/sounds/U6P47Listenandrepeat.mp3";
import repeat1 from "../../../assets/unit6/imgs/listen and repeat 02.svg";
import repeat2 from "../../../assets/unit6/imgs/listen and repeat 03.svg";
import read from "../../../assets/unit1/imgs/P1 listen and repeat 01.svg";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import sound2_2 from "../../../assets/unit6/sounds/U6P46VOC-02.mp3";
import sound2_6 from "../../../assets/unit6/sounds/U6P46VOC-06.mp3";
import sound2_9 from "../../../assets/unit6/sounds/U6P46VOC-09.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

import "./Unit6_Page2.css";
const Unit6_Page2 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  // أصوات الصور
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound3),
    new Audio(sound4),
    new Audio(sound5),
    new Audio(sound6),
  ];
  const imageSounds2 = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2),
  ];
  const captionsExample = [
    { start: 0, end: 3.16, text: "Page 47, Look at my kite." },
    { start: 3.18, end: 6.21, text: "I can fly a kite. My kite is in the sky" },
    { start: 6.23, end: 8.15, text: "It is colorful." },
    {
      start: 8.17,
      end: 11.26,
      text: "Tilly likes to watch. She can't fly a kite",
    },
    { start: 11.28, end: 13.13, text: " She can jump." },
  ];
  const captions = [
    { start: 0, end: 3.5, text: "Page 47, Listen and read along." },
    {
      start: 3.25,
      end:5.19,
      text: "Can you climb a tree?",
    },
    {
      start: 5.22,
      end:7.03,
      text: "Yes, I can. ",
    },
  ];
  const captions2 = [
    { start: 0, end: 4.00, text: "Page 47, Listen and read along." },
    { start: 4.05, end: 8.05, text: "Short I. Wig. Mitt. Dig." },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 14.0, y1: 35.6, sound: 1, isPrimary: true },

    // // // الصوت الأول – منطقة إضافية
    { x1: 4.63, y1: 31.74, x2: 10.45, y2: 44.84, sound: 1, isPrimary: false },

    // // // الصوت الثاني – الأساسية
    { x1: 20.1, y1: 25.7, sound: 2, isPrimary: true },

    // // // الصوت الثاني – الإضافية
    { x1: 13.75, y1: 25.34, x2: 21.11, y2: 32.05, sound: 2, isPrimary: false },
    // // // الصوت الثاني – الأساسية
    { x1: 17.43, y1: 57.15, sound: 3, isPrimary: true },

    // // // الصوت الثاني – الإضافية
    { x1: 23.64, y1: 49.25, x2: 33.91, y2: 57.48, sound: 3, isPrimary: false },
  ];
  const sounds = {
    1: sound2_2,
    2: sound2_6,
    3: sound2_9,
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
      {/* <img src={page_2} /> */}
      <audio ref={audioRef} style={{ display: "none" }} />
      {areas.map((area, index) => {
         const isActive = activeId === `p47-${area.sound}`;

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
              playSound(sounds[area.sound], `p47-${area.sound}`);
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
               playSound(sounds[area.sound], `p47-${area.sound}`);
            }}
          ></div>
        );
      })}
      <div
        className="headset-icon-CD-unit6-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <AudioWithCaption src={soundSong} captions={captionsExample} />
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
        className="headset-icon-CD-unit6-page2-2 hover:scale-110 transition"
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
                audioSrc={CD21_Pg23_Instruction1_AdultLady}
                checkpoints={[0, 3.5, 5.19]}
                popupOpen={true}
                titleQ={`Listen, read, and repeat.`}
                audioArr={imageSounds2}
                captions={captions}
              />
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
        className="click-icon-unit6-page2-1 hover:scale-110 transition"
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
                audioSrc={sound7}
                checkpoints={[0, 3.8, 5.1, 6.09, 7.03]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions2}
              />,
              false
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            href={arrowBtn}
            className="svg-img"
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

export default Unit6_Page2;
