import React, { useState } from "react";
import deer from "../../../assets/unit4/imgs/U4P36EXED-01.svg";
import taxi from "../../../assets/unit4/imgs/U4P36EXED-02.svg";
import dish from "../../../assets/unit4/imgs/U4P36EXED-03.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review4_Page1_Q4.css";

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

const data = [
  { img: deer,  question: "Is it a green triangle? Yes,", correct: "it is" },
  { img: taxi,  question: "Is it a red square? No,",      correct: "it isn't" },
  { img: dish,  question: "Is it a blue ?",               correct: "square Yes, it is" },
];

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

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
        border: `2px solid ${isUsed ? "#b0b0b0" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: isUsed ? "#999" : undefined,
        cursor: isUsed || locked ? "not-allowed" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.35 : 1,
        transition: "opacity 0.2s, background 0.2s, border-color 0.2s, color 0.2s",
        userSelect: "none",
        touchAction: "none",
        display: "inline-block",
        pointerEvents: isUsed ? "none" : undefined,
      }}
    >
      {word}
    </span>
  );
};

// ─── Slot Drop Zone (Droppable) ───────────────────────────────────────────────

const SlotDropZone = ({ id, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`q-input-review4-p1-q4 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        // background: isOver ? "#e3f2fd" : undefined,
        cursor: value && !locked ? "pointer" : "default",
        transition: "background 0.15s",
        position: "relative",
      }}
      onClick={() => { if (value && !locked) onRemove(id); }}
      title={value && !locked ? "Click to remove" : ""}
    >
      {value || ""}

      {isWrong && (
        <span className="wrong-icon-review4-p1-q4">✕</span>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Review4_Page1_Q4 = () => {
  const [answers, setAnswers] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  const isWordUsed = (word) => answers.includes(word);

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word = active.id.replace("bank-", "");
    if (!over.id.startsWith("slot-")) return;

    const destIndex = Number(over.id.replace("slot-", ""));

    setAnswers((prev) => {
      const updated = [...prev];
      // شيل الكلمة من مكانها القديم
      const oldIndex = updated.findIndex((a) => a === word);
      if (oldIndex !== -1) updated[oldIndex] = "";
      updated[destIndex] = word;
      return updated;
    });

    setWrongInputs([]);
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
  };

  // ─── Check ────────────────────────────────────────────────────────────────

  const checkAnswers = () => {
    if (locked) return;
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

    const color = correctCount === data.length ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${data.length}
        </span>
      </div>`;

    if (correctCount === data.length) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setLocked(true);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────

  const reset = () => {
    setAnswers(Array(data.length).fill(""));
    setWrongInputs([]);
    setLocked(false);
  };

  // ─── Show Answer ──────────────────────────────────────────────────────────

  const showAnswer = () => {
    setAnswers(data.map((q) => q.correct));
    setWrongInputs([]);
    setLocked(true);
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
        <div className="div-forall" style={{ gap: "30px" }}>
          <h3 className="header-title-page8">
            <span className="mr-2">D</span> Drag and drop the correct words to
            complete the sentences.
          </h3>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {data.map((item) => (
              <BankChip
                key={item.correct}
                word={item.correct}
                isUsed={isWordUsed(item.correct)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          {data.map((item, index) => (
            <div className="question-row-review4-p1-q4" key={index}>
              <span className="q-number">{index + 1}.</span>

              <img
                src={item.img}
                className="shape-img"
                alt=""
                style={{ height: "100px", width: "100px" }}
              />

              <div className="question-text-review4-p1-q4">
                <h6>{item.question}</h6>

                <SlotDropZone
                  id={`slot-${index}`}
                  value={answers[index]}
                  isWrong={wrongInputs.includes(index)}
                  locked={locked}
                  onRemove={handleRemove}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button onClick={showAnswer} className="show-answer-btn swal-continue">
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

export default Review4_Page1_Q4;