import React, { useState } from "react";
import "./Unit5_Page6_Q1.css";
import img1 from "../../../assets/unit5/imgs/U5P45EXED-01.svg";
import img2 from "../../../assets/unit5/imgs/U5P45EXED-02.svg";
import img3 from "../../../assets/unit5/imgs/U5P45EXED-03.svg";
import img4 from "../../../assets/unit5/imgs/U5P45EXED-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

// ─── Draggable Word (Word Bank) ────────────────────────────────────────────────
const DraggableWord = ({ id, word, disabled, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isUsed,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: `2px solid ${isUsed ? "#aab3c4" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#f0f2f5" : "white",
        fontWeight: "bold",
        cursor: disabled || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.45 : 1,
        color: isUsed ? "#9aa3b0" : "inherit",
        display: "inline-block",
        transition: "all 0.2s ease",
        userSelect: "none",
      }}
    >
      {word}
    </span>
  );
};

// ─── Droppable Slot ────────────────────────────────────────────────────────────
const DropSlot = ({ slotId, value, isWrong, showAnswer, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: slotId });

  return (
    <div
      ref={setNodeRef}
      className={`answer-input-unit5-p6-q1 ${isOver ? "drag-over-cell" : ""}`}
    >
      {value && (
        <span
          onClick={!showAnswer ? onRemove : undefined}
          style={{
            cursor: showAnswer ? "default" : "pointer",
            userSelect: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "3px",
          }}
          title={showAnswer ? "" : "Click to remove"}
        >
          {value}
        </span>
      )}
      {isWrong && <span className="error-mark-input1-unit5-p6-q1 ">✕</span>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Unit5_Page6_Q1 = () => {
  const correctMatches = [
    { input: "book", num: "input1" },
    { input: "this", num: "input2" },
    { input: "this is a", num: "input3" },
    { input: "no, it isn't", num: "input4" },
    { input: "is this a", num: "input5" },
    { input: "it is", num: "input6" },
  ];

  const [answers, setAnswers] = useState([]); // [{ input, num }]
  const [wrongWords, setWrongWords] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // Helper: get value for a slot
  const getValue = (slotId) =>
    answers.find((a) => a.num === slotId)?.input || "";

  // Words currently placed in any slot
  const usedWords = new Set(answers.map((a) => a.input));

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveWord(active.id.replace("word-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || showAnswer) return;

    const value = active.id.replace("word-", "");
    const slotId = over.id;

    if (!slotId.startsWith("input")) return;

    setAnswers((prev) => {
      const updated = prev.filter((a) => a.input !== value); // remove from old slot
      const existingIdx = updated.findIndex((a) => a.num === slotId);
      if (existingIdx !== -1)
        updated[existingIdx] = { input: value, num: slotId };
      else updated.push({ input: value, num: slotId });
      return updated;
    });

    setWrongWords([]);
  };

  const onDragCancel = () => setActiveWord(null);

  // Click on placed word → return to bank
  const removeAnswer = (slotId) => {
    if (showAnswer) return;
    setAnswers((prev) => prev.filter((a) => a.num !== slotId));
    setWrongWords([]);
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer) return;

    if (answers.length === 0) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let correctCount = 0;
    let wrong = [];

    correctMatches.forEach((correct) => {
      const userAnswer = answers.find((a) => a.num === correct.num);
      if (
        userAnswer &&
        userAnswer.input.toLowerCase() === correct.input.toLowerCase()
      ) {
        correctCount++;
      } else {
        wrong.push(correct.num);
      }
    });

    setWrongWords(wrong);
    setShowAnswer(true);

    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    ValidationAlert[
      correctCount === total
        ? "success"
        : correctCount === 0
          ? "error"
          : "warning"
    ](`
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `);
  };

  const handleShowAnswer = () => {
    setAnswers(
      correctMatches.map((item) => ({ input: item.input, num: item.num })),
    );
    setWrongWords([]);
    setShowAnswer(true);
  };

  const reset = () => {
    setAnswers([]);
    setWrongWords([]);
    setShowAnswer(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
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
        <div
          className="div-forall"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "60px",
          
            justifyContent: "flex-start",
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A">D</span> Look, read, and drag the words to
            complete the sentence.
          </h5>

          {/* ── Word Bank ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              width: "100%",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {correctMatches.map((item) => (
              <DraggableWord
                key={item.input}
                id={`word-${item.input}`}
                word={item.input}
                disabled={showAnswer}
                isUsed={usedWords.has(item.input)}
              />
            ))}
          </div>

          {/* ── Questions ──────────────────────────────────────────────────── */}
          <div className="content-container-unit5-p6-q1 w-full">
            {/* Section 1 */}
            <div className="section-one-unit5-p6-q1">
              <span className="Unit5-P6-Q3-text" style={{ color: "darkblue" }}>
                1
              </span>
              <img src={img1} className="img-unit5-p6-q1" alt="" />
              <div
                className="content-input-unit5-p6-q1"
                style={{ fontSize: "18px" }}
              >
                <input
                  type="text"
                  value="What's this?"
                  readOnly
                  style={{ pointerEvents: "none" }}
                />
                <div style={{ display: "flex" }}>
                  <input
                    type="text"
                    value="This is a"
                    readOnly
                    style={{ pointerEvents: "none", width: "77px" }}
                  />
                  <div style={{ position: "relative" }}>
                    <DropSlot
                      slotId="input1"
                      value={getValue("input1")}
                      isWrong={wrongWords.includes("input1")}
                      showAnswer={showAnswer}
                      onRemove={() => removeAnswer("input1")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="section-two-unit5-p6-q1">
              <span className="Unit5-P6-Q3-text" style={{ color: "darkblue" }}>
                2
              </span>
              <img src={img2} className="img-unit5-p6-q1" alt="" />
              <div
                className="content-input-unit5-p6-q1"
                style={{ fontSize: "18px" }}
              >
                <div style={{ position: "relative", display: "flex" }}>
                  <input
                    type="text"
                    value="What's"
                    readOnly
                    style={{ pointerEvents: "none", width: "70px" }}
                  />
                  <DropSlot
                    slotId="input2"
                    value={getValue("input2")}
                    isWrong={wrongWords.includes("input2")}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer("input2")}
                  />
                  ?
                </div>
                <div style={{ position: "relative", display: "flex" }}>
                  <DropSlot
                    slotId="input3"
                    value={getValue("input3")}
                    isWrong={wrongWords.includes("input3")}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer("input3")}
                  />
                  <input
                    type="text"
                    value="global"
                    readOnly
                    style={{ pointerEvents: "none", width: "70px" }}
                  />
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="section-three-unit5-p6-q1">
              <span className="Unit5-P6-Q3-text" style={{ color: "darkblue" }}>
                3
              </span>
              <img src={img3} className="img-unit5-p6-q1" alt="" />
              <div
                className="content-input-unit5-p6-q1"
                style={{ fontSize: "18px" }}
              >
                <input
                  type="text"
                  value="Is this a pencil?"
                  readOnly
                  style={{ pointerEvents: "none" }}
                />
                <div style={{ position: "relative" }}>
                  <DropSlot
                    slotId="input4"
                    value={getValue("input4")}
                    isWrong={wrongWords.includes("input4")}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer("input4")}
                  />
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="section-four-unit5-p6-q1">
              <span className="Unit5-P6-Q3-text" style={{ color: "darkblue" }}>
                4
              </span>
              <img src={img4} className="img-unit5-p6-q1" alt="" />
              <div
                className="content-input-unit5-p6-q1"
                style={{ fontSize: "18px" }}
              >
                <div style={{ position: "relative", display: "flex" }}>
                  <DropSlot
                    slotId="input5"
                    value={getValue("input5")}
                    isWrong={wrongWords.includes("input5")}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer("input5")}
                  />
                  <input
                    type="text"
                    value="ruler?"
                    readOnly
                    style={{ pointerEvents: "none" }}
                  />
                </div>
                <div style={{ position: "relative", display: "flex" }}>
                  <input
                    type="text"
                    value="Yes,"
                    readOnly
                    style={{ pointerEvents: "none", width: "70px" }}
                  />
                  <DropSlot
                    slotId="input6"
                    value={getValue("input6")}
                    isWrong={wrongWords.includes("input6")}
                    showAnswer={showAnswer}
                    onRemove={() => removeAnswer("input6")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Buttons ──────────────────────────────────────────────────────── */}
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
      </div>

      {/* ── Drag Overlay ─────────────────────────────────────────────────────── */}
      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "#fff",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(0,0,0,.2)",
              display: "inline-block",
            }}
          >
            {activeWord}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Unit5_Page6_Q1;
