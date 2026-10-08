import React, { useState } from "react";
import conversation from "../../../assets/unit7/img/U7P63EXEF-01.svg";
import conversation2 from "../../../assets/unit7/img/U7P63EXEF-02.svg";
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

const questions = [
  { id: 1, img: conversation2, question: "What shape is it?", type: "full" },
  { id: 2, img: conversation,  question: "What shape is it?", type: "full" },
  { id: 3, img: conversation,  question: "What shape is it?", type: "full" },
];

const correctAnswers = {
  q1: "It is a square.",
  q2: "It is a triangle",
  q3: "It is a circle",
};

const wordBank = Object.values(correctAnswers).map((word, i) => ({
  word,
  id: `bank-${i}`,
}));

// ─── Draggable Word ───────────────────────────────────────────────
const DraggableWord = ({ id, word, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
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

// ─── Droppable Input ──────────────────────────────────────────────
const DroppableInput = ({ droppableId, value, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    disabled: locked,
  });

  return (
    <span ref={setNodeRef}>
      <input
        type="text"
        value={value?.word || ""}
        readOnly
        disabled={locked}
        className={`answer-input-wb-unit4-p2-q1 ${isOver ? "drag-over-cell" : ""}`}
        onClick={() => !locked && value && onRemove(droppableId)}
        style={{
          background: isOver ? "#e3f2fd" : "",
          cursor: !locked && value ? "pointer" : "default",
        }}
        title={!locked && value ? "Click to remove" : ""}
      />
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────
const WB_Unit4_Page2_Q1 = () => {
  const emptyAnswers = () => ({ q1: null, q2: null, q3: null });

  const [answers, setAnswers]       = useState(emptyAnswers());
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked]         = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const [shapeColors, setShapeColors] = useState({ 1: "#ffffff", 2: "#ffffff", 3: "#ffffff" });
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [showPalette, setShowPalette]     = useState(false);
  const [activeShape, setActiveShape]     = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // usedIds بالـ bankId مش الكلمة
  const usedIds = Object.values(answers).filter(Boolean).map((a) => a.bankId);

  // ─── Drag Handlers ───────────────────────────────────────────
  const handleDragStart = (event) => {
    const item = wordBank.find((b) => b.id === event.active.id);
    setActiveWord(item?.word ?? null);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("blank-")) return;

    const bankItem = wordBank.find((b) => b.id === active.id);
    if (!bankItem) return;

    const qKey = over.id.replace("blank-", ""); // "q1" / "q2" / "q3"

    setAnswers((prev) => {
      // منع نفس الـ bankId يُستخدم مرتين
      const alreadyUsed = Object.values(prev).some((a) => a?.bankId === bankItem.id);
      if (alreadyUsed) return prev;

      return { ...prev, [qKey]: { word: bankItem.word, bankId: bankItem.id } };
    });

    setWrongInputs([]);
  };

  const handleRemove = (droppableId) => {
    const qKey = droppableId.replace("blank-", "");
    setAnswers((prev) => ({ ...prev, [qKey]: null }));
    setWrongInputs([]);
  };

  // ─── Check ───────────────────────────────────────────────────
  const handleCheck = () => {
    if (locked) return;

    const keys = ["q1", "q2", "q3"];

    if (keys.some((k) => !answers[k])) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let wrong = [];
    let score = 0;

    keys.forEach((k, i) => {
      const correct = answers[k]?.word?.trim().toLowerCase() === correctAnswers[k].toLowerCase();
      if (correct) {
        score++;
      } else {
        wrong.push(questions[i].id);
      }
    });

    setWrongInputs(wrong);
    setLocked(true);

    const total = keys.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold">Score: ${score}/${total}</span>
      </div>
    `;

    score === total
      ? ValidationAlert.success(msg)
      : score === 0
      ? ValidationAlert.error(msg)
      : ValidationAlert.warning(msg);
  };

  // ─── Show Answer ─────────────────────────────────────────────
  const handleShowAnswer = () => {
    const usedBankIds = new Set();
    const filled = {};

    ["q1", "q2", "q3"].forEach((k) => {
      const bankItem = wordBank.find(
        (b) => b.word === correctAnswers[k] && !usedBankIds.has(b.id)
      );
      if (bankItem) {
        usedBankIds.add(bankItem.id);
        filled[k] = { word: bankItem.word, bankId: bankItem.id };
      } else {
        filled[k] = null;
      }
    });

    setAnswers(filled);
    setWrongInputs([]);
    setLocked(true);
    setShapeColors({ 1: "red", 2: "red", 3: "red" });
  };

  // ─── Reset ───────────────────────────────────────────────────
  const handleReset = () => {
    setAnswers(emptyAnswers());
    setWrongInputs([]);
    setLocked(false);
    setShowPalette(false);
    setActiveShape(null);
    setShapeColors({ 1: "#ffffff", 2: "#ffffff", 3: "#ffffff" });
  };

  // ─── Shape SVGs ──────────────────────────────────────────────
  const openPalette = (shapeId) => {
    setActiveShape(shapeId);
    setShowPalette(true);
  };

  const renderShape = (id) => {
    const props = {
      width: 120,
      height: 120,
      onDoubleClick: () => openPalette(id),
      onTouchStart: () => openPalette(id),
    };
    const fill   = shapeColors[id];
    const stroke = "#999";
    const sw     = 4;

    if (id === 1) return <svg {...props}><rect x="10" y="10" width="100" height="100" fill={fill} stroke={stroke} strokeWidth={sw} /></svg>;
    if (id === 2) return <svg {...props}><polygon points="60,10 110,110 10,110" fill={fill} stroke={stroke} strokeWidth={sw} /></svg>;
    if (id === 3) return <svg {...props}><circle cx="60" cy="60" r="50" fill={fill} stroke={stroke} strokeWidth={sw} /></svg>;
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

        <div className="div-forall" style={{gap:"20px"}}>
          <div className="w-full">
          <h5 className="header-title-page8" id="ex-d">
            <span className="ex-A">C</span>Drag and color the shapes.
          </h5>
          <span style={{ fontSize: "14px", color: "gray" }}>
            Hint: Double Click to Color Word
          </span>
</div>
          {/* ─── Color Palette ─── */}
          {showPalette && (
            <div
              className="color-pallet-wb-unit4-p2-q1"
              style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
            >
              {["#ff0000", "#0000ff", "#ffff00", "#00aa00", "#ff9900"].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    if (activeShape) {
                      setShapeColors((prev) => ({ ...prev, [activeShape]: c }));
                    }
                    setSelectedColor(c);
                    setShowPalette(false);
                    setActiveShape(null);
                  }}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: c,
                    border: selectedColor === c ? "3px solid black" : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          )}

          {/* ─── Word Bank ─── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {wordBank.map(({ id, word }) => (
              <DraggableWord
                key={id}
                id={id}
                word={word}
                locked={locked}
                isUsed={usedIds.includes(id)}
              />
            ))}
          </div>

          {/* ─── Questions ─── */}
          <div style={{ width: "100%" }}>
            {questions.map((q, index) => (
              <div key={q.id} className="question-row-unit7-p2-q3">
                <div className="question-container-unit7-p6-q3" style={{ gap: "20px" }}>
                  <span className="num2">{index + 1}</span>
                  <div className="shape-wrapper">{renderShape(q.id)}</div>
                  <p className="question-text-wb-unit4-p2-q1">{q.question}</p>
                </div>

                <div className="sentence-box-wb-unit4-p2-q1">
                  <DroppableInput
                    droppableId={`blank-q${q.id}`}
                    value={answers[`q${q.id}`]}
                    locked={locked}
                    onRemove={handleRemove}
                  />
                  {wrongInputs.includes(q.id) && (
                    <span className="wrong-mark">✕</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button onClick={handleReset} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button onClick={handleCheck} className="check-button2">
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

export default WB_Unit4_Page2_Q1;