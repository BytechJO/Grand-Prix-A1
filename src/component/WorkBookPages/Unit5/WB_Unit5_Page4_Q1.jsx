import React, { useRef, useEffect, useState } from "react";
import "./WB_Unit5_Page4_Q1.css";
import pencilCursor from "../../../assets/unit1/imgs/pen_96740.png";
import eraserCursor from "../../../assets/unit1/imgs/gui_eraser_icon_157160.png";

const WB_Unit5_Page4_Q1 = () => {
  const questions = [
    { id: 1, text: "This is my book." },
    { id: 2, text: "This is my pen." },
    { id: 3, text: "This is my ruler." },
    { id: 4, text: "This is my eraser." },
  ];
  const [tool, setTool] = useState("pen"); // pen | eraser

  // نخزن Ref لكل Canvas
  const canvasRefs = useRef({});

  // دوال الرسم
  const startDrawing = (e, id) => {
    const canvas = canvasRefs.current[id];
    const ctx = canvas.getContext("2d");

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

    const rect = canvas.getBoundingClientRect();
    ctx.lastX = (e.clientX || e.touches[0].clientX) - rect.left;
    ctx.lastY = (e.clientY || e.touches[0].clientY) - rect.top;
  };

  const draw = (e, id) => {
    const canvas = canvasRefs.current[id];
    const ctx = canvas.getContext("2d");
    if (!ctx.isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(ctx.lastX, ctx.lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.lastX = x;
    ctx.lastY = y;
  };

  const stopDrawing = (id) => {
    const canvas = canvasRefs.current[id];
    const ctx = canvas.getContext("2d");
    ctx.isDrawing = false;
  };

  // Reset Canvas
  const resetCanvas = () => {
    Object.values(canvasRefs.current).forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  return (
    <div
      className="unit4-q2-p6-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{}}>
        <h5 className="header-title-page8">
          <span className="ex-A">G</span>Read and draw.
        </h5>
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
        <div className="wb-unit5-p4-q1-table w-full">
          {questions.map((q) => (
            <div key={q.id} className="wb-unit5-p4-q1-row ">
              <div className="wb-unit5-p4-q1-text">
                <span style={{ color: "darkblue", fontWeight: "700" }}>
                  {q.id}
                </span>{" "}
                {q.text}
              </div>

              {/* Canvas Area */}
              <canvas
                ref={(el) => (canvasRefs.current[q.id] = el)}
                width={270}
                height={150}
                className="wb-unit5-p4-q1-canvas"
                style={{
                  cursor:
                    tool === "eraser"
                      ? `url(${eraserCursor}) 12 12, auto`
                      : `url(${pencilCursor}) 4 28, auto`,
                }}
                onMouseDown={(e) => startDrawing(e, q.id)}
                onMouseMove={(e) => draw(e, q.id)}
                onMouseUp={() => stopDrawing(q.id)}
                onMouseLeave={() => stopDrawing(q.id)}
                onTouchStart={(e) => startDrawing(e, q.id)}
                onTouchMove={(e) => draw(e, q.id)}
                onTouchEnd={() => stopDrawing(q.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={resetCanvas} className="try-again-button">
          Clear Drawings ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit5_Page4_Q1;
