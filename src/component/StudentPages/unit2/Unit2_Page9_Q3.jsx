import React, { useState } from "react";
import "./Unit2_Page9_Q3.css";
import jello from "../../../assets/img_unit2/imgs/jello.jpg";
import present from "../../../assets/img_unit2/imgs/Present1.jpg";
import balloons from "../../../assets/img_unit2/imgs/balloons..jpg";
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

// ─── Draggable Word (used in word bank) ───────────────────────────────────────
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
const DroppableSlot = ({ id, value, isWrong, showAnswers, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className={`drop-slot-q3 ${isOver ? "drag-over-cell" : ""}`}
    >
      {value && (
        <span
          className="word-item"
          onClick={!showAnswers ? onRemove : undefined}
          style={{
            cursor: showAnswers ? "default" : "pointer",
            userSelect: "none",
          }}
          title={showAnswers ? "" : "Click to remove"}
        >
          {value}
        </span>
      )}
      {isWrong && !showAnswers && <span className="error-badge-P9-Q3">✕</span>}
    </span>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit2_Page9_Q3 = () => {
  const [answers, setAnswers] = useState({});
  const [wrongWords, setWrongWords] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeWord, setActiveWord] = useState(null); // for DragOverlay

  const correctMatches = [
    { input: "It's jello", num: "input1" },
    { input: "It's a present", num: "input2" },
    { input: "These are balloons", num: "input3" },
  ];

  const wordBank = correctMatches.map((c) => c.input);
  const getValue = (id) => answers[id] || "";

  // Set of words currently placed in a slot
  const usedWords = new Set(Object.values(answers));

  // Click on placed word → return it to the bank
  const removeAnswer = (slotId) => {
    if (checked || showAnswers) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
    setWrongWords([]);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // ─── Extract word label from draggableId ──────────────────────────────────
  const extractWord = (draggableId) => {
    // bank items:  "bank-<word>"
    // slot items:  "placed-<slotId>-<word>"
    if (draggableId.startsWith("bank-")) {
      return draggableId.slice("bank-".length);
    }
    if (draggableId.startsWith("placed-")) {
      const parts = draggableId.split("-");
      // "placed", slotId, ...rest (word may contain spaces, so rejoin)
      return parts.slice(2).join("-");
    }
    return null;
  };

  const onDragStart = ({ active }) => {
    const word = extractWord(active.id);
    setActiveWord(word);
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || showAnswers || checked) return;

    const word = extractWord(active.id);
    if (!word) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      // Remove word from whichever slot it was in
      Object.keys(updated).forEach((k) => {
        if (updated[k] === word) delete updated[k];
      });

      // Place into target slot (over.id is the droppableId of the slot)
      if (over.id.startsWith("slot-")) {
        const slotId = over.id.replace("slot-", "");
        // If slot already has a word, swap it back to "unplaced" (just remove)
        // (no word bank removal needed – bank always shows all words)
        updated[slotId] = word;
      }

      return updated;
    });

    setWrongWords([]);
  };

  // ─── Buttons ──────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswers) return;

    if (Object.keys(answers).length < correctMatches.length) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let wrong = [];
    let correctCount = 0;

    correctMatches.forEach((ans) => {
      if (answers[ans.num] === ans.input) correctCount++;
      else wrong.push(ans.num);
    });

    setWrongWords(wrong);
    setChecked(true);

    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    ValidationAlert[
      correctCount === total
        ? "success"
        : correctCount === 0
          ? "error"
          : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `);
  };

  const showCorrectAnswers = () => {
    const filled = {};
    correctMatches.forEach((c) => (filled[c.num] = c.input));
    setAnswers(filled);
    setWrongWords([]);
    setShowAnswers(true);
    setChecked(true);
  };

  const resetAll = () => {
    setAnswers({});
    setWrongWords([]);
    setShowAnswers(false);
    setChecked(false);
  };

  const questions = [
    { id: "input1", img: jello, label: "What is it?" },
    { id: "input2", img: present, label: "What is it?" },
    { id: "input3", img: balloons, label: "What are these?" },
  ];

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div
        style={{ display: "flex", justifyContent: "center", padding: "30px" }}
      >
        <div className="div-forall" style={{ }}>
          <h5 className="header-title-page8">
            <span className="mr-2">C</span> Fill in the blanks
          </h5>

          {/* ── Word Bank ─────────────────────────────────────────────────── */}
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
            {wordBank.map((word) => (
              <DraggableWord
                key={word}
                id={`bank-${word}`}
                word={word}
                disabled={checked || showAnswers}
                isUsed={usedWords.has(word)}
              />
            ))}
          </div>

          {/* ── Questions ─────────────────────────────────────────────────── */}
          <div className="content-container-P9-Q3">
            {questions.map((q, i) => (
              <div key={q.id} className="section-q3">
                <div style={{ display: "flex" }}>
                  <span className="num2">{i + 1}</span>
                  <img src={q.img} className="p9-q1-img2" alt="" />
                </div>

                <div className="content-input">
                  <input readOnly value={q.label} />
                  <DroppableSlot
                    id={`slot-${q.id}`}
                    value={getValue(q.id)}
                    isWrong={wrongWords.includes(q.id)}
                    showAnswers={showAnswers}
                    onRemove={() => removeAnswer(q.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Action Buttons ────────────────────────────────────────────── */}
          <div className="action-buttons-container">
            <button className="try-again-button" onClick={resetAll}>
              Start Again ↻
            </button>
            <button
              className="show-answer-btn swal-continue"
              onClick={showCorrectAnswers}
            >
              Show Answer
            </button>
            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

      {/* ── Drag Overlay (ghost under cursor) ─────────────────────────────── */}
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

export default Unit2_Page9_Q3;
