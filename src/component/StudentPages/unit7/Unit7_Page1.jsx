import { useState, useRef } from "react";
import page_1 from "../../../assets/unit7/img/Right 1 Unit 07 What are Matter.jpg";
import "./Unit7_Page1.css";
import Unit7_Page1_find from "./Unit7_Page1_find";
import Unit7_Page1_Vocab from "./Unit7_Page1_Vocab";
import Unit7_Page1_Read from "./Unit7_Pag1_Read";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import allUnit2 from "../../../assets/unit7/sound/U7P58-59.mp3";
import sound1 from "../../../assets/unit7/sound/U7VOC-01.mp3";
import sound2 from "../../../assets/unit7/sound/U7VOC-02.mp3";
import sound3 from "../../../assets/unit7/sound/U7VOC-03.mp3";
import sound4 from "../../../assets/unit7/sound/U7VOC-04.mp3";
import sound7 from "../../../assets/unit7/sound/U7VOC-07.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit7_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const captionsExample = [
    { start: 0, end: 4.0, text: "Page 58, Unit 7, What's the Matter. " },
    { start: 4.05, end: 9.0, text: "Page 58, Unit 7 Vocabulary. " },
    { start: 9.02, end: 12.0, text: "1.	cold.  " },
    { start: 12.02, end: 14.0, text: "2.	shiver." },
    { start: 14.02, end: 17.0, text: "3.	hungry. " },
    { start: 17.04, end: 19.0, text: "4.	bored." },
    { start: 19.02, end: 22.0, text: " 5.	scared. " },
    { start: 22.02, end: 24.0, text: " 6.	crawl. " },
    { start: 24.02, end: 27.0, text: "7.	listen." },
    { start: 27.02, end: 29.0, text: "8.	sad.  " },
    { start: 29.02, end: 33.0, text: "9.	broken." },
    { start: 33.02, end: 35.0, text: "10.	happy. " },
    {
      start: 35.02,
      end: 39.0,
      text: "Page 58. Listen and read along",
    },
    {
      start: 39.02,
      end: 43.0,
      text: " H. Hand, hat, house. ",
    },
    {
      start: 43.02,
      end: 46.0,
      text: "Page 59. I'm happy. ",
    },
    { start: 46.02, end: 50.0, text: "I like to go to the park. " },
    {
      start: 50.02,
      end: 58.0,
      text: "I go with my grandparents. We talk about school. I am happy. Are you happy too? ",
    },
    { start: 58.02, end: 62.0, text: "Page 59. Listen, read, and repeat.  " },
    { start: 50.18, end: 64.0, text: "I'm happy. " },
    {
      start: 64.02,
      end: 66.0,
      text: "I'm happy too. ",
    },
    { start: 66.02, end: 69.0, text: "Page 59. Listen and read along." },
    { start: 69.2, end: 73.25, text: " W. Water, window, woman." },
  ];

  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 70.8, y1: 28.5, sound: 1, isPrimary: true },

    // // // الصوت الأول – منطقة إضافية
    { x1: 70.65, y1: 21.08, x2: 81.5, y2: 39.81, sound: 1, isPrimary: false },

    // // // الصوت الثاني – الأساسية
    { x1: 79.8, y1: 25.5, sound: 2, isPrimary: true },

    // // // الصوت الثاني – الإضافية
    { x1: 70.65, y1: 21.08, x2: 81.5, y2: 39.81, sound: 2, isPrimary: false },

    // // // الصوت الثالث – الأساسية
    { x1: 47.8, y1: 16.9, sound: 3, isPrimary: true },

    // // // الصوت الثالث – الإضافية
    { x1: 47.0, y1: 22.14, x2: 51.07, y2: 37.98, sound: 3, isPrimary: false },
    // // // الصوت الرابع – الأساسية
    { x1: 27.7, y1: 36, sound: 4, isPrimary: true },

    // // // الصوت الرابع – الإضافية
    { x1: 28.38, y1: 29.91, x2: 41.76, y2: 52.91, sound: 4, isPrimary: false },

    // // // الصوت الخامس – الأساسية
    { x1: 70.4, y1: 54.5, sound: 5, isPrimary: true },

    // // // الصوت الخامس – الإضافية
    { x1: 52.62, y1: 44.53, x2: 75.89, y2: 83.52, sound: 5, isPrimary: false },
  ];
  const sounds = {
    1: sound1,
    2: sound2,
    3: sound3,
    4: sound4,
    5: sound7,
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
      {/* <img
        src={page_1}
        onClick={handleImageClick}
        style={{ display: "block" }}
      /> */}
      {areas.map((area, index) => {
        const isActive = activeId === `p58-${area.sound}`;

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
                playSound(sounds[area.sound], `p58-${area.sound}`);
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
              playSound(sounds[area.sound], `p58-${area.sound}`);
            }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit7-page1-1 hover:scale-110 transition"
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
                <AudioWithCaption src={allUnit2} captions={captionsExample} />
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
        className="click-icon-unit7-page1-1 hover:scale-110 transition"
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
                <Unit7_Page1_find />
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
        className="headset-icon-CD-unit7-page1-2 hover:scale-110 transition"
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
                <Unit7_Page1_Vocab />
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
        className="click-icon-unit7-page1-2 hover:scale-110 transition"
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
                <Unit7_Page1_Read />
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

export default Unit7_Page1;
