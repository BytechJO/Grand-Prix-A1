import React, { useState, useRef } from "react";
import img1 from "../../../assets/unit6/imgs/U6P50EXEA2-01.svg";
import img2 from "../../../assets/unit6/imgs/U6P50EXEA2-02.svg";
import img3 from "../../../assets/unit6/imgs/U6P50EXEA2-03.svg";
import img4 from "../../../assets/unit6/imgs/U6P50EXEA2-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit6_Page5_Q2.css";

const Unit6_Page5_Q2 = () => {
  const containerRef = useRef(null);

  const correctMatches = [
    { word: "hill", image: "img4" },
    { word: "pin", image: "img3" },
    { word: "mitt", image: "img1" },
    { word: "wig", image: "img2" },
  ];

  const images = [
    { key: "img1", src: img1, dotId: "img1-dot" },
    { key: "img2", src: img2, dotId: "img2-dot" },
    { key: "img3", src: img3, dotId: "img3-dot" },
    { key: "img4", src: img4, dotId: "img4-dot" },
  ];

  const words = [
    { word: "hill", num: 1, dotId: "hill-dot" },
    { word: "pin", num: 2, dotId: "pin-dot" },
    { word: "mitt", num: 3, dotId: "mitt-dot" },
    { word: "wig", num: 4, dotId: "wig-dot" },
  ];

  const [lines, setLines] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const [wrongImages, setWrongImages] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // ─── Dot position helper ───────────────────────────────────────────────────
  const getDotPos = (selector) => {
    const rect = containerRef.current.getBoundingClientRect();
    const el = document.querySelector(selector);
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return { x: r.left - rect.left + 8, y: r.top - rect.top + 8 };
  };

  // ─── Start dot (word side) ─────────────────────────────────────────────────
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return;
    const word = e.target.dataset.word;
    if (lines.some((l) => l.word === word)) return; // already connected

    const rect = containerRef.current.getBoundingClientRect();
    setFirstDot({
      word,
      x: e.target.getBoundingClientRect().left - rect.left + 8,
      y: e.target.getBoundingClientRect().top - rect.top + 8,
    });
  };

  // ─── End dot (image side) ─────────────────────────────────────────────────
  const handleEndDotClick = (e) => {
    if (showAnswer || locked || !firstDot) return;
    const rect = containerRef.current.getBoundingClientRect();
    const image = e.target.dataset.image;

    setLines((prev) => [
      ...prev,
      {
        x1: firstDot.x,
        y1: firstDot.y,
        x2: e.target.getBoundingClientRect().left - rect.left + 8,
        y2: e.target.getBoundingClientRect().top - rect.top + 8,
        word: firstDot.word,
        image,
      },
    ]);
    setFirstDot(null);
  };

  // ─── Check ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer || locked) return;
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
      if (isCorrect) correctCount++;
      else wrong.push(line.word);
    });

    setWrongImages(wrong);
    setLocked(true);

    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    ValidationAlert[
      correctCount === total
        ? "success"
        : correctCount === 0
          ? "error"
          : "warning"
    ](`
      <div style="font-size:20px; margin-top:10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `);
  };

  // ─── Show Answer ──────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    const finalLines = correctMatches.map((pair) => ({
      ...pair,
      x1: getDotPos(`[data-word="${pair.word}"]`).x,
      y1: getDotPos(`[data-word="${pair.word}"]`).y,
      x2: getDotPos(`[data-image="${pair.image}"]`).x,
      y2: getDotPos(`[data-image="${pair.image}"]`).y,
    }));
    setLines(finalLines);
    setWrongImages([]);
    setShowAnswer(true);
    setLocked(true);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────
  const reset = () => {
    setLines([]);
    setWrongImages([]);
    setFirstDot(null);
    setShowAnswer(false);
    setLocked(false);
  };

  const isDisabled = locked || showAnswer;

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
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          // width: "60%",
          justifyContent: "flex-start",
        }}
      >
        <h5 className="header-title-page8">
          <span className="mr-2" style={{ color: "purple" }}>
            {" "}
            2{" "}
          </span>{" "}
          Read, look, and match.
        </h5>

        {/* ── Matching area ─────────────────────────────────────────────── */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "150px",
            width: "100%",
          }}
        >
          {/* ── Top row: Words ──────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "flex-end",
              paddingBottom: "8px",
            }}
          >
            {words.map(({ word, num, dotId }) => (
              <div
                key={word}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  gap: "6px",

                  cursor: isDisabled ? "default" : "pointer",
                }}
                onClick={() =>
                  !isDisabled && document.getElementById(dotId).click()
                }
              >
                <span
                  style={{
                    color: "darkblue",
                    fontWeight: "700",
                    fontSize: "13px",
                  }}
                >
                  {num}
                </span>
                <div style={{ position: "relative" }}>
                  <h5
                    className={`h5-unit6-p5-q2-1 ${isDisabled ? "disabled-hover" : ""} ${firstDot?.word === word ? "selected-item" : ""}`}
                    style={{ margin: 0 }}
                  >
                    {word}
                  </h5>
                  {wrongImages.includes(word) && (
                    <span className="error-mark-img-unit6-p5-q2">✕</span>
                  )}
                </div>
                {/* Start dot — bottom of word */}
                <div
                  className="dot22-unit6-q2 start-dot22-unit6-q2"
                  data-word={word}
                  id={dotId}
                  onClick={handleStartDotClick}
                  style={{
                    outline:
                      firstDot?.word === word ? "2px solid orange" : "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* ── SVG Lines ───────────────────────────────────────────────── */}
          <svg
            className="lines-layer2"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {lines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke={wrongImages.includes(l.word) ? "#e53935" : "red"}
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* ── Bottom row: Images ──────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "flex-start",
              paddingTop: "8px",
            }}
          >
            {images.map(({ key, src, dotId }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  gap: "6px",
                  cursor: isDisabled ? "default" : "pointer",
                }}
                onClick={() =>
                  !isDisabled && document.getElementById(dotId).click()
                }
              >
                {/* End dot — top of image */}
                <div
                  className="dot22-unit6-q2 end-dot22-unit6-q2"
                  data-image={key}
                  id={dotId}
                  onClick={handleEndDotClick}
                />
                <img
                  src={src}
                  alt=""
                  className={`matched-img2 ${isDisabled ? "disabled-hover" : ""}`}
                  style={{ height: "100px", width: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Buttons ──────────────────────────────────────────────────────────── */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>
        <button
          onClick={handleShowAnswer}
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
};

export default Unit6_Page5_Q2;
