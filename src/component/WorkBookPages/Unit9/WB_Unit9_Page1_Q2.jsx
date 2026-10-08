import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import farmImg from "../../../assets/U1 WB/U9/U9P51EXEB.svg";
import "./WB_Unit9_Page1_Q2.css";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─────────────────────────────────────────────
const questions = [
  { label: "goats", correctLeft: "How many", correctRight: "There are three" },
  { label: "cows", correctLeft: "How many", correctRight: "There are three" },
  { label: "dogs", correctLeft: "How many", correctRight: "There are one" },
  { label: "cats", correctLeft: "How many", correctRight: "There are two" },
];

const leftBank = ["How many"];
const rightBank = ["There are one", "There are two", "There are three"];
const allPhrases = [...leftBank, ...rightBank];

// ── Draggable chip ────────────────────────────
function DraggableChip({ id, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
    data: { value: id },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        borderRadius: "8px",
        border: "2px solid #2c5287",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: disabled ? "default" : "grab",
        background: "white",
        padding: "5px",
        opacity: isDragging ? 0.4 : 1,
        touchAction: "none",
      }}
    >
      {id}
    </div>
  );
}

// ── Droppable cell ────────────────────────────
function DroppableCell({
  id,
  value,
  isOver,
  disabled,
  onClear,
  className,
  extraStyle,
}) {
  const { setNodeRef } = useDroppable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${isOver ? "drag-over-cell" : ""}`}
      style={{
        cursor: !disabled && value ? "pointer" : "default",
        background: isOver ? "#e3f2fd" : "white",
        ...extraStyle,
      }}
      onClick={() => !disabled && value && onClear(id)}
    >
      {value}
    </div>
  );
}

// ── Main component ────────────────────────────
const WB_Unit9_Page1_Q2 = () => {
  // answers[i] = { left: "phrase text" | "", right: "phrase text" | "" }
  const [answers, setAnswers] = useState(
    questions.map(() => ({ left: "", right: "" })),
  );
  const [locked, setLocked] = useState(false);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const activeValue = activeId ?? null;

  // ── Drag handlers ──
  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragOver = ({ over }) => setOverId(over ? over.id : null);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    setOverId(null);
    if (!over || locked) return;

    const value = active.id; // phrase text is the id
    const dest = over.id; // e.g. "0-left", "2-right"

    // ignore drops back on the bank
    if (dest === "left-bank" || dest === "right-bank") return;

    const [qIndexStr, side] = dest.split("-");
    const qIndex = Number(qIndexStr);
    if (isNaN(qIndex)) return;

    setAnswers((prev) => {
      const copy = prev.map((a) => ({ ...a }));

      copy[qIndex][side] = value;
      return copy;
    });

    setShowResult(false);
  };

  // ── Click to clear ──
  const handleClear = (cellId) => {
    const [qIndexStr, side] = cellId.split("-");
    const qIndex = Number(qIndexStr);
    if (isNaN(qIndex)) return;

    setAnswers((prev) => {
      const copy = prev.map((a) => ({ ...a }));
      copy[qIndex][side] = "";
      return copy;
    });
    setWrongInputs([]);
    setShowResult(false);
  };

  // ── Buttons ──
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => a.left.trim() === "" || a.right.trim() === "")) {
      ValidationAlert.info("Please fill in all the blanks!");
      return;
    }

    let score = 0;
    let wrongs = [];

    questions.forEach((q, i) => {
      const leftCorrect =
        answers[i].left.trim().toLowerCase() === q.correctLeft.toLowerCase();
      const rightCorrect =
        answers[i].right.trim().toLowerCase() === q.correctRight.toLowerCase();

      if (leftCorrect && rightCorrect) {
        score++;
      } else {
        wrongs.push({ index: i, left: !leftCorrect, right: !rightCorrect });
      }
    });

    setWrongInputs(wrongs);
    setShowResult(true);

    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;margin-top:10px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>`;

    if (score === total) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const showAnswers = () => {
    setAnswers(
      questions.map((q) => ({ left: q.correctLeft, right: q.correctRight })),
    );
    setWrongInputs([]);
    setShowResult(false);
    setLocked(true);
  };

  const resetAll = () => {
    setAnswers(questions.map(() => ({ left: "", right: "" })));
    setWrongInputs([]);
    setShowResult(false);
    setLocked(false);
  };

  const isDisabled = locked || showResult;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
        <div className="div-forall" style={{ gap: "10px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">B</span> Look, read, and write.
          </h5>

          {/* ── Word bank ── */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {allPhrases.map((txt) => (
              <DraggableChip key={txt} id={txt} disabled={isDisabled} />
            ))}
          </div>

          <img src={farmImg} alt="farm" className="wb-unit9-p1-q2-image" />

          {/* ── Questions ── */}
          <div className="wb-unit9-p1-q2-questions w-full">
            {questions.map((q, i) => {
              const leftWrong =
                !locked &&
                showResult &&
                wrongInputs.some((w) => w.index === i && w.left);
              const rightWrong =
                !locked &&
                showResult &&
                wrongInputs.some((w) => w.index === i && w.right);

              return (
                <div key={i} className="wb-unit9-p1-q2-row">
                  <span className="wb-unit9-p1-q2-number">{i + 1}</span>

                  {/* Left cell */}
                  <div style={{ width: "100%" }}>
                    <div className="wb-unit9-p1-q2-input-wrapper">
                      <DroppableCell
                        id={`${i}-left`}
                        value={answers[i].left}
                        isOver={overId === `${i}-left`}
                        disabled={isDisabled}
                        onClear={handleClear}
                        className="wb-unit9-p1-q2-input"
                      />
                      {leftWrong && (
                        <div className="wb-unit9-p1-q2-wrong-mark">✕</div>
                      )}
                    </div>
                    <span className="wb-unit9-p1-q2-text">
                      {q.label} are there?
                    </span>
                  </div>

                  {/* Right cell */}
                  <div style={{ width: "100%" }}>
                    <div className="wb-unit9-p1-q2-input-wrapper">
                      <DroppableCell
                        id={`${i}-right`}
                        value={answers[i].right}
                        isOver={overId === `${i}-right`}
                        disabled={isDisabled}
                        onClear={handleClear}
                        className="wb-unit9-p1-q2-input"
                      />
                      {rightWrong && (
                        <div className="wb-unit9-p1-q2-wrong-mark">✕</div>
                      )}
                    </div>
                    <span className="wb-unit9-p1-q2-text">{q.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
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

      {/* ── Drag overlay ── */}
      <DragOverlay>
        {activeValue ? (
          <div
            style={{
              borderRadius: "8px",
              border: "2px solid #2c5287",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              background: "white",
              padding: "5px 10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "grabbing",
              whiteSpace: "nowrap",
            }}
          >
            {activeValue}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit9_Page1_Q2;
