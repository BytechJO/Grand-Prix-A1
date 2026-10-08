import React, { useState, useRef, useEffect } from "react";
import img1 from "../../../assets/unit6/imgs/U6P55EXEE-01.svg";
import img2 from "../../../assets/unit6/imgs/U6P55EXEE-02.svg";
import img3 from "../../../assets/unit6/imgs/U6P55EXEE-03.svg";
import img4 from "../../../assets/unit6/imgs/U6P55EXEE-04.svg";
import img5 from "../../../assets/unit6/imgs/U6P55EXEE-05.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review6_Page2_Q2.css";

const WORDS = ["sit", "pin", "wig", "big", "hill"];
const IMAGES = ["img1", "img2", "img3", "img4", "img5"];
const IMAGE_MAP = { img1, img2, img3, img4, img5 };

const correctMatches = [
  { word: "sit",  image: "img2" },
  { word: "pin",  image: "img4" },
  { word: "wig",  image: "img1" },
  { word: "big",  image: "img3" },
  { word: "hill", image: "img5" },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Returns center of an element relative to a container */
const getCenter = (el, container) => {
  const er = el.getBoundingClientRect();
  const cr = container.getBoundingClientRect();
  return {
    x: er.left - cr.left + er.width / 2,
    y: er.top  - cr.top  + er.height / 2,
  };
};

// ─── component ───────────────────────────────────────────────────────────────

const Review6_Page2_Q2 = () => {
  // lines: [{ word, image }]
  const [lines, setLines]           = useState([]);
  const [selectedWord, setSelectedWord] = useState(null); // word string | null
  const [wrongWords, setWrongWords] = useState([]);       // word strings that are wrong
  const [locked, setLocked]         = useState(false);
  const containerRef                = useRef(null);

  // refs for dots — keyed by "word-sit", "image-img1" etc.
  const dotRefs = useRef({});
  const registerDot = (key, el) => { if (el) dotRefs.current[key] = el; };

  // Derived lookup: which image is a word connected to, and vice versa
  const wordToImage = Object.fromEntries(lines.map((l) => [l.word, l.image]));
  const imageToWord = Object.fromEntries(lines.map((l) => [l.image, l.word]));

  // ── Clicking a word dot ────────────────────────────────────────────────────
  const handleWordClick = (word) => {
    if (locked) return;

    // If already connected → remove connection and select it for re-matching
    if (wordToImage[word]) {
      setLines((prev) => prev.filter((l) => l.word !== word));
      setSelectedWord(word);
      setWrongWords([]);
      return;
    }

    // Toggle selection
    setSelectedWord((prev) => (prev === word ? null : word));
  };

  // ── Clicking an image dot ─────────────────────────────────────────────────
  const handleImageClick = (image) => {
    if (locked) return;

    // If this image already has a connection → remove it
    if (imageToWord[image]) {
      setLines((prev) => prev.filter((l) => l.image !== image));
      // If a word was selected, now connect it to this freed image
      if (selectedWord) {
        setLines((prev) => [...prev, { word: selectedWord, image }]);
        setSelectedWord(null);
      }
      setWrongWords([]);
      return;
    }

    // No word selected yet — do nothing (must click word first)
    if (!selectedWord) return;

    // Connect
    setLines((prev) => [
      ...prev.filter((l) => l.word !== selectedWord), // safety: remove old word conn
      { word: selectedWord, image },
    ]);
    setSelectedWord(null);
    setWrongWords([]);
  };

  // ── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    if (lines.length < correctMatches.length) {
      ValidationAlert.info("Oops!", "Please connect all the pairs before checking.");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (p) => p.word === line.word && p.image === line.image
      );
      if (isCorrect) correctCount++;
      else wrong.push(line.word);
    });

    setWrongWords(wrong);
    setLocked(true);

    const total = correctMatches.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;margin-top:10px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ── Show Answer ───────────────────────────────────────────────────────────
  const showAnswers = () => {
    setLines(correctMatches.map((m) => ({ ...m })));
    setWrongWords([]);
    setSelectedWord(null);
    setLocked(true);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const reset = () => {
    setLines([]);
    setWrongWords([]);
    setSelectedWord(null);
    setLocked(false);
  };

  // ── Compute SVG line coords from dot refs ──────────────────────────────────
  const [svgLines, setSvgLines] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const computed = lines.map((l) => {
      const wordEl  = dotRefs.current[`word-${l.word}`];
      const imageEl = dotRefs.current[`image-${l.image}`];
      if (!wordEl || !imageEl) return null;

      const p1 = getCenter(wordEl,  containerRef.current);
      const p2 = getCenter(imageEl, containerRef.current);
      const isWrong = wrongWords.includes(l.word);
      return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, isWrong };
    }).filter(Boolean);

    setSvgLines(computed);
  }, [lines, wrongWords]);

  // Recompute on resize
  useEffect(() => {
    const handler = () => {
      setSvgLines((prev) => prev.map(() => null)); // trigger re-effect
      // force re-render by touching lines
      setLines((l) => [...l]);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

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
      <div className="div-forall" style={{ gap: "30px" }}>
        <h5 className="header-title-page8">
          <span className="mr-2">E</span> Look, read, and match the word to the correct picture.
        </h5>

        <div className="match-wrapper2" ref={containerRef} style={{ position: "relative" }}>

          {/* ── Words row ── */}
          <div className="match-words-row2">
            {WORDS.map((word, i) => {
              const isSelected  = selectedWord === word;
              const isConnected = !!wordToImage[word];
              const isWrong     = wrongWords.includes(word);

              return (
                <div
                  key={word}
                  className="word-box2"
                  style={{ display: "flex", gap: "10px", flexDirection: "row", alignItems: "flex-start" }}
                >
                  <span style={{ color: "darkblue", fontWeight: "700" }}>{i + 1} </span>
                  <div>
                    <div style={{ position: "relative" }}>
                      <h5
                        className={[
                          "h5-review6-p2-q2",
                          isSelected  ? "active-match-item"  : "",
                          isConnected ? "connected-match-item" : "",
                          locked      ? "disabled-hover"     : "",
                        ].join(" ")}
                        style={{ cursor: locked ? "default" : "pointer" }}
                        onClick={() => handleWordClick(word)}
                      >
                        {word}
                      </h5>
                      {isWrong && (
                        <span className="error-mark-img-unit6-p5-q2">✕</span>
                      )}
                    </div>

                    {/* dot for line drawing */}
                    <div
                      ref={(el) => registerDot(`word-${word}`, el)}
                      className={[
                        "dot22-unit6-q2 start-dot22-unit6-q2",
                        isSelected  ? "dot-active"    : "",
                        isConnected ? "dot-connected"  : "",
                      ].join(" ")}
                      onClick={() => handleWordClick(word)}
                      style={{ cursor: locked ? "default" : "pointer" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Images row ── */}
          <div className="match-images-row2">
            {IMAGES.map((imgKey) => {
              const connectedWord = imageToWord[imgKey];
              const isConnected   = !!connectedWord;
           
              return (
                <div key={imgKey} className="img-box2">
                  <img
                    src={IMAGE_MAP[imgKey]}
                    className={[
                      "clickable-img-unit2-p7-q2",
                      
                      isConnected ? "connected-match-item" : "",
                      locked      ? "disabled-hover"     : "",
                    ].join(" ")}
                    style={{ cursor: locked ? "default" : "pointer" }}
                    onClick={() => handleImageClick(imgKey)}
                    alt={imgKey}
                  />
                  <div
                    ref={(el) => registerDot(`image-${imgKey}`, el)}
                    className={[
                      "dot22-unit6-q2 end-dot22-unit6-q2",
                      isConnected ? "dot-connected" : "",
                    ].join(" ")}
                    onClick={() => handleImageClick(imgKey)}
                    style={{ cursor: locked ? "default" : "pointer" }}
                  />
                </div>
              );
            })}
          </div>

          {/* ── SVG lines ── */}
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
                x1={l.x1} y1={l.y1}
                x2={l.x2} y2={l.y2}
                stroke={"red" }
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>
      </div>

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

export default Review6_Page2_Q2;