import React, { useState } from "react";
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
import "./WB_Unit4_Page4_Q1.css";

const WORDS = ["triangle", "circle", "square", "rectangle"];

const BASIC_COLORS = ["#ff0000", "#0000ff", "#ffff00", "#00aa00", "#ffa200ff"];

const emptyLabels = () => ({
  triangle: "",
  circle1: "",
  circle2: "",
  house: "",
  door: "",
});

const emptyColors = () => ({
  triangle: "#ffffff",
  circle1: "#ffffff",
  circle2: "#ffffff",
  house: "#ffffff",
  door: "#ffffff",
});

// ─── Wrong Icon ───────────────────────────────────────────────────
const WrongIcon = () => (
  <div
    style={{
      position: "absolute",
      top: -12,
      right: -12,
      width: 22,
      height: 22,
      borderRadius: "50%",
      backgroundColor: "red",
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    }}
  >
    ✕
  </div>
);

// ─── Draggable Word ───────────────────────────────────────────────
const DraggableWord = ({ word, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
    disabled: locked || isUsed,
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
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        cursor: locked || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.45 : 1,
        touchAction: "none",
        transition: "all 0.2s ease",
        color: isUsed ? "#999" : "inherit",
        userSelect: "none",
      }}
    >
      {word}
    </div>
  );
};

// ─── Droppable Label Box ──────────────────────────────────────────
const DroppableLabelBox = ({
  shapeKey,
  label,
  checked,
  isCorrectVal,
  locked,
  onRemove,
  style,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `shape-${shapeKey}`,
    disabled: locked,
  });

  return (
    <div
      ref={setNodeRef}
      className={`drop-label-box ${isOver ? "drag-over-cell" : ""}`}
      onClick={() => !locked && label && onRemove(shapeKey)}
      style={{
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed #999",
        borderRadius: 6,
        position: "relative",
        backgroundColor: isOver ? "#e3f2fd" : "#fff",
        transform: isOver ? "scale(1.05)" : "scale(1)",
        transition: "all 0.2s ease",
        cursor: !locked && label ? "pointer" : "default",
        ...style,
      }}
      title={!locked && label ? "Click to remove" : ""}
    >
      {label && <span>{label}</span>}
      {checked && label && isCorrectVal === false && <WrongIcon />}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────
const WB_Unit4_Page4_Q1 = () => {
  const [labels, setLabels] = useState(emptyLabels());
  const [colors, setColors] = useState(emptyColors());
  const [checked, setChecked] = useState(false);
  const [activeShape, setActiveShape] = useState(null);
  const [showPalette, setShowPalette] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // الكلمات المستخدمة
  const usedWords = Object.values(labels).filter(Boolean);

  // ─── isCorrect ───────────────────────────────────────────────
  const isCorrect = (shape) => {
    if (!checked) return null;
    switch (shape) {
      case "triangle":
        return labels.triangle === "triangle";
      case "circle1":
      case "circle2":
        return labels[shape] === "circle";
      case "house":
      case "door":
        return ["square", "rectangle"].includes(labels[shape]);
      default:
        return null;
    }
  };

  // ─── Drag Handlers ───────────────────────────────────────────
  const handleDragStart = (event) => {
    setActiveWord(event.active.id.replace("word-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (checked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("shape-")) return;

    const shapeKey = over.id.replace("shape-", "");
    const word = active.id.replace("word-", "");

    setLabels((prev) => ({ ...prev, [shapeKey]: word }));
    // ملاحظة: هاي الكومبوننت بتسمح بنفس الكلمة على أكثر من شكل
    // (circle بتنحط على circle1 و circle2) — فما منمنع التكرار هون
  };

  // ─── Remove label on click ───────────────────────────────────
  const handleRemove = (shapeKey) => {
    setLabels((prev) => ({ ...prev, [shapeKey]: "" }));
  };

  // ─── Color ───────────────────────────────────────────────────
  const openColorPicker = (shape) => {
    if (checked) return;
    setActiveShape(shape);
    setShowPalette(true);
  };

  const selectColor = (color) => {
    setColors((prev) => ({ ...prev, [activeShape]: color }));
    setShowPalette(false);
    setActiveShape(null);
  };

  // ─── Check ───────────────────────────────────────────────────
  const checkAnswer = () => {
    if (checked) return;

    const allFilled = Object.values(labels).every((v) => v);
    if (!allFilled) {
      ValidationAlert.info("Please label all the shapes.");
      return;
    }

    let score = 0;
    if (labels.triangle === "triangle") score++;
    if (labels.circle1 === "circle") score++;
    if (labels.circle2 === "circle") score++;
    if (["square", "rectangle"].includes(labels.house)) score++;
    if (["square", "rectangle"].includes(labels.door)) score++;

    setChecked(true);

    const total = 5;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">Score: ${score} / ${total}</span>
      </div>
    `);
  };

  // ─── Show Answer ─────────────────────────────────────────────
  const showAnswers = () => {
    setLabels({
      triangle: "triangle",
      circle1: "circle",
      circle2: "circle",
      house: "square",
      door: "square",
    });
    setColors({
      triangle: "blue",
      circle1: "red",
      circle2: "red",
      house: "#ffff00",
      door: "green",
    });
    setChecked(true);
  };

  // ─── Reset ───────────────────────────────────────────────────
  const reset = () => {
    setLabels(emptyLabels());
    setColors(emptyColors());
    setChecked(false);
    setShowPalette(false);
    setActiveShape(null);
  };

  // ─── Shared drop box style ────────────────────────────────────
  const boxStyle = { height: 30, width: "100%" };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          padding: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="div-forall" style={{ gap: "20px" }}>
          <div className="w-full">
            <h5 className="header-title-page8">
              <span className="ex-A">G</span> Drag and color the house
            </h5>
            <span style={{ fontSize: "14px", color: "gray" }}>
              Hint: Double Click to Color Word
            </span>
          </div>

          {/* ─── Word Bank ─── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {WORDS.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                locked={checked}
                // circle بتنحط على مكانين فما نعملها disabled لو استُخدمت مرة
                isUsed={false}
              />
            ))}
          </div>

          {/* ─── SVG + Drop Zones ─── */}
          <div
            style={{
              position: "relative",
              width: 300,
              height: 350,
              left: "20vw",
            }}
          >
            <svg
              width="300"
              height="350"
              className="all-svg-house-wb-unit4-p4-q1"
            >
              <polygon
                points="150,20 50,120 250,120"
                fill={colors.triangle}
                stroke="black"
                onDoubleClick={() => openColorPicker("triangle")}
                onTouchEnd={() => openColorPicker("triangle")}
              />
              <rect
                x="50"
                y="120"
                width="200"
                height="180"
                fill={colors.house}
                stroke="black"
                onDoubleClick={() => openColorPicker("house")}
                onTouchEnd={() => openColorPicker("house")}
              />
              <circle
                cx="100"
                cy="170"
                r="30"
                fill={colors.circle1}
                stroke="black"
                onDoubleClick={() => openColorPicker("circle1")}
                onTouchEnd={() => openColorPicker("circle1")}
              />
              <circle
                cx="200"
                cy="170"
                r="30"
                fill={colors.circle2}
                stroke="black"
                onDoubleClick={() => openColorPicker("circle2")}
                onTouchEnd={() => openColorPicker("circle2")}
              />
              <rect
                x="110"
                y="230"
                width="70"
                height="70"
                fill={colors.door}
                stroke="black"
                onDoubleClick={() => openColorPicker("door")}
                onTouchEnd={() => openColorPicker("door")}
              />
            </svg>

            {/* Triangle label */}
            <div
              style={{ position: "absolute", top: 120, left: 90, width: 120 }}
            >
              <DroppableLabelBox
                shapeKey="triangle"
                label={labels.triangle}
                checked={checked}
                isCorrectVal={isCorrect("triangle")}
                locked={checked}
                onRemove={handleRemove}
                style={boxStyle}
              />
            </div>

            {/* House label */}
            <div
              style={{ position: "absolute", top: 305, left: 90, width: 120 }}
            >
              <DroppableLabelBox
                shapeKey="house"
                label={labels.house}
                checked={checked}
                isCorrectVal={isCorrect("house")}
                locked={checked}
                onRemove={handleRemove}
                style={boxStyle}
              />
            </div>

            {/* Circle1 label */}
            <div
              style={{ position: "absolute", top: 240, left: 185, width: 80 }}
            >
              <DroppableLabelBox
                shapeKey="circle1"
                label={labels.circle1}
                checked={checked}
                isCorrectVal={isCorrect("circle1")}
                locked={checked}
                onRemove={handleRemove}
                style={boxStyle}
              />
            </div>

            {/* Circle2 label */}
            <div
              style={{ position: "absolute", top: 240, left: 35, width: 80 }}
            >
              <DroppableLabelBox
                shapeKey="circle2"
                label={labels.circle2}
                checked={checked}
                isCorrectVal={isCorrect("circle2")}
                locked={checked}
                onRemove={handleRemove}
                style={boxStyle}
              />
            </div>

            {/* Door label */}
            <div
              style={{
                position: "absolute",
                bottom: -60,
                left: 92,
                width: 100,
              }}
            >
              <DroppableLabelBox
                shapeKey="door"
                label={labels.door}
                checked={checked}
                isCorrectVal={isCorrect("door")}
                locked={checked}
                onRemove={handleRemove}
                style={boxStyle}
              />
            </div>
          </div>

          {/* ─── Color Palette ─── */}
          {showPalette && (
            <div className="color-palette-wb-u1-p7-q1">
              {BASIC_COLORS.map((c) => (
                <div
                  key={c}
                  className="color-circle"
                  style={{ backgroundColor: c }}
                  onClick={() => selectColor(c)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button className="show-answer-btn" onClick={showAnswers}>
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswer}>
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeWord && (
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
            {activeWord}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit4_Page4_Q1;
