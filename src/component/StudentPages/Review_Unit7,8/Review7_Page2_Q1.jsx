import React, { useState } from "react";
import bat from "../../../assets/unit8/imgs/U8P71EXED-01.svg";
import cap from "../../../assets/unit8/imgs/U8P71EXED-02.svg";
import ant from "../../../assets/unit8/imgs/U8P71EXED-03.svg";
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

import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page2_Q1.css";

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
      className={`write-input-unit4-page5-q1 ${isOver ? "drag-over-cell" : ""}`}
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
const Review7_Page2_Q1 = () => {
  const items = [
    { img: bat, correct: "w", correctInput: "window" },
    { img: cap, correct: "h", correctInput: "hat" },
    { img: ant, correct: "h", correctInput: "hand" },
  ];

  const [selected, setSelected] = useState(["", "", ""]);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
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
    if (!over || showCorrect) return;

    const word = active.id.replace("word-", "");

    if (over.id === "bank") {
      // أُسقطت على البنك → أزل من الـ slot (ترجع الكلمة تصبح غير مستخدمة)
      setAnswers((prev) => prev.map((a) => (a === word ? "" : a)));
      return;
    }

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);
      setAnswers((prev) => {
        const updated = [...prev];
        // أزل الكلمة من موقعها القديم إن وُجد
        const oldIndex = updated.findIndex((a) => a === word);
        if (oldIndex !== -1) updated[oldIndex] = "";
        updated[index] = word;
        return updated;
      });
      setShowResult(false);
    }
  };

  // كلمة موجودة في slot → اكبس عليها ترجع للبنك
  const handleRemoveFromSlot = (i) => {
    if (showCorrect || showResult) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[i] = "";
      return updated;
    });
  };

  const handleSelect = (value, index) => {
    if (showCorrect || showResult) return;
    const newSel = [...selected];
    newSel[index] = value;
    setSelected(newSel);
    setShowResult(false);
  };

  const showAnswers = () => {
    setSelected(items.map((item) => item.correct));
    setAnswers(items.map((item) => item.correctInput));
    setWrongInputs([]);
    setShowResult(true);
    setShowCorrect(true);
  };

  const resetAll = () => {
    setSelected(["", "", ""]);
    setAnswers(["", "", ""]);
    setWrongInputs([]);
    setShowResult(false);
    setShowCorrect(false);
    setActiveId(null);
  };

  const checkAnswers = () => {
    if (showCorrect || showResult) return;

    if (selected.some((s) => s === "")) {
      ValidationAlert.info("Please choose a circle (w or h) for all items!");
      return;
    }
    if (answers.some((a) => a.trim() === "")) {
      ValidationAlert.info("Please fill in all the writing boxes!");
      return;
    }

    let wrong = [];
    let score = 0;

    items.forEach((item, i) => {
      const circleCorrect = selected[i] === item.correct;
      const inputCorrect =
        answers[i].trim().toLowerCase() === item.correctInput.toLowerCase();

      if (circleCorrect) score++;
      if (inputCorrect) score++;
      if (!circleCorrect || !inputCorrect) wrong.push(i);
    });

    setWrongInputs(wrong);
    setShowResult(true);

    const total = items.length * 2;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
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
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span className="mr-2"> D</span> Does it begin with{" "}
            <span style={{ color: "red" }}>h </span>or{" "}
            <span style={{ color: "red" }}>w</span>? Listen, drag the word, and
            tap or click the letter.
          </h5>

          {/* ── Word bank: كل الكلمات دايماً موجودة، المستخدمة disabled ── */}
          <DroppableBank isDropDisabled={showResult}>
            {items.map((item) => {
              const isUsed = answers.includes(item.correctInput);
              return (
                <DraggableWord
                  key={item.correctInput}
                  word={item.correctInput}
                  disabled={showResult || isUsed}
                  isFaded={activeId === `word-${item.correctInput}`}
                />
              );
            })}
          </DroppableBank>

          {/* ── Question grid ── */}
          <div className="question-grid-review7-p2-q1 w-full">
            {items.map((item, i) => (
              <div className="question-box-unit4-page5-q1" key={i}>
                <img src={item.img} className="q-img-unit4-page5-q1" />

                {/* h / w choices */}
                <div className="choices-unit4-page5-q1">
                  {["h", "w"].map((letter) => (
                    <div className="circle-wrapper" key={letter}>
                      <div
                        className={`circle-choice-unit4-page5-q1 ${
                          selected[i] === letter ? "active" : ""
                        } ${showCorrect ? "correct-color" : ""}`}
                        onClick={() => handleSelect(letter, i)}
                      >
                        {letter}
                      </div>
                      {showResult &&
                        selected[i] === letter &&
                        selected[i] !== item.correct && (
                          <div className="wrong-mark">✕</div>
                        )}
                    </div>
                  ))}
                </div>

                {/* Drop slot */}
                <div className="input-wrapper">
                  <DroppableSlot
                    slotId={`slot-${i}`}
                    isDropDisabled={showResult}
                  >
                    {answers[i] && (
                      <span
                        onClick={() => handleRemoveFromSlot(i)}
                        style={{
                          cursor: showResult ? "default" : "pointer",
                        }}
                      >
                        {answers[i]}
                      </span>
                    )}
                  </DroppableSlot>

                  {answers[i].trim() !== "" &&
                    answers[i].trim().toLowerCase() !==
                      item.correctInput.toLowerCase() &&
                    wrongInputs.includes(i) && (
                      <div className="wrong-mark">✕</div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswers} className="show-answer-btn">
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

export default Review7_Page2_Q1;
