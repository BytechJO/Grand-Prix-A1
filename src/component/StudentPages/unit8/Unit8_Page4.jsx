import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match4.jpg";
import "./Unit8_Page4.css";
import CD12_Pg13_Grammar2_AdultLady from "../../../assets/unit8/sound/U8P67RG2.mp3";
import Pg13_2_1_AdultLady from "../../../assets/unit8/sound/Pg67_2.1_Adult Lady.mp3";
import Pg13_2_2_AdultLady from "../../../assets/unit8/sound/Pg67_2.2_Adult Lady.mp3";
import Pg13_2_3_AdultLady from "../../../assets/unit8/sound/Pg67_3.1_Modified Helen.mp3";
import Pg13_2_4_AdultLady from "../../../assets/unit8/sound/Pg67_4.1_Tom.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
import video from "../../../assets/unit8/sound/p67.mp4";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit8_Page4 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.18, text: "Page 67, exercise two, Right grammar." },
    { start: 4.2, end: 6.18, text: " I bend my knee." },
    { start: 6.2, end: 9.04, text: "I touch my nose. " },
    { start: 9.07, end: 10.22, text: "I bend my knee. " },
    { start: 10.25, end: 13.05, text: "I touch my nose." },
  ];

  const clickableAreas = [
    { x1: 6.53, y1: 10.4, x2: 26.7, y2: 14.8, sound: Pg13_2_1_AdultLady },
    { x1: 6.53, y1: 16, x2: 26.7, y2: 20.2, sound: Pg13_2_2_AdultLady },
    { x1: 28.68, y1: 23.97, x2: 47.5, y2: 27.4, sound: Pg13_2_3_AdultLady },
    { x1: 36.05, y1: 60.98, x2: 54.79, y2: 64.3, sound: Pg13_2_4_AdultLady },
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
    setHoveredAreaIndex(null);
    audioRef.current.onended = () => {
      setActiveId(null);
      setHoveredAreaIndex(null);
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
            activeId === `p67-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p67-${area.sound}`);
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
        className="headset-icon-CD-unit8-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit8-page4-1 hover:scale-110 transition"
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

export default Unit8_Page4;
