import React, { useState, useRef, useEffect } from "react";
import img1 from "../../../assets/unit8/imgs/U8P70EXEB-01.svg";
import img2 from "../../../assets/unit8/imgs/U8P70EXEB-02.svg";
import img3 from "../../../assets/unit8/imgs/U8P70EXEB-03.svg";
import img4 from "../../../assets/unit8/imgs/U8P70EXEB-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page1_Q2.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

const IMAGES = [
  { id: "img1", src: img1, label: "1" },
  { id: "img2", src: img2, label: "2" },
  { id: "img3", src: img3, label: "3" },
  { id: "img4", src: img4, label: "4" },
];

const WORDS = ["I'm scared.", "I'm happy.", "I'm bored.", "I'm hungry."];

const CORRECT_MATCHES = [
  { image: "img1", word: "I'm hungry." },
  { image: "img2", word: "I'm scared." },
  { image: "img3", word: "I'm bored." },
  { image: "img4", word: "I'm happy." },
];

// ─── Helper ───────────────────────────────────────────────────────────────────
const getCenter = (el, container) => {
  const er = el.getBoundingClientRect();
  const cr = container.getBoundingClientRect();
  return {
    x: er.left - cr.left + er.width / 2,
    y: er.top - cr.top + er.height / 2,
  };
};

// ─── Component ────────────────────────────────────────────────────────────────
const Review7_Page1_Q2 = () => {
  const [lines, setLines] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [wrongImages, setWrongImages] = useState([]);
  const [locked, setLocked] = useState(false);
  const containerRef = useRef(null);
  const dotRefs = useRef({});

  const registerDot = (key, el) => {
    if (el) dotRefs.current[key] = el;
  };

  // Derived lookups
  const imageToWord = Object.fromEntries(lines.map((l) => [l.image, l.word]));
  const wordToImage = Object.fromEntries(lines.map((l) => [l.word, l.image]));

  // ── Click image (left = start) ────────────────────────────────────────────
  const handleImageClick = (imgId) => {
    if (locked) return;

    if (imageToWord[imgId]) {
      setLines((prev) => prev.filter((l) => l.image !== imgId));
      setSelectedImage(imgId);
      setWrongImages([]);
      return;
    }

    setSelectedImage((prev) => (prev === imgId ? null : imgId));
  };

  // ── Click word (right = end) ──────────────────────────────────────────────
  const handleWordClick = (word) => {
    if (locked) return;

    if (wordToImage[word]) {
      setLines((prev) => prev.filter((l) => l.word !== word));
      if (selectedImage) {
        setLines((prev) => [...prev, { image: selectedImage, word }]);
        setSelectedImage(null);
      }
      setWrongImages([]);
      return;
    }

    if (!selectedImage) return;

    setLines((prev) => [
      ...prev.filter((l) => l.image !== selectedImage),
      { image: selectedImage, word },
    ]);
    setSelectedImage(null);
    setWrongImages([]);
  };

  // ── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    if (lines.length < CORRECT_MATCHES.length) {
      ValidationAlert.info(
        "Oops!",
        "Please connect all the pairs before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrong = [];

    lines.forEach((line) => {
      const ok = CORRECT_MATCHES.some(
        (p) => p.image === line.image && p.word === line.word,
      );
      if (ok) correctCount++;
      else wrong.push(line.image);
    });

    setWrongImages(wrong);
    setLocked(true);

    const total = CORRECT_MATCHES.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;margin-top:10px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ── Show Answer ───────────────────────────────────────────────────────────
  const showAnswers = () => {
    setLines(CORRECT_MATCHES.map((m) => ({ ...m })));
    setWrongImages([]);
    setSelectedImage(null);
    setLocked(true);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const reset = () => {
    setLines([]);
    setWrongImages([]);
    setSelectedImage(null);
    setLocked(false);
  };

  // ── SVG lines ─────────────────────────────────────────────────────────────
  const [svgLines, setSvgLines] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const computed = lines
      .map((l) => {
        const imgEl = dotRefs.current[`img-${l.image}`];
        const wordEl = dotRefs.current[`word-${l.word}`];
        if (!imgEl || !wordEl) return null;
        const p1 = getCenter(imgEl, containerRef.current);
        const p2 = getCenter(wordEl, containerRef.current);
        return {
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          isWrong: wrongImages.includes(l.image),
        };
      })
      .filter(Boolean);
    setSvgLines(computed);
  }, [lines, wrongImages]);

  useEffect(() => {
    const handler = () => setLines((l) => [...l]);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
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
      <div className="div-forall" style={{ gap: "50px" }}>
        <h5 className="header-title-page8">
          <span className="mr-2">B</span> Look, read, and match.
        </h5>

        <div
          className="match-wrapper2"
          ref={containerRef}
          style={{ position: "relative" }}
        >
          {/* ── LEFT: Images ── */}
          <div className="match-images-row2">
            {IMAGES.map((item) => {
              const isSelected = selectedImage === item.id;
              const isConnected = !!imageToWord[item.id];
              const isWrong = wrongImages.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="img-box2"
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <span style={{ color: "darkblue", fontWeight: "700" }}>
                    {item.label}
                  </span>

                  <img
                    src={item.src}
                    alt={item.id}
                    className={[
                      "matched-img",
                      isSelected ? "selected-match-item" : "",
                      isConnected ? "connected-match-item" : "",
                      locked ? "disabled-hover" : "",
                    ].join(" ")}
                    style={{ cursor: locked ? "default" : "pointer" }}
                    onClick={() => handleImageClick(item.id)}
                  />

                  {isWrong && (
                    <span className="error-mark-img-unit7-p6-q2">✕</span>
                  )}

                  {/* dot — right side of image, faces words */}
                  <div
                    ref={(el) => registerDot(`img-${item.id}`, el)}
                    className={[
                      "dot22-unit7-p6-q2",
                      "start-dot22-unit7-p6-q2",
                      isSelected ? "dot-active" : "",
                      isConnected ? "dot-connected" : "",
                    ].join(" ")}
                    style={{ cursor: locked ? "default" : "pointer" }}
                    onClick={() => handleImageClick(item.id)}
                  />
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: Words ── */}
          <div className="match-words-row2">
            {WORDS.map((word) => {
              const isConnected = !!wordToImage[word];

              return (
                <div key={word} className="word-box2">
                  {/* dot — left side of word, faces images */}
                  <div
                    ref={(el) => registerDot(`word-${word}`, el)}
                    className={[
                      "dot22-unit7-p6-q2",
                      "end-dot22-unit7-p6-q2",
                      isConnected ? "dot-connected" : "",
                    ].join(" ")}
                    style={{ cursor: locked ? "default" : "pointer" }}
                    onClick={() => handleWordClick(word)}
                  />

                  <h5
                    className={[
                      "h5-unit6-p5-q2",

                      isConnected ? "connected-match-item" : "",
                      locked ? "disabled-hover" : "",
                    ].join(" ")}
                    style={{ cursor: locked ? "default" : "pointer" }}
                    onClick={() => handleWordClick(word)}
                  >
                    {word}
                  </h5>
                </div>
              );
            })}
          </div>

          {/* ── SVG Lines ── */}
          <svg
            className="lines-layer2"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {svgLines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke={"red"}
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* ── Buttons ── */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn swal-continue">
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review7_Page1_Q2;
