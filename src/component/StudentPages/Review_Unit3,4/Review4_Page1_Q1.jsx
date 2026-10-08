import React, { useState } from "react";
import conversation from "../../../assets/unit4/imgs/U4P36EXEA-01.svg";
import conversation2 from "../../../assets/unit4/imgs/U4P36EXEA-02.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review4_Page1_Q1.css";

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const clickableAreas = [
  { x: 73, y: 10.5, w: 23.8, h: 11 },
  { x: 72, y: 52.5, w: 24.8, h: 11 },
  { x: 45, y: 52.5, w: 15.0, h: 11 },
];

const correctAnswers = ["blue", "red", "is this"];
const wordBank = ["red", "blue", "is this"];

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

const BankChip = ({ word, id, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || locked,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "6px 12px",
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
        pointerEvents: isUsed ? "none" : undefined,
      }}
    >
      {word}
    </div>
  );
};

// ─── Drop Zone (Droppable) ────────────────────────────────────────────────────

const DropZone = ({ id, area, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <>
      <div
        ref={setNodeRef}
        onClick={() => { if (value && !locked) onRemove(id); }}
        className={`${isOver ? "drag-over-cell" : ""}`}
        title={value && !locked ? "Click to remove" : ""}
        style={{
          position: "absolute",
          top: `${area.y}%`,
          left: `${area.x}%`,
          width: `${area.w}%`,
          height: `${area.h}%`,
          fontSize: "1.3vw",
          borderRadius: "8px",
          border: `2px solid black`,
          // background: isOver ? "#e3f2fd" : "transparent",
          cursor: value && !locked ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s, border-color 0.15s",
        }}
      >
        {value || ""}
      </div>

      {isWrong && (
        <div
          className="wrong-icon-review4-p1-q1"
          style={{
            position: "absolute",
            top: `calc(${area.y}% - 1.5%)`,
            left: `calc(${area.x}% + ${area.w}% - 4%)`,
            color: "white",
          }}
        >
          ✕
        </div>
      )}
    </>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Review4_Page1_Q1 = () => {
  const [inputs, setInputs] = useState(Array(clickableAreas.length).fill(null));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // الكلمة المسحوبة حالياً
  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  // كل كلمة بالبنك مستخدمة إذا موجودة بأحد الفراغات
  const isWordUsed = (word) => inputs.includes(word);

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word = active.id.replace("bank-", "");

    if (!over.id.startsWith("drop-")) return;
    const destIndex = Number(over.id.replace("drop-", ""));

    setInputs((prev) => {
      const copy = [...prev];
      // شيل الكلمة من مكانها القديم إذا كانت موجودة
      const oldIndex = copy.findIndex((v) => v === word);
      if (oldIndex !== -1) copy[oldIndex] = null;
      copy[destIndex] = word;
      return copy;
    });

    setWrongInputs([]);
  };

  // ─── Remove on Click ──────────────────────────────────────────────────────

  const handleRemove = (dropId) => {
    const index = Number(dropId.replace("drop-", ""));
    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    setWrongInputs([]);
  };

  // ─── Check ────────────────────────────────────────────────────────────────

  const handleCheck = () => {
    if (locked) return;
    if (inputs.some((v) => v === null)) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    const results = inputs.map(
      (value, index) =>
        value?.toLowerCase() === correctAnswers[index].toLowerCase()
    );

    const wrong = results.map((r, i) => (r ? null : i)).filter((v) => v !== null);
    setWrongInputs(wrong);

    const correctCount = results.filter(Boolean).length;
    const wrongCount = results.length - correctCount;
    const color = correctCount === results.length ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount}/${results.length}
        </span>
      </div>`;

    if (correctCount === results.length) ValidationAlert.success(scoreMessage);
    else if (wrongCount === results.length) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setLocked(true);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────

  const handleReset = () => {
    setInputs(Array(clickableAreas.length).fill(null));
    setWrongInputs([]);
    setLocked(false);
  };

  // ─── Show Answer ──────────────────────────────────────────────────────────

  const showAnswer = () => {
    setInputs(correctAnswers);
    setWrongInputs([]);
    setLocked(true);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <div className="div-forall" style={{ gap: "60px" }}>
          <h5 className="header-title-page8" id="ex-d">
            <span className="mr-2">A</span> Drag and drop the correct words to
            complete the sentences.
          </h5>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {wordBank.map((word, i) => (
              <BankChip
                key={`${word}-${i}`}
                id={`bank-${word}`}
                word={word}
                isUsed={isWordUsed(word)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Images + Drop Zones ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              marginTop: "30px",
              maxWidth: "900px",
              aspectRatio: "3 / 1",
            }}
          >
            <img
              src={conversation}
              style={{ inset: 0, width: "auto", height: "auto", objectFit: "contain" }}
            />
            <img
              src={conversation2}
              style={{ inset: 0, width: "auto", height: "auto", objectFit: "contain" }}
            />

            {clickableAreas.map((area, index) => (
              <DropZone
                key={index}
                id={`drop-${index}`}
                area={area}
                value={inputs[index]}
                isWrong={wrongInputs.includes(index)}
                locked={locked}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={handleReset} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswer} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button onClick={handleCheck} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "6px 12px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review4_Page1_Q1;