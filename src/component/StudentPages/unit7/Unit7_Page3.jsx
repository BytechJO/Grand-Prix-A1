import React, { useState, useRef } from "react";
import page_3 from "../../../assets/unit7/img/Right 1 Unit 07 What are Matter3.jpg";
import "./Unit7_Page3.css";
import CD11_Pg12_Grammar1_AdultLady from "../../../assets/unit7/sound/U7P60RG.mp3";
import Pg12_1_1_AdultLady from "../../../assets/unit7/sound/Pg60_1.1_Adult Lady.mp3";
import Pg12_1_2_AdultLady from "../../../assets/unit7/sound/Pg60_1.2_Adult Lady.mp3";
import Pg12_1_3_AdultLady from "../../../assets/unit7/sound/Pg60_2.1_John.mp3";
import Pg12_1_4_AdultLady from "../../../assets/unit7/sound/Pg60_2.2_Harley.mp3";
import Pg12_1_5_AdultLady from "../../../assets/unit7/sound/Pg60_3.1_Stella.mp3";
import Pg12_2_1_Harley from "../../../assets/unit7/sound/Pg60_3.2_Helen.mp3";
import Pg12_2_2_Sarah from "../../../assets/unit7/sound/Pg60_4.1_Dad.mp3";
import Pg12_3_1_Helen_Take from "../../../assets/unit7/sound/Pg60_4.2_Jack.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/img_unit2/sounds-unit2/p12 1920.mp4";
const Unit7_Page3 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    {
      start: 0,
      end: 6.84,
      text: "Page 60, exercise 1. Right  Grammar. What's the matter? I'm cold. ",
    },
    { start: 6.9, end: 8.62, text: "What's the matter? " },
    {
      start: 8.7,
      end: 10.34,
      text: "I'm cold. ",
    },
    {
      start: 10.4,
      end: 12.14,
      text: "What's the matter? ",
    },
    { start: 12.2, end: 13.68, text: "I'm hungry. " },
    { start: 13.7, end: 15.54, text: "What's the matter? " },
    { start: 15.6, end: 17.24, text: "I'm scared. " },
  ];

  const clickableAreas = [
    { x1: 6.5, y1: 13, x2: 30.0, y2: 17.5, sound: Pg12_1_1_AdultLady },
    { x1: 69.68, y1: 13.46, x2: 80.45, y2: 17.81, sound: Pg12_1_2_AdultLady },
    { x1: 21.98, y1: 30.06, x2: 44.86, y2: 33.7, sound: Pg12_1_3_AdultLady },
    { x1: 9.77, y1: 53.82, x2: 20.82, y2: 57.12, sound: Pg12_1_4_AdultLady },
    { x1: 68.33, y1: 26.26, x2: 91.6, y2: 29.6, sound: Pg12_1_5_AdultLady },
    { x1: 53.98, y1: 48.34, x2: 67.9, y2: 51.84, sound: Pg12_2_1_Harley },
    { x1: 6.66, y1: 64.18, x2: 29.74, y2: 67.38, sound: Pg12_2_2_Sarah },
    { x1: 33.62, y1: 74.54, x2: 47.58, y2: 78.19, sound: Pg12_3_1_Helen_Take },
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
            activeId === `p60-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p60-${area.sound}`);
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
        className="headset-icon-CD-unit7-page3-1 hover:scale-110 transition"
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
                  src={CD11_Pg12_Grammar1_AdultLady}
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
        className="pauseBtn-icon-CD-unit7-page3-1 hover:scale-110 transition"
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

export default Unit7_Page3;
