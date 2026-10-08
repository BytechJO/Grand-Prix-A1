import React, { useRef, useState } from "react";
import page25 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream12.jpg";
import sound1 from "../../../assets/unit10/sound/Pg92_1.5_Adult Lady.mp3";
import sound2 from "../../../assets/unit10/sound/Pg92_1.6_Adult Lady.mp3";
import sound3 from "../../../assets/unit10/sound/Pg92_1.7_Adult Lady.mp3";
import sound4 from "../../../assets/unit10/sound/Pg92_1.8_Adult Lady.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit10_Reading_P2 = () => {
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const clickableAreas = [
    { x1: 9.0, y1: 39.0, x2: 45.8, y2: 45.3, sound: sound1 },
    { x1: 49.0, y1: 39.2, x2: 85.4, y2: 45.3, sound: sound2 },
    { x1: 9.0, y1: 86.0, x2: 45.0, y2: 92.78, sound: sound3 },
    { x1: 49.0, y1: 86.0, x2: 86.5, y2: 92.78, sound: sound4 },
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
            hoveredAreaIndex === index || activeAreaIndex === index
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
            setActiveAreaIndex(index); // لتثبيت الهايلايت أثناء الصوت
            playSound(area.sound);
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

export default Unit10_Reading_P2;
