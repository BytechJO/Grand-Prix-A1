import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U3/SVG/U3P20EXEC-01.svg";
import img2 from "../../../assets/U1 WB/U3/SVG/U3P20EXEC-02.svg";
import img3 from "../../../assets/U1 WB/U3/SVG/U3P20EXEC-03.svg";
import img4 from "../../../assets/U1 WB/U3/SVG/U3P20EXEC-04.svg";
import img5 from "../../../assets/U1 WB/U3/SVG/U3P20EXEC-05.svg";
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
  {
    parts: [
      { middleImg: img1, blank: 0, after: "!Stay away from the" },
      { middleImg: img2, blank: 1, after: "with a" },
      { middleImg: img3, blank: 2, after: ".Look out ant! Here comes" },
      { middleImg: img4, blank: 3, after: "with his" },
      { middleImg: img5, blank: 4, after: "." },
    ],
    correct: ["Ant", "rat", "bat", "dad", "pan"],
  },
];

// ─── Draggable Word ───────────────────────────────────────────────
const DraggableWord = ({ word, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
    disabled: locked || isUsed,
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
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        cursor: locked || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.45 : 1,
        touchAction: "none",
        transition: "all 0.2s ease",
        color: isUsed ? "#999" : "inherit",
        userSelect: "none",
      }}
    >
      {word}
    </span>
  );
};

// ─── Droppable Blank ─────────────────────────────────────────────
const DroppableBlank = ({ blankIndex, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `blank-${blankIndex}`,
    disabled: locked,
  });

  return (
    <div className="input-wrapper-wb-unit3-p6-q3">
      <div
        ref={setNodeRef}
        className={`missing-input-wb-unit3-p6-q3 ${isOver ? "drag-over-cell" : ""}`}
        onClick={() => !locked && value && onRemove(blankIndex)}
        style={{
          background: isOver ? "#e3f2fd" : "white",
          cursor: !locked && value ? "pointer" : "default",
          transition: "background 0.15s ease",
        }}
        title={!locked && value ? "Click to remove" : ""}
      >
        {value && <span>{value}</span>}
      </div>
      {isWrong && <span className="wrong-icon-review4-p2-q1">✕</span>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────
const WB_Unit3_Page6_Q3 = () => {
  const [answers, setAnswers] = useState(data.map((d) => Array(d.correct.length).fill("")));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const wordBank = data[0].correct;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // الكلمات المستخدمة حالياً في السلوتات
  const usedWords = answers.flat().filter(Boolean);

  // ─── Drag Handlers ───────────────────────────────────────────
  const handleDragStart = (event) => {
    setActiveWord(event.active.id.replace("word-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("blank-")) return;

    const draggedWord = active.id.replace("word-", "");
    const blankIndex = Number(over.id.replace("blank-", ""));

    setAnswers((prev) => {
      const copy = prev.map((arr) => [...arr]);
      // إزالة الكلمة من أي سلوت سابق
      copy.forEach((row) => {
        const idx = row.indexOf(draggedWord);
        if (idx !== -1) row[idx] = "";
      });
      copy[0][blankIndex] = draggedWord;
      return copy;
    });

    setWrongInputs([]);
  };

  // ─── Remove word from blank on click ─────────────────────────
  const handleRemoveFromBlank = (blankIndex) => {
    setAnswers((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[0][blankIndex] = "";
      return copy;
    });
    setWrongInputs([]);
  };

  // ─── Actions ─────────────────────────────────────────────────
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
        if (val.trim() === data[qIndex].correct[blankIndex]) {
          correctCount++;
        } else {
          wrong.push(`${qIndex}-${blankIndex}`);
        }
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
      </div>
    `;

    correctCount === totalInputs
      ? ValidationAlert.success(scoreMessage)
      : correctCount === 0
      ? ValidationAlert.error(scoreMessage)
      : ValidationAlert.warning(scoreMessage);
  };

  const showAnswer = () => {
    setAnswers(data.map((d) => [...d.correct]));
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(data.map((d) => Array(d.correct.length).fill("")));
    setWrongInputs([]);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper">
        <div className="div-forall">
          <h3 className="header-title-page8">
            <span className="ex-A">C</span> Fill in the blanks. letters.
          </h3>

          {/* ─── Word Bank ─── */}
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
              flexWrap: "wrap",
            }}
          >
            {wordBank.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                locked={locked}
                isUsed={usedWords.includes(word)}
              />
            ))}
          </div>

          {/* ─── Sentences ─── */}
          {data.map((item, qIndex) => (
            <div className="row-missing" key={qIndex}>
              <div className="sentence-wb-unit3-p6-q3">
                {item.parts.map((p, blankIndex) => (
                  <span
                    key={blankIndex}
                    className="sentence-part"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={p.middleImg} className="middle-img" alt="" />
                    <DroppableBlank
                      blankIndex={blankIndex}
                      value={answers[qIndex][blankIndex]}
                      isWrong={wrongInputs.includes(`${qIndex}-${blankIndex}`)}
                      locked={locked}
                      onRemove={handleRemoveFromBlank}
                    />
                    {p.after}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Buttons ─── */}
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

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeWord && (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeWord}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit3_Page6_Q3;