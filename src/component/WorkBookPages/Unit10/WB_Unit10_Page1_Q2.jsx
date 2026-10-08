import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U10/U10P57EXEB-01.svg";
import cap from "../../../assets/U1 WB/U10/U10P57EXEB-02.svg";
import ant from "../../../assets/U1 WB/U10/U10P57EXEB-03.svg";
import dad from "../../../assets/U1 WB/U10/U10P57EXEB-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit10_Page1_Q2.css";

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
          key={w.id}
          id={w.id}
          text={w.value}
          disabled={locked}
          isUsed={usedValues.has(w.value.toLowerCase())}
        />
      ))}
    </div>
  );
};

// ─── Droppable Cell ───────────────────────────────────────────────────────────
const DroppableCell = ({ id, value, isWrong, locked, onClear }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });

  return (
    <div
      ref={setNodeRef}
      className={`inline-input-wb-unit4-p1-q2 ${isOver ? "drag-over-cell" : ""}`}
      onClick={() => { if (!locked && value) onClear(); }}
      style={{
        background: isOver && !locked ? "#e3f2fd" : "white",
        minWidth: "120px",
        minHeight: "35px",
        padding: "5px",
        position: "relative",
        cursor: !locked && value ? "pointer" : "default",
        transition: "background 0.2s",
      }}
      title={!locked && value ? "Click to return to bank" : ""}
    >
      {value}
      {isWrong && (
        <span className="error-mark-input-wb-unit2-page3-q2">✕</span>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit10_Page1_Q2 = () => {
  const questions = [
    {
      img: bat,
      parts: [
        { type: "text", value: "I want " },
        { type: "input", answer: "ice cream" },
        { type: "text", value: "." },
      ],
    },
    {
      img: cap,
      parts: [
        { type: "text", value: "I want" },
        { type: "input", answer: "fruit" },
        { type: "text", value: "." },
      ],
    },
    {
      img: ant,
      parts: [
        { type: "input", answer: "I want milk" },
        { type: "text", value: "." },
      ],
    },
    {
      img: dad,
      parts: [
        { type: "input", answer: "I want an apple" },
        { type: "text", value: "." },
      ],
    },
  ];

  // البانك ثابت دايماً — الكلمات تضل موجودة، بس نتتبع المستخدمة
  const wordBank = questions.flatMap((q, qIndex) =>
    q.parts
      .filter((p) => p.type === "input")
      .map((p, i) => ({ id: `q${qIndex}-${i}`, value: p.answer }))
  );

  const [answers, setAnswers] = useState(
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null)))
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // القيم الموجودة حالياً في خانات الإجابة (lowercase)
  const usedValues = new Set(answers.flat().filter(Boolean).map((v) => v.toLowerCase()));

  // ─── Drag Handlers ──────────────────────────────────────────────────────────
  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const chipId  = active.id;
    const destId  = String(over.id);
    const word    = active.data.current?.text;
    if (!word) return;

    if (destId === "bank") {
      // رجعت على البانك → شيلها من الخانة
      setAnswers((prev) => {
        const copy = prev.map((row) => [...row]);
        copy.forEach((row, qi) =>
          row.forEach((val, pi) => {
            if (val?.toLowerCase() === word.toLowerCase()) copy[qi][pi] = "";
          })
        );
        return copy;
      });
      setWrongInputs([]);
      return;
    }

    if (destId.startsWith("drop-")) {
      const [qIndex, pIndex] = destId.replace("drop-", "").split("-").map(Number);

      // إذا الخانة مشغولة بنفس الكلمة → لا شي
      if (answers[qIndex][pIndex]?.toLowerCase() === word.toLowerCase()) return;

      setAnswers((prev) => {
        const copy = prev.map((row) => [...row]);
        // شيل الكلمة من مكانها القديم (إذا كانت بخانة ثانية)
        copy.forEach((row, qi) =>
          row.forEach((val, pi) => {
            if (val?.toLowerCase() === word.toLowerCase()) copy[qi][pi] = "";
          })
        );
        copy[qIndex][pIndex] = word.toLowerCase();
        return copy;
      });
      setWrongInputs([]);
    }
  };

  // ─── Click على خانة مليانة → ارجع القيمة للبانك ────────────────────────────
  const handleClear = (qIndex, pIndex) => {
    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[qIndex][pIndex] = "";
      return copy;
    });
    setWrongInputs([]);
  };

  // ─── Buttons ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
      for (let pIndex = 0; pIndex < questions[qIndex].parts.length; pIndex++) {
        if (questions[qIndex].parts[pIndex].type === "input") {
          if (!answers[qIndex][pIndex]?.trim()) {
            ValidationAlert.info(`Please complete question ${qIndex + 1}.`);
            return;
          }
        }
      }
    }
    let wrong = [], score = 0, total = 0;
    questions.forEach((q, qIndex) => {
      q.parts.forEach((p, pIndex) => {
        if (p.type === "input") {
          total++;
          if (answers[qIndex][pIndex]?.trim().toLowerCase() === p.answer.toLowerCase()) score++;
          else wrong.push(`${qIndex}-${pIndex}`);
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

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.parts.map((p) => (p.type === "input" ? p.answer : null))));
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null))));
    setWrongInputs([]);
    setLocked(false);
  };

  const activeWord = wordBank.find((w) => w.id === activeId);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        className="question-wrapper-unit3-page6-q1"
        style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "30px" }}
      >
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span className="ex-A">B</span>Drag and drop.
          </h5>

          {/* ── Word Bank ── */}
          <WordBank wordBank={wordBank} locked={locked} usedValues={usedValues} />

          {/* ── Questions ── */}
          <div className="content-container-wb-unit10-p1-q2 w-full mb-10">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="row2-wb-unit4-p1-q2">
                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="num-span">{qIndex + 1}</span>
                  <img src={q.img} alt="" className="q-img-wb-unit2-page3-q2" />
                </div>

                <div className="sentence-wrapper-wb-unit4-p1-q2">
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text") return (
                      <span key={pIndex} className="sentence-text">{part.value}</span>
                    );

                    return (
                      <span key={pIndex} style={{ position: "relative" }}>
                        <DroppableCell
                          id={`drop-${qIndex}-${pIndex}`}
                          value={answers[qIndex][pIndex]}
                          isWrong={wrongInputs.includes(`${qIndex}-${pIndex}`)}
                          locked={locked}
                          onClear={() => handleClear(qIndex, pIndex)}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">Start Again ↻</button>
          <button onClick={showAnswers} className="show-answer-btn swal-continue">Show Answer</button>
          <button onClick={checkAnswers} className="check-button2">Check Answer ✓</button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord ? (
          <div style={{
            padding: "6px 12px", border: "2px solid #2c5287", borderRadius: "8px",
            background: "white", fontWeight: "600", cursor: "grabbing",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)", whiteSpace: "nowrap",
          }}>
            {activeWord.value}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit10_Page1_Q2;