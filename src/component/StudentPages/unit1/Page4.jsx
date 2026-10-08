import React, { useState, useRef, useEffect } from "react";
import page4 from "../../../assets/unit1/imgs/Pages/Right 1 Unit 01 Good Morning World 2_page-0004.jpg";
import allUnitSound from "../../../assets/unit1/sounds/U1 P4-5.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import img1 from "../../../assets/unit1/imgs/P1 listen and read 01.svg";
import img2 from "../../../assets/unit1/imgs/deer33.svg";
import img3 from "../../../assets/unit1/imgs/dish22.svg";
import img4 from "../../../assets/unit1/imgs/duck22.svg";
import duck from "../../../assets/unit1/sounds/Pg4_1.4_Adult Lady.mp3";
import deer from "../../../assets/unit1/sounds/Pg4_1.2_Adult Lady.mp3";
import dish from "../../../assets/unit1/sounds/Pg4_1.3_Adult Lady.mp3";
import dSound from "../../../assets/unit1/sounds/Pg4_1.1_Adult Lady.mp3";
import Page4_Interactive1 from "./Page4_Interactive1";
import Page4_vocabulary from "./Page4_vocabulary";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import longAudio from "../../../assets/unit1/sounds/pg4-instruction1-adult-lady_9KnGFLcl.mp3";
import sound1 from "../../../assets/unit1/sounds/pg4-vocabulary-1-goodbye.mp3";
import sound4 from "../../../assets/unit1/sounds/pg4-vocabulary-4-hello..mp3";
import sound5 from "../../../assets/unit1/sounds/pg4-vocabulary-5-good morning.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  // أصوات الصور
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(dSound),
    new Audio(deer),
    new Audio(dish),
    new Audio(duck),
  ];
  const captionsExample = [
    { start: 0, end: 4.25, text: "Page 4, Unit 1. Good morning, world." },
    { start: 4.3, end: 6.0, text: "Vocabulary." },
    { start: 6.01, end: 8.16, text: "1. Goodbye." },
    { start: 8.2, end: 10.26, text: " 2. How are you? " },
    { start: 10.3, end: 13.28, text: "3. Fine, thank you." },
    { start: 13.33, end: 16.08, text: "4. Hello. " },
    { start: 16.12, end: 18.25, text: "5. Good morning." },
    { start: 18.3, end: 21.12, text: "Page 4. Listen and read along." },
    { start: 21.15, end: 25.05, text: " D. Dear. Dish. Duck. " },
    { start: 25.1, end: 26.05, text: "Page 5. " },
    {
      start: 26.1,
      end: 36.21,
      text: "Meet my cat. Hello. How are you? I'm Stella. This is my cat. Her name is Lolo. She is one year old. She likes people.",
    },
    { start: 36.27, end: 40.17, text: " Page 5. Listen, read, and repeat. " },
    { start: 40.2, end: 42.05, text: "Hello. How are you? " },
    { start: 42.1, end: 43.19, text: "Fine, thank you. " },
    { start: 43.24, end: 46.28, text: " Page 5. Listen and read along. " },
    { start: 46.33, end: 51.03, text: "T. Table. Taxi. Tiger." },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 44.9, y1: 44.6, x2: 48.03, y2: 49, sound: 1, isPrimary: true },

    // الصوت الأول – منطقة إضافية
    { x1: 49.2, y1: 37.3, x2: 74.4, y2: 79.8, sound: 1, isPrimary: false },

    // الصوت الثاني – الأساسية
    { x1: 86.5, y1: 24.2, x2: 90.4, y2: 27.2, sound: 2, isPrimary: true },

    // الصوت الثاني – الإضافية
    { x1: 83.7, y1: 28.4, x2: 97.4, y2: 48.9, sound: 2, isPrimary: false },

    // الصوت الثالث – الأساسية
    { x1: 75, y1: 27.3, x2: 79.5, y2: 30.5, sound: 3, isPrimary: true },

    // الصوت الثالث – الإضافية
    { x1: 77.9, y1: 21.8, x2: 81.7, y2: 43.8, sound: 3, isPrimary: false },
  ];
  const sounds = {
    1: sound1,
    2: sound4,
    3: sound5,
  };
  const captions = [
    { start: 0, end: 3.0, text: "Page 4. Listen and read along." },
    { start: 3.02, end: 6.1, text: " D. Dear. Dish. Duck. " },
  ];
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
    <>
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page4})` }}
        onClick={handleImageClick}
      >
        <audio ref={audioRef} style={{ display: "none" }} />

        {/* <img
          src={page4}
          onClick={handleImageClick}
          style={{ display: "block" }}
        /> */}

        {areas.map((area, index) => {
          const isActive = activeId === `p4-${area.sound}`;

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
                  playSound(sounds[area.sound], `p4-${area.sound}`);
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
                playSound(sounds[area.sound], `p4-${area.sound}`);
              }}
            ></div>
          );
        })}

        <div
          className="headset-icon-CD-page4-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() =>
              openPopup(
                "audio",
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <AudioWithCaption
                    src={allUnitSound}
                    captions={captionsExample}
                  />
                </div>,
              )
            }
            style={{ overflow: "visible" }}
          >
            <image
              className="svg-img"
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
          className="click-icon-page4-1 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <Page4_Interactive1 />)}
            style={{ overflow: "visible" }}
          >
            <image
              className="svg-img"
              href={arrowBtn}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>

        <div
          className="headset-icon-CD-page4-2 hover:scale-110 transition"
          style={{ overflow: "visible" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 90 90"
            onClick={() => openPopup("html", <Page4_vocabulary />)}
            style={{ overflow: "visible" }}
          >
            <image
              className="svg-img"
              href={arrowBtn}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>
        <div
          className="click-icon-page4 hover:scale-110 transition"
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
                  audioSrc={longAudio}
                  checkpoints={[0, 2.9, 3.4, 4.2, 5.1]}
                  popupOpen={true}
                  titleQ={"Listen and read along."}
                  audioArr={imageSounds}
                  captions={captions}
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
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Page4;
