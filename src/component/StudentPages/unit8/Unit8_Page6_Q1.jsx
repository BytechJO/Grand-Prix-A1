import React, { useState } from "react";
import deer from "../../../assets/unit8/imgs/U8P69EXED.svg";
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

const data = [
  { correct: "head" },
  { correct: "eye"  },
  { correct: "nose" },
  { correct: "arm"  },
  { correct: "leg"  },
];

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
        touchAction:"none"
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
    <div className="question-text-unit8-page6-q1" style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        className={`q-input-unit8-page6-q1${isOver ? " drag-over-cell" : ""}`}
        style={{
          background: isOver ? "#e8f0fe" : "transparent",
          transition: "background 0.15s",
          cursor: answer && !locked ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => { if (answer && !locked) onRemove(index); }}
        title={answer && !locked ? "Click to remove" : ""}
      >
        {answer && (
          <span>
            {answer}
          </span>
        )}
      </div>

      {isWrong && <span className="wrong-icon-review6-p1-q3">✕</span>}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Unit8_Page6_Q1 = () => {
  const [answers,     setAnswers]     = useState(Array(data.length).fill(null));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked,      setLocked]      = useState(false);
  const [activeId,    setActiveId]    = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const usedWords  = new Set(answers.filter(Boolean));
  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word   = active.id.replace("bank-", "");
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

  // ⭐ Click slot → return to bank
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
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    answers.forEach((ans, i) => {
      if (ans === data[i].correct) correctCount++;
      else wrong.push(i);
    });

    setWrongInputs(wrong);
    setLocked(true);

    const color =
      correctCount === data.length ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${data.length}</span>
      </div>`;

    if (correctCount === data.length) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const showCorrectAnswers = () => {
    setAnswers(data.map((item) => item.correct));
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(data.length).fill(null));
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
        <div
          className="div-forall"
          style={{
            gap: "40px",
         
          }}
        >
          <h3 className="header-title-page8">
            <span className="ex-A"> D</span> Drag and drop the correct words to match the numbers.
          </h3>

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
            {data.map((item) => (
              <BankChip
                key={item.correct}
                word={item.correct}
                isUsed={usedWords.has(item.correct)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div className="content-unit5-p5-q3 w-full">
            <div className="group-input-unit5-p5-q3">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="question-row"
                  style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px" }}
                >
                  <span
                    className="q-number"
                    style={{ color: "#0d47a1", fontWeight: "700", fontSize: "20px" }}
                  >
                    {index + 1}.
                  </span>

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

            <img
              src={deer}
              className="shape-img-unit5-p5-q3"
              alt=""
              style={{ height: "325px", width: "auto" }}
            />
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button className="show-answer-btn swal-continue" onClick={showCorrectAnswers}>
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answers ✓
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

export default Unit8_Page6_Q1;