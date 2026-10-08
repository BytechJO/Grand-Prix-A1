import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U8/U8P45EXEB-01.svg";
import cap from "../../../assets/U1 WB/U8/U8P45EXEB-02.svg";
import ant from "../../../assets/U1 WB/U8/U8P45EXEB-03.svg";
import dad from "../../../assets/U1 WB/U8/U8P45EXEB-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit8_Page1_Q2.css";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Word Chip ────────────────────────────────────────────────────────────────
const DraggableWord = ({ id, text, disabled }) => {
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
        borderRadius: "8px",
        border: "2px solid #2c5287",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "grab",
        padding: "5px",
        background: "white",
        opacity: isDragging ? 0.3 : disabled ? 0.35 : 1,
        touchAction: "none",
        userSelect: "none",
        transition: "opacity 0.2s",
      }}
    >
      {text}
    </span>
  );
};

// ─── Word Bank ────────────────────────────────────────────────────────────────
const WordBank = ({ wordBank, usedIds, locked }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "word-bank" });

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
        // marginBottom: "20px",
        justifyContent: "center",
        background: isOver ? "#f0f8ff" : "transparent",
        transition: "background 0.2s",
      }}
    >
      {wordBank.map((w) => (
        <DraggableWord
          key={w.id}
          id={w.id}
          text={w.text}
          disabled={locked || usedIds.has(w.id)}
        />
      ))}
    </div>
  );
};

// ─── Inline Drop Cell ─────────────────────────────────────────────────────────
const DroppableCell = ({ id, displayText, isWrong, locked, onClear }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });

  const handleClick = () => {
    if (!locked && displayText) onClear();
  };

  return (
    <span
      ref={setNodeRef}
      className={`inline-input-wb-unit8-p1-q2 ${isOver ? "drag-over-cell" : ""}`}
      onClick={handleClick}
      style={{
        background: isOver && !locked ? "#c4e5fcff" : "transparent",
        width: "100%",
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: !locked && displayText ? "pointer" : "default",
        transition: "background 0.2s",
      }}
      title={!locked && displayText ? "Click to return to bank" : ""}
    >
      {displayText}
      {isWrong && <span className="error-mark-input-wb-unit2-page3-q2">✕</span>}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit8_Page1_Q2 = () => {
  const questions = [
    {
      img: bat,
      parts: [
        { type: "text", value: "Open" },
        { type: "input", answer: "your eye" },
        { type: "text", value: "." },
      ],
    },
    {
      img: cap,
      parts: [
        { type: "text", value: "Bend" },
        { type: "input", answer: "your knee" },
        { type: "text", value: "." },
      ],
    },
    {
      img: ant,
      parts: [
        { type: "input", answer: "Raise your hand" },
        { type: "text", value: "." },
      ],
    },
    {
      img: dad,
      parts: [
        { type: "input", answer: "Open your mouth" },
        { type: "text", value: "." },
      ],
    },
  ];

  const wordBank = [
    { id: "w1", text: "your eye" },
    { id: "w2", text: "your knee" },
    { id: "w3", text: "Raise your hand" },
    { id: "w4", text: "Open your mouth" },
  ];

  const [answers, setAnswers] = useState(
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null))),
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedIds = new Set(answers.flat().filter(Boolean));

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const draggedId = String(active.id);
    const destId = String(over.id);

    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy.forEach((row, qi) =>
        row.forEach((val, pi) => {
          if (val === draggedId) copy[qi][pi] = "";
        }),
      );
      if (destId.startsWith("drop-")) {
        const [qIndex, pIndex] = destId
          .replace("drop-", "")
          .split("-")
          .map(Number);
        copy[qIndex][pIndex] = draggedId;
      }
      return copy;
    });

    setWrongInputs([]);
  };

  // Click on filled cell → return to bank
  const handleClear = (qIndex, pIndex) => {
    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[qIndex][pIndex] = "";
      return copy;
    });
    setWrongInputs([]);
  };

  const checkAnswers = () => {
    if (locked) return;
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
      for (let pIndex = 0; pIndex < questions[qIndex].parts.length; pIndex++) {
        if (
          questions[qIndex].parts[pIndex].type === "input" &&
          !answers[qIndex][pIndex]
        ) {
          ValidationAlert.info(`Please complete question ${qIndex + 1}.`);
          return;
        }
      }
    }
    let wrong = [],
      score = 0,
      total = 0;
    questions.forEach((q, qIndex) => {
      q.parts.forEach((p, pIndex) => {
        if (p.type === "input") {
          total++;
          const word =
            wordBank.find((w) => w.id === answers[qIndex][pIndex])?.text || "";
          if (word === p.answer) score++;
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
    const filled = questions.map((q) =>
      q.parts.map((p) => {
        if (p.type !== "input") return null;
        return wordBank.find((w) => w.text === p.answer)?.id || "";
      }),
    );
    setAnswers(filled);
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

  const activeWord = wordBank.find((w) => w.id === activeId);

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
        <div className="div-forall" style={{ gap: "20px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">B</span>Drag and drop.
          </h5>

          <WordBank wordBank={wordBank} usedIds={usedIds} locked={locked} />

          <div className="content-container-wb-unit8-p1-q2 w-full">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="row2-wb-unit6-p3-q2">
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <span className="num-span">{qIndex + 1}</span>
                  <img src={q.img} alt="" className="q-img-wb-unit8-p1-q2" />
                </div>
                <div className="sentence-wrapper-wb-unit8-p1-q2">
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text")
                      return (
                        <span key={pIndex} className="sentence-text">
                          {part.value}
                        </span>
                      );
                    const cellId = `drop-${qIndex}-${pIndex}`;
                    const placedId = answers[qIndex][pIndex];
                    const displayText =
                      wordBank.find((w) => w.id === placedId)?.text || "";
                    return (
                      <span
                        key={pIndex}
                        style={{ position: "relative", width: "90%" }}
                      >
                        <DroppableCell
                          id={cellId}
                          displayText={displayText}
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

      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              borderRadius: "8px",
              border: "2px solid #2c5287",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              padding: "5px",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeWord.text}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit8_Page1_Q2;
