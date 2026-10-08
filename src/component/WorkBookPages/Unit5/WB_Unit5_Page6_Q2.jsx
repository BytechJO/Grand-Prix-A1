import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U5/U5P32EXEB-01.svg";
import cap from "../../../assets/U1 WB/U5/U5P32EXEB-02.svg";
import ant from "../../../assets/U1 WB/U5/U5P32EXEB-03.svg";
import dad from "../../../assets/U1 WB/U5/U5P32EXEB-04.svg";
import dad1 from "../../../assets/U1 WB/U5/U5P32EXEB-05.svg";
import dad2 from "../../../assets/U1 WB/U5/U5P32EXEB-06.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import sound1 from "../../../assets/U1 WB/U5/audio/cd7pg32-instruction1-adult-lady_PVAFxGJz.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─── Draggable Word ───────────────────────────────────────────────
const DraggableWord = ({ word, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
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
        cursor: locked ? "default" : "grab",
        opacity: isDragging ? 0.4 : 1,
        touchAction: "none",
        transition: "all 0.2s ease",
        userSelect: "none",
      }}
    >
      {word}
    </span>
  );
};

// ─── Droppable Slot ───────────────────────────────────────────────
const DroppableSlot = ({ index, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${index}`,
    disabled: locked,
  });

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <div className="input-wrapper-unit3-page6-q1">
        <div
          ref={setNodeRef}
          className={`${isOver ? "drag-over-cell" : ""}`}
          onClick={() => !locked && value && onRemove(index)}
          style={{
            background: isOver ? "#e3f2fd" : "white",
            minWidth: "120px",
            minHeight: "36px",
            display: "flex",
            alignItems: "center",
            borderRadius: "0px",
            justifyContent: "center",
            borderBottom: "1px solid #72d0f6",
            cursor: !locked && value ? "pointer" : "default",
            transition: "background 0.15s ease",
          }}
          title={!locked && value ? "Click to remove" : ""}
        >
          {value && <span>{value}</span>}
        </div>
        {isWrong && <span className="error-mark-input-review3-p2-q1">✕</span>}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────
const WB_Unit3_Page6_Q1 = () => {
  const correctAnswers = ["g", "g", "k", "k", "g", "k"];
  const wordBank = ["g", "k"];

  const [slots, setSlots] = useState(Array(6).fill(null));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const stopAtSecond = 5.179;

  // ─── Drag Handlers ─────────────────────────────────────────────
  const handleDragStart = (event) => {
    setActiveWord(event.active.id.replace("word-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("slot-")) return;

    const draggedWord = active.id.replace("word-", "");
    const targetIndex = Number(over.id.replace("slot-", ""));

    setSlots((prev) => {
      const copy = [...prev];
      copy[targetIndex] = draggedWord;
      return copy;
    });

    setWrongInputs([]);
  };

  // ─── Remove from slot (click) ──────────────────────────────────
  const handleRemoveFromSlot = (index) => {
    setSlots((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
    setWrongInputs([]);
  };

  // ─── Actions ───────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;
    if (slots.some((slot) => !slot)) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let tempScore = 0;
    let wrong = [];

    slots.forEach((ans, i) => {
      if (ans === correctAnswers[i]) {
        tempScore++;
      } else {
        wrong.push(i);
      }
    });

    setWrongInputs(wrong);
    setLocked(true);

    const total = correctAnswers.length;
    const color =
      tempScore === total ? "green" : tempScore === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${tempScore} / ${total}
        </span>
      </div>
    `;

    tempScore === total
      ? ValidationAlert.success(msg)
      : tempScore === 0
        ? ValidationAlert.error(msg)
        : ValidationAlert.warning(msg);
  };

  const reset = () => {
    setSlots(Array(6).fill(null));
    setWrongInputs([]);
    setLocked(false);
  };

  const showAnswer = () => {
    setSlots([...correctAnswers]);
    setWrongInputs([]);
    setLocked(true);
  };

  // ─── Captions ──────────────────────────────────────────────────
  const captions = [
    {
      start: 0,
      end: 7.88,
      text: "Phonics exercise B. Does it begin with G or K? Listen, look, and write.",
    },
    {
      start: 8.68,
      end: 9.98,
      text: "1, goat.",
    },
    {
      start: 10.5,
      end: 12.08,
      text: "2, glue.",
    },
    {
      start: 12.6,
      end: 14.3,
      text: "3, kite.",
    },
    {
      start: 14.78,
      end: 16.38,
      text: "4, kitchen.",
    },
    {
      start: 16.9,
      end: 18.52,
      text: "5, gift.",
    },
    {
      start: 19.02,
      end: 20.62,
      text: "6, key.",
    },
  ];

  return (
    <DndContext
      sensors={sensors}
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
        <div className="div-forall" style={{ gap: "15px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">A</span> Drag and drop.
          </h5>

          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />

          {/* ─── Word Bank ─── */}
          <div
            style={{
              display: "flex",
              gap: "30px",
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
              <DraggableWord key={word} word={word} locked={locked} />
            ))}
          </div>

          {/* ─── Image + Slot Grid ─── */}
          <div className="row-content10-review3-p2-q1">
            {[bat, cap, ant, dad, dad1, dad2].map((item, index) => (
              <div className="row2-review3-p2-q1" key={index}>
                <img src={item} alt="" className="q-img-wb-unit3-p6-q1" />
                <DroppableSlot
                  index={index}
                  value={slots[index]}
                  isWrong={wrongInputs.includes(index)}
                  locked={locked}
                  onRemove={handleRemoveFromSlot}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            onClick={showAnswer}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
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

export default WB_Unit3_Page6_Q1;
