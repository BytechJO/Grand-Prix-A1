import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import bat from "../../../assets/unit6/imgs/U6P51EXEE-01.svg";
import cap from "../../../assets/unit6/imgs/U6P51EXEE-02.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit6_Page6_Q2.css";

/* ─── Data ──────────────────────────────────────────────── */
const ITEMS = [
  { img: bat, correct: "can",   correctInput: "can swim.",       prefix: "She" },
  { img: cap, correct: "can't", correctInput: "He can't fly a kite.", prefix: "" },
];

/* ─── Word chip (draggable) ─────────────────────────────── */
const WordChip = ({ id, label, disabled, used }) => {
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
        disabled    ? "chip-disabled" : "",
        used        ? "chip-used" : "",
      ].filter(Boolean).join(" ")}
    >
      {label}
    </span>
  );
};

/* ─── Drop slot ──────────────────────────────────────────── */
const DropSlot = ({ slotId, value, isWrong, locked, onReturn }) => {
  const { setNodeRef, isOver } = useDroppable({ id: slotId });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !locked && value && onReturn()}
      className={[
        "write-input-unit6-page6-q2",
        isOver            ? "slot-over"       : "",
        value             ? "slot-filled"     : "slot-empty",
        locked            ? "slot-locked"     : "",
        !locked && value  ? "slot-returnable" : "",
      ].filter(Boolean).join(" ")}
    >
          <span className="slot-value">{value}</span>
      
      {isWrong && <span className="error-mark">✕</span>}
    </div>
  );
};

/* ─── Circle choice ─────────────────────────────────────── */
const CircleChoice = ({ label, selected, wrong, locked, onClick }) => (
  <div className="circle-wrapper">
    <div
      className={["circle-choice-unit6-page6-q2", selected ? "active" : ""].filter(Boolean).join(" ")}
      onClick={() => !locked && onClick()}
    >
      {label}
    </div>
    {wrong && <div className="wrong-mark-unit6-page6-q2">✕</div>}
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const Unit6_Page6_Q2 = () => {
  const [selected,   setSelected]   = useState(["", ""]);
  const [answers,    setAnswers]     = useState([null, null]);
  const [wrongInputs,setWrongInputs] = useState([]);
  const [showResult, setShowResult]  = useState(false);
  const [locked,     setLocked]      = useState(false);
  const [activeWord, setActiveWord]  = useState(null);

  const usedWords = new Set(answers.filter(Boolean));

  /* drag handlers */
  const handleDragStart = ({ active }) => {
    setActiveWord(String(active.id).replace(/^word-/, ""));
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || locked) return;

    const word  = String(active.id).replace(/^word-/, "");
    const match = String(over.id).match(/^slot-(\d+)$/);
    if (!match) return;

    const targetIndex = Number(match[1]);

    setAnswers((prev) => {
      const updated = [...prev];
      const oldIndex = updated.indexOf(word);
      if (oldIndex !== -1) updated[oldIndex] = null;
      updated[targetIndex] = word;
      return updated;
    });

    setShowResult(false);
  };

  const handleReturn = (slotIndex) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[slotIndex] = null;
      return updated;
    });
    setShowResult(false);
  };

  const handleSelect = (value, index) => {
    if (locked) return;
    const updated = [...selected];
    updated[index] = value;
    setSelected(updated);
    setShowResult(false);
  };

  /* actions */
  const checkAnswers = () => {
    if (locked) return;

    if (selected.some((s) => s === "")) {
      ValidationAlert.info("Please choose can or can't for all items!");
      return;
    }
    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please fill in all the drop boxes!");
      return;
    }

    let score = 0;
    const wrong = [];

    ITEMS.forEach((item, i) => {
      const circleOk = selected[i] === item.correct;
      const inputOk  = answers[i]?.trim().toLowerCase() === item.correctInput.toLowerCase();
      if (circleOk) score++;
      if (inputOk)  score++;
      if (!circleOk || !inputOk) wrong.push(i);
    });

    setWrongInputs(wrong);
    setShowResult(true);
    setLocked(true);

    const total = ITEMS.length * 2;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg   = `<div style="font-size:20px;margin-top:10px;text-align:center;">
      <span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span>
    </div>`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setSelected(ITEMS.map((item) => item.correct));
    setAnswers(ITEMS.map((item) => item.correctInput));
    setWrongInputs([]);
    setShowResult(false);
    setLocked(true);
  };

  const reset = () => {
    setSelected(["", ""]);
    setAnswers([null, null]);
    setWrongInputs([]);
    setShowResult(false);
    setLocked(false);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <div className="div-forall">
          {/* Header */}
          <h5 className="header-title-page8">
            <span className="ex-A">E</span> Tap or click the words and drag them to the sentence.
          </h5>

          {/* Word bank */}
          <div className="word-bank">
            {ITEMS.map((item) => (
              <WordChip
                key={item.correctInput}
                id={`word-${item.correctInput}`}
                label={item.correctInput}
                disabled={locked}
                used={usedWords.has(item.correctInput)}
              />
            ))}
          </div>

          {/* Question cards */}
          <div className="question-grid-unit6-page6-q2">
            {ITEMS.map((item, i) => (
              <div className="question-box-unit4-page5-q1" key={i}>
                <span className="q-number">{i + 1}</span>

                <div className="img-option-unit6-p6-q2">
                  <img src={item.img} className="q-img-unit4-page5-q1" style={{ height: "auto", width: "200px" }} alt="" />

                  {/* can / can't circles */}
                  <div className="choices-unit6-page6-q2">
                    {["can", "can't"].map((opt) => (
                      <CircleChoice
                        key={opt}
                        label={opt}
                        selected={selected[i] === opt}
                        wrong={showResult && selected[i] === opt && selected[i] !== item.correct}
                        locked={locked}
                        onClick={() => handleSelect(opt, i)}
                      />
                    ))}
                  </div>
                </div>

                {/* Drop slot row */}
                <div className="input-wrapper-unit6-p6-q2">
                  {item.prefix && <span className="prefix-text">{item.prefix}</span>}
                  <DropSlot
                    slotId={`slot-${i}`}
                    value={answers[i]}
                    isWrong={showResult && wrongInputs.includes(i) && !!answers[i]}
                    locked={locked}
                    onReturn={() => handleReturn(i)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">Start Again ↻</button>
          <button onClick={showAnswers} className="show-answer-btn swal-continue">Show Answer</button>
          <button onClick={checkAnswers} className="check-button2">Check Answer ✓</button>
        </div>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeWord && (
          <span className="word-chip overlay-chip">{activeWord}</span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit6_Page6_Q2;