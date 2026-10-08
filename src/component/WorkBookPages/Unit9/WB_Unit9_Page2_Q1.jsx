import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit9_Page2_Q1.css";
import pencilCursor from "../../../assets/unit1/imgs/pen_96740.png";
import eraserCursor from "../../../assets/unit1/imgs/gui_eraser_icon_157160.png";

const WB_Unit9_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [checked, setChecked] = useState(false);
  const [tool, setTool] = useState("pen");
  const canvasRefs = useRef([]);

  /* ================= CANVAS SETUP ================= */

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const isDrawing = useRef([]);

  const startDrawing = (e, index) => {
    e.preventDefault();
    const canvas = canvasRefs.current[index];
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);

    isDrawing.current[index] = true;

    ctx.isDrawing = true;
    ctx.lineCap = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20; // حجم الممحاة
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "purple";
      ctx.lineWidth = 3;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e, index) => {
    e.preventDefault();
    if (!isDrawing.current[index]) return;

    const canvas = canvasRefs.current[index];
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (index) => {
    isDrawing.current[index] = false;
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
          // gap: "30px",
       
        }}
      >
        <h4 className="header-title-page8">
          <span className="ex-A">C</span> Read and draw.
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
        </div>
        <div className="exercise-container-wb-unit6-p5-q1 w-full">
          {[
            "How many horses are there? There are two horses.",
            "How many cows are there? There are four cows.",
            "How many goats are there? There is one goat.",
          ].map((item, i) => (
            <div key={i} className="row-container-wb-unit6-p5-q1">
              {/* LEFT */}
              <div className="sentence-area-wb-unit9-p2-q1">
                <span className="number-wb-unit6-p5-q1">{i + 1}</span>
                <span className="text">{item}</span>
              </div>

              {/* RIGHT */}
              <canvas
                ref={(el) => (canvasRefs.current[i] = el)}
                className="draw-box-wb-unit9-p2-q1"
                height={120}
                width={300}
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
      </div>
    </div>
  );
};

export default WB_Unit9_Page2_Q1;
