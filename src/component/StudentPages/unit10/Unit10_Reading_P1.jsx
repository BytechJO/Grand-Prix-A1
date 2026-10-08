import page24 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream11.jpg";
import React, { useState, useRef } from "react";
// import "./Unit2_Page11.css";
import sound1 from "../../../assets/unit10/sound/cd5pg92-reading-adult-lady_Dn8UIlbB.mp3";
import sound2 from "../../../assets/unit10/sound/Pg92_1.1_Adult Lady.mp3";
import sound3 from "../../../assets/unit10/sound/Pg92_1.2_Adult Lady.mp3";
import sound4 from "../../../assets/unit10/sound/Pg92_1.3_Adult Lady.mp3";
import sound5 from "../../../assets/unit10/sound/Pg92_1.4_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import video3 from "../../../assets/unit1/sounds/STORY (5).mp4";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit10_Reading_P1 = ({ openPopup }) => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);

 const captionsExample = [
  {
    start: 0.699,
    end: 5.4,
    text: "Page 92. Reading. Tilly and Lolo Play Together."
  },

  {
    start: 6.519,
    end: 11.699,
    text: "It is time for dinner. Tilly and Lolo are hungry. What can they eat?"
  },

  {
    start: 11.699,
    end: 17.119,
    text: "Lolo sees some milk. She likes milk. She drinks the milk."
  },

  {
    start: 17.119,
    end: 21.359,
    text: "Tilly likes carrots. She wants to eat some."
  },

  {
    start: 21.92,
    end: 26.859,
    text: "Mom comes in. Oh no! What can Tilly and Lolo do?"
  },

  {
    start: 26.859,
    end: 33.439,
    text: "They jump off the table and run. They go outside. They want to play."
  },

  {
    start: 37.7,
    end: 43.899,
    text: "Lolo can climb a tree. Tilly cannot climb a tree."
  },

  {
    start: 44.919,
    end: 50.459,
    text: "Lolo can swim. Tilly cannot swim."
  },

  {
    start: 50.459,
    end: 55.239,
    text: "They see Sara. What can Sara do?"
  },

  {
    start: 55.239,
    end: 58.079,
    text: "Wow, she can paint."
  },

  {
    start: 58.079,
    end: 60.88,
    text: "Tilly and Lolo can play together."
  }
];
  const clickableAreas = [
    { x1: 15.9, y1: 39.1, x2: 51.5, y2: 45.5, sound: sound2 },
    { x1: 56.0, y1: 39.1, x2: 93.9, y2: 45.5, sound: sound3 },
    { x1: 16.0, y1: 85.5, x2: 52.9, y2: 89.5, sound: sound4 },
    { x1: 56.0, y1:85.5, x2: 93.7, y2: 92.27, sound: sound5 },
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
            activeId === `p90-${area.sound}` || hoveredAreaIndex === index
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
                     playSound(area.sound, `p90-${area.sound}`);

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

export default Unit10_Reading_P1;
