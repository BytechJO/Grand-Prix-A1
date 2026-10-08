import React, { useRef, useState } from "react";
import page25 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match12.jpg";
// import "./Unit2_Page11.css";/

import sound1 from "../../../assets/unit8/sound/Pg74_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/unit8/sound/Pg74_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/unit8/sound/Pg74_1.7_Adult Lady.mp3";
import sound4 from "../../../assets/unit8/sound/Pg74_1.8_Adult Lady.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
const Unit8_Reading_P2 = () => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const clickableAreas = [
    { x1: 9.0, y1: 39.0, x2: 45.8, y2: 46.3, sound: sound1 },
    { x1: 49.0, y1: 39.2, x2: 85.4, y2: 44.1, sound: sound2 },
    { x1: 9.0, y1: 84.5, x2: 45.0, y2: 91.2, sound: sound3 },
    { x1: 49.0, y1: 84.5, x2: 86.5, y2: 91.0, sound: sound4 },
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
      style={{ backgroundImage: `url(${page25})` }}
    >
      {/* <img
           src={page25}
           style={{ display: "block" }}
           onClick={handleImageClick}
         /> */}

      {clickableAreas.map((area, index) => (
        <div
          key={index}
          className={`clickable-area ${
            activeId === `p75-${area.sound}` || hoveredAreaIndex === index
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
            playSound(area.sound, `p75-${area.sound}`);
          }}
          onMouseEnter={() => {
            if (!isPlaying) setHoveredAreaIndex(index);
          }}
          onMouseLeave={() => {
            if (!isPlaying) setHoveredAreaIndex(null);
          }}
        ></div>
      ))}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default Unit8_Reading_P2;
