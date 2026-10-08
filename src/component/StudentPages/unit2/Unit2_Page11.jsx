import page24 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday11.jpg";
import React, { useState, useRef } from "react";
import "./Unit2_Page11.css";
import sound1 from "../../../assets/img_unit2/sounds-unit2/Reading 20-21.mp3";
import sound2 from "../../../assets/img_unit2/sounds-unit2/Pg20_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/img_unit2/sounds-unit2/Pg20_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/img_unit2/sounds-unit2/Pg20_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/img_unit2/sounds-unit2/Pg20_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video3 from "../../../assets/unit1/sounds/STORY (1).mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit2_Page11 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const captionsExample = [
    { start: 0, end: 3.17, text: "Page 20 Reading. It's a Bunny." },
    {
      start: 3.2,
      end: 7.18,
      text: " Today is Stella's birthday. Her friends are at her party. ",
    },
    {
      start: 7.21,
      end: 14.01,
      text: "There is a big birthday cake. Harley asks Stella how old she is. She is seven years old. ",
    },
    {
      start: 14.05,
      end: 18.26,
      text: "Harley, Hansel, and John see the cupcakes. They look delicious.",
    },
    {
      start: 18.3,
      end: 26.09,
      text: "Hansel eats a lot of cupcakes. His tummy hurts. John tells him it is not good to eat so many sweets.",
    },
    {
      start: 26.12,
      end: 34.0,
      text: "Now, it's time for presents. Mom gives Stella her present. Stella is so excited.",
    },
    {
      start: 34.04,
      end: 37.05,
      text: "Stella opens the present. What can it be?  ",
    },
    {
      start: 37.09,
      end: 45.09,
      text: "The present from mom is a bunny. It is very cute and white. Stella names her new bunny Tilly.",
    },
    {
      start: 45.12,
      end: 54.04,
      text: "Tilly hops and chases Lolo. Lolo is surprised. Stella and Sara laugh and laugh. This is the best birthday.",
    },
  ];
  const clickableAreas = [
    { x1: 15.9, y1: 39.4, x2: 51.14, y2: 44.0, sound: sound2 },
    { x1: 56.0, y1: 39.1, x2: 93.9, y2: 44.0, sound: sound3 },
    { x1: 16.0, y1: 84.0, x2: 52.9, y2: 89.5, sound: sound4 },
    { x1: 56.0, y1: 84.5, x2: 93.7, y2: 90.9, sound: sound5 },
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
      style={{ backgroundImage: `url(${page24})` }}
    >
      {/* <img
        src={page24}
        style={{ display: "block" }}
        onClick={handleImageClick}
      /> */}

      {clickableAreas.map((area, index) => (
        <div
          key={index}
           className={`clickable-area ${
            activeId === `p11-${area.sound}`||  hoveredAreaIndex === index   ? "highlight" : ""
          }`}
          style={{
            position: "absolute",
            left: `${area.x1}%`,
            top: `${area.y1}%`,
            width: `${area.x2 - area.x1}%`,
            height: `${area.y2 - area.y1}%`,
          }}
          onClick={() => {
          playSound(area.sound, `p11-${area.sound}`);
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

export default Unit2_Page11;
