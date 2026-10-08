import React, { useState } from "react";
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
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page8_Q2.css";
import img1 from "../../../assets/unit1/imgs/U1P8EXEA2-01.svg";
import img2 from "../../../assets/unit1/imgs/U1P8EXEA2-02.svg";
import img3 from "../../../assets/unit1/imgs/U1P8EXEA2-03.svg";
import img4 from "../../../assets/unit1/imgs/U1P8EXEA2-04.svg";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const exerciseData = {
  pairs: [
    { id: "pair-1", letter: "Table" },
    { id: "pair-2", letter: "Taxi" },
    { id: "pair-3", letter: "Deer" },
    { id: "pair-4", letter: "Dish" },
  ],
  images: [img1, img2, img3, img4],
  answers: {
    "drop-1": "Table",
    "drop-2": "Taxi",
    "drop-3": "Deer",
    "drop-4": "Dish",
  },
};

const getShuffledPairs = () =>
  [...exerciseData.pairs].sort(() => Math.random() - 0.5);

const initialDroppedState = {
  "drop-1": null,
  "drop-2": null,
  "drop-3": null,
  "drop-4": null,
};

// ─────────────────────────────────────────────
// WordBankItem — draggable chip in the word bank
// ─────────────────────────────────────────────
const WordBankItem = ({ letter, isUsed, showAnswer }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `bank-${letter}`,
      data: { letter, source: "bank" },
      disabled: isUsed || showAnswer,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : isUsed ? 0.35 : 1,
    cursor: isUsed || showAnswer ? "default" : "grab",
    userSelect: "none",
    // keep item visible but visually disabled
    filter: isUsed ? "grayscale(60%)" : "none",
    transition: "opacity 0.2s, filter 0.2s",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`letter-box${isDragging ? " dragging" : ""}${isUsed ? " letter-box--used" : ""}`}
      {...(isUsed || showAnswer ? {} : { ...listeners, ...attributes })}
    >
      {letter}
    </div>
  );
};

// ─────────────────────────────────────────────
// PlacedWord — draggable chip inside a drop zone
// ─────────────────────────────────────────────
const PlacedWord = ({ letter, dropId, showAnswer, onReturnToBank }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `placed-${dropId}`,
      data: { letter, source: "drop", dropId },
      disabled: showAnswer,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    cursor: showAnswer ? "default" : "pointer",
    userSelect: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="dropped-letter"
      {...(showAnswer ? {} : { ...listeners, ...attributes })}
      onClick={() => !showAnswer && onReturnToBank(dropId)}
    >
      {letter}
    </div>
  );
};

// ─────────────────────────────────────────────
// DropZone — the box under each image
// ─────────────────────────────────────────────
const DropZone = ({
  dropId,
  imageSrc,
  index,
  droppedLetter,
  isWrong,
  showAnswer,
  onReturnToBank,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
    disabled: showAnswer,
  });

  return (
    <div className="image-container">
      <div style={{ display: "flex", gap: "10px" }}>
        <span style={{ color: "#1c3d7e", fontSize: "20px", fontWeight: "600" }}>
          {index + 1}
        </span>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <img src={imageSrc} alt={`Visual hint ${index + 1}`} />
        <div
          ref={setNodeRef}
          className={`drop-box${isOver ? " is-over" : ""}${isWrong ? " wrong-drop" : ""}`}
        >
          {droppedLetter ? (
            <PlacedWord
              letter={droppedLetter}
              dropId={dropId}
              showAnswer={showAnswer}
              onReturnToBank={onReturnToBank}
            />
          ) : (
            <span className="placeholder" />
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// WordBank droppable container
// ─────────────────────────────────────────────
const WordBank = ({ shuffledPairs, usedLetters, showAnswer }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "letters" });

  return (
    <div className="word-container">
      <div
        ref={setNodeRef}
        className="letters-section-horizontal"
        style={{
          background: isOver ? "rgba(28,61,126,0.06)" : undefined,
          transition: "background 0.2s",
        }}
      >
        {shuffledPairs.map((pair) => (
          <WordBankItem
            key={pair.id}
            letter={pair.letter}
            isUsed={usedLetters.has(pair.letter)}
            showAnswer={showAnswer}
          />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const Page8_Q2 = () => {
  const [droppedLetters, setDroppedLetters] = useState({
    ...initialDroppedState,
  });
  const [shuffledPairs, setShuffledPairs] = useState(getShuffledPairs());
  const [wrongDrops, setWrongDrops] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeDrag, setActiveDrag] = useState(null); // { letter, source, dropId? }

  const usedLetters = new Set(Object.values(droppedLetters).filter(Boolean));

  // Sensors — pointer + touch support
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
  );

  // ── Drag Start ──────────────────────────────
  const handleDragStart = (event) => {
    const { data } = event.active;
    setActiveDrag(data.current);
  };

  // ── Drag End ────────────────────────────────
  const handleDragEnd = (event) => {
    setActiveDrag(null);
    if (showAnswer) return;

    const { active, over } = event;
    if (!over) return;

    const { letter, source, dropId: fromDropId } = active.data.current;
    const toId = over.id; // "letters" | "drop-1" … "drop-4"

    setDroppedLetters((prev) => {
      const next = { ...prev };

      // Clear the origin if it came from a drop zone
      if (source === "drop") {
        next[fromDropId] = null;
      }

      if (toId === "letters") {
        // Dropped back onto word bank → just remove
        return next;
      }

      // Dropped onto a drop zone
      // If destination already occupied → push existing letter back (it returns to bank automatically
      // because we only track what's in drop zones; removing it here is enough)
      next[toId] = letter;
      return next;
    });

    setWrongDrops([]);
  };

  // ── Click to return ─────────────────────────
  const handleReturnToBank = (dropZoneId) => {
    if (showAnswer) return;
    setDroppedLetters((prev) => ({ ...prev, [dropZoneId]: null }));
    setWrongDrops((prev) => prev.filter((id) => id !== dropZoneId));
  };

  // ── Reset ───────────────────────────────────
  const resetExercise = () => {
    setDroppedLetters({ ...initialDroppedState });
    setWrongDrops([]);
    setShowAnswer(false);
    setShuffledPairs(getShuffledPairs());
  };

  // ── Check ───────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer) return;

    const allFilled = Object.values(droppedLetters).every((v) => v !== null);
    if (!allFilled) {
      ValidationAlert.info(
        "Incomplete!",
        "Please fill all the drop zones before checking your answers.",
      );
      return;
    }

    let correctCount = 0;
    const total = exerciseData.pairs.length;
    const wrongList = [];

    exerciseData.pairs.forEach((_, index) => {
      const dropZoneId = `drop-${index + 1}`;
      if (droppedLetters[dropZoneId] === exerciseData.answers[dropZoneId]) {
        correctCount++;
      } else {
        wrongList.push(dropZoneId);
      }
    });

    setWrongDrops(wrongList);
    setShowAnswer(true);

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;margin-top:10px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ── Show Answer ─────────────────────────────
  const handleShowAnswer = () => {
    setDroppedLetters({ ...exerciseData.answers });
    setWrongDrops([]);
    setShowAnswer(true);
  };

  // ─────────────────────────────────────────────
  return (
    <div className="page8-wrapper" style={{ padding: "30px" }}>
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: "relative",
          gap: "40px",
         
        }}
      >
        <h5 className="header-title-page8">
          <span className="number-of-q">2</span>Drag the words to the correct
          picture.
        </h5>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* Word Bank */}
          <WordBank
            shuffledPairs={shuffledPairs}
            usedLetters={usedLetters}
            showAnswer={showAnswer}
          />

          {/* Drop Zones */}
          <div className="exercise-layout-vertical">
            <div className="image-section-horizontal">
              {exerciseData.images.map((imageSrc, index) => {
                const dropId = `drop-${index + 1}`;
                return (
                  <DropZone
                    key={dropId}
                    dropId={dropId}
                    imageSrc={imageSrc}
                    index={index}
                    droppedLetter={droppedLetters[dropId]}
                    isWrong={wrongDrops.includes(dropId)}
                    showAnswer={showAnswer}
                    onReturnToBank={handleReturnToBank}
                  />
                );
              })}
            </div>
          </div>

          {/* Drag Overlay — floating ghost while dragging */}
          <DragOverlay>
            {activeDrag ? (
              <div
                className="letter-box dragging"
                style={{
                  cursor: "grabbing",
                  opacity: 0.9,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
                }}
              >
                {activeDrag.letter}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button onClick={resetExercise} className="try-again-button">
          Start Again ↻
        </button>
        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page8_Q2;
