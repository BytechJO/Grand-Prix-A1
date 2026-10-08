import "./Unit3_Page5_Q3.css";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/unit3/imgs3/P26exeB-01.svg";
import img2 from "../../../assets/unit3/imgs3/P26exeB-02.svg";
import img3 from "../../../assets/unit3/imgs3/P26exeB-03.svg";
import img4 from "../../../assets/unit3/imgs3/P26exeB-04.svg";
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
      style={{
        width: "40px",
        height: "40px",
        border: `2px solid ${isUsed ? "#aab3c4" : "#2c5287"}`,
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        background: isUsed ? "#f0f2f5" : "white",
        cursor: disabled || isUsed ? "default" : "grab",
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
const DropSlot = ({ index, value, isWrong, showAnswer, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${index}`,
    disabled: showAnswer,
  });

  return (
    <div className="unit3-q3-input-wrapper">
      <div
        ref={setNodeRef}
        className={`unit3-q3-input ${isOver ? "drag-over-cell" : ""}`}
        style={{
          background: isOver ? "#e3f2fd" : "white",
          cursor: value && !showAnswer ? "pointer" : "default",
          userSelect: "none",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={value && !showAnswer ? onRemove : undefined}
        title={value && !showAnswer ? "Click to remove" : ""}
      >
        {value && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
            {value}
           
          </span>
        )}
      </div>

      {isWrong && (
        <div className="unit3-q3-wrong">✕</div>
      )}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit3_Page5_Q3 = () => {
  const correctData = ["5", "3", "2", "8"];
  const numberBank = ["2", "3", "5", "8"];
  const options = [{ img: img1 }, { img: img2 }, { img: img3 }, { img: img4 }];

  const [answers, setAnswers] = useState([null, null, null, null]);
  const [showResult, setShowResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeNum, setActiveNum] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Numbers currently placed in a slot
  const usedNums = new Set(answers.filter(Boolean));

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveNum(active.id.replace("num-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveNum(null);
    if (!over || showAnswer) return;

    const value = active.id.replace("num-", "");

    if (over.id.startsWith("drop-")) {
      const index = Number(over.id.replace("drop-", ""));

      setAnswers((prev) => {
        const copy = [...prev];

        // Remove from old slot (no duplicates)
        const oldIndex = copy.findIndex((v) => v === value);
        if (oldIndex !== -1) copy[oldIndex] = null;

        copy[index] = value;
        return copy;
      });

      setShowResult([]);
    }
  };

  const onDragCancel = () => setActiveNum(null);

  // Click on placed number → return it to the bank
  const removeAnswer = (index) => {
    if (showAnswer) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    setShowResult([]);
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    setShowAnswer(true);
    setShowResult([]);
    setAnswers(correctData);
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    const filledAnswers = [...answers];
    filledAnswers[0] = correctData[0]; // first slot is auto-correct

    if (filledAnswers.some((v) => v === null)) {
      ValidationAlert.info("Please fill all answer boxes before checking!");
      return;
    }

    const results = filledAnswers.map((value, index) =>
      value === correctData[index] ? "correct" : "wrong"
    );

    setShowResult(results);
    setShowAnswer(true);

    const correctCount = results.filter((r) => r === "correct").length;
    const total = correctData.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers([null, null, null, null]);
    setShowResult([]);
    setShowAnswer(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div
        className="unit3-q3-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "30px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">B</span> Count and drag the correct number.
          </h5>

          {/* ── Number Bank ────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "40px",
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
                disabled={showAnswer}
                isUsed={usedNums.has(num)}
              />
            ))}
          </div>

          {/* ── Images + Slots ─────────────────────────────────────────────── */}
          <div className="unit3-q3-grid">
            {options.map((item, index) => (
              <div key={index} className="unit3-q3-box">
                <img src={item.img} className="unit3-q3-image" alt="" />
                <DropSlot
                  index={index}
                  value={answers[index]}
                  isWrong={showResult[index] === "wrong"}
                  showAnswer={showAnswer}
                  onRemove={() => removeAnswer(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ────────────────────────────────────────────────────────── */}
        <div className="action-buttons-container">
          <button onClick={resetAnswers} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn">
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
            style={{
              width: "40px",
              height: "40px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              background: "white",
              boxShadow: "0 5px 15px rgba(0,0,0,.2)",
            }}
          >
            {activeNum}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit3_Page5_Q3;