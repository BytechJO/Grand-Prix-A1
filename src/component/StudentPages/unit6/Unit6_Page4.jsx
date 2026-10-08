import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit6/imgs/Right 1 Unit 06 Can We Go to the Park4.jpg";
import "./Unit6_Page4.css";
import CD23_pg25_Grammar2_AdultLady from "../../../assets/unit6/sounds/U6P49RG.mp3";
import sound1 from "../../../assets/unit6/sounds/Pg49_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit6/sounds/Pg49_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit6/sounds/Pg49_2.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit6/sounds/Pg49_2.4_Adult Lady.mp3";
import sound5 from "../../../assets/unit6/sounds/Pg49_3.1_Harley.mp3";
import sound6 from "../../../assets/unit6/sounds/Pg49_3.2_Helen_Take 3.mp3";
import sound7 from "../../../assets/unit6/sounds/Pg49_4.1_Stella.mp3";
import sound8 from "../../../assets/unit6/sounds/Pg49_4.2_Harley.mp3";
import video from "../../../assets/unit6/sounds/p49.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit6_Page4 = ({ openPopup }) => {
    const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.15, text: "Page 49, exercise two, Right Grammar. " },
    { start: 4.17, end: 7.00, text: "Can you paint a picture? " },
    { start: 7.03, end: 8.27, text: "Yes, I can. " },
    { start: 8.29, end: 11.15, text: "Can he sail a boat?" },
    { start: 11.17, end: 13.13, text: " No, he can't. " },
    { start: 13.15, end: 15.08, text: "Can you paint a picture?" },
    { start: 15.10, end: 16.27, text: " Yes, I can. " },
    { start: 16.29, end: 19.14, text: "Can he sail a boat?" },
    { start: 19.16, end: 20.21, text: " No, he can't. " },
  ];

  const clickableAreas = [
    { x1: 8.1, y1: 10.5, x2: 36.43, y2: 14.1, sound: sound1 },
    { x1: 8.1, y1: 15.4, x2: 31.43, y2: 19.1, sound: sound2 },
    { x1: 69.6, y1: 11.0, x2: 82.1, y2: 14.1, sound: sound3 },
    { x1: 69.6, y1: 16.2, x2: 84.5, y2: 19.4, sound: sound4 },
    { x1: 8.75, y1: 26.4, x2: 39.06, y2: 30.1, sound: sound5 },
    { x1: 51.8, y1: 26.9, x2: 64.8, y2: 30.12, sound: sound6 },
    { x1: 63.74, y1: 63.9, x2: 87.5, y2: 67.4, sound: sound7 },
    { x1: 78.7, y1: 83.37, x2: 93.6, y2: 86.6, sound: sound8 },
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
            activeId === `p49-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p49-${area.sound}`);
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
        className="headset-icon-CD-unit6-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit6-page4-1 hover:scale-110 transition"
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

export default Unit6_Page4;
