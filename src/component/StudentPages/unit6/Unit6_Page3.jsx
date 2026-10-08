import React, { useState, useRef } from "react";
import page_3 from "../../../assets/unit6/imgs/Right 1 Unit 06 Can We Go to the Park3.jpg";
import "./Unit6_Page3.css";
import CD22_pg24_Grammar1_AdultLady from "../../../assets/unit6/sounds/U6P48RG.mp3";
import sound1 from "../../../assets/unit6/sounds/Pg48_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit6/sounds/Pg48_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit6/sounds/Pg48_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit6/sounds/Pg48_1.4_Adult Lady.mp3";
import sound5 from "../../../assets/unit6/sounds/Pg48_2.1_Adult Lady.mp3";
import sound6 from "../../../assets/unit6/sounds/Pg48_3.1_Adult Lady.mp3";
import sound7 from "../../../assets/unit6/sounds/Pg48_4.1_Adult Lady.mp3";
import sound8 from "../../../assets/unit6/sounds/Pg48_5.1_Jack.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/unit6/sounds/p48.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit6_Page3 = ({ openPopup }) => {
    const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.18, text: "Page 48 exercise one, Right Grammar," },
    { start: 4.20, end: 6.09, text: "I can swim. " },
    {
      start: 6.11,
      end: 8.23,
      text: "They can't fly a kite",
    },
    {
      start: 8.25,
      end: 10.22,
      text: "He can ride a bike. ",
    },
    { start: 10.25, end: 13.10, text: "It can't climb a tree, " },
    { start: 13.13, end: 16.02, text: "it can't climb a tree. " },
    { start: 16.05, end: 18.08, text: "He can ride a bike," },
    { start: 18.10, end: 20.16, text: "they can't fly a kite." },
    { start: 20.18, end: 22.10, text: "I can swim." },
  ];

  const clickableAreas = [
    { x1: 8.0, y1: 11.0, x2: 24.0, y2: 14.3, sound: sound1 },
    { x1: 8.0, y1: 15.7, x2: 29.4, y2: 19.4, sound: sound2 },
    { x1: 62.7, y1: 10.66, x2: 85.22, y2: 14.3, sound: sound3 },
    { x1: 62.7, y1: 15.7, x2: 85.8, y2: 19.2, sound: sound4 },
    { x1: 9.07, y1: 28.2, x2: 32.3, y2: 32.0, sound: sound5 },
    { x1: 54.5, y1: 27.4, x2: 77.05, y2: 31.0, sound: sound6 },
    { x1: 7.5, y1: 64.8, x2: 31.0, y2: 68.2, sound: sound7 },
    { x1: 60.8, y1: 65.1, x2: 74.6, y2: 69.05, sound: sound8 },
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
      style={{ backgroundImage: `url(${page_3})` }}
    >
      {/* <img
        src={page_3}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
        className={`clickable-area ${
            activeId === `p48-${area.sound}` || hoveredAreaIndex === index
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
              playSound(area.sound, `p48-${area.sound}`);
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
        className="headset-icon-CD-unit6-page3-1 hover:scale-110 transition"
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
                  src={CD22_pg24_Grammar1_AdultLady}
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
        className="pauseBtn-icon-CD-unit6-page3-1 hover:scale-110 transition"
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
              </div>
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

export default Unit6_Page3;
