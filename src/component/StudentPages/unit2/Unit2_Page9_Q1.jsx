import React, { useState } from "react";
import "./Unit2_Page9_Q1.css";
import partyhats from "../../../assets/img_unit2/imgs/party hats..jpg";
import present from "../../../assets/img_unit2/imgs/Present1.jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  useDraggable,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";

// ─── Draggable Word ────────────────────────────────────────────────────────────
const DraggableWord = ({ id, word, disabled, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isUsed,
  });

  return (
    <span
      ref={setNodeRef}
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
      }}
      {...listeners}
      {...attributes}
    >
      {word}
    </span>
  );
};

// ─── Drop Slot ─────────────────────────────────────────────────────────────────
const DropSlot = ({ id, value, wrong, showAnswer, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex items-center">
      <span
        ref={setNodeRef}
        className={`drop-slot-inline-unit2-p9-q1 ${isOver ? "drag-over-cell" : ""}`}
      >
        {value && (
          <span
            className="word-item"
            onClick={!showAnswer ? onRemove : undefined}
            style={{
              cursor: showAnswer ? "default" : "pointer",
              userSelect: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
            title={showAnswer ? "" : "Click to remove"}
          >
            {value}
           
          </span>
        )}
        {wrong && <span className="error-mark-input1">✕</span>}
      </span>
      <span>{id === "slot-input2" && " ? "}</span>
      <span>{id === "slot-input3" && " a "}</span>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit2_Page9_Q1 = () => {
  const [answers, setAnswers] = useState({});
  const [wrongWords, setWrongWords] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [checked, setChecked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const correctMatches = [
    { input: "party hats", num: "input1" },
    { input: "What is it",  num: "input2" },
    { input: "It's",        num: "input3" },
    { input: "present",     num: "input4" },
  ];

  const wordBank = correctMatches.map((c) => c.input);
  const getValue = (id) => answers[id] || "";

  // Words currently placed in a slot
  const usedWords = new Set(Object.values(answers));

  // Click on placed word → return it to the bank
  const removeAnswer = (slotId) => {
    if (checked || showAnswer) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
    setWrongWords([]);
  };

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveWord(active.id.replace("bank-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || checked || showAnswer) return;

    const word = active.id.replace("bank-", "");

    setAnswers((prev) => {
      const updated = { ...prev };

      // Remove word from any previous slot
      Object.keys(updated).forEach((key) => {
        if (updated[key] === word) delete updated[key];
      });

      // Place into target slot
      if (over.id.startsWith("slot-")) {
        const inputId = over.id.replace("slot-", "");
        updated[inputId] = word;
      }

      return updated;
    });

    setWrongWords([]);
  };

  const onDragCancel = () => setActiveWord(null);

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer) return;

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
      correctCount === total ? "success" : correctCount === 0 ? "error" : "warning"
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
    setShowAnswer(true);
    setChecked(true);
  };

  const resetAll = () => {
    setAnswers({});
    setWrongWords([]);
    setShowAnswer(false);
    setChecked(false);
  };

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <div className="div-forall" style={{ gap: "88px" }}>
          <h5 className="header-title-page8">
            <span className="mr-2">A</span> Complete the sentences with the
            correct words.
          </h5>

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {wordBank.map((word) => (
              <DraggableWord
                key={word}
                id={`bank-${word}`}
                word={word}
                disabled={checked || showAnswer}
                isUsed={usedWords.has(word)}
              />
            ))}
          </div>

          <div className="content-container-P90-Q1">
            {/* SECTION 1 */}
            <div className="section-one">
              <span>1</span>
              <img src={partyhats} className="p9-q1-img" alt="" />
              <div className="content-input">
                <input type="text" value="What are these?" readOnly />
                <input type="text" value="These are" readOnly />
                <DropSlot
                  id="slot-input1"
                  value={getValue("input1")}
                  wrong={wrongWords.includes("input1") && !showAnswer}
                  showAnswer={showAnswer}
                  onRemove={() => removeAnswer("input1")}
                />
              </div>
            </div>

            {/* SECTION 2 */}
            <div className="section-two">
              <span>2</span>
              <img src={present} className="p9-q1-img" alt="" />
              <div className="content-input">
                {["input2", "input3", "input4"].map((id) => (
                  <React.Fragment key={id}>
                    <DropSlot
                      id={`slot-${id}`}
                      value={getValue(id)}
                      wrong={wrongWords.includes(id) && !showAnswer}
                      showAnswer={showAnswer}
                      onRemove={() => removeAnswer(id)}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ── Buttons ────────────────────────────────────────────────────── */}
          <div className="action-buttons-container">
            <button className="try-again-button" onClick={resetAll}>
              Start Again ↻
            </button>
            <button className="show-answer-btn" onClick={showCorrectAnswers}>
              Show Answer
            </button>
            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

      {/* ── Drag Overlay ───────────────────────────────────────────────────── */}
      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "#fff",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(0,0,0,.2)",
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

export default Unit2_Page9_Q1;