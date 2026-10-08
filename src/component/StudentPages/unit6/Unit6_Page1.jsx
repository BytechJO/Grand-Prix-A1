import page_1 from "../../../assets/unit6/imgs/Right 1 Unit 06 Can We Go to the Park.jpg";
import "./Unit6_Page1.css";
import Pg22_U3_Intro_AdultLady from "../../../assets/unit6/sounds/U6P46VOC.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import Unit6_Page1_find from "./Unit6_Page1_find";
import Unit6_Page1_Vocab from "./Unit6_Page1_Vocab";
import Unit6_Page1_Read from "./Unit6_Pag1_Read";
import { useState, useRef } from "react";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import sound1 from "../../../assets/unit6/sounds/U6P46VOC-01.mp3";

import sound3 from "../../../assets/unit6/sounds/U6P46VOC-03.mp3";
import sound4 from "../../../assets/unit6/sounds/U6P46VOC-04.mp3";
import sound5 from "../../../assets/unit6/sounds/U6P46VOC-05.mp3";

import sound7 from "../../../assets/unit6/sounds/U6P46VOC-07.mp3";
import sound8 from "../../../assets/unit6/sounds/U6P46VOC-08.mp3";

import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit6_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const captionsExample = [
    { start: 0, end: 5.02, text: "Page 46, Unit 6. Can we go to the park? " },
    { start: 5.05, end: 8.13, text: "Page 46, Unit 6, Vocabulary" },
    { start: 8.15, end: 11.08, text: "1. Fly a kite." },
    { start: 11.10, end: 13.23, text: "2. Play the violin." },
    { start: 13.25, end: 16.23, text: "3. Ride a bike." },
    { start: 16.25, end: 19.25, text: "4. Ride a scooter. " },
    { start: 19.27, end: 22.29, text: "5. Feed the birds." },
    { start: 22.31, end: 26.02, text: "6. Climb a tree. " },
    { start: 26.05, end: 28.17, text: "7. Fish. " },
    { start: 28.19, end: 31.05, text: "8. Paint a picture." },
    { start: 31.08, end: 33.21, text: "9. Swim. " },
    { start: 33.25, end: 37.22, text: "Page 46, Listen and read along. " },
    {
      start: 37.25,
      end: 42.20,
      text: "Short I. Sit.Hill. Pin. ",
    },
    { start: 42.23, end: 45.25, text: "Page 47, Look at my kite." },
    {
      start: 45.28,
      end: 56.00,
      text: "I can fly a kite. My kite is in the sky. It is colorful.Tilly likes to watch. She can't fly a kite. She can jump. ",
    },
    { start: 56.03, end: 59.16, text: "Page 47, Listen and read along." },
    { start: 59.20, end: 62.22, text: " Can you climb a tree? Yes, I can. " },
    { start: 62.26, end: 66.21, text: "Page 47, Listen and read along." },
    { start: 66.24, end: 71.05, text: "Short I. Wig. Mitt. Dig." },
  ];


  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 59.1, y1: 24.1, sound: 1, isPrimary: true },
    // الصوت الأول – منطقة إضافية
    { x1: 49.7, y1: 24.73, x2: 55.7, y2: 39.5, sound: 1, isPrimary: false },

    // // الصوت الثاني – الأساسية
    { x1: 45.9, y1: 49.1, sound: 2, isPrimary: true },
    // // // // // الصوت الثاني – الإضافية
    { x1: 47.0, y1: 42.71, x2: 60.5, y2: 59.6, sound: 2, isPrimary: false },

    // // // // // الصوت الثالث – الأساسية
    { x1: 76.3, y1: 37.8, sound: 3, isPrimary: true },
    // // // // // الصوت الثالث – الإضافية
    { x1: 68.7, y1: 37.98, x2: 82.8, y2: 46.67, sound: 3, isPrimary: false },

    // // // // // الصوت الرابع – الأساسية
    { x1: 29.8, y1: 39.05, sound: 4, isPrimary: true },
    // // // // الصوت الرابع – الإضافية
    { x1: 32.45, y1: 30.06, x2: 42.54, y2: 37.98, sound: 4, isPrimary: false },

    // // // // // الصوت الخامس – الأساسية
    { x1: 76.8, y1: 66.3, sound: 5, isPrimary: true },
    // // // // الصوت الخامس – الإضافية
    { x1: 68.7, y1: 64.18, x2: 81.9, y2: 68.75, sound: 5, isPrimary: false },

    // // // // // الصوت السادس – الأساسية
    { x1: 81.2, y1: 69.5, sound: 6, isPrimary: true },
    // // // // الصوت السادس – الإضافية
    { x1: 84.23, y1: 60.37, x2: 93.54, y2: 79.87, sound: 6, isPrimary: false },
  ];
  const sounds = {
    1: sound1,
    2: sound3,
    3: sound4,
    4: sound5,
    5: sound7,
    6: sound8,
  };
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
const playSound = (soundPath, id) => {
    if (!audioRef.current) return;

    // 🔥 وقف أي صوت شغال بأي صفحة
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    audioRef.current.src = soundPath;
    audioRef.current.play();

    setActiveId(id); // 🔥 هذا المهم

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
       const isActive = activeId === `p23-${area.sound}`;

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
                playSound(sounds[area.sound], `p46-${area.sound}`);
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
             playSound(sounds[area.sound], `p46-${area.sound}`);
            }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit6-page1-1 hover:scale-110 transition"
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
        className="click-icon-unit6-page1-1  hover:scale-110 transition"
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
                <Unit6_Page1_find />
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
        className="headset-icon-CD-unit6-page1-2 hover:scale-110 transition"
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
                <Unit6_Page1_Vocab />
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
        className="click-icon-unit6-page1-2 hover:scale-110 transition"
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
                <Unit6_Page1_Read />
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

export default Unit6_Page1;
