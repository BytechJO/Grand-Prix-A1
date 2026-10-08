import React, { useState } from "react";
import deer from "../../../assets/unit6/imgs/U6P54EXEC-01.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review6_Page1_Q3.css";

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
  { question: "", correct: "She can ride a bike" },
  { question: "", correct: "It can climb a tree" },
  { question: "", correct: "He can't fly a kite" },
];

// ─── Bank sentence chip ───────────────────────────────────────────────────────
const BankChip = ({ value, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${value}`,
    disabled: isUsed || locked,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
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
      {value}
    </span>
  );
};

// ─── Drop slot ────────────────────────────────────────────────────────────────
const DropSlot = ({ index, answer, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        ref={setNodeRef}
        className={`q-input-review6-p1-q3${isOver ? " drag-over-cell" : ""}`}
        style={{
          background: isOver ? "#e8f0fe" : "transparent",
          transition: "background 0.15s",
          cursor: answer && !locked ? "pointer" : "default",
          display: "inline-flex",
          alignItems: "center",
        }}
        onClick={() => { if (answer && !locked) onRemove(index); }}
        title={answer && !locked ? "Click to remove" : ""}
      >
        {answer && (
          <span
            style={{
              fontWeight: "bold",
              // color: isWrong ? "red" : "#2c5287",
            }}
          >
            {answer}
          </span>
        )}
      </div>

      {isWrong && (
        <span className="wrong-icon-review6-p1-q3">✕</span>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Review6_Page1_Q3 = () => {
  const [answers, setAnswers] = useState(Array(data.length).fill(null));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const usedValues = new Set(answers.filter(Boolean));
  const activeValue = activeId ? activeId.replace("bank-", "") : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const value = active.id.replace("bank-", "");
    const slotId = over.id;

    if (!slotId.startsWith("slot-")) return;
    const index = Number(slotId.split("-")[1]);

    setAnswers((prev) => {
      const updated = [...prev];

      // Remove from old slot if already placed
      const oldIndex = updated.findIndex((a) => a === value);
      if (oldIndex !== -1) updated[oldIndex] = null;

      updated[index] = value;
      return updated;
    });

    setWrongInputs([]);
  };

  // ⭐ Click on slot → return to bank
  const handleRemove = (index) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setWrongInputs([]);
  };

  const showAnswers = () => {
    setAnswers(data.map((d) => d.correct));
    setWrongInputs([]);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a || a.trim() === "")) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    const wrong = [];
    let correctCount = 0;

    answers.forEach((ans, i) => {
      if ((ans || "").toLowerCase() === data[i].correct.toLowerCase()) {
        correctCount++;
      } else {
        wrong.push(i);
      }
    });

    setWrongInputs(wrong);
    setLocked(true);

    const color =
      correctCount === data.length ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${data.length}
        </span>
      </div>`;

    if (correctCount === data.length) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
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
        <div className="div-forall" style={{ gap: "30px" }}>
          <h3 className="header-title-page8">
            <span className="mr-2">C</span> Drag the sentences to match the correct number.
          </h3>

          {/* ── Sentence Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {data.map((item) => (
              <BankChip
                key={item.correct}
                value={item.correct}
                isUsed={usedValues.has(item.correct)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div className="content-unit5-p5-q3 w-full">
            <img src={deer} className="shape-img-review6-p1-q3" alt="" />
            <div className="group-input-unit5-p5-q3">
              {data.map((item, index) => (
                <div
                  className="question-row"
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    margin: "20px",
                    width: "100%",
                  }}
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
          </div>
        </div>

        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answers ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeValue ? (
          <span
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
              color: "#2c5287",
            }}
          >
            {activeValue}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review6_Page1_Q3;