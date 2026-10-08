import React, { useState } from "react";
import bat from "../../../assets/unit10/imgs/U10P87EXEE01-01.svg";
import cap from "../../../assets/unit10/imgs/U10P87EXEE01-02.svg";
import ant from "../../../assets/unit10/imgs/U10P87EXEE02-01.svg";
import dad from "../../../assets/unit10/imgs/U10P87EXEE02-02.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit10_Page6_Q2.css";

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

const items = [
  {
    question: "What do you want?",
    images: [
      { img: bat, value: "chicken" },
      { img: cap, value: "apple" },
    ],
    correct: "chicken",
    correctInput: "I want",
    afterAnswer: "chicken.",
    inputsCount: 1,
  },
  {
    question: "",
    images: [
      { img: ant, value: "cake" },
      { img: dad, value: "orange" },
    ],
    correct: "orange",
    correctInput: "I want an",
    correctQuestion: "What do you want",
    afterAnswer: "orange.",
    inputsCount: 2,
  },
];

const wordBank = ["What do you want", "I want", "I want an"];

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

const BankChip = ({ word, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
    disabled: isUsed || locked,
  });

  return (
    <span
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
        display: "inline-block",
        pointerEvents: isUsed ? "none" : undefined,
      }}
    >
      {word}
    </span>
  );
};

// ─── Slot Drop Zone (Droppable) ───────────────────────────────────────────────

const SlotDropZone = ({ id, value, activeWord, isWrong, locked, onRemove, className }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const displayValue = isOver && activeWord ? activeWord : value;
  const isPlaceholder = isOver && activeWord && !value;

  return (
    <div
      ref={setNodeRef}
      className={`${className || "write-input-unit4-page5-q1"} ${isOver ? "drag-over-cell" : ""}`}
      style={{
        // background: isOver ? "#e3f2fd" : undefined,
        cursor: value && !locked ? "pointer" : "default",
        // color: isPlaceholder ? "#90a4ae" : undefined,
        transition: "background 0.15s, color 0.15s",
      }}
      onClick={() => { if (value && !locked) onRemove(id); }}
      title={value && !locked ? "Click to remove" : ""}
    >
      {value || ""}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Unit10_Page6_Q2 = () => {
  const [selected, setSelected] = useState(["", ""]);
  const [answers, setAnswers] = useState([[""], ["", ""]]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeWord = activeId ? activeId.replace("word-", "") : null;

  // كل الكلمات المستخدمة حالياً في الفراغات
  const usedWords = answers.flat().filter(Boolean);
  const isWordUsed = (word) => usedWords.includes(word);

  // ─── Image Select ─────────────────────────────────────────────────────────

  const handleSelect = (value, index) => {
    if (showResult) return;
    const newSel = [...selected];
    newSel[index] = value;
    setSelected(newSel);
  };

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showResult) return;

    const value = active.id.replace("word-", "");
    if (!over.id.startsWith("slot-")) return;

    const [qIndex, inputIndex] = over.id
      .replace("slot-", "")
      .split("-")
      .map(Number);

    setAnswers((prev) => {
      const updated = prev.map((row) => [...row]);
      // منع التكرار - شيل الكلمة من مكانها القديم
      updated.forEach((row, r) =>
        row.forEach((cell, c) => {
          if (cell === value) updated[r][c] = "";
        })
      );
      updated[qIndex][inputIndex] = value;
      return updated;
    });

    setShowResult(false);
  };

  // ─── Remove on Click ──────────────────────────────────────────────────────

  const handleRemove = (slotId) => {
    const [qIndex, inputIndex] = slotId
      .replace("slot-", "")
      .split("-")
      .map(Number);

    setAnswers((prev) => {
      const updated = prev.map((row) => [...row]);
      updated[qIndex][inputIndex] = "";
      return updated;
    });
    setShowResult(false);
  };

  // ─── Show Answer ──────────────────────────────────────────────────────────

  const showAnswers = () => {
    setSelected(items.map((item) => item.correct));

    const filledAnswers = items.map((item) => {
      if (item.correctQuestion) {
        const arr = [item.correctQuestion];
        for (let i = 1; i < item.inputsCount; i++) arr.push(item.correctInput);
        return arr;
      } else {
        return Array.from({ length: item.inputsCount }, () => item.correctInput);
      }
    });

    setAnswers(filledAnswers);
    setWrongInputs([]);
    setShowResult(true);
    setShowCorrect(true);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────

  const resetAll = () => {
    setSelected(["", ""]);
    setAnswers([[""], ["", ""]]);
    setWrongInputs([]);
    setShowResult(false);
    setShowCorrect(false);
  };

  // ─── Check ────────────────────────────────────────────────────────────────

  const checkAnswers = () => {
    if (showResult) return;

    if (selected.some((s) => s === "")) {
      ValidationAlert.info("Please circle one picture in each question!");
      return;
    }

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].inputsCount; j++) {
        if (!answers[i][j] || answers[i][j].trim() === "") {
          ValidationAlert.info("Please write all answers!");
          return;
        }
      }
    }

    let wrong = [];
    let score = 0;

    items.forEach((item, i) => {
      // تشييك الصورة
      if (selected[i] === item.correct) score++;
      else wrong.push({ qIndex: i, type: "image" });

      // تشييك الـ inputs
      if (item.correctQuestion) {
        if (answers[i][0]?.trim().toLowerCase() === item.correctQuestion.trim().toLowerCase()) score++;
        else wrong.push({ qIndex: i, inputIndex: 0 });

        for (let j = 1; j < item.inputsCount; j++) {
          if (answers[i][j]?.trim().toLowerCase() === item.correctInput.trim().toLowerCase()) score++;
          else wrong.push({ qIndex: i, inputIndex: j });
        }
      } else {
        for (let j = 0; j < item.inputsCount; j++) {
          if (answers[i][j]?.trim().toLowerCase() === item.correctInput.trim().toLowerCase()) score++;
          else wrong.push({ qIndex: i, inputIndex: j });
        }
      }
    });

    setWrongInputs(wrong);
    setShowResult(true);

    const total = items.reduce((sum, item) => sum + item.inputsCount + 1, 0);
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">Score: ${score} / ${total}</span>
      </div>`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

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
        <div className="div-forall" style={{ gap: "40px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">E</span> Read and drag the correct words to
            complete the sentences.
          </h5>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {wordBank.map((word) => (
              <BankChip
                key={word}
                word={word}
                isUsed={isWordUsed(word)}
                locked={showResult}
              />
            ))}
          </div>

          {/* ── Questions Grid ── */}
          <div className="question-grid-unit10-page6-q2">
            {items.map((item, i) => (
              <div className="question-box-unit4-page5-q1" key={i}>

                {/* Image Choices */}
                <div className="choices-unit4-page5-q1">
                  {item.images.map((imgObj, idx) => (
                    <div
                      key={idx}
                      className={`circle-wrapper-unit10-page6-q2 ${selected[i] === imgObj.value ? "active" : ""}`}
                      onClick={() => handleSelect(imgObj.value, i)}
                    >
                      <img src={imgObj.img} className="q-img-unit10-page6-q2" alt="" />
                      {showResult && selected[i] === imgObj.value && imgObj.value !== item.correct && (
                        <div className="wrong-mark">✕</div>
                      )}
                    </div>
                  ))}
                </div>

                {item.question.length ? (
                  <p className="question-text">{item.question}</p>
                ) : null}

                <div className="input-wrapper-unit10-page6-q2">

                  {/* input السؤال (السطر الأول - للسؤال الثاني فقط) */}
                  {item.correctQuestion && (
                    <div style={{ width: "100%", position: "relative" }}>
                      <SlotDropZone
                        id={`slot-${i}-0`}
                        value={answers[i][0]}
                        activeWord={activeWord}
                        isWrong={wrongInputs.some((w) => w.qIndex === i && w.inputIndex === 0)}
                        locked={showResult}
                        onRemove={handleRemove}
                      />
                      {wrongInputs.some((w) => w.qIndex === i && w.inputIndex === 0) && (
                        <div className="wrong-mark-unit10-p6-q2">✕</div>
                      )}
                    </div>
                  )}

                  {/* inputs الإجابة */}
                  {Array.from({
                    length: item.correctQuestion ? item.inputsCount - 1 : item.inputsCount,
                  }).map((_, idx) => {
                    const inputIndex = item.correctQuestion ? idx + 1 : idx;
                    return (
                      <div
                        key={inputIndex}
                        style={{ position: "relative", display: "flex", alignItems: "flex-end", width: "100%" }}
                      >
                        <SlotDropZone
                          id={`slot-${i}-${inputIndex}`}
                          value={answers[i][inputIndex]}
                          activeWord={activeWord}
                          isWrong={wrongInputs.some((w) => w.qIndex === i && w.inputIndex === inputIndex)}
                          locked={showResult}
                          onRemove={handleRemove}
                        />
                        {wrongInputs.some((w) => w.qIndex === i && w.inputIndex === inputIndex) && (
                          <div className="wrong-mark-unit10-p6-q2">✕</div>
                        )}
                        <span>{item.afterAnswer}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "inline-block",
            }}
          >
            {activeWord}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit10_Page6_Q2;