import React, { useState } from "react";
import bat from "../../../assets/unit4/imgs/U4P35EXED-01.svg";
import cap from "../../../assets/unit4/imgs/U4P35EXED-02.svg";
import ant from "../../../assets/unit4/imgs/U4P35EXED-03.svg";
import dad from "../../../assets/unit4/imgs/U4P35EXED-04.svg";
import ant2 from "../../../assets/unit4/imgs/U4P35EXED-05.svg";
import dad2 from "../../../assets/unit4/imgs/U4P35EXED-06.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import "./Review3_Page2_Q1.css";

// ─── Draggable Word (Word Bank) ────────────────────────────────────────────────
const DraggableWord = ({ id, word, disabled, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isUsed,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: `2px solid ${isUsed ? "#aab3c4" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#f0f2f5" : "white",
        fontWeight: "bold",
   
        cursor: disabled || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.45 : 1,
        color: isUsed ? "#9aa3b0" : "inherit",
        display: "inline-block",
        transition: "all 0.2s ease",
        userSelect: "none",
      }}
    >
      {word}
    </span>
  );
};

// ─── Droppable Slot ────────────────────────────────────────────────────────────
const DropSlot = ({ index, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div
      ref={setNodeRef}
      className={`q-input-review3-p2-q1 ${isOver ? "drag-over-cell" : ""}`}
    >
      {value && (
        <span
          onClick={!locked ? onRemove : undefined}
          style={{
            cursor: locked ? "default" : "pointer",
            userSelect: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
          }}
          title={locked ? "" : "Click to remove"}
        >
          {value}
        </span>
      )}
      {isWrong && <span className="error-mark-input-review3-p2-q1">✕</span>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Review3_Page2_Q1 = () => {
  const correctAnswers = ["rat", "cap", "ant", "bat", "dad", "pan"];
  const images = [bat, cap, ant, dad, ant2, dad2];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedWords = new Set(answers.filter(Boolean));

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveWord(active.id.replace("word-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || locked) return;

    const word = active.id.replace("word-", "");

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);

      setAnswers((prev) => {
        const updated = [...prev];
        const oldIndex = updated.findIndex((a) => a === word);
        if (oldIndex !== -1) updated[oldIndex] = "";
        updated[index] = word;
        return updated;
      });

      setWrongInputs([]);
    }
  };

  const onDragCancel = () => setActiveWord(null);

  // Click on placed word → return to bank
  const removeAnswer = (index) => {
    if (locked) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
    setWrongInputs([]);
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((ans) => ans === "")) {
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

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `);
  };

  const showAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", "", "", ""]);
    setWrongInputs([]);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
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
            display: "flex",
            flexDirection: "column",
        
          }}
        >
          <h5 className="header-title-page8">
            <span className="mr-2">D</span> Drag and drop.
          </h5>

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
                  gap: "40px",
              padding: "10px",
              border: "2px dashed #ccc",
              width: "100%",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {correctAnswers.map((word) => (
              <DraggableWord
                key={word}
                id={`word-${word}`}
                word={word}
                disabled={locked}
                isUsed={usedWords.has(word)}
              />
            ))}
          </div>

          {/* ── Images + Slots ─────────────────────────────────────────────── */}
          <div className="row-content10-review3-p2-q1">
            {images.map((img, index) => (
              <div className="row2-review3-p2-q1" key={index}>
                <img src={img} className="q-img-review3-p2-q1" alt="" />
                <DropSlot
                  index={index}
                  value={answers[index]}
                  isWrong={wrongInputs.includes(index)}
                  locked={locked}
                  onRemove={() => removeAnswer(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ────────────────────────────────────────────────────────── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            onClick={showAnswer}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ───────────────────────────────────────────────────── */}
      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "#fff",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(0,0,0,.2)",
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

export default Review3_Page2_Q1;
