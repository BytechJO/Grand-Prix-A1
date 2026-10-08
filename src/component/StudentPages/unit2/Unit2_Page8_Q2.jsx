import React, { useState } from "react";
import deer from "../../../assets/unit1/imgs/deer flip.svg";
import taxi from "../../../assets/unit1/imgs/taxi_1.svg";
import table from "../../../assets/unit1/imgs/table2.jpg";
import dish from "../../../assets/unit1/imgs/dish3.jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit2_Page8_Q2.css";

import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

// ─────────────────────────────────────────────
// Draggable word chip
// ─────────────────────────────────────────────
function DraggableWord({ word, isUsed }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
    disabled: isUsed,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`word-item-unit2-p8-q2 ${isUsed ? "used" : ""}`}
      style={{
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        cursor: isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : 1,
        display: "inline-block",
          touchAction:"none"
      }}
    >
      {word}
    </span>
  );
}

// ─────────────────────────────────────────────
// Droppable inline slot
// ─────────────────────────────────────────────
function DroppableSlot({ id, value, isWrong, onClick }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <span className="drop-slot-wrapper-unit2-p8-q2">
      <span
        ref={setNodeRef}
        onClick={value ? onClick : undefined}
        className={[
          "drop-slot-inline-unit2-p8-q2 ",
          isWrong ? "wrong" : "",
          isOver ? "drag-over-cell" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </span>
      {isWrong && <span className="error-mark-input">✕</span>}
    </span>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
const Unit2_Page8_Q2 = () => {
  const correctAnswers = ["deer", "taxi", "table", "dish"];

  const rows = [
    { before: "The", after: "is brown.", img: deer, alt: "deer" },
    { before: "My brother takes a", after: ".", img: taxi, alt: "taxi" },
    { before: "The", after: "is round.", img: table, alt: "table" },
    { before: "The", after: "is white.", img: dish, alt: "dish" },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [usedWords, setUsedWords] = useState([]);
  const [wrongInput, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // ── Sensors ──
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  // ── Drag handlers ──
  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer) return;

    const overId = over.id;
    if (!overId.startsWith("slot-")) return;

    const newIndex = Number(overId.split("-")[1]);
    const word = active.id.replace("word-", "");

    const updated = [...answers];

    // إذا كانت الكلمة موجودة بمكان ثاني احذفها من هناك
    const oldIndex = updated.findIndex((ans) => ans === word);
    if (oldIndex !== -1) {
      updated[oldIndex] = "";
    }

    // إذا كان السلوّت فيه كلمة مسبقاً رجعها للبنك
    updated[newIndex] = word;

    setAnswers(updated);
    setWrongInputs([]);
  };

  // ── Check ──
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
      else wrong.push(ans);
    });

    setWrongInputs(wrong);
    setUsedWords(correctAnswers);

    const color = score === 4 ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === 4 ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${score} / 4</span>
      </div>
    `);
  };

  // ── Show Answer ──
  const showAnswerFun = () => {
    setAnswers(correctAnswers);
    setUsedWords(correctAnswers);
    setWrongInputs([]);
    setShowAnswer(true);
  };

  // ── Reset ──
  const reset = () => {
    setAnswers(["", "", "", ""]);
    setUsedWords([]);
    setWrongInputs([]);
    setShowAnswer(false);
  };

  // Active word label for overlay
  const activeWord = activeId ? activeId.replace("word-", "") : null;
  const removeWordFromSlot = (index) => {
    if (showAnswer) return;

    const updated = [...answers];
    updated[index] = "";

    setAnswers(updated);
    setWrongInputs([]);
  };
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
        <div className="div-forall" style={{ gap: "20px" }}>
          <h5 className="header-title-page8">
            <span className="mr-2">E</span> Read and drag the words to complete
            the sentences.
          </h5>

          {/* ── Word bank ── */}
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
            }}
          >
            {correctAnswers.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                isUsed={answers.includes(word)}
              />
            ))}
          </div>

          {/* ── Sentences ── */}
          <div className="row-content22">
            {rows.map((row, i) => (
              <div key={i} className="row2">
                <span className="text-[18px]">
                  <span className="num-span">{i + 1}</span> {row.before}{" "}
                  <DroppableSlot
                    id={`slot-${i}`}
                    value={answers[i]}
                    isWrong={wrongInput.includes(answers[i])}
                    onClick={() => removeWordFromSlot(i)}
                  />
                  {row.after}
                </span>
                <img src={row.img} alt={row.alt} className="q-img" />
              </div>
            ))}
          </div>

          {/* ── Buttons ── */}
          <div className="action-buttons-container">
            <button onClick={reset} className="try-again-button">
              Start Again ↻
            </button>
            <button
              onClick={showAnswerFun}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
              Check Answer ✓
            </button>
          </div>
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
              fontSize: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {activeWord}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit2_Page8_Q2;
