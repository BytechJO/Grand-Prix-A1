import React, { useState, useRef, useEffect } from "react";
import page_7 from "../../../assets/unit1/imgs/Pages/Right 1 Unit 01 Good Morning World 2_page-0007.jpg";
import CD5_Pg7_Grammar2_AdultLady from "../../../assets/unit1/sounds/pg7-grammar2-All.mp3";
import Pg7_2_1_AdultLady from "../../../assets/unit1/sounds/Pg7_2.1_Adult Lady.mp3";
import Pg7_2_2_AdultLady from "../../../assets/unit1/sounds/Pg7_2.2_Adult Lady.mp3";
import Pg7_2_3_AdultLady from "../../../assets/unit1/sounds/Pg7_2.3_Adult Lady.mp3";
import Pg7_2_4_AdultLady from "../../../assets/unit1/sounds/Pg7_2.4_Adult Lady.mp3";
import Pg7_3_1_Stella from "../../../assets/unit1/sounds/Pg7_3.1_Stella.mp3";
import Pg7_3_2_Mom from "../../../assets/unit1/sounds/Pg7_3.2_Mom.mp3";
import Pg7_4_1_Hansel from "../../../assets/unit1/sounds/Pg7_4.1_Hansel.mp3";
import Pg7_4_2_ModifiedJack from "../../../assets/unit1/sounds/Pg7_4.2_Modified Jack.mp3";
import Pg7_5_1_Dad from "../../../assets/unit1/sounds/Pg7_5.1_Dad.mp3";
import Pg7_5_2_Mom from "../../../assets/unit1/sounds/Pg7_5.2_Mom.mp3";
import Pg7_6_1_Mom from "../../../assets/unit1/sounds/Pg7_6.1_Mom and Dad.mp3";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import video2 from "../../../assets/unit1/sounds/p7 1920.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Page7 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));

    checkAreaAndPlaySound(xPercent, yPercent);
  };
  const captionsExample = [
    { start: 0, end: 4.05, text: "Page 7, exercise 2. Right grammar. " },
    { start: 4.09, end: 4.45, text: "Good morning." },
    { start: 4.47, end: 6.16, text: "Good afternoon." },
    { start: 6.2, end: 7.27, text: "Good evening. " },
    { start: 7.3, end: 9.01, text: "Goodbye. " },
    { start: 9.05, end: 10.16, text: "Good morning, Mom. " },
    { start: 10.2, end: 12.05, text: "Good morning, Stella. " },
    { start: 12.09, end: 13.12, text: "Good afternoon. " },
    { start: 13.16, end: 15.01, text: "Good afternoon." },
    { start: 15.05, end: 16.13, text: "Good evening" },
    { start: 16.17, end: 17.24, text: "Good evening" },
    { start: 17.27, end: 19.04, text: "Goodbye, Stella." },
  ];

  const clickableAreas = [
    { x1: 6.33, y1: 9.4, x2: 28.43, y2: 13.3, sound: Pg7_2_1_AdultLady },
    { x1: 29.25, y1: 9.4, x2: 50.14, y2: 13.3, sound: Pg7_2_2_AdultLady },
    { x1: 51.0, y1: 9.4, x2: 72.0, y2: 13.3, sound: Pg7_2_3_AdultLady },
    { x1: 73.0, y1: 9.4, x2: 89.0, y2: 13.3, sound: Pg7_2_4_AdultLady },
    { x1: 6.5, y1: 16.3, x2: 31.7, y2: 19.6, sound: Pg7_3_1_Stella },
    { x1: 19.4, y1: 41.0, x2: 44.8, y2: 44.6, sound: Pg7_3_2_Mom },
    { x1: 50.0, y1: 19.8, x2: 70.2, y2: 22.8, sound: Pg7_4_1_Hansel },
    { x1: 70.25, y1: 47.0, x2: 90.0, y2: 50.4, sound: Pg7_4_2_ModifiedJack },
    { x1: 7.2, y1: 58.0, x2: 27.0, y2: 61.2, sound: Pg7_5_1_Dad },
    { x1: 30.0, y1: 59.4, x2: 49.0, y2: 62.8, sound: Pg7_5_2_Mom },
    { x1: 71.2, y1: 61.0, x2: 90.7, y2: 64.5, sound: Pg7_6_1_Mom },
  ];

  const checkAreaAndPlaySound = (x, y) => {
    const area = clickableAreas.find(
      (a) => x >= a.x1 && x <= a.x2 && y >= a.y1 && y <= a.y2,
    );

    console.log("Matched Area:", area);

    if (area) playSound(area.sound);
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
      style={{ backgroundImage: `url(${page_7})` }}
    >
      {/* <img src={page_7} onClick={handleImageClick} /> */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            activeId === `p7-${area.sound}` || hoveredAreaIndex === index
              ? "highlight"
              : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            playSound(area.sound, `p7-${area.sound}`);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}
      <div
        className="headset-icon-CD-page7 hover:scale-110 transition"
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
                  src={CD5_Pg7_Grammar2_AdultLady}
                  captions={captionsExample}
                />
              </div>,
              true,
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
        className="pauseBtn-icon-CD-page7 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "video",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <video
                  autoPlay
                  controls
                  style={{
                    width: "auto",
                    height: "80%",
                    objectFit: "fill",
                    borderRadius: "20px",
                  }}
                >
                  <source src={video2} type="video/mp4" />
                </video>
              </div>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page7;
