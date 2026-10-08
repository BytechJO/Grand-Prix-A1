import React, { useState, useRef } from "react";
import img1 from "../../../assets/U1 WB/U9/U9P51EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U9/U9P51EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U9/U9P51EXEA-03.svg";
import img4 from "../../../assets/unit7/img/U7P63EXEE-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit9_Page1_Q1.css";

const WB_Unit9_Page1_Q1 = () => {
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
    { word: "How many cats are there?There are three cats.", image: "img2" },
    { word: "How many horses are there?There is one horse.", image: "img3" },
    { word: "How many cows are there?There are two cows.", image: "img1" },
  ];

  // ============================
  // 1️⃣ الضغط على النقطة الأولى (start-dot)
  // ============================
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐⭐ NEW: منع التوصيل إذا مغلق

    const rect = containerRef.current.getBoundingClientRect();

    const word = e.target.dataset.word || null;
    const image = e.target.dataset.image || null;
    setSelectedLeftWord(image);

    // ⭐⭐ NEW: منع رسم أكثر من خط من نفس الصورة (image)
    const alreadyUsed = lines.some((line) => line.image === image);
    if (alreadyUsed) return; // ← إضافة جديدة

    setFirstDot({
      image,
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
        wrong.push(line.image); // ✅ خزّني اسم صورة الخطأ فقط
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
          {" "}
          <span className="ex-A">A</span>Look and match.
        </h5>

        <div className="match-wrapper2 w-full" ref={containerRef}>
          {/* الجمل */}

          {/* الصور */}
          <div className="match-images-row2">
            <div
              className="img-box2"
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <span style={{ color: "darkblue", fontWeight: "700" }}>1 </span>
              <img
                src={img1}
                alt=""
                style={{ height: "150px" }}
                className={`matched-img2 ${
                  selectedLeftWord === "img1" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img1-dot").click()}
              />
              {wrongImages.includes("img1") && (
                <span className="error-mark-img-unit7-p6-q2">✕</span>
              )}
              <div
                className="dot22-unit7-p6-q2 start-dot22-unit7-p6-q2"
                data-image="img1"
                id="img1-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div
              className="img-box2"
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <span style={{ color: "darkblue", fontWeight: "700" }}>2 </span>
              <img
                src={img2}
                className={`matched-img2 ${
                  selectedLeftWord === "img2" ? "selected-item" : ""
                }${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("img2-dot").click()}
              />{" "}
              {wrongImages.includes("img2") && (
                <span className="error-mark-img-unit7-p6-q2">✕</span>
              )}
              <div
                className="dot22-unit7-p6-q2 start-dot22-unit7-p6-q2"
                data-image="img2"
                id="img2-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div
              className="img-box2"
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <span style={{ color: "darkblue", fontWeight: "700" }}>3 </span>
              <img
                src={img3}
                className={`matched-img2 ${
                  selectedLeftWord === "img3" ? "selected-item" : ""
                }${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("img3-dot").click()}
              />{" "}
              {wrongImages.includes("img3") && (
                <span className="error-mark-img-unit7-p6-q2">✕</span>
              )}
              <div
                className="dot22-unit7-p6-q2 start-dot22-unit7-p6-q2"
                data-image="img3"
                id="img3-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>
          </div>
          <div className="match-words-row2">
            <div
              className="word-box2"
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h5
                  className={`h5-wb-unit9-p1-q1 ${
                    locked || showAnswer ? "disabled-word" : ""
                  }`}
                  onClick={() => document.getElementById("bored-dot").click()}
                >
                  How many cats are there? <br />
                  There are three cats.
                </h5>
                <div
                  className="dot22-unit7-p6-q2 end-dot22-wb-unit9-p1-q1"
                  data-word="How many cats are there?There are three cats."
                  id="bored-dot"
                  onClick={handleEndDotClick}
                ></div>
              </div>
            </div>

            <div className="word-box2">
              <div>
                <h5
                  className={`h5-wb-unit9-p1-q1 ${
                    locked || showAnswer ? "disabled-word" : ""
                  }`}
                  onClick={() => document.getElementById("cold-dot").click()}
                >
                  How many horses are there?
                  <br />
                  There is one horse.
                </h5>
                <div
                  className="dot22-unit7-p6-q2 end-dot22-wb-unit9-p1-q1"
                  data-word="How many horses are there?There is one horse."
                  id="cold-dot"
                  onClick={handleEndDotClick}
                ></div>
              </div>
            </div>

            <div className="word-box2">
              {" "}
              <div>
                <h5
                  className={`h5-wb-unit9-p1-q1 ${
                    locked || showAnswer ? "disabled-word" : ""
                  }`}
                  onClick={() => document.getElementById("scared-dot").click()}
                >
                  How many cows are there?
                  <br />
                  There are two cows.
                </h5>
                <div
                  className="dot22-unit7-p6-q2 end-dot22-wb-unit9-p1-q1"
                  data-word="How many cows are there?There are two cows."
                  id="scared-dot"
                  onClick={handleEndDotClick}
                ></div>
              </div>
            </div>
          </div>
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
            setShowAnswer(false);
            setLocked(false); // ⭐⭐ NEW: السماح بالرسم مجدداً
            setSelectedLeftWord(null);
            setSelectedRightWord(null);
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
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
            setSelectedLeftWord(null);
            setSelectedRightWord(null);
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

export default WB_Unit9_Page1_Q1;
