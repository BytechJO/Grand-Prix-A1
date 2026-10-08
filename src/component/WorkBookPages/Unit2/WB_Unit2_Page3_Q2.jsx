import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U2/U2P11EXEF-01.svg";
import cap from "../../../assets/U1 WB/U2/U2P11EXEF-02.svg";
import ant from "../../../assets/U1 WB/U2/U2P11EXEF-03.svg";
import dad from "../../../assets/U1 WB/U2/U2P11EXEF-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import "./WB_Unit2_Page3_Q2.css";

// ─── Data ─────────────────────────────────────────────────────────────────────
const correctAnswers = [ "Saturday","Tuesday","Thursday", "Sunday", ];
const wordBank = ["Tuesday", "Saturday","Sunday","Thursday",  ];
const images = [bat, cap, ant, dad];

// ─── BankWord ─────────────────────────────────────────────────────────────────
function BankWord({ id, word, isUsed, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || disabled,
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
        cursor: isUsed || disabled ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.5 : 1,
        userSelect: "none",
        touchAction: "none",
        pointerEvents: isUsed ? "none" : "auto",
        ...(isUsed ? { borderColor: "#ccc", color: "#aaa" } : {}),
      }}
    >
      {word}
    </span>
  );
}

// ─── DroppableInput ───────────────────────────────────────────────────────────
function DroppableInput({
  id,
  value,
  inputClass,
  errorClass,
  isWrong,
  locked,
  onClear,
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      className="input-wrapper-unit3-page6-q1"
      style={{ position: "relative" }}
    >
      <input
        ref={setNodeRef}
        type="text"
        className={`q-input-wb-unit2-page3-q2 ${isOver ? "drag-over-cell" : ""}`}
        value={value}
        readOnly
        disabled={locked}
        onClick={() => {
          if (value && !locked) onClear(id);
        }}
        style={{
          background: isOver ? "#e3f2fd" : "white",
          cursor: value && !locked ? "pointer" : "default",
        }}
      />
      {isWrong && <span className={errorClass}>✕</span>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const WB_Unit2_Page3_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const usedWords = answers.filter((w) => w !== "");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  const handleDragStart = (event) => {
    setActiveWord(event.active.id.replace("word-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    const { active, over } = event;
    if (!over || locked) return;
    if (!over.id.startsWith("input-")) return;

    const word = active.id.replace("word-", "");
    const targetIndex = Number(over.id.replace("input-", ""));

    setAnswers((prev) => {
      const updated = [...prev];
      const sourceIndex = updated.findIndex((w) => w === word);
      if (sourceIndex === targetIndex) return prev;
      const targetWord = updated[targetIndex];
      updated[targetIndex] = word;
      if (sourceIndex !== -1) updated[sourceIndex] = targetWord || "";
      return updated;
    });

    setWrongInputs([]);
  };

  const handleClear = (cellId) => {
    const index = Number(cellId.replace("input-", ""));
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
    setWrongInputs((prev) => prev.filter((i) => i !== index));
  };

  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((ans) => ans.trim() === "")) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }
    let score = 0;
    let wrong = [];
    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) score++;
      else wrong.push(i);
    });
    setWrongInputs(wrong);
    setLocked(true);
    const total = correctAnswers.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">Score: ${score} / ${total}</span>
      </div>
    `;
    if (score === total) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const showAnswers = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", ""]);
    setWrongInputs([]);
    setLocked(false);
  };

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
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span className="ex-A">F</span>Drag the day to the calendar.
          </h5>

          {/* Word Bank */}
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
            }}
          >
            {wordBank.map((w) => (
              <BankWord
                key={w}
                id={`word-${w}`}
                word={w}
                isUsed={usedWords.includes(w)}
                disabled={locked}
              />
            ))}
          </div>

          {/* Rows */}
          <div className="row-content10-wb-unit2-page3-q2 w-full">
            {images.map((img, i) => (
              <div
                key={i}
                className="row2-unit3-page6-q1"
                style={{ alignItems: "flex-start" }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="num-span">{i + 1}</span>
                  <img src={img} alt="" className="q-img-wb-unit2-page3-q2" />
                </div>
                <DroppableInput
                  id={`input-${i}`}
                  value={answers[i]}
                  inputClass={"q-input-wb-unit2-page3-q2"}
                  errorClass={"error-mark-input-wb-unit2-page3-q2"}
                  isWrong={wrongInputs.includes(i)}
                  locked={locked}
                  onClear={handleClear}
                />
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
        {activeWord && (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {activeWord}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit2_Page3_Q2;
