import React, { useState } from "react";
import bat from "../../../assets/unit4/imgs/U4P32ExeA1-01.svg";
import cap from "../../../assets/unit4/imgs/U4P32ExeA1-02.svg";
import ant from "../../../assets/unit4/imgs/U4P32ExeA1-03.svg";
import dad from "../../../assets/unit4/imgs/U4P32ExeA1-04.svg";
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
import "./Unit4_Page5_Q1.css";

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
          touchAction:"none"
      }}
    >
      {word}
    </span>
  );
};

// ─── Droppable Slot ────────────────────────────────────────────────────────────
const DropSlot = ({ index, value, showCorrect, isWrong, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div className="input-wrapper-unit4-page5-q1">
      <div
        ref={setNodeRef}
        className={`write-input-unit4-page5-q1 ${showCorrect ? "correct-color" : ""} ${isOver ? "drag-over-cell" : ""}`}
      >
        {value && (
          <span
            className="word-item"
            onClick={!showCorrect ? onRemove : undefined}
            style={{
              cursor: showCorrect ? "default" : "pointer",
              userSelect: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
            }}
            title={showCorrect ? "" : "Click to remove"}
          >
            {value}
            
          </span>
        )}
      </div>
      {isWrong && <div className="wrong-mark-unit4-page5-q1 ">✕</div>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit4_Page5_Q1 = () => {
  const items = [
    { img: bat, correct: "v", correctInput: "vet" },
    { img: cap, correct: "f", correctInput: "feet" },
    { img: ant, correct: "f", correctInput: "fish" },
    { img: dad, correct: "f", correctInput: "fork" },
  ];

  const wordBank = items.map((i) => i.correctInput);

  const [selected, setSelected] = useState(["", "", "", ""]);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedWords = new Set(answers.filter(Boolean));

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveWord(active.id.replace("bank-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || showCorrect || checked) return;

    const word = active.id.replace("bank-", "");

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);

      setAnswers((prev) => {
        const updated = [...prev];
        const oldIndex = updated.findIndex((a) => a === word);
        if (oldIndex !== -1) updated[oldIndex] = "";
        updated[index] = word;
        return updated;
      });

      setShowResult(false);
    }
  };

  const onDragCancel = () => setActiveWord(null);

  // Click on placed word → return to bank
  const removeAnswer = (index) => {
    if (showCorrect || checked) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
    setShowResult(false);
  };

  // ─── Circle select ──────────────────────────────────────────────────────────
  const handleSelect = (value, index) => {
    if (showCorrect|| checked) return;
    const newSel = [...selected];
    newSel[index] = value;
    setSelected(newSel);
    setShowResult(false);
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showCorrect|| checked) return;

    if (selected.some((s) => s === "")) {
      ValidationAlert.info("Please choose a circle (f or v) for all items!");
      return;
    }
    if (answers.some((a) => a === "")) {
      ValidationAlert.info("Please fill in all the writing boxes!");
      return;
    }

    let wrong = [];
    let score = 0;

    items.forEach((item, i) => {
      const circleCorrect = selected[i] === item.correct;
      const inputCorrect =
        answers[i].toLowerCase() === item.correctInput.toLowerCase();

      if (circleCorrect) score++;
      if (inputCorrect) score++;
      if (!circleCorrect || !inputCorrect) wrong.push(i);
    });

    setWrongInputs(wrong);
    setShowResult(true);
    setChecked(true);

    const total = items.length * 2;
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

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.correctInput));
    setWrongInputs([]);
    setShowResult(true);
    setShowCorrect(true);
    setChecked(true);
  };

  const resetAll = () => {
    setSelected(["", "", "", ""]);
    setAnswers(["", "", "", ""]);
    setWrongInputs([]);
    setShowResult(false);
    setShowCorrect(false);
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
        <div className="div-forall" style={{ gap: "30px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">A</span>{" "}
            <span style={{ color: "purple" }}>1</span>Does it begin with ‘f’ or ‘v’? Tap or click the beginning letter
          </h5>

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "50px",
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
                disabled={showCorrect || checked}
                isUsed={usedWords.has(word)}
              />
            ))}
          </div>

          {/* ── Questions Grid ─────────────────────────────────────────────── */}
          <div className="question-grid-unit4-page5-q1">
            {items.map((item, i) => (
              <div className="question-box-unit4-page5-q1" key={i}>
                <img src={item.img} className="q-img-unit4-page5-q1" alt="" />

                {/* f / v circles */}
                <div className="choices-unit4-page5-q1">
                  {["f", "v"].map((letter) => (
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
                          <div className="wrong-mark-unit4-page5-q1 ">✕</div>
                        )}
                    </div>
                  ))}
                </div>

                {/* Drop Slot */}
                <DropSlot
                  index={i}
                  value={answers[i]}
                  showCorrect={showCorrect}
                  isWrong={
                    showResult &&
                    answers[i] !== "" &&
                    answers[i].toLowerCase() !==
                      item.correctInput.toLowerCase() &&
                    wrongInputs.includes(i)
                  }
                  onRemove={() => removeAnswer(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ────────────────────────────────────────────────────────── */}
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

export default Unit4_Page5_Q1;
