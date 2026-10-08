import React, { useState } from "react";
import bat from "../../../assets/unit8/imgs/U8P72EXEB-01.svg";
import cap from "../../../assets/unit8/imgs/U8P72EXEB-02.svg";
import ant from "../../../assets/unit8/imgs/U8P72EXEB-03.svg";
import img4 from "../../../assets/unit8/imgs/U8P72EXEB-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review8_Page1_Q2.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
  pointerWithin,
} from "@dnd-kit/core";

// ── Draggable word chip ───────────────────────────────────────────────────────
function DraggableWord({ word, disabled, isFaded }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
    disabled,
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
        cursor: disabled ? "default" : "grab",
        touchAction: "none",
        opacity: isDragging || isFaded ? 0.35 : disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {word}
    </span>
  );
}

// ── Droppable slot ────────────────────────────────────────────────────────────
function DroppableSlot({ slotId, children, isDropDisabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id: slotId,
    disabled: isDropDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      className={`q-input-review8-p1-q2  ${isOver ? "drag-over-cell" : ""}`}
    >
      {children}
    </div>
  );
}

// ── Droppable bank ────────────────────────────────────────────────────────────
function DroppableBank({ children, isDropDisabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "bank",
    disabled: isDropDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        border: `2px dashed ${isOver ? "#2c5287" : "#ccc"}`,
        borderRadius: "10px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

// ── المكوّن الرئيسي ───────────────────────────────────────────────────────────
const Review8_Page1_Q2 = () => {
  const correctAnswers = ["hand", "nose", "eye", "head"];

  const rows = [
    { img: bat, label: "Raise your" },
    { img: cap, label: "Touch your" },
    { img: ant, label: "Close your" },
    { img: img4, label: "Touch your" },
  ];

  const [answers, setAnswers] = useState([null, null, null, null]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 8 },
    }),
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer) return;

    const word = active.id.replace("word-", "");

    if (over.id === "bank") {
      setAnswers((prev) => prev.map((a) => (a === word ? null : a)));
      return;
    }

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);
      setAnswers((prev) => {
        const updated = [...prev];
        const oldIndex = updated.findIndex((a) => a === word);
        if (oldIndex !== -1) updated[oldIndex] = null;
        updated[index] = word;
        return updated;
      });
      setWrongInputs([]);
    }
  };

  // كبس على الكلمة داخل الـ slot → ترجع للبنك
  const handleRemoveFromSlot = (index) => {
    if (showAnswer) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.some((ans) => !ans || ans.trim() === "")) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let correctCount = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) {
        correctCount++;
      } else {
        wrong.push(i);
      }
    });

    setWrongInputs(wrong);
    setShowAnswer(true);

    const total = correctAnswers.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const reset = () => {
    setAnswers([null, null, null, null]);
    setWrongInputs([]);
    setShowAnswer(false);
    setActiveId(null);
  };

  const handleShowAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setShowAnswer(true);
  };

  const dragWord = activeId ? activeId.replace("word-", "") : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
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
        <div
          className="div-forall"
          style={{
            gap: "40px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="mr-2">B</span> Drag and drop the correct words to
            match the numbers.
          </h5>

          {/* ── Word bank: كل الكلمات دايماً موجودة، المستخدمة disabled ── */}
          <DroppableBank isDropDisabled={showAnswer}>
            {correctAnswers.map((word) => {
              const isUsed = answers.includes(word);
              return (
                <DraggableWord
                  key={word}
                  word={word}
                  disabled={showAnswer || isUsed}
                  isFaded={activeId === `word-${word}`}
                />
              );
            })}
          </DroppableBank>

          <div
            className="row-content10-review8-p1-q2 w-full"
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            {rows.map((row, index) => (
              <div className="row2-review8-p1-q2" key={index}>
                <span
                  style={{
                    color: "#2c5287",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  {index + 1}
                </span>
                <img src={row.img} alt="" className="q-img-unit3-page6-q1" />
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    alignSelf: "center",
                  }}
                >
                  {row.label}
                </span>
                <div className="input-wrapper-review8-p1-q2">
                  <DroppableSlot
                    slotId={`slot-${index}`}
                    isDropDisabled={showAnswer}
                  >
                    {answers[index] && (
                      <span
                        onClick={() => handleRemoveFromSlot(index)}
                        style={{ cursor: showAnswer ? "default" : "pointer" }}
                      >
                        {answers[index]}
                      </span>
                    )}
                  </DroppableSlot>

                  {wrongInputs.includes(index) && (
                    <span className="error-mark-input-review8-p1-q2">✕</span>
                  )}
                </div>
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

      {/* ── Drag overlay ── */}
      <DragOverlay>
        {dragWord && (
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
            {dragWord}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Review8_Page1_Q2;
