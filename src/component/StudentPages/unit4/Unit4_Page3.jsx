import React, { useState, useRef } from "react";
import page_3 from "../../../assets/unit4/imgs/Right 1 Unit 04 Wonderful Shapes and Colors3.jpg";
import "./Unit4_Page3.css";
import CD29_Pg30_Grammar1_AdultLady from "../../../assets/unit4/sounds/U4P30 Grammar.mp3";
import Pg12_1_1_AdultLady from "../../../assets/unit4/sounds/Pg30_1.1_Adult Lady.mp3";
import Pg12_1_2_AdultLady from "../../../assets/unit4/sounds/Pg30_1.2_Adult Lady.mp3";
import Pg12_1_3_AdultLady from "../../../assets/unit4/sounds/Pg30_1.3_Adult Lady.mp3";
import Pg12_1_4_AdultLady from "../../../assets/unit4/sounds/Pg30_2.1_Stella.mp3";
import Pg12_1_5_AdultLady from "../../../assets/unit4/sounds/Pg30_2.2_John.mp3";
import Pg12_2_1_Harley from "../../../assets/unit4/sounds/Pg30_3.1_Sarah.mp3";
import Pg12_2_2_Sarah from "../../../assets/unit4/sounds/Pg30_3.2_Jack.mp3";
import Pg12_3_1_Helen_Take from "../../../assets/unit4/sounds/Pg30_4.1_Harley.mp3";
import Pg12_3_2_Stella from "../../../assets/unit4/sounds/Pg30_4.2_Hansel.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/unit4/sounds/p30.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit4_Page3 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.05, text: "Page 30, exercise 1. Right Grammar. " },
    { start: 4.08, end: 5.25, text: "What color is this? " },
    {
      start: 5.28,
      end: 7.02,
      text: "It's blue. ",
    },
    {
      start: 7.05,
      end: 9.11,
      text: "It's a blue butterfly.",
    },
    { start: 9.14, end: 11.07, text: "What color is this? " },
    { start: 11.1, end: 13.21, text: "It's a red boat. " },
    { start: 13.24, end: 15.26, text: "What color is this cow? " },
    { start: 15.3, end: 18.02, text: "It's a brown cow. " },
    {
      start: 18.05,
      end: 20.11,
      text: "What color is this butterfly? ",
    },
    {
      start: 18.08,
      end: 21.18,
      text: "It's blue!",
    },
  ];
  const clickableAreas = [
    { x1: 8.5, y1: 11.7, x2: 30.0, y2: 15.5, sound: Pg12_1_1_AdultLady },
    { x1: 69.9, y1: 10.5, x2: 80.3, y2: 14.0, sound: Pg12_1_2_AdultLady },
    { x1: 69.9, y1: 14.5, x2: 91.9, y2: 17.6, sound: Pg12_1_3_AdultLady },
    { x1: 12.3, y1: 33.6, x2: 34.7, y2: 36.8, sound: Pg12_1_4_AdultLady },
    { x1: 29.6, y1: 50.26, x2: 48.07, y2: 53.6, sound: Pg12_1_5_AdultLady },
    { x1: 66.01, y1: 24.03, x2: 93.7, y2: 27.07, sound: Pg12_2_1_Harley },
    { x1: 59.7, y1: 51.5, x2: 80.2, y2: 54.9, sound: Pg12_2_2_Sarah },
    { x1: 28.77, y1: 58.2, x2: 60.6, y2: 61.47, sound: Pg12_3_1_Helen_Take },
    { x1: 64.7, y1: 68.8, x2: 76.0, y2: 72.5, sound: Pg12_3_2_Stella },
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
            activeId === `p30-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            playSound(area.sound, `p30-${area.sound}`);
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
        className="headset-icon-CD-unit4-page3-1 hover:scale-110 transition"
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
                  src={CD29_Pg30_Grammar1_AdultLady}
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
        className="pauseBtn-icon-CD-unit4-page3-1 hover:scale-110 transition"
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
                  style={{
                    width: "auto",
                    height: "80%",
                    objectFit: "fill",
                    borderRadius: "20px",
                    display: "block",
                  }}
                  autoPlay
                  controls
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

export default Unit4_Page3;
