import React, { useState, useRef, useEffect } from "react";
import pencilCursor from "../../../assets/unit1/imgs/pen_96740.png";
import eraserCursor from "../../../assets/unit1/imgs/gui_eraser_icon_157160.png";
import img1 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream13.jpg";
import img2 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream14.jpg";
import img3 from "../../../assets/unit10/imgs/Right 1 Unit 10 We Want Ice Cream15.jpg";

const Writing_Page1_EX = () => {
  const questions = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRefs = useRef({});

  const [tool, setTool] = useState("pen"); // pen | eraser

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
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
    }

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    ctx.lastX = clientX - rect.left;
    ctx.lastY = clientY - rect.top;
  };

  const draw = (e, id) => {
    const canvas = canvasRefs.current[id];
    const ctx = canvas.getContext("2d");
    if (!ctx.isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

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

  const resetCanvas = () => {
    questions.forEach((q) => {
      const canvas = canvasRefs.current[q.id];
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // padding: "30px",
      }}
    >
      <div style={{ fontWeight: "bold" }}>
        Page {currentIndex + 1} / {questions.length}
      </div>
      <div className="unit4-q2-p6-tools">
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
      <canvas
        ref={(el) => (canvasRefs.current[currentQuestion.id] = el)}
        width={600}
        height={600}
        // className="unit9-p3-q2-canvas"
        style={{
          backgroundImage: `url(${currentQuestion.img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor:
            tool === "eraser"
              ? `url(${eraserCursor}) 12 12, auto`
              : `url(${pencilCursor}) 4 28, auto`,
        }}
        onMouseDown={(e) => startDrawing(e, currentQuestion.id)}
        onMouseMove={(e) => draw(e, currentQuestion.id)}
        onMouseUp={() => stopDrawing(currentQuestion.id)}
        onMouseLeave={() => stopDrawing(currentQuestion.id)}
        onTouchStart={(e) => startDrawing(e, currentQuestion.id)}
        onTouchMove={(e) => {
          e.preventDefault();
          draw(e, currentQuestion.id);
        }}
        onTouchEnd={() => stopDrawing(currentQuestion.id)}
      />

      <div className="action-buttons-container">
        {currentIndex > 0 && (
          <button
            className="show-answer-btn swal-continue"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Previous
          </button>
        )}

        <button className="try-again-button" onClick={resetCanvas}>
          Clear ↻
        </button>

        <button
          className="show-answer-btn swal-continue"
          disabled={currentIndex === questions.length - 1}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Writing_Page1_EX;
