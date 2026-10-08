import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit4_Page5_Q1.css";

/* ================= DATA ================= */

const shapes = [
  { key: "square", label: "square" },
  { key: "triangle", label: "triangle" },
  { key: "circle", label: "circle" },
  { key: "rectangle", label: "rectangle" },
];

const rows = [
  { id: 1, text: "It’s a circle.", answer: "circle" },
  { id: 2, text: "It’s a square.", answer: "square" },
  { id: 3, text: "It’s a triangle.", answer: "triangle" },
  { id: 4, text: "It’s a rectangle.", answer: "rectangle" },
];

const BASIC_COLORS = [
  "#ff0000", // red
  "#0000ff", // blue
  "#ffff00", // yellow
  "#00aa00", // green
  "#ff8c08ff", // black
];

/* ================= SVG SHAPES ================= */
const ShapeSVG = ({ type, color, onDoubleClick }) => {
  const size = 100; // 👈 كبرنا الحجم

  switch (type) {
    case "square":
      return (
        <svg
          width={size}
          height={size}
          onDoubleClick={onDoubleClick}
          onTouchEnd={onDoubleClick}
          className="shape-svg"
        >
          <rect
            x="10"
            y="10"
            width="70"
            height="70"
            fill={color}
            stroke="gray"
          />
        </svg>
      );

    case "triangle":
      return (
        <svg
          width={size}
          height={size}
          onDoubleClick={onDoubleClick}
          onTouchEnd={onDoubleClick}
          className="shape-svg"
        >
          <polygon points="45,10 80,80 10,80" fill={color} stroke="gray" />
        </svg>
      );

    case "circle":
      return (
        <svg
          width={size}
          height={size}
          onDoubleClick={onDoubleClick}
          onTouchEnd={onDoubleClick}
          className="shape-svg"
        >
          <circle cx="45" cy="45" r="35" fill={color} stroke="gray" />
        </svg>
      );

    case "rectangle":
      return (
        <svg
          width={size}
          height={size}
          onDoubleClick={onDoubleClick}
          onTouchEnd={onDoubleClick}
          className="shape-svg"
        >
          <rect
            x="10"
            y="30"
            width="80"
            height="50"
            fill={color}
            stroke="gray"
          />
        </svg>
      );

    default:
      return null;
  }
};

/* ================= COMPONENT ================= */

const WB_Unit4_Page5_Q1 = () => {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);

  const [colors, setColors] = useState({
    square: "#ffffff",
    triangle: "#ffffff",
    circle: "#ffffff",
    rectangle: "#ffffff",
  });

  const [activeShape, setActiveShape] = useState(null);
  const [showPalette, setShowPalette] = useState(false);

  /* ================= COLORING ================= */

  const openPalette = (shape) => {
    if (locked) return;
    setActiveShape(shape);
    setShowPalette(true);
  };

  const selectColor = (color) => {
    setColors({ ...colors, [activeShape]: color });
    setShowPalette(false);
  };

  /* ================= ANSWERS ================= */

  const handleSelect = (rowId, shapeKey) => {
    if (locked) return;
    setAnswers({ ...answers, [rowId]: shapeKey });
    setChecked(false);
  };

  const checkAnswers = () => {
    if (locked || checked) return;
    if (Object.keys(answers).length < rows.length) {
      ValidationAlert.info("Please choose an answer for each sentence.");
      return;
    }

    let score = 0;
    rows.forEach((row) => {
      if (answers[row.id] === row.answer) score++;
    });

    setChecked(true);
    setLocked(true);

    let color =
      score === rows.length ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${rows.length}
        </span>
      </div>
    `;

    if (score === rows.length) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswer = () => {
    const correct = {};
    rows.forEach((r) => (correct[r.id] = r.answer));
    setAnswers(correct);
    setChecked(true);
    setLocked(true);
    setColors({
      square: "red",
      triangle: "red",
      circle: "red",
      rectangle: "red",
    });
  };

  const reset = () => {
    setAnswers({});
    setChecked(false);
    setLocked(false);
    setShowPalette(false);
    setColors({
      square: "#ffffff",
      triangle: "#ffffff",
      circle: "#ffffff",
      rectangle: "#ffffff",
    });
  };

  /* ================= RENDER ================= */

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
      <div className="div-forall" style={{}}>
        <div className="w-full">
          <h4 className="header-title-page8">
            <span className="ex-A">I</span> Tap or click the correct boxes and
            color the shapes.
          </h4>

          <span style={{ fontSize: "14px", color: "gray" }}>
            Hint: Double Click to Color Word
          </span>
        </div>
        <div style={{ width: "100%", position: "relative" }}>
          <table className="shapes-table-wrapper-wb-unit4-p5-q1 w-full">
            <thead>
              <tr>
                <th></th>
                {shapes.map((s) => (
                  <th key={s.key}>
                    <ShapeSVG
                      type={s.key}
                      color={colors[s.key]}
                      onDoubleClick={() => openPalette(s.key)}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="sentence-cell">{row.text}</td>

                  {shapes.map((s) => {
                    const selected = answers[row.id] === s.key;
                    const correct = checked && selected && s.key === row.answer;
                    const wrong = checked && selected && s.key !== row.answer;

                    return (
                      <td
                        key={s.key}
                        className={`cell-wrapper-review4-p1-q3 ${
                          selected ? "selected" : ""
                        }`}
                        onClick={() => handleSelect(row.id, s.key)}
                      >
                        {selected && (
                          <span className="correct-mark-wb-unit4-p5-q1">✓</span>
                        )}
                        {wrong && <span className="wrong-badge">✕</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {showPalette && (
            <div className="color-palette-wb-u1-p7-q1">
              {BASIC_COLORS.map((c) => (
                <div
                  key={c}
                  className="color-circle"
                  style={{ backgroundColor: c }}
                  onClick={() => selectColor(c)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswer} className="show-answer-btn swal-continue">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit4_Page5_Q1;
