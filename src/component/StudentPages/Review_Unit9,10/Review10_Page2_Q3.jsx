import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review10_Page2_Q3.css";
import img1 from "../../../assets/unit10/imgs/U10P91EXEF-01.svg";
import img2 from "../../../assets/unit10/imgs/U10P91EXEF-02.svg";
import img3 from "../../../assets/unit10/imgs/U10P91EXEF-03.svg";
import img4 from "../../../assets/unit10/imgs/U10P91EXEF-04.svg";
import img5 from "../../../assets/unit10/imgs/U10P91EXEF-05.svg";
import img6 from "../../../assets/unit10/imgs/U10P91EXEF-06.svg";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Data ─────────────────────────────────────────────────────────────────────

const data = [
  {
    parts: [
      { before: "The little", middleImg: img1, after: "" },
      { before: "is in",      middleImg: img2, after: "" },
      { before: "with",       middleImg: img3, after: "" },
      { before: "",           middleImg: img4, after: "s." },
    ],
    correct: ["hen", "bed", "ten", "egg"],
  },
  {
    parts: [
      { before: "The",        middleImg: img5, after: "" },
      { before: " is in the ", middleImg: img6, after: "." },
    ],
    correct: ["net", "jet"],
  },
];

const bankWords = Array.from(new Set(data.flatMap((d) => d.correct)));

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

const BankChip = ({ word, index, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${word}-${index}`,
    disabled: isUsed || locked,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: `2px solid ${isUsed ? "#b0b0b0" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: isUsed ? "#999" : undefined,
        cursor: isUsed || locked ? "not-allowed" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.35 : 1,
        transition: "opacity 0.2s, background 0.2s, border-color 0.2s, color 0.2s",
        userSelect: "none",
        touchAction: "none",
        pointerEvents: isUsed ? "none" : undefined,
      }}
    >
      {word}
    </div>
  );
};

// ─── Slot Drop Zone (Droppable) ───────────────────────────────────────────────

const SlotDropZone = ({ id, value, activeWord, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const displayValue = isOver && activeWord ? activeWord : value;
  const isPlaceholder = isOver && activeWord && !value;

  return (
    <div className="input-wrapper-review10-p2-q3">
      <input
        ref={setNodeRef}
        className={`letter-input-review10-p2-q3 ${isOver ? "drag-over-cell" : ""}`}
        value={value || ""}
        readOnly
        onClick={() => { if (value && !locked) onRemove(id); }}
        style={{
          // background: isOver ? "#e3f2fd" : undefined,
          cursor: value && !locked ? "pointer" : "default",
          // color: isPlaceholder ? "#90a4ae" : undefined,
          transition: "background 0.15s, color 0.15s",
        }}
        title={value && !locked ? "Click to remove" : ""}
      />
      {isWrong && (
        <span className="wrong-icon-review4-p2-q1">✕</span>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Review10_Page2_Q3 = () => {
  const [answers, setAnswers] = useState(
    data.map((d) => Array(d.correct.length).fill(""))
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // استخرج الكلمة من الـ id (bank-hen-0 → "hen")
  const activeWord = activeId
    ? activeId.split("-").slice(1, -1).join("-")
    : null;

  const usedWords = answers.flat().filter(Boolean);

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    if (!over.id.startsWith("blank-")) return;

    const draggedWord = active.id.split("-").slice(1, -1).join("-");
    const [newQ, newBlank] = over.id
      .replace("blank-", "")
      .split("-")
      .map(Number);

    setAnswers((prev) => {
      const updated = prev.map((row) => [...row]);
      // شيل الكلمة من مكانها القديم
      updated.forEach((row, r) =>
        row.forEach((val, c) => {
          if (val === draggedWord) updated[r][c] = "";
        })
      );
      updated[newQ][newBlank] = draggedWord;
      return updated;
    });

    setWrongInputs([]);
  };

  // ─── Remove on Click ──────────────────────────────────────────────────────

  const handleRemove = (slotId) => {
    const [qIndex, blankIndex] = slotId
      .replace("blank-", "")
      .split("-")
      .map(Number);

    setAnswers((prev) => {
      const updated = prev.map((row) => [...row]);
      updated[qIndex][blankIndex] = "";
      return updated;
    });
    setWrongInputs([]);
  };

  // ─── Check ────────────────────────────────────────────────────────────────

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((arr) => arr.some((val) => val.trim() === ""));
    if (hasEmpty) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    let wrong = [];
    let correctCount = 0;

    answers.forEach((arr, qIndex) => {
      arr.forEach((val, blankIndex) => {
        if (val.trim() === data[qIndex].correct[blankIndex]) correctCount++;
        else wrong.push(`${qIndex}-${blankIndex}`);
      });
    });

    setWrongInputs(wrong);
    setLocked(true);

    const totalInputs = data.reduce((acc, item) => acc + item.correct.length, 0);
    const color = correctCount === totalInputs ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${totalInputs}
        </span>
      </div>`;

    if (correctCount === totalInputs) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────

  const reset = () => {
    setAnswers(data.map((d) => Array(d.correct.length).fill("")));
    setWrongInputs([]);
    setLocked(false);
  };

  // ─── Show Answer ──────────────────────────────────────────────────────────

  const showAnswer = () => {
    setAnswers(data.map((d) => [...d.correct]));
    setWrongInputs([]);
    setLocked(true);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper">
        <div className="div-forall" style={{ gap: "20px" }}>
          <h3 className="header-title-page8">
            <span className="mr-2">F</span> Drag and drop the words to make
            sentences.
          </h3>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {bankWords.map((word, i) => (
              <BankChip
                key={`bank-${word}-${i}`}
                word={word}
                index={i}
                isUsed={usedWords.includes(word)}
                locked={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          {data.map((item, qIndex) => (
            <div className="row-missing" key={qIndex}>
              <span className="num">{qIndex + 1}.</span>

              <div className="sentence-review10-p2-q3">
                {item.parts.map((p, blankIndex) => (
                  <span
                    key={blankIndex}
                    className="sentence-part"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {p.before}

                    <SlotDropZone
                      id={`blank-${qIndex}-${blankIndex}`}
                      value={answers[qIndex][blankIndex]}
                      activeWord={activeWord}
                      isWrong={wrongInputs.includes(`${qIndex}-${blankIndex}`)}
                      locked={locked}
                      onRemove={handleRemove}
                    />

                    {p.after}
                    <img src={p.middleImg} className="middle-img-review10-p2-q3" alt="" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button onClick={showAnswer} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answers ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review10_Page2_Q3;