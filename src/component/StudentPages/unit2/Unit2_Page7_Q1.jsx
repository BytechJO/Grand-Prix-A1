import React, { useState } from "react";
import "./Unit2_Page7_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Single draggable number chip */
function DraggableNumber({ item, isDragDisabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `num-${item.num}`,
    disabled: isDragDisabled,
  });

  return (
    <div className="word-number-unit2-p7-q1">
      <span
        ref={setNodeRef}
        className="num-word"
        style={{
          opacity: isDragging ? 0.4 : 1,
          cursor: isDragDisabled ? "default" : "grab",
          touchAction:"none"
        }}
        {...listeners}
        {...attributes}
      >
        {item.num}
      </span>
      <span className="word-label">{item.word}</span>
    </div>
  );
}

/** A single droppable slot cell */
function DroppableSlot({ id, value, isWrong, isChecked }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="input-wrapper1">
      <div
        className={[
          "input-sentence",
          isChecked && isWrong ? "wrong-input1" : "",
          isOver ? "drag-over-cell" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value || ""}
      </div>
      {isChecked && isWrong && <span className="wrong-icon">✕</span>}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

const Unit2_Page7_Q1 = () => {
  const words = [
    { word: "Good", num: 1 },
    { word: "evening", num: 2 },
    { word: "Goodbye", num: 3 },
    { word: "afternoon", num: 4 },
    { word: "!", num: 5 },
    { word: "Hello", num: 6 },
    { word: "How", num: 7 },
    { word: "morning", num: 8 },
    { word: "Fine", num: 9 },
    { word: "?", num: 10 },
    { word: "are", num: 11 },
    { word: "thank", num: 12 },
    { word: ",", num: 13 },
    { word: "I'm Helen", num: 14 },
    { word: "you", num: 15 },
    { word: ".", num: 16 },
  ];

  const correctAnswers2 = {
    a: ["How", "are", "you", "?"],
    b: ["Good", "morning", "!"],
    c: ["Fine", ",", "thank", "you", "."],
    d: ["Goodbye", "!"],
    e: ["Hello", "!", "I'm Helen", "."],
    f: ["Good", "afternoon", "!"],
  };

  const sentences = {
    a: [7, 11, 15, 10],
    b: [1, 8, 5],
    c: [9, 13, 12, 15, 16],
    d: [3, 5],
    e: [6, 5, 14, 16],
    f: [1, 4, 5],
  };

  const [userAnswers, setUserAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongInputs, setWrongInputs] = useState({});
  const [activeId, setActiveId] = useState(null); // for DragOverlay

  // ── Sensors: pointer (mouse) + touch (tablet/mobile) + keyboard ──
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // small threshold avoids accidental drags
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 }, // feels natural on tablet
    }),
    useSensor(KeyboardSensor),
  );

  // ── Drag handlers ──
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer) return;

    const overId = over.id;
    if (!overId.startsWith("slot-")) return;

    const [, key, indexStr] = overId.split("-");
    const num = Number(active.id.replace("num-", ""));
    const draggedWord = words.find((w) => w.num === num)?.word;
    if (!draggedWord) return;

    setUserAnswers((prev) => {
      const updated = { ...prev };
      if (!updated[key]) updated[key] = [];
      updated[key][Number(indexStr)] = draggedWord;
      return updated;
    });

    setWrongInputs({});
  };

  // ── Check / Show Answer / Reset ──
  const checkAnswers = () => {
    if (showAnswer) return;

    let tempScore = 0;
    let totalInputs = 0;
    let newWrongInputs = {};

    for (const key in sentences) {
      totalInputs += sentences[key].length;

      if (
        !userAnswers[key] ||
        userAnswers[key].length !== sentences[key].length
      ) {
        ValidationAlert.info(
          "Oops!",
          "Please fill all fields before checking.",
        );
        // alert("Please fill all fields before checking.");
        return;
      }

      newWrongInputs[key] = [];

      sentences[key].forEach((_, index) => {
        const entered = userAnswers[key][index]?.toLowerCase();
        const correct = correctAnswers2[key][index].toLowerCase();

        if (entered !== correct) {
          newWrongInputs[key][index] = true;
        } else {
          newWrongInputs[key][index] = false;
          tempScore++;
        }
      });
    }

    setWrongInputs(newWrongInputs);
    setChecked(true);

    const color =
      tempScore === totalInputs ? "green" : tempScore === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${tempScore} / ${total}</span>
      </div>`;

    if (tempScore === totalInputs) ValidationAlert.success(msg);
    else if (tempScore === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShowAnswer = () => {
    setUserAnswers(correctAnswers2);
    setShowAnswer(true);
    setChecked(false);
    setWrongInputs({});
  };

  const reset = () => {
    setUserAnswers({});
    setChecked(false);
    setShowAnswer(false);
    setWrongInputs({});
  };

  // Word shown in the drag overlay (floating ghost while dragging)
  const activeWord = activeId
    ? words.find((w) => w.num === Number(activeId.replace("num-", "")))?.word
    : null;

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
        <div className="div-forall" style={{ gap: "20px" }}>
          <h5 className="header-title-page8">
            <span className="mr-2">A</span> Match the numbers and find the
            hidden words!
          </h5>

          {/* ── Word chips (draggable source) ── */}
          {/* 
            dnd-kit لا يحتاج Droppable wrapper هنا.
            الأرقام قابلة للسحب مباشرة بدون container خاص.
          */}
          <div className="number-word-section">
            {words.map((item) => (
              <DraggableNumber
                key={item.num}
                item={item}
                isDragDisabled={showAnswer}
              />
            ))}
          </div>

          {/* ── Drop slots ── */}
          <div className="num-input-section">
            {Object.entries(sentences).map(([key, correctArray]) => (
              <div key={key} className="sentence-row">
                <span className="sentence-label">{key}</span>

                <div className="num-container">
                  {correctArray.map((num, i) => (
                    <span key={i} className="sentence-preview">
                      {num}
                    </span>
                  ))}
                </div>

                <div className="sentence-line">
                  {correctArray.map((_, index) => (
                    <DroppableSlot
                      key={index}
                      id={`slot-${key}-${index}`}
                      value={userAnswers[key]?.[index]}
                      isWrong={!!wrongInputs[key]?.[index]}
                      isChecked={checked}
                    />
                  ))}
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
          <button onClick={handleShowAnswer} className="show-answer-btn">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay: ghost chip that follows the finger/cursor ── */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "6px 14px",
              background: "#fff",
              border: "2px solid #4a90e2",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              width: "110px",
              textAlign: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit2_Page7_Q1;
