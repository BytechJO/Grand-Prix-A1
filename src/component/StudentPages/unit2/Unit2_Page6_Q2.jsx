import React, { useState, useRef } from "react";
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
import present from "../../../assets/img_unit2/imgs/Present1.jpg";
import cake from "../../../assets/img_unit2/imgs/Cake1.jpg";
import balloon from "../../../assets/img_unit2/imgs/Baloon1.jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit2_Page6_Q2.css";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const exerciseData = {
  pairs: [
    { id: "pair-1", letter: "1", content: "Happy birthday! Here is a cake" },
    { id: "pair-2", letter: "2", content: "Happy birthday! Here is a balloon" },
    { id: "pair-3", letter: "3", content: "Happy birthday! Here is a present" },
  ],
  images: [cake, present, balloon],
};

const correctAnswers = {
  "drop-1": "pair-1",
  "drop-2": "pair-3",
  "drop-3": "pair-2",
};

const initialDroppedState = {
  "drop-1": null,
  "drop-2": null,
  "drop-3": null,
};

// ─────────────────────────────────────────────
// WordBankItem — draggable number in right panel
// ─────────────────────────────────────────────
const WordBankItem = ({ pair, isUsed, showAnswer }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `bank-${pair.id}`,
      data: { pairId: pair.id, letter: pair.letter, source: "bank" },
      disabled: isUsed || showAnswer,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.35 : isUsed ? 0.35 : 1,
    cursor: isUsed || showAnswer ? "default" : "grab",
    filter: isUsed ? "grayscale(60%)" : "none",
    transition: "opacity 0.2s, filter 0.2s",
    userSelect: "none",
  };

  return (
    <div className="option-box2">
      <span
        ref={setNodeRef}
        style={style}
        className={`number-tag2 draggable-number${isDragging ? " dragging" : ""}`}
        {...(isUsed || showAnswer ? {} : { ...listeners, ...attributes })}
      >
        {pair.letter}
      </span>
      <span className="option-text2">{pair.content}</span>
    </div>
  );
};

// ─────────────────────────────────────────────
// PlacedNumber — draggable number inside drop circle
// ─────────────────────────────────────────────
const PlacedNumber = ({ pairId, letter, dropId, showAnswer, onReturn }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `placed-${dropId}`,
      data: { pairId, letter, source: "drop", dropId },
      disabled: showAnswer,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.35 : 1,
    cursor: showAnswer ? "default" : "pointer",
    userSelect: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="circle-number2"
      {...(showAnswer ? {} : { ...listeners, ...attributes })}
      onClick={() => !showAnswer && onReturn(dropId)}
    >
      {letter}
    </div>
  );
};

// ─────────────────────────────────────────────
// DropCircle — zone next to each image
// ─────────────────────────────────────────────
const DropCircle = ({
  dropId,
  imageSrc,
  index,
  droppedPairId,
  isWrong,
  showAnswer,
  onReturn,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
    disabled: showAnswer,
  });

  const droppedPair = droppedPairId
    ? exerciseData.pairs.find((p) => p.id === droppedPairId)
    : null;

  return (
    <div className="image-row2">
      <div
        ref={setNodeRef}
        className={`drop-circle2${isOver ? " drop2-hover" : ""}`}
        style={{ position: "relative" }}
      >
        {isWrong && <div className="wrong-x3">✕</div>}

        {droppedPair ? (
          <PlacedNumber
            pairId={droppedPair.id}
            letter={droppedPair.letter}
            dropId={dropId}
            showAnswer={showAnswer}
            onReturn={onReturn}
          />
        ) : null}
      </div>

      <img src={imageSrc} alt="" className="person-img2" />
    </div>
  );
};

// ─────────────────────────────────────────────
// WordBank — droppable right panel
// ─────────────────────────────────────────────
const WordBank = ({ pairs, usedPairIds, showAnswer }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "letters2" });

  return (
    <div
      ref={setNodeRef}
      className="right-side2"
      style={{
        background: isOver ? "rgba(28,61,126,0.06)" : undefined,
        transition: "background 0.2s",
      }}
    >
      {pairs.map((pair) => (
        <WordBankItem
          key={pair.id}
          pair={pair}
          isUsed={usedPairIds.has(pair.id)}
          showAnswer={showAnswer}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
const Unit2_Page6_Q2 = () => {
  const [droppedLetters, setDroppedLetters] = useState({
    ...initialDroppedState,
  });
  const [wrongDrops, setWrongDrops] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeDrag, setActiveDrag] = useState(null);

  const usedPairIds = new Set(Object.values(droppedLetters).filter(Boolean));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
  );

  // ── Drag Start ──────────────────────────────
  const handleDragStart = (event) => {
    setActiveDrag(event.active.data.current);
  };

  // ── Drag End ────────────────────────────────
  const handleDragEnd = (event) => {
    setActiveDrag(null);
    if (showAnswer) return;

    const { active, over } = event;
    if (!over) return;

    const { pairId, source, dropId: fromDropId } = active.data.current;
    const toId = over.id;

    setDroppedLetters((prev) => {
      const next = { ...prev };

      if (source === "drop") next[fromDropId] = null;

      if (toId === "letters2") return next; // returned to bank

      next[toId] = pairId;
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
  const handleReset = () => {
    setDroppedLetters({ ...initialDroppedState });
    setWrongDrops([]);
    setShowAnswer(false);
  };

  // ── Check ───────────────────────────────────
  const handleCheckAnswers = () => {
    if (showAnswer) return;

    const allFilled = Object.values(droppedLetters).every((v) => v !== null);
    if (!allFilled)
      return ValidationAlert.info(
        "Incomplete!",
        "Please complete all drop zones.",
      );

    let correctCount = 0;
    const total = exerciseData.pairs.length;
    const wrongTemp = [];

    Object.keys(droppedLetters).forEach((dropId) => {
      if (droppedLetters[dropId] === correctAnswers[dropId]) correctCount++;
      else wrongTemp.push(dropId);
    });

    setWrongDrops(wrongTemp);
    setShowAnswer(true);

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ── Show Answer ─────────────────────────────
  const handleShowAnswer = () => {
    setDroppedLetters({ ...correctAnswers });
    setWrongDrops([]);
    setShowAnswer(true);
  };

  // ─────────────────────────────────────────────
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div
          className="div-forall"
          style={{
            gap: "30px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A">E</span> Read and drag the number to the correct box
          </h5>

          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="layout2 w-full">
              {/* Left — images + drop circles */}
              <div className="left-side2">
                {exerciseData.images.map((imageSrc, index) => {
                  const dropId = `drop-${index + 1}`;
                  return (
                    <DropCircle
                      key={dropId}
                      dropId={dropId}
                      imageSrc={imageSrc}
                      index={index}
                      droppedPairId={droppedLetters[dropId]}
                      isWrong={wrongDrops.includes(dropId)}
                      showAnswer={showAnswer}
                      onReturn={handleReturnToBank}
                    />
                  );
                })}
              </div>

              {/* Right — word bank */}
              <WordBank
                pairs={exerciseData.pairs}
                usedPairIds={usedPairIds}
                showAnswer={showAnswer}
              />
            </div>

            {/* Ghost while dragging */}
            <DragOverlay>
              {activeDrag ? (
                <div
                  className="number-tag2 draggable-number dragging"
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
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-container">
        <button onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={handleShowAnswer} className="show-answer-btn">
          Show Answer
        </button>
        <button onClick={handleCheckAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </>
  );
};

export default Unit2_Page6_Q2;
