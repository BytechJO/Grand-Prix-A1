import page_1 from "../../../assets/unit9/imgs/Right 1 Unit 09 A Day on the Farm.png";
import "./Unit9_Page1.css";
import { useState, useRef } from "react";
import Pg22_U3_Intro_AdultLady from "../../../assets/unit9/sound/cd68pg76-u9intro-adult-lady_VJ2J9KK4.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Unit9_Page1_find from "./Unit9_Page1_find";
import Unit9_Page1_Vocab from "./Unit9_Page1_Vocab";
import Unit9_Page1_Read from "./Unit9_Pag1_Read";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import sound1 from "../../../assets/unit9/sound/unit9-sound1.mp3";
import sound2 from "../../../assets/unit9/sound/unit9-sound2.mp3";
import sound4 from "../../../assets/unit9/sound/unit9-sound3.mp3";
import sound7 from "../../../assets/unit9/sound/unit9-sound4.mp3";
import sound8 from "../../../assets/unit9/sound/unit9-sound5.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit9_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
const captionsExample = [
  {
    start: 0.539,
    end: 4.639,
    text: "Page 76, Unit 9. A day on the farm.",
  },
  {
    start: 5.099,
    end: 8.34,
    text: "Page 76, Unit 9, vocabulary.",
  },
  {
    start: 9.139,
    end: 10.679,
    text: "One, horse.",
  },
  {
    start: 11.139,
    end: 12.859,
    text: "Two, stable.",
  },
  {
    start: 13.439,
    end: 15.279,
    text: "Three, barn.",
  },
  {
    start: 15.979,
    end: 17.739,
    text: "Four, chicken.",
  },
  {
    start: 18.619,
    end: 20.319,
    text: "Five, goat.",
  },
  {
    start: 21.059,
    end: 22.899,
    text: "Six, cow.",
  },
  {
    start: 23.659,
    end: 25.479,
    text: "Seven, grass.",
  },
  {
    start: 26.0,
    end: 27.659,
    text: "Eight, cat.",
  },
  {
    start: 28.439,
    end: 31.579,
    text: "Page 76, listen and read along.",
  },
  {
    start: 32.239,
    end: 35.7,
    text: "M, milk, man, mom.",
  },
  {
    start: 36.459,
    end: 37.959,
    text: "Page 77.",
  },
  {
    start: 38.719,
    end: 40.059,
    text: "I like horses.",
  },
  {
    start: 40.819,
    end: 43.599,
    text: "Hansel, Harley, and I like to go to the farm.",
  },
  {
    start: 44.18,
    end: 45.899,
    text: "There are many animals to see.",
  },
  {
    start: 46.659,
    end: 48.699,
    text: "Hansel likes cows and horses.",
  },
  {
    start: 49.259,
    end: 50.419,
    text: "Harley likes goats.",
  },
  {
    start: 50.879,
    end: 51.919,
    text: "I like horses.",
  },
  {
    start: 52.719,
    end: 57.319,
    text: "Page 77. Listen, read, and repeat.",
  },
  {
    start: 58.5,
    end: 59.539,
    text: "I like horses.",
  },
  {
    start: 60.259,
    end: 61.239,
    text: "I like cats.",
  },
  {
    start: 62.02,
    end: 65.479,
    text: "Page 77. Listen and read along.",
  },
  {
    start: 66.599,
    end: 69.899,
    text: "N, nest, night, nurse.",
  },
];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 42.5, y1: 28, sound: 1, isPrimary: true },

//     // الصوت الأول – منطقة إضافية
    { x1: 24.37, y1: 25.77, x2: 55.83, y2: 38.4, sound: 1, isPrimary: false },

// // الصوت الثاني – الأساسية
    { x1: 20.7, y1: 26.5, sound: 2, isPrimary: true },

//     // // // // الصوت الثاني – الإضافية
    { x1: 18.56, y1: 28.13, x2: 23.51, y2: 36.4, sound: 2, isPrimary: false },

//     // // // // الصوت الثالث – الأساسية
    { x1: 85.8, y1: 22.2, sound: 3, isPrimary: true },

//     // // // // الصوت الثالث – الإضافية
    { x1: 72.42, y1: 19.17, x2: 87.29, y2: 34.4, sound: 3, isPrimary: false },
//     // // // // الصوت الرابع – الأساسية
    { x1: 81.5, y1: 45.5, sound: 4, isPrimary: true },

//     // // // الصوت الرابع – الإضافية
    { x1: 74.14, y1: 47.93, x2: 95.48, y2: 58.03, sound: 4, isPrimary: false },

//     // // // // الصوت الخامس – الأساسية
    { x1: 69.9, y1: 66.8, sound: 5, isPrimary: true },

//     // // // الصوت الخامس – الإضافية
    { x1: 59.92, y1: 64.18, x2: 78.02, y2: 76.03, sound: 5, isPrimary: false },
  ];
  const sounds = {
    1: sound1,
    2: sound2,
    3: sound4,
    4: sound7,
    5: sound8,
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
      {/* <img src={page_1} /> */}

      <audio ref={audioRef} style={{ display: "none" }} />
      {areas.map((area, index) => {
        const isActive = activeId === `p76-${area.sound}`;

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
                 playSound(sounds[area.sound], `p76-${area.sound}`);
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
               playSound(sounds[area.sound], `p76-${area.sound}`);
              }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit9-page1-1 hover:scale-110 transition"
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
              </div>
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
        className="click-icon-unit9-page1-1  hover:scale-110 transition"
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
                <Unit9_Page1_find />
              </>
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
        className="headset-icon-CD-unit9-page1-2 hover:scale-110 transition"
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
                <Unit9_Page1_Vocab />
              </>,
              false
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
        className="click-icon-unit9-page1-2 hover:scale-110 transition"
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
                <Unit9_Page1_Read />
              </>
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

export default Unit9_Page1;
