import page24 from "../../../assets/unit4/imgs/Right 1 Unit 04 Wonderful Shapes and Colors11.jpg";
import React, { useState, useRef } from "react";
// import "./Unit2_Page11.css";
import sound1 from "../../../assets/unit4/sounds/U4ReadingP38-39.mp3";
import sound2 from "../../../assets/unit4/sounds/Pg38_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/unit4/sounds/Pg38_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/unit4/sounds/Pg38_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/unit4/sounds/Pg38_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video3 from "../../../assets/unit4/sounds/STORY ( 2 ).mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit4_Reading_P1 = ({ openPopup }) => {
    const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 5.04, text: "Page 38 Reading. Hey, that's my pen! " },
    {
      start: 5.07,
      end: 16.03,
      text: "Harley has a pencil and wants to draw a picture. Tom finds an eraser. He asks if the eraser is Harley's. It's not, it's Kevin's. ",
    },
    {
      start: 16.07,
      end: 22.17,
      text: "Harley likes to draw nice pictures. Tom watches. What is Harley going to draw? ",
    },
    {
      start: 22.2,
      end: 27.11,
      text: "Harley starts to draw. Kevin watches. What is the picture? ",
    },
    {
      start: 27.14,
      end: 38.11,
      text: "Harley shows the picture to Kevin. Kevin doesn't know what it is. Harley tells him it is a red mountain, and it's in the shape of a triangle. ",
    },
    {
      start: 38.14,
      end: 45.17,
      text: "Now Tom finds a book. Is it Kevin's book? No, it's not Kevin's book. ",
    },
    {
      start: 45.2,
      end: 48.26,
      text: "Whose book is it? Is it the teacher's book? ",
    },
    {
      start: 48.29,
      end: 58.07,
      text: "Helen comes into the classroom. She asks the boys about her red book. Tom gives Helen her red book. She is so happy. ",
    },
    {
      start: 58.1,
      end: 65.11,
      text: "Now Tom wants to draw. Where's his pen? Oh no! Lolo has it.",
    },
  ];
  const clickableAreas = [
    { x1: 15.9, y1: 39.4, x2: 51.5, y2: 45.5, sound: sound2 },
    { x1: 56.0, y1: 39.1, x2: 93.9, y2: 44.0, sound: sound3 },
    { x1: 16.0, y1: 84.0, x2: 52.9, y2: 89.5, sound: sound4 },
    { x1: 56.0, y1: 84.5, x2: 93.7, y2: 93.9, sound: sound5 },
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
      style={{ backgroundImage: `url(${page24})` }}
    >
      {/* <img
        src={page24}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
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
            playSound(area.sound, `p38-${area.sound}`);
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
        className="headset-icon-CD-unit2-page11-1 hover:scale-110 transition"
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
                <AudioWithCaption src={sound1} captions={captionsExample} />
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
        className="pauseBtn-icon-CD-page21 hover:scale-110 transition"
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
                  <source src={video3} type="video/mp4" />
                </video>
              </div>
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

export default Unit4_Reading_P1;
