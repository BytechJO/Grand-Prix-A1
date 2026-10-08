import React, { useState } from "react";
import bat from "../../../assets/unit9/imgs/U9P80EXEA2-01.svg";
import cap from "../../../assets/unit9/imgs/U9P80EXEA2-02.svg";
import ant from "../../../assets/unit9/imgs/U9P80EXEA2-03.svg";
import dad from "../../../assets/unit9/imgs/U9P80EXEA2-04.svg";
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
  pointerWithin,
} from "@dnd-kit/core";
import "./Unit9_Page5_Q2.css";
import sound from "../../../assets/unit9/sound/cd73pg80-instruction1-adult-lady_f0VzTUFD.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ── Draggable letter chip ─────────────────────────────────────────────────────
function DraggableLetter({ letter, disabled, isFaded }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `letter-${letter}`,
    disabled,
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
        cursor: disabled ? "default" : "grab",
        fontSize: "22px",
        touchAction: "none",
        opacity: isDragging || isFaded ? 0.35 : disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {letter}
    </span>
  );
}

// ── Droppable slot ────────────────────────────────────────────────────────────
function DroppableSlot({ slotId, children, isDropDisabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id: slotId,
    disabled: isDropDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      className={`q-input-unit9-p5-q2 ${isOver ? "drag-over-cell" : ""}`}
    >
      {children}
    </div>
  );
}

// ── Droppable bank ────────────────────────────────────────────────────────────
function DroppableBank({ children, isDropDisabled }) {
  const { isOver, setNodeRef } = useDroppable({
    id: "bank",
    disabled: isDropDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        border: `2px dashed ${isOver ? "#2c5287" : "#ccc"}`,
        borderRadius: "10px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

// ── المكوّن الرئيسي ───────────────────────────────────────────────────────────
const Unit9_Page5_Q2 = () => {
  const correctAnswers = ["m", "n", "n", "m"];
  const letters = ["m", "n"];

  const rows = [
    { img: bat },
    { img: cap },
    { img: ant },
    { img: dad },
  ];
const captions = [
  {
    start: 0.219,
    end: 2.44,
    text: "Page 80, Right Activities.",
  },
  {
    start: 2.779,
    end: 4.88,
    text: "Exercise A, number 2.",
  },
  {
    start: 5.639,
    end: 8.059,
    text: "Does it begin with M or N?",
  },
  {
    start: 8.72,
    end: 9.979,
    text: "Listen and write.",
  },
  {
    start: 10.899,
    end: 12.34,
    text: "One, mouse.",
  },
  {
    start: 12.92,
    end: 14.5,
    text: "Two, net.",
  },
  {
    start: 14.979,
    end: 16.639,
    text: "Three, nail.",
  },
  {
    start: 17.359,
    end: 19.179,
    text: "Four, men.",
  },
];

  const [answers, setAnswers] = useState([null, null, null, null]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const stopAtSecond = 9.979;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 8 } })
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer) return;

    const value = active.id.replace("letter-", "");

    if (over.id === "bank") return; // الحروف قابلة للتكرار، ما نعمل شي

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);
      setAnswers((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      setWrongInputs([]);
    }
  };

  // كبس على الحرف داخل الـ slot → يُمسح
  const handleRemoveFromSlot = (index) => {
    if (showAnswer) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const handleShowAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setShowAnswer(true);
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.some((ans) => !ans || ans.trim() === "")) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let tempScore = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) {
        tempScore++;
      } else {
        wrong.push(i);
      }
    });

    setWrongInputs(wrong);
    setShowAnswer(true);

    const total = correctAnswers.length;
    const color =
      tempScore === total ? "green" : tempScore === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${tempScore} / ${total}
        </span>
      </div>
    `;

    if (tempScore === total) ValidationAlert.success(scoreMessage);
    else if (tempScore === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const reset = () => {
    setAnswers([null, null, null, null]);
    setWrongInputs([]);
    setShowAnswer(false);
    setActiveId(null);
  };

  const dragLetter = activeId ? activeId.replace("letter-", "") : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="question-wrapper-unit3-page6-q1"
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
            <span className="mr-2" style={{ color: "purple" }}>2</span>Does it begin with{" "}
            <span style={{ color: "red" }}>m</span> or{" "}
            <span style={{ color: "red" }}>n</span>? Listen and drag the letter.
          </h5>

          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />

          {/* ── Letter bank: الحروف دايماً موجودة (قابلة للتكرار) ── */}
          <DroppableBank isDropDisabled={showAnswer}>
            {letters.map((letter) => (
              <DraggableLetter
                key={letter}
                letter={letter}
                disabled={showAnswer}
                isFaded={activeId === `letter-${letter}`}
              />
            ))}
          </DroppableBank>

          <div className="row-content10-unit3-page6-q1 w-full">
            {rows.map((row, index) => (
              <div className="row2-unit3-page6-q1" key={index}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <span className="num-span">{index + 1}</span>
                  <img src={row.img} alt="" className="q-img-unit3-page6-q1" />
                </div>
                <span style={{ position: "relative", display: "flex" }}>
                  <div className="input-wrapper-unit3-page6-q1">
                    <DroppableSlot
                      slotId={`slot-${index}`}
                      isDropDisabled={showAnswer}
                    >
                      {answers[index] && (
                        <span
                          onClick={() => handleRemoveFromSlot(index)}
                          style={{ cursor: showAnswer ? "default" : "pointer" }}
                        >
                          {answers[index]}
                        </span>
                      )}
                    </DroppableSlot>

                    {wrongInputs.includes(index) && (
                      <span className="error-mark-input">✕</span>
                    )}
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
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

      {/* ── Drag overlay ── */}
      <DragOverlay>
        {dragLetter && (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              fontSize: "22px",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {dragLetter}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit9_Page5_Q2;