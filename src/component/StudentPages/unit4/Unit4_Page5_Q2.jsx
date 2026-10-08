import React, { useState } from "react";
import bat from "../../../assets/unit4/imgs/U4P32ExeA2-01.svg";
import cap from "../../../assets/unit4/imgs/U4P32ExeA2-02.svg";
import ant from "../../../assets/unit4/imgs/U4P32ExeA2-03.svg";
import dad from "../../../assets/unit4/imgs/U4P32ExeA2-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit4_Page5_Q2.css";
import sound from "../../../assets/unit4/sounds/U4P32EXEA2.mp3";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─── Draggable Letter (Word Bank) ─────────────────────────────────────────────
// f و v ممكن يتكررا في أكثر من سلوت، فما في isUsed هون
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
        fontSize: "22px",
        opacity: isDragging ? 0.4 : 1,
        display: "inline-block",
        userSelect: "none",
        transition: "opacity 0.2s ease",
          touchAction:"none"
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
    <div className="input-wrapper-unit3-page6-q1">
      <div
        ref={setNodeRef}
        className={`q-input-unit3-page6-q1 ${isOver ? "drag-over-cell" : ""}`}
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
              fontWeight: "bold",
            }}
            title={showAnswer ? "" : "Click to remove"}
          >
            {value}
            
          </span>
        )}
      </div>
      {isWrong && <span className="error-mark-input">✕</span>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit4_Page5_Q2 = () => {
  const correctAnswers = ["f", "v", "v", "f"];
  const images = [bat, cap, ant, dad];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [checked, setChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);

  const stopAtSecond = 11.13;
  const captions = [
    {
      start: 0,
      end: 11.13,
      text: "page 32 Right activities exercise A number 2 does it begin with f or v listen and write ",
    },
    { start: 11.15, end: 13.17, text: "1. frog" },
    { start: 13.19, end: 15.14, text: "2. violin" },
    { start: 15.16, end: 17.29, text: "3. vase" },
    { start: 17.31, end: 20.06, text: "4. father" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveLetter(active.id.replace("bank-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveLetter(null);
    if (!over || showAnswer || checked) return;

    const value = active.id.replace("bank-", "");

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);
      const updated = [...answers];
      updated[index] = value;
      setAnswers(updated);
      setWrongInputs([]);
    }
  };

  const onDragCancel = () => setActiveLetter(null);

  // Click on placed letter → remove it
  const removeAnswer = (index) => {
    if (showAnswer || checked) return;
    const updated = [...answers];
    updated[index] = "";
    setAnswers(updated);
    setWrongInputs([]);
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setShowAnswer(true);
    setChecked(true);
  };

  const checkAnswers = () => {
    if (showAnswer) return;

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
    setChecked(true);

    const total = correctAnswers.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `);
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
          padding: "35px",
        }}
      >
        <div className="div-forall" style={{ gap: "30px" }}>
          <h5 className="header-title-page8">
            <span className="mr-2" style={{ color: "purple" }}>
              2
            </span>
            Does it begin with <span style={{ color: "red" }}>f</span> or{" "}
            <span style={{ color: "red" }}>v</span>? Tap or click the beginning
            letter
          </h5>

          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              width: "100%",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {["f", "v"].map((letter) => (
              <DraggableWord
                key={letter}
                id={`bank-${letter}`}
                letter={letter}
                disabled={showAnswer || checked}
              />
            ))}
          </div>

          {/* ── Slots + Images ─────────────────────────────────────────────── */}
          <div className="row-content10-unit4-page5-q2">
            {images.map((img, index) => (
              <div className="row2-unit3-page6-q1" key={index}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <span className="num-span">{index + 1}</span>
                  <img src={img} alt="" className="q-img-unit3-page6-q1" />
                </div>
                <span style={{ position: "relative", display: "flex" }}>
                  <DropSlot
                    index={index}
                    value={answers[index]}
                    isWrong={wrongInputs.includes(index)}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer(index)}
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
        {activeLetter ? (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "#fff",
              fontWeight: "bold",
              fontSize: "22px",
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

export default Unit4_Page5_Q2;
