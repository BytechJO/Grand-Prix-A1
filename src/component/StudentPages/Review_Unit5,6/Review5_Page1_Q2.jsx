import React, { useState } from "react";
import deer from "../../../assets/unit6/imgs/U6P52EXEB-01.svg";
import duck from "../../../assets/unit6/imgs/U6P52EXEB-02.svg";
import taxi from "../../../assets/unit6/imgs/U6P52EXEB-03.svg";
import tiger from "../../../assets/unit6/imgs/U6P52EXEB-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review5_Page1_Q2.css";

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
  { word: "This is your chair.", src: deer, num: "3" },
  { word: "This is my book.", src: duck, num: "1" },
  { word: "This is my pen.", src: taxi, num: "2" },
  { word: "This is your ruler.", src: tiger, num: "4" },
];

const numbers = ["1", "2", "3", "4"];

// ─── Number chip in the bank ──────────────────────────────────────────────────
const BankNumber = ({ value, isUsed, locked }) => {
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
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        fontSize: "18px",
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
const DropSlot = ({ id, answer, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`missing-input-review5-p1-q2${isOver ? " drag-over-cell" : ""}`}
      style={{
        position: "relative",
        background: isOver ? "#e8f0fe" : "transparent",
        transition: "background 0.15s",
        cursor: answer && !locked ? "pointer" : "default",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => {
        if (answer && !locked) onRemove(id);
      }}
      title={answer && !locked ? "Click to remove" : ""}
    >
      {answer && (
        <span
          style={{ fontWeight: "bold" }}
        >
          {answer}
        </span>
      )}

      {isWrong && (
        <div
          style={{
            position: "absolute",
            right: "-17px",
            top: "5%",
            transform: "translateY(-50%)",
            width: "22px",
            height: "22px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Review5_Page1_Q2 = () => {
  const [locked, setLocked] = useState(false);
  const [answers, setAnswers] = useState(Array(data.length).fill(null)); // [null, "2", null, "4"]
  const [wrongNumbers, setWrongNumbers] = useState(data.map(() => false));
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedValues = new Set(answers.filter(Boolean));
  const activeValue = activeId ? activeId.replace("bank-", "") : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const value = active.id.replace("bank-", "");
    const slotId = over.id; // e.g. "slot-2"

    if (!slotId.startsWith("slot-")) return;
    const index = Number(slotId.split("-")[1]);

    setAnswers((prev) => {
      const updated = [...prev];

      // Remove this value from wherever it was
      const oldIndex = updated.findIndex((a) => a === value);
      if (oldIndex !== -1) updated[oldIndex] = null;

      updated[index] = value;
      return updated;
    });

    setWrongNumbers(data.map(() => false));
  };

  // ⭐ Click on slot → remove → back to bank
  const handleRemove = (slotId) => {
    const index = Number(slotId.split("-")[1]);
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setWrongNumbers(data.map(() => false));
  };

  const showAnswers = () => {
    setAnswers(data.map((item) => item.num));
    setWrongNumbers(data.map(() => false));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(data.length).fill(null));
    setWrongNumbers(data.map(() => false));
    setLocked(false);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => a === null)) {
      ValidationAlert.info(
        "Oops!",
        "Please complete all answers before checking.",
      );
      return;
    }

    let score = 0;
    const numberWrongs = answers.map((a, i) => {
      if (i === 0) return false; // first item ignored like original
      const correct = a === data[i].num;
      if (correct) score++;
      return !correct;
    });

    setWrongNumbers(numberWrongs);
    setLocked(true);

    const totalPoints = data.length - 1;
    const color =
      score === totalPoints ? "green" : score === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;margin-top:10px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${score} / ${totalPoints}</span>
      </div>`;

    if (score === totalPoints) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
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
          <header className="header-title-page8">
            <span className="mr-2">B</span> Drag and drop the number to the
            correct picture.
          </header>

          {/* ── Number Bank ── */}
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
            {numbers.map((value) => (
              <BankNumber
                key={value}
                value={value}
                isUsed={usedValues.has(value)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Images ── */}
          <div className="exercise-image-div-review5-p1-q2 w-full">
            {data.map((item, index) => (
              <div key={index} style={{ display: "flex" }}>
                <span
                  style={{
                    color: "#2c5287",
                    fontSize: "22px",
                    fontWeight: "700",
                  }}
                >
                  {index + 1}
                </span>
                <img src={item.src} className="exercise-image-review5-p1-q2" />
              </div>
            ))}
          </div>

          {/* ── Slots + words ── */}
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="exercise-container-review5-p1-q2"
              style={{ marginTop: "20px" }}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "22px",
                  }}
                >
                  <span style={{ width: "200px" }}>{item.word}</span>
                  <DropSlot
                    id={`slot-${index}`}
                    answer={answers[index]}
                    isWrong={wrongNumbers[index]}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            className="show-answer-btn swal-continue"
            onClick={showAnswers}
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
        {activeValue ? (
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
            {activeValue}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review5_Page1_Q2;
