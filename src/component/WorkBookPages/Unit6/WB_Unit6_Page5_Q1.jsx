import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit6_Page5_Q1.css";
import pencilCursor from "../../../assets/unit1/imgs/pen_96740.png";
import eraserCursor from "../../../assets/unit1/imgs/gui_eraser_icon_157160.png";

const WB_Unit6_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [checked, setChecked] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#800080"); // purple
  const canvasRefs = useRef([]);
  const [tool, setTool] = useState("pen"); // pen | eraser

  /* ================= CANVAS SETUP ================= */

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e, index) => {
    e.preventDefault();
    const canvas = canvasRefs.current[index];
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);

    ctx.isDrawing = true;
    ctx.lineCap = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20; // حجم الممحاة
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e, index) => {
    e.preventDefault();
    const canvas = canvasRefs.current[index];
    const ctx = canvas.getContext("2d");
    if (!ctx.isDrawing) return;

    const { x, y } = getPos(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (index) => {
    const ctx = canvasRefs.current[index].getContext("2d");
    ctx.isDrawing = false;
    ctx.closePath();
  };

  const resetCanvas = () => {
    canvasRefs.current.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  /* ================= CHECK ================= */

  const reset = () => {
    setAnswers(["", "", ""]);
    setChecked(false);
    resetCanvas();
  };

  /* ================= JSX ================= */

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
          gap: "30px",
        }}
      >
        <h4 className="header-title-page8">
          <span className="ex-A">I</span>What can you do? Type and draw.
        </h4>
        <div className="unit4-q2-p6-tools w-full">
          <button
            onClick={() => setTool("pen")}
            className={`unit4-q2-p6-tool-btn ${tool === "pen" ? "active-tool" : ""}`}
          >
            ✏️ Pen
          </button>

          <button
            onClick={() => setTool("eraser")}
            className={`unit4-q2-p6-tool-btn ${tool === "eraser" ? "active-tool" : ""}`}
          >
            🧽 Eraser
          </button>

          <div
            className={`unit4-q2-p6-tool-btn`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <label>🎨 Color:</label>
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                cursor: "pointer",
                background: "transparent",
              }}
            />
          </div>
        </div>
        <div className="exercise-container-wb-unit6-p5-q1 w-full">
          {[0, 1, 2].map((i) => (
            <div key={i} className="row-container-wb-unit6-p5-q1">
              {/* LEFT */}
              <div className="sentence-area-wb-unit6-p5-q1">
                <span className="number-wb-unit6-p5-q1">{i + 1}</span>
                <span className="text">I can</span>
                <input
                  type="text"
                  value={answers[i]}
                  disabled={checked}
                  onChange={(e) => {
                    const updated = [...answers];
                    updated[i] = e.target.value;
                    setAnswers(updated);
                  }}
                />
              </div>

              {/* RIGHT */}
              <canvas
                ref={(el) => (canvasRefs.current[i] = el)}
                className="draw-box-wb-unit6-p5-q1"
                width={270}
                height={120}
                style={{
                  cursor:
                    tool === "eraser"
                      ? `url(${eraserCursor}) 12 12, auto`
                      : `url(${pencilCursor}) 4 28, auto`,
                }}
                onMouseDown={(e) => startDrawing(e, i)}
                onMouseMove={(e) => draw(e, i)}
                onMouseUp={() => stopDrawing(i)}
                onMouseLeave={() => stopDrawing(i)}
                onTouchStart={(e) => startDrawing(e, i)}
                onTouchMove={(e) => draw(e, i)}
                onTouchEnd={() => stopDrawing(i)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        {/* <button className="check-button2" onClick={checkAnswer}>
          Check Answer ✓
        </button> */}
      </div>
    </div>
  );
};

export default WB_Unit6_Page5_Q1;
