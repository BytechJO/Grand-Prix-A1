import React, { useState } from "react";
import bat from "../../../assets/unit3/imgs3/P26exeA1-01.svg";
import cap from "../../../assets/unit3/imgs3/P26exeA1-02.svg";
import ant from "../../../assets/unit3/imgs3/P26exeA1-03.svg";
import dad from "../../../assets/unit3/imgs3/P26exeA1-04.svg";
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
import "./Unit3_Page5_Q1.css";

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
        height: "40px",
        width: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: isUsed ? "#f0f2f5" : "white",
        fontWeight: "bold",
        cursor: disabled || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.45 : 1,
        color: isUsed ? "#9aa3b0" : "inherit",
     touchAction:"none",
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
    <div className="input-wrapper-unit3-page6-q1">
      <div
        ref={setNodeRef}
        className={`q-input-unit3-page6-q1 ${showAnswer ? "show-answer-red" : ""} ${isOver ? "drag-over-cell" : ""}`}
      >
        {value && (
          <span
            className="word-item"
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
      {isWrong && !showAnswer && <span className="error-mark-input">✕</span>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit3_Page5_Q1 = () => {
  const correctAnswers = ["bat", "cap", "ant", "dad"];
  const wordBank = ["cap", "bat", "dad", "ant"];
  const images = [bat, cap, ant, dad];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // Words currently placed in a slot
  const usedWords = new Set(answers.filter(Boolean));

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveWord(active.id.replace("bank-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || showAnswer || checked) return;

    const word = active.id.replace("bank-", "");

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);

      setAnswers((prev) => {
        const updated = [...prev];

        // Remove word from any previous slot (no duplicates)
        const oldIndex = updated.findIndex((a) => a === word);
        if (oldIndex !== -1) updated[oldIndex] = "";

        updated[index] = word;
        return updated;
      });

      setWrongInputs([]);
    }
  };

  const onDragCancel = () => setActiveWord(null);

  // Click on placed word → return it to the bank
  const removeAnswer = (index) => {
    if (checked || showAnswer) return;
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
    setChecked(true);

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

  const handleShowAnswer = () => {
    setAnswers(correctAnswers);
    setWrongInputs([]);
    setShowAnswer(true);
    setChecked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", ""]);
    setWrongInputs([]);
    setShowAnswer(false);
    setChecked(false);
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
        <div className="div-forall" style={{ gap: "80px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">A</span>
            <span className="mr-2" style={{ color: "purple" }}>
              1
            </span>{" "}
            Drag the word to the picture.
          </h5>

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
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
            {wordBank.map((word) => (
              <DraggableWord
                key={word}
                id={`bank-${word}`}
                word={word}
                disabled={checked || showAnswer}
                isUsed={usedWords.has(word)}
              />
            ))}
          </div>

          {/* ── Slots + Images ─────────────────────────────────────────────── */}
          <div className="row-content10-unit3-page6-q1">
            {answers.map((value, i) => (
              <div className="row2-unit3-page6-q1" key={i}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <span className="num-span">{i + 1}</span>
                  <img
                    src={images[i]}
                    alt=""
                    className="q-img-unit3-page6-q1"
                  />
                </div>

                <span style={{ position: "relative", display: "flex" }}>
                  <DropSlot
                    index={i}
                    value={value}
                    isWrong={wrongInputs.includes(i)}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer(i)}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ────────────────────────────────────────────────────────── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn">
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

export default Unit3_Page5_Q1;
