import page_1 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream.jpg";
import "./Unit10_Page1.css";
import { useState, useRef } from "react";
import Pg22_U3_Intro_AdultLady from "../../../assets/unit10/sound/cd75pg82-u10intro-adult-lady_N8Bgs17b.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Unit10_Page1_find from "./Unit10_Page1_find";
import Unit10_Page1_Vocab from "./Unit10_Page1_Vocab";
import Unit10_Page1_Read from "./Unit10_Pag1_Read";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import sound1 from "../../../assets/unit10/sound/unit10-sound1.mp3";
import sound2 from "../../../assets/unit10/sound/unit10-sound2.mp3";
import sound3 from "../../../assets/unit10/sound/unit10-sound3.mp3";
import sound4 from "../../../assets/unit10/sound/unit10-sound4.mp3";
import sound5 from "../../../assets/unit10/sound/unit10-sound5.mp3";
import sound6 from "../../../assets/unit10/sound/unit10-sound6.mp3";
import sound7 from "../../../assets/unit10/sound/unit10-sound7.mp3";
import sound8 from "../../../assets/unit10/sound/unit10-sound8.mp3";
import sound10 from "../../../assets/unit10/sound/unit10-sound10.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit10_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
 const captionsExample = [
  { start: 0.479, end: 2.579, text: "Page 82, unit 10." },
  { start: 3.159, end: 4.759, text: "We want ice cream." },

  { start: 5.559, end: 8.3, text: "Page 82, unit 10 vocabulary." },
  { start: 9.0, end: 9.619, text: "Ice cream" },
  { start: 10.219, end: 10.659, text: "milk" },
  { start: 11.3, end: 11.779, text: "bread" },
  { start: 12.5, end: 13.019, text: "sweet" },
  { start: 13.799, end: 14.179, text: "apple" },
  { start: 14.92, end: 15.359, text: "fruit" },
  { start: 16.18, end: 16.639, text: "chicken" },
  { start: 17.539, end: 17.959, text: "order" },
  { start: 18.739, end: 19.18, text: "wait" },
  { start: 19.84, end: 20.68, text: "cafeteria" },

  { start: 21.199, end: 22.219, text: "Page 82." },
  { start: 22.659, end: 23.979, text: "Listen and read along." },
  { start: 24.579, end: 25.559, text: "Short E" },
  { start: 25.959, end: 26.299, text: "bed" },
  { start: 26.859, end: 27.219, text: "egg" },
  { start: 27.599, end: 28.0, text: "hen" },

  { start: 28.719, end: 29.76, text: "Page 83." },
  { start: 30.34, end: 31.099, text: "Lunchtime." },

  { start: 32.059, end: 32.599, text: "Welcome." },
  { start: 32.759, end: 33.799, text: "It's time for lunch." },
  { start: 34.279, end: 35.54, text: "We eat different foods." },
  { start: 35.979, end: 36.759, text: "I want chicken." },
  { start: 37.079, end: 38.039, text: "Harley wants bread." },
  { start: 38.479, end: 39.54, text: "Hansel wants milk." },
  { start: 39.86, end: 41.119, text: "We all want fruit." },

  { start: 41.759, end: 43.039, text: "Welcome to my house." },
  { start: 43.819, end: 44.399, text: "Thank you." },

  { start: 45.239, end: 46.299, text: "Page 83." },
  { start: 46.979, end: 48.419, text: "Listen and read along." },
  { start: 49.36, end: 50.259, text: "Short E" },
  { start: 50.659, end: 51.099, text: "ten" },
  { start: 51.759, end: 52.18, text: "net" },
  { start: 52.899, end: 53.379, text: "jet" },
];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 45.9, y1: 48.3, sound: 1, isPrimary: true },

    // الصوت الأول – منطقة إضافية
    { x1: 45.70, y1: 50.98, x2: 49.58, y2: 57.07, sound: 1, isPrimary: false },

    // // الصوت الثاني – الأساسية
    { x1: 76.0, y1: 34.89, sound: 2, isPrimary: true },

    // // // // // الصوت الثاني – الإضافية
    { x1: 66.82, y1: 35.75, x2: 82.12, y2: 37.78, sound: 2, isPrimary: false },

    // // // // // الصوت الثالث – الأساسية
    { x1: 39.7, y1: 35.7, sound: 3, isPrimary: true },

    // // // // // الصوت الثالث – الإضافية
    { x1: 35.79, y1: 37.10, x2: 51.31, y2: 40.83, sound: 3, isPrimary: false },
    // // // // // الصوت الرابع – الأساسية
    { x1: 70.2, y1: 46.9, sound: 4, isPrimary: true },

    // // // // الصوت الرابع – الإضافية
    { x1: 62.08, y1: 48.78, x2: 74.58, y2: 50.98, sound: 4, isPrimary: false },

    // // // // // الصوت الخامس – الأساسية
    { x1: 38.4, y1: 27.6, sound: 5, isPrimary: true },

    // // // // الصوت الخامس – الإضافية
    { x1: 36.22, y1: 31.69, x2: 39.89, y2: 32.37, sound: 5, isPrimary: false },
    // // // // // الصوت السادس  – الأساسية
    { x1: 26.6, y1: 30.3, sound: 6, isPrimary: true },

    // // // // الصوت السادس – الإضافية
    { x1: 29.54, y1: 28.64, x2: 34.93, y2: 34.06, sound: 6, isPrimary: false },
    // // // // // الصوت السابع  – الأساسية
    { x1: 38.8, y1: 22, sound: 7, isPrimary: true },

    // // // // الصوت السابع – الإضافية
    { x1: 40.75, y1: 20.35, x2: 52.17, y2: 26.10, sound: 7, isPrimary: false },
    // // // // // الصوت الثامن – الأساسية
    { x1: 83.3, y1: 42.4, sound: 8, isPrimary: true },

    // // // // الصوت الثامن – الإضافية
    { x1: 82.76, y1: 31.35, x2: 94.40, y2: 59.95, sound: 8, isPrimary: false },
    // // // // // الصوت التاسع – الأساسية
    { x1: 86.5, y1: 22.8, sound: 9, isPrimary: true },

    // // // // الصوت التاسع – الإضافية
    // { x1: 42.9, y1: 34.57, x2: 52.6, y2: 45.23, sound: 9, isPrimary: false },
  ];
  const sounds = {
    1: sound1,
    2: sound2,
    3: sound3,
    4: sound4,
    5: sound5,
    6: sound6,
    7: sound7,
    8: sound8,
    9: sound10,
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
        const isActive = activeId === `p82-${area.sound}`;

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
                playSound(sounds[area.sound], `p82-${area.sound}`);
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
             playSound(sounds[area.sound], `p82-${area.sound}`);
              }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit10-page1-1 hover:scale-110 transition"
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
        className="click-icon-unit10-page1-1  hover:scale-110 transition"
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
                <Unit10_Page1_find />
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
        className="headset-icon-CD-unit10-page1-2 hover:scale-110 transition"
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
                <Unit10_Page1_Vocab />
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
        className="click-icon-unit10-page1-2 hover:scale-110 transition"
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
                <Unit10_Page1_Read />
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

export default Unit10_Page1;
