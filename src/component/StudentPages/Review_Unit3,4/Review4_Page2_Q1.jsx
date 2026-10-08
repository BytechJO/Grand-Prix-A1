import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review4_Page2_Q1.css";

import sound1 from "../../../assets/unit4/sounds/U4P37EXEE.mp3";
import img1 from "../../../assets/unit4/imgs/U4P37EEXEE-01-01.svg";
import img2 from "../../../assets/unit4/imgs/U4P37EEXEE-01-02.svg";
import img3 from "../../../assets/unit4/imgs/U4P37EEXEE-02-01.svg";
import img4 from "../../../assets/unit4/imgs/U4P37EEXEE-02-02.svg";
import img5 from "../../../assets/unit4/imgs/U4P37EEXEE-03-01.svg";
import img6 from "../../../assets/unit4/imgs/U4P37EEXEE-03-02.svg";

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

import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─── Data ─────────────────────────────────────────────────────────────────────

const data = [
  {
    parts: [
      { before: "The ",  middleImg: img1, blank: 1, after: "ork" },
      { before: " is on the ", middleImg: img2, blank: 2, after: "et." },
    ],
    correct: ["f", "b"],
  },
  {
    parts: [
      { before: "The ",  middleImg: img3, blank: 1, after: "ish" },
      { before: " is in the ", middleImg: img4, blank: 2, after: "an." },
    ],
    correct: ["f", "v"],
  },
  {
    parts: [
      { before: "The ",  middleImg: img5, blank: 1, after: "est" },
      { before: " is on my", middleImg: img6, blank: 2, after: "eet" },
    ],
    correct: ["v", "f"],
  },
];

const letters = ["f", "b", "v"];

const captions = [
  { start: 0,     end: 5.23,  text: "Page 37, Exercise E. Listen and write the missing letters." },
  { start: 5.25,  end: 9.05,  text: "1. The fork is on the vet." },
  { start: 9.07,  end: 12.2,  text: "2. The fish is in the van." },
  { start: 12.22, end: 16.16, text: "3. The vest is on my feet." },
];

// ─── Bank Chip (Draggable) ─────────────────────────────────────────────────────

const BankChip = ({ letter, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `letter-${letter}`,
    disabled: locked,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        fontSize: "20px",
        cursor: locked ? "not-allowed" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.35 : 1,
        transition: "opacity 0.2s",
        userSelect: "none",
        touchAction: "none",
        display: "inline-block",
      }}
    >
      {letter}
    </span>
  );
};

// ─── Slot Drop Zone (Droppable) ───────────────────────────────────────────────

const SlotDropZone = ({ id, value, activeWord, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  // لما في كلمة بتتسحب فوق الفراغ → اعرض الكلمة كـ placeholder
  const displayValue = activeWord ? activeWord : value;
  const isPlaceholder = isOver && activeWord && !value;

  return (
    <div className={`input-wrapper-review4-p2-q1`}>
      <div
        ref={setNodeRef}
        className={`missing-input-review4-p2-q1 ${isOver ? "drag-over-cell" : ""}`}
        style={{
          // background: isOver ? "#e3f2fd" : undefined,
          cursor: value && !locked ? "pointer" : "default",
          // color: isPlaceholder ? "#90a4ae" : undefined,
          transition: "background 0.15s, color 0.15s",
        }}
        onClick={() => { if (value && !locked) onRemove(id); }}
        title={value && !locked ? "Click to remove" : ""}
      >
        {value}
      </div>

      {isWrong && (
        <span className="wrong-icon-review4-p2-q1">✕</span>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Review4_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(
    data.map((d) => Array(d.correct.length).fill(""))
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeWord = activeId ? activeId.replace("letter-", "") : null;

  // ─── Drag Handlers ────────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const letter = active.id.replace("letter-", "");
    if (!over.id.startsWith("slot-")) return;

    const [qIndex, blankIndex] = over.id
      .replace("slot-", "")
      .split("-")
      .map(Number);

    setAnswers((prev) => {
      const updated = prev.map((row) => [...row]);
      updated[qIndex][blankIndex] = letter;
      return updated;
    });

    setWrongInputs([]);
  };

  // ─── Remove on Click ──────────────────────────────────────────────────────

  const handleRemove = (slotId) => {
    const [qIndex, blankIndex] = slotId
      .replace("slot-", "")
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

    const hasEmpty = answers.some((arr) => arr.some((v) => v.trim() === ""));
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

    const totalInputs = data.reduce((acc, item) => acc + item.correct.length, 0);
    const color = correctCount === totalInputs ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${totalInputs}
        </span>
      </div>`;

    setLocked(true);

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
            <span className="mr-2">E</span> Listen and drag the missing letters.
          </h3>

          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={5.23}
          />

          {/* ── Letter Bank ── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {letters.map((l) => (
              <BankChip key={l} letter={l} locked={locked} />
            ))}
          </div>

          {/* ── Questions ── */}
          {data.map((item, qIndex) => (
            <div className="row-missing" key={qIndex}>
              <span className="num">{qIndex + 1}.</span>

              <div className="sentence-review4-p2-q1">
                {item.parts.map((p, blankIndex) => (
                  <span
                    key={blankIndex}
                    className="sentence-part"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {p.before}

                    <SlotDropZone
                      id={`slot-${qIndex}-${blankIndex}`}
                      value={answers[qIndex][blankIndex]}
                      activeWord={activeWord}
                      isWrong={wrongInputs.includes(`${qIndex}-${blankIndex}`)}
                      locked={locked}
                      onRemove={handleRemove}
                    />

                    {p.after}
                    <img src={p.middleImg} className="middle-img" alt="" />
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
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              fontSize: "20px",
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

export default Review4_Page2_Q1;