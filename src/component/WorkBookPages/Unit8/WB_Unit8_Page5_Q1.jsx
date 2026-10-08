import "./WB_Unit8_Page5_Q1.css";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U8/U8P49EXEI-01.svg";
import img2 from "../../../assets/U1 WB/U8/U8P49EXEI-02.svg";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Draggable Number + Sentence ─────────────────────────────────────────────
const DraggableNumber = ({ num, word, disabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: num,
    disabled,
  });

  return (
    <div className="sentence-container-wb-unit8-p5-q1">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          width: 40,
          height: 40,
          border: "2px solid #2c5287",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          background: "white",
          cursor: disabled ? "default" : "grab",
          opacity: isDragging || disabled ? 0.3 : 1,
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {num}
      </div>
      <p className="sentence-wb-unit7-p5-q1">{word}</p>
    </div>
  );
};

// ─── Number Bank (droppable) ──────────────────────────────────────────────────
const NumberBank = ({ numberBank, words, showAnswer, usedNumbers }) => {
  const { setNodeRef } = useDroppable({ id: "numbers" });

  return (
    <div ref={setNodeRef} className="word-container-wb-unit8-p5-q1">
      {numberBank.map((n, i) => (
        <DraggableNumber
          key={n}
          num={n}
          word={words[i]}
          disabled={showAnswer || usedNumbers.has(n)}
        />
      ))}
    </div>
  );
};

// ─── Drop Cell (positioned over image) ───────────────────────────────────────
const DropCell = ({ id, value, result, disabled, style, onClear }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled });
  const handleClick = () => {
    if (!disabled && value) onClear();
  };

  return (
    <div
      ref={setNodeRef}
      onClick={handleClick}
      className={`number-input ${isOver && !disabled ? "drag-over-cell" : ""}`}
      style={{
        ...style,
        background: isOver && !disabled ? "#e3f2fd" : "white",
        cursor: !disabled ? "pointer" : "default",
        position: "absolute",
      }}
    >
      {value}
      {result === "wrong" && <span className="wrong-circle">✕</span>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit8_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [showResult, setShowResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const correctData = ["4", "5", "1", "3", "2"];
  const numberBank = ["1", "2", "3", "4", "5"];
  const words = [
    "This is my leg.",
    "This is my arm.",
    "This is my head.",
    "This is my eye.",
    "This is my nose.",
  ];

  const cellPositions = [
    { top: "17%", left: "19%" },
    { top: "19%", left: "75%" },
    { top: "69%", left: "22%" },
    { top: "8%", left: "80%" },
    { top: "42%", left: "79%" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedNumbers = new Set(answers.filter(Boolean));

  const handleDragStart = ({ active }) => setActiveId(active.id);
  // Click on filled cell → return to bank
  const handleClear = (index) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = "";
      return copy;
    });
    setShowResult([]);
  };
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer) return;

    const number = String(active.id);
    const destId = String(over.id);

    if (destId === "numbers") {
      setAnswers((prev) => {
        const copy = [...prev];
        copy.forEach((v, i) => {
          if (v === number) copy[i] = "";
        });
        return copy;
      });
      setShowResult([]);
      return;
    }

    const targetIndex = Number(destId);
    if (isNaN(targetIndex)) return;

    setAnswers((prev) => {
      const copy = [...prev];
      copy.forEach((v, i) => {
        if (v === number) copy[i] = "";
      });
      copy[targetIndex] = number;
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
    const scoreMsg = `${correctCount} / ${total}`;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size:20px;text-align:center;margin-top:8px;">
        <span style="color:${color};font-weight:bold;">Score: ${scoreMsg}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers(["", "", "", "", ""]);
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
        <div className="div-forall" style={{ gap: "15px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">I</span>Drag and number.
          </h5>

          {/* Images with Drop Cells */}
          <div className="look-number-wrapper">
            <div className="image-area">
              <img
                src={img1}
                alt="boy"
                style={{ width: "100%", height: "300px" }}
              />
              {[0, 1, 2].map((idx) => (
                <DropCell
                  key={idx}
                  id={String(idx)}
                  value={answers[idx]}
                  result={showResult[idx]}
                  disabled={showAnswer}
                  onClear={() => handleClear(idx)}
                  style={{
                    top: cellPositions[idx].top,
                    left: cellPositions[idx].left,
                  }}
                />
              ))}
            </div>

            <div className="image-area">
              <img src={img2} alt="boy" style={{ height: "300px" }} />
              {[3, 4].map((idx) => (
                <DropCell
                  key={idx}
                  id={String(idx)}
                  value={answers[idx]}
                  result={showResult[idx]}
                  onClear={() => handleClear(idx)}
                  disabled={showAnswer}
                  style={{
                    top: cellPositions[idx].top,
                    left: cellPositions[idx].left,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Number Bank */}
          <NumberBank
            numberBank={numberBank}
            words={words}
            showAnswer={showAnswer}
            usedNumbers={usedNumbers}
          />
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
              border: "2px solid #2c5287",
              borderRadius: 8,
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

export default WB_Unit8_Page5_Q1;
