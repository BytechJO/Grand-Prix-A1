import React, { useState, useRef } from "react";
import page_3 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday3.jpg";
import "./Unit2_Page3.css";
import CD11_Pg12_Grammar1_AdultLady from "../../../assets/img_unit2/sounds-unit2/U2 Right Grammar P12.mp3";
import Pg12_1_1_AdultLady from "../../../assets/img_unit2/sounds-unit2/Pg12_1.1_Adult Lady.mp3";
import Pg12_1_2_AdultLady from "../../../assets/img_unit2/sounds-unit2/Pg12_1.2_Adult Lady.mp3";
import Pg12_1_3_AdultLady from "../../../assets/img_unit2/sounds-unit2/Pg12_1.3_Adult Lady.mp3";
import Pg12_1_4_AdultLady from "../../../assets/img_unit2/sounds-unit2/Pg12_1.4_Adult Lady.mp3";
import Pg12_1_5_AdultLady from "../../../assets/img_unit2/sounds-unit2/Pg12_1.5_Adult Lady.mp3";
import Pg12_2_1_Harley from "../../../assets/img_unit2/sounds-unit2/Pg12_2.1_Harley.mp3";
import Pg12_2_2_Sarah from "../../../assets/img_unit2/sounds-unit2/Pg12_2.2_Sarah.mp3";
import Pg12_3_1_Helen_Take from "../../../assets/img_unit2/sounds-unit2/Pg12_3.1_Helen_Take 2.mp3";
import Pg12_3_2_Stella from "../../../assets/img_unit2/sounds-unit2/Pg12_3.2_Stella.mp3";
import Pg12_4_1_Hansel from "../../../assets/img_unit2/sounds-unit2/Pg12_4.1_Hansel.mp3";
import Pg12_4_2_Stella from "../../../assets/img_unit2/sounds-unit2/Pg12_4.2_Stella.mp3";
import Pg12_4_3_Hansel from "../../../assets/img_unit2/sounds-unit2/Pg12_4.3_Hansel.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/img_unit2/sounds-unit2/p12 1920.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit2_Page3 = ({ openPopup }) => {
   const { audioRef, activeId, setActiveId } = useContext(AudioContext);

  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 3.22, text: "Page 12, Exercise 1. Right Grammar." },
    { start: 3.25, end: 7.11, text: " How old are you? I'm seven years old." },
    {
      start: 7.15,
      end: 11.02,
      text: " When is your birthday? My birthday is in August.",
    },
    {
      start: 11.06,
      end: 13.11,
      text: "It is on Tuesday. ",
    },
    { start: 13.15, end: 14.22, text: "How old are you, Sara? " },
    { start: 14.26, end: 16.05, text: "I'm three years old. " },
    { start: 16.09, end: 17.24, text: "When is your birthday party, Stella? " },
    { start: 17.27, end: 19.16, text: "It is on Tuesday. " },
    {
      start: 19.2,
      end: 22.1,
      text: "Happy birthday! This is for you, Stella. ",
    },
    { start: 22.14, end: 23.1, text: "Thank you.  " },
    { start: 23.14, end: 25.05, text: "You're welcome. Open it." },
  ];

  const clickableAreas = [
    { x1: 6.5, y1: 10.7, x2: 30.0, y2: 15.0, sound: Pg12_1_1_AdultLady },
    { x1: 54.2, y1: 9.5, x2: 78.3, y2: 13.0, sound: Pg12_1_2_AdultLady },
    { x1: 6.5, y1: 15.8, x2: 35.6, y2: 20.0, sound: Pg12_1_3_AdultLady },
    { x1: 54.2, y1: 13.5, x2: 83.5, y2: 16.7, sound: Pg12_1_4_AdultLady },
    { x1: 54.2, y1: 17.0, x2: 74.1, y2: 20.4, sound: Pg12_1_5_AdultLady },
    { x1: 14.08, y1: 27.0, x2: 29.6, y2: 31.7, sound: Pg12_2_1_Harley },
    { x1: 7.0, y1: 47.5, x2: 29.2, y2: 50.4, sound: Pg12_2_2_Sarah },
    { x1: 49.6, y1: 26.17, x2: 88.9, y2: 29.8, sound: Pg12_3_1_Helen_Take },
    { x1: 84.18, y1: 37.6, x2: 95.1, y2: 43.4, sound: Pg12_3_2_Stella },
    { x1: 6.76, y1: 54.4, x2: 48.3, y2: 57.9, sound: Pg12_4_1_Hansel },
    { x1: 44.0, y1: 61.6, x2: 58.3, y2: 65.1, sound: Pg12_4_2_Stella },
    { x1: 7.16, y1: 74.6, x2: 26.3, y2: 80.4, sound: Pg12_4_3_Hansel },
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
    <div className="page1-img-wrapper"
          onClick={handleImageClick}
          style={{ backgroundImage: `url(${page_3})` }}>
      {/* <img
        src={page_3}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
            className={`clickable-area ${
            activeId === `p13-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
           playSound(area.sound, `p13-${area.sound}`);
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
        className="headset-icon-CD-unit2-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
             "audio", <div
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
              </div>
            )
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={audioBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="pauseBtn-icon-CD-unit2-page3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
             "video", <div
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
              </div>
            )
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={pauseBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Unit2_Page3;
