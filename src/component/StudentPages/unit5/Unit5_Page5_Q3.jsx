import React, { useState } from "react";
import deer from "../../../assets/unit5/imgs/U5P44EXEB.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit5_Page5_Q3.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const data = [
  { correct: "poster" },
  { correct: "board"  },
  { correct: "book"   },
  { correct: "desk"   },
];

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
const DropSlot = ({ index, value, isWrong, showAnswer, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div
      className="question-text-unit5-p5-q3"
      style={{ display: "flex", alignItems: "center", position: "relative" }}
    >
      <div
        ref={setNodeRef}
        className={`q-input-unit5-p5-q3 ${isOver ? "drag-over-cell" : ""}`}
      >
        {value && (
          <span
            onClick={!showAnswer ? onRemove : undefined}
            style={{
              cursor: showAnswer ? "default" : "pointer",
              userSelect: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
            }}
            title={showAnswer ? "" : "Click to remove"}
          >
            {value}
           
          </span>
        )}
      </div>
      {isWrong && (
        <span className="wrong-icon-unit5-p5-q3">✕</span>
      )}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit5_Page5_Q3 = () => {
  const [answers, setAnswers]         = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer]   = useState(false);
  const [activeWord, setActiveWord]   = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const usedWords = new Set(answers.filter(Boolean));

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveWord(active.id.replace("word-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || showAnswer) return;

    const word  = active.id.replace("word-", "");
    const index = Number(over.id.replace("slot-", ""));

    if (!over.id.startsWith("slot-")) return;

    setAnswers((prev) => {
      const updated = [...prev];
      const oldIndex = updated.findIndex((a) => a === word);
      if (oldIndex !== -1) updated[oldIndex] = "";
      updated[index] = word;
      return updated;
    });

    setWrongInputs([]);
  };

  const onDragCancel = () => setActiveWord(null);

  // Click on placed word → return to bank
  const removeAnswer = (index) => {
    if (showAnswer) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
    setWrongInputs([]);
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.some((a) => a.trim() === "")) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    let wrong = [];
    let correctCount = 0;

    answers.forEach((ans, i) => {
      if (ans.trim().toLowerCase() === data[i].correct.toLowerCase()) correctCount++;
      else wrong.push(i);
    });

    setWrongInputs(wrong);
    setShowAnswer(true);

    const color =
      correctCount === data.length ? "green" : correctCount === 0 ? "red" : "orange";

    ValidationAlert[
      correctCount === data.length ? "success" : correctCount === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${data.length}
        </span>
      </div>
    `);
  };

  const handleShowAnswer = () => {
    setAnswers(data.map((item) => item.correct));
    setWrongInputs([]);
    setShowAnswer(true);
  };

  const reset = () => {
    setAnswers(Array(data.length).fill(""));
    setWrongInputs([]);
    setShowAnswer(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
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
          <h3 className="header-title-page8">
            <span className="ex-A">B</span>
            Drag the words to the correct number.
          </h3>

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
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
              <DraggableWord
                key={item.correct}
                id={`word-${item.correct}`}
                word={item.correct}
                disabled={showAnswer}
                isUsed={usedWords.has(item.correct)}
              />
            ))}
          </div>

          {/* ── Image + Slots ──────────────────────────────────────────────── */}
          <div className="content-unit5-p5-q3">
            <img
              src={deer}
              className="shape-img-unit5-p5-q3"
              alt=""
              style={{ height: "320px", width: "auto" }}
            />
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
                  }}
                >
                  <span
                    className="q-number"
                    style={{ color: "#0d47a1", fontWeight: "600", fontSize: "20px" }}
                  >
                    {index + 1}
                  </span>
                  <DropSlot
                    index={index}
                    value={answers[index]}
                    isWrong={wrongInputs.includes(index)}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Buttons ────────────────────────────────────────────────────────── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answers ✓
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

export default Unit5_Page5_Q3;