import page24 from "../../../assets/unit6/imgs/Right 1 Unit 06 Can We Go to the Park11.jpg";
import React, { useState, useRef } from "react";
// import "./Unit2_Page11.css";
import sound1 from "../../../assets/unit6/sounds/U6ReadingP56-57.mp3";
import sound2 from "../../../assets/unit6/sounds/Pg56_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/unit6/sounds/Pg56_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/unit6/sounds/Pg56_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/unit6/sounds/Pg56_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video3 from "../../../assets/unit6/sounds/STORY (3).mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit6_Reading_P1 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

  const captionsExample = [
    {
      start: 0,
      end: 5.12,
      text: "Page 56 reading. Tilly at the park. It is a good morning.",
    },
    {
      start: 5.15,
      end: 10.26,
      text: "Jack is at the park. He sees Hansel and Tilly. Hansel shows Jack the bunny. ",
    },
    {
      start: 10.28,
      end: 16.13,
      text: "Jack likes Tilly. She is soft and friendly. It is a sunny day. ",
    },
    {
      start: 16.15,
      end: 22.29,
      text: "Jack tells Hansel that he likes the park. Hansel tells Jack about Tilly. Tilly is cute. ",
    },
    {
      start: 22.31,
      end: 28.22,
      text: "Jack asks to play with her. Tilly can play games. She is a fun bunny.  ",
    },
    {
      start: 28.24,
      end: 36.29,
      text: "Jack and Tilly play a game. What can Tilly do? Jack can touch his nose. Tilly can't touch her nose.  ",
    },
    {
      start: 36.31,
      end: 44.07,
      text: "Jack can touch his head. Tilly can touch her head. Tilly is good at games. ",
    },
    {
      start: 44.09,
      end: 52.25,
      text: "Tilly is bored. Can she do other things? Jack wants to play more games. Tilly wants to play in the park. ",
    },
    {
      start: 52.27,
      end: 57.27,
      text: "She likes to hop on Jack's feet. Ouch! Tilly hops fast.",
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
            activeId === `p56-${area.sound}` || hoveredAreaIndex === index
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
                    playSound(area.sound, `p56-${area.sound}`);

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

export default Unit6_Reading_P1;
