import React, { useState } from "react";
import bat from "../../../assets/unit6/imgs/U6P53EXED-01.svg";
import cap from "../../../assets/unit6/imgs/U6P53EXED-02.svg";
import ant from "../../../assets/unit6/imgs/U6P53EXED-03.svg";
import dad from "../../../assets/unit6/imgs/U6P53EXED-04.svg";
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

import "./Review5_Page2_Q1.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

const items = [
  { img: bat, correct: "g", correctInput: "girl" },
  { img: cap, correct: "k", correctInput: "kitchen" },
  { img: ant, correct: "k", correctInput: "key" },
  { img: dad, correct: "g", correctInput: "garden" },
];

const letters = ["g", "k"];

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

const BankChip = ({ letter, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `letter-${letter}`,
    disabled: locked,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        cursor: locked ? "not-allowed" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.35 : 1,
        transition: "opacity 0.2s",
        userSelect: "none",
        touchAction: "none",
        display: "inline-block",
      }}
    >
      {letter}
    </span>
  );
};

// ─── Slot Drop Zone (Droppable) ───────────────────────────────────────────────

const SlotDropZone = ({ id, value, activeWord, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const displayValue = isOver && activeWord ? activeWord : value;
  const isPlaceholder = isOver && activeWord && !value;

  return (
    <div
      ref={setNodeRef}
      className={`first-letter-input-review5-p2-q1  ${isOver ? "drag-over-cell" : ""}`}
      style={{
        // background: isOver ? "#e3f2fd" : undefined,
        cursor: value && !locked ? "pointer" : "default",
        // color: isPlaceholder ? "#90a4ae" : undefined,
        transition: "background 0.15s, color 0.15s",
      }}
      onClick={() => { if (value && !locked) onRemove(id); }}
      title={value && !locked ? "Click to remove" : ""}
    >
      {value || ""}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Review5_Page2_Q1 = () => {
  const [selected, setSelected] = useState(["", "", "", ""]);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeWord = activeId ? activeId.replace("letter-", "") : null;

  // ─── Circle Select ────────────────────────────────────────────────────────

  const handleSelect = (value, index) => {
    if (locked) return;
    const newSel = [...selected];
    newSel[index] = value;
    setSelected(newSel);
    setShowResult(false);
  };

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const value = active.id.replace("letter-", "");
    if (!over.id.startsWith("slot-")) return;

    const index = Number(over.id.replace("slot-", ""));

    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

    setWrongInputs([]);
    setShowResult(false);
  };

  // ─── Remove on Click ──────────────────────────────────────────────────────

  const handleRemove = (slotId) => {
    const index = Number(slotId.replace("slot-", ""));
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
    setWrongInputs([]);
    setShowResult(false);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────

  const resetAll = () => {
    setSelected(["", "", "", ""]);
    setAnswers(["", "", "", ""]);
    setWrongInputs([]);
    setShowResult(false);
    setLocked(false);
  };

  // ─── Show Answer ──────────────────────────────────────────────────────────

  const showAnswers = () => {
    setSelected(items.map((item) => item.correct));
    setAnswers(items.map((item) => item.correctInput[0].toLowerCase()));
    setWrongInputs([]);
    setShowResult(false);
    setLocked(true);
  };

  // ─── Check ────────────────────────────────────────────────────────────────

  const checkAnswers = () => {
    if (locked) return;

    if (selected.some((s) => s === "")) {
      ValidationAlert.info("Please choose a circle (g or k) for all items!");
      return;
    }
    if (answers.some((a) => a === "")) {
      ValidationAlert.info("Please fill in all the writing boxes!");
      return;
    }

    let wrong = [];
    let score = 0;

    items.forEach((item, i) => {
      const circleCorrect = selected[i] === item.correct;
      const inputCorrect = answers[i] === item.correctInput[0].toLowerCase();

      if (circleCorrect) score++;
      if (inputCorrect) score++;
      if (!circleCorrect || !inputCorrect) wrong.push(i);
    });

    setWrongInputs(wrong);
    setShowResult(true);
    setLocked(true);

    const total = items.length * 2;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px; margin-top:10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>`;

    if (score === total) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "50px" }}>
          <h5 className="header-title-page8">
            <span className="mr-2">D</span> Does it begin with{" "}
            <span style={{ color: "red" }}>g </span>or
            <span style={{ color: "red" }}>k </span> ? Tap or click the
            beginning letter.
          </h5>

          {/* ── Letter Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {letters.map((letter, index) => (
              <BankChip key={`${letter}-${index}`} letter={letter} locked={locked} />
            ))}
          </div>

          {/* ── Questions Grid ── */}
          <div className="question-grid-unit4-page5-q1 w-full">
            {items.map((item, i) => (
              <div className="question-box-unit4-page5-q1" key={i}>

                {/* Image */}
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ color: "#2c5287", fontWeight: "700", fontSize: "20px" }}>
                    {i + 1}
                  </span>
                  <img src={item.img} className="q-img-review5-p2-q1" />
                </div>

                {/* Circle Choices */}
                <div className="choices-unit4-page5-q1">
                  {["g", "k"].map((letter) => (
                    <div className="circle-wrapper" key={letter}>
                      <div
                        className={`circle-choice-review5-page2-q1 ${selected[i] === letter ? "active" : ""}`}
                        onClick={() => handleSelect(letter, i)}
                      >
                        {letter}
                      </div>
                      {locked && showResult && selected[i] === letter && selected[i] !== item.correct && (
                        <div className="wrong-mark">✕</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Drag Slot + Rest of Word */}
                <div className="word-row-review5-p2-q1">
                  <SlotDropZone
                    id={`slot-${i}`}
                    value={answers[i]}
                    activeWord={activeWord}
                    isWrong={locked && showResult && wrongInputs.includes(i)}
                    locked={locked}
                    onRemove={handleRemove}
                  />

                  {locked && showResult && wrongInputs.includes(i) && (
                    <div className="wrong-mark-review5-p2-q1">✕</div>
                  )}

                  <span className="rest-word">{item.correctInput.slice(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswers} className="show-answer-btn">
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
              padding: "7px 14px",
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
};

export default Review5_Page2_Q1;