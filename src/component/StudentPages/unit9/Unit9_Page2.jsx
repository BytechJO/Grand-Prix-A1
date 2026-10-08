import React, { useState, useEffect, useRef } from "react";
import page_2 from "../../../assets/unit9/imgs/Right 1 Unit 09 A Day on the Farm2.png";
import soundSong from "../../../assets/unit9/sound/cd69pg77-intro-adult-lady_rzvvDHXe.mp3";
import sound1 from "../../../assets/unit9/sound/Pg77_1.1_Bebo.mp3";
import sound2_2 from "../../../assets/unit9/sound/Pg77_1.2_Lolo.mp3";
import sound3 from "../../../assets/unit9/sound/Pg77_2.1_Adult Lady.mp3";
import sound4 from "../../../assets/unit9/sound/Pg77_2.2_Adult Lady.mp3";
import sound5 from "../../../assets/unit9/sound/Pg77_2.3_Adult Lady.mp3";
import sound6 from "../../../assets/unit9/sound/Pg77_2.4_Adult Lady.mp3";
import sound7 from "../../../assets/unit9/sound/pg77-instruction2-adult-lady_I8q3rOba.mp3";
import img1 from "../../../assets/unit9/imgs/N.svg";
import img2 from "../../../assets/unit9/imgs/nest.svg";
import img3 from "../../../assets/unit9/imgs/night.svg";
import img4 from "../../../assets/unit9/imgs/nurse.svg";
import CD21_Pg23_Instruction1_AdultLady from "../../../assets/unit9/sound/cd70pg77-instruction1-adult-lady_FHpgFnb2.mp3";
import repeat1 from "../../../assets/unit9/imgs/listen and repeat 02.svg";
import repeat2 from "../../../assets/unit9/imgs/listen and repeat 03.svg";
import read from "../../../assets/unit1/imgs/P1 listen and repeat 01.svg";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import "./Unit9_Page2.css";
import sound2_3 from "../../../assets/unit9/sound/unit9-sound6.mp3";
import sound2_5 from "../../../assets/unit9/sound/unit9-sound7.mp3";
import sound2_6 from "../../../assets/unit9/sound/unit9-sound8.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";

const Unit9_Page2 = ({ openPopup }) => {
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
    {
      start: 0.259,
      end: 1.799,
      text: "Page 77.",
    },
    {
      start: 2.399,
      end: 3.879,
      text: "I like horses.",
    },
    {
      start: 4.599,
      end: 7.419,
      text: "Hansel, Harley, and I like to go to the farm.",
    },
    {
      start: 8.0,
      end: 9.719,
      text: "There are many animals to see.",
    },
    {
      start: 10.46,
      end: 12.5,
      text: "Hansel likes cows and horses.",
    },
    {
      start: 13.059,
      end: 14.559,
      text: "Harley likes goats.",
    },
    {
      start: 14.679,
      end: 15.72,
      text: "I like horses.",
    },
  ];
  const captions = [
    {
      start: 0.319,
      end: 4.94,
      text: "Page 77, listen, read, and repeat.",
    },
    {
      start: 5.92,
      end: 7.179,
      text: "I like horses.",
    },
    {
      start: 7.899,
      end: 8.88,
      text: "I like cats.",
    },
  ];
  const captions2 = [
    {
      start: 0.239,
      end: 3.72,
      text: "Page 77. Listen and read along.",
    },
    {
      start: 4.659,
      end: 4.92,
      text: "N.",
    },
    {
      start: 5.599,
      end: 8.199,
      text: "Nest, night, nurse.",
    },
  ];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 28.4, y1: 31.86, sound: 1, isPrimary: true },

    // // // الصوت الأول – منطقة إضافية
    { x1: 13.44, y1: 29.15, x2: 40.59, y2: 47.49, sound: 1, isPrimary: false },

    // // // الصوت الثاني – الأساسية
    { x1: 29.4, y1: 63, sound: 2, isPrimary: true },

    // // // الصوت الثاني – الإضافية
    { x1: 25.94, y1: 64.35, x2: 42.1, y2: 75.01, sound: 2, isPrimary: false },
    // // // الصوت الثاني – الأساسية
    { x1: 33.2, y1: 49.5, sound: 3, isPrimary: true },

    // // // الصوت الثاني – الإضافية
    { x1: 26.16, y1: 50.81, x2: 39.95, y2: 58.09, sound: 3, isPrimary: false },
  ];
  const sounds = {
    1: sound2_3,
    2: sound2_5,
    3: sound2_6,
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
        const isActive = activeId === `p77-${area.sound}`;
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
                playSound(sounds[area.sound], `p77-${area.sound}`);
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
              playSound(sounds[area.sound], `p77-${area.sound}`);
            }}
          ></div>
        );
      })}

      <div
        className="headset-icon-CD-unit9-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <AudioWithCaption src={soundSong} captions={captionsExample} />,
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
        className="headset-icon-CD-unit9-page2-2 hover:scale-110 transition"
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
                checkpoints={[0, 5.92, 7.899]}
                popupOpen={true}
                titleQ={`Listen, read, and repeat.`}
                audioArr={imageSounds2}
                captions={captions}
              />,
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
        className="click-icon-unit9-page2-1 hover:scale-110 transition"
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
                checkpoints={[0, 4.659, 5.6, 6.68, 7.66]}
                popupOpen={true}
                titleQ={"Listen and read along."}
                audioArr={imageSounds}
                captions={captions2}
              />,
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

export default Unit9_Page2;
