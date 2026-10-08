import React, { useState, useRef } from "react";
import page_3 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match3.jpg";
import "./Unit8_Page3.css";
import CD11_Pg12_Grammar1_AdultLady from "../../../assets/unit8/sound/U8P66RG1.mp3";
import Pg12_1_1_AdultLady from "../../../assets/unit8/sound/Pg66_1.1_Adult Lady.mp3";
import Pg12_1_2_AdultLady from "../../../assets/unit8/sound/Pg66_1.2_Adult Lady.mp3";
import Pg12_1_3_AdultLady from "../../../assets/unit8/sound/Pg66_1.3_Adult Lady.mp3";
import Pg12_1_4_AdultLady from "../../../assets/unit8/sound/Pg66_2.1_Female Teacher.mp3";
import Pg12_1_5_AdultLady from "../../../assets/unit8/sound/Pg66_3.1_Modified Tom.mp3";
import Pg12_2_1_Harley from "../../../assets/unit8/sound/Pg66_4.1_Female Teacher.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/unit8/sound/p66.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit8_Page3 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
   const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  const captionsExample = [
    { start: 0, end: 4.14, text: "Page 66, exercise one. Right grammar." },
    { start: 4.17, end: 6.01, text: " Touch your head." },
    {
      start: 6.04,
      end: 7.25,
      text: "Open your mouth.",
    },
    {
      start: 7.29,
      end: 9.18,
      text: " Raise your hand ",
    },
    { start: 9.20, end: 11.16, text: " Touch your head." },
    { start: 11.20, end: 13.05, text: "Open your mouth. " },
    { start: 13.09, end: 15.01, text: "Raise your hand." },

  ];

  const clickableAreas = [
    { x1: 6.5, y1: 10.0, x2: 30.0, y2: 13.6, sound: Pg12_1_1_AdultLady },
    { x1: 6.5, y1: 13.6, x2: 30.0, y2: 17.2, sound: Pg12_1_2_AdultLady },
    { x1: 6.5, y1: 17.2, x2:  30.0, y2: 20.8, sound: Pg12_1_3_AdultLady },
    { x1: 5.50, y1: 24.12, x2: 26.25, y2: 27.63, sound: Pg12_1_4_AdultLady },
    { x1: 54.75, y1: 24.73, x2: 76.86, y2: 27.93, sound: Pg12_1_5_AdultLady },
    { x1: 33.42, y1: 62.35, x2: 53.60, y2: 65.86, sound: Pg12_2_1_Harley },
   
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
            activeId === `p66-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
         playSound(area.sound, `p66-${area.sound}`);
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
        className="headset-icon-CD-unit8-page3-1 hover:scale-110 transition"
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
        className="pauseBtn-icon-CD-unit8-page3-1 hover:scale-110 transition"
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

export default Unit8_Page3;
