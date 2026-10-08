import React, { useState, useMemo } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit10_Page5_Q1.css";
import img1 from "../../../assets/unit10/imgs/U10P86EXEA1-01.svg";
import img2 from "../../../assets/unit10/imgs/U10P86EXEA1-02.svg";
import img3 from "../../../assets/unit10/imgs/U10P86EXEA1-03.svg";
import img4 from "../../../assets/unit10/imgs/U10P86EXEA1-04.svg";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIRS = [
  { id: "pair-1", letter: "hen", img: img1 },
  { id: "pair-2", letter: "bed", img: img2 },
  { id: "pair-3", letter: "jet", img: img3 },
  { id: "pair-4", letter: "egg", img: img4 },
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ─── Bank chip ────────────────────────────────────────────────────────────────
const BankChip = ({ word, isUsed, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${word}`,
    disabled: isUsed || locked,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`letter-box${isDragging ? " dragging" : ""}`}
      style={{
        background: isUsed ? "#e0e0e0" : "white",
        cursor: isUsed || locked ? "not-allowed" : "grab",
        opacity: isUsed ? 0.45 : isDragging ? 0.3 : 1,
        transition: "opacity 0.2s, background 0.2s",
        userSelect: "none",
        touchAction: "none",
        color: isUsed ? "#999" : undefined,
      }}
    >
      {word}
    </div>
  );
};

// ─── Drop zone ────────────────────────────────────────────────────────────────
const DropZone = ({ id, answer, isWrong, locked, onRemove, index, imgSrc }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="image-container-unit10-p5-q1">
      <div style={{ display: "flex", gap: "10px" }}>
        <span style={{ color: "#1c3d7e", fontSize: "20px", fontWeight: "600" }}>
          {index + 1}
        </span>
        <img
          src={imgSrc}
          style={{ height: "150px" }}
          alt={`Visual hint ${index + 1}`}
        />
      </div>

      <div
        ref={setNodeRef}
        className={[
          "drop-box",
          isOver ? "is-over" : "",
          isWrong ? "wrong-drop" : "",
        ].join(" ")}
        style={{
          background: isOver ? "#e8f0fe" : undefined,
          transition: "background 0.15s",
          cursor: answer && !locked ? "pointer" : "default",
        }}
        onClick={() => {
          if (answer && !locked) onRemove(id);
        }}
        title={answer && !locked ? "Click to remove" : ""}
      >
        {answer ? (
          <div
            className="dropped-letter"
            style={{ color: isWrong ? "red" : undefined }}
          >
            {answer}
          </div>
        ) : (
          <span className="placeholder" />
        )}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Unit10_Page5_Q1 = () => {
  const [dropped, setDropped] = useState({
    "drop-1": null,
    "drop-2": null,
    "drop-3": null,
    "drop-4": null,
  });
  const [wrongDrops, setWrongDrops] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Shuffle only on first render
  const shuffledLetters = useMemo(
    () => shuffle(PAIRS.map((p) => p.letter)),
    [],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedWords = new Set(Object.values(dropped).filter(Boolean));
  const activeWord = activeId ? activeId.replace("bank-", "") : null;

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const word = active.id.replace("bank-", "");
    const slotId = over.id;
    if (!slotId.startsWith("drop-")) return;

    setDropped((prev) => {
      const updated = { ...prev };
      // Remove from old slot if existed
      Object.keys(updated).forEach((k) => {
        if (updated[k] === word) updated[k] = null;
      });
      updated[slotId] = word;
      return updated;
    });

    setWrongDrops([]);
  };

  // ⭐ Click slot → return to bank
  const handleRemove = (slotId) => {
    setDropped((prev) => ({ ...prev, [slotId]: null }));
    setWrongDrops([]);
  };

  const checkAnswers = () => {
    if (locked) return;

    const allFilled = Object.values(dropped).every((v) => v !== null);
    if (!allFilled) {
      ValidationAlert.info(
        "Incomplete!",
        "Please fill all the drop zones before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrongList = [];

    PAIRS.forEach((pair, index) => {
      const slotId = `drop-${index + 1}`;
      if (dropped[slotId] === pair.letter) correctCount++;
      else wrongList.push(slotId);
    });

    setWrongDrops(wrongList);
    setLocked(true);

    const total = PAIRS.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;margin-top:10px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    const correct = {};
    PAIRS.forEach((pair, i) => {
      correct[`drop-${i + 1}`] = pair.letter;
    });
    setDropped(correct);
    setWrongDrops([]);
    setLocked(true);
  };

  const reset = () => {
    setDropped({
      "drop-1": null,
      "drop-2": null,
      "drop-3": null,
      "drop-4": null,
    });
    setWrongDrops([]);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper" style={{ padding: "30px" }}>
        <div className="div-forall" style={{gap:"50px"}}>
          <h5 className="header-title-page8">
            <span className="ex-A">A</span>
            <span className="number-of-q mr-2">1</span>
            Drag and drop the correct words to match the numbers.
          </h5>

          {/* ── Word Bank ── */}
          <div className="word-container">
            <div className="letters-section-horizontal">
              {shuffledLetters.map((word) => (
                <BankChip
                  key={word}
                  word={word}
                  isUsed={usedWords.has(word)}
                  locked={locked}
                />
              ))}
            </div>
          </div>

          {/* ── Drop zones ── */}
          <div className="exercise-layout-vertical">
            <div className="image-section-horizontal">
              {PAIRS.map((pair, index) => {
                const slotId = `drop-${index + 1}`;
                return (
                  <DropZone
                    key={slotId}
                    id={slotId}
                    index={index}
                    imgSrc={pair.img}
                    answer={dropped[slotId]}
                    isWrong={wrongDrops.includes(slotId)}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
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

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord ? (
          <div
            className="letter-box dragging"
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit10_Page5_Q1;
