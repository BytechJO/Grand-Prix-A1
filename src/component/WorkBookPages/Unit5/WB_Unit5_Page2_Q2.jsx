import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U5/U5P28EXED-01.svg";
import cap from "../../../assets/U1 WB/U5/U5P28EXED-02.svg";
import ant from "../../../assets/U1 WB/U5/U5P28EXED-03.svg";
import dad from "../../../assets/U1 WB/U5/U5P28EXED-04.svg";
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

import "./WB_Unit5_Page2_Q2.css";

/* ─────────────────────────────────────────────
   DraggableWord — كلمة في الوورد بانك
   - تبقى مرئية لكن disabled إذا استُخدمت
───────────────────────────────────────────── */
const DraggableWord = ({ word, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
    disabled: isUsed || locked,
  });

  return (
    <div
      ref={setNodeRef}
      {...(isUsed || locked ? {} : { ...listeners, ...attributes })}
      style={{
        padding: "7px 14px",
        border: `2px solid ${isUsed ? "#aaa" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: isUsed ? "#999" : "",
        cursor: isUsed || locked ? "default" : "grab",
        opacity: isDragging ? 0.3 : 1,
        transition: "all 0.2s",
        touchAction:"none",
        userSelect: "none",
      }}
    >
      {word}
    </div>
  );
};

/* ─────────────────────────────────────────────
   DroppableBlank — الإنبوت اللي بتحط فيه الكلمة
───────────────────────────────────────────── */
const DroppableBlank = ({ id, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className={`inline-input-wb-unit5-page2-q2 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: isOver ? "#e3f2fd" : "",
        position: "relative",
        cursor: value && !locked ? "pointer" : "default",
        minWidth: "120px",
      }}
      title={value && !locked ? "Click to remove" : ""}
      onClick={() => {
        if (value && !locked) onRemove(id);
      }}
    >
      {value && (
        <span style={{ fontWeight: "bold" }}>
          {value}
        </span>
      )}

      {isWrong && (
        <span className="error-mark-input-wb-unit2-page3-q2">✕</span>
      )}
    </span>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const WB_Unit5_Page2_Q2 = () => {
  const questions = [
    {
      img: bat,
      parts: [
        { type: "text", value: "This is " },
        { type: "input", answer: "a book" },
        { type: "text", value: "." },
      ],
    },
    {
      img: cap,
      parts: [
        { type: "text", value: "This" },
        { type: "input", answer: "is a pen" },
        { type: "text", value: "." },
      ],
    },
    {
      img: ant,
      parts: [
        { type: "input", answer: "This is a globe" },
        { type: "text", value: "." },
      ],
    },
    {
      img: dad,
      parts: [
        { type: "input", answer: "This is an eraser" },
        { type: "text", value: "." },
      ],
    },
  ];

  const allWords = questions.flatMap((q) =>
    q.parts.filter((p) => p.type === "input").map((p) => p.answer)
  );

  // answers[qIndex][pIndex] = word string or ""
  const [answers, setAnswers] = useState(
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null)))
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null); // للـ DragOverlay

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  /* الكلمات المستخدمة حالياً */
  const usedWords = answers.flat().filter(Boolean);

  /* ── حذف كلمة من إنبوت عند الكليك ── */
  const handleRemove = (droppableId) => {
    // droppableId: "blank-qIndex-pIndex"
    const [, qIndex, pIndex] = droppableId.split("-").map(Number);
    const updated = answers.map((row) => [...row]);
    updated[qIndex][pIndex] = "";
    setAnswers(updated);
    setWrongInputs((prev) => prev.filter((w) => w !== `${qIndex}-${pIndex}`));
  };

  /* ── DnD handlers ── */
  const handleDragStart = (event) => {
    // id شكله "word-<الكلمة>"
    const word = event.active.id.replace(/^word-/, "");
    setActiveWord(word);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over) return;

    const word = active.id.replace(/^word-/, "");
    const dest = over.id; // "blank-qIndex-pIndex"

    if (!dest.startsWith("blank-")) return;

    const [, qIndex, pIndex] = dest.split("-").map(Number);

    const updated = answers.map((row) => [...row]);

    // شيل الكلمة من أي مكان ثاني
    updated.forEach((row) =>
      row.forEach((val, i) => {
        if (val === word) row[i] = "";
      })
    );

    updated[qIndex][pIndex] = word;
    setAnswers(updated);
    setWrongInputs((prev) => prev.filter((w) => w !== `${qIndex}-${pIndex}`));
  };

  /* ── Check ── */
  const checkAnswers = () => {
    if (locked) return;

    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
      for (let pIndex = 0; pIndex < questions[qIndex].parts.length; pIndex++) {
        const part = questions[qIndex].parts[pIndex];
        if (part.type === "input") {
          const value = answers[qIndex][pIndex];
          if (!value || value.trim() === "") {
            ValidationAlert.info(`Please complete question ${qIndex + 1}.`);
            return;
          }
        }
      }
    }

    let wrong = [];
    let score = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      q.parts.forEach((p, pIndex) => {
        if (p.type === "input") {
          total++;
          if (answers[qIndex][pIndex]?.trim() === p.answer) {
            score++;
          } else {
            wrong.push(`${qIndex}-${pIndex}`);
          }
        }
      });
    });

    setWrongInputs(wrong);
    setLocked(true);
    const msg = `Score: ${score} / ${total}`;
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  /* ── Show Answers ── */
  const showAnswers = () => {
    const filled = questions.map((q) =>
      q.parts.map((p) => (p.type === "input" ? p.answer : null))
    );
    setAnswers(filled);
    setWrongInputs([]);
    setLocked(true);
  };

  /* ── Reset ── */
  const reset = () => {
    setAnswers(
      questions.map((q) =>
        q.parts.map((p) => (p.type === "input" ? "" : null))
      )
    );
    setWrongInputs([]);
    setLocked(false);
    setActiveWord(null);
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
        <div
          className="div-forall"
          style={{
            gap: "30px",
      
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A">D</span>Drag and drop to complete the sentence.
          </h5>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {allWords.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                isUsed={usedWords.includes(word)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div className="content-container-wb-unit4-p1-q2">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="row2-wb-unit4-p1-q2">
                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="num-span">{qIndex + 1}</span>
                  <img src={q.img} alt="" className="q-img-wb-unit5-page2-q2" />
                  <span className="word-box-wb-unit5-page2-q2">
                    What's this?
                  </span>
                </div>

                <div className="sentence-wrapper-wb-unit5-page2-q2">
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text") {
                      return (
                        <span
                          key={pIndex}
                          className="sentence-text-wb-unit5-page2-q2"
                        >
                          {part.value}
                        </span>
                      );
                    }

                    const blankId = `blank-${qIndex}-${pIndex}`;
                    return (
                      <DroppableBlank
                        key={pIndex}
                        id={blankId}
                        value={answers[qIndex][pIndex]}
                        isWrong={wrongInputs.includes(`${qIndex}-${pIndex}`)}
                        locked={locked}
                        onRemove={handleRemove}
                      />
                    );
                  })}
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
          <button onClick={showAnswers} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay (الكلمة اللي بتتسحب) ── */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              color: "#2c5287",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit5_Page2_Q2;