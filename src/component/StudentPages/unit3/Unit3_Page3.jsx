import React, { useState, useRef } from "react";
import page_3 from "../../../assets/unit3/imgs3/right1-unit3-page3.jpg";
import "./Unit3_Page3.css";
import CD22_pg24_Grammar1_AdultLady from "../../../assets/unit3/sound3/U3P24RG1.mp3";
import sound1 from "../../../assets/unit3/sound3/Pg24_1.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit3/sound3/Pg24_1.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit3/sound3/Pg24_1.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit3/sound3/Pg24_2.1_Female Teacher.mp3";
import sound5 from "../../../assets/unit3/sound3/Pg24_3.1_Female Teacher.mp3";
import sound6 from "../../../assets/unit3/sound3/Pg24_4.1_Male Teacher.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/unit3/sound3/p24.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit3_Page3 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.1, text: "Page 24, Exercise 1. Right Grammar." },
    { start: 4.13, end: 5.01, text: " Listen," },
    {
      start: 5.03,
      end: 6.02,
      text: "quiet,",
    },
    {
      start: 6.05,
      end: 7.22,
      text: "make a line.",
    },
    { start: 7.25, end: 9.02, text: "Listen," },
    { start: 9.06, end: 10.04, text: "quiet, " },
    { start: 10.07, end: 11.26, text: "make a line." },
  ];
  const clickableAreas = [
    { x1: 13.0, y1: 9.8, x2: 24.0, y2: 13.9, sound: sound1 },
    { x1: 13.0, y1: 15.2, x2: 24.0, y2: 19.0, sound: sound2 },
    { x1: 71.2, y1: 12.5, x2: 85.22, y2: 16.7, sound: sound3 },
    { x1: 16.9, y1: 22.6, x2: 26.7, y2: 25.5, sound: sound4 },
    { x1: 58.0, y1: 22.8, x2: 68.5, y2: 26.0, sound: sound5 },
    { x1: 27.9, y1: 59.0, x2: 42.9, y2: 63.4, sound: sound6 },
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
            activeId === `p24-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            playSound(area.sound, `p24-${area.sound}`)
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
        className="headset-icon-CD-unit3-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit3-page3-1 hover:scale-110 transition"
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

export default Unit3_Page3;
