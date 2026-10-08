import React, { useRef, useState } from "react";
import page_6 from "../../../assets/unit1/imgs/Pages/Right 1 Unit 01 Good Morning World 2_page-0006.jpg";
import CD4_Pg6_Grammar1_AdultLady from "../../../assets/unit1/sounds/Right Grammar 1 P6.mp3";
import Pg6_1_1_AdultLady from "../../../assets/unit1/sounds/Pg6_1.1_Adult Lady.mp3";
import Pg6_1_2_AdultLady from "../../../assets/unit1/sounds/Pg6_1.2_Adult Lady.mp3";
import Pg6_1_3_AdultLady from "../../../assets/unit1/sounds/Pg6_1.3_Adult Lady.mp3";
import Pg6_1_4_AdultLady from "../../../assets/unit1/sounds/Pg6_1.4_Adult Lady.mp3";
import Pg6_1_5_AdultLady from "../../../assets/unit1/sounds/Pg6_1.5_Adult Lady.mp3";
import Pg6_1_6_AdultLady from "../../../assets/unit1/sounds/Pg6_1.6_Adult Lady.mp3";
import Pg6_2_1_Stella from "../../../assets/unit1/sounds/Pg6_2.1_Stella.mp3";
import Pg6_2_2_ModifiedStella from "../../../assets/unit1/sounds/Pg6_2.2_Modified Stella.mp3";
import Pg6_3_1_Harley from "../../../assets/unit1/sounds/Pg6_3.1_Harley.mp3";
import Pg6_3_2_ModifiedHarley from "../../../assets/unit1/sounds/Pg6_3.2_Modified Harley.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video from "../../../assets/unit1/sounds/Grammer P6 Video.mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Page6 = ({ openPopup }) => {
    const { audioRef, activeId, setActiveId } = useContext(AudioContext);


  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const captionsExample = [
    { start: 0, end: 4.05, text: "Page 6, exercise 1. Right grammar. " },
    { start: 4.09, end: 7.17, text: "Hello, I'm Stella. This is John." },
    { start: 7.2, end: 8.15, text: "Hello. " },
    { start: 8.19, end: 9.18, text: "How are you?  " },
    { start: 9.2, end: 11.12, text: "Fine. Thank you." },
    { start: 11.16, end: 13.02, text: "Goodbye, Harley. " },
    { start: 13.06, end: 15.23, text: "Nice to meet you. Nice to meet you." },
    { start: 15.27, end: 17.24, text: "Hello. How are you? " },
    { start: 17.27, end: 18.24, text: "Fine. Thank you." },
  ];

  // 🟩 مناطق مستطيلة (x1,y1,x2,y2)
  const clickableAreas = [
    { x1: 7.0, y1: 10.0, x2: 43.0, y2: 14.0, sound: Pg6_1_1_AdultLady },
    { x1: 61.5, y1: 10.0, x2: 75.14, y2: 14.0, sound: Pg6_1_2_AdultLady },
    { x1: 7.0, y1: 14.0, x2: 29.0, y2: 18.0, sound: Pg6_1_3_AdultLady },
    { x1: 61.5, y1: 14.0, x2: 82.0, y2: 18.0, sound: Pg6_1_4_AdultLady },
    { x1: 7.0, y1: 18.0, x2: 30.0, y2: 21.5, sound: Pg6_1_5_AdultLady },
    { x1: 61.5, y1: 18.0, x2: 83.0, y2: 21.5, sound: Pg6_1_6_AdultLady },
    { x1: 32.0, y1: 28.0, x2: 51.0, y2: 33.5, sound: Pg6_2_1_Stella },
    { x1: 62.0, y1: 32.0, x2: 71.02, y2: 35.5, sound: Pg6_2_2_ModifiedStella },
    { x1: 6.7, y1: 63.7, x2: 23.5, y2: 67.5, sound: Pg6_3_1_Harley },
    { x1: 47.4, y1: 65.0, x2: 67.3, y2: 68.6, sound: Pg6_3_2_ModifiedHarley },
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
    <div className="page1-img-wrapper"
          onClick={handleImageClick}
          style={{ backgroundImage: `url(${page_6})` }}>
      {/* <img
        src={page_6}
        style={{ display: "block" }}
        alt="page 6"
        onClick={handleImageClick}
      /> */}

      {/* رسم المستطيلات التفاعلية */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
            className={`clickable-area ${
            activeId === `p6-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
             playSound(area.sound, `p6-${area.sound}`);
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
        className="headset-icon-CD-page6 hover:scale-110 transition"
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
                  src={CD4_Pg6_Grammar1_AdultLady}
                  captions={captionsExample}
                />
              </div>
            )
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img"
            href={ audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
      <div
        className="pauseBtn-icon-CD-page6 hover:scale-110 transition"
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
                     display: "block"
                  }}
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            )
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img"
            href={pauseBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Page6;
