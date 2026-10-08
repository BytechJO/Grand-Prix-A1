import React, { useState, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import CatSvg from "../../../assets/U1 WB/U9/U9P55EXEK-01 1.svg";
import HorseSvg from "../../../assets/U1 WB/U9/U9P55EXEK-02 1.svg";
import DogSvg from "../../../assets/U1 WB/U9/U9P55EXEK-03.svg";

import "./WB_Unit9_Page5_Q2.css";

const WB_Unit9_Page5_Q2 = () => {
  const items = [
    {
      Svg: CatSvg,
      options: ["cat", "cow"],
      correct: "cat",
      position: "top-left",
    },
    {
      Svg: HorseSvg,
      options: ["horse", "chicken"],
      correct: "horse",
      position: "right",
    },
    {
      Svg: DogSvg,
      options: ["goat", "dog"],
      correct: "dog",
      position: "bottom-left",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [colors, setColors] = useState(items.map(() => "white"));
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wrongChoices, setWrongChoices] = useState([]);

  const paletteColors = ["brown", "rgb(255, 187, 0)", "blue", "red"];

  const [activePaletteIndex, setActivePaletteIndex] = useState(null);
  const [selectedColors, setSelectedColors] = useState(items.map(() => null));
  const [svgContent, setSvgContent] = useState({});
  useEffect(() => {
    const loadSvgs = async () => {
      const files = [CatSvg, HorseSvg, DogSvg];

      const contents = await Promise.all(
        files.map((file) =>
          fetch(file)
            .then((r) => r.text())
            .then((text) =>
              text
                .replaceAll('fill="none"', 'fill="currentColor"')
                .replaceAll(/stroke="[^"]*"/g, 'stroke="currentColor"'),
            ),
        ),
      );

      setSvgContent(contents);
    };

    loadSvgs();
  }, []);

  /* ================= COLOR ================= */

  const toggleColor = (index) => {
    if (locked) return;

    const newColors = [...colors];
    newColors[index] = newColors[index] === "white" ? "#FFD54F" : "white";

    setColors(newColors);
  };

  /* ================= CIRCLE ================= */

  const handleSelect = (value, index) => {
    if (locked || showResult) return;
    const newSel = [...selected];
    newSel[index] = value;
    setSelected(newSel);
    setShowResult(false);
  };

  /* ================= CHECK ================= */

  const checkAnswers = () => {
    if (locked || showResult) return;

    if (selected.some((s) => s === "")) {
      ValidationAlert.info("Please circle the correct word!");
      return;
    }

    let score = 0;
    let wrongs = [];

    items.forEach((item, i) => {
      if (selected[i] === item.correct) {
        score++;
      } else {
        wrongs.push(i); // ❌ هذا الاختيار غلط
      }
    });

    setWrongChoices(wrongs);
    setShowResult(true);

    const total = items.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size:20px;text-align:center;">
      <b style="color:${color}">Score: ${score} / ${total}</b>
    </div>
  `;

    if (score === total) {
      ValidationAlert.success(scoreMessage);
    } else if (score === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
  };

  /* ================= SHOW ANSWER ================= */

  const showAnswers = () => {
    setSelected(items.map((item) => item.correct));
    setColors(items.map(() => "#FFD54F"));
    setWrongChoices([]);
    setShowResult(false);
    setLocked(true);
  };

  /* ================= RESET ================= */

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setColors(items.map(() => "white"));
    setWrongChoices([]);
    setShowResult(false);
    setLocked(false);
    // 🔁 إعادة الصور للون الأسود
    setSelectedColors(items.map(() => null));
    setActivePaletteIndex(null);
  };

  /* ================= JSX ================= */

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={
          {
            // gap: "30px",
          }
        }
      >
        <div className="w-full">
        <h4 className="header-title-page8">
          <span className="ex-A">K</span>Tap the word for each picture and color
          them.
        </h4>
        <span style={{ fontSize: "14px", color: "gray" }}>
          Hint: Double Click to Color Word
        </span></div>
        <div className="wb-unit9-qk-layout">
          {items.map((item, i) => {
            const SvgComponent = item.Svg;

            return (
              <div key={i} className={`wb-unit9-qk-item ${item.position}`}>
                <div
                  className="wb-unit9-qk-svg-wrapper"
                  onClick={() => toggleColor(i)}
                >
                  {/* <SvgComponent
                    className="wb-unit9-qk-svg"
                    style={{ fill: colors[i] }}
                  /> */}
                  {svgContent[i] ? (
                    <div
                      className="svg-wrapper wb-svg-colorable"
                      style={{ color: selectedColors[i] || "#ffffffff" }}
                      onDoubleClick={() => setActivePaletteIndex(i)}
                      onTouchStart={() => setActivePaletteIndex(i)}
                      dangerouslySetInnerHTML={{ __html: svgContent[i] }}
                    />
                  ) : (
                    <div className="svg-placeholder">Loading...</div>
                  )}
                </div>
                {activePaletteIndex === i && (
                  <div className="color-palette-wb-unit4-p1-q2 ">
                    {paletteColors.map((color) => (
                      <button
                        key={color}
                        className="color-circle"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          const copy = [...selectedColors];
                          copy[i] = color;
                          setSelectedColors(copy);
                          setActivePaletteIndex(null); // سكّر الباليت
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="wb-unit9-qk-options">
                  {item.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`wb-unit9-qk-option ${
                        selected[i] === opt ? "active" : ""
                      }`}
                      onClick={() => handleSelect(opt, i)}
                      style={{ position: "relative" }}
                    >
                      {opt}

                      {showResult &&
                        wrongChoices.includes(i) &&
                        selected[i] === opt && (
                          <div className="wb-unit9-qk-wrong-mark">✕</div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
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

export default WB_Unit9_Page5_Q2;
