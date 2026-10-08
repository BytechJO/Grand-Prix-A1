import React, { useState, useRef } from "react";
import "./WB_Unit2_Page2_Q1.css";
import table from "../../../assets/U1 WB/U2/U2P10EXEC-01.svg";
import dish from "../../../assets/U1 WB/U2/U2P10EXEC-02.svg";
import tiger from "../../../assets/U1 WB/U2/U2P10EXEC-03.svg";
import duck from "../../../assets/U1 WB/U2/U2P10EXEC-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
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

// ─── Data ────────────────────────────────────────────────────────────────────
const rows = [
  { id: 1, img: table, scrambled: ["birthday", "Happy", "!"] },
  { id: 2, img: dish, scrambled: ["a", "hat", "party", "It's", "."] },
  { id: 3, img: duck, scrambled: ["are", "How", "you", "old", "?"] },
  { id: 4, img: tiger, scrambled: ["seven", "I'm", "years", "old", "."] },
];

const correctSentences = {
  1: "Happy birthday",
  2: "It's a party hat",
  3: "How old are you",
  4: "I'm seven years old",
};

const emptyInputs = { 1: "", 2: "", 3: "", 4: "" };

// ─── DraggableWord ────────────────────────────────────────────────────────────
function DraggableWord({ id, word, disabled, isUsed }) {
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
        padding: "2px 5px",
        border: "2px solid #2c5287",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        cursor: disabled || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.5 : 1,
        userSelect: "none",
        touchAction: "none",
        pointerEvents: isUsed ? "none" : "auto",
        ...(isUsed ? { borderColor: "#ccc", color: "#aaa" } : {}),
      }}
    >
      {word}
    </span>
  );
}
// ─── DroppableInput ───────────────────────────────────────────────────────────
function DroppableInput({ id, value, isWrong, showAnswer, locked, onClear }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const words = value ? value.split(" ") : [];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        ref={setNodeRef}
        className={`unscramble-input ${isOver ? "drag-over-cell" : ""}`}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          alignItems: "center",
          minHeight: "36px",
          cursor: "default",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            onClick={() => {
              if (!showAnswer && !locked) onClear(id, word);
            }}
            style={{
              cursor: !showAnswer && !locked ? "pointer" : "default",
              // padding: "1px 4px",
              borderRadius: "4px",
              // background: !showAnswer && !locked ? "#f0f4ff" : "transparent",
              // border: !showAnswer && !locked ? "1px solid #2c5287" : "none",
            }}
          >
            {word}
          </span>
        ))}
      </div>
      {isWrong && <span className="input-error-x-wb-u2-p2-q1">✕</span>}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const WB_Unit2_Page2_Q1 = () => {
  const containerRef = useRef(null);
  const [userInputs, setUserInputs] = useState(emptyInputs);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  // استخراج الكلمة من الـ id: "sentenceId-word-index"
  const parseId = (id) => {
    const parts = id.split("-");
    return {
      sentenceId: parts[0],
      word: parts.slice(1, parts.length - 1).join("-"),
    };
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || locked || showAnswer) return;
    if (!over.id.startsWith("blank-")) return;

    const { sentenceId, word } = parseId(active.id);
    const targetSentence = over.id.replace("blank-", "");

    if (sentenceId !== targetSentence) return;

    setUserInputs((prev) => {
      const existing = prev[targetSentence]
        ? prev[targetSentence].split(" ")
        : [];
      if (existing.includes(word)) return prev;
      const updated = existing.length
        ? /^[!?.،,;:]$/.test(word)
          ? `${prev[targetSentence]}${word}`
          : `${prev[targetSentence]} ${word}`
        : word;
      return { ...prev, [targetSentence]: updated };
    });

    setWrongInputs([]);
  };

  const checkAnswers = () => {
    if (showAnswer || locked) return;

    if (Object.values(userInputs).some((v) => !v)) {
      ValidationAlert.info("Oops!", "Please complete all sentences.");
      return;
    }

    let wrongTemp = [];
    let correctCount = 0;

    Object.keys(correctSentences).forEach((key) => {
      if (
        userInputs[key].trim().toLowerCase() ===
        correctSentences[key].toLowerCase()
      ) {
        correctCount++;
      } else {
        wrongTemp.push(key);
      }
    });

    setWrongInputs(wrongTemp);
    setLocked(true);

    const total = Object.keys(correctSentences).length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    setUserInputs({
      1: correctSentences[1],
      2: correctSentences[2],
      3: correctSentences[3],
      4: correctSentences[4],
    });
    setLocked(true);
    setShowAnswer(true);
    setWrongInputs([]);
  };

  const handleReset = () => {
    setUserInputs(emptyInputs);
    setWrongInputs([]);
    setShowAnswer(false);
    setLocked(false);
  };

  const activeWord = activeId ? parseId(activeId).word : null;
  const usedWords = Object.values(userInputs).flatMap((sentence) =>
    sentence ? sentence.split(" ") : [],
  );

const handleClear = (cellId, word) => {
  const sentenceId = cellId.replace("blank-", "");
  setUserInputs((prev) => {
    const words = prev[sentenceId] ? prev[sentenceId].split(" ") : [];
    const idx = words.lastIndexOf(word);
    if (idx === -1) return prev;
    words.splice(idx, 1);
    return { ...prev, [sentenceId]: words.join(" ") };
  });
  setWrongInputs((prev) => prev.filter((id) => id !== sentenceId));
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
        <div className="div-forall" style={{ gap: "30px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">C</span> Unscramble and write.
          </h5>

          <div className="container12 w-full" ref={containerRef}>
            {rows.map((row, index) => (
              <div key={row.id} className="matching-row2 w-full">
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="img-with-dot2">
                    <span className="span-num2">{index + 1}</span>
                    <img
                      src={row.img}
                      alt=""
                      style={{
                        cursor: "pointer",
                        height: "100px",
                        width: "auto",
                      }}
                    />
                  </div>

                  <div className="word-with-dot2-wb-u2-p2-q1">
                    <div className="word-bank-container-wb-u2-p2-q1">
                      <span className="word-text2-wb-u2-p2-q1">
                        {row.scrambled.join(" ")}
                      </span>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          padding: "10px",
                          border: "2px dashed #ccc",
                          borderRadius: "10px",
                          alignItems: "center",
                          width: "300px",
                          justifyContent: "center",
                        }}
                      >
                        {row.scrambled.map((word, i) => (
                          <DraggableWord
                            key={`${row.id}-${word}-${i}`}
                            id={`${row.id}-${word}-${i}`}
                            word={word}
                            disabled={showAnswer || locked}
                            isUsed={usedWords.includes(word)} // ← هاد
                          />
                        ))}
                      </div>
                    </div>

                    <DroppableInput
                      id={`blank-${row.id}`}
                      value={userInputs[row.id]}
                      isWrong={wrongInputs.includes(String(row.id))}
                      showAnswer={showAnswer}
                      locked={locked}
                      onClear={handleClear} // ← هاد
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={handleReset} className="try-again-button">
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

      <DragOverlay>
        {activeWord && (
          <span
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {activeWord}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit2_Page2_Q1;
