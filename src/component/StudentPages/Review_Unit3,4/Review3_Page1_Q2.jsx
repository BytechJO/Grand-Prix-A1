import React, { useState, useRef } from "react";
import "./Review3_Page1_Q2.css";
import table from "../../../assets/unit4/imgs/U4P34EXEB-01.svg";
import dish from "../../../assets/unit4/imgs/U4P34EXEB-02.svg";
import tiger from "../../../assets/unit4/imgs/U4P34EXEB-03.svg";
import duck from "../../../assets/unit4/imgs/U4P34EXEB-04.svg";
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

// ─── Draggable Sentence (Word Bank) ───────────────────────────────────────────
const DraggableSentence = ({ id, sentence, disabled, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
        border: `2px solid ${isUsed ? "#aab3c4" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#f0f2f5" : "white",
        fontWeight: "bold",
        cursor: disabled || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.45 : 1,
        color: isUsed ? "#9aa3b0" : "inherit",
        transition: "all 0.2s ease",
        userSelect: "none",
        whiteSpace: "nowrap",
          touchAction:"none"
      }}
    >
      {sentence}
    </div>
  );
};

// ─── Droppable Input Slot ──────────────────────────────────────────────────────
const InputSlot = ({ slotKey, value, isWrong, locked, showAnswer, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `input-${slotKey}` });

  return (
    <>
      <div
        ref={setNodeRef}
        className={`unscramble-input ${isOver ? "drag-over-cell" : ""}`}
      >
        <div className="drop-inner-review3-p1-q2">
          {value && (
            <span
              onClick={!locked && !showAnswer ? onRemove : undefined}
              style={{
                cursor: locked || showAnswer ? "default" : "pointer",
                userSelect: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
              }}
              title={locked || showAnswer ? "" : "Click to remove"}
            >
              {value}
              
            </span>
          )}
        </div>
      </div>
      {isWrong && <span className="input-error-x">✕</span>}
    </>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const Review3_Page1_Q2 = () => {
  const containerRef = useRef(null);

  const correctMatches = [
    { word: "your book open.",      image: "img2" },
    { word: "a line make.",         image: "img4" },
    { word: "close book your.",     image: "img3" },
    { word: "pencil take your out.", image: "img1" },
  ];

  const correctSentences = {
    1: "open your book.",
    2: "make a line.",
    3: "close your book.",
    4: "take out your pencil.",
  };

  const rows = [
    { key: 1, scrambled: "your book open.",       dotId: "dot-open",   imgSrc: table, imgId: "dot-img1", imgKey: "img1" },
    { key: 2, scrambled: "a line make.",           dotId: "dot-line",   imgSrc: dish,  imgId: "dot-img2", imgKey: "img2" },
    { key: 3, scrambled: "close book your.",       dotId: "dot-close",  imgSrc: duck,  imgId: "dot-img3", imgKey: "img3" },
    { key: 4, scrambled: "pencil take your out.",  dotId: "dot-pencil", imgSrc: tiger, imgId: "dot-img4", imgKey: "img4" },
  ];

  const [lines, setLines]           = useState([]);
  const [firstDot, setFirstDot]     = useState(null);
  const [wrongWords, setWrongWords] = useState([]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked]         = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userInputs, setUserInputs] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Words currently placed in a slot
  const usedSentences = new Set(Object.values(userInputs).filter(Boolean));

  // ─── Dot matching logic ─────────────────────────────────────────────────────
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return;
    const rect = containerRef.current.getBoundingClientRect();
    const word = e.target.dataset.word || null;
    const image = e.target.dataset.image || null;
    const alreadyUsed = lines.some((line) => line.word === word);
    if (alreadyUsed) return;
    setFirstDot({
      word, image,
      x: e.target.getBoundingClientRect().left - rect.left + 8,
      y: e.target.getBoundingClientRect().top - rect.top + 8,
    });
  };

  const handleEndDotClick = (e) => {
    if (showAnswer || locked || !firstDot) return;
    const rect = containerRef.current.getBoundingClientRect();
    const endWord  = e.target.dataset.word  || null;
    const endImage = e.target.dataset.image || null;
    setLines((prev) => [
      ...prev,
      {
        x1: firstDot.x, y1: firstDot.y,
        x2: e.target.getBoundingClientRect().left - rect.left + 8,
        y2: e.target.getBoundingClientRect().top  - rect.top  + 8,
        word:  firstDot.word  || endWord,
        image: firstDot.image || endImage,
      },
    ]);
    setFirstDot(null);
  };

  // ─── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = ({ active }) => {
    setActiveWord(active.id.replace("sentence-", ""));
  };

  const onDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || locked || showAnswer) return;

    const sentence = active.id.replace("sentence-", "");

    if (over.id.startsWith("input-")) {
      const targetKey = over.id.split("-")[1];

      setUserInputs((prev) => {
        const updated = { ...prev };
        // Remove from old slot
        Object.keys(updated).forEach((key) => {
          if (updated[key] === sentence) updated[key] = "";
        });
        updated[targetKey] = sentence;
        return updated;
      });

      setWrongInputs([]);
    }
  };

  const onDragCancel = () => setActiveWord(null);

  // Click on placed sentence → return to bank
  const removeInput = (key) => {
    if (locked || showAnswer) return;
    setUserInputs((prev) => ({ ...prev, [key]: "" }));
    setWrongInputs([]);
  };

  // ─── Buttons ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (showAnswer || locked) return;

    if (!userInputs[1] ||!userInputs[2] || !userInputs[3] || !userInputs[4]) {
      ValidationAlert.info("Oops!", "Please complete all sentences.");
      return;
    }
    if (lines.length < 4) {
      ValidationAlert.info("Oops!", "Please match all pairs before checking.");
      return;
    }

    let sentenceCorrect = 0;
    let wrongInputsTemp = [];

    Object.keys(correctSentences).forEach((key) => {
      if (key === "1") return;
      const userAnswer    = userInputs[key].trim().toLowerCase();
      const correctAnswer = correctSentences[key];
      if (userAnswer === correctAnswer) sentenceCorrect++;
      else wrongInputsTemp.push(key);
    });

    setWrongInputs(wrongInputsTemp);

    let lineCorrect = 0;
    let wrongLines  = [];

    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (pair) => pair.word === line.word && pair.image === line.image
      );
      if (isCorrect) lineCorrect++;
      else wrongLines.push(line.word);
    });

    setWrongWords([...wrongLines]);
    setLocked(true);

    const userScore  = sentenceCorrect + lineCorrect;
    const totalScore = 8;
    const color = userScore === totalScore ? "green" : userScore === 0 ? "red" : "orange";

    ValidationAlert[
      userScore === totalScore ? "success" : userScore === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${userScore} / ${totalScore}
        </span>
      </div>
    `);
  };

  const handleShowAnswer = () => {
    const rect = containerRef.current.getBoundingClientRect();
    const getDotPos = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - rect.left + 8, y: r.top - rect.top + 8 };
    };

    const finalLines = correctMatches.map((line) => ({
      ...line,
      x1: getDotPos(`[data-word="${line.word}"]`).x,
      y1: getDotPos(`[data-word="${line.word}"]`).y,
      x2: getDotPos(`[data-image="${line.image}"]`).x,
      y2: getDotPos(`[data-image="${line.image}"]`).y,
    }));

    setLines(finalLines);
    setUserInputs({
      1:correctSentences["1"],
      2: correctSentences["2"],
      3: correctSentences["3"],
      4: correctSentences["4"],
    });
    setLocked(true);
    setShowAnswer(true);
    setWrongWords([]);
    setWrongInputs([]);
  };

  const reset = () => {
    setLines([]);
    setUserInputs({ 1: "", 2: "", 3: "", 4: "" });
    setWrongWords([]);
    setWrongInputs([]);
    setShowAnswer(false);
    setLocked(false);
    setFirstDot(null);
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
            gap: "30px",
          
            justifyContent: "flex-start",
          }}
        >
          <h5 className="header-title-page8">
            <span className="mr-2">B</span> unscramble the sentences, tap or click, and match.
          </h5>

          {/* ── Sentence Bank ──────────────────────────────────────────────── */}
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
            {Object.values(correctSentences).map((sentence, index) => (
              <DraggableSentence
                key={sentence}
                id={`sentence-${sentence}`}
                sentence={sentence}
                disabled={locked || showAnswer}
                isUsed={usedSentences.has(sentence)}
              />
            ))}
          </div>

          {/* ── Matching Rows ──────────────────────────────────────────────── */}
          <div className="container12 w-full" ref={containerRef}>
            {rows.map((row) => (
              <div className="matching-row2" key={row.key}>
                {/* Left side: scrambled word + input slot */}
                <div>
                  <div className="word-with-dot2">
                    <span className="span-num2">{row.key}</span>
                    <span
                      className={`word-text2-review3-p1-q2 ${locked || showAnswer ? "disabled-hover" : ""}`}
                      onClick={() => document.getElementById(row.dotId).click()}
                      style={{ cursor: "pointer" }}
                    >
                      {row.scrambled}
                    </span>
                    {wrongWords.includes(row.scrambled) && (
                      <span className="error-mark-review3-p1-q2">✕</span>
                    )}
                    <div className="dot-wrapper2">
                      <div
                        className="dot2 start-dot2"
                        id={row.dotId}
                        data-word={row.scrambled}
                        onClick={handleStartDotClick}
                      />
                    </div>
                  </div>

                  <InputSlot
                    slotKey={row.key}
                    value={userInputs[row.key]}
                    isWrong={wrongInputs.includes(String(row.key))}
                    locked={locked}
                    showAnswer={showAnswer}
                    onRemove={() => removeInput(row.key)}
                  />
                </div>

                {/* Right side: image + end dot */}
                <div className="img-with-dot2">
                  <div className="dot-wrapper2">
                    <div
                      className="dot2 end-dot2"
                      data-image={row.imgKey}
                      id={row.imgId}
                      onClick={handleEndDotClick}
                    />
                  </div>
                  <img
                    src={row.imgSrc}
                    className={`matched-img2 ${locked || showAnswer ? "disabled-hover" : ""}`}
                    alt=""
                    onClick={() => document.getElementById(row.imgId).click()}
                    style={{ cursor: "pointer", height: "100px", width: "auto" }}
                  />
                </div>
              </div>
            ))}

            <svg className="lines-layer2">
              {lines.map((line, i) => (
                <line key={i} {...line} stroke="red" strokeWidth="3" />
              ))}
            </svg>
          </div>

          {/* ── Buttons ──────────────────────────────────────────────────────── */}
          <div className="action-buttons-container">
            <button onClick={reset} className="try-again-button">
              Start Again ↻
            </button>
            <button onClick={handleShowAnswer} className="show-answer-btn swal-continue">
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
          <div
            style={{
              padding: "2px 8px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "#fff",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(0,0,0,.2)",
              whiteSpace: "nowrap",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review3_Page1_Q2;