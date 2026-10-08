import React, { useRef, useState } from "react";
import img1 from "../../../assets/unit10/imgs/U10P90EXEA-01.svg";
import img2 from "../../../assets/unit10/imgs/U10P90EXEA-02.svg";
import img3 from "../../../assets/unit10/imgs/U10P90EXEA-03.svg";
import img4 from "../../../assets/unit10/imgs/U10P90EXEA-04.svg";

import "./Review10_Page1_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";

export default function Review10_Page1_Q1() {
  // ============================
  // 🔹 CORRECT ANSWERS (المصدر الوحيد)
  // ============================
  const correctMatches = [
    { word: "What do you want?", word2: "I want an apple.", image: "img4" },
    { word: "What do you want?", word2: "I want ice cream.", image: "img1" },
    { word: "What do you want?", word2: "I want chicken.", image: "img2" },
    { word: "What do you want?.", word2: "I want milk", image: "img3" },
  ];

  const imagesMap = [img1, img2, img3, img4];

  // ============================
  // 🔹 STATES
  // ============================
  const [lines, setLines] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [letters, setLetters] = useState({});
  const [wrongLetters, setWrongLetters] = useState([]);
  const [wrongConnections, setWrongConnections] = useState([]);

  const containerRef = useRef(null);

  // ============================
  // 1️⃣ Start dot
  // ============================
  const handleStartDotClick = (e) => {
    if (locked || showAnswer) return;

    const word = e.target.dataset.word;
    if (lines.some((l) => l.word === word)) return;

    const rect = containerRef.current.getBoundingClientRect();
    const r = e.target.getBoundingClientRect();

    setFirstDot({
      word,
      x: r.left - rect.left + 8,
      y: r.top - rect.top + 8,
    });
  };

  // ============================
  // 2️⃣ End dot
  // ============================
  const handleEndDotClick = (e) => {
    if (!firstDot || locked || showAnswer) return;

    const rect = containerRef.current.getBoundingClientRect();
    const r = e.target.getBoundingClientRect();

    setLines((prev) => [
      ...prev,
      {
        word: firstDot.word,
        image: e.target.dataset.image,
        x1: firstDot.x,
        y1: firstDot.y,
        x2: r.left - rect.left + 8,
        y2: r.top - rect.top + 8,
      },
    ]);

    setFirstDot(null);
  };

  // ============================
  // 3️⃣ Check Answers
  // ============================
  const checkAnswers = () => {
    if (locked) return;
    // =========================
    // 2️⃣ فحص توصيل كل كلمة
    // =========================
    for (const item of correctMatches) {
      const hasLine = lines.some((l) => l.word === item.word + item.word2);
      if (!hasLine) {
        ValidationAlert.info("Please connect all the words to pictures.");
        return;
      }
    }

    // =========================
    // 3️⃣ فحص توصيل كل صورة (ما في صورة مكررة)
    // =========================
    const usedImages = lines.map((l) => l.image);
    const uniqueImages = new Set(usedImages);

    if (uniqueImages.size < correctMatches.length) {
      ValidationAlert.info("Please connect each picture to only one word.");
      return;
    }

    // =========================
    // 4️⃣ التصحيح (8 نقاط)
    // =========================
    let score = 0;
    let wrongL = [];
    let wrongC = [];

    correctMatches.forEach((item) => {
      const line = lines.find((l) => l.word === item.word + item.word2);

      const imageCorrect = line && line.image === item.image;

      if (imageCorrect) score += 1;

      if (!imageCorrect) wrongC.push(item.word + item.word2);
    });

    // setWrongLetters(wrongL);
    setWrongConnections(wrongC);
    setLocked(true);

    const totalScore = correctMatches.length;

    const color =
      score === totalScore ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold">
        Score: ${score} / ${totalScore}
      </span>
    </div>
  `;

    score === totalScore
      ? ValidationAlert.success(msg)
      : score === 0
        ? ValidationAlert.error(msg)
        : ValidationAlert.warning(msg);
  };

  // ============================
  // 👁 Show Answer
  // ============================
  const showCorrectAnswer = () => {
    const rect = containerRef.current.getBoundingClientRect();

    const getPos = (id) => {
      const el = document.getElementById(id);
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - rect.left + 8,
        y: r.top - rect.top + 8,
      };
    };

    const finalLines = correctMatches.map((item, i) => ({
      word: item.word,
      image: item.image,
      x1: getPos(`${item.word}-${i + 1}-dot`).x,
      y1: getPos(`${item.word}-${i + 1}-dot`).y,
      x2: getPos(`${item.image}-dot`).x,
      y2: getPos(`${item.image}-dot`).y,
    }));

    setLines(finalLines);
    setWrongWords([]);

    setLocked(true);
    setShowAnswer(true);
    setResetKey((k) => k + 1);
  };

  // ============================
  // 🔄 Reset
  // ============================
  const reset = () => {
    setLines([]);
    setWrongWords([]);
    setFirstDot(null);
    // setLetters({});
    setLocked(false);
    setShowAnswer(false);
    setResetKey((k) => k + 1);
  };

  // ============================
  // 🔹 JSX
  // ============================
  const selectedWord = firstDot?.word;
  return (
    <div className="matching-wrapper" style={{ padding: "30px" }}>
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span className="mr-2">A</span> Look, read, and match.
        </h5>
        <div key={resetKey} className="container1 w-full" ref={containerRef}>
          {correctMatches.map((item, index) => {
            const isSelected =
  selectedWord === item.word + item.word2;
            return(
            <div className="matching-row-review10-p1-q1" key={item.word}>
              <div className="word-with-dot-review10-p1-q1">
                <span className="span-num">{index + 1}</span>
                <div style={{ position: "relative" }}>
                  <span
                    id="width-span-review10-p1-q1"
                   className={`clickable-word-unit2-p7-q2 ${
  locked || showAnswer ? "disabled-hover" : ""
} ${isSelected ? "selected-match-item" : ""}`}
                    onClick={() =>
                      document
                        .getElementById(`${item.word}-${index + 1}-dot`)
                        .click()
                    }
                  >
                    {item.word} <br /> {item.word2}
                  </span>
                  {!showAnswer &&
                    locked &&
                    wrongConnections.includes(item.word + item.word2) && (
                      <span className="error-mark-review10-p1-q1">✕</span>
                    )}
                </div>
                <div className="dot-wrapper">
                  <div
                    className="dot start-dot"
                    id={`${item.word}-${index + 1}-dot`}
                    data-word={item.word + item.word2}
                    onClick={handleStartDotClick}
                  />
                </div>
              </div>

              <div className="img-with-dot">
                <div className="dot-wrapper">
                  <div
                    className="dot end-dot"
                    id={`img${index + 1}-dot`}
                    data-image={`img${index + 1}`}
                    onClick={handleEndDotClick}
                  />
                </div>
                <img
                  src={imagesMap[index]}
                  className={`matched-img ${
                    locked || showAnswer ? "disabled-hover" : ""
                  }`}
                  style={{ height: "100px" }}
                  alt=""
                  onClick={() =>
                    document.getElementById(`img${index + 1}-dot`).click()
                  }
                />
              </div>
            </div>
          )})}

          <svg className="lines-layer">
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
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button
          onClick={showCorrectAnswer}
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
