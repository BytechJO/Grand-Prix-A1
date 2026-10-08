import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U10/U10P61EXEI-01.svg";
import cap from "../../../assets/U1 WB/U10/U10P61EXEI-02.svg";
import ant from "../../../assets/U1 WB/U10/U10P61EXEI-03.svg";
import dad from "../../../assets/U1 WB/U10/U10P61EXEI-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import "./WB_Unit10_Page5_Q1.css";

// ─── Word chip in the bank ────────────────────────────────────────────────────
const BankChip = ({ word, used, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank::${word}`,
    disabled: used || locked,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "6px 12px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: used ? "#e0e0e0" : "white",
        fontWeight: "600",
        cursor: used || locked ? "not-allowed" : "grab",
        opacity: isDragging ? 0.3 : used ? 0.45 : 1,
        userSelect: "none",
        transition: "opacity 0.2s, background 0.2s",
        color: used ? "#aaa" : "",
        // textDecoration: used ? "line-through" : "none",
        touchAction:"none",
        pointerEvents: used || locked ? "none" : "auto",
      }}
    >
      {word}
    </div>
  );
};

// ─── Drop zone inside a sentence ──────────────────────────────────────────────
const DropCell = ({ id, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });

  return (
    <div
      ref={setNodeRef}
      className={`inline-input-wb-unit8-p1-q2 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        minHeight: "40px",
        minWidth: "140px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        // borderRadius: "8px",
        background: isOver ? "#e3f2fd" : "white",
        borderBottom: `2px solid black`,
        transition: "background 0.15s, border-color 0.15s",
        gap: "6px",
        width: "100%",
      }}
    >
      <span
        onClick={onRemove}
        style={{ fontWeight: 600, cursor: "pointer", flex: 1 }}
      >
        {value || ""}
      </span>

      {/* ✕ علامة الخطأ بعد التصحيح */}
      {isWrong && locked && (
        <span className="error-mark-input-wb-unit2-page3-q2">✕</span>
      )}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
const WB_Unit10_Page5_Q1 = () => {
  const questions = [
    {
      img: bat,
      text: "Do you want ice cream?",
      parts: [
        { type: "text", value: "Yes, " },
        { type: "input", answer: "I want ice cream" },
        { type: "text", value: "." },
      ],
    },
    {
      img: cap,
      text: "Do you want bread?",
      parts: [
        { type: "text", value: "No, " },
        { type: "input", answer: "I want fruit" },
        { type: "text", value: "." },
      ],
    },
    {
      img: ant,
      text: "Do you want an apple?",
      parts: [
        { type: "input", answer: "No, I want milk" },
        { type: "text", value: "." },
      ],
    },
    {
      img: dad,
      text: "Do you want chicken?",
      parts: [
        { type: "input", answer: "Yes, I want chicken" },
        { type: "text", value: "." },
      ],
    },
  ];

  const wordBank = [
    "I want ice cream",
    "I want fruit",
    "No, I want milk",
    "Yes, I want chicken",
  ];

  const [answers, setAnswers] = useState(
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null))),
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedWords = answers.flat().filter(Boolean);

  // ─── إرجاع كلمة للبنك ──────────────────────────────────────────────────────
  const removeWord = (qIndex, pIndex) => {
    setAnswers((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[qIndex][pIndex] = "";
      return copy;
    });
    setWrongInputs([]);
  };

  // ─── Drag start ────────────────────────────────────────────────────────────
  const handleDragStart = (event) => {
    const rawId = event.active.id;
    const word = rawId.startsWith("bank::")
      ? rawId.replace("bank::", "")
      : null;
    setActiveWord(word);
  };

  // ─── Drag end ──────────────────────────────────────────────────────────────
  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over) return;

    const rawId = active.id;
    const word = rawId.startsWith("bank::")
      ? rawId.replace("bank::", "")
      : null;
    if (!word) return;

    const dest = over.id;
    if (!dest.startsWith("drop-")) return;

    const [, qStr, pStr] = dest.split("-");
    const qIndex = Number(qStr);
    const pIndex = Number(pStr);

    setAnswers((prev) => {
      const copy = prev.map((r) => [...r]);

      // شيل الكلمة من أي مكان قديم
      copy.forEach((row, qi) =>
        row.forEach((val, pi) => {
          if (val === word) copy[qi][pi] = "";
        }),
      );

      copy[qIndex][pIndex] = word;
      return copy;
    });

    setWrongInputs([]);
  };

  // ─── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    for (let qi = 0; qi < questions.length; qi++) {
      for (let pi = 0; pi < questions[qi].parts.length; pi++) {
        if (questions[qi].parts[pi].type === "input" && !answers[qi][pi]) {
          ValidationAlert.info(`Please complete question ${qi + 1}.`);
          return;
        }
      }
    }

    let wrong = [];
    let score = 0;
    let total = 0;

    questions.forEach((q, qi) =>
      q.parts.forEach((p, pi) => {
        if (p.type === "input") {
          total++;
          if (answers[qi][pi]?.trim() === p.answer) score++;
          else wrong.push(`${qi}-${pi}`);
        }
      }),
    );

    setWrongInputs(wrong);
    setLocked(true);
    const msg = `Score: ${score} / ${total}`;
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(
      questions.map((q) =>
        q.parts.map((p) => (p.type === "input" ? p.answer : null)),
      ),
    );
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(
      questions.map((q) =>
        q.parts.map((p) => (p.type === "input" ? "" : null)),
      ),
    );
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
        className="question-wrapper-unit3-page6-q1"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall mb-15">
          <h5 className="header-title-page8">
            <span className="ex-A">I</span> Drag and drop.
          </h5>

          {/* ─── Word Bank ──────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              width: "100%",
              padding: "12px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {wordBank.map((word) => (
              <BankChip
                key={word}
                word={word}
                used={usedWords.includes(word)}
                locked={locked}
              />
            ))}
          </div>

          {/* ─── Questions ──────────────────────────────────────────────── */}
          <div className="content-container-wb-unit4-p1-q2 w-full">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="row2-wb-unit10-p5-q1">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <span className="num-span">{qIndex + 1}</span>
                    <p style={{ fontSize: "20px", fontWeight: "500" }}>
                      {q.text}
                    </p>
                  </div>
                  <img src={q.img} alt="" className="q-img-wb-unit10-p5-q1" />
                </div>

                <div className="sentence-wrapper-wb-unit10-p5-q1">
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text") {
                      return (
                        <span
                          key={pIndex}
                          className="sentence-text-wb-unit10-p5-q1"
                        >
                          {part.value}
                        </span>
                      );
                    }

                    const cellKey = `drop-${qIndex}-${pIndex}`;
                    return (
                      <span
                        key={pIndex}
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DropCell
                          id={cellKey}
                          value={answers[qIndex][pIndex]}
                          isWrong={wrongInputs.includes(`${qIndex}-${pIndex}`)}
                          locked={locked}
                          onRemove={() => removeWord(qIndex, pIndex)}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Buttons ──────────────────────────────────────────────────── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            onClick={showAnswers}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ─── Drag Overlay ─────────────────────────────────────────────── */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "6px 12px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
              color: "#2c5287",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit10_Page5_Q1;
