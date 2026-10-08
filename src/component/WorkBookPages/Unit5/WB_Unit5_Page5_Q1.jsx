import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import find_img from "../../../assets/U1 WB/U5/U5P31EXEI-01.svg";
import highlightPen from "../../../assets/U1 WB/U5/Asset 21.svg";
import highlightBook from "../../../assets/U1 WB/U5/Asset 20.svg";
import highlightEraser from "../../../assets/U1 WB/U5/Asset 22.svg";
import highlightChair1 from "../../../assets/U1 WB/U5/Asset 17.svg";
import highlightChair2 from "../../../assets/U1 WB/U5/Asset 17.svg";
import highlightRuler from "../../../assets/U1 WB/U5/Asset 19.svg";

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
// area: click-detection box (x1,y1,x2,y2 as % of image)
// highlight: SVG position/size (x, y, w, h as % of image)
const items = [
  {
    key: "pen",
    label: "pen",
    src: highlightPen,
    area: { x1: 3.4395, y1: 51.9356, x2: 57.7432, y2: 56.1393 },
    highlight: { x: 26.4395, y: 31.9356, w: 6.2037, h: 45.5385 },
  },
  {
    key: "book",
    label: "book",
    src: highlightBook,
    area: { x1: 12.63, y1: 31.6881, x2: 29.6078, y2: 39.4039 },
    highlight: { x: 10.63, y: 31.6881, w: 28.9778, h: 7.7158 },
  },
  {
    key: "eraser",
    label: "eraser",
    src: highlightEraser,
    area: { x1: 58.1526, y1: 51.0863, x2: 62.3726, y2: 57.3063 },
    highlight: { x: 58.1526, y: 53.0863, w: 4.22, h: 4.22 },
  },
  {
    key: "chair1",
    label: "chair",
    src: highlightChair1,
    area: { x1: 27, y1: 35.55, x2: 43.2822, y2: 97.4718 },
    highlight: { x: 17, y: 35.55, w: 23.8, h: 87.4718 },
  },
  {
    key: "chair2",
    label: "chair",
    src: highlightChair2,
    area: { x1: 75, y1: 52.7031, x2: 85.8434, y2: 97.3487 },
    highlight: { x: 65.4, y: 32.7031, w: 24.4434, h: 88.3487 },
  },
  {
    key: "ruler",
    label: "ruler",
    src: highlightRuler,
    area: { x1: 68, y1: 43.3326, x2: 78.7649, y2: 54.5 },
    highlight: { x: 71, y: 46.3326, w: 6.518, h: 8.1674 },
  },
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */
const WB_Unit5_Page5_Q1 = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  // clicks[key] = { x, y } — where the student clicked (raw %)
  // We store clicks but DON'T evaluate until Check Answer
  const [clicks, setClicks] = useState({});

  // results[key] = "correct" | "wrong"  — set only after Check / Show Answer
  const [results, setResults] = useState({});

  const [locked, setLocked] = useState(false);

  /* ─── SELECT WORD ────────────────────────────────────────────────────────── */
  const handleWordClick = (key) => {
    if (locked) return;
    // Already clicked on image → allow re-selection to change click point
    setSelectedKey((prev) => (prev === key ? null : key));
  };

  /* ─── IMAGE CLICK ────────────────────────────────────────────────────────── */
  const handleImageClick = (e) => {
    if (!selectedKey || locked) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
       
        
    // Just save where they clicked — no evaluation yet
    setClicks((prev) => ({ ...prev, [selectedKey]: { x, y } }));
     console.log(x , y );
    setSelectedKey(null);
  };

  /* ─── CHECK ──────────────────────────────────────────────────────────────── */
  const handleCheck = () => {
    if (locked) return;

    if (Object.keys(clicks).length < items.length) {
      ValidationAlert.info("Pay attention!", "Please find all the objects first.");
      return;
    }

    // Evaluate all clicks now
    const newResults = {};
    items.forEach((item) => {
      const p = clicks[item.key];
      if (!p) { newResults[item.key] = "wrong"; return; }
      const { x1, y1, x2, y2 } = item.area;
      newResults[item.key] =
        p.x >= x1 && p.x <= x2 && p.y >= y1 && p.y <= y2 ? "correct" : "wrong";
    });

    setResults(newResults);
    setLocked(true);

    const correct = Object.values(newResults).filter((v) => v === "correct").length;
    const total = items.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const scoreMessage = `<div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span>
    </div>`;

    if (correct === total) ValidationAlert.success(scoreMessage);
    else if (correct === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  /* ─── SHOW ANSWER ────────────────────────────────────────────────────────── */
  const handleShowAnswer = () => {
    const allCorrect = {};
    items.forEach((item) => (allCorrect[item.key] = "correct"));
    setResults(allCorrect);
    setClicks({});
    setSelectedKey(null);
    setLocked(true);
  };

  /* ─── RESET ──────────────────────────────────────────────────────────────── */
  const handleStartAgain = () => {
    setSelectedKey(null);
    setClicks({});
    setResults({});
    setLocked(false);
  };

  /* ─── RENDER ─────────────────────────────────────────────────────────────── */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "20px" }}>
        <h5 className="header-title-page8">
          <span className="ex-A">I</span> Tap or click the objects in the classroom!
        </h5>

        {/* ── WORD BANK ── */}
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {items.map((item) => {
            const result = results[item.key];
            const isSelected = selectedKey === item.key;
            const hasClick = !!clicks[item.key];

            // Border color logic:
            // selected → blue | after check: correct → green, wrong → red
            // before check: clicked → dashed blue, not clicked → grey
            let borderStyle;
            if (result === "correct") borderStyle = "2px solid #28a745";
            else if (result === "wrong") borderStyle = "2px solid #dc3545";
            else if (isSelected) borderStyle = "2px solid #007bff";
            else if (hasClick) borderStyle = "2px dashed #007bff";
            else borderStyle = "1px solid #999";

            let bgColor;
            if (result === "correct") bgColor = "#d4edda";
            else if (result === "wrong") bgColor = "#f8d7da";
            else if (hasClick) bgColor = "#e8f0fe";
            else bgColor = "white";

            return (
              <div key={item.key} style={{ position: "relative", display: "inline-flex" }}>
                <button
                  onClick={() => handleWordClick(item.key)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "12px",
                    background: bgColor,
                    border: borderStyle,
                    cursor: locked ? "default" : "pointer",
                    fontWeight: isSelected ? "bold" : "normal",
                    transition: "all 0.2s",
                  }}
                >
                  {item.label}
                </button>

                {/* ✕ red circle badge — only after Check Answer */}
                {result === "wrong" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#dc3545",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "bold",
                      pointerEvents: "none",
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── IMAGE + HIGHLIGHTS ── */}
      <div
        style={{ position: "relative", marginTop: "20px", display: "inline-block" }}
        onClick={handleImageClick}
      >
        <img
          src={find_img}
          alt="classroom"
          style={{
            height: "50vh",
            width: "auto",
            cursor: selectedKey && !locked ? "crosshair" : "default",
            display: "block",
          }}
        />

        {/* Pending click dots — shown before Check Answer so student sees where they clicked */}
        {!locked &&
          Object.entries(clicks).map(([key, point]) => (
            <div
              key={key}
              style={{
                position: "absolute",
                top: `${point.y}%`,
                left: `${point.x}%`,
                width: "58px",
                height: "38px",
                borderRadius: "50%",
                background: "red",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                opacity: 0.7,
              }}
            />
          ))}

        {/* Green highlight SVGs — shown only for correct answers after Check / Show Answer */}
        {items.map((item) =>
          results[item.key] === "correct" ? (
            <img
              key={item.key}
              src={item.src}
              alt=""
              style={{
                position: "absolute",
                top: `${item.highlight.y}%`,
                left: `${item.highlight.x}%`,
                width: `${item.highlight.w}%`,
                height: `${item.highlight.h}%`,
                pointerEvents: "none",
                objectFit: "fill",
              }}
            />
          ) : null
        )}
      </div>

      {/* ── ACTION BUTTONS ── */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleStartAgain}>
          Start Again ↻
        </button>
        <button className="show-answer-btn swal-continue" onClick={handleShowAnswer}>
          Show Answer
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit5_Page5_Q1;