import React, { useState, useRef } from "react";
import page_3 from "../../../assets/unit5/imgs/Right 1 Unit 05 Welcome to My Class3.jpg";
import "./Unit5_Page3.css";
import CD22_pg24_Grammar1_AdultLady from "../../../assets/unit5/sounds/U5P42Grammar.mp3";
import sound1 from "../../../assets/unit5/sounds/Pg42_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit5/sounds/Pg42_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit5/sounds/Pg42_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit5/sounds/Pg42_2.1_Harley.mp3";
import sound5 from "../../../assets/unit5/sounds/Pg42_2.2_Jack.mp3";
import sound6 from "../../../assets/unit5/sounds/Pg42_3.1_Modified Stella.mp3";
import sound7 from "../../../assets/unit5/sounds/Pg42_3.2_Jack.mp3";
import sound8 from "../../../assets/unit5/sounds/Pg42_4.1_Stella.mp3";
import sound9 from "../../../assets/unit5/sounds/Pg42_5.1_Stella.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/unit5/sounds/p42.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit5_Page3 = ({ openPopup }) => {
 const { audioRef, activeId, setActiveId } = useContext(AudioContext);  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.12, text: "Page 42. Exercise one. Right Grammar. " },
    { start: 4.15, end: 5.28, text: "What's this? " },
    {
      start: 5.31,
      end: 7.22,
      text: "This is my book. ",
    },
    {
      start: 7.25,
      end: 9.19,
      text: "This is your book. ",
    },
    { start: 9.22, end: 11.05, text: "What's this? " },
    { start: 11.08, end: 12.29, text: "This is a desk." },
    { start: 12.32, end: 14.13, text: "What's this? " },
    { start: 14.18, end: 16.09, text: "This is a chair." },
    { start: 16.12, end: 18.01, text: "This is my book. " },
    { start: 18.04, end: 19.21, text: "This is your book." },
  ];

  const clickableAreas = [
    { x1: 10.7, y1: 12.99, x2: 26.3, y2: 16.5, sound: sound1 },
    { x1: 67.23, y1: 11.47, x2: 86.5, y2: 14.7, sound: sound2 },
    { x1: 67.23, y1: 15.2, x2: 86.7, y2: 18.4, sound: sound3 },
    { x1: 6.8, y1: 29.9, x2: 23.5, y2: 33.07, sound: sound4 },
    { x1: 30.43, y1: 33.8, x2: 47.7, y2: 37.19, sound: sound5 },
    { x1: 53.38, y1: 30.08, x2: 70.7, y2: 33.72, sound: sound6 },
    { x1: 76.33, y1: 31.1, x2: 93.86, y2: 34.62, sound: sound7 },
    { x1: 8.86, y1: 64.81, x2: 27.8, y2: 68.29, sound: sound8 },
    { x1: 54.68, y1: 65.45, x2: 75.46, y2: 68.75, sound: sound9 },
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
        className="headset-icon-CD-unit5-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit5-page3-1 hover:scale-110 transition"
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

export default Unit5_Page3;
