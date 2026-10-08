import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U9/U9P52EXEE-01.svg";
import img2 from "../../../assets/U1 WB/U9/U9P52EXEE-02.svg";
import img3 from "../../../assets/U1 WB/U9/U9P52EXEE-03.svg";
import img4 from "../../../assets/unit3/imgs3/P26exeB-04.svg";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

import "./WB_Unit9_Page2_Q3.css";

// ─────────────────────────────────────────────
const correctData = ["2", "3", "1"];

const numberBank = [
  { id: "n1", text: "1" },
  { id: "n2", text: "2" },
  { id: "n3", text: "3" },
];

const options = [{ img: img1 }, { img: img2 }, { img: img3 }];

const sentences = [
  "How many horses are there? There are two horses.",
  "How many chickens are there? There are five chickens.",
  "How many cats are there? There is one cat.",
];

const getNumberText = (id) => numberBank.find((n) => n.id === id)?.text || "";

// ── Draggable number chip ─────────────────────
function DraggableNumber({ id, text, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
    data: { text },
  });

  return (
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
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        background: "#fff",
        cursor: disabled ? "default" : "grab",
        opacity: isDragging || disabled ? 0.4 : 1,
        touchAction: "none",
      }}
    >
      {text}
    </div>
  );
}

// ── Droppable cell ────────────────────────────
function DroppableCell({
  id,
  displayText,
  isOver,
  isWrong,
  disabled,
  onClear,
}) {
  const { setNodeRef } = useDroppable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      className={`wb-unit9-p2-q3-input ${isOver ? "drag-over-cell" : ""}`}
      style={{
        background: isOver ? "#e3f2fd" : "transparent",
        cursor: !disabled && displayText ? "pointer" : "default",
      }}
      onClick={() => !disabled && displayText && onClear(id)}
    >
      {displayText}
      {isWrong && <div className="unit3-q3-wrong">✕</div>}
    </div>
  );
}

// ── Main component ────────────────────────────
const WB_Unit9_Page2_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [showResult, setShowResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const activeText = activeId
    ? (numberBank.find((n) => n.id === activeId)?.text ?? null)
    : null;

  // ── Drag handlers ──
  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragOver = ({ over }) => setOverId(over ? over.id : null);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    setOverId(null);
    if (!over || showAnswer) return;

    const draggableId = active.id;
    const dest = over.id;

    if (!dest.startsWith("drop-")) return;

    const index = Number(dest.replace("drop-", ""));
    if (isNaN(index)) return;

    setAnswers((prev) => {
      const copy = [...prev];
      copy.forEach((val, i) => {
        if (val === draggableId) copy[i] = "";
      });
      copy[index] = draggableId;
      return copy;
    });

    setShowResult([]);
  };

  // ── Click to clear ──
  const handleClear = (cellId) => {
    const index = Number(cellId.replace("drop-", ""));
    if (isNaN(index)) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = "";
      return copy;
    });
    setShowResult([]);
  };

  // ── Buttons ──
  const handleShowAnswer = () => {
    setShowAnswer(true);
    setShowResult([]);
    setAnswers(
      correctData.map(
        (num) => numberBank.find((n) => n.text === num)?.id || "",
      ),
    );
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.includes("")) {
      ValidationAlert.info("Please fill all answer boxes before checking!");
      return;
    }

    const results = answers.map((val, i) =>
      getNumberText(val) === correctData[i] ? "correct" : "wrong",
    );

    setShowResult(results);
    setShowAnswer(true);

    const correctCount = results.filter((r) => r === "correct").length;
    const total = correctData.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size:20px;text-align:center;margin-top:8px;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers(["", "", ""]);
    setShowResult([]);
    setShowAnswer(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
            <span className="ex-A">E</span>Read and number the pictures.
          </h5>

          {/* ── Number bank ── */}
          <div
            style={{
              display: "flex",
              gap: 12,
              padding: 12,
              border: "2px dashed #ccc",
              borderRadius: 10,
              marginBottom: 20,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {numberBank.map((num) => (
              <DraggableNumber
                key={num.id}
                id={num.id}
                text={num.text}
                disabled={showAnswer || answers.includes(num.id)} // ← هون التعديل
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* Sentences */}
            <div className="word-container-wb-unit9-p2-q3">
              {sentences.map((item, index) => (
                <div key={index} className="sentence-container-wb-unit7-p5-q1">
                  <span className="number-wb-unit7-p5-q1">{index + 1}</span>
                  <p className="sentence-wb-unit8-p1-q1">{item}</p>
                </div>
              ))}
            </div>

            {/* Images + drop cells */}
            <div className="wb-unit9-p2-q3-grid">
              {options.map((item, index) => (
                <div key={index} className="wb-unit9-p2-q3-box">
                  <img src={item.img} alt="" />

                  <div className="wb-unit9-p2-q3-input-wrapper">
                    <DroppableCell
                      id={`drop-${index}`}
                      displayText={getNumberText(answers[index])}
                      isOver={overId === `drop-${index}`}
                      isWrong={showResult[index] === "wrong"}
                      disabled={showAnswer}
                      onClear={handleClear}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Action buttons ── */}
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

      {/* ── Drag overlay ── */}
      <DragOverlay>
        {activeText ? (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #2c5287",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              background: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "grabbing",
            }}
          >
            {activeText}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit9_Page2_Q3;
