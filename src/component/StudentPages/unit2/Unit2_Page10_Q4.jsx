import React, { useState } from "react";
import pizza2 from "../../../assets/img_unit2/imgs/Pizza (2).jpg";
import boy from "../../../assets/img_unit2/imgs/boy 02.png";
import paint from "../../../assets/img_unit2/imgs/Paint.jpg";
import pincle from "../../../assets/img_unit2/imgs/Pencel.jpg";
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
import "./Unit2_Page10_Q4.css";

// ─── Draggable Letter (Word Bank) ─────────────────────────────────────────────
// هون الحروف ممكن تتكرر (p, b) فما في مفهوم "used" مثل الكلمات
// لأن نفس الحرف ممكن يستخدم في أكثر من سلوت بنفس الوقت
const DraggableWord = ({ id, letter, disabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
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
        opacity: isDragging ? 0.4 : 1,
        display: "inline-block",
        userSelect: "none",
          touchAction:"none",
        transition: "opacity 0.2s ease",
      }}
    >
      {letter}
    </span>
  );
};

// ─── Droppable Slot ────────────────────────────────────────────────────────────
const DropSlot = ({ index, value, isWrong, showAnswer, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div
      ref={setNodeRef}
      className={`q-input10-unit2-p10-q4 ${showAnswer ? "show-answer-red1" : ""} ${isOver ? "drag-over-cell" : ""}`}
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
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit2_Page10_Q4 = () => {
  const correctAnswers = ["p", "b", "p", "p"];
  const wordBank = ["p", "b"];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);

  const images = [paint, boy, pizza2, pincle];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    // active.id = "bank-p" or "bank-b"
    setActiveLetter(active.id.replace("bank-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveLetter(null);
    if (!over || showAnswer || checked) return;

    const letter = active.id.replace("bank-", "");

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);
      const updated = [...answers];
      updated[index] = letter;
      setAnswers(updated);
      setWrongInputs([]);
    }
  };

  const onDragCancel = () => setActiveLetter(null);

  // Click on placed letter → remove it
  const removeAnswer = (index) => {
    if (checked || showAnswer) return;
    const updated = [...answers];
    updated[index] = "";
    setAnswers(updated);
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
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "50px" }}>
          <h5 className="header-title-page8">
            <span className="mr-2">G</span> Look and drag the starting letter.
          </h5>

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              width: "90%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {wordBank.map((letter, index) => (
              <DraggableWord
                key={`${letter}-${index}`}
                id={`bank-${letter}`}
                letter={letter}
                disabled={checked || showAnswer}
              />
            ))}
          </div>

          {/* ── Slots + Images ─────────────────────────────────────────────── */}
          <div className="row-content10-1">
            {answers.map((value, index) => (
              <div key={index} className="row2">
                <span
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span className="num-span">{index + 1}</span>
                  <div className="input-wrapper">
                    <DropSlot
                      index={index}
                      value={value}
                      isWrong={wrongInputs.includes(index)}
                      showAnswer={showAnswer}
                      onRemove={() => removeAnswer(index)}
                    />
                    {wrongInputs.includes(index) && !showAnswer && (
                      <span className="error-mark-input">✕</span>
                    )}
                  </div>
                </span>
                <img src={images[index]} alt="" className="q-img10" />
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

      {/* ── Drag Overlay ───────────────────────────────────────────────────── */}
      <DragOverlay>
        {activeLetter ? (
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
            {activeLetter}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit2_Page10_Q4;
