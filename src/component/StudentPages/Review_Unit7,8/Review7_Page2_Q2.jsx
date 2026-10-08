import React, { useState } from "react";
import deer from "../../../assets/unit8/imgs/U8P71EXEE.svg";
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
  pointerWithin,
} from "@dnd-kit/core";
import "./Review7_Page2_Q2.css";

const data = [
  { question: "", correct: "house" },
  { question: "", correct: "hat" },
  { question: "", correct: "window" },
  { question: "", correct: "woman" },
  { question: "", correct: "hand" },
];

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
      className={`q-input-review7-p2-q2 ${isOver ? "drag-over-cell" : ""}`}
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
        width: "100%",
        border: `2px dashed ${isOver ? "#2c5287" : "#ccc"}`,
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

// ── المكوّن الرئيسي ───────────────────────────────────────────────────────────
const Review7_Page2_Q2 = () => {
  const [answers, setAnswers] = useState(Array(data.length).fill(null));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 8 } })
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

    if (answers.some((a) => !a || a.trim() === "")) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    let correctCount = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans.trim().toLowerCase() === data[i].correct.toLowerCase()) {
        correctCount++;
      } else {
        wrong.push(i);
      }
    });

    setWrongInputs(wrong);
    setShowAnswer(true);

    const color =
      correctCount === data.length
        ? "green"
        : correctCount === 0
        ? "red"
        : "orange";

    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${data.length}
        </span>
      </div>
    `;

    if (correctCount === data.length) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const reset = () => {
    setAnswers(Array(data.length).fill(null));
    setWrongInputs([]);
    setShowAnswer(false);
    setActiveId(null);
  };

  const showCorrectAnswers = () => {
    setAnswers(data.map((item) => item.correct));
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
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "40px" }}>
          <h3 className="header-title-page8">
            <span className="mr-2">E</span> Drag and drop the correct words to
            match the numbers.
          </h3>

          {/* ── Word bank: كل الكلمات دايماً موجودة، المستخدمة disabled ── */}
          <DroppableBank isDropDisabled={showAnswer}>
            {data.map((item) => {
              const isUsed = answers.includes(item.correct);
              return (
                <DraggableWord
                  key={item.correct}
                  word={item.correct}
                  disabled={showAnswer || isUsed}
                  isFaded={activeId === `word-${item.correct}`}
                />
              );
            })}
          </DroppableBank>

          <div className="content-review7-p2-q2">
            <div className="group-input-unit5-p5-q3">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="question-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    margin: "10px",
                  }}
                >
                  <span
                    className="q-number"
                    style={{
                      color: "#0d47a1",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    {index + 1}.
                  </span>

                  <div
                    className="question-text-review7-p2-q2"
                    style={{ position: "relative" }}
                  >
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
                      <span className="wrong-icon-review6-p1-q3">✕</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <img
              src={deer}
              className="shape-img-unit5-p5-q3"
              alt=""
              style={{ height: "240px", width: "auto" }}
            />
          </div>
        </div>

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

export default Review7_Page2_Q2;