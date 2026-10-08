import React, { useState, useRef } from "react";
import img1 from "../../../assets/U1 WB/U3/SVG/U3P17EXEF-01.svg";
import img2 from "../../../assets/U1 WB/U3/SVG/U3P17EXEF-02.svg";
import img3 from "../../../assets/U1 WB/U3/SVG/U3P17EXEF-03.svg";
import img4 from "../../../assets/U1 WB/U3/SVG/U3P17EXEF-04.svg";
import img5 from "../../../assets/U1 WB/U3/SVG/U3P17EXEF-05.svg";

import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit3_Page3_Q2.css";

const WB_Unit3_Page3_Q2 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  let startPoint = null;
  const [wrongImages, setWrongImages] = useState([]);
  // ⭐⭐ NEW: قفل الرسم بعد Check Answer
  const [locked, setLocked] = useState(false); //  ← إضافة جديدة
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedLeftWord, setSelectedLeftWord] = useState(null);
  const [selectedRightWord, setSelectedRightWord] = useState(null);

  const correctMatches = [
    { word: "six chairs", image: "img3" },
    { word: "five desks", image: "img4" },
    { word: "two balls", image: "img1" },
    { word: "four forks", image: "img5" },
    { word: "nine birds", image: "img2" },
  ];

  // ============================
  // 1️⃣ الضغط على النقطة الأولى (start-dot)
  // ============================
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐⭐ NEW: منع التوصيل إذا مغلق

    const rect = containerRef.current.getBoundingClientRect();

    const word = e.target.dataset.word || null;
    const image = e.target.dataset.image || null;
    setSelectedLeftWord(word);
    // ⭐⭐ NEW: منع رسم أكثر من خط من نفس الصورة (image)
    const alreadyUsed = lines.some((line) => line.word === word);
    if (alreadyUsed) return; // ← إضافة جديدة

    setFirstDot({
      word,

      x: e.target.getBoundingClientRect().left - rect.left + 8,
      y: e.target.getBoundingClientRect().top - rect.top + 8,
    });
  };

  // ============================
  // 2️⃣ الضغط على النقطة الثانية (end-dot)
  // ============================
  const handleEndDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐⭐ NEW: منع التوصيل إذا مغلق
    if (!firstDot) return;

    const rect = containerRef.current.getBoundingClientRect();

    const endWord = e.target.dataset.word || null;
    const endImage = e.target.dataset.image || null;

    const newLine = {
      x1: firstDot.x,
      y1: firstDot.y,
      x2: e.target.getBoundingClientRect().left - rect.left + 8,
      y2: e.target.getBoundingClientRect().top - rect.top + 8,

      word: firstDot.word || endWord,
      image: firstDot.image || endImage,
    };

    setLines((prev) => [...prev, newLine]);
    setSelectedRightWord(newLine.image);

    setTimeout(() => {
      setSelectedLeftWord(null);
      setSelectedRightWord(null);
    }, 300);

    setFirstDot(null);
  };
  const checkAnswers2 = () => {
    if (showAnswer || locked) return; // ⭐⭐ NEW: منع التوصيل بعد القفل
    if (lines.length < correctMatches.length) {
      ValidationAlert.info(
        "Oops!",
        "Please connect all the pairs before checking.",
      );
      return;
    }

    let correctCount = 0;
    let wrong = [];

    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (pair) => pair.word === line.word && pair.image === line.image,
      );

      if (isCorrect) {
        correctCount++;
      } else {
        wrong.push(line.word); // ✅ خزّني اسم صورة الخطأ فقط
      }
    });

    setWrongImages(wrong); // ✅ حفظ الصور الغلط
    setLocked(true); // ⭐⭐ NEW: إغلاق الرسم بعد Check Answer
    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
      Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">F</span>Read, count, and match.
        </h5>

        <div className="match-wrapper2" ref={containerRef}>
          <div className="match-words-row2">
            <div className="word-box2">
              <h5
                className={`h5-wb-unit3-p3-q2 ${
                  selectedLeftWord === "six chairs" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-word" : ""}`}
                onClick={() => document.getElementById("climb-dot").click()}
              >
                six chairs
                {wrongImages.includes("six chairs") && (
                  <span className="error-mark-img">✕</span>
                )}
              </h5>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="six chairs"
                id="climb-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div className="word-box2">
              <h5
                className={`h5-wb-unit3-p3-q2 ${
                  selectedLeftWord === "five desks" ? "selected-item" : ""
                }${
                  locked || showAnswer ? "disabled-word" : ""
                }`}
                onClick={() => document.getElementById("fly-dot").click()}
              >
                five desks
                {wrongImages.includes("five desks") && (
                  <span className="error-mark-img">✕</span>
                )}
              </h5>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="five desks"
                id="fly-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div className="word-box2">
              <h5
                className={`h5-wb-unit3-p3-q2 ${
                  selectedLeftWord === "two balls" ? "selected-item" : ""
                } ${
                  locked || showAnswer ? "disabled-word" : ""
                }`}
                onClick={() => document.getElementById("ride-dot").click()}
              >
                two balls
                {wrongImages.includes("two balls") && (
                  <span className="error-mark-img">✕</span>
                )}
              </h5>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="two balls"
                id="ride-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>
            <div className="word-box2">
              <h5
                className={`h5-wb-unit3-p3-q2 ${
                  selectedLeftWord === "four forks" ? "selected-item" : ""
                } ${
                  locked || showAnswer ? "disabled-word" : ""
                }`}
                onClick={() => document.getElementById("forks-dot").click()}
              >
                four forks
                {wrongImages.includes("four forks") && (
                  <span className="error-mark-img">✕</span>
                )}
              </h5>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="four forks"
                id="forks-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>
            <div className="word-box2">
              <h5
                className={`h5-wb-unit3-p3-q2 ${
                  selectedLeftWord === "nine birds" ? "selected-item" : ""
                }${
                  locked || showAnswer ? "disabled-word" : ""
                }`}
                onClick={() => document.getElementById("birds-dot").click()}
              >
                nine birds
                {wrongImages.includes("nine birds") && (
                  <span className="error-mark-img">✕</span>
                )}
              </h5>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="nine birds"
                id="birds-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>
          </div>
          {/* الصور */}
          <div className="match-images-row2">
            <div className="img-box2">
              <img
                src={img1}
                alt=""
                className={`img-box2-unit6-p6-q3 ${
                  locked || showAnswer ? "disabled-hover" : ""
                }`}
                onClick={() => document.getElementById("img1-dot").click()}
              />

              <div
                className="dot22-unit6-q7 end-dot22-unit6-q7"
                data-image="img1"
                id="img1-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>
            <div className="img-box2">
              <img
                src={img2}
                alt=""
                className={`img-box2-unit6-p6-q3 ${
                  locked || showAnswer ? "disabled-hover" : ""
                }`}
                onClick={() => document.getElementById("img2-dot").click()}
              />{" "}
              <div
                className="dot22-unit6-q7 end-dot22-unit6-q7"
                data-image="img2"
                id="img2-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>
            <div className="img-box2">
              <img
                src={img3}
                alt=""
                className={`img-box2-unit6-p6-q3 ${
                  locked || showAnswer ? "disabled-hover" : ""
                }`}
                onClick={() => document.getElementById("img3-dot").click()}
              />{" "}
              <div
                className="dot22-unit6-q7 end-dot22-unit6-q7"
                data-image="img3"
                id="img3-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>
            <div className="img-box2">
              <img
                src={img4}
                alt=""
                className={`img-box2-unit6-p6-q3 ${
                  locked || showAnswer ? "disabled-hover" : ""
                }`}
                onClick={() => document.getElementById("img4-dot").click()}
              />{" "}
              <div
                className="dot22-unit6-q7 end-dot22-unit6-q7"
                data-image="img4"
                id="img4-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>{" "}
            <div className="img-box2">
              <img
                src={img5}
                alt=""
                className={`img-box2-unit6-p6-q3 ${
                  locked || showAnswer ? "disabled-hover" : ""
                }`}
                onClick={() => document.getElementById("img5-dot").click()}
              />{" "}
              <div
                className="dot22-unit6-q7 end-dot22-unit6-q7"
                data-image="img5"
                id="img5-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>
          </div>

          {/* الجمل */}

          {/* الخطوط */}
          <svg className="lines-layer2">
            {lines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="red"
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="action-buttons-container">
        <button
          onClick={() => {
            setLines([]);
            setWrongImages([]);
            setFirstDot(null);
            setShowAnswer(false);
            setLocked(false); // ⭐⭐ NEW: السماح بالرسم مجدداً
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
        {/* Show Answer */}
        <button
          onClick={() => {
            const rect = containerRef.current.getBoundingClientRect();

            const getDotPosition = (selector) => {
              const el = document.querySelector(selector);
              if (!el) return { x: 0, y: 0 };
              const r = el.getBoundingClientRect();
              return {
                x: r.left - rect.left + 8,
                y: r.top - rect.top + 8,
              };
            };

            const finalLines = correctMatches.map((line) => ({
              ...line,
              x1: getDotPosition(`[data-word="${line.word}"]`).x,
              y1: getDotPosition(`[data-word="${line.word}"]`).y,
              x2: getDotPosition(`[data-image="${line.image}"]`).x,
              y2: getDotPosition(`[data-image="${line.image}"]`).y,
            }));

            setLines(finalLines);
            setWrongImages([]);
            setShowAnswer(true);
            setLocked(true); // ⭐⭐ NEW: منع الرسم أثناء Show Answer
          }}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button onClick={checkAnswers2} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit3_Page3_Q2;
