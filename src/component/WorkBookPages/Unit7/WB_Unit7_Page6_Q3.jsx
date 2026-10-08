import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit7_Page6_Q3.css";
import img1 from "../../../assets/U1 WB/U7/U7P44EXEC-01.svg";
import img2 from "../../../assets/U1 WB/U7/U7P44EXEC-02.svg";
import img3 from "../../../assets/U1 WB/U7/U7P44EXEC-03.svg";
import img4 from "../../../assets/U1 WB/U7/U7P44EXEC-04.svg";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

// ─── ثوابت ───────────────────────────────────────────────────────────────────
const WORD_BANK = [
  { id: "w1", text: "hat" },
  { id: "w2", text: "hand" },
  { id: "w3", text: "water" },
  { id: "w4", text: "window" },
];

const DATA = [
  {
    parts: [
      { before: "My", middleImg: img1, blankIndex: 0, after: "" },
      { before: "is on my", middleImg: img2, blankIndex: 1, after: "." },
    ],
    correct: ["hat", "hand"],
  },
  {
    parts: [
      { before: "There is", middleImg: img3, blankIndex: 0, after: "" },
      { before: "on the", middleImg: img4, blankIndex: 1, after: "." },
    ],
    correct: ["water", "window"],
  },
];

// answers صيغتها: { "0-0": wordId | null, "0-1": ..., "1-0": ..., "1-1": ... }
const INITIAL_ANSWERS = DATA.reduce((acc, item, qIndex) => {
  item.correct.forEach((_, bIndex) => {
    acc[`${qIndex}-${bIndex}`] = null;
  });
  return acc;
}, {});

const getWordText = (id) => WORD_BANK.find((w) => w.id === id)?.text || "";

// ─── WordChip ────────────────────────────────────────────────────────────────
const WordChip = ({ id, text, isUsed, isDisabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || isDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: 8,
        background: "white",
        fontWeight: "bold",
        fontSize: 15,
        cursor: isUsed || isDisabled ? "not-allowed" : "grab",
        opacity: isUsed ? 0.35 : isDragging ? 0.5 : 1,
        pointerEvents: isUsed ? "none" : undefined,
        userSelect: "none",
        touchAction: "none",
        transition: "opacity .2s",
      }}
    >
      {text}
    </div>
  );
};

// ─── DropBlank ────────────────────────────────────────────────────────────────
const DropBlank = ({ dropId, value, isWrong, isLocked, onReturn }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-${dropId}` });

  return (
    <div className="input-wrapper-wb-unit7-p6-q3">
      <div
        ref={setNodeRef}
        onClick={() => !isLocked && value && onReturn(dropId)}
        title={value && !isLocked ? "اضغط لإرجاع الكلمة" : ""}
        className={`missing-input-wb-unit7-p6-q3 ${isOver ? "drag-over-cell" : ""}`}
        style={{
          // background: isOver      ? "#e3f2fd"
          //           : value       ? "#fff8e1"
          //           : "transparent",
          display: "flex",
          alignItems: "center",
          cursor: value && !isLocked ? "pointer" : "default",
          transition: "background .15s",
          borderBottom: isWrong ? "2px solid #E24B4A" : undefined,
        }}
      >
        {value || ""}
        {isWrong && <span className="wrong-icon-review4-p2-q1">✕</span>}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit7_Page6_Q3 = () => {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedWordIds = new Set(Object.values(answers).filter(Boolean));
  const activeWord = WORD_BANK.find((w) => w.id === activeId);

  // ─── Drag End ──────────────────────────────────────────────────────────────
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const wordId = active.id;
    const destId = over.id; // "drop-{qIndex}-{bIndex}"
    if (!destId.startsWith("drop-")) return;

    const dropKey = destId.replace("drop-", ""); // "0-0" etc

    setAnswers((prev) => {
      const updated = { ...prev };

      // شيل الكلمة من مكانها القديم
      const oldKey = Object.keys(updated).find((k) => updated[k] === wordId);
      if (oldKey) updated[oldKey] = null;

      // لو الخانة فيها كلمة ثانية → شيلها (ترجع للبنك)
      if (updated[dropKey] && updated[dropKey] !== wordId) {
        updated[dropKey] = null;
      }

      updated[dropKey] = wordId;
      return updated;
    });

    setWrongInputs([]);
  };

  // ─── Return to bank ────────────────────────────────────────────────────────
  const handleReturn = (dropKey) => {
    if (locked) return;
    setAnswers((prev) => ({ ...prev, [dropKey]: null }));
    setWrongInputs([]);
  };

  // ─── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = Object.values(answers).some((v) => !v);
    if (hasEmpty) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    DATA.forEach((item, qIndex) => {
      item.correct.forEach((correctWord, bIndex) => {
        const key = `${qIndex}-${bIndex}`;
        const userText = getWordText(answers[key]);
        if (userText === correctWord) correctCount++;
        else wrong.push(key);
      });
    });

    setWrongInputs(wrong);
    setLocked(true);

    const total = DATA.reduce((acc, item) => acc + item.correct.length, 0);
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center"><span style="color:${color};font-weight:bold">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ─── Show Answer ───────────────────────────────────────────────────────────
  const showAnswer = () => {
    const filled = {};
    DATA.forEach((item, qIndex) => {
      item.correct.forEach((correctWord, bIndex) => {
        const word = WORD_BANK.find((w) => w.text === correctWord);
        filled[`${qIndex}-${bIndex}`] = word ? word.id : null;
      });
    });
    setAnswers(filled);
    setWrongInputs([]);
    setLocked(true);
  };

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setAnswers(INITIAL_ANSWERS);
    setWrongInputs([]);
    setLocked(false);
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper">
        <div className="div-forall">
          <h3 className="header-title-page8">
            <span className="ex-A">C</span> Drag and drop.
          </h3>

          {/* ── Word Bank ── */}
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
            {WORD_BANK.map((word) => (
              <WordChip
                key={word.id}
                id={word.id}
                text={word.text}
                isUsed={usedWordIds.has(word.id)}
                isDisabled={locked}
              />
            ))}
          </div>

          {/* ── Questions ── */}
          {DATA.map((item, qIndex) => (
            <div className="row-missing" key={qIndex}>
              <span className="num">{qIndex + 1}.</span>

              <div className="sentence-review10-p2-q3">
                {item.parts.map((p, bIndex) => {
                  const dropKey = `${qIndex}-${bIndex}`;
                  return (
                    <span
                      key={bIndex}
                      className="sentence-part"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {p.before}
                      <DropBlank
                        dropId={dropKey}
                        value={getWordText(answers[dropKey])}
                        isWrong={wrongInputs.includes(dropKey)}
                        isLocked={locked}
                        onReturn={handleReturn}
                      />
                      {p.after}
                      <img src={p.middleImg} className="middle-img" alt="" />
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
          <button
            className="show-answer-btn swal-continue"
            onClick={showAnswer}
          >
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answers ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord && (
          <div
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: 8,
              background: "white",
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: "0 4px 12px rgba(0,0,0,.2)",
              cursor: "grabbing",
            }}
          >
            {activeWord.text}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit7_Page6_Q3;
