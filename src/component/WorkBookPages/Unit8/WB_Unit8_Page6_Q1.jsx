import React, { useState } from "react";
import "./WB_Unit8_Page6_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U8/U8P50EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U8/U8P50EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U8/U8P50EXEA-03.svg";
import img4 from "../../../assets/U1 WB/U8/U8P50EXEA-04.svg";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

const data = [
  { img: img1, scrambled: "beazr", answer: "z", pattern: "ebra" },
  { img: img2, scrambled: "ksoc",  answer: "s", pattern: "ock"  },
  { img: img3, scrambled: "perpzi", answer: "z", pattern: "ipper" },
  { img: img4, scrambled: "ozo",   answer: "s", pattern: "un"   },
];

const lettersBank = [...new Set(data.map((item) => item.answer))].map(
  (letter, i) => ({ id: `l-${i}`, value: letter })
);

// ── Draggable letter chip ──────────────────────────────────────────────────
function DraggableLetter({ id, value, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
    data: { value },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        cursor: disabled ? "default" : "grab",
        fontSize: "22px",
        opacity: isDragging ? 0.4 : 1,
        touchAction: "none",
      }}
    >
      {value}
    </div>
  );
}

// ── Droppable cell (one per question) ─────────────────────────────────────
function DroppableCell({ index, value, isOver, disabled, onClear }) {
  const { setNodeRef } = useDroppable({
    id: String(index),
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      className={`text-input ${isOver ? "drag-over-cell" : ""}`}
      onClick={() => !disabled && value && onClear(index)}
      style={{
        background: isOver ? "#e3f2fd" : "white",
        fontSize: "25px",
        fontWeight: "600",
        position: "relative",
        cursor: !disabled && value ? "pointer" : "default",
      }}
    >
      {value}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
const WB_Unit8_Page6_Q1 = () => {
  const [inputs, setInputs]         = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(Array(data.length).fill(false));
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId]     = useState(null);   // id of dragged item
  const [overId, setOverId]         = useState(null);    // droppable being hovered

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // value of the currently dragged letter
  const activeValue = activeId
    ? lettersBank.find((l) => l.id === activeId)?.value ?? null
    : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragOver  = ({ over })   => setOverId(over ? over.id : null);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    setOverId(null);
    if (!over || showAnswer) return;

    const targetIndex = Number(over.id);
    if (isNaN(targetIndex)) return;           // dropped back on the bank → ignore

    const letter = active.data.current?.value ?? "";

    setInputs((prev) => {
      const copy = [...prev];
      copy[targetIndex] = letter;
      return copy;
    });
    setWrongInputs(Array(data.length).fill(false));
  };

  const handleClearCell = (index) => {
    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = "";
      return copy;
    });
    setWrongInputs(Array(data.length).fill(false));
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (inputs.some((val) => val.trim() === "")) {
      ValidationAlert.info("Oops!", "Please fill in all the answers before checking.");
      return;
    }

    let correctCount = 0;
    const wrongFlags = [];

    data.forEach((item, index) => {
      if (inputs[index].toLowerCase() === item.answer) {
        correctCount++;
        wrongFlags[index] = false;
      } else {
        wrongFlags[index] = true;
      }
    });

    setWrongInputs(wrongFlags);
    setShowAnswer(true);

    const total = data.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>`;

    if (correctCount === total)  ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else                         ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    setInputs(data.map((item) => item.answer));
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(true);
  };

  const reset = () => {
    setInputs(Array(data.length).fill(""));
    setWrongInputs(Array(data.length).fill(false));
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
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "30px" }}>
          <h3 className="header-title-page8">
            <span className="ex-A">A</span>Drag the letter to the picture.
          </h3>

          {/* ── Letters bank ── */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {lettersBank.map((l) => (
              <DraggableLetter
                key={l.id}
                id={l.id}
                value={l.value}
                disabled={showAnswer}
              />
            ))}
          </div>

          {/* ── Question cards ── */}
          <div className="unscramble-row-wb-unit8-p6-q1">
            {data.map((item, index) => (
              <div className="unscramble-box" key={index}>
                <div className="img-box">
                  <img src={item.img} alt="" />
                </div>
                <div className="input-row">
                  <span className="num" style={{ fontSize: "25px", fontWeight: "600" }}>
                    {index + 1}
                  </span>

                  <div className="input-wrapper">
                    <DroppableCell
                      index={index}
                      value={inputs[index]}
                      isOver={overId === String(index)}
                      disabled={showAnswer}
                      onClear={handleClearCell}
                    />
                    {wrongInputs[index] && <div className="error-icon">✕</div>}
                  </div>

                  <span className="pattern" style={{ fontSize: "22px" }}>
                    {item.pattern}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag overlay (follows the cursor) ── */}
      <DragOverlay>
        {activeValue ? (
          <div
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              fontSize: "22px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "grabbing",
            }}
          >
            {activeValue}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit8_Page6_Q1;