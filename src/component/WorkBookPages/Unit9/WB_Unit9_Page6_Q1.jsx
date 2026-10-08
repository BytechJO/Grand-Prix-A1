import React, { useState } from "react";
import "./WB_Unit9_Page6_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U9/U9P56EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U9/U9P56EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U9/U9P56EXEA-03.svg";
import img4 from "../../../assets/U1 WB/U9/U9P56EXEA-04.svg";
import img5 from "../../../assets/U1 WB/U9/U9P56EXEA-05.svg";
import img6 from "../../../assets/U1 WB/U9/U9P56EXEA-06.svg";

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
const data = [
  { img: img1, answer: "n", pattern: "ight" },
  { img: img2, answer: "m", pattern: "an" },
  { img: img3, answer: "m", pattern: "om" },
  { img: img4, answer: "n", pattern: "urse" },
  { img: img5, answer: "m", pattern: "ilk" },
  { img: img6, answer: "n", pattern: "est" },
];

const letterBank = [
  { id: "l-m", text: "m" },
  { id: "l-n", text: "n" },
];

const getLetterText = (id) => letterBank.find((l) => l.id === id)?.text || "";

// ── Draggable letter chip ─────────────────────
function DraggableLetter({ id, text, disabled }) {
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
        width: "45px",
        height: "45px",
        fontSize: "24px",
        fontWeight: "700",
        border: "2px solid #0d47a1",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        cursor: disabled ? "default" : "grab",
        opacity: isDragging || disabled ? 0.4 : 1,
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
}

// ── Droppable letter cell ─────────────────────
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
      className={`text-input ${isOver ? "drag-over-cell" : ""}`}
      style={{
        background: isOver ? "#e3f2fd" : "white",
        fontSize: "25px",
        width: "30px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: !disabled && displayText ? "pointer" : "default",
        position: "relative",
      }}
      onClick={() => !disabled && displayText && onClear(id)}
    >
      {displayText}
      {isWrong && <div className="error-icon">✕</div>}
    </div>
  );
}

// ── Main component ────────────────────────────
const WB_Unit9_Page6_Q1 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const activeText = activeId
    ? (letterBank.find((l) => l.id === activeId)?.text ?? null)
    : null;

  // ── Drag handlers ──
  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragOver = ({ over }) => setOverId(over ? over.id : null);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    setOverId(null);
    if (!over || showAnswer) return;

    const dest = over.id;
    if (!dest.startsWith("drop-")) return;

    const index = Number(dest.replace("drop-", ""));
    if (isNaN(index)) return;

    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = active.id;
      return copy;
    });

    setWrongInputs(Array(data.length).fill(false));
  };

  // ── Click to clear ──
  const handleClear = (cellId) => {
    const index = Number(cellId.replace("drop-", ""));
    if (isNaN(index)) return;
    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = "";
      return copy;
    });
    setWrongInputs(Array(data.length).fill(false));
  };

  // ── Buttons ──
  const handleShowAnswer = () => {
    setInputs(
      data.map(
        (item) => letterBank.find((l) => l.text === item.answer)?.id || "",
      ),
    );
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(true);
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (inputs.some((val) => val === "")) {
      ValidationAlert.info("Please fill in all the answers before checking.");
      return;
    }

    let correctCount = 0;
    const wrongFlags = data.map((item, i) => {
      const isCorrect = getLetterText(inputs[i]) === item.answer;
      if (isCorrect) correctCount++;
      return !isCorrect;
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

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
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
        <div
          className="div-forall"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            // width: "60%",
            justifyContent: "flex-start",
          }}
        >
          <h3 className="header-title-page8">
            <span className="ex-A">A</span>Drag the letter to the picture.
          </h3>

          {/* ── Letter bank ── */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "12px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              justifyContent: "center",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            {letterBank.map((l) => (
              <DraggableLetter
                key={l.id}
                id={l.id}
                text={l.text}
                disabled={showAnswer}
              />
            ))}
          </div>

          {/* ── Cards grid ── */}
          <div className="unscramble-row-wb-unit9-p6-q1">
            {data.map((item, index) => (
              <div className="unscramble-box-wb-unit9-p6-q1" key={index}>
                <div className="img-box-wb-unit9-p6-q1">
                  <img src={item.img} alt="" style={{ height: "110px" }} />
                </div>

                <div className="input-row">
                  <span
                    style={{ fontSize: "25px", fontWeight: "600" }}
                    className="num"
                  >
                    {index + 1}
                  </span>

                  <div
                    className="input-wrapper"
                    style={{ width: "fit-content" }}
                  >
                    <DroppableCell
                      id={`drop-${index}`}
                      displayText={getLetterText(inputs[index])}
                      isOver={overId === `drop-${index}`}
                      isWrong={wrongInputs[index]}
                      disabled={showAnswer}
                      onClear={handleClear}
                    />
                  </div>

                  <span className="pattern" style={{ fontSize: "22px" }}>
                    {item.pattern}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
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
              width: "45px",
              height: "45px",
              fontSize: "24px",
              fontWeight: "700",
              border: "2px solid #0d47a1",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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

export default WB_Unit9_Page6_Q1;
