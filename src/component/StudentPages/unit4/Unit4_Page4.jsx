import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit4/imgs/Right 1 Unit 04 Wonderful Shapes and Colors4.jpg";
import "./Unit4_Page4.css";
import CD30_Pg31_Grammar2_AdultLady from "../../../assets/unit4/sounds/U4P31 Grammar.mp3";
import Pg31_2_1_AdultLady from "../../../assets/unit4/sounds/Pg31_2.1_Adult Lady.mp3";
import Pg31_2_2_AdultLady from "../../../assets/unit4/sounds/Pg31_2.2_Adult Lady.mp3";
import Pg31_2_3_AdultLady from "../../../assets/unit4/sounds/Pg31_2.3_Adult Lady.mp3";
import Pg31_2_4_AdultLady from "../../../assets/unit4/sounds/Pg31_2.4_Adult Lady.mp3";
import Pg31_2_5_AdultLady from "../../../assets/unit4/sounds/Pg31_2.5_Adult Lady.mp3";
import Pg31_3_1_Tom from "../../../assets/unit4/sounds/Pg31_3.1_Tom.mp3";
import Pg31_3_2_Hansel from "../../../assets/unit4/sounds/Pg31_3.2_Hansel.mp3";
import Pg31_4_1_Helen from "../../../assets/unit4/sounds/Pg31_4.1_Helen.mp3";
import Pg31_4_2_Stella from "../../../assets/unit4/sounds/Pg31_4.2_Stella.mp3";
import Pg31_5_1_Sarah from "../../../assets/unit4/sounds/Pg31_5.1_Sarah.mp3";
import Pg31_5_2_Jack from "../../../assets/unit4/sounds/Pg31_5.2_Jack.mp3";
import video from "../../../assets/unit4/sounds/p31.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit4_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.18, text: "Page 31, exercise 2, Right Grammar. " },
    { start: 4.21, end: 6.0, text: "What shape is it? " },
    { start: 6.03, end: 7.07, text: "It's a circle." },
    { start: 7.1, end: 8.15, text: "Is it a triangle?" },
    { start: 8.18, end: 10.07, text: "Yes, it is." },
    { start: 10.1, end: 12.0, text: "No, it isn't. " },
    { start: 12.03, end: 14.09, text: "Is it a triangle? " },
    { start: 14.12, end: 16.12, text: "No, it isn't. It's a circle. " },
    { start: 18.17, end: 18.13, text: "What shape is it?" },
    { start: 20.13, end: 20.1, text: "It's a rectangle. " },
    { start: 20.13, end: 23.19, text: "Is it a triangle on the swing set? " },
    { start: 23.22, end: 25.2, text: "Yes, it is." },
  ];
  const clickableAreas = [
    { x1: 8.3, y1: 10.5, x2: 29.5, y2: 14.0, sound: Pg31_2_1_AdultLady },
    { x1: 64.17, y1: 10.15, x2: 77.14, y2: 14.0, sound: Pg31_2_2_AdultLady },
    { x1: 8.3, y1: 14.2, x2: 29.5, y2: 17.4, sound: Pg31_2_3_AdultLady },
    { x1: 64.0, y1: 14.0, x2: 77.0, y2: 17.0, sound: Pg31_2_4_AdultLady },
    { x1: 80.19, y1: 14.0, x2: 92.5, y2: 17.0, sound: Pg31_2_5_AdultLady },
    { x1: 7.6, y1: 20.8, x2: 25.8, y2: 24, sound: Pg31_3_1_Tom },
    { x1: 16.49, y1: 52.8, x2: 41.6, y2: 56.18, sound: Pg31_3_2_Hansel },
    { x1: 54.8, y1: 20.98, x2: 76.2, y2: 24.5, sound: Pg31_4_1_Helen },
    { x1: 67.2, y1: 50.6, x2: 85.62, y2: 53.6, sound: Pg31_4_2_Stella },
    { x1: 6.36, y1: 64.5, x2: 42.7, y2: 68.6, sound: Pg31_5_1_Sarah },
    { x1: 45.12, y1: 72.93, x2: 56.59, y2: 76.5, sound: Pg31_5_2_Jack },
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
            activeId === `p31-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
            playSound(area.sound, `p31-${area.sound}`);
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
        className="headset-icon-CD-unit4-page4-1 hover:scale-110 transition"
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
                  src={CD30_Pg31_Grammar2_AdultLady}
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
        className="pauseBtn-icon-CD-unit4-page4-1 hover:scale-110 transition"
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

export default Unit4_Page4;
