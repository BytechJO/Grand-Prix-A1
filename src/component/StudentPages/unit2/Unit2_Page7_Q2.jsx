import React, { useState, useRef } from "react";
import img1 from "../../../assets/img_unit2/imgs/morning.jpg";
import img2 from "../../../assets/img_unit2/imgs/hey.jpg";
import img3 from "../../../assets/img_unit2/imgs/bey.jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit2_Page7_Q2.css";

const Unit2_Page7_Q2 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const [firstDot, setFirstDot] = useState(null);
  const [wrongImages, setWrongImages] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const correctMatches = [
    { word: "Hello! I'm Hansel.", image: "img2" },
    { word: "Good morning!", image: "img1" },
    { word: "Goodbye!", image: "img3" },
  ];

  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return;

    const rect = containerRef.current.getBoundingClientRect();
    const image = e.target.dataset.image || null;

    const alreadyUsed = lines.some((line) => line.image === image);
    if (alreadyUsed) return;

    setSelectedImage(image);

    setFirstDot({
      image,
      x: e.target.getBoundingClientRect().left - rect.left + 7,
      y: e.target.getBoundingClientRect().top - rect.top + 7,
    });
  };
  const handleEndDotClick = (e) => {
    if (showAnswer || locked) return;
    if (!firstDot) return;

    const rect = containerRef.current.getBoundingClientRect();
    const endWord = e.target.dataset.word || null;

    const newLine = {
      x1: firstDot.x,
      y1: firstDot.y,
      x2: e.target.getBoundingClientRect().left - rect.left + 7,
      y2: e.target.getBoundingClientRect().top - rect.top + 7,
      word: endWord,
      image: firstDot.image,
    };

    setLines((prev) => [...prev, newLine]);

    setSelectedWord(endWord);

    setTimeout(() => {
      setSelectedImage(null);
      setSelectedWord(null);
    }, 300);

    setFirstDot(null);
  };

  const checkAnswers2 = () => {
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
      else wrong.push(line.image);
    });
    setWrongImages(wrong);
    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>
    `;
    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
    setLocked(true);
  };

  const handleShowAnswer = () => {
    const rect = containerRef.current.getBoundingClientRect();
    const getDotPosition = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - rect.left + 7, y: r.top - rect.top + 7 };
    };
    const finalLines = correctMatches.map((line) => ({
      ...line,
      x1: getDotPosition(`[data-image="${line.image}"]`).x,
      y1: getDotPosition(`[data-image="${line.image}"]`).y,
      x2: getDotPosition(`[data-word="${line.word}"]`).x,
      y2: getDotPosition(`[data-word="${line.word}"]`).y,
    }));
setLines(finalLines);
setWrongImages([]);
setSelectedImage(null);
setSelectedWord(null);
setShowAnswer(true);
setLocked(true);
  };

const handleReset = () => {
  setLines([]);
  setWrongImages([]);
  setFirstDot(null);
  setShowAnswer(false);
  setLocked(false);
  setSelectedImage(null);
  setSelectedWord(null);
};
  const images = [
    { id: "img1", src: img1 },
    { id: "img2", src: img2 },
    { id: "img3", src: img3 },
  ];

  const wordItems = [
    { id: "dot-hello", word: "Hello! I'm Hansel.", num: 1 },
    { id: "dot-good", word: "Good morning!", num: 2 },
    { id: "dot-goodbye", word: "Goodbye!", num: 3 },
  ];

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
      <div className="div-forall" style={{ gap: "40px" }}>
        <h5 className="header-title-page8">
          <span className="mr-2">B</span> Read, look, and match.
        </h5>

        <div className="match-wrapper2" ref={containerRef}>
          {/* ── صف الصور ── */}
          <div className="match-images-row2">
            {images.map((item) => (
              <div key={item.id} className="img-box2">
                {/* علامة الخطأ */}
                {wrongImages.includes(item.id) && (
                  <span className="error-mark-img">✕</span>
                )}

                {/* الصورة */}
                <img
                  src={item.src}
                  alt=""
                  className={`clickable-img-unit2-p7-q2 ${
                    selectedImage === item.id ? "selected-item" : ""
                  } ${locked || showAnswer ? "disabled-hover" : ""}`}
                  onClick={() =>
                    document.getElementById(`${item.id}-dot`).click()
                  }
                  style={{ cursor: "pointer" }}
                />

                {/* النقطة — تحت الصورة مباشرة، في المنتصف */}
                <div
                  className="dot22-unit2-q7 start-dot22-unit2-q7"
                  id={`${item.id}-dot`}
                  data-image={item.id}
                  onClick={handleStartDotClick}
                />
              </div>
            ))}
          </div>

          {/* ── صف الجمل ── */}
          <div className="match-words-row2">
            {wordItems.map((item) => (
              <div key={item.id} className="word-box2-unit2-p7-q2">
                {/* النقطة — فوق الجملة مباشرة، في المنتصف */}
                <div
                  className="dot22-unit2-q7 end-dot22-unit2-q7"
                  id={item.id}
                  data-word={item.word}
                  onClick={handleEndDotClick}
                />

                {/* الجملة */}
                <h5
                  className={`clickable-word-unit2-p7-q2 ${
  selectedWord === item.word ? "selected-item" : ""
} ${locked || showAnswer ? "disabled-hover" : ""}`}
                  onClick={() => document.getElementById(item.id).click()}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                >
                  <span style={{ color: "darkblue", fontWeight: "700" }}>
                    {item.num}{" "}
                  </span>
                  {item.word}
                </h5>
              </div>
            ))}
          </div>

          {/* ── الخطوط ── */}
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

      {/* ── الأزرار ── */}
      <div className="action-buttons-container">
        <button onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        <button
          onClick={handleShowAnswer}
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

export default Unit2_Page7_Q2;
