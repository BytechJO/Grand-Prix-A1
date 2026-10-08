import React, { useState } from "react";
import conversation  from "../../../assets/unit7/img/U7P63EXEF-01.svg";
import conversation2 from "../../../assets/unit7/img/U7P63EXEF-02.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit7_Page6_Q3.css";

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

const questions = [
  {
    id: "q1",
    img: conversation,
    question: "Are you cold?",
    type: "full",
    correct: "Yes, I am.",
  },
  {
    id: "q2",
    img: conversation2,
    question: "Are you scared?",
    type: "word",
    prefix: "No, I'm not. I'm",
    correct: "hungry",
  },
];

const BANK_WORDS = questions.map((q) => q.correct); // ["Yes, I am.", "hungry"]

// ─── Bank chip ────────────────────────────────────────────────────────────────
const BankChip = ({ word, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${word}`,
    disabled: isUsed || locked,
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
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        cursor: isUsed || locked ? "not-allowed" : "grab",
        opacity: isUsed ? 0.45 : isDragging ? 0.3 : 1,
        transition: "opacity 0.2s, background 0.2s",
        userSelect: "none",
        color: isUsed ? "#999" : "",
      }}
    >
      {word}
    </span>
  );
};

// ─── Drop slot ────────────────────────────────────────────────────────────────
const DropSlot = ({ id, answer, isWrong, locked, onRemove, inline, style }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const base = {
    background: isOver ? "#e8f0fe" : "transparent",
    transition: "background 0.15s",
    cursor: answer && !locked ? "pointer" : "default",
    display: inline ? "inline-flex" : "flex",
    alignItems: "center",
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      className={`answer-input-unit7-p2-q3${inline ? " small" : ""}${isOver ? " drag-over-cell" : ""}`}
      style={base}
      onClick={() => { if (answer && !locked) onRemove(id); }}
      title={answer && !locked ? "Click to remove" : ""}
    >
      {answer && (
        <span >
          {answer}
        </span>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Unit7_Page6_Q3 = () => {
  const [answers,     setAnswers]     = useState({ q1: null, q2: null });
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked,      setLocked]      = useState(false);
  const [activeId,    setActiveId]    = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const usedWords  = new Set(Object.values(answers).filter(Boolean));
  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word  = active.id.replace("bank-", "");
    const slotId = over.id; // "q1" or "q2"

    if (!["q1", "q2"].includes(slotId)) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      // Remove this word from any other slot
      Object.keys(updated).forEach((k) => {
        if (updated[k] === word) updated[k] = null;
      });
      updated[slotId] = word;
      return updated;
    });

    setWrongInputs([]);
  };

  // ⭐ Click slot → return to bank
  const handleRemove = (slotId) => {
    setAnswers((prev) => ({ ...prev, [slotId]: null }));
    setWrongInputs([]);
  };

  const handleCheck = () => {
    if (locked) return;

    if (Object.values(answers).some((v) => !v || v.trim() === "")) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    questions.forEach((q) => {
      const given = (answers[q.id] || "").trim().toLowerCase();
      if (given === q.correct.toLowerCase()) correctCount++;
      else wrong.push(q.id);
    });

    setWrongInputs(wrong);
    setLocked(true);

    const total = questions.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount}/${total}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    const filled = {};
    questions.forEach((q) => { filled[q.id] = q.correct; });
    setAnswers(filled);
    setWrongInputs([]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers({ q1: null, q2: null });
    setWrongInputs([]);
    setLocked(false);
  };

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
        <div className="div-forall">
          <h5 className="header-title-page8" id="ex-d">
            <span className="ex-A">F</span> Drag and drop the correct word to complete the sentence.
          </h5>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {BANK_WORDS.map((word) => (
              <BankChip
                key={word}
                word={word}
                isUsed={usedWords.has(word)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div>
            {questions.map((q, index) => {
              const isWrong = wrongInputs.includes(q.id);

              return (
                <div key={q.id} className="question-row-unit7-p2-q3">
                  <div className="question-container-unit7-p6-q3">
                    <span className="num2">{index + 1}</span>
                    <img src={q.img} className="avatar-img" />
                    <p className="question-text-unit7-p2-q3">{q.question}</p>
                  </div>

                  <div className="sentence-box-unit7-p2-q3">
                    {/* Full sentence slot */}
                    {q.type === "full" && (
                      <DropSlot
                        id={q.id}
                        answer={answers[q.id]}
                        isWrong={isWrong}
                        locked={locked}
                        onRemove={handleRemove}
                      />
                    )}

                    {/* Inline word slot */}
                    {q.type === "word" && (
                      <p className="answer-line-unit7-p2-q3">
                        {q.prefix}{" "}
                        <DropSlot
                          id={q.id}
                          answer={answers[q.id]}
                          isWrong={isWrong}
                          locked={locked}
                          onRemove={handleRemove}
                          inline
                          style={{ minWidth: "80px", minHeight: "32px" }}
                        />
                        .
                      </p>
                    )}

                    {isWrong && (
                      <span className="wrong-mark-unit7-p2-q3">✕</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={handleReset} className="try-again-button">
            Start Again ↻
          </button>
          <button className="show-answer-btn swal-continue" onClick={handleShowAnswer}>
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
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
              color: "#2c5287",
            }}
          >
            {activeWord}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit7_Page6_Q3;