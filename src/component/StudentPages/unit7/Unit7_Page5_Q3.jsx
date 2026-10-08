import React, { useState } from "react";
import bat from "../../../assets/unit7/img/U7P62EXEB-01.svg";
import cap from "../../../assets/unit7/img/U7P62EXEB-02.svg";
import ant from "../../../assets/unit7/img/U7P62EXEB-03.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit7_Page5_Q3.css";

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

const correctAnswers = ["happy", "cold", "crawl"];
const IMAGES = [bat, cap, ant];

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
const DropSlot = ({ index, answer, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div className="input-wrapper-unit7-page5-q3">
      <div
        ref={setNodeRef}
        className={`q-input-unit3-page6-q1${isOver ? " drag-over-cell" : ""}`}
        style={{
          background: isOver ? "#e8f0fe" : "transparent",
          justifyContent: "center",
          transition: "background 0.15s",
          borderColor: "#72d0f6",
          cursor: answer && !locked ? "pointer" : "default",
          fontSize: "22px",
          display: "inline-flex",
          alignItems: "center",
        }}
        onClick={() => {
          if (answer && !locked) onRemove(index);
        }}
        title={answer && !locked ? "Click to remove" : ""}
      >
        {answer && (
          <span
            style={{ fontWeight: "bold", color: isWrong ? "red" : "#2c5287" }}
          >
            {answer}
          </span>
        )}
      </div>

      {isWrong && <span className="error-mark-input">✕</span>}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Unit7_Page5_Q3 = () => {
  const [answers, setAnswers] = useState([null, null, null]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedWords = new Set(answers.filter(Boolean));
  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word = active.id.replace("bank-", "");
    const slotId = over.id;
    if (!slotId.startsWith("slot-")) return;

    const index = Number(slotId.split("-")[1]);

    setAnswers((prev) => {
      const updated = [...prev];
      const oldIndex = updated.findIndex((a) => a === word);
      if (oldIndex !== -1) updated[oldIndex] = null;
      updated[index] = word;
      return updated;
    });

    setWrongInputs([]);
  };

  // ⭐ Click slot → return word to bank
  const handleRemove = (index) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setWrongInputs([]);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    answers.forEach((ans, i) => {
      if ((ans || "") === correctAnswers[i]) correctCount++;
      else wrong.push(i);
    });

    setWrongInputs(wrong);
    setLocked(true);

    const total = correctAnswers.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers([null, null, null]);
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
        className="question-wrapper-unit3-page6-q1"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{gap:"60px"}}>
          <h5 className="header-title-page8">
            <span className="ex-A">B</span>Drag and drop the correct words to
            complete the sentence.
          </h5>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {correctAnswers.map((word) => (
              <BankChip
                key={word}
                word={word}
                isUsed={usedWords.has(word)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div
            className="row-content10-unit3-page6-q1"
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {IMAGES.map((img, index) => (
              <div
                key={index}
                className={
                  index === 0
                    ? "row2-unit3-page6-q1 gap-10"
                    : "row2-unit3-page6-q1 gap-10"
                }
              >
                <img src={img} alt="" className="q-img-unit3-page6-q1" />
                <DropSlot
                  index={index}
                  answer={answers[index]}
                  isWrong={wrongInputs.includes(index)}
                  locked={locked}
                  onRemove={handleRemove}
                />
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
            onClick={handleShowAnswer}
            className="show-answer-btn swal-continue"
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

export default Unit7_Page5_Q3;
