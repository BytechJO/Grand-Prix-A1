import React, { useState } from "react";
import "./Unit8_Page5_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/unit8/imgs/U8P68EXEA1-01.svg";
import img2 from "../../../assets/unit8/imgs/U8P68EXEA1-02.svg";
import img3 from "../../../assets/unit8/imgs/U8P68EXEA1-03.svg";
import img4 from "../../../assets/unit8/imgs/U8P68EXEA1-04.svg";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

const data = [
  { img: img1, scrambled: "perpzi", answer: "zipper", pattern: "er"  },
  { img: img2, scrambled: "ksoc",   answer: "sock",   pattern: "ck"  },
  { img: img3, scrambled: "ozo",    answer: "zoo",    pattern: "oo"  },
  { img: img4, scrambled: "beazr",  answer: "zebra",  pattern: "bra" },
];

// ─── Bank chip ────────────────────────────────────────────────────────────────
const BankChip = ({ word, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${word}`,
    disabled: isUsed || locked,
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
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        cursor: isUsed || locked ? "not-allowed" : "grab",
        opacity: isUsed ? 0.45 : isDragging ? 0.3 : 1,
        transition: "opacity 0.2s, background 0.2s",
        userSelect: "none",
        color: isUsed ? "#999" : "",
      }}
    >
      {word}
    </span>
  );
};

// ─── Drop slot ────────────────────────────────────────────────────────────────
const DropSlot = ({ index, answer, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `slot-${index}` });

  return (
    <div className="input-wrapper">
      <div
        ref={setNodeRef}
        className={`text-input${isOver ? " drag-over-cell" : ""}`}
        style={{
          fontSize: "22px",
          background: isOver ? "#e8f0fe" : "transparent",
          transition: "background 0.15s",
          cursor: answer && !locked ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => { if (answer && !locked) onRemove(index); }}
        title={answer && !locked ? "Click to remove" : ""}
      >
        {answer && (
          <span >
            {answer}
          </span>
        )}
      </div>

      {isWrong && <div className="error-icon">✕</div>}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Unit8_Page5_Q1 = () => {
  const [inputs,      setInputs]      = useState(Array(data.length).fill(null));
  const [wrongInputs, setWrongInputs] = useState(Array(data.length).fill(false));
  const [locked,      setLocked]      = useState(false);
  const [activeId,    setActiveId]    = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const usedWords  = new Set(inputs.filter(Boolean));
  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word   = active.id.replace("bank-", "");
    const slotId = over.id;
    if (!slotId.startsWith("slot-")) return;

    const index = Number(slotId.split("-")[1]);

    setInputs((prev) => {
      const updated = [...prev];
      const oldIndex = updated.findIndex((v) => v === word);
      if (oldIndex !== -1) updated[oldIndex] = null;
      updated[index] = word;
      return updated;
    });

    setWrongInputs(Array(data.length).fill(false));
  };

  // ⭐ Click slot → return to bank
  const handleRemove = (index) => {
    setInputs((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setWrongInputs(Array(data.length).fill(false));
  };

  const checkAnswers = () => {
    if (locked) return;

    if (inputs.some((val) => !val)) {
      ValidationAlert.info("Oops!", "Please fill in all the answers before checking.");
      return;
    }

    let correctCount = 0;
    const wrongFlags = data.map((item, i) => {
      if (inputs[i] === item.answer) { correctCount++; return false; }
      return true;
    });

    setWrongInputs(wrongFlags);
    setLocked(true);

    const total = data.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    setInputs(data.map((item) => item.answer));
    setWrongInputs(Array(data.length).fill(false));
    setLocked(true);
  };

  const reset = () => {
    setInputs(Array(data.length).fill(null));
    setWrongInputs(Array(data.length).fill(false));
    setLocked(false);
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
        <div
          className="div-forall"
          style={{
            gap:"60px"
          }}
        >
          <h3 className="header-title-page8">
            <span className="ex-A">A</span>{" "}
            <span style={{ color: "purple" }}>1</span> Drag and drop the words to complete the sentences.
          </h3>

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
            }}
          >
            {data.map((item) => (
              <BankChip
                key={item.answer}
                word={item.answer}
                isUsed={usedWords.has(item.answer)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div className="unscramble-row">
            {data.map((item, index) => (
              <div className="unscramble-box" key={index}>
                <div className="img-box1-unit8-p5-q1">
                  <img src={item.img} alt="" />
                </div>

                <p className="scrambled-word" style={{ fontSize: "22px" }}>
                  {item.scrambled}
                </p>

                <div className="input-row">
                  <span className="num" style={{ fontSize: "22px" }}>
                    {index + 1}
                  </span>
                  <DropSlot
                    index={index}
                    answer={inputs[index]}
                    isWrong={wrongInputs[index]}
                    locked={locked}
                    onRemove={handleRemove}
                  />
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
          <button onClick={handleShowAnswer} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
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
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
              color: "#2c5287",
            }}
          >
            {activeWord}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit8_Page5_Q1;