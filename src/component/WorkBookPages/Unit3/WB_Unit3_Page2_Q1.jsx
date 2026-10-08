import React, { useState } from "react";
import "./WB_Unit3_Page2_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Data ─────────────────────────────────────────────────────────────────────
const questions = [
  { id: "q1", scramble: "your/book/close", questionCorrect: "close your book" },
  {
    id: "q2",
    scramble: "pencil/take/your/out",
    questionCorrect: "take out your pencil",
  },
  { id: "q3", scramble: "line/a/make", questionCorrect: "make a line" },
  { id: "q4", scramble: "open/book/your", questionCorrect: "open your book" },
];

const getScrambledWords = (scramble) => scramble.split("/");

// ─── DraggableWord ────────────────────────────────────────────────────────────
function DraggableWord({ id, word, isUsed, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || disabled,
  });
  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        cursor: isUsed || disabled ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.5 : 1,
        userSelect: "none",
        touchAction: "none",
        pointerEvents: isUsed ? "none" : "auto",
        ...(isUsed ? { borderColor: "#ccc", color: "#aaa" } : {}),
      }}
    >
      {word}
    </span>
  );
}

// ─── DroppableInput ───────────────────────────────────────────────────────────
function DroppableInput({ id, value, isWrong, locked, onClear }) {
  const { isOver, setNodeRef } = useDroppable({ id, disabled: locked });
  const words = value ? value.split(" ") : [];

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "45%",
      }}
    >
      <div
        ref={setNodeRef}
        className={`answer-input33-review10-p1-q3 ${isOver ? "drag-over-cell" : ""}`}
        style={{
          background: isOver ? "#e3f2fd" : "white",
          display: "flex",
          flexWrap: "wrap",
          height:"30px",
          gap: "4px",
          alignItems: "center",
          cursor: "default",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            onClick={() => {
              if (!locked) onClear(id, word);
            }}
            style={{
              cursor: !locked ? "pointer" : "default",
              // padding: "1px 4px",
              borderRadius: "4px",
              // background: !locked ? "#f0f4ff" : "transparent",
              // border: !locked ? "1px solid #2c5287" : "none",
            }}
          >
            {word}
          </span>
        ))}
      </div>
      {isWrong && <span className="error-mark-input1">✕</span>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const WB_Unit3_Page2_Q1 = () => {
  const [inputs, setInputs] = useState({});
  const [wrong, setWrong] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  // الكلمات المستخدمة لكل جملة
  const usedWordsPerQ = (qId) => {
    const val = inputs[`${qId}_question`];
    return val ? val.split(" ") : [];
  };

  const parseId = (id) => {
    const parts = id.split("-");
    return {
      qId: parts[0],
      word: parts.slice(1, parts.length - 1).join("-"),
    };
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || locked || showAnswers) return;
    if (!over.id.startsWith("blank-")) return;

    const { qId: draggedQId, word } = parseId(active.id);
    const targetQId = over.id.replace("blank-", "").split("_")[0];

    if (draggedQId !== targetQId) return;

    const inputKey = `${targetQId}_question`;

    setInputs((prev) => {
      const existing = prev[inputKey] ? prev[inputKey].split(" ") : [];
      if (existing.includes(word)) return prev;
      return {
        ...prev,
        [inputKey]: existing.length ? `${prev[inputKey]} ${word}` : word,
      };
    });

    setWrong({});
  };

  const handleClear = (cellId, word) => {
    const inputKey = cellId.replace("blank-", "");
    setInputs((prev) => {
      const words = prev[inputKey] ? prev[inputKey].split(" ") : [];
      const idx = words.lastIndexOf(word);
      if (idx === -1) return prev;
      words.splice(idx, 1);
      return { ...prev, [inputKey]: words.join(" ") };
    });
    setWrong((prev) => ({ ...prev, [inputKey]: false }));
  };

  const checkAnswers = () => {
    if (showAnswers || locked) return;

    const hasEmpty = questions.some(
      (q) =>
        !inputs[`${q.id}_question`] || inputs[`${q.id}_question`].trim() === "",
    );
    if (hasEmpty) {
      ValidationAlert.info(
        "Oops!",
        "Please answer all the questions before checking.",
      );
      return;
    }

    let wrongTemp = {};
    let score = 0;
    const total = questions.length;

    questions.forEach((q) => {
      if (inputs[`${q.id}_question`] !== q.questionCorrect) {
        wrongTemp[`${q.id}_question`] = true;
      } else {
        score++;
      }
    });

    setWrong(wrongTemp);
    setLocked(true);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">Score: ${score} / ${total}</span>
      </div>
    `;
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showCorrectAnswers = () => {
    const filled = {};
    questions.forEach((q) => {
      filled[`${q.id}_question`] = q.questionCorrect;
    });
    setInputs(filled);
    setWrong({});
    setShowAnswers(true);
  };

  const handleReset = () => {
    setInputs({});
    setWrong({});
    setShowAnswers(false);
    setLocked(false);
  };

  const activeWord = activeId ? parseId(activeId).word : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{ display: "flex", justifyContent: "center", padding: "30px" }}
      >
        <div style={{ }} className="div-forall">
          <h5 className="header-title-page8">
            <span className="ex-A">C</span>Drag and drop the words to make
            sentences.
          </h5>

          <div className="content-container-wb-unit3-p2-q1 w-full">
            {questions.map((q, index) => (
              <div key={q.id} style={{ display: "flex", width: "100%" }}>
                <div className="input-container-wb-unit3-p2-q1">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <span className="num2">{index + 1}</span>
                      <div className="answer-input-review10-p1-q3 scramble-text">
                        {q.scramble}
                      </div>
                    </div>

                    {/* Word Bank */}
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        padding: "10px",
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        alignItems: "center",
                        width: "70%",
                        justifyContent: "center",
                      }}
                    >
                      {getScrambledWords(q.scramble).map((word, i) => (
                        <DraggableWord
                          key={`${q.id}-${word}-${i}`}
                          id={`${q.id}-${word}-${i}`}
                          word={word}
                          isUsed={usedWordsPerQ(q.id).includes(word)}
                          disabled={locked || showAnswers}
                        />
                      ))}
                    </div>
                  </div>

                  <DroppableInput
                    id={`blank-${q.id}_question`}
                    value={inputs[`${q.id}_question`] || ""}
                    isWrong={!!wrong[`${q.id}_question`]}
                    locked={locked || showAnswers}
                    onClear={handleClear}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons-container">
            <button className="try-again-button" onClick={handleReset}>
              Start Again ↻
            </button>
            <button
              className="show-answer-btn swal-continue"
              onClick={showCorrectAnswers}
            >
              Show Answer
            </button>
            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeWord && (
          <span
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {activeWord}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit3_Page2_Q1;
