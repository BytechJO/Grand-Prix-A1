import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit7/img/Right 1 Unit 07 What are Matter4.jpg";
import "./Unit7_Page4.css";
import CD12_Pg13_Grammar2_AdultLady from "../../../assets/unit7/sound/U7P61RG.mp3";
import Pg13_2_1_AdultLady from "../../../assets/unit7/sound/Pg61_2.1_Adult Lady.mp3";
import Pg13_2_2_AdultLady from "../../../assets/unit7/sound/Pg61_2.2_Adult Lady.mp3";
import Pg13_2_3_AdultLady from "../../../assets/unit7/sound/Pg61_2.3_Adult Lady.mp3";
import Pg13_2_4_AdultLady from "../../../assets/unit7/sound/Pg61_2.4_Adult Lady.mp3";
import Pg13_3_1_Hansel from "../../../assets/unit7/sound/Pg61_3.1_Mom.mp3";
import Pg13_3_2_Harley from "../../../assets/unit7/sound/Pg61_3.2_Stella.mp3";
import Pg13_4_1_Hansel from "../../../assets/unit7/sound/Pg61_4.1_Harley.mp3";
import Pg13_4_2_Harley from "../../../assets/unit7/sound/Pg61_4.2_Tom.mp3";
import Pg13_5_1_Tom from "../../../assets/unit7/sound/Pg61_5.1_Jack.mp3";
import Pg13_5_2_Sarah from "../../../assets/unit7/sound/Pg61_5.2_Sarah.mp3";
import video from "../../../assets/img_unit2/sounds-unit2/p13.mp4";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit7_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 3.93, text: "Page 61, exercise 2. Right grammar. " },
    { start: 4.0, end: 8.24, text: " Are you happy? Yes, I am. Are you sad? " },
    { start: 8.3, end: 12.64, text: "No, I'm not. I'm bored. Are you happy? " },
    { start: 12.7, end: 16.16, text: "Yes, I am. Are you sad?" },
    {
      start: 16.2,
      end: 24.12,
      text: "No, I'm not. I'm bored. Are you sad? Yes, I am.",
    },
  ];

  const clickableAreas = [
    { x1: 8.53, y1: 10.4, x2: 27.13, y2: 15, sound: Pg13_2_1_AdultLady },
    { x1: 68.2, y1: 10.4, x2: 79.68, y2: 15, sound: Pg13_2_2_AdultLady },
    { x1: 8.53, y1: 15.5, x2: 27.13, y2: 20, sound: Pg13_2_3_AdultLady },
    { x1: 68.2, y1: 16.2, x2: 91.8, y2: 19.9, sound: Pg13_2_4_AdultLady },
    { x1: 5.6, y1: 24.28, x2: 24.8, y2: 27.63, sound: Pg13_3_1_Hansel },
    { x1: 35.08, y1: 38.29, x2: 47.29, y2: 41.55, sound: Pg13_3_2_Harley },
    { x1: 57.76, y1: 27.02, x2: 74.25, y2: 30.5, sound: Pg13_4_1_Hansel },
    { x1: 67.46, y1: 53.52, x2: 93.8, y2: 56.87, sound: Pg13_4_2_Harley },
    { x1: 13.36, y1: 65.4, x2: 30.8, y2: 68.8, sound: Pg13_5_1_Tom },
    { x1: 51.56, y1: 66.92, x2: 63.97, y2: 70.27, sound: Pg13_5_2_Sarah },
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
            activeId === `p61-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p61-${area.sound}`);
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
        className="headset-icon-CD-unit7-page4-1 hover:scale-110 transition"
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
                  src={CD12_Pg13_Grammar2_AdultLady}
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
        className="pauseBtn-icon-CD-unit7-page4-1 hover:scale-110 transition"
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
                  <source src={video} type="video/mp4" />
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

export default Unit7_Page4;
