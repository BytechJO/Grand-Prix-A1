import { useState, useRef } from "react";
import page_1 from "../../../assets/unit3/imgs3/right1-unit3-page1.jpg";
import "./Unit3_Page1.css";
import Pg22_U3_Intro_AdultLady from "../../../assets/unit3/sound3/U3 Page 22-23.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Unit3_Page1_find from "./Unit3_Page1_find";
import Unit3_Page1_Vocab from "./Unit3_Page1_Vocab";
import Unit3_Page1_Read from "./Unit3_Pag1_Read";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import sound1 from "../../../assets/unit3/sound3/U3P22VOC-01.mp3";
import sound2 from "../../../assets/unit3/sound3/U3P22VOC-02.mp3";
import sound3 from "../../../assets/unit3/sound3/U3P22VOC-03.mp3";
import sound7 from "../../../assets/unit3/sound3/U3P22VOC-07.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit3_Page1 = ({ openPopup }) => {

  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const captionsExample = [
    { start: 0, end: 4.02, text: "Page 22, unit 3. Let's go to school. " },
    { start: 4.05, end: 7.11, text: "Page 22, unit 3 vocabulary. " },
    { start: 7.14, end: 9.24, text: "1.	numbers." },
    { start: 9.27, end: 12.16, text: "2.	close your book." },
    { start: 12.2, end: 15.12, text: "3.	open your book. " },
    { start: 15.15, end: 18.12, text: "4.	make a line. " },
    { start: 18.15, end: 21.06, text: "5.	listen. " },
    { start: 21.1, end: 23.25, text: "6.	quiet." },
    { start: 23.29, end: 27.16, text: "7.	take out your pencil. " },
    { start: 27.2, end: 31.15, text: "Page 22. Listen and read along." },
    { start: 31.19, end: 35.18, text: "Short A. Ant, pan, rat. " },
    { start: 35.21, end: 38.11, text: "Page 23, come and sing. " },
    {
      start: 38.15,
      end: 49.8,
      text: "I love school. We open our books. We make a line. We do many things. My teacher plays songs. We listen. ",
    },
    { start: 49.82, end: 53.01, text: "Page 23. Listen, read, and repeat. " },
    {
      start: 53.05,
      end: 56.26,
      text: "My favorite subject is science. ",
    },
    { start: 56.3, end: 59.18, text: "My favorite subject is art. " },
    { start: 59.21, end: 63.21, text: "Page 23. Listen and read along." },
    { start: 63.24, end: 67.26, text: "Short A. Bat, cap, dad." },
  ];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 24.2, y1: 18.8, sound: 1, isPrimary: true },

    // // // الصوت الأول – منطقة إضافية
    { x1: 23.5, y1: 12.23, x2: 70.9, y2: 33.4, sound: 1, isPrimary: false },

    // // // الصوت الثاني – الأساسية
    { x1: 45.6, y1: 52.8, sound: 2, isPrimary: true },

    // // // الصوت الثاني – الإضافية
    { x1: 50.23, y1: 42.8, x2: 71.8, y2: 57.9, sound: 2, isPrimary: false },

    // // // الصوت الثالث – الأساسية
    { x1: 75.6, y1: 42.8, sound: 3, isPrimary: true },

    // // // الصوت الثالث – الإضافية
    { x1: 84, y1: 34.06, x2: 98, y2: 44.9, sound: 3, isPrimary: false },
    // // // الصوت الرابع – الأساسية
    { x1: 70.8, y1: 62.6, sound: 4, isPrimary: true },

    // // الصوت الرابع – الإضافية
    { x1: 78, y1: 54.3, x2: 99.4, y2: 65.03, sound: 4, isPrimary: false },
  ];
  const sounds = {
    1: sound1,
    2: sound2,
    3: sound3,
    4: sound7,
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
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />
      {areas.map((area, index) => {
        const isActive = activeId === `p22-${area.sound}`;
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
                playSound(sounds[area.sound], `p22-${area.sound}`);
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
              playSound(sounds[area.sound], `p22-${area.sound}`);
            }}
          ></div>
        );
      })}
      <div
        className="headset-icon-CD-unit3-page1-1 hover:scale-110 transition"
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
                  src={Pg22_U3_Intro_AdultLady}
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
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="click-icon-unit3-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit3_Page1_find />
              </>,
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
      <div
        className="headset-icon-CD-unit3-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit3_Page1_Vocab />
              </>,
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
      <div
        className="click-icon-unit3-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit3_Page1_Read />
              </>,
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

export default Unit3_Page1;
