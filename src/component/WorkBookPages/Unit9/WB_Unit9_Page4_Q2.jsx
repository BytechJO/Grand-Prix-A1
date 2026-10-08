import React, { useState } from "react";
import deer from "../../../assets/U1 WB/U9/U9P54EXEI-01.svg";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit9_Page4_Q2.css";

// ─────────────────────────────────────────────
const correctData = ["one", "two", "three"];

const wordBank = [
  { id: "w1", text: "one" },
  { id: "w2", text: "two" },
  { id: "w3", text: "three" },
];

const questions = [
  { prefix: "There are", blank: true, suffix: "cows.", useIs: false },
  { prefix: "There are", blank: true, suffix: "cats.", useIs: false },
  { prefix: "There is", blank: true, suffix: "dog.", useIs: true },
];

const getWordText = (id) => wordBank.find((w) => w.id === id)?.text || "";

// ── Draggable word chip ───────────────────────
function DraggableWord({ id, text, disabled }) {
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
        padding: "8px 16px",
        border: "2px solid #0d47a1",
        borderRadius: "8px",
        background: "#fff",
        fontWeight: "600",
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

// ── Droppable answer cell ─────────────────────
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
      className={`q-input-wb-unit9-p4-q2 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        background: isOver ? "#e3f2fd" : "white",
        cursor: !disabled && displayText ? "pointer" : "default",
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "90px",
      }}
      onClick={() => !disabled && displayText && onClear(id)}
    >
      {displayText}
      {isWrong && <span className="wrong-icon-review6-p1-q3">✕</span>}
    </div>
  );
}

// ── Main component ────────────────────────────
const WB_Unit9_Page4_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [showResult, setShowResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const activeText = activeId
    ? (wordBank.find((w) => w.id === activeId)?.text ?? null)
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
      // إزالة الكلمة من أي خلية ثانية
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
  const showCorrectAnswers = () => {
    setShowAnswer(true);
    setShowResult([]);
    setAnswers(
      correctData.map(
        (word) => wordBank.find((w) => w.text === word)?.id || "",
      ),
    );
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.includes("")) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    const results = answers.map((val, i) =>
      getWordText(val) === correctData[i] ? "correct" : "wrong",
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

  const reset = () => {
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
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "10px" }}>
          <h3 className="header-title-page8">
            <span className="ex-A">I</span>Count and write.
          </h3>

          {/* ── Word bank ── */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "12px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {wordBank.map((w) => (
              <DraggableWord
                key={w.id}
                id={w.id}
                text={w.text}
                disabled={showAnswer || answers.includes(w.id)}
              />
            ))}
          </div>

          {/* ── Questions + image ── */}
          <div className="content-wb-unit9-p4-q2 w-full">
            <div className="group-input-unit5-p5-q3">
              {questions.map((q, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    margin: "10px",
                    width: "100%",
                    // flexWrap: "wrap",
                  }}
                >
                  {/* رقم السؤال */}
                  <span
                    className="q-number"
                    style={{
                      color: "#0d47a1",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    {index + 1}.
                  </span>

                  {/* نص البداية */}
                  <span
                    style={{
                      fontWeight: "500",
                      width: "100px",
                      fontSize: "17px",
                    }}
                  >
                    {q.prefix}
                  </span>

                  {/* خلية الإجابة */}
                  <DroppableCell
                    id={`drop-${index}`}
                    displayText={getWordText(answers[index])}
                    isOver={overId === `drop-${index}`}
                    isWrong={showResult[index] === "wrong"}
                    disabled={showAnswer}
                    onClear={handleClear}
                  />

                  {/* نص النهاية */}
                  <span style={{ fontWeight: "500", fontSize: "17px" }}>
                    {q.suffix}
                  </span>
                </div>
              ))}
            </div>

            <img
              src={deer}
              className="shape-img-wb-unit9-p4-q2"
              alt=""
              style={{ height: "300px", width: "auto" }}
            />
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button className="show-answer-btn" onClick={showCorrectAnswers}>
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag overlay ── */}
      <DragOverlay>
        {activeText ? (
          <div
            style={{
              padding: "8px 16px",
              border: "2px solid #0d47a1",
              borderRadius: "8px",
              background: "#fff",
              fontWeight: "600",
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

export default WB_Unit9_Page4_Q2;
