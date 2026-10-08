import React, { useState } from "react";
import farmImg from "../../../assets/unit10/imgs/U10P88EXEB.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review9_Page1_Q2.css";

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
    image: farmImg,
    questionParts: ["How many cows are there?"],
    blanksCount: 0,
    questionAnswers: [],
    answer: "There are five cows.",
  },
  {
    image: farmImg,
    questionParts: ["", "goats are there?"],
    blanksCount: 2,
    questionAnswers: ["How many"],
    answer: "There are four goats.",
  },
  {
    image: farmImg,
    questionParts: ["", "cats are there?"],
    blanksCount: 2,
    questionAnswers: ["How many"],
    answer: "There are three cats.",
  },
];

const wordBank = [
  { word: "How many", maxUses: 2 }, // مسموح مرتين
  { word: "There are five cows.", maxUses: 1 },
  { word: "There are four goats.", maxUses: 1 },
  { word: "There are three cats.", maxUses: 1 },
];

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

const BankChip = ({ word, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${word}`,
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
        cursor:
          isUsed || locked ? "not-allowed" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.35 : 1,
        transition:
          "opacity 0.2s, background 0.2s, border-color 0.2s, color 0.2s",
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

// ─── Drop Zone (Droppable) ────────────────────────────────────────────────────

const DropZone = ({ id, value, isWrong, locked, onRemove, className }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className={`${className || ""} ${isOver ? "drag-over-cell" : ""}`}
      style={{
        // background: isOver ? "#e8f0fe" : undefined,
        cursor: value && !locked ? "pointer" : "default",
        transition: "background 0.15s",
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100px",
      }}
      onClick={() => {
        if (value && !locked) onRemove(id);
      }}
      title={value && !locked ? "Click to remove" : ""}
    >
      {value || ""}
      {isWrong && <div className="wrong-x-circle-review9-p1-q2">✕</div>}
    </span>
  );
};

// ─── Answer Drop Zone ─────────────────────────────────────────────────────────

const AnswerDropZone = ({ id, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`answer-input-review9-p1-q2 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        // background: isOver ? "#e8f0fe" : undefined,
        cursor: value && !locked ? "pointer" : "default",
        transition: "background 0.15s",
        position: "relative",
      }}
      onClick={() => {
        if (value && !locked) onRemove(id);
      }}
      title={value && !locked ? "Click to remove" : ""}
    >
      {value || ""}
      {isWrong && <div className="wrong-x-circle-review9-p1-q2">✕</div>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Review9_Page1_Q2 = () => {
  const [questionInputs, setQuestionInputs] = useState(
    items.map((item) => Array(item.blanksCount).fill("")),
  );
  const [answers, setAnswers] = useState(items.map(() => ""));
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  // كم مرة كل كلمة موجودة بالبنك الأصلي
  const bankCount = wordBank.reduce((acc, { word, maxUses }) => {
    acc[word] = maxUses;
    return acc;
  }, {});

  // كم مرة كل كلمة محطوطة بالفراغات حالياً
  const usedCount = [...questionInputs.flat(), ...answers]
    .filter(Boolean)
    .reduce((acc, w) => {
      acc[w] = (acc[w] || 0) + 1;
      return acc;
    }, {});

  // الكلمة disabled لما استُخدمت بنفس عدد نسخها بالبنك
  const isWordUsedUp = (word) =>
    (usedCount[word] || 0) >= (bankCount[word] || 1);

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showCorrect) return;

    const word = active.id.replace("bank-", "");
    const destId = over.id; // e.g. "q-1-0" or "a-1"

    const parts = destId.split("-");
    const type = parts[0];

    if (type === "q") {
      const i = parseInt(parts[1]);
      const j = parseInt(parts[2]);
      const updated = questionInputs.map((row) => [...row]);
      updated[i][j] = word;
      setQuestionInputs(updated);
    }

    if (type === "a") {
      const i = parseInt(parts[1]);
      const updated = [...answers];
      updated[i] = word;
      setAnswers(updated);
    }

    setWrongMarks([]);
  };

  // ─── Remove (click to clear) ──────────────────────────────────────────────

  const handleRemove = (id) => {
    const parts = id.split("-");
    const type = parts[0];

    if (type === "q") {
      const i = parseInt(parts[1]);
      const j = parseInt(parts[2]);
      const updated = questionInputs.map((row) => [...row]);
      updated[i][j] = "";
      setQuestionInputs(updated);
    }

    if (type === "a") {
      const i = parseInt(parts[1]);
      const updated = [...answers];
      updated[i] = "";
      setAnswers(updated);
    }

    setWrongMarks([]);
  };

  // ─── Show Answers ─────────────────────────────────────────────────────────

  const showAnswers = () => {
    setQuestionInputs(items.map((item) => item.questionAnswers || []));
    setAnswers(items.map((item) => item.answer));
    setShowCorrect(true);
    setWrongMarks([]);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────

  const resetAll = () => {
    setQuestionInputs(items.map((item) => Array(item.blanksCount).fill("")));
    setAnswers(items.map(() => ""));
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // ─── Check Answers ────────────────────────────────────────────────────────

  const checkAnswers = () => {
    if (showCorrect) return;

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < items[i].questionAnswers.length; j++) {
        if (!questionInputs[i][j] || questionInputs[i][j].trim() === "") {
          ValidationAlert.info(
            "Oops!",
            "Please complete all question blanks before checking.",
          );
          return;
        }
      }
      if (!answers[i] || answers[i].trim() === "") {
        ValidationAlert.info(
          "Oops!",
          "Please complete all answers before checking.",
        );
        return;
      }
    }

    let score = 0;
    let total = 0;
    const wrong = [];

    items.forEach((item, i) => {
      item.questionAnswers.forEach((correctWord, idx) => {
        total++;
        if (
          questionInputs[i][idx]?.trim().toLowerCase() ===
          correctWord.toLowerCase()
        ) {
          score++;
        } else {
          wrong.push({ type: "question", qIndex: i, idx });
        }
      });

      total++;
      if (answers[i].trim().toLowerCase() === item.answer.toLowerCase()) {
        score++;
      } else {
        wrong.push({ type: "answer", qIndex: i });
      }
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

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
        <div
          className="div-forall"
          style={{
            display: "flex",
            flexDirection: "column",
            // width: "60%",
            justifyContent: "flex-start",
          }}
        >
          <h5 className="header-title-page8">
            <span className="mr-2">B</span> Read and drag the correct words to
            complete the sentences.
          </h5>

          {/* ── Word Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {wordBank.map(({ word }, index) => (
              <BankChip
                key={`${word}-${index}`}
                word={word}
                isUsed={isWordUsedUp(word)}
                locked={showCorrect}
              />
            ))}
          </div>

          {/* ── Content ── */}
          <div className="content-review9-p1-q2 w-full">
            <img
              src={farmImg}
              alt=""
              style={{ height: "270px", width: "auto" }}
            />

            <div style={{ width: "100%" }}>
              {items.map((item, i) => (
                <div key={i} className="question-box-review9-p1-q2">
                  {/* ── Question ── */}
                  <p className="question-text">
                    {item.questionParts.map((part, idx) =>
                      part === "" ? (
                        <DropZone
                          key={`q-${i}-${idx}`}
                          id={`q-${i}-${idx}`}
                          value={questionInputs[i][idx]}
                          isWrong={wrongMarks.some(
                            (w) =>
                              w.type === "question" &&
                              w.qIndex === i &&
                              w.idx === idx,
                          )}
                          locked={showCorrect}
                          onRemove={handleRemove}
                          className="question-blank-review9-p1-q2"
                        />
                      ) : (
                        <span key={idx} style={{ width: "100%" }}>
                          {" "}
                          {part}{" "}
                        </span>
                      ),
                    )}
                  </p>

                  {/* ── Answer ── */}
                  <AnswerDropZone
                    id={`a-${i}`}
                    value={answers[i]}
                    isWrong={wrongMarks.some(
                      (w) => w.type === "answer" && w.qIndex === i,
                    )}
                    locked={showCorrect}
                    onRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
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

export default Review9_Page1_Q2;
