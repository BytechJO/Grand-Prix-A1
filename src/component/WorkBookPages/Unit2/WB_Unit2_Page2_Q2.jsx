import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import cake from "../../../assets/U1 WB/U2/U2P10EXED.svg";
import pencilCursor from "../../../assets/unit1/imgs/pen_96740.png";
import eraserCursor from "../../../assets/unit1/imgs/gui_eraser_icon_157160.png";

const WB_Unit2_Page2_Q2 = () => {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(true); // مؤقت حتى ما يكسر التحقق
  const [isCorrect, setIsCorrect] = useState(null);
  const [tool, setTool] = useState("pen"); // pen | eraser

  const canvasRef = useRef(null);
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

  // 🖌️ Start Drawing
  const startDrawing = (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const { x, y } = getPos(e, canvas);

    ctx.isDrawing = true;
    ctx.lineCap = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20; // حجم الممحاة
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "red";
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // ✏️ Drawing
  const draw = (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx.isDrawing) return;

    const { x, y } = getPos(e, canvas);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.isDrawing = false;
    ctx.closePath();
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const reset = () => {
    setAnswer("");
    setChecked(false);
    setIsCorrect(null);
    resetCanvas();
  };

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
        <h5 className="header-title-page8">
          <span className="ex-A">D</span> How old are you? Type and draw candles
          on the cake.
        </h5>

        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={answer}
            className="answer-input33-review10-p1-q3"
            onChange={(e) => setAnswer(e.target.value)}
            disabled={checked}
          />

          {/* <span>.</span> */}
        </div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <canvas
            ref={canvasRef}
            height={150}
            width={500}
            className="draw-canvas-wb-unit2-p2-q2 w-full"
            style={{
              backgroundImage: `url(${cake})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              cursor:
                tool === "eraser"
                  ? `url(${eraserCursor}) 12 12, auto`
                  : `url(${pencilCursor}) 4 28, auto`,
            }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
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

export default WB_Unit2_Page2_Q2;
