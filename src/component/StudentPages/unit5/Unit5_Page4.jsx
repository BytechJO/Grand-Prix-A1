import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit5/imgs/Right 1 Unit 05 Welcome to My Class4.jpg";
import "./Unit5_Page4.css";
import CD23_pg25_Grammar2_AdultLady from "../../../assets/unit5/sounds/U5P43Grammar.mp3";
import sound1 from "../../../assets/unit5/sounds/Pg43_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit5/sounds/Pg43_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit5/sounds/Pg43_2.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit5/sounds/Pg43_2.4_Adult Lady.mp3";
import sound5 from "../../../assets/unit5/sounds/Pg43_3.1_Hansel.mp3";
import sound6 from "../../../assets/unit5/sounds/Pg43_3.2_Helen_Take 2.mp3";
import sound7 from "../../../assets/unit5/sounds/Pg43_4.1_Tom.mp3";
import sound8 from "../../../assets/unit5/sounds/Pg43_4.2_Harley.mp3";
import sound9 from "../../../assets/unit5/sounds/Pg43_5.1_Tom.mp3";
import sound10 from "../../../assets/unit5/sounds/Pg43_5.2_Helen_Take 2.mp3";
import video from "../../../assets/unit5/sounds/P43.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit5_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 5.04, text: "Page 43. Exercise 2: Right Grammar. " },
    { start: 5.07, end: 6.2, text: "Is this a ruler? " },
    { start: 6.23, end: 8.04, text: "Yes, it is. " },
    { start: 8.07, end: 10.07, text: "Is this your pen? " },
    { start: 10.1, end: 12.12, text: "No, it isn't. " },
    { start: 12.15, end: 14.04, text: "Is this a ruler? " },
    { start: 14.07, end: 15.29, text: "Yes, it is. " },
    { start: 15.32, end: 18.15, text: "Is this a book? " },
    { start: 18.18, end: 21.12, text: "No, it isn't. It's an eraser. " },
    { start: 21.15, end: 23.15, text: "Is this your pen? " },
    { start: 23.18, end: 25.05, text: "Yes, it is. " },
  ];

  const clickableAreas = [
    { x1: 8.35, y1: 12.15, x2: 26.1, y2: 15, sound: sound1 },
    { x1: 71.56, y1: 11.81, x2: 82.9, y2: 14.7, sound: sound2 },
    { x1: 8.35, y1: 15.7, x2: 28.9, y2: 18.5, sound: sound3 },
    { x1: 72.0, y1: 15.53, x2: 84.7, y2: 18.7, sound: sound4 },
    { x1: 6.55, y1: 31.27, x2: 24.2, y2: 35.07, sound: sound5 },
    { x1: 30.65, y1: 28.7, x2: 42.99, y2: 32.2, sound: sound6 },
    { x1: 64.2, y1: 30.09, x2: 81.7, y2: 33.7, sound: sound7 },
    { x1: 66.15, y1: 56.15, x2: 83.69, y2: 61.2, sound: sound8 },
    { x1: 39.09, y1: 63.59, x2: 59.6, y2: 67.23, sound: sound9 },
    { x1: 38.9, y1: 91.5, x2: 50.78, y2: 95.2, sound: sound10 },
  ];

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
      style={{ backgroundImage: `url(${page_4})` }}
    >
      {/* <img
        src={page_4}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            activeId === `p42-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p42-${area.sound}`);
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
        className="headset-icon-CD-unit5-page4-1 hover:scale-110 transition"
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
                  src={CD23_pg25_Grammar2_AdultLady}
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
        className="pauseBtn-icon-CD-unit5-page4-1 hover:scale-110 transition"
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
                    display: "block",
                  }}
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            href={pauseBtn}
            className="svg-img"
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

export default Unit5_Page4;
