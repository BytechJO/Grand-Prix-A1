import { useState, useRef } from "react";
import page_1 from "../../../assets/unit4/imgs/Right 1 Unit 04 Wonderful Shapes and Colors.jpg";
import "./Unit4_Page1.css";
import CD2_Pg38_Reading1_AdultLady from "../../../assets/unit4/sounds/U4P28-29.mp3";
import Unit4_Page1_Vocab from "./Unit4_Page1_Vocab";
import Unit4_Page1_find from "./Unit4_Page1_find";
import AudioWithCaption from "../../AudioWithCaption";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import sound1 from "../../../assets/unit4/sounds/U4P28VOC-01.mp3";
import sound2 from "../../../assets/unit4/sounds/U4P28VOC-02.mp3";
import sound3 from "../../../assets/unit4/sounds/U4P28VOC-03.mp3";
import sound4 from "../../../assets/unit4/sounds/U4P28VOC-04.mp3";
import sound5 from "../../../assets/unit4/sounds/U4P28VOC-05.mp3";
import sound6 from "../../../assets/unit4/sounds/U4P28VOC-06.mp3";
import sound7 from "../../../assets/unit4/sounds/U4P28VOC-07.mp3";
import { useContext } from "react";
import { AudioContext } from "../../../AudioContext";
import Unit4_Page1_Read from "./Unit4_Pag1_Read";
const Unit4_Page1 = ({ openPopup }) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(null);
  const [hoveredAreaIndex, setHoveredAreaIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { audioRef, activeId, setActiveId } = useContext(AudioContext);
  const captionsExample = [
    {
      start: 0,
      end: 4.3,
      text: "Page 28, unit 4. Wonderful shapes and colors.",
    },
    { start: 4.35, end: 8.29, text: "Page 28, unit 4 vocabulary. " },
    { start: 8.33, end: 11.05, text: "1.	brown. " },
    { start: 11.09, end: 13.05, text: "2.	blue. " },
    { start: 13.09, end: 15.24, text: "3.	yellow. " },
    { start: 15.27, end: 18.13, text: "4.	square. " },
    { start: 18.17, end: 21.0, text: "5.	rectangle." },
    { start: 21.04, end: 23.11, text: "6.	triangle. " },
    { start: 23.14, end: 25.27, text: "7.	red. " },
    { start: 25.3, end: 26.29, text: "8.	circle. " },
    { start: 26.33, end: 31.23, text: "Page 28, listen and read along. " },
    {
      start: 31.27,
      end: 36.02,
      text: "F, feet, fish, fork. ",
    },
    { start: 36.06, end: 39.06, text: "Page 29, my picture. " },
    {
      start: 39.09,
      end: 57.13,
      text: "This is a house. The roof is a triangle. The door is a square. The windows are circles. The frame is a rectangle. It is green, blue, brown and yellow. I like my picture. ",
    },
    { start: 57.17, end: 61.21, text: "Page 29. Listen, read and repeat. " },
    { start: 61.24, end: 63.25, text: "Look at Stella's picture." },
    {
      start: 63.28,
      end: 65.24,
      text: "It looks nice.",
    },
    { start: 65.27, end: 69.23, text: "Page 29. Listen and read along. " },
    { start: 69.27, end: 74.06, text: "V, van, vet, vest." },
  ];
  const areas = [
    // الصوت الأول – المنطقة الأساسية
    { x1: 25.9, y1: 28.9, sound: 1, isPrimary: true },
    // // // // الصوت الأول – منطقة إضافية
    { x1: 25.2, y1: 20.18, x2: 36.2, y2: 28.9, sound: 1, isPrimary: false },

    // // // // الصوت الثاني – الأساسية
    { x1: 67.6, y1: 49.9, sound: 2, isPrimary: true },
    // // // // الصوت الثاني – الإضافية
    { x1: 70, y1: 45.4, x2: 75.4, y2: 57.9, sound: 2, isPrimary: false },

    // // // // الصوت الثالث – الأساسية
    { x1: 62.4, y1: 69.09, sound: 3, isPrimary: true },
    // // // // الصوت الثالث – الإضافية
    { x1: 59.06, y1: 62.8, x2: 68.33, y2: 73.49, sound: 3, isPrimary: false },

    // // // // الصوت الرابع – الأساسية
    { x1: 92.75, y1: 70.8, sound: 4, isPrimary: true },
    // // // // الصوت الرابع – الإضافية
    { x1: 87.9, y1: 64.3, x2: 99.4, y2: 75.03, sound: 4, isPrimary: false },

    // // // // الصوت الخامس – الأساسية
    { x1: 54.3, y1: 51.7, sound: 5, isPrimary: true },
    // // // // الصوت الخامس – الإضافية
    { x1: 41.6, y1: 41.5, x2: 59.06, y2: 54.7, sound: 5, isPrimary: false },

    // // // // الصوت السادس – الأساسية
    { x1: 88.0, y1: 55.5, sound: 6, isPrimary: true },
    // // // // الصوت السادس – الإضافية
    { x1: 76.9, y1: 49.12, x2: 90.9, y2: 58.9, sound: 6, isPrimary: false },

    // // // // الصوت السابع – الأساسية
    { x1: 52.0, y1: 17.47, sound: 7, isPrimary: true },
    // // // // الصوت السابع – الإضافية
    { x1: 52.17, y1: 20.86, x2: 62.5, y2: 27.46, sound: 7, isPrimary: false },
  ];
  const sounds = {
    1: sound1,
    2: sound2,
    3: sound3,
    4: sound4,
    5: sound5,
    6: sound6,
    7: sound7,
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
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />
      {areas.map((area, index) => {
        const isActive = activeId === `p28-${area.sound}`;

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
                playSound(sounds[area.sound], `p28-${area.sound}`);
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
              playSound(sounds[area.sound], `p28-${area.sound}`);
            }}
          ></div>
        );
      })}
      <div
        className="headset-icon-CD-unit4-page1-1 hover:scale-110 transition"
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
                <AudioWithCaption
                  src={CD2_Pg38_Reading1_AdultLady}
                  captions={captionsExample}
                />
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
        className="click-icon-unit4-page1-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit4_Page1_find />
              </>,
              false,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="headset-icon-CD-unit4-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit4_Page1_Vocab />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
      <div
        className="click-icon-unit4-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <>
                <Unit4_Page1_Read />
              </>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
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

export default Unit4_Page1;
