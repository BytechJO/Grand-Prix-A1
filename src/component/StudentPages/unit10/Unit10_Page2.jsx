import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream2.jpg";
import soundSong from "../../../assets/unit10/sound/cd76pg83-intro-adult-lady_pJ95qTte.mp3";
import sound1 from "../../../assets/unit10/sound/Pg83_1.1_Bebo.mp3";
import sound2_2 from "../../../assets/unit10/sound/Pg83_1.2_Lolo.mp3";
import sound3 from "../../../assets/unit10/sound/Pg83_2.1_Adult Lady.mp3";
import sound4 from "../../../assets/unit10/sound/Pg83_2.2_Adult Lady.mp3";
import sound5 from "../../../assets/unit10/sound/Pg83_2.3_Adult Lady.mp3";
import sound6 from "../../../assets/unit10/sound/Pg83_2.4_Adult Lady.mp3";
import sound7 from "../../../assets/unit10/sound/pg83-instruction2-adult-lady_EIa8g91V.mp3";
import img1 from "../../../assets/unit10/imgs/short e.svg";
import img2 from "../../../assets/unit10/imgs/ten.svg";
import img3 from "../../../assets/unit10/imgs/net.svg";
import img4 from "../../../assets/unit10/imgs/jet.svg";
import CD21_Pg23_Instruction1_AdultLady from "../../../assets/unit10/sound/pg83-11-bebo_OBRcxreb.mp3";
import repeat1 from "../../../assets/unit10/imgs/listen and repeat 02.svg";
import repeat2 from "../../../assets/unit10/imgs/listen and repeat 03.svg";
import read from "../../../assets/unit1/imgs/P1 listen and repeat 01.svg";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import "./Unit10_Page2.css";
import sound9 from "../../../assets/unit10/sound/unit10-sound9.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit10_Page2 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  // أصوات الصور
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound3),
    new Audio(sound4),
    new Audio(sound5),
    new Audio(sound6),
  ];
  const imageSounds2 = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2_2),
  ];
 const captionsExample = [
  { start: 0.439, end: 1.539, text: "Page 83." },
  { start: 2.059, end: 2.819, text: "Lunchtime." },

  { start: 3.779, end: 4.44, text: "Welcome." },
  { start: 4.5, end: 5.519, text: "It's time for lunch." },
  { start: 6.0, end: 7.259, text: "We eat different foods." },
  { start: 7.699, end: 8.479, text: "I want chicken." },
  { start: 8.819, end: 9.76, text: "Harley wants bread." },
  { start: 10.179, end: 11.239, text: "Hansel wants milk." },
  { start: 11.579, end: 12.84, text: "We all want fruit." },
];
 const captions = [
  { start: 0.179, end: 1.459, text: "Welcome to my house." },
  { start: 2.22, end: 2.759, text: "Thank you" },
];
 const captions2 = [
  { start: 0.399, end: 1.5, text: "Page 83." },
  { start: 2.159, end: 3.619, text: "Listen and read along." },
  { start: 4.539, end: 5.44, text: "Short E." },
  { start: 5.859, end: 6.259, text: "Ten." },
  { start: 6.92, end: 7.359, text: "Net." },
  { start: 8.079, end: 8.579, text: "Jet" },
];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 11.2, y1: 46.4, sound: 1, isPrimary: true },

    // // الصوت الأول – منطقة إضافية
    { x1: 2.89, y1: 34.73, x2: 11.72, y2: 70.10, sound: 1, isPrimary: false },

  ];
  const sounds = {
    1: sound9,

  };

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
      style={{ backgroundImage: `url(${page_2})` }}
    >
      {/* <img src={page_2} /> */}
        <audio ref={audioRef} style={{ display: "none" }} />
      {areas.map((area, index) => {
       const isActive = activeId === `p83-${area.sound}`;

        // ============================
        // 1️⃣ المنطقة الأساسية → دائرة تظهر فقط عندما تكون Active
        // ============================
        if (area.isPrimary) {
          return (
            <div
              key={index}
              className={`circle-area ${isActive ? "active" : ""}`}
              style={{
                left: `${area.x1}%`,
                top: `${area.y1}%`,
              }}
              onClick={() => {
              playSound(sounds[area.sound], `p83-${area.sound}`);
              }}
            ></div>
          );
        }

        // ============================
        // 2️⃣ المناطق الفرعية → مربعات داكنة مخفية ولازم
        //    عند الضغط عليها → تفعّل الدائرة الأساسية
        // ============================
        return (
          <div
            key={index}
            className="clickable-area"
            style={{
              position: "absolute",
              left: `${area.x1}%`,
              top: `${area.y1}%`,
              width: `${area.x2 - area.x1}%`,
              height: `${area.y2 - area.y1}%`,
            }}
            onClick={() => {
           playSound(sounds[area.sound], `p83-${area.sound}`);
               }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit10-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <AudioWithCaption src={soundSong} captions={captionsExample} />
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
        className="headset-icon-CD-unit10-page2-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <FourImagesWithAudio
                images={[read, repeat1, repeat2]}
                audioSrc={CD21_Pg23_Instruction1_AdultLady}
                checkpoints={[0, 4.6, 7.14]}
                popupOpen={true}
                titleQ={`Listen, read, and repeat.`}
                audioArr={imageSounds2}
                captions={captions}
              />
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
        className="click-icon-unit10-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <FourImagesWithAudio
                images={[Rabbit, img1, img2, img3, img4]}
                audioSrc={sound7}
                checkpoints={[0, 4.15, 5.859, 6.92, 8.079]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions2}
              />
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            href={arrowBtn}
            className="svg-img"
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit10_Page2;
