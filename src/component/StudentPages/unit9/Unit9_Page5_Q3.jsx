import React, { useState } from "react";
import conversation from "../../../assets/unit9/imgs/Asset 11.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit9_Page5_Q3.css";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

// ─── Word chip in the bank ────────────────────────────────────────────────────
function BankWord({ id, word, isUsed, globalDisabled }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id, disabled: isUsed || globalDisabled });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isUsed ? 0.35 : isDragging ? 0.4 : 1,
    borderRadius: "8px",
    border: `2px solid ${isUsed ? "#aaa" : "#2c5287"}`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: isUsed || globalDisabled ? "default" : "grab",
    background: isUsed ? "#e9e9e9" : "white",
    color: isUsed ? "#999" : "inherit",
    padding: "4px 12px",
    fontSize: "1rem",
    userSelect: "none",
    touchAction: "none",
    transition: "opacity 0.2s, background 0.2s, border-color 0.2s",
    pointerEvents: isUsed ? "none" : "auto",
    whiteSpace: "nowrap",
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...(isUsed ? {} : { ...listeners, ...attributes })}
    >
      {word}
    </span>
  );
}

// ─── Drop zone (positioned absolutely over the image) ────────────────────────
function InputDropZone({ id, value, area, isWrong, disabled, onReturn }) {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !disabled && value && onReturn(id)}
      title={!disabled && value ? "Click to return" : ""}
      style={{
        position: "absolute",
        top: `${area.y}%`,
        left: `${area.x}%`,
        width: `${area.w}%`,
        height: `${area.h}%`,
        border: isWrong
          ? "2px solid red"
          : isOver
            ? "2px solid #2c5287"
            : "2px solid black",
        borderRadius: "8px",
        background: isOver ? "#eef4ff" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: !disabled && value ? "pointer" : "default",
        transition: "background 0.15s, border-color 0.15s",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {value && (
        <span
          style={{
            fontWeight: "bold",
            fontSize: "1.2vw",
            color: "#2c5287",
            userSelect: "none",
          }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const Unit9_Page5_Q3 = () => {
  const clickableAreas = [
    { x: 83, y: 65.5, w: 8.8, h: 11 },
    { x: 52, y: 65.5, w: 9.8, h: 12 },
  ];

  // bankWords[i] maps to clickableAreas[i]
  const bankWords = ["cows", "three"];
  const correctAnswers = ["cows", "three"];

  // Which words are placed: { wordId → dropzone id } and reverse
  const [placed, setPlaced] = useState({}); // { "drop-0": "cows", "drop-1": "three" }
  const [usedWords, setUsedWords] = useState(new Set()); // set of word strings currently placed
  const [wrongZones, setWrongZones] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const wordId = active.id; // e.g. "cows"
    const zoneId = over.id; // e.g. "drop-0"

    if (!zoneId.startsWith("drop-")) return;

    // If zone already has a word, swap: return old word to bank
    const previousWord = placed[zoneId];

    setPlaced((prev) => {
      const next = { ...prev };

      // Remove the dragged word from whichever zone it was in before (if any)
      Object.keys(next).forEach((k) => {
        if (next[k] === wordId) delete next[k];
      });

      next[zoneId] = wordId;
      return next;
    });

    setUsedWords((prev) => {
      const next = new Set(prev);
      if (previousWord) next.delete(previousWord); // free the displaced word
      next.add(wordId);
      return next;
    });

    setWrongZones([]);
  };

  // Click a filled drop zone → return its word to the bank
  const handleReturn = (zoneId) => {
    if (locked) return;
    const word = placed[zoneId];
    if (!word) return;

    setPlaced((prev) => {
      const next = { ...prev };
      delete next[zoneId];
      return next;
    });
    setUsedWords((prev) => {
      const next = new Set(prev);
      next.delete(word);
      return next;
    });
    setWrongZones([]);
  };

  // ── Check ─────────────────────────────────────────────────────────────────
  const handleCheck = () => {
    if (locked) return;

    const allFilled = clickableAreas.every((_, i) => placed[`drop-${i}`]);
    if (!allFilled) {
      ValidationAlert.info("Oops!", "Please fill all answers.");
      return;
    }

    const wrong = [];
    let correct = 0;

    clickableAreas.forEach((_, i) => {
      const userWord = placed[`drop-${i}`] || "";
      if (userWord.toLowerCase() === correctAnswers[i].toLowerCase()) {
        correct++;
      } else {
        wrong.push(i);
      }
    });

    setWrongZones(wrong);
    setLocked(true);

    const total = correctAnswers.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const scoreMessage = `<div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold;">Score: ${correct}/${total}</span>
    </div>`;

    if (correct === total) ValidationAlert.success(scoreMessage);
    else if (correct === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setPlaced({});
    setUsedWords(new Set());
    setWrongZones([]);
    setLocked(false);
  };

  // ── Show Answer ───────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    const correctPlaced = {};
    const correctUsed = new Set();
    correctAnswers.forEach((word, i) => {
      correctPlaced[`drop-${i}`] = word;
      correctUsed.add(word);
    });
    setPlaced(correctPlaced);
    setUsedWords(correctUsed);
    setWrongZones([]);
    setLocked(true);
  };

  const isDisabled = locked;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{ display: "flex", justifyContent: "center", padding: "30px" }}
      >
        <div
          className="div-forall"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            position: "relative",
            // width: "60%",
          }}
        >
          <h5 className="header-title-page8" id="ex-d">
            <span className="ex-A">B</span> Ask and answer.
          </h5>

          {/* Word bank */}
          <div
            style={{
              display: "flex",
              gap: "30px",
              padding: "10px 16px",
              border: "2px dashed #ccc",
              borderRadius: "12px",
              marginTop: "16px",
              width: "100%",
              alignItems:"center",
              justifyContent:"center",
              marginBottom: "8px",
              flexWrap: "wrap",
              minHeight: "48px",
            }}
          >
            {bankWords.map((w) => (
              <BankWord
                key={w}
                id={w}
                word={w}
                isUsed={usedWords.has(w)}
                globalDisabled={isDisabled}
              />
            ))}
          </div>

          {/* Image + drop zones */}
          <div
            style={{
              position: "relative",
              width: "100%",
              marginTop: "16px",
              // maxWidth: "900px",
              aspectRatio: "3 / 1",
            }}
          >
            <img
              src={conversation}
              style={{
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
              alt=""
            />

            {clickableAreas.map((area, index) => (
              <React.Fragment key={index}>
                <InputDropZone
                  id={`drop-${index}`}
                  value={placed[`drop-${index}`] || ""}
                  area={area}
                  isWrong={wrongZones.includes(index)}
                  disabled={isDisabled}
                  onReturn={handleReturn}
                />
                {wrongZones.includes(index) && (
                  <div
                    className="wrong-icon-review4-p1-q1"
                    style={{
                      position: "absolute",
                      top: `calc(${area.y}% - 1.5%)`,
                      left: `calc(${area.x}% + ${area.w}% - 4%)`,
                      color: "white",
                    }}
                  >
                    ✕
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button onClick={handleCheck} className="check-button2">
          Check Answer ✓
        </button>
      </div>

      {/* Ghost chip */}
      <DragOverlay>
        {activeId ? (
          <span
            style={{
              borderRadius: "8px",
              border: "2px solid #2c5287",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              background: "white",
              padding: "4px 12px",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              pointerEvents: "none",
            }}
          >
            {activeId}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit9_Page5_Q3;
