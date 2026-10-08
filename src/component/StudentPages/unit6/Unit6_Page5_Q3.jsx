import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import bat from "../../../assets/unit6/imgs/U6P50EXEB-01.svg";
import cap from "../../../assets/unit6/imgs/U6P50EXEB-02.svg";
import ant from "../../../assets/unit6/imgs/U6P50EXEB-03.svg";
import dad from "../../../assets/unit6/imgs/U6P50EXEB-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit6_Page5_Q3.css";

/* ─── Data ──────────────────────────────────────────────── */
const WORDS = ["climb a tree", "fly a kite", "fish", "ride a bike"];
const CORRECT = ["fly a kite", "fish", "ride a bike", "climb a tree"];
const IMAGES = [bat, cap, ant, dad];

/* ─── Draggable word chip ────────────────────────────────── */
const WordChip = ({ id, label, index, disabled, used }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || used,
  });

  return (
    <span
      ref={setNodeRef}
      {...(!used ? listeners : {})}
      {...(!used ? attributes : {})}
      className={[
        "word-chip",
        isDragging ? "is-dragging" : "",
        disabled ? "chip-disabled" : "",
        used ? "chip-used" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <strong className="chip-number">{index + 1}.</strong>
      {label}
    </span>
  );
};

/* ─── Drop slot ──────────────────────────────────────────── */
const DropSlot = ({ slotId, value, isWrong, locked, onReturn }) => {
  const { setNodeRef, isOver } = useDroppable({ id: slotId });

  const handleClick = () => {
    if (!locked && value) onReturn();
  };

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      className={[
        "drop-slot-unit6-pg5-q3",
        isOver ? "slot-over" : "",
      
        value ? "slot-filled" : "slot-empty",
        locked ? "slot-locked" : "",
        !locked && value ? "slot-returnable" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="slot-value">{value}</span>
      {isWrong && <span className="error-mark">✕</span>}
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const Unit6_Page5_Q3 = () => {
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  // كل الكلمات الموجودة حاليًا في slot
  const usedWords = new Set(answers.filter(Boolean));

  const handleDragStart = ({ active }) => {
    const raw = String(active.id).replace(/^(word|filled)-/, "");
    setActiveWord(raw);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || locked) return;

    const word = String(active.id).replace(/^(word|filled)-/, "");
    const match = String(over.id).match(/^slot-(\d+)$/);
    if (!match) return;

    const targetIndex = Number(match[1]);

    setAnswers((prev) => {
      const updated = [...prev];
      // remove from old slot if already placed
      const oldIndex = updated.indexOf(word);
      if (oldIndex !== -1) updated[oldIndex] = null;
      updated[targetIndex] = word;
      return updated;
    });

    setWrongInputs([]);
  };

  const handleReturn = (slotIndex) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[slotIndex] = null;
      return updated;
    });
    setWrongInputs([]);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    const wrong = answers.reduce((acc, ans, i) => {
      if (ans !== CORRECT[i]) acc.push(i);
      return acc;
    }, []);

    const score = CORRECT.length - wrong.length;
    const total = CORRECT.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    setWrongInputs(wrong);
    setLocked(true);

    const msg = `<div style="font-size:20px;margin-top:10px;text-align:center;">
      <span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span>
    </div>`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers([...CORRECT]);
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers([null, null, null, null]);
    setWrongInputs([]);
    setLocked(false);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="q3-wrapper">
        <div className="div-forall" style={{gap:"80px"}}>
          {/* Header */}
          <h5 className="header-title-page8">
            <span className="ex-A">B</span>Drag and drop
          </h5>

          {/* Word bank */}
          <div className="word-bank">
            {WORDS.map((word, i) => (
              <WordChip
                key={word}
                id={`word-${word}`}
                label={word}
                index={i}
                disabled={locked}
                used={usedWords.has(word)}
              />
            ))}
          </div>

          {/* Image + slot grid */}
          <div className="slots-grid">
            {IMAGES.map((img, i) => (
              <div key={i} className="slot-card">
                <img src={img} alt="" className="slot-img" />
                <DropSlot
                  slotId={`slot-${i}`}
                  value={answers[i]}
                  isWrong={wrongInputs.includes(i)}
                  locked={locked}
                  onReturn={() => handleReturn(i)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
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

      {/* Drag overlay */}
      <DragOverlay>
        {activeWord && (
          <span className="word-chip is-dragging overlay-chip">{activeWord}</span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit6_Page5_Q3;