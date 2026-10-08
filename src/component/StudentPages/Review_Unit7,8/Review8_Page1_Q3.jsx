import React, { useState, useRef } from "react";
import img1 from "../../../assets/unit8/imgs/U8P72EXEC-01.svg";
import img2 from "../../../assets/unit8/imgs/U8P72EXEC-02.svg";
import img3 from "../../../assets/unit8/imgs/U8P72EXEC-03.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review8_Page1_Q3.css";

const Review8_Page1_Q3 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  let startPoint = null;
  const [wrongImages, setWrongImages] = useState([]);
  // ⭐⭐ NEW: قفل الرسم بعد Check Answer
  const [locked, setLocked] = useState(false); //  ← إضافة جديدة
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const correctMatches = [
    { word: "Bend my knee.", image: "img2" },
    { word: "Touch your head.", image: "img3" },
    { word: "Raise your hand.", image: "img1" },
  ];

  // ============================
  // 1️⃣ الضغط على النقطة الأولى (start-dot)
  // ============================
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐⭐ NEW: منع التوصيل إذا مغلق

    const rect = containerRef.current.getBoundingClientRect();

    const word = e.target.dataset.word || null;
    const image = e.target.dataset.image || null;

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
  if (showAnswer || locked) return;
  if (!firstDot) return;

  const selectedImage = e.target.dataset.image;

  const imageAlreadyUsed = lines.some(
    (line) => line.image === selectedImage
  );

  if (imageAlreadyUsed) {
    setFirstDot(null);
    return;
  }

  const rect = containerRef.current.getBoundingClientRect();

  const newLine = {
    x1: firstDot.x,
    y1: firstDot.y,
    x2: e.target.getBoundingClientRect().left - rect.left + 8,
    y2: e.target.getBoundingClientRect().top - rect.top + 8,
    word: firstDot.word,
    image: selectedImage,
  };

  setLines((prev) => [...prev, newLine]);
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
          <span className="mr-2">C</span> Read and match.{" "}
        </h5>

        <div className="match-wrapper2" ref={containerRef}>
          <div className="match-words-row2">
            <div className="word-box2">
              <div style={{ position: "relative" }}>
               <h5
  className={`clickable-word-unit2-p7-q2 ${
    locked || showAnswer ? "disabled-hover" : ""
  } ${
    firstDot?.word === "Bend my knee."
      ? "selected-match"
      : ""
  }`}
  onClick={() => document.getElementById("climb-dot").click()}
>
                  <span style={{ color: "darkblue", fontWeight: "700" }}>
                    1{" "}
                  </span>
                  Bend my knee.
                </h5>
                {wrongImages.includes("Bend my knee.") && (
                  <span className="error-mark-img">✕</span>
                )}
              </div>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="Bend my knee."
                id="climb-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div className="word-box2">
              <div style={{ position: "relative" }}>
                <h5
                  className={`clickable-word-unit2-p7-q2 ${
                    locked || showAnswer ? "disabled-hover" : ""
                  } ${
    firstDot?.word === "Touch your head."
      ? "selected-match"
      : ""
  }`}
                  onClick={() => document.getElementById("fly-dot").click()}
                >
                  <span style={{ color: "darkblue", fontWeight: "700" }}>
                    2
                  </span>
                  Touch your head.
                </h5>
                {wrongImages.includes("Touch your head.") && (
                  <span className="error-mark-img">✕</span>
                )}
              </div>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="Touch your head."
                id="fly-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div className="word-box2">
              <div style={{ position: "relative" }}>
                <h5
                  className={`clickable-word-unit2-p7-q2 ${
                    locked || showAnswer ? "disabled-hover" : ""
                  } ${
    firstDot?.word === "Raise your hand."
      ? "selected-match"
      : ""
  }`}
                  onClick={() => document.getElementById("ride-dot").click()}
                >
                  <span style={{ color: "darkblue", fontWeight: "700" }}>
                    3
                  </span>
                  Raise your hand.
                </h5>
                {wrongImages.includes("Raise your hand.") && (
                  <span className="error-mark-img">✕</span>
                )}
              </div>
              <div
                className="dot22-unit6-q7 start-dot22-review8-p1-q3"
                data-word="Raise your hand."
                id="ride-dot"
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

export default Review8_Page1_Q3;
