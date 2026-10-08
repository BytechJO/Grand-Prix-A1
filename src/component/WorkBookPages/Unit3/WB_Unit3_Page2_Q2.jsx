import React, { useRef, useState, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

export default function WB_Unit3_Page2_Q2() {
  // 🎨 ألوان الكلمات
  const colors = ["red", "blue", "green", "orange", "purple", "yellow"];
  const [selectedWordIndex, setSelectedWordIndex] = useState(null);
  const [wordColors, setWordColors] = useState([
    "transparent",
    "transparent",
    "transparent",
    "transparent",
  ]);

  const handleWordClick = (index) => {
    setSelectedWordIndex(index);
  };

  const applyColor = (color) => {
    const newColors = [...wordColors];
    newColors[selectedWordIndex] = color;
    setWordColors(newColors);
    setSelectedWordIndex(null);
  };

  return (
    <div
      style={{
        display: "flex",
        // marginTop: "30px",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
        
        }}
      >
        <div className="flex flex-col gap-2 w-full">
        <h4 className="header-title-page8">
          <span className="ex-A">D</span>Read and color.
        </h4>
        <span style={{ fontSize: "14px", color: "gray" }}>
          Hint: Double Click to Color Word
        </span></div>
        {selectedWordIndex !== null && (
          <div className="color-palette-wb-u1-p7-q1">
            {colors.map((c) => (
              <div
                key={c}
                className="color-circle"
                style={{ backgroundColor: c }}
                onClick={() => applyColor(c)}
              ></div>
            ))}
          </div>
        )}

        <div className="container3-wb-u1-p7-q1">
          <div className="word-section1-wb-u1-p7-q1">
            {["Listen.", "Make a line.", "Open your book.", "Quiet!"].map(
              (word, i) => (
                <div>
                  <h5
                    key={i}
                    className={
                      wordColors[0] === "transparent"
                        ? "word-outline H5"
                        : "word-colored H5"
                    }
                    style={{
                      color: wordColors[i],
                      cursor: "pointer",
                      position: "relative",
                      textAlign: "start",
                      width: "100%",
                    }}
                    onDoubleClick={() => handleWordClick(i)} // فتح الباليت
                    onTouchEnd={() => handleWordClick(i)}
                  >
                    {word}
                  </h5>{" "}
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="action-buttons-container">
        <button
          onClick={() => {
            setWordColors([
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ]);
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
      </div>
    </div>
  );
}
