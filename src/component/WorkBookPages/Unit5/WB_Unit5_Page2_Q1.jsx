import React, { useState, useEffect, useRef } from "react";
// import "./Unit2_Page8_Q1.css";
import table from "../../../assets/U1 WB/U5/U5P28EXEC-01.svg";
import dish from "../../../assets/U1 WB/U5/U5P28EXEC-02.svg";
import duck from "../../../assets/U1 WB/U5/U5P28EXEC-03.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit5_Page2_Q1 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const [wrongWords, setWrongWords] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedLeftWord, setSelectedLeftWord] = useState(null);
  const [selectedRightWord, setSelectedRightWord] = useState(null);

  // ⭐⭐⭐ NEW: حالة قفل الرسم بعد Check Answer
  const [locked, setLocked] = useState(false);
  // -------------------------------------------

  const correctMatches = [
    { word: "This is your desk.", image: "img2" },
    { word: "This is my chair.", image: "img3" },
    { word: "This is your book.", image: "img1" },
  ];

  // ============================
  // 1️⃣ الضغط على النقطة الأولى (start-dot)
  // ============================
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐ NEW: منع الرسم بعد Check Answer

    const rect = containerRef.current.getBoundingClientRect();

    const word = e.target.dataset.word || null;
    const image = e.target.dataset.image || null;
    setSelectedLeftWord(word);
    // ⭐⭐⭐ NEW: منع رسم أكثر من خط من نفس الكلمة
    const alreadyUsed = lines.some((line) => line.word === word);
    if (alreadyUsed) return;
    // ----------------------------------------------------------

    setFirstDot({
      word,
      image,
      x: e.target.getBoundingClientRect().left - rect.left + 8,
      y: e.target.getBoundingClientRect().top - rect.top + 8,
    });
  };

  // ============================
  // 2️⃣ الضغط على النقطة الثانية (end-dot)
  // ============================
  const handleEndDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐ NEW: منع الرسم بعد Check Answer
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

  // ============================
  // 3️⃣ Check Answers
  // ============================
  const checkAnswers2 = () => {
    if (showAnswer || locked) return; // ⭐ NEW: لا يمكن الضغط أكثر من مرة

    if (lines.length < correctMatches.length) {
      ValidationAlert.info(
        "Oops!",
        "Please connect all the pairs before checking.",
      );
      return;
    }

    let wrong = [];
    let correctCount = 0;

    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (pair) => pair.word === line.word && pair.image === line.image,
      );

      if (isCorrect) correctCount++;
      else wrong.push(line.word);
    });

    setWrongWords(wrong);

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

    setLocked(true); // ⭐⭐⭐ NEW: قفل الرسم هنا
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
          gap: "50px",
        }}
      >
        <h5 className="header-title-page8">
          {" "}
          <span className="ex-A">C</span>Read, look, and match.
        </h5>

        <div className="container12 w-full" ref={containerRef}>
          {/* الصف الأول */}
          <div className="matching-row2">
            <div className="word-with-dot2">
              <span className="span-num2">1</span>
              <span
                className={`word-text2-wb-unit3-p5-q2 ${
                  selectedLeftWord === "This is your desk."
                    ? "selected-item"
                    : ""
                } ${locked || showAnswer ? "disabled-word" : ""}`}
                onClick={() => document.getElementById("dot-duck").click()}
                style={{ cursor: "pointer" }}
              >
                This is your desk.
              </span>

              {wrongWords.includes("This is your desk.") && (
                <span className="error-mark8-wb-unit2-p5-q1">✕</span>
              )}

              <div className="dot-wrapper2">
                <div
                  className="dot2 start-dot2"
                  id="dot-duck"
                  data-word="This is your desk."
                  onClick={handleStartDotClick}
                ></div>
              </div>
            </div>

            <div className="img-with-dot2">
              <div className="dot-wrapper2">
                <div
                  className="dot2 end-dot2"
                  data-image="img1"
                  id="dot-img1"
                  onClick={handleEndDotClick}
                ></div>
              </div>
              <div style={{ width: "150px" }}>
                <img
                  src={table}
                  className={`matched-img2 ${
                    locked || showAnswer ? "disabled-hover" : ""
                  }`}
                  alt=""
                  onClick={() => document.getElementById("dot-img1").click()}
                  style={{ cursor: "pointer", height: "120px" }}
                />
              </div>
            </div>
          </div>

          {/* الصف الثاني */}
          <div className="matching-row2">
            <div className="word-with-dot2">
              <span className="span-num2">2</span>
              <span
                className={`word-text2-wb-unit3-p5-q2 ${
                  selectedLeftWord === "This is my chair."
                    ? "selected-item"
                    : ""
                }${locked || showAnswer ? "disabled-word" : ""}`}
                onClick={() => document.getElementById("dot-tiger").click()}
                style={{ cursor: "pointer" }}
              >
                This is my chair.
              </span>

              {wrongWords.includes("This is my chair.") && (
                <span className="error-mark8-wb-unit2-p5-q1">✕</span>
              )}

              <div className="dot-wrapper2">
                <div
                  className="dot2 start-dot2"
                  id="dot-tiger"
                  data-word="This is my chair."
                  onClick={handleStartDotClick}
                ></div>
              </div>
            </div>

            <div className="img-with-dot2">
              <div className="dot-wrapper2">
                <div
                  className="dot2 end-dot2"
                  data-image="img2"
                  id="dot-img2"
                  onClick={handleEndDotClick}
                ></div>
              </div>
              <div style={{ width: "150px" }}>
                <img
                  src={dish}
                  className={`matched-img2 ${
                    locked || showAnswer ? "disabled-hover" : ""
                  }`}
                  alt=""
                  onClick={() => document.getElementById("dot-img2").click()}
                  style={{ cursor: "pointer", height: "110px" }}
                />
              </div>
            </div>
          </div>

          {/* الصف الثالث */}
          <div className="matching-row2">
            <div className="word-with-dot2">
              <span className="span-num2">3</span>
              <span
                className={`word-text2-wb-unit3-p5-q2 ${
                  selectedLeftWord === "This is your book."
                    ? "selected-item"
                    : ""
                }${locked || showAnswer ? "disabled-word" : ""}`}
                onClick={() => document.getElementById("dot-dish").click()}
                style={{ cursor: "pointer" }}
              >
                This is your book.
              </span>

              {wrongWords.includes("This is your book.") && (
                <span className="error-mark8-wb-unit2-p5-q1">✕</span>
              )}

              <div className="dot-wrapper2">
                <div
                  className="dot2 start-dot2"
                  id="dot-dish"
                  data-word="This is your book."
                  onClick={handleStartDotClick}
                ></div>
              </div>
            </div>

            <div className="img-with-dot2">
              <div className="dot-wrapper2">
                <div
                  className="dot2 end-dot2"
                  data-image="img3"
                  id="dot-img3"
                  onClick={handleEndDotClick}
                ></div>
              </div>
              <div style={{ width: "150px" }}>
                <img
                  src={duck}
                  className={`matched-img2 ${
                    locked || showAnswer ? "disabled-hover" : ""
                  }`}
                  alt=""
                  onClick={() => document.getElementById("dot-img3").click()}
                  style={{ cursor: "pointer", height: "110px" }}
                />
              </div>
            </div>
          </div>

          <svg className="lines-layer2">
            {lines.map((line, i) => (
              <line key={i} {...line} stroke="red" strokeWidth="3" />
            ))}
          </svg>
        </div>

        {/* الأزرار */}
        <div className="action-buttons-container">
          <button
            onClick={() => {
              setLines([]);
              setShowAnswer(false);
              setWrongWords([]);
              setFirstDot(null);
              setLocked(false); // ⭐⭐⭐ NEW: إعادة فتح الرسم
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

              setShowAnswer(true);
              setLines(finalLines);
              setWrongWords([]);
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
    </div>
  );
};

export default WB_Unit5_Page2_Q1;
