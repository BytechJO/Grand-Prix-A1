import { useState } from "react";
import conversation from "../../../assets/U1 WB/U2/U2P9EXEB-01.svg";
import conversation2 from "../../../assets/U1 WB/U2/U2P9EXEB-02.svg";
import img1 from "../../../assets/U1 WB/U2/U2P9EXEB-03.svg";
import img2 from "../../../assets/U1 WB/U2/U2P9EXEB-04.svg";
import img3 from "../../../assets/U1 WB/U2/U2P9EXEB-05.svg";
import img4 from "../../../assets/U1 WB/U2/U2P9EXEB-06.svg";
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
import "./WB_Unit2_Page1_Q2.css";

// ─── BankWord ────────────────────────────────────────────────────────────────
function BankWord({ word, id, isUsed, disabled }) {
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

// ─── DroppableInput ──────────────────────────────────────────────────────────
function DroppableInput({ id, value, extraClass, showAnswer, locked, onClear }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <input
      ref={setNodeRef}
      type="text"
      value={value}
      className={`answer-input-unit7-p2-q3 ${extraClass ?? ""} ${
        isOver ? "drag-over-cell" : ""
      }`}
      readOnly
      disabled={showAnswer || locked}
      onClick={() => {
        if (value && !showAnswer && !locked) onClear(id);
      }}
      style={{
        textAlign:"center",
        cursor: value && !showAnswer && !locked ? "pointer" : "default",
      }}
    />
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
const WB_Unit2_Page1_Q2 = () => {
  const questions = [
    {
      id: 1,
      img: conversation2,
      secImg: img2,
      question: "How old are you?",
      type: "word",
      prefix: "years old.",
      correct: "five",
    },
    {
      id: 2,
      img: conversation,
      secImg: img3,
      question: "How old are you?",
      type: "full",
      correct: "I'm four years old",
    },
    {
      id: 3,
      img: img1,
      secImg: img4,
      question: "How old are you?",
      type: "full",
      correct: "I'm seven years old",
    },
  ];

  const correctAnswers = {
    q1: "five",
    q2: "I'm four years old",
    q3: "I'm seven years old",
  };

  const [inputs, setInputs] = useState(Array(3).fill(""));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const usedWords = Object.values(answers).filter((w) => w !== "");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const handleDragStart = (event) => {
    const parts = event.active.id.split("-");
    const word = parts.slice(1, parts.length - 1).join("-");
    setActiveWord(word);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    const { active, over } = event;
    if (!over || showAnswer) return;

    const parts = active.id.split("-");
    const draggedWord = parts.slice(1, parts.length - 1).join("-");
    const key = over.id; // q1 | q2 | q3

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((k) => {
      if (newAnswers[k] === draggedWord) newAnswers[k] = "";
    });

    newAnswers[key] = draggedWord;

    setAnswers(newAnswers);
    setWrongInputs([]);
  };

  const handleClear = (cellId) => {
    setAnswers((prev) => ({ ...prev, [cellId]: "" }));
    setWrongInputs((prev) => {
      const qIndex = parseInt(cellId.replace("q", ""));
      return prev.filter((id) => id !== qIndex);
    });
  };

  const handleCheck = () => {
    if (showAnswer) return;

    const userValues = Object.values(answers);
    const correctValues = Object.values(correctAnswers);

    if (userValues.some((value) => value.trim() === "")) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    const results = userValues.map((value, index) => {
      return value.trim().toLowerCase() === correctValues[index].toLowerCase();
    });

    const wrong = results
      .map((r, i) => (r ? null : questions[i].id))
      .filter((v) => v !== null);

    setWrongInputs(wrong);
    setLocked(true);

    const correctCount = results.filter(Boolean).length;
    const wrongCount = results.length - correctCount;

    const color =
      correctCount === results.length
        ? "green"
        : correctCount === 0
        ? "red"
        : "orange";

    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold">
          Score: ${correctCount}/${results.length}
        </span>
      </div>
    `;

    if (correctCount === results.length) {
      ValidationAlert.success(scoreMessage);
    } else if (wrongCount === results.length) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
  };

  const handleShowAnswer = () => {
    setAnswers({
      q1: correctAnswers.q1,
      q2: correctAnswers.q2,
      q3: correctAnswers.q3,
    });
    setShowAnswer(true);
    setWrongInputs([]);
  };

  const handleReset = () => {
    setInputs(Array(2).fill(""));
    setWrongInputs([]);
    setAnswers({ q1: "", q2: "", q3: "" });
    setShowAnswer(false);
    setLocked(false);
  };

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
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{gap:"5px"}}>
          <h5 className="header-title-page8">
            <span className="ex-A">B</span>Drag the age to the child.
          </h5>

          {/* Word Bank */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              margin: "10px 0",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {Object.values(correctAnswers).map((word, i) => (
              <BankWord
                key={`bank-${word}-${i}`}
                id={`bank-${word}-${i}`}
                word={word}
                isUsed={usedWords.includes(word)}
                disabled={showAnswer || locked}
              />
            ))}
          </div>

          {/* Questions */}
          <div>
            {questions.map((q, index) => (
              <div key={q.id} className="question-row-unit7-p2-q3">
                <div className="question-container-unit7-p6-q3">
                  <span className="num2">{index + 1}</span>
                  <img src={q.img} className="avatar-img-wb-u2-q1" />
                  <p className="question-text-unit7-p2-q3">{q.question}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={q.secImg} className="avatar-img-wb-u2-q1" />
                  <div className="sentence-box-unit7-p2-q3">
                    {q.type === "full" && (
                      <DroppableInput
                        id={`q${q.id}`}
                        value={answers[`q${q.id}`]}
                        showAnswer={showAnswer}
                        locked={locked}
                        onClear={handleClear}
                      />
                    )}

                    {q.type === "word" && (
                      <p className="answer-line-unit7-p2-q3">
                        I'm
                        <DroppableInput
                          id={`q${q.id}`}
                          value={answers[`q${q.id}`]}
                          extraClass="small"
                          showAnswer={showAnswer}
                          locked={locked}
                          onClear={handleClear}
                        />
                        {q.prefix} .
                      </p>
                    )}

                    {wrongInputs.includes(q.id) && (
                      <span className="wrong-mark">✕</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="action-buttons-container">
          <button onClick={handleReset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            className="show-answer-btn swal-continue"
            onClick={handleShowAnswer}
          >
            Show Answer
          </button>
          <button onClick={handleCheck} className="check-button2">
            Check Answer ✓
          </button>
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

export default WB_Unit2_Page1_Q2;