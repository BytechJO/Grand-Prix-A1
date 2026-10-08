import React, { useState } from "react";
import "./WB_Unit4_Page2_Q2.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import ValidationAlert from "../../Popup/ValidationAlert";

const questions = [
  { id: "1", scramble: "blue/It's",           questionCorrect: "It's blue" },
  { id: "2", scramble: "circle/It's/a",        questionCorrect: "It's a circle" },
  { id: "3", scramble: "brown/It's/a/boat",    questionCorrect: "It's a brown boat" },
  { id: "4", scramble: "square/red/a/It's",    questionCorrect: "It's a red square" },
];

const getWords = (scramble) => scramble.replace(/['']/g, "'").split("/");

// ─── Draggable Word (per question) ───────────────────────────────
const DraggableWord = ({ id, word, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: locked || isUsed,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
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
    </span>
  );
};

// ─── Droppable Sentence Input ─────────────────────────────────────
const DroppableInput = ({ droppableId, value, isWrong, locked, onRemoveWord }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    disabled: locked,
  });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        className={`answer-input33-review10-p1-q3 ${isOver ? "drag-over-cell" : ""}`}
        style={{
          background: isOver ? "#e3f2fd" : "white",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
          minHeight: "36px",
          padding: "4px 8px",
          cursor: "default",
        }}
      >
        {/* كل كلمة بالجملة قابلة للكليك لتشالها */}
        {value.map((item, i) => (
          <span
            key={i}
            onClick={() => !locked && onRemoveWord(droppableId, item.bankId)}
            style={{
              cursor: locked ? "default" : "pointer",
              padding: "1px 4px",
              // borderRadius: "4px",
              // background: locked ? "transparent" : "#f0f4ff",
              // border: locked ? "none" : "1px solid #2c5287",
              fontSize: "inherit",
            }}
            title={!locked ? "Click to remove" : ""}
          >
            {item.word}
          </span>
        ))}
      </div>
      {isWrong && <span className="error-mark-input1">✕</span>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────
const WB_Unit4_Page2_Q2 = () => {
  // answers: { "1": [{word, bankId}], "2": [], ... }
  const emptyAnswers = () =>
    Object.fromEntries(questions.map((q) => [q.id, []]));

  const [answers, setAnswers] = useState(emptyAnswers());
  const [wrong, setWrong]     = useState({});
  const [locked, setLocked]   = useState(false);
  const [activeItem, setActiveItem] = useState(null); // { word, qId }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // كل كلمة إلها id فريد: "qId::word::index"
  const getWordId = (qId, word, index) => `${qId}::${word}::${index}`;

  // الكلمات المستخدمة لكل سؤال (بالـ bankId)
  const usedIdsFor = (qId) => answers[qId].map((a) => a.bankId);

  // ─── Drag Handlers ─────────────────────────────────────────
  const handleDragStart = (event) => {
    const [qId, word] = event.active.id.split("::");
    setActiveItem({ word, qId });
  };

  const handleDragEnd = (event) => {
    setActiveItem(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("sentence-")) return;

    // active.id = "1::It's::0"
    const [sourceQId, word, indexStr] = active.id.split("::");
    const targetQId = over.id.replace("sentence-", "");

    // منع السحب من سؤال لسؤال ثاني
    if (sourceQId !== targetQId) return;

    const bankId = active.id; // الـ id الكامل فريد

    setAnswers((prev) => {
      const current = prev[targetQId];

      // منع تكرار نفس الكلمة (نفس bankId)
      if (current.some((a) => a.bankId === bankId)) return prev;

      return {
        ...prev,
        [targetQId]: [...current, { word, bankId }],
      };
    });

    setWrong({});
  };

  // ─── Remove word from sentence on click ──────────────────────
  const handleRemoveWord = (droppableId, bankId) => {
    const qId = droppableId.replace("sentence-", "");
    setAnswers((prev) => ({
      ...prev,
      [qId]: prev[qId].filter((a) => a.bankId !== bankId),
    }));
    setWrong({});
  };

  // ─── Check ───────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = questions.some((q) => answers[q.id].length === 0);
    if (hasEmpty) {
      ValidationAlert.info("Please answer all the questions before checking.");
      return;
    }

    let wrongTemp = {};
    let score = 0;
    const total = questions.length;

    questions.forEach((q) => {
      const userSentence = answers[q.id].map((a) => a.word).join(" ");
      if (userSentence !== q.questionCorrect) {
        wrongTemp[q.id] = true;
      } else {
        score++;
      }
    });

    setWrong(wrongTemp);
    setLocked(true);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">Score: ${score} / ${total}</span>
      </div>
    `;

    score === total
      ? ValidationAlert.success(msg)
      : score === 0
      ? ValidationAlert.error(msg)
      : ValidationAlert.warning(msg);
  };

  // ─── Show Answer ─────────────────────────────────────────────
  const showCorrectAnswers = () => {
    const filled = {};
    questions.forEach((q) => {
      filled[q.id] = q.questionCorrect.split(" ").map((word, i) => ({
        word,
        bankId: getWordId(q.id, word, i),
      }));
    });
    setAnswers(filled);
    setWrong({});
    setLocked(true);
  };

  // ─── Reset ───────────────────────────────────────────────────
  const reset = () => {
    setAnswers(emptyAnswers());
    setWrong({});
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <div style={{ gap: "30px" }} className="div-forall">
          <h5 className="header-title-page8">
            <span className="ex-A">D</span>Drag and drop the words to make sentences.
          </h5>

          <div className="content-container-wb-unit4-p2-q2">
            {questions.map((q) => {
              const words = getWords(q.scramble);
              const usedIds = usedIdsFor(q.id);

              return (
                <div key={q.id} style={{ display: "flex", width: "100%" }}>
                  <div className="input-container-wb-unit4-p2-q2">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* ─── Scrambled words display ─── */}
                      <div style={{ display: "flex" }}>
                        <span className="num2">{q.id}</span>
                        <input
                          readOnly
                          value={q.scramble}
                          className="answer-input-review10-p1-q3"
                        />
                      </div>

                      {/* ─── Word Bank per question ─── */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          padding: "10px",
                          border: "2px dashed #ccc",
                          borderRadius: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {words.map((word, i) => {
                          const id = getWordId(q.id, word, i);
                          return (
                            <DraggableWord
                              key={id}
                              id={id}
                              word={word}
                              locked={locked}
                              isUsed={usedIds.includes(id)}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* ─── Sentence drop zone ─── */}
                    <DroppableInput
                      droppableId={`sentence-${q.id}`}
                      value={answers[q.id]}
                      isWrong={wrong[q.id]}
                      locked={locked}
                      onRemoveWord={handleRemoveWord}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── Buttons ─── */}
          <div className="action-buttons-container">
            <button className="try-again-button" onClick={reset}>
              Start Again ↻
            </button>
            <button className="show-answer-btn swal-continue" onClick={showCorrectAnswers}>
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
        {activeItem && (
          <span
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
            {activeItem.word}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit4_Page2_Q2;