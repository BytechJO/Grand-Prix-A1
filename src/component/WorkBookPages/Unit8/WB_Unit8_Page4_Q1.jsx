import React, { useState, useRef } from "react";
import bat from "../../../assets/U1 WB/U8/U8P48EXEG-01.svg";
import cap from "../../../assets/U1 WB/U8/U8P48EXEG-02.svg";
import ant from "../../../assets/U1 WB/U8/U8P48EXEG-03.svg";
import dad from "../../../assets/U1 WB/U8/U8P48EXEG-04.svg";
import pencilCursor from "../../../assets/unit1/imgs/pen_96740.png";
import eraserCursor from "../../../assets/unit1/imgs/gui_eraser_icon_157160.png";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit8_Page4_Q1.css";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

const COLORS = [
  "#7c3aed",
  "#e53e3e",
  "#2b6cb0",
  "#276749",
  "#d69e2e",
  "#000000",
];

// ─── Draggable Word Chip ──────────────────────────────────────────────────────
const DraggableWord = ({ id, text, disabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });
  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        borderRadius: "8px",
        border: "2px solid #2c5287",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "grab",
        background: "white",
        padding: "8px",
        opacity: isDragging ? 0.3 : disabled ? 0.35 : 1,
        touchAction: "none",
        userSelect: "none",
        transition: "opacity 0.2s",
      }}
    >
      {text}
    </span>
  );
};

// ─── Word Bank ────────────────────────────────────────────────────────────────
const WordBank = ({ wordBank, usedIds, locked }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "word-bank" });
  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        border: "2px dashed #ccc",
        borderRadius: 10,
        width: "100%",
        justifyContent: "center",
        background: isOver ? "#f0f8ff" : "transparent",
        transition: "background 0.2s",
      }}
    >
      {wordBank.map((w) => (
        <DraggableWord
          key={w.id}
          id={w.id}
          text={w.text}
          disabled={locked || usedIds.has(w.id)}
        />
      ))}
    </div>
  );
};

// ─── Droppable Cell ───────────────────────────────────────────────────────────
const DroppableCell = ({ id, displayText, isWrong, locked, onClear }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });
  return (
    <span
      ref={setNodeRef}
      className={`inline-input-wb-unit4-p1-q2 ${isOver ? "drag-over-cell" : ""}`}
      onClick={() => {
        if (!locked && displayText) onClear();
      }}
      style={{
        background: isOver && !locked ? "#e3f2fd" : "transparent",
        display: "inline-block",
        width: "100%",
        position: "relative",
        cursor: !locked && displayText ? "pointer" : "default",
        transition: "background 0.2s",
      }}
      title={!locked && displayText ? "Click to return to bank" : ""}
    >
      {displayText}
      {isWrong && <span className="error-mark-input-wb-unit2-page3-q2">✕</span>}
    </span>
  );
};

// ─── Drawing Canvas ───────────────────────────────────────────────────────────
const DrawingCanvas = ({
  imgSrc,
  id,
  canvasRefs,
  tool,
  strokeColor,
  strokeSize,
  eraserSize,
}) => {
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRefs.current[id];
    isDrawing.current = true;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRefs.current[id];
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeSize;
    }
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  return (
    <canvas
      ref={(el) => (canvasRefs.current[id] = el)}
      width={220}
      height={160}
      className="wb-unit8-p4-q1-canvas"
      style={{
        backgroundImage: `url(${imgSrc})`,
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
      onTouchMove={(e) => {
        e.preventDefault();
        draw(e);
      }}
      onTouchEnd={stopDrawing}
    />
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit8_Page4_Q1 = () => {
  const questions = [
    {
      id: 1,
      img: bat,
      parts: [
        { type: "text", value: "This" },
        { type: "input", answer: "is my arm" },
        { type: "text", value: "." },
      ],
    },
    {
      id: 2,
      img: cap,
      parts: [
        { type: "text", value: "This" },
        { type: "input", answer: "is my head" },
        { type: "text", value: "." },
      ],
    },
    {
      id: 3,
      img: ant,
      parts: [
        { type: "input", answer: "This is my leg" },
        { type: "text", value: "." },
      ],
    },
    {
      id: 4,
      img: dad,
      parts: [
        { type: "input", answer: "This is my nose" },
        { type: "text", value: "." },
      ],
    },
  ];

  const wordBank = [
    { id: "w1", text: "is my arm" },
    { id: "w2", text: "is my head" },
    { id: "w3", text: "This is my leg" },
    { id: "w4", text: "This is my nose" },
  ];

  const [answers, setAnswers] = useState(
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null))),
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [tool, setTool] = useState("pen");
  const [strokeColor, setStrokeColor] = useState(COLORS[0]);
  const [strokeSize, setStrokeSize] = useState(2);
  const [eraserSize, setEraserSize] = useState(20);

  const canvasRefs = useRef({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedIds = new Set(answers.flat().filter(Boolean));

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;
    const draggedId = String(active.id);
    const destId = String(over.id);
    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy.forEach((row, qi) =>
        row.forEach((val, pi) => {
          if (val === draggedId) copy[qi][pi] = "";
        }),
      );
      if (destId.startsWith("drop-")) {
        const [qIndex, pIndex] = destId
          .replace("drop-", "")
          .split("-")
          .map(Number);
        copy[qIndex][pIndex] = draggedId;
      }
      return copy;
    });
    setWrongInputs([]);
  };

  const handleClear = (qIndex, pIndex) => {
    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[qIndex][pIndex] = "";
      return copy;
    });
    setWrongInputs([]);
  };

  const checkAnswers = () => {
    if (locked) return;
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
      for (let pIndex = 0; pIndex < questions[qIndex].parts.length; pIndex++) {
        if (
          questions[qIndex].parts[pIndex].type === "input" &&
          !answers[qIndex][pIndex]
        ) {
          ValidationAlert.info(`Please complete question ${qIndex + 1}.`);
          return;
        }
      }
    }
    let wrong = [],
      score = 0,
      total = 0;
    questions.forEach((q, qIndex) => {
      q.parts.forEach((p, pIndex) => {
        if (p.type === "input") {
          total++;
          const word =
            wordBank.find((w) => w.id === answers[qIndex][pIndex])?.text || "";
          if (word === p.answer) score++;
          else wrong.push(`${qIndex}-${pIndex}`);
        }
      });
    });
    setWrongInputs(wrong);
    setLocked(true);
    const msg = `Score: ${score} / ${total}`;
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    const filled = questions.map((q) =>
      q.parts.map((p) => {
        if (p.type !== "input") return null;
        return wordBank.find((w) => w.text === p.answer)?.id || "";
      }),
    );
    setAnswers(filled);
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    questions.forEach((q) => {
      const canvas = canvasRefs.current[q.id];
      if (canvas)
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    });
    setAnswers(
      questions.map((q) =>
        q.parts.map((p) => (p.type === "input" ? "" : null)),
      ),
    );
    setWrongInputs([]);
    setLocked(false);
  };

  const activeWord = wordBank.find((w) => w.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="question-wrapper-unit3-page6-q1"
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
            marginBottom: "50px",
            gap: "30px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A">G</span>Trace and match.
          </h5>

          <WordBank wordBank={wordBank} usedIds={usedIds} locked={locked} />

          {/* Toolbar */}
          <div
            className="unit4-q2-p6-tools w-full"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
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
            {tool === "pen" && (
              <div
                style={{ display: "flex", gap: "6px", alignItems: "center" }}
              >
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setStrokeColor(c)}
                    title={c}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: c,
                      border:
                        strokeColor === c
                          ? "3px solid #2c5287"
                          : "2px solid #ccc",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>
                {tool === "eraser" ? "🧽" : "✏️"} Size:
              </span>
              <input
                type="range"
                min={tool === "eraser" ? 8 : 1}
                max={tool === "eraser" ? 60 : 16}
                value={tool === "eraser" ? eraserSize : strokeSize}
                onChange={(e) =>
                  tool === "eraser"
                    ? setEraserSize(Number(e.target.value))
                    : setStrokeSize(Number(e.target.value))
                }
                style={{ width: 90, accentColor: "#2c5287" }}
              />
              <span
                style={{
                  fontSize: 13,
                  minWidth: 22,
                  textAlign: "center",
                  color: "#555",
                }}
              >
                {tool === "eraser" ? eraserSize : strokeSize}
              </span>
              <div
                style={{
                  width:
                    tool === "eraser"
                      ? Math.min(eraserSize, 36)
                      : Math.min(strokeSize * 2, 36),
                  height:
                    tool === "eraser"
                      ? Math.min(eraserSize, 36)
                      : Math.min(strokeSize * 2, 36),
                  borderRadius: "50%",
                  background: tool === "eraser" ? "#ddd" : strokeColor,
                  border: tool === "eraser" ? "2px dashed #999" : "none",
                  transition: "all 0.15s",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="content-container-wb-unit8-p4-q1 w-full">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="row2-wb-unit8-p4-q1">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <span className="num-span">{qIndex + 1}</span>
                  <DrawingCanvas
                    imgSrc={q.img}
                    id={q.id}
                    canvasRefs={canvasRefs}
                    tool={tool}
                    strokeColor={strokeColor}
                    strokeSize={strokeSize}
                    eraserSize={eraserSize}
                  />
                </div>
                <div className="sentence-wrapper-wb-unit8-p4-q1">
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text")
                      return (
                        <span key={pIndex} className="sentence-text">
                          {part.value}
                        </span>
                      );
                    const cellId = `drop-${qIndex}-${pIndex}`;
                    const placedId = answers[qIndex][pIndex];
                    const displayText =
                      wordBank.find((w) => w.id === placedId)?.text || "";
                    return (
                      <span
                        key={pIndex}
                        style={{ position: "relative", width: "90%" }}
                      >
                        <DroppableCell
                          id={cellId}
                          displayText={displayText}
                          isWrong={wrongInputs.includes(`${qIndex}-${pIndex}`)}
                          locked={locked}
                          onClear={() => handleClear(qIndex, pIndex)}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            onClick={showAnswers}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              borderRadius: "8px",
              border: "2px solid #2c5287",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: "8px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeWord.text}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit8_Page4_Q1;
