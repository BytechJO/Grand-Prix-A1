import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U6/U6P35EXEF-01.svg";
import cap from "../../../assets/U1 WB/U6/U6P35EXEF-02.svg";
import ant from "../../../assets/U1 WB/U6/U6P35EXEF-03.svg";
import dad from "../../../assets/unit6/imgs/U6P50EXEB-04.svg";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit6_Page3_Q2.css";

/* ================= DraggableSentence ================= */

const DraggableSentence = ({ sentence, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sentence-${sentence}`,
    disabled: locked || isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
        border: `2px solid ${isUsed ? "#aaa" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: isUsed ? "#999" : "inherit",
        cursor: locked || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.3 : 1,
        touchAction: "none",
        userSelect: "none",
        transition: "all 0.2s",
      }}
    >
      {sentence}
    </div>
  );
};

/* ================= DroppableBlank ================= */

const DroppableBlank = ({ id, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled: locked,
  });

  return (
    <span style={{ position: "relative", width: "90%" }}>
      <div
        ref={setNodeRef}
        className={`inline-input-wb-unit6-p3-q2 ${isOver ? "drag-over-cell" : ""}`}
        onClick={() => !locked && value && onRemove(id)}
        style={{
          width: "100%",
          background: isOver ? "#e3f2fd" : "",
          display: "flex",
          alignItems: "center",
          cursor: !locked && value ? "pointer" : "default",
          transition: "background 0.15s ease",
          position: "relative",
        }}
        title={!locked && value ? "Click to remove" : ""}
      >
        {value || ""}
        {isWrong && (
          <span className="error-mark-input-wb-unit2-page3-q2">✕</span>
        )}
      </div>
    </span>
  );
};

/* ================= MAIN COMPONENT ================= */

const WB_Unit6_Page3_Q2 = () => {
  const questions = [
    {
      img: bat,
      parts: [
        { type: "text", value: "He" },
        { type: "input", answer: "can play the violin" },
        { type: "text", value: "." },
      ],
    },
    {
      img: cap,
      parts: [
        { type: "text", value: "She" },
        { type: "input", answer: "can fly a kite" },
        { type: "text", value: "." },
      ],
    },
    {
      img: ant,
      parts: [
        { type: "text", value: "He" },
        { type: "input", answer: "can't ride a bike" },
        { type: "text", value: "." },
      ],
    },
  ];

  const allSentences = questions
    .flatMap((q) => q.parts)
    .filter((p) => p.type === "input")
    .map((p) => p.answer);

  const [answers, setAnswers] = useState(
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null)))
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeSentence, setActiveSentence] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const usedSentences = answers.flat().filter(Boolean);

  /* ─── Drag Handlers ─── */

  const handleDragStart = (event) => {
    setActiveSentence(event.active.id.replace("sentence-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveSentence(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("blank-")) return;

    const sentence = active.id.replace("sentence-", "");
    const [, qIndex, pIndex] = over.id.split("-").map(Number);

    const updated = answers.map((row) => [...row]);

    // شيل الجملة من أي مكان سابق
    updated.forEach((row) =>
      row.forEach((val, i) => {
        if (val === sentence) row[i] = "";
      })
    );

    updated[qIndex][pIndex] = sentence;
    setAnswers(updated);
    setWrongInputs([]);
  };

  /* ─── Remove on click ─── */

  const handleRemove = (blankId) => {
    const [, qIndex, pIndex] = blankId.split("-").map(Number);
    const updated = answers.map((row) => [...row]);
    updated[qIndex][pIndex] = "";
    setAnswers(updated);
    setWrongInputs([]);
  };

  /* ─── Check ─── */

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

  /* ─── Show Answers ─── */

  const showAnswers = () => {
    const filled = questions.map((q) =>
      q.parts.map((p) => (p.type === "input" ? p.answer : null))
    );
    setAnswers(filled);
    setWrongInputs([]);
    setLocked(true);
  };

  /* ─── Reset ─── */

  const reset = () => {
    setAnswers(
      questions.map((q) =>
        q.parts.map((p) => (p.type === "input" ? "" : null))
      )
    );
    setWrongInputs([]);
    setLocked(false);
    setActiveSentence(null);
  };

  /* ================= RENDER ================= */

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
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span className="ex-A">F</span>Drag and drop.
          </h5>

          {/* ─── Sentence Bank ─── */}
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
              flexWrap: "wrap",
            }}
          >
            {allSentences.map((sentence) => (
              <DraggableSentence
                key={sentence}
                sentence={sentence}
                locked={locked}
                isUsed={usedSentences.includes(sentence)}
              />
            ))}
          </div>

          {/* ─── Questions ─── */}
          <div className="content-container-wb-unit6-p3-q2">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="row2-wb-unit6-p3-q2">
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span className="num-span">{qIndex + 1}</span>
                  <img src={q.img} alt="" className="q-img-wb-unit6-p3-q2" />
                </div>

                <div className="sentence-wrapper-wb-unit6-p3-q2">
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text") {
                      return (
                        <span key={pIndex} className="sentence-text">
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

        {/* ─── Buttons ─── */}
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

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeSentence && (
          <div
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeSentence}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit6_Page3_Q2;