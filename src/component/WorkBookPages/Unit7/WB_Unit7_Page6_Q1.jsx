import "./WB_Unit7_Page6_Q1.css";
import { useState } from "react";
import sound1 from "../../../assets/U1 WB/U7/audio/cd9pg44-instruction1-adult-lady_LXsZ0C5j.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U7/U7P44EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U7/U7P44EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U7/U7P44EXEA-03.svg";
import img4 from "../../../assets/U1 WB/U7/U7P44EXEA-04.svg";
import img5 from "../../../assets/U1 WB/U7/U7P44EXEA-05.svg";
import img6 from "../../../assets/U1 WB/U7/U7P44EXEA-06.svg";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

// ─── ثوابت ───────────────────────────────────────────────────────────────────
const CORRECT_DATA = ["w", "w", "h", "w", "h", "w"];
const LETTER_BANK = ["h", "w"];
const IMAGES = [img1, img2, img3, img4, img5, img6];
const CAPTIONS = [
  {
    start: 0,
    end: 7.18,
    text: "Phonics exercise A. Does it begin with H or W? Listen and write.",
  },
  {
    start: 7.82,
    end: 9.74,
    text: "One, waffle.",
  },
  {
    start: 10.3,
    end: 11.98,
    text: "Two, waitress.",
  },
  {
    start: 12.7,
    end: 14.52,
    text: "Three, house.",
  },
  {
    start: 15.08,
    end: 16.86,
    text: "Four, hose.",
  },
  {
    start: 17.52,
    end: 19.14,
    text: "Five, hat.",
  },
  {
    start: 19.82,
    end: 21.48,
    text: "Six, worm.",
  },
];

// ─── LetterChip — لا يصير disabled لأن نفس الحرف يتكرر ──────────────────────
const LetterChip = ({ id, letter, isDisabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: 40,
        height: 40,
        border: "2px solid #2c5287",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 20,
        background: "white",
        cursor: isDisabled ? "not-allowed" : "grab",
        opacity: isDragging ? 0.5 : 1,
        touchAction:"none",
        userSelect: "none",
        transition: "opacity .2s",
      }}
    >
      {letter}
    </div>
  );
};

// ─── DropBox ──────────────────────────────────────────────────────────────────
const DropBox = ({ index, value, isWrong, isLocked, onReturn }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${index}`,
    disabled: isLocked,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !isLocked && value && onReturn(index)}

      title={value && !isLocked ? "اضغط لإرجاع الحرف" : ""}
      className={`wb-unit7-p5-q1-input ${isOver?"drag-over-cell":""}`}
      style={{
        // background: isOver ? "#e3f2fd" : value ? "" : "white",
        cursor: value && !isLocked ? "pointer" : "default",
        transition: "background .15s",
      }}
    >
      {value || ""}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit7_Page6_Q1 = () => {
  const [answers, setAnswers] = useState(Array(6).fill(null));
  const [showResult, setShowResult] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null); // الحرف المسحوب حالياً

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // ─── Drag End ───────────────────────────────────────────────────────────────
  const handleDragEnd = ({ active, over }) => {
    setActiveLetter(null);
    if (!over || showAnswer) return;

    const value = active.id.replace("letter-", ""); // "h" أو "w"
    const destId = over.id;
    if (!destId.startsWith("drop-")) return;

    const index = Number(destId.replace("drop-", ""));

    setAnswers((prev) => {
      const copy = [...prev];
      copy[index] = value; // ✅ نفس الحرف ممكن يكون بأكثر من خانة
      return copy;
    });

    setShowResult([]);
  };

  // ─── Return to bank (كليك على الخانة) ───────────────────────────────────────
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
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const resultHTML = `<div style="font-size:20px;text-align:center;margin-top:8px"><span style="color:${color};font-weight:bold">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  // ─── Show Answer ─────────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    setAnswers(CORRECT_DATA);
    setShowResult([]);
    setShowAnswer(true);
  };

  // ─── Reset ───────────────────────────────────────────────────────────────────
  const resetAnswers = () => {
    setAnswers(Array(6).fill(null));
    setShowResult([]);
    setShowAnswer(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) =>
        setActiveLetter(active.id.replace("letter-", ""))
      }
      onDragEnd={handleDragEnd}
    >
      <div
        className="unit3-q3-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <div className="div-forall" style={{ gap: 15 }}>
          <h5 className="header-title-page8">
            <span className="ex-A">A</span> Listen and drag the letter to the
            picture.
          </h5>

          <QuestionAudioPlayer
            src={sound1}
            captions={CAPTIONS}
            stopAtSecond={7.18}
          />

          {/* ── Letter Bank ── */}
          <div
            style={{
              display: "flex",
              gap: 12,
              padding: 10,
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: 10,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {LETTER_BANK.map((letter, i) => (
              <LetterChip
                key={letter}
                id={`letter-${letter}`}
                letter={letter}
                isDisabled={showAnswer}
              />
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
        {activeLetter && (
          <div
            style={{
              width: 40,
              height: 40,
              border: "2px solid #2c5287",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: 20,
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,.2)",
              cursor: "grabbing",
            }}
          >
            {activeLetter}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit7_Page6_Q1;
