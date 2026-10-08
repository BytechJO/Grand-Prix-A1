import React, { useState, useRef, useCallback } from "react";
import "./WB_Unit7_Page2_Q1.css";
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

// ─── ثوابت البيانات ──────────────────────────────────────────────────────────
const SCRAMBLED_WORDS = {
  1: ["you", "happy", "Are", "?"],
  2: ["the", "matter", "What's", "?"],
  3: ["bored", "I'm", "."],
  4: ["sad", "you", "Are", "?"],
  5: ["hungry", "you", "Are", "?"],
  6: ["cold", "I'm", "."],
};

// ✅ بنفس قطع الـ word bank بالترتيب الصحيح
const CORRECT_ORDER = {
  1: ["Are", "you", "happy", "?"],
  2: ["What's", "the", "matter", "?"],
  3: ["I'm", "bored", "."],
  4: ["Are", "you", "sad", "?"],
  5: ["Are", "you", "hungry", "?"],
  6: ["I'm", "cold", "."],
};

// ✅ متطابقة مع CORRECT_ORDER[k].join(" ")
const CORRECT_SENTENCES = {
  1: "Are you happy ?",
  2: "What's the matter ?",
  3: "I'm bored .",
  4: "Are you sad ?",
  5: "Are you hungry ?",
  6: "I'm cold .",
};

const CORRECT_MATCHES = [
  { word: "you/happy/Are ?",     image: "Are you happy?"      },
  { word: "the/matter/What's ?", image: "What's the matter?"  },
  { word: "bored/I'm .",         image: "I'm bored."          },
  { word: "sad/you/Are ?",       image: "Are you sad?"        },
  { word: "hungry/you/Are ?",    image: "Are you hungry?"     },
  { word: "cold/I'm .",          image: "I'm cold."           },
];

const ROWS = [
  { id: 1, wordKey: "you/happy/Are ?",     dotId: "dot-open",   rightText: "I'm bored.",         rightDotId: "dot-img1", rightImage: "I'm bored."         },
  { id: 2, wordKey: "the/matter/What's ?", dotId: "dot-line",   rightText: "Are you hungry?",    rightDotId: "dot-img2", rightImage: "Are you hungry?"    },
  { id: 3, wordKey: "bored/I'm .",         dotId: "dot-close",  rightText: "I'm cold.",          rightDotId: "dot-img3", rightImage: "I'm cold."          },
  { id: 4, wordKey: "sad/you/Are ?",       dotId: "dot-pencil", rightText: "What's the matter?", rightDotId: "dot-img4", rightImage: "What's the matter?" },
  { id: 5, wordKey: "hungry/you/Are ?",    dotId: "dot-hungry", rightText: "Are you happy?",     rightDotId: "dot-img5", rightImage: "Are you happy?"     },
  { id: 6, wordKey: "cold/I'm .",          dotId: "dot-cold",   rightText: "Are you sad?",       rightDotId: "dot-img6", rightImage: "Are you sad?"       },
];

const INITIAL_INPUTS = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

// ─── WordChip ────────────────────────────────────────────────────────────────
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
      className="word-box-wb-unit7-p2-q1"
      style={{
        cursor:     isUsed || isDisabled ? "not-allowed" : "grab",
        opacity:    isUsed ? 0.35 : isDragging ? 0.5 : 1,
        pointerEvents: isUsed ? "none" : undefined,
        userSelect: "none",
        touchAction:"none",
        transition: "opacity .2s",
      }}
    >
      {text}
    </div>
  );
};

// ─── SentenceDropZone ────────────────────────────────────────────────────────
const SentenceDropZone = ({ rowId, words, onReturn, isLocked }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `sentence-${rowId}` });

  return (
    <div
      ref={setNodeRef}
      className={`unscramble-input-wb-unit7-p2-q1 ${isOver ? "active-drop" : ""}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          onClick={() => !isLocked && onReturn(rowId, word)}
          style={{
            cursor:      isLocked ? "default" : "pointer",
            marginRight: 4,
            display:     "inline-block",
          }}
          title={isLocked ? "" : "اضغط لإرجاع الكلمة"}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit7_Page2_Q1 = () => {
  const [lines,       setLines]       = useState([]);
  const [userInputs,  setUserInputs]  = useState(INITIAL_INPUTS);
  const [wrongWords,  setWrongWords]  = useState([]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked,      setLocked]      = useState(false);
  const [showAnswer,  setShowAnswer]  = useState(false);
  const [firstDot,    setFirstDot]    = useState(null);
  const [activeInfo,  setActiveInfo]  = useState(null);

  const containerRef = useRef(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // ─── usedWords لكل صف ────────────────────────────────────────────────────
  const usedWords = {};
  ROWS.forEach(({ id }) => {
    usedWords[id] = new Set(userInputs[id]);
  });

  // ─── Drag Start ──────────────────────────────────────────────────────────
  const handleDragStart = ({ active }) => {
    // id: "bank-{rowId}-{word}"
    const parts = active.id.split("-");
    const rowId = Number(parts[1]);
    const word  = parts.slice(2).join("-");
    setActiveInfo({ rowId, word });
  };

  // ─── Drag End ────────────────────────────────────────────────────────────
  const handleDragEnd = useCallback(
    ({ active, over }) => {
      setActiveInfo(null);
      if (!over || locked || showAnswer) return;

      const parts     = active.id.split("-");
      const rowId     = Number(parts[1]);
      const word      = parts.slice(2).join("-");

      // over.id: "sentence-{rowId}"
      const destRowId = Number(over.id.split("-")[1]);

      // لا نسمح بالسحب بين الصفوف
      if (rowId !== destRowId) return;

      setUserInputs((prev) => ({
        ...prev,
        [rowId]: [...prev[rowId].filter((w) => w !== word), word],
      }));
    },
    [locked, showAnswer],
  );

  // ─── Return to bank ───────────────────────────────────────────────────────
  const handleReturn = (rowId, word) => {
    if (locked || showAnswer) return;
    setUserInputs((prev) => ({
      ...prev,
      [rowId]: prev[rowId].filter((w) => w !== word),
    }));
  };

  // ─── Matching dots ────────────────────────────────────────────────────────
  const getDotPos = (selector) => {
    const el = containerRef.current?.querySelector(selector);
    if (!el) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const r    = el.getBoundingClientRect();
    return { x: r.left - rect.left + 8, y: r.top - rect.top + 8 };
  };

  const handleStartDotClick = (e) => {
    if (locked || showAnswer) return;
    const word = e.target.dataset.word;
    if (!word) return;
    const alreadyUsed = lines.some((l) => l.word === word);
    if (alreadyUsed) return;
    const pos = getDotPos(`[data-word="${word}"]`);
    setFirstDot({ word, ...pos });
  };

  const handleEndDotClick = (e) => {
    if (locked || showAnswer || !firstDot) return;
    const image = e.target.dataset.image;
    if (!image) return;
    const pos = getDotPos(`[data-image="${image}"]`);
    setLines((prev) => [
      ...prev,
      { x1: firstDot.x, y1: firstDot.y, x2: pos.x, y2: pos.y, word: firstDot.word, image },
    ]);
    setFirstDot(null);
  };

  // ─── Check ───────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked || showAnswer) return;

    const allFilled = Object.values(userInputs).every((arr) => arr.length > 0);
    if (!allFilled || lines.length < ROWS.length) {
      ValidationAlert.info("Oops!", "Please complete all sentences and matches.");
      return;
    }

    let sentenceCorrect = 0;
    const wrongIn = [];
    Object.entries(CORRECT_SENTENCES).forEach(([key, correct]) => {
      const user = userInputs[Number(key)].join(" ");
      if (user === correct) sentenceCorrect++;
      else wrongIn.push(key);
    });
    setWrongInputs(wrongIn);

    let lineCorrect = 0;
    const wrongL = [];
    lines.forEach((line) => {
      const ok = CORRECT_MATCHES.some(
        (p) => p.word === line.word && p.image === line.image,
      );
      if (ok) lineCorrect++;
      else wrongL.push(line.word);
    });
    setWrongWords(wrongL);
    setLocked(true);

    const total = Object.keys(CORRECT_SENTENCES).length + CORRECT_MATCHES.length;
    const score = sentenceCorrect + lineCorrect;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg   = `<div style="font-size:20px;text-align:center"><span style="color:${color};font-weight:bold">Score: ${score} / ${total}</span></div>`;

    if (score === total)  ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else                  ValidationAlert.warning(msg);
  };

  // ─── Show Answer ──────────────────────────────────────────────────────────
  const handleShowAnswer = () => {
    // ✅ CORRECT_ORDER بنفس قطع الـ word bank
    const filled = {};
    Object.keys(CORRECT_ORDER).forEach((k) => {
      filled[k] = CORRECT_ORDER[k];
    });
    setUserInputs(filled);

    // خطوط الـ matching
    const fixedLines = CORRECT_MATCHES.map(({ word, image }) => {
      const s = getDotPos(`[data-word="${word}"]`);
      const e = getDotPos(`[data-image="${image}"]`);
      return { x1: s.x, y1: s.y, x2: e.x, y2: e.y, word, image };
    });
    setLines(fixedLines);

    setWrongWords([]);
    setWrongInputs([]);
    setLocked(true);
    setShowAnswer(true);
  };

  // ─── Reset ────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setLines([]);
    setUserInputs(INITIAL_INPUTS);
    setWrongWords([]);
    setWrongInputs([]);
    setLocked(false);
    setShowAnswer(false);
    setFirstDot(null);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 30 }}>
        <div className="div-forall">
          <h4 className="header-title-page8">
            <span className="ex-A">C</span> Unscramble, drag, and match.
          </h4>

          <div className="container12 w-full" ref={containerRef}>
            {ROWS.map((row) => (
              <div
                className="matching-row2"
                style={{ alignItems: "flex-start" }}
                key={row.id}
              >
                {/* ── يسار ── */}
                <div className="flex flex-col justify-between h-[110px]">
                  <div className="word-with-dot2">
                    <span className="span-num2-wb-unit7-p2-q1">{row.id}</span>
                    <span
                      className={`word-text2-wb-unit7-p2-q1 ${locked || showAnswer ? "disabled-word" : ""}`}
                      onClick={() =>
                        !locked && !showAnswer &&
                        handleStartDotClick({
                          target: document.querySelector(`[data-word="${row.wordKey}"]`),
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {row.wordKey}
                    </span>
                    {wrongWords.includes(row.wordKey) && (
                      <span className="error-mark-review3-p1-q2">✕</span>
                    )}
                    <div className="dot-wrapper2">
                      <div
                        className="dot2 start-dot2"
                        id={row.dotId}
                        data-word={row.wordKey}
                        onClick={handleStartDotClick}
                      />
                    </div>
                  </div>

                  {/* Word Bank */}
                  <div className="word-bank-wb-unit7-p2-q1">
                    {SCRAMBLED_WORDS[row.id].map((word) => (
                      <WordChip
                        key={word}
                        id={`bank-${row.id}-${word}`}
                        text={word}
                        isUsed={usedWords[row.id].has(word)}
                        isDisabled={locked || showAnswer}
                      />
                    ))}
                  </div>

                  {/* Sentence Drop Zone */}
                  <SentenceDropZone
                    rowId={row.id}
                    words={userInputs[row.id]}
                    onReturn={handleReturn}
                    isLocked={locked || showAnswer}
                  />
                </div>

                {/* ── يمين ── */}
                <div className="img-with-dot2-wb-unit7-p2-q1">
                  <div className="dot-wrapper2">
                    <div
                      className="dot2 end-dot2"
                      id={row.rightDotId}
                      data-image={row.rightImage}
                      onClick={handleEndDotClick}
                    />
                  </div>
                  <p
                    className={`matched-word-wb-unit7-p2-q1 ${locked || showAnswer ? "disabled-word" : ""}`}
                    onClick={() =>
                      !locked && !showAnswer &&
                      handleEndDotClick({
                        target: document.querySelector(`[data-image="${row.rightImage}"]`),
                      })
                    }
                  >
                    {row.rightText}
                  </p>
                </div>
              </div>
            ))}

            {/* SVG Lines */}
            <svg className="lines-layer2">
              {lines.map((line, i) => (
                <line
                  key={i}
                  x1={line.x1} y1={line.y1}
                  x2={line.x2} y2={line.y2}
                  stroke="red"
                  strokeWidth="3"
                />
              ))}
            </svg>
          </div>

          {/* Buttons */}
          <div className="action-buttons-container">
            <button className="try-again-button" onClick={handleReset}>
              Start Again ↻
            </button>
            <button className="show-answer-btn swal-continue" onClick={handleShowAnswer}>
              Show Answer
            </button>
            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeInfo && (
          <div
            className="word-box-wb-unit7-p2-q1"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,.2)", cursor: "grabbing" }}
          >
            {activeInfo.word}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit7_Page2_Q1;