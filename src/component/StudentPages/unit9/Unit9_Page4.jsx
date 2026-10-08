import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit9/imgs/Right 1 Unit 09 A Day on the Farm4.png";
import "./Unit9_Page4.css";
import CD23_pg25_Grammar2_AdultLady from "../../../assets/unit9/sound/cd72pg79-grammar2-adult-lady_DY3Oohg0.mp3";
import sound1 from "../../../assets/unit9/sound/Pg79_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit9/sound/Pg79_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit9/sound/Pg79_2.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit9/sound/Pg79_2.4_Adult Lady.mp3";
import sound5 from "../../../assets/unit9/sound/Pg79_2.5_Adult Lady.mp3";
import sound6 from "../../../assets/unit9/sound/Pg79_2.6_Adult Lady.mp3";
import sound7 from "../../../assets/unit9/sound/Pg79_3.1_John .mp3";
import sound8 from "../../../assets/unit9/sound/Pg79_3.2_Hansel.mp3";
import sound9 from "../../../assets/unit9/sound/Pg79_4.1_Adult Lady.mp3";
import sound10 from "../../../assets/unit9/sound/Pg79_5.1_Adult Lady.mp3";
import video from "../../../assets/unit1/sounds/p79.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit9_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
const captionsExample = [
  {
    start: 0.28,
    end: 4.219,
    text: "Page 79, exercise 2, Right grammar.",
  },
  {
    start: 4.9,
    end: 5.879,
    text: "What do you like?",
  },
  {
    start: 6.44,
    end: 7.579,
    text: "I like cows.",
  },
  {
    start: 8.319,
    end: 9.46,
    text: "What do they like?",
  },
  {
    start: 10.159,
    end: 11.659,
    text: "They like cats.",
  },
  {
    start: 12.559,
    end: 13.619,
    text: "What does she like?",
  },
  {
    start: 14.519,
    end: 16.059,
    text: "She likes horses.",
  },
  {
    start: 17.059,
    end: 18.02,
    text: "What do you like?",
  },
  {
    start: 18.639,
    end: 19.699,
    text: "I like cows.",
  },
  {
    start: 20.34,
    end: 21.479,
    text: "What does she like?",
  },
  {
    start: 22.239,
    end: 23.5,
    text: "She likes horses.",
  },
  {
    start: 24.039,
    end: 25.119,
    text: "What do they like?",
  },
  {
    start: 26.019,
    end: 27.459,
    text: "They like cats.",
  },
];
  const clickableAreas = [
    { x1: 7.20, y1: 9.69, x2: 27.88, y2: 12.8, sound: sound1 },
    { x1: 69.03, y1: 9.69, x2: 81.96, y2: 13.0, sound: sound2 },
    { x1: 7.20, y1: 13.58, x2: 28.2, y2: 16.5, sound: sound3 },
    { x1: 69.03, y1: 13.41, x2: 85.4, y2: 16.5, sound: sound4 },
    { x1:  7.20, y1: 17.30, x2: 30.0, y2: 20.10, sound: sound5 },
    { x1: 69.03, y1: 17.17, x2: 87.8, y2: 20.01, sound: sound6 },
    { x1: 6.98, y1: 29.49, x2: 27.66, y2: 33.04, sound: sound7 },
    { x1: 33.05, y1: 48.9, x2: 46.63, y2: 52.2, sound: sound8 },
    { x1: 50.72, y1: 26.95, x2: 75.8, y2: 32.8, sound: sound9 },
    { x1: 8.70, y1: 88.04, x2: 30.25, y2: 93.56, sound: sound10 },
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
            activeId === `p79-${area.sound}` || hoveredAreaIndex === index
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
          playSound(area.sound, `p79-${area.sound}`);
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
        className="headset-icon-CD-unit9-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit9-page4-1 hover:scale-110 transition"
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

export default Unit9_Page4;
