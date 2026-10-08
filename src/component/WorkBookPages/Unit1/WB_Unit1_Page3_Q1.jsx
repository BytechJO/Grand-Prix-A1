import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// ─── Data ─────────────────────────────────────────────────────────────────────

const data = [
  { scrambled: "morning Good !", answer: "Good morning!" },
  { scrambled: "you How are ?", answer: "How are you?" },
  { scrambled: "you Fine , thank .", answer: "Fine, thank you." },
  { scrambled: "evening Good !", answer: "Good evening!" },
  { scrambled: "I'm John . Hello !", answer: "Hello! I'm John ." },
];

// علامات الترقيم اللي لازم تلتصق بالكلمة اللي قبلها
const PUNCTUATION = new Set([".", ",", "!", "?", ";", ":"]);

// دالة تجمع الكلمات بشكل ذكي
const joinWords = (words) => {
  if (!words.length) return "";
  return words.reduce((acc, word) => {
    if (!acc) return word;
    if (PUNCTUATION.has(word)) return `${acc}${word}`;
    return `${acc} ${word}`;
  });
};

// ─── Word Chip (Draggable) ─────────────────────────────────────────────────────

const WordChip = ({ id, word, disabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
        border: `2px solid ${disabled ? "#b0b0b0" : "#2c5287"}`,
        borderRadius: "8px",
        background: disabled ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: disabled ? "#999" : undefined,
        cursor: disabled ? "not-allowed" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.35 : 1,
        transition:
          "opacity 0.2s, background 0.2s, border-color 0.2s, color 0.2s",
        userSelect: "none",
        touchAction: "none",
        display: "inline-block",
        pointerEvents: disabled ? "none" : undefined,
      }}
    >
      {word}
    </span>
  );
};

// ─── Answer Drop Zone (Droppable) ─────────────────────────────────────────────

const AnswerDropZone = ({
  id,
  wordList,
  isWrong,
  showAnswer,
  answerText,
  locked,
  onRemove,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  // لما Show Answer → نعرض النص الصح كـ plain text
  if (showAnswer) {
    return (
      <div style={{ position: "relative" }}>
        <div
          className="missing-input-wb-unit1-p3-q1"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0px",
          }}
        >
          {answerText}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={setNodeRef}
        className={`missing-input-wb-unit1-p3-q1${isOver ? " drag-over-cell" : ""}${isWrong ? " wrong-drop" : ""}`}
        style={{
          background: isOver ? "#e3f2fd" : undefined,
          transition: "background 0.15s",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
          minHeight: "38px",
          cursor: "default",
        }}
      >
        {wordList.map((entry, idx) => {
          const isPunct = PUNCTUATION.has(entry.word);
          return (
            <span
              key={`${entry.wordIndex}-${idx}`}
              onClick={() => {
                if (!locked) onRemove(id, entry.wordIndex);
              }}
              title={!locked ? "Click to remove" : ""}
              style={{
                // padding: "1px 5px",
                // border: "2px solid #2c5287",
                borderRadius: "6px",
                // background: "white",
                // fontWeight: "bold",
                fontSize: "18px",
                cursor: locked ? "default" : "pointer",
                userSelect: "none",
                // علامات الترقيم تلتصق بـ margin سالب يساري
                marginLeft: isPunct ? "-4px" : "0px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!locked) e.currentTarget.style.background = "#ffe0e0";
              }}
              onMouseLeave={(e) => {
                if (!locked) e.currentTarget.style.background = "white";
              }}
            >
              {entry.word}
            </span>
          );
        })}
      </div>
      {isWrong && <div className="wrong-icon-wb-unit1-p3-q1">✕</div>}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const WB_Unit1_Page3_Q1 = () => {
  // كل جملة عندها مصفوفة من الكلمات المرتبة حسب الترتيب اللي حطها الطالب
  const [wordLists, setWordLists] = useState(data.map(() => []));
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrong, setWrong] = useState(data.map(() => false));
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // استخرج الكلمة من الـ id (format: "sentenceIndex-word-wordIndex")
  const parseId = (id) => {
    const parts = id.split("-");
    const sentenceIndex = Number(parts[0]);
    const wordIndex = Number(parts[parts.length - 1]);
    const word = parts.slice(1, -1).join("-");
    return { sentenceIndex, word, wordIndex };
  };

  const activeWord = activeId ? parseId(activeId).word : null;

  // الكلمات المستخدمة لكل جملة
  const usedWordsPerSentence = data.map((item, i) => {
    const words = item.scrambled.split(/\s+/);
    // نشوف أي كلمات بنفس الـ index اتحطت
    return wordLists[i].map((entry) => entry.wordIndex);
  });

  const isWordUsed = (sentenceIndex, wordIndex) =>
    usedWordsPerSentence[sentenceIndex].includes(wordIndex);

  // ─── Drag Handlers ──────────────────────────────────────────────────────

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || showAnswer) return;

    const { sentenceIndex, word, wordIndex } = parseId(active.id);
    const destId = over.id; // "blank-0"

    if (!destId.startsWith("blank-")) return;
    const destSentence = Number(destId.replace("blank-", ""));

    // منع وضع كلمة بجملة غيرها
    if (sentenceIndex !== destSentence) return;

    // منع تكرار نفس الكلمة (بنفس الـ wordIndex)
    if (isWordUsed(sentenceIndex, wordIndex)) return;

    setWordLists((prev) => {
      const updated = prev.map((list) => [...list]);
      updated[sentenceIndex] = [...updated[sentenceIndex], { word, wordIndex }];
      return updated;
    });

    setWrong(data.map(() => false));
  };

  // ─── Remove word from answer (click to return to bank) ───────────────────

  const handleRemove = (blankId, wordIndex) => {
    const i = Number(blankId.replace("blank-", ""));
    setWordLists((prev) => {
      const updated = prev.map((list) => [...list]);
      updated[i] = updated[i].filter((entry) => entry.wordIndex !== wordIndex);
      return updated;
    });
    setWrong(data.map(() => false));
  };

  // ─── Check ──────────────────────────────────────────────────────────────

  const [locked, setLocked] = useState(false);

  const checkAnswers = () => {
    if (showAnswer || locked) return;

    const inputs = wordLists.map((list) => joinWords(list.map((e) => e.word)));

    if (inputs.some((v) => v.trim() === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please complete all answers before checking.",
      );
      return;
    }

    let correct = 0;
    const wrongStatus = inputs.map((v, i) => {
      const ok = v.trim().toLowerCase() === data[i].answer.toLowerCase();
      if (ok) correct++;
      return !ok;
    });

    setWrong(wrongStatus);
    setLocked(true);

    const total = data.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correct} / ${total}
        </span>
      </div>`;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ─── Reset ───────────────────────────────────────────────────────────────

  const reset = () => {
    setWordLists(data.map(() => []));
    setWrong(data.map(() => false));
    setShowAnswer(false);
    setLocked(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper" style={{ padding: "30px" }}>
        <div className="div-forall mb-10" style={{ gap: "20px" }}>
          <div className="page8-content w-full">
            <h5 className="header-title-page8">
              <span className="ex-A">A</span>
            Drag and drop the words to make sentences.
            </h5>
          </div>

          {data.map((item, i) => {
            const words = item.scrambled.split(/\s+/);

            return (
              <div key={i} style={{ marginBottom: "5px", width: "100%" }}>
                {/* ── Scrambled sentence + word bank ── */}
                <div className="scrambled-wb-unit1-p3-q1">
                  <div>
                    <span style={{ fontWeight: "600", marginRight: "8px" }}>
                      {i + 1}
                    </span>
                    {item.scrambled}
                  </div>

                  {/* Word bank لكل جملة */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      padding: "10px",
                      border: "2px dashed #ccc",
                      borderRadius: "10px",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {words.map((word, index) => {
                      const id = `${i}-${word}-${index}`;
                      const used = isWordUsed(i, index);
                      return (
                        <WordChip
                          key={id}
                          id={id}
                          word={word}
                          disabled={used || showAnswer || locked}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* ── Answer drop zone ── */}
                <AnswerDropZone
                  id={`blank-${i}`}
                  wordList={wordLists[i]}
                  isWrong={wrong[i]}
                  showAnswer={showAnswer}
                  answerText={item.answer}
                  locked={locked}
                  onRemove={handleRemove}
                />
              </div>
            );
          })}
        </div>

        {/* ── Buttons ── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            className="show-answer-btn swal-continue"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord ? (
          <span
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
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

export default WB_Unit1_Page3_Q1;
