import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit3_Page1_Q1.css";
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
const numbers = ["2", "4", "6"];
const colors = ["red", "blue", "green", "orange", "purple", "yellow"];

const correctMatches = [
  { word: "six",  image: "img1" },
  { word: "two",  image: "img3" },
  { word: "four", image: "img2" },
];
const correctNumbers = { img1: "6", img2: "4", img3: "2" };

const imgShapes = [
  {
    key: "img1",
    label: 1,
    count: 6,
    shape: (color, onDouble) => (
      <svg width="80" height="80">
        <rect x="10" y="10" width="60" height="60"
          fill={color} stroke="black" strokeWidth="2"
          onDoubleClick={onDouble} onTouchEnd={onDouble}
          style={{ cursor: "pointer" }} />
      </svg>
    ),
    containerClass: "square-container-wb-unit3-p1-q1",
  },
  {
    key: "img2",
    label: 2,
    count: 4,
    shape: (color, onDouble) => (
      <svg width="80" height="80">
        <polygon points="30,7 60,60 7,60"
          fill={color} stroke="black" strokeWidth="2"
          onDoubleClick={onDouble} onTouchEnd={onDouble}
          style={{ cursor: "pointer" }} />
      </svg>
    ),
    containerClass: "polygon-container-wb-unit3-p1-q1",
  },
  {
    key: "img3",
    label: 3,
    count: 2,
    shape: (color, onDouble) => (
      <svg width="80" height="80">
        <circle cx="40" cy="40" r="30"
          fill={color} stroke="black" strokeWidth="2"
          onDoubleClick={onDouble} onTouchEnd={onDouble}
          style={{ cursor: "pointer" }} />
      </svg>
    ),
    containerClass: "polygon-container-wb-unit3-p1-q1",
  },
];

const wordItems = [
  { word: "four", dotId: "bored-dot" },
  { word: "two",  dotId: "cold-dot" },
  { word: "six",  dotId: "scared-dot" },
];

// ─── BankNumber ───────────────────────────────────────────────────────────────
function BankNumber({ id, num, isUsed, disabled }) {
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
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        fontSize: "20px",
        cursor: isUsed || disabled ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.5 : 1,
        userSelect: "none",
        touchAction: "none",
        pointerEvents: isUsed ? "none" : "auto",
        ...(isUsed ? { borderColor: "#ccc", color: "#aaa" } : {}),
      }}
    >
      {num}
    </span>
  );
}

// ─── DroppableInput ───────────────────────────────────────────────────────────
function DroppableInput({ id, value, isWrong, showAnswer, locked, onClear }) {
  const { isOver, setNodeRef } = useDroppable({ id, disabled: locked });
  return (
    <div style={{ position: "relative" }}>
      <input
        ref={setNodeRef}
        className={`unscramble-input-wb-unit3-p1-q1 ${isOver ? "drag-over-cell" : ""}`}
        value={value}
        readOnly
        onClick={() => { if (value && !locked && !showAnswer) onClear(id); }}
        style={{
          background: isOver ? "#e3f2fd" : "white",
          cursor: value && !locked && !showAnswer ? "pointer" : "default",
        }}
      />
      {!showAnswer && isWrong && (
        <span className="error-mark-img-unit7-p6-q2">✕</span>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const WB_Unit3_Page1_Q1 = () => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const [wrongImages, setWrongImages] = useState([]);
  const [wrongNumbers, setWrongNumbers] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [numAnswers, setNumAnswers] = useState({ img1: "", img2: "", img3: "" });
  const [wordColors, setWordColors] = useState(["transparent", "transparent", "transparent"]);
  const [selectedWordIndex, setSelectedWordIndex] = useState(null);
  const [activeNum, setActiveNum] = useState(null);

  const usedNums = Object.values(numAnswers).filter((v) => v !== "");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  // ─── DnD ──────────────────────────────────────────────────────────────────
  const handleDragStart = (event) => {
    setActiveNum(event.active.id.replace("num-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveNum(null);
    const { active, over } = event;
    if (!over || locked || showAnswer) return;
    if (!over.id.startsWith("num-")) return;

    const value = active.id.replace("num-", "");
    const imgKey = over.id.replace("num-", "");

    setNumAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        if (updated[k] === value) updated[k] = "";
      });
      updated[imgKey] = value;
      return updated;
    });
    setWrongNumbers([]);
  };

  const handleClear = (cellId) => {
    const imgKey = cellId.replace("num-", "");
    setNumAnswers((prev) => ({ ...prev, [imgKey]: "" }));
    setWrongNumbers((prev) => prev.filter((k) => k !== imgKey));
  };

  // ─── Dot matching ──────────────────────────────────────────────────────────
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return;
    const image = e.target.dataset.image;
    if (lines.some((l) => l.image === image)) return;
    const rect = containerRef.current.getBoundingClientRect();
    const r = e.target.getBoundingClientRect();
    setFirstDot({ image, x: r.left - rect.left + 8, y: r.top - rect.top + 8 });
  };

  const handleEndDotClick = (e) => {
    if (showAnswer || locked || !firstDot) return;
    const rect = containerRef.current.getBoundingClientRect();
    const r = e.target.getBoundingClientRect();
    setLines((prev) => [
      ...prev,
      {
        x1: firstDot.x, y1: firstDot.y,
        x2: r.left - rect.left + 8,
        y2: r.top - rect.top + 8,
        word: e.target.dataset.word,
        image: firstDot.image,
      },
    ]);
    setFirstDot(null);
  };

  // ─── Color palette ─────────────────────────────────────────────────────────
  const applyColor = (color) => {
    const updated = [...wordColors];
    updated[selectedWordIndex] = color;
    setWordColors(updated);
    setSelectedWordIndex(null);
  };

  // ─── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers2 = () => {
    if (showAnswer || locked) return;
    if (lines.length < correctMatches.length) {
      ValidationAlert.info("Oops!", "Please connect all the pairs before checking.");
      return;
    }
    if (Object.values(numAnswers).some((v) => v.trim() === "")) {
      ValidationAlert.info("Oops!", "Please write all the numbers before checking.");
      return;
    }

    let correctNums = 0, correctLines = 0;
    let wrongNums = [], wrongImgs = [];

    Object.keys(correctNumbers).forEach((img) => {
      if (numAnswers[img] === correctNumbers[img]) correctNums++;
      else wrongNums.push(img);
    });

    lines.forEach((line) => {
      const ok = correctMatches.some((p) => p.word === line.word && p.image === line.image);
      if (ok) correctLines++;
      else if (!wrongImgs.includes(line.image)) wrongImgs.push(line.image);
    });

    const total = correctMatches.length * 2;
    const score = correctNums + correctLines;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span>
      </div>
    `;

    setWrongImages(wrongImgs);
    setWrongNumbers(wrongNums);
    setLocked(true);
    if (score === total) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    const rect = containerRef.current.getBoundingClientRect();
    const getPos = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - rect.left + 8, y: r.top - rect.top + 8 };
    };
    const finalLines = correctMatches.map((m) => ({
      ...m,
      x1: getPos(`[data-word="${m.word}"]`).x,
      y1: getPos(`[data-word="${m.word}"]`).y,
      x2: getPos(`[data-image="${m.image}"]`).x,
      y2: getPos(`[data-image="${m.image}"]`).y,
    }));
    setLines(finalLines);
    setWrongImages([]);
    setShowAnswer(true);
    setLocked(true);
    setNumAnswers(correctNumbers);
    setWordColors(["red", "red", "red"]);
  };

  const handleReset = () => {
    setLines([]);
    setWrongImages([]);
    setWrongNumbers([]);
    setShowAnswer(false);
    setLocked(false);
    setFirstDot(null);
    setSelectedWordIndex(null);
    setNumAnswers({ img1: "", img2: "", img3: "" });
    setWordColors(["transparent", "transparent", "transparent"]);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "30px" }}>
        <div className="div-forall" style={{ gap: "0px" }}>

          <div className="w-full flex flex-col gap-2">
            <h5 className="header-title-page8">
              <span className="ex-A">A</span>Color, count, and match.
            </h5>
            <span style={{ fontSize: "14px", color: "gray" }}>Hint: Double Click to Color Word</span>
          </div>

          {/* Color Palette */}
          {selectedWordIndex !== null && (
            <div className="color-palette-wb-u1-p7-q1">
              {colors.map((c) => (
                <div key={c} className="color-circle" style={{ backgroundColor: c }} onClick={() => applyColor(c)} />
              ))}
              <div className="color-circle erase" onClick={() => {
                const updated = [...wordColors];
                updated[selectedWordIndex] = "transparent";
                setWordColors(updated);
                setSelectedWordIndex(null);
              }}>✕</div>
            </div>
          )}

          {/* Number Bank */}
          <div style={{ display: "flex", gap: "10px", padding: "10px", border: "2px dashed #ccc", borderRadius: "10px", alignItems: "center", width: "100%", justifyContent: "center" }}>
            {numbers.map((num) => (
              <BankNumber
                key={num}
                id={`num-${num}`}
                num={num}
                isUsed={usedNums.includes(num)}
                disabled={locked}
              />
            ))}
          </div>

          <div className="match-wrapper2-wb-unit3-p1-q1" ref={containerRef} style={{ margin: "0px" }}>

            {/* Images Row */}
            <div className="match-images-row2-wb-unit3-p1-q1">
              {imgShapes.map((item, idx) => (
                <div key={item.key} className={`img-box2-wb-unit3-p1-q1 ${locked || showAnswer ? "disabled-hover" : ""}`}>
                  <div style={idx === 2 ? { display: "flex", flexDirection: "column", justifyContent: "space-between", height: "90%" } : {}}>
                    <span style={{ color: "darkblue", fontWeight: "700" }}>{item.label}</span>
                    <div
                      className={`${item.containerClass} ${locked || showAnswer ? "disabled-hover" : ""}`}
                      onClick={() => document.getElementById(`${item.key}-dot`).click()}
                    >
                      {Array(item.count).fill(null).map((_, i) => (
                        <React.Fragment key={i}>
                          {item.shape(wordColors[idx], () => setSelectedWordIndex(idx))}
                        </React.Fragment>
                      ))}
                    </div>
                    {wrongImages.includes(item.key) && (
                      <span className="error-mark-img-unit7-p6-q2">✕</span>
                    )}
                    <DroppableInput
                      id={`num-${item.key}`}
                      value={numAnswers[item.key]}
                      isWrong={wrongNumbers.includes(item.key)}
                      showAnswer={showAnswer}
                      locked={locked}
                      onClear={handleClear}
                    />
                  </div>
                  <div
                    className="dot22-unit7-p6-q2 start-dot22-wb-unit3-p1-q1"
                    data-image={item.key}
                    id={`${item.key}-dot`}
                    onClick={handleStartDotClick}
                  />
                </div>
              ))}
            </div>

            {/* Words Row */}
            <div className="match-words-row2">
              {wordItems.map((item) => (
                <div key={item.word} className="word-box2" style={{ display: "flex", gap: "10px", flexDirection: "row", alignItems: "flex-start" }}>
                  <div>
                    <h5
                      className={`h5-wb-unit3-p1-q1 ${locked || showAnswer ? "disabled-word" : ""}`}
                      onClick={() => document.getElementById(item.dotId).click()}
                    >
                      {item.word}
                    </h5>
                    <div
                      className="dot22-unit7-p6-q2 end-dot22-unit7-p6-q2"
                      data-word={item.word}
                      id={item.dotId}
                      onClick={handleEndDotClick}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Lines */}
            <svg className="lines-layer2">
              {lines.map((l, i) => (
                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="red" strokeWidth="3" />
              ))}
            </svg>
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={handleReset} className="try-again-button">Start Again ↻</button>
          <button onClick={handleShowAnswer} className="show-answer-btn swal-continue">Show Answer</button>
          <button onClick={checkAnswers2} className="check-button2">Check Answer ✓</button>
        </div>
      </div>

      <DragOverlay>
        {activeNum && (
          <span style={{ padding: "7px 14px", border: "2px solid #2c5287", borderRadius: "8px", background: "white", fontWeight: "bold", fontSize: "20px", cursor: "grabbing", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            {activeNum}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit3_Page1_Q1;