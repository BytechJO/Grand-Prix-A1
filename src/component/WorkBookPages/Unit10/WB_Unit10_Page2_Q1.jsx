import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import q1Img from "../../../assets/U1 WB/U10/U10P58EXEC-01.svg";
import q2Img from "../../../assets/U1 WB/U10/U10P58EXEC-02.svg";
import q3Img from "../../../assets/U1 WB/U10/U10P58EXEC-03.svg";
import "./WB_Unit10_Page2_Q1.css";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Draggable Word Chip ──────────────────────────────────────────────────────
const DraggableWord = ({ id, text, disabled, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isUsed,
    data: { text },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "6px 12px",
        border: `2px solid ${isUsed ? "#c0c0c0" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#f0f0f0" : "white",
        color: isUsed ? "#bbb" : "inherit",
        cursor: disabled || isUsed ? "default" : "grab",
        fontWeight: "600",
        opacity: isDragging ? 0.4 : 1,
        touchAction: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
      }}
    >
      {text}
    </div>
  );
};

// ─── Word Bank ────────────────────────────────────────────────────────────────
const WordBank = ({ wordBank, locked, usedValues }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "bank" });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        gap: "12px",
        padding: "10px",
        width: "100%",
        border: "2px dashed #ccc",
        borderRadius: "10px",
        marginBottom: "20px",
        justifyContent: "center",
        background: isOver ? "#f0f8ff" : "transparent",
        transition: "background 0.2s",
      }}
    >
      {wordBank.map((w) => (
        <DraggableWord
          key={w}
          id={w}
          text={w}
          disabled={locked}
          isUsed={usedValues.has(w)}
        />
      ))}
    </div>
  );
};

// ─── Inline Droppable Cell ────────────────────────────────────────────────────
const DroppableCell = ({ id, value, isWrong, locked, onClear }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        ref={setNodeRef}
        className={`line-input-wb-unit10-p2-q1 ${isOver ? "drag-over-cell" : ""}`}
        onClick={() => {
          if (!locked && value) onClear();
        }}
        style={{
          background: isOver && !locked ? "#e3f2fd" : "white",
          display: "inline-block",
          minWidth: "120px",
          padding: "4px",
          cursor: !locked && value ? "pointer" : "default",
          transition: "background 0.2s",
        }}
        title={!locked && value ? "Click to return to bank" : ""}
      >
        {value}
      </span>
      {isWrong && <span className="wrong-circle-x-wb-unit10-p2-q1">✕</span>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit10_Page2_Q1 = () => {
  const correctAnswers = {
    q2_question: "want ice cream",
    q2_answer: "I do",
    q3_question: "Do you want",
    q3_answer: "I don't",
  };

  const wordBank = ["want ice cream", "I do", "Do you want", "I don't"];

  const emptyAnswers = {
    q2_question: "",
    q2_answer: "",
    q3_question: "",
    q3_answer: "",
  };

  const [answers, setAnswers] = useState(emptyAnswers);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // القيم الموجودة حالياً في الخانات
  const usedValues = new Set(Object.values(answers).filter(Boolean));

  // ─── Drag Handlers ──────────────────────────────────────────────────────────
  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word = active.id;
    const destId = String(over.id);

    if (destId === "bank") {
      // رجع على البانك → شيله من خانته
      setAnswers((prev) => {
        const copy = { ...prev };
        Object.keys(copy).forEach((k) => {
          if (copy[k] === word) copy[k] = "";
        });
        return copy;
      });
      setWrongInputs([]);
      return;
    }

    // نزل على خانة → ضعه فيها وشيله من أي خانة ثانية
    if (Object.keys(correctAnswers).includes(destId)) {
      setAnswers((prev) => {
        const copy = { ...prev };
        // شيل الكلمة من مكانها القديم
        Object.keys(copy).forEach((k) => {
          if (copy[k] === word) copy[k] = "";
        });
        copy[destId] = word;
        return copy;
      });
      setWrongInputs([]);
    }
  };

  // ─── Click على خانة مليانة → ارجع للبانك ───────────────────────────────────
  const handleClear = (key) => {
    setAnswers((prev) => ({ ...prev, [key]: "" }));
    setWrongInputs([]);
  };

  // ─── Buttons ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;
    if (Object.values(answers).some((v) => v.trim() === "")) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    let wrong = [],
      score = 0;
    Object.keys(correctAnswers).forEach((key) => {
      if (
        answers[key].trim().toLowerCase() === correctAnswers[key].toLowerCase()
      )
        score++;
      else wrong.push(key);
    });
    setWrongInputs(wrong);
    setLocked(true);
    const total = Object.keys(correctAnswers).length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center"><b style="color:${color}">Score: ${score}/${total}</b></div>`;
    score === total
      ? ValidationAlert.success(msg)
      : score === 0
        ? ValidationAlert.error(msg)
        : ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(correctAnswers);
    setWrongInputs([]);
    setLocked(true);
  };

  const resetAll = () => {
    setAnswers(emptyAnswers);
    setWrongInputs([]);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
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
        <div className="div-forall" style={{ gap: "10px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">C</span> Drag and drop.
          </h5>

          {/* ── Word Bank ── */}
          <WordBank
            wordBank={wordBank}
            locked={locked}
            usedValues={usedValues}
          />

          {/* ── ROW 1 (example) ── */}
          <div className="conversation-row-wb-unit10-p2-q1 w-full">
            <span className="num-wb-unit10-p2-q1">1</span>
            <div className="bubble question-bubble-wb-unit10-p2-q1">
              Do you want chicken?
            </div>
            <img
              src={q1Img}
              alt="girl"
              className="person-img-wb-unit10-p2-q1"
            />
            <div className="bubble answer-bubble-wb-unit10-p2-q1">
              Yes, I do.
            </div>
          </div>

          {/* ── ROW 2 ── */}
          <div className="conversation-row-wb-unit10-p2-q1">
            <span className="num-wb-unit10-p2-q1">2</span>

            <div className="bubble question-bubble-wb-unit10-p2-q1">
              Do{" "}
              <DroppableCell
                id="q2_question"
                value={answers.q2_question}
                isWrong={wrongInputs.includes("q2_question")}
                locked={locked}
                onClear={() => handleClear("q2_question")}
              />
              ?
            </div>

            <img
              src={q2Img}
              alt="girl"
              className="person-img-wb-unit10-p2-q1"
            />

            <div className="bubble answer-bubble-wb-unit10-p2-q1">
              Yes,{" "}
              <DroppableCell
                id="q2_answer"
                value={answers.q2_answer}
                isWrong={wrongInputs.includes("q2_answer")}
                locked={locked}
                onClear={() => handleClear("q2_answer")}
              />
              .
            </div>
          </div>

          {/* ── ROW 3 ── */}
          <div className="conversation-row-wb-unit10-p2-q1">
            <span className="num-wb-unit10-p2-q1">3</span>

            <div className="bubble question-bubble-wb-unit10-p2-q1">
              <DroppableCell
                id="q3_question"
                value={answers.q3_question}
                isWrong={wrongInputs.includes("q3_question")}
                locked={locked}
                onClear={() => handleClear("q3_question")}
              />{" "}
              bread?
            </div>

            <img src={q3Img} alt="boy" className="person-img-wb-unit10-p2-q1" />

            <div className="bubble answer-bubble-wb-unit10-p2-q1">
              No,{" "}
              <DroppableCell
                id="q3_answer"
                value={answers.q3_answer}
                isWrong={wrongInputs.includes("q3_answer")}
                locked={locked}
                onClear={() => handleClear("q3_answer")}
              />
              .
            </div>
          </div>
        </div>
      </div>

      {/* ── Action Buttons ── */}
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

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeId ? (
          <div
            style={{
              padding: "6px 12px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "600",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit10_Page2_Q1;
