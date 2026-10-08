import page24 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match11.jpg";
import React, { useState, useRef } from "react";
// import "./Unit2_Page11.css";
import sound1 from "../../../assets/unit4/sounds/U4ReadingP38-39.mp3";
import sound2 from "../../../assets/unit8/sound/Pg74_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/unit8/sound/Pg74_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/unit8/sound/Pg74_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/unit8/sound/Pg74_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video3 from "../../../assets/unit8/sound/STORY (4).mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit8_Reading_P1 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  const captionsExample = [
    { start: 0, end: 5.04, text: "Page 38 Reading. Hey, that's my pen! " },
    {
      start: 5.07,
      end: 16.03,
      text: "It is a good morning. Jack is at the park.He sees Hansel and Tilly.",
    },
    {
      start: 16.07,
      end: 22.17,
      text: "Hansel shows Jack the bunny. Jack likes Tilly. She is soft and friendly.",
    },
    {
      start: 22.2,
      end: 27.11,
      text: "It is a sunny day! Jack tells Hansel that he likes the park. Hansel tells Jack about Tilly.",
    },
    {
      start: 27.14,
      end: 38.11,
      text: "Tilly is cute. Jack asks to play with her. Tilly can play games. She is a fun bunny.",
    },
    {
      start: 38.14,
      end: 45.17,
      text: "Jack and Tilly play a game. What can Tilly do? Jack can touch his nose. Tilly can’t touch her nose.",
    },
    {
      start: 45.2,
      end: 48.26,
      text: "Jack can touch his head. Tilly can touch her head. Tilly is good at games.",
    },
    {
      start: 48.29,
      end: 58.07,
      text: "Tilly is bored. Can she do other things? Jack wants to play more games.",
    },
    {
      start: 58.1,
      end: 65.11,
      text: "Tilly wants to play in the park. She likes to hop on Jack’s feet! Ouch! Tilly hops fast!",
    },
  ];
  const clickableAreas = [
    { x1: 15.9, y1: 39.1, x2: 51.5, y2: 45.5, sound: sound2 },
    { x1: 56.0, y1: 39.1, x2: 93.9, y2: 44.0, sound: sound3 },
    { x1: 16.0, y1: 84.5, x2: 52.9, y2: 89.5, sound: sound4 },
    { x1: 56.0, y1: 84.5, x2: 93.7, y2: 89.77, sound: sound5 },
  ];
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    console.log("X%:", xPercent.toFixed(2), "Y%:", yPercent.toFixed(2));
  };
  const playSound = (soundPath) => {
    if (audioRef.current) {
      audioRef.current.src = soundPath;
      audioRef.current.play();
      setIsPlaying(true);
      setHoveredAreaIndex(null); // إزالة الهايلايت عند بدء الصوت

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setHoveredAreaIndex(null);
        setActiveAreaIndex(null); // مسح الهايلايت بعد انتهاء الصوت
      };
    }
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
            activeId === `p74-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p74-${area.sound}`);
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

export default Unit8_Reading_P1;
