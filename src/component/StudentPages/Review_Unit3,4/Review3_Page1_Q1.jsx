import React, { useState } from "react";
import deer from "../../../assets/unit4/imgs/U4P34EXEA-01.svg";
import duck from "../../../assets/unit4/imgs/U4P34EXEA-02.svg";
import taxi from "../../../assets/unit4/imgs/U4P34EXEA-03.svg";
import tiger from "../../../assets/unit4/imgs/U4P34EXEA-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page1_Q1.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

// ─── Draggable Number (Word Bank) ─────────────────────────────────────────────
const DraggableNum = ({ id, num, disabled, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="missing-input"
      style={{
        padding: "2px 5px",
        border: `2px solid ${isUsed ? "#aab3c4" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#f0f2f5" : "white",
        fontWeight: "bold",
        cursor: disabled || isUsed ? "default" : "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isDragging ? 0.4 : isUsed ? 0.45 : 1,
        color: isUsed ? "#9aa3b0" : "inherit",
        transition: "all 0.2s ease",
        userSelect: "none",
          touchAction:"none"
      }}
    >
      {num}
    </div>
  );
};

// ─── Droppable Slot ────────────────────────────────────────────────────────────
const DropSlot = ({ index, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-${index}` });

  return (
    <div
      ref={setNodeRef}
      className={`number-input-review3-p1-q1 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        background: isOver ? "#e3f2fd" : "white",
        position: "relative",
        cursor: value && !locked ? "pointer" : "default",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={value && !locked ? onRemove : undefined}
      title={value && !locked ? "Click to remove" : ""}
    >
      {value && (
        <span
          style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
        >
          {value}
        
        </span>
      )}
      {isWrong && <div className="error-circle">✕</div>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Review3_Page1_Q1 = () => {
  const data = [
    { word: "Quiet!", src: deer, num: "3" },
    { word: "Close your book.", src: duck, num: "4" },
    { word: "Make a line.", src: taxi, num: "1" },
    { word: "Listen!", src: tiger, num: "2" },
  ];

  const numberBank = ["1", "2", "3", "4"];

  const [answers, setAnswers] = useState(Array(data.length).fill(null));
  const [wrongNumbers, setWrongNumbers] = useState(data.map(() => false));
  const [locked, setLocked] = useState(false);
  const [activeNum, setActiveNum] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedNums = new Set(answers.filter(Boolean));

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveNum(active.id.replace("num-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveNum(null);
    if (!over || locked) return;

    const value = active.id.replace("num-", "");

    if (over.id.startsWith("drop-")) {
      const index = Number(over.id.replace("drop-", ""));

      setAnswers((prev) => {
        const copy = [...prev];
        const oldIndex = copy.findIndex((v) => v === value);
        if (oldIndex !== -1) copy[oldIndex] = null;
        copy[index] = value;
        return copy;
      });

      setWrongNumbers(data.map(() => false));
    }
  };

  const onDragCancel = () => setActiveNum(null);

  // Click on placed number → return to bank
  const removeAnswer = (index) => {
    if (locked) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    setWrongNumbers(data.map(() => false));
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((v) => v === null)) {
      ValidationAlert.info(
        "Oops!",
        "Please complete all answers before checking.",
      );
      return;
    }

    const numberWrongs = answers.map((val, i) => val !== data[i].num);
    const correctCount = answers.filter((val, i) => val === data[i].num).length;

    setWrongNumbers(numberWrongs);
    setLocked(true);

    const total = data.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    ValidationAlert[
      correctCount === total
        ? "success"
        : correctCount === 0
          ? "error"
          : "warning"
    ](`
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>
    `);
  };

  const showAnswer = () => {
    setAnswers(data.map((item) => item.num));
    setWrongNumbers(data.map(() => false));
    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(data.length).fill(null));
    setWrongNumbers(data.map(() => false));
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
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
            gap: "60px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="mr-2">A</span> Drag the number to the correct box.
          </h5>

          {/* ── Number Bank ────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "30px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              justifyContent: "center",
            }}
          >
            {numberBank.map((num) => (
              <DraggableNum
                key={num}
                id={`num-${num}`}
                num={num}
                disabled={locked}
                isUsed={usedNums.has(num)}
              />
            ))}
          </div>

          {/* ── Images + Inputs (each image above its own input) ───────────── */}
          <div className="exercise-image-div-review3-p1-q1 w-full">
            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <img
                  src={item.src}
                  className="exercise-image-review3-p1-q1"
                  alt=""
                />
                <div className="flex gap-2 items-center">
                  <DropSlot
                    index={index}
                    value={answers[index]}
                    isWrong={wrongNumbers[index]}
                    locked={locked}
                    onRemove={() => removeAnswer(index)}
                  />
                  <span style={{ textAlign: "center", fontSize: "18px" }}>
                    {item.word}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ────────────────────────────────────────────────────────── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            onClick={showAnswer}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ───────────────────────────────────────────────────── */}
      <DragOverlay>
        {activeNum ? (
          <div
            className="missing-input"
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,.2)",
              minWidth: "36px",
              minHeight: "36px",
            }}
          >
            {activeNum}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review3_Page1_Q1;
