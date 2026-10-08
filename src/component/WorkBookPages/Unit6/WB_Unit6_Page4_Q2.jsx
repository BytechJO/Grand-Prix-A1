import React, { useState } from "react";
import img1 from "../../../assets/U1 WB/U6/U6P36EXEH-01.svg";
import img2 from "../../../assets/U1 WB/U6/U6P36EXEH-02.svg";
import img3 from "../../../assets/U1 WB/U6/U6P36EXEH-03.svg";
import img4 from "../../../assets/U1 WB/U6/U6P36EXEH-04.svg";
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

/* ================= DATA ================= */

const wordBank = [
  "she can",
  "she fly a kite",
  "can't",
  "No, he can't",
  "Can he ride a bike",
  "Can he sail a boat",
];

const correctMatches = [
  { input: "can't", num: "input1" },
  { input: "she fly a kite", num: "input2" },
  { input: "she can", num: "input3" },
  { input: "Can he sail a boat", num: "input4" },
  { input: "No, he can't", num: "input5" },
  { input: "Can he ride a bike", num: "input6" },
  { input: "No, he can't", num: "input7" },
];

/* ================= DraggableWord ================= */

const DraggableWord = ({ text, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${text}`,
    disabled: locked || isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
        border: `2px solid ${isUsed ? "#aaa" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: isUsed ? "#999" : "inherit",
        cursor: locked || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.3 : 1,
        touchAction: "none",
        userSelect: "none",
        transition: "all 0.2s",
      }}
    >
      {text}
    </div>
  );
};

/* ================= DroppableInput ================= */

const DroppableInput = ({ inputId, answers, wrongWords, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${inputId}`,
    disabled: locked,
  });

  const value = answers.find((a) => a.num === inputId)?.input || "";

  return (
    <div
      ref={setNodeRef}
      className={`answer-input-wb-unit6-p4-q2 ${isOver ? "drag-over-cell" : ""}`}
      onClick={() => !locked && value && onRemove(inputId)}
      style={{
        background: isOver ? "#e3f2fd" : "",
        cursor: !locked && value ? "pointer" : "default",
        transition: "background 0.15s ease",
        position: "relative",
      }}
      title={!locked && value ? "Click to remove" : ""}
    >
      {value}
      {wrongWords.includes(inputId) && (
        <span className="error-mark-input1">✕</span>
      )}
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const WB_Unit6_Page4_Q2 = () => {
  const [answers, setAnswers] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // الكلمات المستخدمة — "No, he can't" ممكن تتكرر في input5 و input7
  // فبنشوف إذا الكلمة مستخدمة بكل أماكنها الممكنة
  const usedWords = answers.map((a) => a.input);
  const isWordUsed = (text) => {
    // احسب كم مرة الكلمة مطلوبة بالإجابات الصحيحة
    const requiredCount = correctMatches.filter((c) => c.input === text).length;
    // احسب كم مرة الكلمة موجودة عند الطالب
    const usedCount = usedWords.filter((w) => w === text).length;
    return usedCount >= requiredCount;
  };

  /* ─── Drag Handlers ─── */

  const handleDragStart = (event) => {
    setActiveWord(event.active.id.replace("word-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("drop-")) return;

    const text = active.id.replace("word-", "");
    const inputId = over.id.replace("drop-", "");

    setAnswers((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex((a) => a.num === inputId);

      if (existingIndex !== -1) {
        updated[existingIndex] = { input: text, num: inputId };
      } else {
        updated.push({ input: text, num: inputId });
      }
      return updated;
    });

    setWrongWords([]);
  };

  /* ─── Remove on click ─── */

  const handleRemove = (inputId) => {
    setAnswers((prev) => prev.filter((a) => a.num !== inputId));
    setWrongWords([]);
  };

  /* ─── Check ─── */

  const checkAnswers = () => {
    if (locked) return;

    if (answers.length === 0) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let correctCount = 0;
    let wrong = [];

    correctMatches.forEach((ans) => {
      const userAnswer = answers.find((a) => a.num === ans.num);
      if (
        userAnswer &&
        userAnswer.input.toLowerCase() === ans.input.toLowerCase()
      ) {
        correctCount++;
      } else {
        wrong.push(ans.num);
      }
    });

    setWrongWords(wrong);
    setLocked(true);

    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  /* ─── Show Answers ─── */

  const showAnswers = () => {
    setAnswers(
      correctMatches.map((item) => ({ input: item.input, num: item.num })),
    );
    setWrongWords([]);
    setLocked(true);
  };

  /* ─── Reset ─── */

  const reset = () => {
    setAnswers([]);
    setWrongWords([]);
    setLocked(false);
    setActiveWord(null);
  };

  /* ─── Shared props for DroppableInput ─── */
  const dropProps = { answers, wrongWords, locked, onRemove: handleRemove };

  /* ================= RENDER ================= */

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
        <div className="div-forall" style={{ gap: "30px" }}>
          <h4 className="header-title-page8">
            <span className="ex-A">H</span> Drag and drop.
          </h4>

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
            {wordBank.map((text) => (
              <DraggableWord
                key={text}
                text={text}
                locked={locked}
                isUsed={isWordUsed(text)}
              />
            ))}
          </div>

          {/* ─── Content ─── */}
          <div className="content-container-wb-unit6-p4-q2 w-full">
            {/* Section 1 */}
            <div className="section-one-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  1
                </span>
                <img src={img1} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                <input
                  type="text"
                  value="Can it swim ?"
                  readOnly
                  style={{
                    pointerEvents: "none",
                    borderBottom: "2px solid black",
                    width: "100%",
                    fontSize: "20px",
                  }}
                />
                <div style={{ position: "relative", display: "flex" }}>
                  <input
                    type="text"
                    value="No, it"
                    readOnly
                    style={{
                      pointerEvents: "none",
                      borderBottom: "2px solid black",
                      width: "25%",
                      fontSize: "20px",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <DroppableInput inputId="input1" {...dropProps} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="section-two-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  2
                </span>
                <img src={img2} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                <div style={{ position: "relative", display: "flex" }}>
                  <input
                    type="text"
                    value="Can"
                    readOnly
                    style={{
                      pointerEvents: "none",
                      borderBottom: "2px solid black",
                      width: "25%",
                      fontSize: "20px",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <DroppableInput inputId="input2" {...dropProps} />
                  </div>
                </div>
                <div style={{ position: "relative", display: "flex" }}>
                  <input
                    type="text"
                    value="Yes,"
                    readOnly
                    style={{
                      pointerEvents: "none",
                      borderBottom: "2px solid black",
                      width: "20%",
                      fontSize: "20px",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <DroppableInput inputId="input3" {...dropProps} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="section-three-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  3
                </span>
                <img src={img3} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                <div style={{ position: "relative" }}>
                  <DroppableInput inputId="input4" {...dropProps} />
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <DroppableInput inputId="input5" {...dropProps} />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="section-four-wb-unit6-p4-q2">
              <div className="img-container-wb-unit6-p4-q2">
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  4
                </span>
                <img src={img4} className="img-wb-unit6-p4-q2" />
              </div>
              <div className="content-input-unit5-p6-q1">
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <DroppableInput inputId="input6" {...dropProps} />
                </div>
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <DroppableInput inputId="input7" {...dropProps} />
                </div>
              </div>
            </div>
          </div>

          {/* ─── Buttons ─── */}
          <div className="action-buttons-container">
            <button onClick={reset} className="try-again-button">
              Start Again ↻
            </button>
            <button
              className="show-answer-btn swal-continue"
              onClick={showAnswers}
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
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
              padding: "2px 5px",
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

export default WB_Unit6_Page4_Q2;
