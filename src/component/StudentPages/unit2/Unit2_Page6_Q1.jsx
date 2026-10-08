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
import girl1 from "../../../assets/img_unit2/imgs/girl1.jpg";
import girl2 from "../../../assets/img_unit2/imgs/girl2.jpg";
import boy1 from "../../../assets/img_unit2/imgs/boy1.jpg";
import boy2 from "../../../assets/img_unit2/imgs/boy2.jpg";
import sound1 from "../../../assets/unit1/sounds/P15QD.mp3";
import stella from "../../../assets/img_unit2/sounds-unit2/Pg15_1.1_Stella.mp3";
import tom from "../../../assets/img_unit2/sounds-unit2/Pg15_1.2_Tom.mp3";
import harley from "../../../assets/img_unit2/sounds-unit2/Pg15_1.3_Harley.mp3";
import helen from "../../../assets/img_unit2/sounds-unit2/Pg15_1.4_Helen.mp3";
import "./Unit2_Page6_Q1.css";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const exerciseData = {
  pairs: [
    { id: "pair-1", letter: "1", content: "January" },
    { id: "pair-2", letter: "2", content: "November" },
    { id: "pair-3", letter: "3", content: "May" },
    { id: "pair-4", letter: "4", content: "August" },
  ],
  images: [
    { img: girl1, sound: stella },
    { img: girl2, sound: helen },
    { img: boy1, sound: tom },
    { img: boy2, sound: harley },
  ],
};

const correctAnswers = {
  "drop-1": "pair-1",
  "drop-2": "pair-4",
  "drop-3": "pair-2",
  "drop-4": "pair-3",
};

const initialDroppedState = {
  "drop-1": null,
  "drop-2": null,
  "drop-3": null,
  "drop-4": null,
};

const stopAtSecond = 4.5;
const captions = [
  { start: 0,     end: 4.27, text: "Page 15, Exercise D. Listen and choose." },
  { start: 4.29,  end: 6.24, text: "1-January" },
  { start: 6.26,  end: 8.28, text: "2-November" },
  { start: 8.3,   end: 10.12, text: "3-May" },
  { start: 10.14, end: 12.07, text: "4-August" },
];

// ─────────────────────────────────────────────
// WordBankItem — draggable number tag in right panel
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
    <div className="option-box">
      <span
        ref={setNodeRef}
        style={style}
        className={`number-tag draggable-number${isUsed ? " number-tag--used" : ""}${isDragging ? " dragging" : ""}`}
        {...(isUsed || showAnswer ? {} : { ...listeners, ...attributes })}
      >
        {pair.letter}
      </span>
      <span className="month-label">{pair.content}</span>
    </div>
  );
};

// ─────────────────────────────────────────────
// PlacedNumber — draggable number inside a drop circle
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
      className="circle-number"
      {...(showAnswer ? {} : { ...listeners, ...attributes })}
      onClick={() => !showAnswer && onReturn(dropId)}
    >
      {letter}
    </div>
  );
};

// ─────────────────────────────────────────────
// DropCircle — drop zone next to each image
// ─────────────────────────────────────────────
const DropCircle = ({
  dropId,
  imgData,
  droppedPairId,
  isWrong,
  showAnswer,
  onReturn,
  onPlaySound,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: dropId,
    disabled: showAnswer,
  });

  const droppedPair = droppedPairId
    ? exerciseData.pairs.find((p) => p.id === droppedPairId)
    : null;

  return (
    <div className="image-row">
      <img
        src={imgData.img}
        alt=""
        className="person-img"
        style={{ cursor: "pointer" }}
        onClick={() => onPlaySound(imgData.sound)}
      />

      <div
        ref={setNodeRef}
        className={`drop-circle${isOver ? " drop-hover" : ""}`}
        style={{ position: "relative" }}
      >
        {/* Wrong indicator */}
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
    </div>
  );
};

// ─────────────────────────────────────────────
// WordBank droppable right panel
// ─────────────────────────────────────────────
const WordBank = ({ pairs, usedPairIds, showAnswer }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "letters" });

  return (
    <div
      ref={setNodeRef}
      className="right-side"
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
const Unit2_Page6_Q1 = () => {
  const [droppedLetters, setDroppedLetters] = useState({ ...initialDroppedState });
  const [wrongDrops, setWrongDrops]         = useState([]);
  const [showAnswer, setShowAnswer]         = useState(false);
  const [activeDrag, setActiveDrag]         = useState(null);

  const clickAudioRef = useRef(null);

  // Which pair IDs are currently sitting in a drop zone
  const usedPairIds = new Set(Object.values(droppedLetters).filter(Boolean));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor,   { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const playSound = (src) => {
    if (!clickAudioRef.current) return;
    clickAudioRef.current.src = src;
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.play();
  };

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

      // Clear origin drop zone if dragged from one
      if (source === "drop") {
        next[fromDropId] = null;
      }

      if (toId === "letters") {
        // Returned to word bank → just clear
        return next;
      }

      // Place into target drop zone (overwrite whatever was there — it returns to bank automatically)
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
    if (!allFilled) {
      ValidationAlert.info("Incomplete!", "Please complete all drop zones.");
      return;
    }

    let correctCount = 0;
    const total = exerciseData.pairs.length;
    const wrongTemp = [];

    Object.keys(droppedLetters).forEach((dropId) => {
      if (droppedLetters[dropId] === correctAnswers[dropId]) {
        correctCount++;
      } else {
        wrongTemp.push(dropId);
      }
    });

    setWrongDrops(wrongTemp);
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
    else if (correctCount === 0)  ValidationAlert.error(scoreMessage);
    else                          ValidationAlert.warning(scoreMessage);
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
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span className="ex-A">D</span> Listen and match the month.
          </h5>

          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />

          <div className="u2-container">
            <audio ref={clickAudioRef} style={{ display: "none" }} />

            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="layout">
                {/* Left side — images + drop circles */}
                <div className="left-side">
                  {exerciseData.images.map((imgData, index) => {
                    const dropId = `drop-${index + 1}`;
                    return (
                      <DropCircle
                        key={dropId}
                        dropId={dropId}
                        imgData={imgData}
                        droppedPairId={droppedLetters[dropId]}
                        isWrong={wrongDrops.includes(dropId)}
                        showAnswer={showAnswer}
                        onReturn={handleReturnToBank}
                        onPlaySound={playSound}
                      />
                    );
                  })}
                </div>

                {/* Right side — word bank */}
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
                    className="number-tag draggable-number dragging"
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
      </div>
    </>
  );
};

export default Unit2_Page6_Q1;