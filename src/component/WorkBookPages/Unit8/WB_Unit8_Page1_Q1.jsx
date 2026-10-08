import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U8/U8P45EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U8/U8P45EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U8/U8P45EXEA-03.svg";
import img4 from "../../../assets/U1 WB/U8/U8P45EXEA-04.svg";
import "./WB_Unit8_Page1_Q1.css";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Draggable Number Circle + Sentence ───────────────────────────────────────
const DraggableItem = ({ num, word, disabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: num,
    disabled,
  });

  return (
    <div className="sentence-container-wb-unit8-p1-q1">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "2px solid #2c5287",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          cursor: disabled ? "not-allowed" : "grab",
          background: "white",
          opacity: isDragging ? 0.3 : disabled ? 0.35 : 1,
          touchAction: "none",
          userSelect: "none",
          transition: "opacity 0.2s",
        }}
      >
        {num}
      </div>
      <span className="sentence-wb-unit8-p1-q1">{word}</span>
    </div>
  );
};

// ─── Number Bank ──────────────────────────────────────────────────────────────
const NumberBank = ({ words, showAnswer, usedNumbers }) => {
  const { setNodeRef } = useDroppable({ id: "number-bank" });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "grid",
        gap: "12px",
        padding: "10px",
        width: "100%",
        border: "2px dashed #ccc",
        borderRadius: "10px",
        marginBottom: "20px",
        justifyContent: "center",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "150px",
      }}
    >
      {["1", "2", "3", "4"].map((num, index) => (
        <DraggableItem
          key={num}
          num={num}
          word={words[index]}
          disabled={showAnswer || usedNumbers.has(num)}
        />
      ))}
    </div>
  );
};

// ─── Drop Zone under each image ───────────────────────────────────────────────
const DroppableCell = ({ id, value, result, disabled, onClear }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });

  const handleClick = () => {
    if (!disabled && value) onClear();
  };

  return (
    <div
      ref={setNodeRef}
      className="wb-unit7-p5-q1-input"
      onClick={handleClick}
      style={{
        background: isOver && !disabled ? "#e3f2fd" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        position: "relative",
        cursor: !disabled && value ? "pointer" : "default",
        transition: "background 0.2s",
      }}
      title={!disabled && value ? "Click to return to bank" : ""}
    >
      {value}
      {result === "wrong" && <div className="unit3-q3-wrong">✕</div>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit8_Page1_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [showResult, setShowResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const correctData = ["1", "3", "2", "4"];
  const words = [
    "Close my eyes.",
    "Raise your hand.",
    "Open your mouth.",
    "Touch your nose.",
  ];
  const options = [{ img: img1 }, { img: img2 }, { img: img3 }, { img: img4 }];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedNumbers = new Set(answers.filter(Boolean));

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer) return;

    const num = String(active.id);
    const destId = String(over.id);

    setAnswers((prev) => {
      const copy = [...prev];
      const oldIndex = copy.findIndex((v) => v === num);
      if (oldIndex !== -1) copy[oldIndex] = "";

      if (destId.startsWith("drop-")) {
        const targetIndex = Number(destId.replace("drop-", ""));
        copy[targetIndex] = num;
      }
      return copy;
    });

    setShowResult([]);
  };

  // Click on filled cell → return to bank
  const handleClear = (index) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = "";
      return copy;
    });
    setShowResult([]);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setShowResult([]);
    setAnswers(correctData);
  };

  const checkAnswers = () => {
    if (showAnswer) return;
    if (answers.includes("")) {
      ValidationAlert.info("Please fill all answer boxes before checking!");
      return;
    }
    const results = answers.map((value, index) =>
      value === correctData[index] ? "correct" : "wrong",
    );
    setShowResult(results);
    setShowAnswer(true);

    const correctCount = results.filter((r) => r === "correct").length;
    const total = correctData.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const resultHTML = `<div style="font-size:20px;text-align:center;margin-top:8px;">
      <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span></div>`;
    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers(["", "", "", ""]);
    setShowResult([]);
    setShowAnswer(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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
        <div
          className="div-forall"
          style={{
            gap: "50px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A">A</span>Drag and match.
          </h5>

          <NumberBank
            words={words}
            showAnswer={showAnswer}
            usedNumbers={usedNumbers}
          />

          <div className="wb-unit8-p1-q1-grid">
            {options.map((item, index) => (
              <div key={index} className="wb-unit8-p1-q1-box">
                <img src={item.img} className="unit3-q3-image" alt="" />
                <div className="wb-unit8-p1-q1-input-wrapper">
                  <DroppableCell
                    id={`drop-${index}`}
                    value={answers[index]}
                    result={showResult[index]}
                    disabled={showAnswer}
                    onClear={() => handleClear(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

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

      <DragOverlay>
        {activeId ? (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #2c5287",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit8_Page1_Q1;
