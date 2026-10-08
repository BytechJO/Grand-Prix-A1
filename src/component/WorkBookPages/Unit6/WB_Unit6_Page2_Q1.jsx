import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit6_Page2_Q1.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

/* ================= DATA ================= */

const questions = [
  {
    id: 1,
    words: ["bike", "I", "ride", "can't", "a"],
    correct: ["I", "can't", "ride", "a", "bike"],
  },
  {
    id: 2,
    words: ["sail", "They", "a", "boat", "can"],
    correct: ["They", "can", "sail", "a", "boat"],
  },
  {
    id: 3,
    words: ["a", "kite", "can", "He", "fly"],
    correct: ["He", "can", "fly", "a", "kite"],
  },
  {
    id: 4,
    words: ["picture", "I", "can", "a", "paint"],
    correct: ["I", "can", "paint", "a", "picture"],
  },
];

/* ================= DraggableNumber ================= */

const DraggableNumber = ({ num, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `num-${num}`,
    disabled: locked,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        cursor: locked ? "default" : "grab",
        opacity: isDragging ? 0.4 : 1,
        touchAction: "none",
        userSelect: "none",
        transition: "opacity 0.2s",
      }}
    >
      {num}
    </div>
  );
};

/* ================= DroppableWordBox ================= */

const DroppableWordBox = ({ qId, word, value, isWrong, locked, onRemove }) => {
  const droppableId = `q-${qId}-${word}`;
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    disabled: locked,
  });

  return (
    <div className="wb-unit6-p2-q1-word-box">
      <span className="wb-unit6-p2-q1-word-text">{word}</span>
      <div
        ref={setNodeRef}
        className={`wb-unit6-p2-q1-input ${isOver ? "drag-over-cell" : ""}`}
        onClick={() => !locked && value && onRemove(qId, word)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // background: isOver ? "#e3f2fd" : "",
          cursor: !locked && value ? "pointer" : "default",
          transition: "background 0.15s ease",
          // position: "relative",
        }}
        title={!locked && value ? "Click to remove" : ""}
      >
        {value || ""}
        {isWrong && (
          <div className="wb-unit6-p2-q1-wrong-mark">✕</div>
        )}
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const WB_Unit6_Page2_Q1 = () => {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wrongInputs, setWrongInputs] = useState({});
  const [activeNum, setActiveNum] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const TOTAL_WORDS = questions.reduce((sum, q) => sum + q.words.length, 0);

  /* ─── Drag Handlers ─── */
  const handleDragStart = (event) => {
    setActiveNum(event.active.id.replace("num-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveNum(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("q-")) return;

    const num = active.id.replace("num-", "");
    // over.id: "q-{qId}-{word}"
    const parts = over.id.split("-");
    const qId = parts[1];
    const word = parts.slice(2).join("-"); // للكلمات اللي فيها - مثل can't

    setAnswers((prev) => {
      const updated = { ...prev };
      const row = { ...(updated[qId] || {}) };

      // شيل الرقم من أي كلمة ثانية بنفس السؤال
      Object.keys(row).forEach((w) => {
        if (row[w] === num) delete row[w];
      });

      row[word] = num;
      updated[qId] = row;
      return updated;
    });

    setWrongInputs({});
  };

  /* ─── Remove on click ─── */
  const handleRemove = (qId, word) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      const row = { ...(updated[qId] || {}) };
      delete row[word];
      updated[qId] = row;
      return updated;
    });
    setWrongInputs({});
  };

  /* ─── Check ─── */
  const checkAnswer = () => {
    if (locked) return;

    for (const q of questions) {
      const row = answers[q.id];
      if (!row || Object.keys(row).length !== q.words.length) {
        ValidationAlert.info("Pay attention!", "Please number all the words before checking.");
        return;
      }
      for (const word of q.words) {
        if (!row[word]) {
          ValidationAlert.info("Pay attention!", "Please number all the words before checking.");
          return;
        }
      }
    }

    let score = 0;
    const wrongMap = {};

    questions.forEach((q) => {
      const row = answers[q.id];
      wrongMap[q.id] = [];

      q.words.forEach((word) => {
        const userPos = Number(row[word]) - 1;
        const correctWord = q.correct[userPos];
        if (correctWord === word) {
          score++;
        } else {
          wrongMap[q.id].push(word);
        }
      });
    });

    setWrongInputs(wrongMap);
    setChecked(true);
    setLocked(true);

    const color = score === TOTAL_WORDS ? "green" : score === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">Score: ${score} / ${TOTAL_WORDS}</span>
      </div>
    `;

    if (score === TOTAL_WORDS) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  /* ─── Show Answer ─── */
  const showAnswer = () => {
    const filled = {};
    questions.forEach((q) => {
      const row = {};
      q.correct.forEach((word, i) => {
        row[word] = String(i + 1);
      });
      filled[q.id] = row;
    });
    setAnswers(filled);
    setWrongInputs({});
    setChecked(false);
    setLocked(true);
  };

  /* ─── Reset ─── */
  const reset = () => {
    setAnswers({});
    setWrongInputs({});
    setChecked(false);
    setLocked(false);
    setActiveNum(null);
  };

  /* ================= RENDER ================= */

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall">
          <h4 className="header-title-page8">
            <span className="ex-A">C</span> Drag the numbers to build your sentences.
          </h4>

          {/* ─── Number Bank ─── */}
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
            {[1, 2, 3, 4, 5].map((num) => (
              <DraggableNumber key={num} num={num} locked={locked} />
            ))}
          </div>

          {/* ─── Questions ─── */}
          <div className="wb-unit6-p2-q1-questions">
            {questions.map((q) => (
              <div key={q.id} className="wb-unit6-p2-q1-row">
                <div className="wb-unit6-p2-q1-number">{q.id}</div>
                <div className="wb-unit6-p2-q1-words">
                  {q.words.map((word) => (
                    <DroppableWordBox
                      key={word}
                      qId={q.id}
                      word={word}
                      value={answers[q.id]?.[word] || ""}
                      isWrong={checked && wrongInputs[q.id]?.includes(word)}
                      locked={locked}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button onClick={showAnswer} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswer}>
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeNum && (
          <div
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
            {activeNum}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit6_Page2_Q1;