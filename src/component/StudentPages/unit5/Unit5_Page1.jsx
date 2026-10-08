import page_1 from "../../../assets/unit5/imgs/Right 1 Unit 05 Welcome to My Class.jpg";
import "./Unit5_Page1.css";
import { useState, useRef } from "react";
import Pg22_U3_Intro_AdultLady from "../../../assets/unit5/sounds/U5P40-41.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Unit5_Page1_find from "./Unit5_Page1_find";
import Unit5_Page1_Vocab from "./Unit5_Page1_Vocab";
import Unit5_Page1_Read from "./Unit5_Pag1_Read";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import sound1 from "../../../assets/unit5/sounds/U5P40-01.mp3";
import sound2 from "../../../assets/unit5/sounds/U5P40-02.mp3";
import sound4 from "../../../assets/unit5/sounds/U5P40-04.mp3";
import sound7 from "../../../assets/unit5/sounds/U5P40-07.mp3";
import sound8 from "../../../assets/unit5/sounds/U5P40-08.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit5_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const captionsExample = [
    { start: 0, end: 4.09, text: "Page 40, Unit 5: Welcome to My Class." },
    { start: 4.12, end: 7.26, text: "Page 40, Unit 5 Vocabulary: " },
    { start: 7.29, end: 10.13, text: "1.	Board." },
    { start: 10.17, end: 12.11, text: "2.	Map." },
    { start: 12.14, end: 14.21, text: "3.	Book." },
    { start: 14.24, end: 17.22, text: "4.	Globe. " },
    { start: 17.25, end: 20.02, text: "5.	Poster." },
    { start: 20.05, end: 22.17, text: "6.	trash bin." },
    { start: 22.2, end: 24.24, text: "7.	Desk." },
    { start: 24.27, end: 27.07, text: "8.	Chair." },
    { start: 27.1, end: 30.09, text: "Page 40. Listen and read along" },
    { start: 30.12, end: 34.24, text: "G, girl, green, garden. " },
    {
      start: 34.27,
      end: 49.8,
      text: "Page 41. The things on my desk. ",
    },
    {
      start: 49.83,
      end: 51.05,
      text: "Welcome to my class. This is my desk, this is my book, my eraser, and my pencil. My teacher's desk is there. There's a globe on it. I love my class. ",
    },
    {
      start: 51.08,
      end: 56.06,
      text: "Page 41. Listen, read, and repeat. ",
    },
    { start: 56.09, end: 57.29, text: "Do you like your class? " },
    { start: 57.32, end: 60.06, text: "I like my class. " },
    { start: 60.09, end: 64.16, text: "Page 41. Listen and read along. " },
    { start: 64.19, end: 68.18, text: "K, key, kite, kitchen..." },
  ];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 51.3, y1: 20.6, sound: 1, isPrimary: true },

    // الصوت الأول – منطقة إضافية
    { x1: 22.00, y1: 16.23, x2: 71.9, y2: 32.4, sound: 1, isPrimary: false },

// الصوت الثاني – الأساسية
    { x1: 88.3, y1: 22.89, sound: 2, isPrimary: true },

    // // // // الصوت الثاني – الإضافية
    { x1: 87.5, y1: 13.07, x2: 99.35, y2: 28.47, sound: 2, isPrimary: false },

    // // // // الصوت الثالث – الأساسية
    { x1: 79.3, y1: 32.7, sound: 3, isPrimary: true },

    // // // // الصوت الثالث – الإضافية
    { x1: 76.9, y1: 28.3, x2: 83.4, y2: 37.9, sound: 3, isPrimary: false },
    // // // // الصوت الرابع – الأساسية
    { x1: 80.65, y1: 47.6, sound: 4, isPrimary: true },

    // // // الصوت الرابع – الإضافية
    { x1: 73, y1: 49.2, x2: 99.4, y2: 56.03, sound: 4, isPrimary: false },

    // // // // الصوت الخامس – الأساسية
    { x1: 45.8, y1: 34.7, sound: 5, isPrimary: true },

    // // // الصوت الخامس – الإضافية
    { x1: 42.9, y1: 34.57, x2: 52.6, y2: 45.23, sound: 5, isPrimary: false },
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
        const isActive = activeId === `p40-${area.sound}`;

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
              playSound(sounds[area.sound], `p40-${area.sound}`);
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
            playSound(sounds[area.sound], `p40-${area.sound}`);
            }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit5-page1-1 hover:scale-110 transition"
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
        className="click-icon-unit5-page1-1  hover:scale-110 transition"
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
                <Unit5_Page1_find />
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
        className="headset-icon-CD-unit5-page1-2 hover:scale-110 transition"
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
                <Unit5_Page1_Vocab />
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
        className="click-icon-unit5-page1-2 hover:scale-110 transition"
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
                <Unit5_Page1_Read />
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

export default Unit5_Page1;
