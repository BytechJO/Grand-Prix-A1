import React, { useState, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import img1 from "../../../assets/U1 WB/U7/U7P39EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U7/U7P39EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U7/U7P39EXEA-03.svg";
import img4 from "../../../assets/U1 WB/U7/U7P39EXEA-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

// ─── Word chip في الـ word bank ───────────────────────────────────────────────
const WordChip = ({ id, text, isUsed, isDisabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || isDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 10px",
        border: "2px solid #2c5287",
        borderRadius: 8,
        background: "white",
        fontWeight: "bold",
        fontSize: 15,
        cursor: isUsed ? "not-allowed" : "grab",
        opacity: isUsed ? 0.35 : isDragging ? 0.5 : 1,
        userSelect: "none",
        transition: "opacity .2s",
        touchAction:"none",
        pointerEvents: isUsed ? "none" : undefined,
      }}
    >
      {text}
    </div>
  );
};

// ─── Drop Zone ────────────────────────────────────────────────────────────────
const DropZone = ({ id, value, isWrong, isLocked, onReturn }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? "drag-over-cell":""}`}
      onClick={() => !isLocked && value && onReturn()} // ← مش محتاج تمرر id هون
      title={value && !isLocked ? "اضغط لإرجاع الكلمة" : ""}
      style={{
        minWidth: "80%",
        minHeight: 28,
        borderBottom: `2px solid #333`,
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        fontSize: 18,
      
        borderRadius: "4px 4px 0 0",
        cursor: value && !isLocked ? "pointer" : "default",
        position: "relative",
        transition: "background .15s",
      }}
    >
      {value || ""}
      {isWrong && (
        <span  className="unit6-p1-q1-wrong-icon"
          style={{
            right: -18,
          
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit7_Page1_Q1 = () => {
  const words = [
    { id: "w0", text: "I am" },
    { id: "w1", text: "I am not" },
    { id: "w2", text: "you cold?" },
    { id: "w3", text: "Yes, I am" },
    { id: "w4", text: "Are you scared?" },
    { id: "w5", text: "Yes, I am" },
  ];

  const correctAnswers = {
    input1: "I am",
    input2: "I am not",
    input3: "you cold?",
    input4: "Yes, I am",
    input5: "Are you scared?",
    input6: "Yes, I am",
  };

  // answers: { inputX: wordId | null }
  const [answers, setAnswers] = useState({});
  const [wrongIds, setWrongIds] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // الكلمات المستخدمة
  const usedWordIds = new Set(Object.values(answers).filter(Boolean));

  const activeWord = words.find((w) => w.id === activeId);

  // ─── Drag End ───────────────────────────────────────────────────────────────
  // ─── Helper dz ───────────────────────────────────────────────────────────────
  const dz = (inputId) => (
    <DropZone
      id={`drop-${inputId}`} // ← الـ droppable id
      value={words.find((w) => w.id === answers[inputId])?.text || ""}
      isWrong={wrongIds.includes(inputId)}
      isLocked={locked}
      onReturn={() => returnToBank(inputId)} // ← هون بتمرر inputId مباشرة
    />
  );

  // ─── Drag End ────────────────────────────────────────────────────────────────
  const handleDragEnd = useCallback(
    ({ active, over }) => {
      setActiveId(null);
      if (!over || locked) return;

      const droppableId = over.id; // "drop-input1"
      const inputId = droppableId.replace("drop-", ""); // ← "input1" ✅
      const wordId = active.id;

      setAnswers((prev) => {
        const updated = { ...prev };

        // لو الكلمة كانت بـ drop zone ثاني → فرّغه
        const oldDrop = Object.keys(updated).find((k) => updated[k] === wordId);
        if (oldDrop) updated[oldDrop] = null;

        // لو الـ drop zone فيه كلمة ثانية → شيلها (ترجع للبنك)
        if (updated[inputId] && updated[inputId] !== wordId) {
          updated[inputId] = null;
        }

        updated[inputId] = wordId; // ← بتحفظ بـ "input1" ✅
        return updated;
      });

      setWrongIds([]);
    },
    [locked],
  );

  // ─── Return to bank (كليك على الإجابة) ──────────────────────────────────────
  const returnToBank = (dropId) => {
    if (locked) return;
    setAnswers((prev) => ({ ...prev, [dropId]: null }));
    setWrongIds([]);
  };

  // ─── Check ──────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;
    if (Object.values(answers).every((v) => !v)) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    Object.entries(correctAnswers).forEach(([inputId, correctText]) => {
      const wordId = answers[inputId];
      const word = words.find((w) => w.id === wordId);
      if (word && word.text.toLowerCase() === correctText.toLowerCase()) {
        correctCount++;
      } else {
        wrong.push(inputId);
      }
    });

    setWrongIds(wrong);
    setLocked(true);

    const total = Object.keys(correctAnswers).length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `<div style="font-size:20px;text-align:center"><span style="color:${color};font-weight:bold">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ─── Show Answers ────────────────────────────────────────────────────────────
  const showAnswers = () => {
    const filled = {};
    const wordPool = [...words];
    Object.entries(correctAnswers).forEach(([inputId, text]) => {
      const word = wordPool.find(
        (w) => w.text === text && !Object.values(filled).includes(w.id),
      );
      if (word) filled[inputId] = word.id;
    });
    setAnswers(filled);
    setWrongIds([]);
    setLocked(true);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 30,
        }}
      >
        <div className="div-forall" style={{ gap: 20 }}>
          <h4 className="header-title-page8">
            <span className="ex-A">A</span>Drag and drop.
          </h4>

          {/* ─── Word Bank ─── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              padding: 10,
              border: "2px dashed #ccc",
              borderRadius: 10,
              width: "100%",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {words.map((w) => (
              <WordChip
                key={w.id}
                id={w.id}
                text={w.text}
                isUsed={usedWordIds.has(w.id)}
                isDisabled={locked}
              />
            ))}
          </div>

          {/* ─── Sections ─── */}
          <div className="content-container-wb-unit6-p4-q2"  style={{width:"100%"}}>
            {/* Section 1 */}
            <div className="section-one-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                >
                  1
                </span>
                <img src={img1} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                <input
                  type="text"
                  value="Are you bored?"
                  readOnly
                  style={{
                    borderBottom: "2px solid black",
                    width: "100%",
                    fontSize: 20,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <input
                    type="text"
                    value="Yes,"
                    readOnly
                    style={{
                      borderBottom: "2px solid black",
                      width: "20%",
                      fontSize: 20,
                      pointerEvents: "none",
                    }}
                  />
                  {dz("input1")}
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="section-two-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                >
                  2
                </span>
                <img src={img2} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                <input
                  type="text"
                  value="Are you cold?"
                  readOnly
                  style={{
                    borderBottom: "2px solid black",
                    width: "100%",
                    fontSize: 20,
                    pointerEvents: "none",
                  }}
                />
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <input
                    type="text"
                    value="No,"
                    readOnly
                    style={{
                      borderBottom: "2px solid black",
                      width: "20%",
                      fontSize: 20,
                      pointerEvents: "none",
                    }}
                  />
                  {dz("input2")}
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="section-three-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                >
                  3
                </span>
                <img src={img3} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <input
                    type="text"
                    value="Are"
                    readOnly
                    style={{
                      borderBottom: "2px solid black",
                      width: "20%",
                      fontSize: 20,
                      pointerEvents: "none",
                    }}
                  />
                  {dz("input3")}
                </div>
                {dz("input4")}
              </div>
            </div>

            {/* Section 4 */}
            <div className="section-four-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                >
                  4
                </span>
                <img src={img4} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                {dz("input5")}
                {dz("input6")}
              </div>
            </div>
          </div>

          {/* ─── Actions ─── */}
          <div className="action-buttons-container">
            <button
              className="try-again-button"
              onClick={() => {
                setAnswers({});
                setWrongIds([]);
                setLocked(false);
              }}
            >
              Start Again ↻
            </button>
            <button
              className="show-answer-btn swal-continue"
              onClick={showAnswers}
            >
              Show Answer
            </button>
            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeWord && (
          <div
            style={{
              padding: "2px 10px",
              border: "2px solid #2c5287",
              borderRadius: 8,
              background: "white",
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: "0 4px 12px rgba(0,0,0,.2)",
              cursor: "grabbing",
            }}
          >
            {activeWord.text}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit7_Page1_Q1;
