import React, { useState, useRef } from "react";
import "./WB_Unit9_Page2_Q2.css";
import table from "../../../assets/U1 WB/U9/U9P52EXED-01.svg";
import dish from "../../../assets/U1 WB/U9/U9P52EXED-02.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable, useDraggable } from "@dnd-kit/core";

// ─── Word chip in the bank ────────────────────────────────────────────────────
// isUsed  → greyed out, not draggable
// !isUsed → normal, draggable
function BankWord({ id, word, isUsed, globalDisabled }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id, disabled: isUsed || globalDisabled });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isUsed ? 0.35 : isDragging ? 0.4 : 1,
    borderRadius: "8px",
    border: `2px solid ${isUsed ? "#aaa" : "#2c5287"}`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    cursor: isUsed || globalDisabled ? "default" : "grab",
    background: isUsed ? "#e9e9e9" : "white",
    color: isUsed ? "#999" : "",
    padding: "5px 10px",
    userSelect: "none",
    touchAction: "none",
    transition: "opacity 0.2s, background 0.2s, border-color 0.2s",
    pointerEvents: isUsed ? "none" : "auto",
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...(isUsed ? {} : { ...listeners, ...attributes })}
    >
      {word}
    </span>
  );
}

// ─── Word chip inside the answer drop zone ────────────────────────────────────
// Clicking it returns the word to the bank (re-enables it there)
function AnswerWord({ word, disabled, onReturn }) {
  return (
    <span
      onClick={() => !disabled && onReturn(word)}
      title={disabled ? "" : "Click to return"}
      style={{
        borderRadius: "8px",
        // border: "2px solid #2c5287",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: disabled ? "default" : "pointer",
        background: "white",
        // padding: "5px 10px",
        userSelect: "none",
        transition: "background 0.15s",
      }}
    >
      {word}
    </span>
  );
}

// ─── Drop zone for one sentence ───────────────────────────────────────────────
function AnswerZone({ id, words, disabled, onReturn }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`unscramble-input-wb-unit9-p2-q1 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        minHeight: "46px",
        borderBottom: "2px solid black",
        // borderRadius: "10px",
        padding: "8px 12px",
        background: isOver ? "#eef4ff" : "transparent",
        transition: "background 0.15s, border 0.15s",
      }}
    >
      {words.map((w) => (
        <AnswerWord key={w} word={w} disabled={disabled} onReturn={onReturn} />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const WB_Unit9_Page2_Q2 = () => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const [wrongWords, setWrongWords] = useState([]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [selectedLeftWord, setSelectedLeftWord] = useState(null);
  const [selectedRightWord, setSelectedRightWord] = useState(null);

  // All words always stay in the bank — we only track which are "used"
  const allWords = {
    1: ["likes", "she", "chickens"],
    2: ["cows", "like", "I"],
  };

  // usedWords[qId] = Set of word strings currently placed in the answer zone
  const [usedWords, setUsedWords] = useState({ 1: new Set(), 2: new Set() });

  // answer[qId] = ordered array of placed words (for display & checking)
  const [answer, setAnswer] = useState({ 1: [], 2: [] });

  const correctSentences = {
    1: "she likes chickens",
    2: "i like cows",
  };

  const correctMatches = [
    { word: "likes/she/chickens", image: "img2" },
    { word: "cows/like/I", image: "img1" },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const findWordQuestion = (wordId) => {
    for (const qId of ["1", "2"]) {
      if (allWords[qId].includes(wordId)) return qId;
    }
    return null;
  };

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked || showAnswer) return;

    const wordId = active.id;
    const qId = findWordQuestion(wordId);
    if (!qId) return;

    // Only allow drop into the matching sentence's zone
    if (over.id !== `drop-${qId}`) return;

    // Already used → ignore
    if (usedWords[qId].has(wordId)) return;

    // Mark as used and add to answer
    setUsedWords((prev) => ({
      ...prev,
      [qId]: new Set([...prev[qId], wordId]),
    }));
    setAnswer((prev) => ({
      ...prev,
      [qId]: [...prev[qId], wordId],
    }));
    setWrongInputs([]);
  };

  // Click word in answer zone → remove from answer, re-enable in bank
  const handleReturnWord = (wordId) => {
    if (locked || showAnswer) return;
    const qId = findWordQuestion(wordId);
    if (!qId) return;

    setUsedWords((prev) => {
      const next = new Set(prev[qId]);
      next.delete(wordId);
      return { ...prev, [qId]: next };
    });
    setAnswer((prev) => ({
      ...prev,
      [qId]: prev[qId].filter((w) => w !== wordId),
    }));
    setWrongInputs([]);
  };

  // ── Dot matching ──────────────────────────────────────────────────────────
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return;
    const rect = containerRef.current.getBoundingClientRect();
    const word = e.target.dataset.word || null;
    setSelectedLeftWord(word);
    if (lines.some((l) => l.word === word)) return;
    setFirstDot({
      word,
      x: e.target.getBoundingClientRect().left - rect.left + 8,
      y: e.target.getBoundingClientRect().top - rect.top + 8,
    });
  };

  const handleEndDotClick = (e) => {
    if (showAnswer || locked || !firstDot) return;
    const rect = containerRef.current.getBoundingClientRect();

    setLines((prev) => [
      ...prev,
      {
        x1: firstDot.x,
        y1: firstDot.y,
        x2: e.target.getBoundingClientRect().left - rect.left + 8,
        y2: e.target.getBoundingClientRect().top - rect.top + 8,
        word: firstDot.word,
        image: e.target.dataset.image || null,
      },
    ]);
    setSelectedRightWord(e.target.dataset.image);

    setTimeout(() => {
      setSelectedLeftWord(null);
      setSelectedRightWord(null);
    }, 300);

    setFirstDot(null);
  };

  // ── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer || locked) return;

    if (answer[1].length === 0 || answer[2].length === 0) {
      ValidationAlert.info("Oops!", "Please complete all sentences.");
      return;
    }
    if (lines.length < 2) {
      ValidationAlert.info("Oops!", "Please match all pairs before checking.");
      return;
    }

    let sentenceCorrect = 0;
    const wrongInputsTemp = [];

    Object.keys(correctSentences).forEach((key) => {
      const userAnswer = answer[key].join(" ").toLowerCase();
      if (userAnswer === correctSentences[key]) sentenceCorrect++;
      else wrongInputsTemp.push(key);
    });

    setWrongInputs(wrongInputsTemp);

    const wrongLines = [];
    let lineCorrect = 0;
    lines.forEach((line) => {
      const ok = correctMatches.some(
        (p) => p.word === line.word && p.image === line.image,
      );
      if (ok) lineCorrect++;
      else wrongLines.push(line.word);
    });

    setWrongWords(wrongLines);
    setLocked(true);

    const totalScore = 4;
    const userScore = sentenceCorrect + lineCorrect;
    const color =
      userScore === totalScore ? "green" : userScore === 0 ? "red" : "orange";

    const scoreMessage = `<div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold;">Score: ${userScore} / ${totalScore}</span>
    </div>`;

    if (userScore === totalScore) ValidationAlert.success(scoreMessage);
    else if (userScore === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setLines([]);
    setUsedWords({ 1: new Set(), 2: new Set() });
    setAnswer({ 1: [], 2: [] });
    setWrongWords([]);
    setWrongInputs([]);
    setShowAnswer(false);
    setSelectedLeftWord(null);
    setSelectedRightWord(null);
    setLocked(false);
    setFirstDot(null);
  };

  // ── Show answer ───────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    const rect = containerRef.current.getBoundingClientRect();
    const getDotPos = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - rect.left + 8, y: r.top - rect.top + 8 };
    };

    setLines(
      correctMatches.map((m) => ({
        ...m,
        x1: getDotPos(`[data-word="${m.word}"]`).x,
        y1: getDotPos(`[data-word="${m.word}"]`).y,
        x2: getDotPos(`[data-image="${m.image}"]`).x,
        y2: getDotPos(`[data-image="${m.image}"]`).y,
      })),
    );

    // Mark all words as used
    setUsedWords({
      1: new Set(allWords[1]),
      2: new Set(allWords[2]),
    });
    setAnswer({
      1: ["she", "likes", "chickens"],
      2: ["I", "like", "cows"],
    });
    setLocked(true);
    setShowAnswer(true);
    setWrongWords([]);
    setSelectedLeftWord(null);
    setSelectedRightWord(null);
    setWrongInputs([]);
  };

  const isDisabled = locked || showAnswer;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
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
        <div className="div-forall" style={{ gap: "50px" }}>
          <h4 className="header-title-page8">
            <span className="ex-A">D</span> Drag the words to make a sentence
            and match.
          </h4>

          <div className="container12-wb-unit9-p2-q1 w-full" ref={containerRef}>
            {/* ── Row 1 ── */}
            <div className="matching-row2">
              <div>
                <div className="word-with-dot2">
                  <span className="span-num2-wb-unit7-p2-q1">1</span>
                  <div style={{ flex: 1 }}>
                    <span
                      className={`word-text2-review3-p1-q2  ${
                        selectedLeftWord === "likes/she/chickens"
                          ? "selected-item"
                          : ""
                      } ${isDisabled ? "disabled-word" : ""}`}
                      onClick={() =>
                        !isDisabled &&
                        document.getElementById("dot-open").click()
                      }
                      style={{ cursor: isDisabled ? "default" : "pointer" }}
                    >
                      likes/she/chickens
                    </span>
                    {wrongWords.includes("likes/she/chickens") && (
                      <span className="error-mark-review3-p1-q2">✕</span>
                    )}

                    {/* Word bank — words always visible, greyed when used */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "10px",
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        marginBottom: "12px",
                        justifyContent: "center",
                        minHeight: "48px",
                        flexWrap: "wrap",
                      }}
                    >
                      {allWords[1].map((w) => (
                        <BankWord
                          key={w}
                          id={w}
                          word={w}
                          isUsed={usedWords[1].has(w)}
                          globalDisabled={isDisabled}
                        />
                      ))}
                    </div>

                    {/* Answer drop zone */}
                    <AnswerZone
                      id="drop-1"
                      words={answer[1]}
                      disabled={isDisabled}
                      onReturn={handleReturnWord}
                    />
                    {wrongInputs.includes("1") && (
                      <span className="input-error-x-wb-unit9-p2-q1">✕</span>
                    )}
                  </div>

                  <div className="dot-wrapper2">
                    <div
                      className="dot2 start-dot2"
                      id="dot-open"
                      data-word="likes/she/chickens"
                      onClick={handleStartDotClick}
                    />
                  </div>
                </div>
              </div>

              <div className="img-with-dot2-wb-unit7-p2-q1">
                <div className="dot-wrapper2">
                  <div
                    className="dot2 end-dot2"
                    data-image="img1"
                    id="dot-img1"
                    onClick={handleEndDotClick}
                  />
                </div>
                <img
                  src={table}
                  className={`matched-img2 ${isDisabled ? "disabled-hover" : ""}`}
                  alt=""
                  onClick={() =>
                    !isDisabled && document.getElementById("dot-img1").click()
                  }
                  style={{
                    cursor: isDisabled ? "default" : "pointer",
                    height: "130px",
                    width: "auto",
                  }}
                />
              </div>
            </div>

            {/* ── Row 2 ── */}
            <div className="matching-row2">
              <div>
                <div className="word-with-dot2">
                  <span className="span-num2-wb-unit7-p2-q1">2</span>
                  <div style={{ flex: 1 }}>
                    <span
                      className={`word-text2-review3-p1-q2  ${
                        selectedLeftWord === "cows/like/I"
                          ? "selected-item"
                          : ""
                      }${isDisabled ? "disabled-word" : ""}`}
                      onClick={() =>
                        !isDisabled &&
                        document.getElementById("dot-line").click()
                      }
                      style={{ cursor: isDisabled ? "default" : "pointer" }}
                    >
                      cows/like/I
                    </span>
                    {wrongWords.includes("cows/like/I") && (
                      <span className="error-mark-review3-p1-q2">✕</span>
                    )}

                    {/* Word bank */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "10px",
                        border: "2px dashed #ccc",
                        borderRadius: "10px",
                        marginBottom: "12px",
                        justifyContent: "center",
                        minHeight: "48px",
                        flexWrap: "wrap",
                      }}
                    >
                      {allWords[2].map((w) => (
                        <BankWord
                          key={w}
                          id={w}
                          word={w}
                          isUsed={usedWords[2].has(w)}
                          globalDisabled={isDisabled}
                        />
                      ))}
                    </div>

                    {/* Answer drop zone */}
                    <AnswerZone
                      id="drop-2"
                      words={answer[2]}
                      disabled={isDisabled}
                      onReturn={handleReturnWord}
                    />
                    {wrongInputs.includes("2") && (
                      <span className="input-error-x-wb-unit9-p2-q1">✕</span>
                    )}
                  </div>

                  <div className="dot-wrapper2">
                    <div
                      className="dot2 start-dot2"
                      data-word="cows/like/I"
                      id="dot-line"
                      onClick={handleStartDotClick}
                    />
                  </div>
                </div>
              </div>

              <div className="img-with-dot2-wb-unit7-p2-q1">
                <div className="dot-wrapper2">
                  <div
                    className="dot2 end-dot2"
                    data-image="img2"
                    id="dot-img2"
                    onClick={handleEndDotClick}
                  />
                </div>
                <img
                  src={dish}
                  className={`matched-img2 ${isDisabled ? "disabled-hover" : ""}`}
                  alt=""
                  onClick={() =>
                    !isDisabled && document.getElementById("dot-img2").click()
                  }
                  style={{
                    cursor: isDisabled ? "default" : "pointer",
                    height: "130px",
                    width: "auto",
                  }}
                />
              </div>
            </div>

            {/* SVG lines */}
            <svg className="lines-layer2">
              {lines.map((line, i) => (
                <line
                  key={i}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="red"
                  strokeWidth="3"
                />
              ))}
            </svg>
          </div>

          {/* Buttons */}
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
      </div>

      {/* Ghost chip while dragging */}
      <DragOverlay>
        {activeId ? (
          <span
            style={{
              borderRadius: "8px",
              border: "2px solid #2c5287",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              background: "white",
              padding: "5px 10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              pointerEvents: "none",
            }}
          >
            {activeId}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit9_Page2_Q2;
