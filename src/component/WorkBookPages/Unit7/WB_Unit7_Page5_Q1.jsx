import "./WB_Unit7_Page5_Q1.css";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U7/U7P43EXEI-01.svg";
import img2 from "../../../assets/U1 WB/U7/U7P43EXEI-02.svg";
import img3 from "../../../assets/U1 WB/U7/U7P43EXEI-03.svg";
import img4 from "../../../assets/U1 WB/U7/U7P43EXEI-04.svg";
import img5 from "../../../assets/U1 WB/U7/U7P43EXEI-05.svg";
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
const NUMBER_BANK = ["1", "2", "3", "4", "5"];
const CORRECT_DATA = ["2", "5", "3", "4", "1"];
const SENTENCES = [
  "Are you happy? Yes, I am.",
  "What's the matter? I'm bored.",
  "Are you sad? No, I'm not. I'm hungry.",
  "What's the matter? I'm cold",
  "Are you scared? Yes, I am.",
];
const IMAGES = [img1, img2, img3, img4, img5];

// ─── NumberChip ───────────────────────────────────────────────────────────────
const NumberChip = ({ num, isUsed, isDisabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `num-${num}`,
    disabled: isUsed || isDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width:        30,
        height:       30,
        border:       "2px solid #2c5287",
        borderRadius: 8,
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        fontWeight:   "bold",
        background:   "white",
        cursor:       isUsed || isDisabled ? "not-allowed" : "grab",
        opacity:      isUsed ? 0.35 : isDragging ? 0.5 : 1,
        pointerEvents: isUsed ? "none" : undefined,
        userSelect:   "none",
        touchAction:"none",
        transition:   "opacity .2s",
      }}
    >
      {num}
    </div>
  );
};

// ─── DropBox ──────────────────────────────────────────────────────────────────
const DropBox = ({ index, value, isWrong, isLocked, onReturn }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-${index}` });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !isLocked && value && onReturn(index)}
      title={value && !isLocked ? "اضغط لإرجاع الرقم" : ""}
      className={`wb-unit7-p5-q1-input`}
      style={{
        background: isOver ? "#e3f2fd" : value ? "#fff8e1" : "white",
        cursor:     value && !isLocked ? "pointer" : "default",
        transition: "background .15s",
      }}
    >
      {value || ""}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit7_Page5_Q1 = () => {
  const [answers,    setAnswers]    = useState(Array(5).fill(null));
  const [showResult, setShowResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeNum,  setActiveNum]  = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // الأرقام المستخدمة
  const usedNums = new Set(answers.filter(Boolean));

  // ─── Drag End ───────────────────────────────────────────────────────────────
  const handleDragEnd = ({ active, over }) => {
    setActiveNum(null);
    if (!over || showAnswer) return;

    const value = active.id.replace("num-", "");
    const destId = over.id; // "drop-{index}"
    if (!destId.startsWith("drop-")) return;

    const index = Number(destId.replace("drop-", ""));

    setAnswers((prev) => {
      const copy = [...prev];

      // شيل الرقم من مكانه القديم
      const oldIndex = copy.findIndex((v) => v === value);
      if (oldIndex !== -1) copy[oldIndex] = null;

      // لو الـ drop box فيه رقم ثاني → شيله (يرجع للبنك)
      copy[index] = value;
      return copy;
    });

    setShowResult([]);
  };

  // ─── Return to bank ──────────────────────────────────────────────────────────
  const handleReturn = (index) => {
    if (showAnswer) return;
    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    setShowResult([]);
  };

  // ─── Check ───────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.some((v) => !v)) {
      ValidationAlert.info("Please fill all answer boxes before checking!");
      return;
    }

    const results = answers.map((value, i) =>
      value === CORRECT_DATA[i] ? "correct" : "wrong",
    );

    setShowResult(results);
    setShowAnswer(true);

    const correctCount = results.filter((r) => r === "correct").length;
    const total = CORRECT_DATA.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const resultHTML = `<div style="font-size:20px;text-align:center;margin-top:8px"><span style="color:${color};font-weight:bold">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total)  ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else                         ValidationAlert.warning(resultHTML);
  };

  // ─── Show Answer ─────────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    setAnswers(CORRECT_DATA);
    setShowResult([]);
    setShowAnswer(true);
  };

  // ─── Reset ───────────────────────────────────────────────────────────────────
  const resetAnswers = () => {
    setAnswers(Array(5).fill(null));
    setShowResult([]);
    setShowAnswer(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveNum(active.id.replace("num-", ""))}
      onDragEnd={handleDragEnd}
    >
      <div
        className="unit3-q3-wrapper"
        style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:30 }}
      >
        <div className="div-forall" style={{ gap: 5 }}>
          <h5 className="header-title-page8">
            <span className="ex-A">I</span>Read and number the pictures.
          </h5>

          <div
            className="word-container-wb-unit7-p5-q1 w-full"
            style={{ display:"flex", padding:5, border:"2px dashed #ccc", borderRadius:10, justifyContent:"center", flexDirection:"column" }}
          >
            {/* ── Number Bank ── */}
            <div
              style={{ display:"flex", gap:10, padding:10, border:"2px dashed #ccc", borderRadius:10, justifyContent:"center" }}
            >
              {NUMBER_BANK.map((num) => (
                <NumberChip
                  key={num}
                  num={num}
                  isUsed={usedNums.has(num)}
                  isDisabled={showAnswer}
                />
              ))}
            </div>

            {/* ── Sentences ── */}
            {SENTENCES.map((sentence, index) => (
              <div key={index} className="sentence-container-wb-unit7-p5-q1">
                <span className="num">{index + 1}</span>
                <p>{sentence}</p>
              </div>
            ))}
          </div>

          {/* ── Images + Drop Boxes ── */}
          <div className="wb-unit7-p5-q1-grid w-full">
            {IMAGES.map((img, index) => (
              <div key={index} className="wb-unit7-p5-q1-box">
                <img src={img} className="unit3-q3-image" alt="" />

                <div className="wb-unit7-p5-q1-input-wrapper">
                  <DropBox
                    index={index}
                    value={answers[index]}
                    isWrong={showResult[index] === "wrong"}
                    isLocked={showAnswer}
                    onReturn={handleReturn}
                  />
                  {showResult[index] === "wrong" && (
                    <div className="unit3-q3-wrong">✕</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ── */}
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

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeNum && (
          <div style={{
            width:        30,
            height:       30,
            border:       "2px solid #2c5287",
            borderRadius: 8,
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            fontWeight:   "bold",
            background:   "white",
            boxShadow:    "0 4px 12px rgba(0,0,0,.2)",
            cursor:       "grabbing",
          }}>
            {activeNum}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit7_Page5_Q1;