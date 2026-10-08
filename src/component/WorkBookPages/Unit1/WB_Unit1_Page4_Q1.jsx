import React, { useState } from "react";
import img1 from "../../../assets/U1 WB/U1/SVG/U1P4EXEC-01.svg";
import img2 from "../../../assets/U1 WB/U1/SVG/U1P4EXEC-03.svg";
import img3 from "../../../assets/U1 WB/U1/SVG/U1P4EXEC-02.svg";
import img4 from "../../../assets/U1 WB/U1/SVG/U1P4EXEC-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

import "./WB_Unit1_Page4_Q1.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

const data = [
  { img: img1, answer: "Goodbye!" },
  { img: img2, answer: "Good morning!" },
  { img: img3, answer: "Good afternoon!" },
  { img: img4, answer: "Hello! I'm Stella." },
];

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

const BankChip = ({ id, word, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || locked,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
        border: `2px solid ${isUsed ? "#b0b0b0" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: isUsed ? "#999" : undefined,
        cursor: isUsed || locked ? "not-allowed" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.35 : 1,
        transition: "opacity 0.2s, background 0.2s, border-color 0.2s, color 0.2s",
        userSelect: "none",
        touchAction: "none",
        display: "inline-block",
        pointerEvents: isUsed ? "none" : undefined,
      }}
    >
      {word}
    </span>
  );
};

// ─── Slot Drop Zone (Droppable) ───────────────────────────────────────────────

const SlotDropZone = ({ id, value, activeWord, isWrong, showAnswer, answerText, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const displayValue = showAnswer ? answerText : (isOver && activeWord ? activeWord : value);
  const isPlaceholder = !showAnswer && isOver && activeWord && !value;

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <input
        ref={setNodeRef}
        className={`missing-input-wb-unit1-p3-q1${isOver && !showAnswer ? " drag-over-cell" : ""}`}
        style={{
          width: "100%",
          height: "40px",
          borderBottom: "2px solid black",
          fontSize: "20px",
          fontWeight: "600",
          background: isOver && !showAnswer ? "#e3f2fd" : undefined,
          // color: isPlaceholder ? "#90a4ae" : undefined,
          cursor: value && !locked && !showAnswer ? "pointer" : "default",
          transition: "background 0.15s, color 0.15s",
        }}
        value={value || ""}
        readOnly
        onClick={() => { if (value && !locked && !showAnswer) onRemove(id); }}
        title={value && !locked && !showAnswer ? "Click to remove" : ""}
      />
      {!showAnswer && isWrong && (
        <div className="wrong-icon-wb-u1-p4-q1">✕</div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WB_Unit1_Page4_Q1() {
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [wrong, setWrong] = useState([false, false, false, false]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // استخرج الكلمة من الـ id (format: "bank-answer-index")
  const parseWord = (id) =>
    id.split("-").slice(1, -1).join("-");

  const activeWord = activeId ? parseWord(activeId) : null;

  const isWordUsed = (word) => inputs.includes(word);

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer || locked) return;

    const word = parseWord(active.id);
    if (!over.id.startsWith("blank-")) return;

    const destIndex = Number(over.id.replace("blank-", ""));

    setInputs((prev) => {
      const updated = [...prev];
      // شيل الكلمة من مكانها القديم
      updated.forEach((val, i) => { if (val === word) updated[i] = ""; });
      updated[destIndex] = word;
      return updated;
    });

    setWrong([false, false, false, false]);
  };

  // ─── Remove on Click ──────────────────────────────────────────────────────

  const handleRemove = (slotId) => {
    const index = Number(slotId.replace("blank-", ""));
    setInputs((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
    setWrong([false, false, false, false]);
  };

  // ─── Check ────────────────────────────────────────────────────────────────

  const checkAnswers = () => {
    if (showAnswer || locked) return;

    if (inputs.some((v) => v.trim() === "")) {
      ValidationAlert.info("Oops!", "Please complete all answers before checking.");
      return;
    }

    let correct = 0;
    const wrongStatus = inputs.map((v, i) => {
      const ok = v.trim().toLowerCase() === data[i].answer.toLowerCase();
      if (ok) correct++;
      return !ok;
    });

    setWrong(wrongStatus);
    setLocked(true);

    const total = data.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correct} / ${total}
        </span>
      </div>`;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────

  const reset = () => {
    setInputs(["", "", "", ""]);
    setWrong([false, false, false, false]);
    setShowAnswer(false);
    setLocked(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper" style={{ padding: "30px" }}>
        <div className="div-forall">
          <h3 className="header-title-page8">
            <span className="ex-A">C</span> Drag and drop.
          </h3>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              margin: "10px 0",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {data.map((item, i) => (
              <BankChip
                key={`bank-${item.answer}-${i}`}
                id={`bank-${item.answer}-${i}`}
                word={item.answer}
                isUsed={isWordUsed(item.answer)}
                locked={locked || showAnswer}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div className="question-container-wb-u1-p4-q1">
            {data.map((item, i) => (
              <div key={i} className="question-row-wb-u1-q4">
                <div className="img-box-wb-u1-q4" style={{ display: "flex" }}>
                  <span style={{ color: "darkblue", fontWeight: "700", fontSize: "20px" }}>
                    {i + 1}
                  </span>{" "}
                  <img className="img-wb-unit1-p4-q1" src={item.img} alt="" />

                  <SlotDropZone
                    id={`blank-${i}`}
                    value={inputs[i]}
                    activeWord={activeWord}
                    isWrong={wrong[i]}
                    showAnswer={showAnswer}
                    answerText={item.answer}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            className="show-answer-btn swal-continue"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "inline-block",
            }}
          >
            {activeWord}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}