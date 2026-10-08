import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/unit4/imgs/Right 1 Unit 04 Wonderful Shapes and Colors2.jpg";
import soundMyPicture from "../../../assets/unit4/sounds/U4P29 My Picture.mp3";
import soundListen from "../../../assets/unit4/sounds/U4P29 listen read repeat.mp3";
import Pg29_1_1_Bebo from "../../../assets/unit4/sounds/Pg29_1.1_Bebo.mp3";
import Pg29_1_1_Tom from "../../../assets/unit4/sounds/Pg29_1.1_Tom.mp3";
import Pg29_1_2_Lolo from "../../../assets/unit4/sounds/Pg29_1.2_Lolo.mp3";
import Pg29_2_1_AdultLady from "../../../assets/unit4/sounds/Pg29_2.1_Adult Lady.mp3";
import Pg29_2_2_AdultLady from "../../../assets/unit4/sounds/Pg29_2.2_Adult Lady.mp3";
import Pg29_2_3_AdultLady from "../../../assets/unit4/sounds/Pg29_2.3_Adult Lady.mp3";
import Pg29_2_4_AdultLady from "../../../assets/unit4/sounds/Pg29_2.4_Adult Lady.mp3";
import img1 from "../../../assets/unit4/imgs/V.svg";
import img2 from "../../../assets/unit4/imgs/van.svg";
import img3 from "../../../assets/unit4/imgs/vet.svg";
import img4 from "../../../assets/unit4/imgs/vest.svg";
import CD28Pg29_Instruction1_AdultLady from "../../../assets/unit4/sounds/U4P29 Listen and read along.mp3";
import repeat1 from "../../../assets/unit4/imgs/listen and repeat 02.svg";
import repeat2 from "../../../assets/unit4/imgs/listen and repeat 03.svg";
import read from "../../../assets/unit1/imgs/P1 listen and repeat 01.svg";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import sound2_8 from "../../../assets/unit4/sounds/U4P28VOC-08.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
import "./Unit4_Page2.css";
const Unit4_Page2 = ({ openPopup }) => {
   const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const activeData = [
    {
      page: "1",
      title: "Birthdays Are Fun",
      sound: soundMyPicture,
      imgSrc: "",
    },
    {
      page: "2",
      title: "Lesiten, Read and repeat",
      sound: soundListen,
      imgSrc: "Lolo_bebo",
    },
    {
      page: "3",
      title: "Lestine and read along",
      sound: CD28Pg29_Instruction1_AdultLady,
      imgSrc: "readImg",
    },
  ];
  // أصوات الصور
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg29_2_1_AdultLady),
    new Audio(Pg29_2_2_AdultLady),
    new Audio(Pg29_2_3_AdultLady),
    new Audio(Pg29_2_4_AdultLady),
  ];
  const imageSounds2 = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg29_1_1_Bebo),
    new Audio(Pg29_1_2_Lolo),
  ];
  const captionsExample = [
    { start: 0, end: 3.1, text: "Page 29, my picture. " },
    {
      start: 3.13,
      end: 7.13,
      text: "This is a house. The roof is a triangle.",
    },
    {
      start: 7.17,
      end: 12.25,
      text: " The door is a square. The windows are circles.",
    },
    { start: 12.28, end: 15.12, text: " The frame is a rectangle." },
    { start: 15.15, end: 19.15, text: " It is green, blue, brown and yellow." },
    { start: 19.18, end: 21.17, text: "I like my picture. " },
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

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 29.2, y1: 34.5, sound: 1, isPrimary: true },

    // الصوت الأول – منطقة إضافية
    { x1: 21.2, y1: 25.06, x2: 34.3, y2: 42.8, sound: 1, isPrimary: false },

  ];
  const sounds = {
    1: sound2_8,
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
      {/* <img src={page_2} /> */}
      {areas.map((area, index) => {
       const isActive = activeId === `p29-${area.sound}`;

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
                  playSound(sounds[area.sound], `p29-${area.sound}`);
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
                playSound(sounds[area.sound], `p29-${area.sound}`);
            }}
          ></div>
        );
      })}
      <div
        className="headset-icon-CD-unit4-page2-1 hover:scale-110 transition"
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
                src={soundMyPicture}
                captions={captionsExample}
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
        className="headset-icon-CD-unit4-page2-2 hover:scale-110 transition"
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
                checkpoints={[0, 4.6, 6.21]}
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
        className="click-icon-unit4-page2-1 hover:scale-110 transition"
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
                audioSrc={CD28Pg29_Instruction1_AdultLady}
                checkpoints={[0, 4.05, 5.1, 6.13, 7.03]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions2}
              />
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

export default Unit4_Page2;
