import React, { useState, useRef } from "react";
import page_4 from "../../../assets/unit3/imgs3/right1-unit3-page4.jpg";
import "./Unit3_Page4.css";
import CD23_pg25_Grammar2_AdultLady from "../../../assets/unit3/sound3/U3P25RG2.mp3";
import sound1 from "../../../assets/unit3/sound3/Pg25_2.1_Adult Lady.mp3";
import sound2 from "../../../assets/unit3/sound3/Pg25_2.2_Adult Lady.mp3";
import sound3 from "../../../assets/unit3/sound3/Pg25_2.3_Adult Lady.mp3";
import sound4 from "../../../assets/unit3/sound3/Pg25_3.1_Female Teacher.mp3";
import sound5 from "../../../assets/unit3/sound3/Pg25_4.1_Female Teacher.mp3";
import sound6 from "../../../assets/unit3/sound3/Pg25_5.1_Female Teacher.mp3";
import video from "../../../assets/unit3/sound3/p25.mp4";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit3_Page4 = ({ openPopup }) => {
const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 4.13, text: "Page 25, Exercise 2: Right Grammar." },
    { start: 4.16, end: 5.21, text: "Open your book." },
    { start: 5.24, end: 7.02, text: "Close your book. " },
    { start: 7.05, end: 8.29, text: "Take out your pencil." },
    { start: 8.31, end: 10.11, text: "Open your book. " },
    { start: 10.14, end: 11.24, text: "Close your book." },
    { start: 11.27, end: 13.12, text: "Take out your pencil." },
  ];
  const clickableAreas = [
    { x1: 9.07, y1: 10.5, x2: 30.43, y2: 14.0, sound: sound1 },
    { x1: 9.07, y1: 15.4, x2: 30.43, y2: 18.7, sound: sound2 },
    { x1: 66.4, y1: 13.4, x2: 89.9, y2: 17.0, sound: sound3 },
    { x1: 11.11, y1: 22.9, x2: 30.4, y2: 26.4, sound: sound4 },
    { x1: 55.5, y1: 22.5, x2: 75.4, y2: 26.2, sound: sound5 },
    { x1: 30.4, y1: 60.0, x2: 55.6, y2: 63.5, sound: sound6 },
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
            activeId === `p25-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
           playSound(area.sound, `p25-${area.sound}`)
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
        className="headset-icon-CD-unit3-page4-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit3-page4-1 hover:scale-110 transition"
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

export default Unit3_Page4;
