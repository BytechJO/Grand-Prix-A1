import React, { useRef, useState } from "react";
import img1 from "../../../assets/unit1/imgs/Read and match 01.png";
import img2 from "../../../assets/unit1/imgs/Read and match 02.png";

import "./Page8_Q3.css";
import ValidationAlert from "../../Popup/ValidationAlert";

export default function Page8_Q3() {
  const [lines, setLines] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const containerRef = useRef(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const correctMatches = [
    { word: "Hello! I’m John.", image: "img1" },
    { word: "Goodbye!", image: "img2" },
  ];

  // ============================
  // 1️⃣ الضغط على النقطة الأولى (start-dot)
  // ============================
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return;

    const word = e.target.dataset.letter;

    const alreadyUsed = lines.some((line) => line.word === word);
    if (alreadyUsed) return;

    const rect = containerRef.current.getBoundingClientRect();

    setSelectedWord(word);

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

    const rect = containerRef.current.getBoundingClientRect();
    const image = e.target.dataset.image;

    const newLine = {
      x1: firstDot.x,
      y1: firstDot.y,
      x2: e.target.getBoundingClientRect().left - rect.left + 8,
      y2: e.target.getBoundingClientRect().top - rect.top + 8,
      word: firstDot.word,
      image,
    };

    setLines((prev) => [...prev, newLine]);

    setSelectedImage(image);

    setTimeout(() => {
      setSelectedWord(null);
      setSelectedImage(null);
    }, 300);

    setFirstDot(null);
  };
  // ============================
  // 3️⃣ Check Answers
  // ============================
  const checkAnswers = () => {
    if (showAnswer || locked) return;

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
    setLocked(true);
  };

  return (
    <div className="matching-wrapper" style={{ padding: "30px" }}>
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span className="ex-A">B</span>Read and match.
        </h5>

        <div key={resetKey} className="container-unit1-p8-exb w-full" ref={containerRef}>
          {/* Row 1 */}
          <div className="matching-row">
            <div className="word-with-dot">
              <span className="span-num">1</span>
              <div style={{ position: "relative" }}>
                {/* الكلمة تشغّل كليك على الدوت */}
                <span
                  className={`word-text ${
                    selectedWord === "Hello! I’m John." ? "selected-item" : ""
                  } ${locked || showAnswer ? "disabled-word" : ""}`}
                  onClick={() => document.getElementById("dot-hello").click()}
                  style={{ cursor: "pointer", width: "190px" }}
                >
                  Hello! I’m John.
                </span>{" "}
                {wrongWords.includes("Hello! I’m John.") && (
                  <span className="error-mark">✕</span>
                )}
              </div>
              <div className="dot-wrapper">
                <div
                  id="dot-hello"
                  className="dot start-dot"
                  data-letter="Hello! I’m John."
                  onClick={handleStartDotClick}
                ></div>
              </div>
            </div>

            <div className="img-with-dot">
              <div className="dot-wrapper">
                <div
                  id="img2-dot"
                  className="dot end-dot"
                  data-image="img2"
                  onClick={handleEndDotClick}
                ></div>
              </div>

              {/* الصورة تشغّل كليك على الدوت */}
              <img
                src={img2}
                className={`matched-img ${
                  selectedImage === "img2" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("img2-dot").click()}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="matching-row">
            <div className="word-with-dot">
              <span className="span-num">2</span>
              <div style={{ position: "relative" }}>
                <span
                  className={`word-text ${
                    selectedWord === "Goodbye!" ? "selected-item" : ""
                  } ${locked || showAnswer ? "disabled-word" : ""}`}
                  onClick={() => document.getElementById("dot-goodbye").click()}
                  style={{ cursor: "pointer", width: "190px" }}
                >
                  Goodbye!
                </span>{" "}
                {wrongWords.includes("Goodbye!") && (
                  <span className="error-mark">✕</span>
                )}
              </div>
              <div className="dot-wrapper">
                <div
                  id="dot-goodbye"
                  className="dot start-dot"
                  data-letter="Goodbye!"
                  onClick={handleStartDotClick}
                ></div>
              </div>
            </div>

            <div className="img-with-dot">
              <div className="dot-wrapper">
                <div
                  id="img1-dot"
                  className="dot end-dot"
                  data-image="img1"
                  onClick={handleEndDotClick}
                ></div>
              </div>

              <img
                src={img1}
                className={`matched-img ${
                  selectedImage === "img1" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("img1-dot").click()}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          {/* SVG lines */}
          <svg className="lines-layer">
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
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
            setWrongWords([]);
            setFirstDot(null);
            setShowAnswer(false);
            setLocked(false);
            setSelectedWord(null);
            setSelectedImage(null);
            setResetKey((k) => k + 1);
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>

        <button
          onClick={() => {
            const correctLines = [
              {
                word: "Hello! I’m John.",
                image: "img1",
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
              },
              { word: "Goodbye!", image: "img2", x1: 0, y1: 0, x2: 0, y2: 0 },
            ];

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

            const finalLines = correctLines.map((line) => ({
              ...line,
              x1: getDotPosition(`[data-letter="${line.word}"]`).x,
              y1: getDotPosition(`[data-letter="${line.word}"]`).y,
              x2: getDotPosition(`[data-image="${line.image}"]`).x,
              y2: getDotPosition(`[data-image="${line.image}"]`).y,
            }));

            setLines(finalLines);
            setWrongWords([]);
            setSelectedWord(null);
            setSelectedImage(null);
            setShowAnswer(true);
            setLocked(false);
            setResetKey((k) => k + 1);
          }}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
}
