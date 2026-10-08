import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream4.jpg";
import "./Unit10_Page4.css";
import CD23_pg25_Grammar2_AdultLady from "../../../assets/unit10/sound/cd79pg85-grammar2-adult-lady_IH3XtT3b.mp3";
import sound1 from "../../../assets/unit10/sound/Pg85_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit10/sound/Pg85_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit10/sound/Pg85_2.2_Adult Lady.mp3";
import sound4 from "../../../assets/unit10/sound/Pg85_3.1_Jack.mp3";
import sound5 from "../../../assets/unit10/sound/Pg85_3.2_Harley.mp3";
import sound6 from "../../../assets/unit10/sound/Pg85_4.1_Jack.mp3";
import sound7 from "../../../assets/unit10/sound/Pg85_4.2_Harley.mp3";
import sound8 from "../../../assets/unit10/sound/Pg85_5.1_Harley.mp3";
import sound9 from "../../../assets/unit10/sound/Pg85_5.2_Jack.mp3";
import video from "../../../assets/unit1/sounds/p85.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit10_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
const captionsExample = [
  { start: 0.319, end: 3.98, text: "Page 85, exercise 2, Right grammar." },

  { start: 5.219, end: 6.539, text: "Do you want ice cream?" },
  { start: 6.96, end: 7.739, text: "Yes, I do." },
  { start: 8.92, end: 10.239, text: "No, I don't." },
  { start: 10.84, end: 11.96, text: "I want a steak." },

  { start: 13.259, end: 14.299, text: "Do you want chicken?" },
  { start: 15.38, end: 16.279, text: "Yes, I do." },

  { start: 17.139, end: 18.6, text: "Do you want ice cream?" },
  { start: 19.34, end: 20.339, text: "Yes, I do." },

  { start: 20.34, end: 21.459, text: "Do you want chicken?" },
  { start: 22.359, end: 25.5, text: "No, I don't. I want a steak." },
];
  const clickableAreas = [
    { x1: 7.41, y1: 13.58, x2: 35.0, y2: 16.8, sound: sound1 },
    { x1: 59.77, y1: 10.87, x2: 70.54, y2: 14.09, sound: sound2 },
    { x1: 59.77, y1: 15.2, x2: 87.99, y2: 19.83, sound: sound3 },
    { x1: 23.36, y1: 27.80, x2: 50.29, y2: 31.28, sound: sound4 },
    { x1: 19.05, y1: 51.32, x2: 31.11, y2: 54.6, sound: sound5 },
    { x1: 62.78, y1: 26.95, x2: 91.87, y2: 30.2, sound: sound6 },
    { x1: 62.78, y1: 49.97, x2: 75.2, y2: 53.5, sound: sound7 },
    { x1: 8.70, y1: 63.33, x2: 35.9, y2: 66.35, sound: sound8 },
    { x1: 34.56, y1: 91.43, x2: 62.35, y2: 94.64, sound: sound9 },

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
            activeId === `p85-${area.sound}` || hoveredAreaIndex === index
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
             playSound(area.sound, `p85-${area.sound}`);
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
        className="headset-icon-CD-unit10-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit10-page4-1 hover:scale-110 transition"
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

export default Unit10_Page4;
