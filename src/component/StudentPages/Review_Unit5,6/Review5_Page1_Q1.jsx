import React, { useState } from "react";
import "./Review5_Page1_Q1.css";
import img1 from "../../../assets/unit6/imgs/U6P52EXEA-01.svg";
import img2 from "../../../assets/unit6/imgs/U6P52EXEA-02.svg";
import img3 from "../../../assets/unit6/imgs/U6P52EXEA-03.svg";
import img4 from "../../../assets/unit6/imgs/U6P52EXEA-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

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

// ─── Word chip in the bank ───────────────────────────────────────────────────
const BankWord = ({ item, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${item.id}`,
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
      {item.input}
    </span>
  );
};

// ─── Drop zone (input slot) ───────────────────────────────────────────────────
const DropSlot = ({ id, answer, wrongWords, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const isWrong = wrongWords.includes(id);

  return (
    <div
      ref={setNodeRef}
      className={`answer-input-unit5-p6-q1${isOver ? " drag-over-cell" : ""}`}
      style={{
        minWidth: "150px",
        borderBottom: "2px solid black",
        background: isOver ? "#e8f0fe" : "transparent",
        transition: "background 0.15s",
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        cursor: answer && !locked ? "pointer" : "default",
      }}
      // ⭐ click on filled slot → return word to bank
      onClick={() => {
        if (answer && !locked) onRemove(id);
      }}
      title={answer && !locked ? "Click to remove" : ""}
    >
      {answer ? (
        <span
          style={{
            // fontWeight: "bold",
            fontSize: "18px",
            // color: isWrong ? "red" : "#2c5287",
            padding: "2px 4px",
          }}
        >
          {answer.input}
        </span>
      ) : null}

      {isWrong && <span className="error-circle-review5-p1-q1">✕</span>}
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────
const Review5_Page1_Q1 = () => {
  const [answers, setAnswers] = useState({}); // { input1: { input, wordId }, ... }
  const [wrongWords, setWrongWords] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const correctMatches = [
    { id: "w1", input: "pen", num: "input1" },
    { id: "w2", input: "What's this", num: "input2" },
    { id: "w3", input: "This is a map", num: "input3" },
    { id: "w4", input: "What's this", num: "input4" },
    { id: "w5", input: "This is a globe", num: "input5" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // Which word IDs are currently placed in a slot
  const usedWordIds = new Set(Object.values(answers).map((a) => a.wordId));

  // Active draggable label (for DragOverlay)
  const activeItem = activeId
    ? correctMatches.find((w) => `bank-${w.id}` === activeId)
    : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const wordId = active.id.replace("bank-", ""); // e.g. "w1"
    const slotId = over.id; // e.g. "input1"

    // Only valid slots
    const validSlots = ["input1", "input2", "input3", "input4", "input5"];
    if (!validSlots.includes(slotId)) return;

    const dragged = correctMatches.find((w) => w.id === wordId);
    if (!dragged) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      // If this word was already in another slot, clear that slot
      Object.keys(updated).forEach((key) => {
        if (updated[key].wordId === wordId) delete updated[key];
      });

      // Place (replace if slot already had something)
      updated[slotId] = { input: dragged.input, wordId: dragged.id };
      return updated;
    });

    setWrongWords([]);
  };

  // ⭐ Click on slot → remove word → back to bank
  const handleRemove = (slotId) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
    setWrongWords([]);
  };

  const showAnswers = () => {
    const filled = {};
    correctMatches.forEach((item) => {
      filled[item.num] = { input: item.input, wordId: item.id };
    });
    setAnswers(filled);
    setWrongWords([]);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (Object.keys(answers).length === 0) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    correctMatches.forEach((ans) => {
      const given = answers[ans.num];
      if (given && given.input.toLowerCase() === ans.input.toLowerCase()) {
        correctCount++;
      } else {
        wrong.push(ans.num);
      }
    });

    setWrongWords(wrong);
    setLocked(true);

    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;margin-top:10px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
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
        <div className="div-forall" style={{ gap: "50px" }}>
          <h5 className="header-title-page8">
            <span className="mr-2">A</span> Drag and drop the words to complete
            the sentences.
          </h5>

          {/* ── Word Bank ── */}
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
              flexWrap: "wrap",
            }}
          >
            {correctMatches.map((item) => (
              <BankWord
                key={item.id}
                item={item}
                isUsed={usedWordIds.has(item.id)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          <div className="content-container-unit5-p6-q1">
            {/* Q1 – fully static (example) */}
            <div className="section-one-unit5-p6-q1">
              <span
                style={{
                  color: "#2c5287",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                1
              </span>{" "}
              <img src={img1} className="img-review5-p1-q1" />
              <div className="content-input-unit5-p6-q1">
                <input
                  type="text"
                  value="What's this?"
                  readOnly
                  style={{
                    pointerEvents: "none",
                    borderBottom: "2px solid black",
                    width: "200px",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="text"
                  value="This is an eraser."
                  readOnly
                  style={{
                    pointerEvents: "none",
                    borderBottom: "2px solid black",
                    width: "200px",
                    fontSize: "18px",
                  }}
                />
              </div>
            </div>

            {/* Q2 */}
            <div className="section-two-unit5-p6-q1">
              <span
                style={{
                  color: "#2c5287",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                2
              </span>{" "}
              <img src={img2} className="img-review5-p1-q1" />
              <div className="content-input-unit5-p6-q1">
                <input
                  type="text"
                  value="What's this?"
                  readOnly
                  style={{
                    pointerEvents: "none",
                    borderBottom: "2px solid black",
                    width: "200px",
                    fontSize: "18px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    fontSize: "18px",
                  }}
                >
                  <input
                    type="text"
                    value="This is a"
                    readOnly
                    style={{
                      pointerEvents: "none",
                      borderBottom: "2px solid black",
                      width: "90px",
                      fontSize: "18px",
                    }}
                  />
                  <DropSlot
                    id="input1"
                    answer={answers["input1"]}
                    wrongWords={wrongWords}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                  .
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="section-three-unit5-p6-q1">
              <span
                style={{
                  color: "#2c5287",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                3
              </span>{" "}
              <img src={img3} className="img-review5-p1-q1" />
              <div className="content-input-unit5-p6-q1">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    fontSize: "18px",
                  }}
                >
                  <DropSlot
                    id="input2"
                    answer={answers["input2"]}
                    wrongWords={wrongWords}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                  ?
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    fontSize: "18px",
                  }}
                >
                  <DropSlot
                    id="input3"
                    answer={answers["input3"]}
                    wrongWords={wrongWords}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                  .
                </div>
              </div>
            </div>

            {/* Q4 */}
            <div className="section-four-unit5-p6-q1">
              <span
                style={{
                  color: "#2c5287",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                4
              </span>{" "}
              <img src={img4} className="img-review5-p1-q1" />
              <div className="content-input-unit5-p6-q1">
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    fontSize: "18px",
                  }}
                >
                  <DropSlot
                    id="input4"
                    answer={answers["input4"]}
                    wrongWords={wrongWords}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                  ?
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "4px",
                    fontSize: "22px",
                  }}
                >
                  <DropSlot
                    id="input5"
                    answer={answers["input5"]}
                    wrongWords={wrongWords}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                  .
                </div>
              </div>
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="action-buttons-container">
            <button
              onClick={() => {
                setAnswers({});
                setWrongWords([]);
                setLocked(false);
              }}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              className="show-answer-btn swal-continue"
              onClick={showAnswers}
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

      {/* ── Drag Overlay (ghost chip while dragging) ── */}
      <DragOverlay>
        {activeItem ? (
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
            {activeItem.input}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review5_Page1_Q1;
