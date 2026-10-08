import React, { useState, useRef } from "react";
import page_3 from "../../../assets/unit9/imgs/Right 1 Unit 09 A Day on the Farm3.png";
import "./Unit9_Page3.css";
import CD22_pg24_Grammar1_AdultLady from "../../../assets/unit9/sound/cd71pg78-grammar1-adult-lady_bwQRoSsv.mp3";
import sound1 from "../../../assets/unit9/sound/Pg78_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit9/sound/Pg78_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit9/sound/Pg78_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit9/sound/Pg78_1.4_Adult Lady.mp3";
import sound5 from "../../../assets/unit9/sound/Pg78_2.1_Harley.mp3";
import sound6 from "../../../assets/unit9/sound/Pg78_2.2_Hansel.mp3";
import sound7 from "../../../assets/unit9/sound/Pg78_3.1_Stella.mp3";
import sound8 from "../../../assets/unit9/sound/Pg78_3.2_Sarah.mp3";
import sound9 from "../../../assets/unit9/sound/Pg78_4.1_Tom.mp3";
import sound10 from "../../../assets/unit9/sound/Pg78_4.2_Helen.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/unit1/sounds/p78.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit9_Page3 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
 const captionsExample = [
  {
    start: 0.579,
    end: 4.619,
    text: "Page 78, exercise 1, Right grammar.",
  },
  {
    start: 5.359,
    end: 6.739,
    text: "How many birds are there?",
  },
  {
    start: 7.119,
    end: 8.439,
    text: "There is one bird.",
  },
  {
    start: 8.859,
    end: 10.539,
    text: "How many chickens are there?",
  },
  {
    start: 11.139,
    end: 12.88,
    text: "There are seven chickens.",
  },
  {
    start: 13.439,
    end: 14.799,
    text: "How many chickens are there?",
  },
  {
    start: 15.319,
    end: 16.579,
    text: "There are four chickens.",
  },
  {
    start: 17.139,
    end: 18.52,
    text: "How many goats are there?",
  },
  {
    start: 18.979,
    end: 20.379,
    text: "There are two goats.",
  },
  {
    start: 21.1,
    end: 22.599,
    text: "How many dogs are there?",
  },
  {
    start: 23.479,
    end: 24.659,
    text: "There is one dog.",
  },
];
  const clickableAreas = [
    { x1: 6.49, y1: 11.21, x2: 37.30, y2: 14.8, sound: sound1 },
    { x1: 72.42, y1: 10.21, x2: 92.24, y2: 13.8, sound: sound2 },
    { x1:  6.49, y1: 16.12, x2: 41.18, y2: 19.80, sound: sound3 },
    { x1: 72.42, y1: 14.40, x2: 92.24, y2: 19.83, sound: sound4 },
    { x1: 5.9, y1: 27.12, x2: 41.83, y2: 31.2, sound: sound5 },
    { x1: 29.98, y1: 31.69, x2: 47.43, y2: 36.26, sound: sound6 },
    { x1: 62.51, y1: 28.30, x2: 93.75, y2: 32.37, sound: sound7 },
    { x1: 53.68, y1: 34.23, x2: 77.16, y2: 38.29, sound: sound8 },
    { x1: 5.63, y1: 59.78, x2: 25.67, y2: 64.69, sound: sound9 },
    { x1: 41.61, y1: 61.81, x2: 61.00, y2: 66.07, sound: sound10 },
  ];

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
            activeId === `p78-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p78-${area.sound}`);}}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}

      <div
        className="headset-icon-CD-unit9-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit9-page3-1 hover:scale-110 transition"
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

export default Unit9_Page3;
