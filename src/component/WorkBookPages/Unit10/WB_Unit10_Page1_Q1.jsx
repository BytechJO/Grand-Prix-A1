import React, { useState, useMemo } from "react";
import "./WB_Unit10_Page1_Q1.css";
import jello from "../../../assets/U1 WB/U10/U10P57EXEA-01.svg";
import present from "../../../assets/U1 WB/U10/U10P57EXEA-02.svg";
import balloons from "../../../assets/U1 WB/U10/U10P57EXEA-03.svg";
import balloons1 from "../../../assets/U1 WB/U10/U10P57EXEA-04.svg";
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

// ─────────────────────────────────────────────
const questions = [
  { id: "q1", img: jello,     scramble: "I want an plepa.",  correct: "I want an apple",  words: ["I", "want", "an", "apple"] },
  { id: "q2", img: present,   scramble: "I want daerb.",     correct: "I want bread",     words: ["I", "want", "bread"] },
  { id: "q3", img: balloons,  scramble: "I want ncckeih.",   correct: "I want chicken",   words: ["I", "want", "chicken"] },
  { id: "q4", img: balloons1, scramble: "I want eic mreac.", correct: "I want ice cream", words: ["I", "want", "ice", "cream"] },
];

// ── shuffle — البانك دايماً عنده كل الكلمات، ما نشيل منه أبداً ──
const shuffle = (qId, arr) => {
  const a = arr.map((text, i) => ({ id: `${qId}-chip-${i}`, text }));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildBank = () => {
  const bank = {};
  questions.forEach((q) => { bank[q.id] = shuffle(q.id, q.words); });
  return bank;
};

// ── Draggable word chip ───────────────────────
// isUsed = موجودة بالإجابة حالياً → disabled + فاتحة
function DraggableWord({ id, text, qId, disabled, isUsed }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: disabled || isUsed,
    data: { text, qId },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "6px 12px",
        border: `2px solid ${isUsed ? "#c0c0c0" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#f0f0f0" : "#fff",
        color: isUsed ? "#bbb" : "inherit",
        fontWeight: "600",
        cursor: disabled || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.4 : 1,
        touchAction: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        transition: "background 0.2s, color 0.2s, border-color 0.2s",
      }}
    >
      {text}
    </div>
  );
}

// ── Word bank droppable zone ──────────────────
function WordBankZone({ id, qId, words, isOver, disabled, usedIds }) {
  const { setNodeRef } = useDroppable({ id, disabled });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        gap: "8px",
        minHeight: "40px",
        padding: "4px 6px",
        borderRadius: "8px",
        border: isOver ? "2px dashed #2c5287" : "2px dashed transparent",
        background: isOver ? "#e8f0fe" : "transparent",
        alignItems: "center",
        transition: "background 0.15s",
      }}
    >
      {words.map((w) => (
        <DraggableWord
          key={w.id}
          id={w.id}
          text={w.text}
          qId={qId}
          disabled={disabled}
          isUsed={usedIds.has(w.id)}
        />
      ))}
    </div>
  );
}

// ── Droppable answer box ──────────────────────
function DroppableAnswer({ id, value, isOver, isWrong, disabled, onRemoveLast }) {
  const { setNodeRef } = useDroppable({ id, disabled });
  return (
    <div
      ref={setNodeRef}
      className={`answer-input33-review10-p1-q3 ${isOver ? "drag-over-cell" : ""}`}
      onClick={!disabled ? onRemoveLast : undefined}
      style={{
        cursor: !disabled && value ? "pointer" : "default",
        background: isOver ? "#e3f2fd" : "white",
        display: "flex",
        gap: "6px",
        height: "40px",
        alignItems: "center",
        padding: "6px",
        position: "relative",
      }}
      title={!disabled && value ? "Click to return last word to bank" : ""}
    >
      {value}
      {isWrong && <span className="error-mark-input1">✕</span>}
    </div>
  );
}

// ── Main component ────────────────────────────
const WB_Unit10_Page1_Q1 = () => {
  // bank[qId] = [{id, text}]  — كل الكلمات دايماً موجودة، ما نشيل منها
  // filled[qId] = [{id, text}]  — الكلمات الموضوعة في خانة الإجابة
  const [bank, setBank] = useState(buildBank);
  const [filled, setFilled] = useState({ q1: [], q2: [], q3: [], q4: [] });
  const [wrong, setWrong] = useState({});
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // IDs المستخدمة حالياً في كل سؤال
  const usedIdsMap = useMemo(() => {
    const map = {};
    questions.forEach((q) => {
      map[q.id] = new Set((filled[q.id] || []).map((w) => w.id));
    });
    return map;
  }, [filled]);

  const activeChip = useMemo(() => {
    if (!activeId) return null;
    for (const q of questions) {
      const found = bank[q.id]?.find((w) => w.id === activeId);
      if (found) return found;
      const inFill = filled[q.id]?.find((w) => w.id === activeId);
      if (inFill) return inFill;
    }
    return null;
  }, [activeId, bank, filled]);

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragOver  = ({ over })   => setOverId(over ? over.id : null);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    setOverId(null);
    if (!over || locked) return;

    const wordId  = active.id;
    const dest    = String(over.id);
    const srcQid  = active.data.current?.qId;
    if (!srcQid) return;

    const isBankDest   = dest.startsWith("bank-");
    const isAnswerDest = dest.startsWith("answer-");
    if (!isBankDest && !isAnswerDest) return;

    const destQid = dest.replace("bank-", "").replace("answer-", "");
    if (srcQid !== destQid) return;

    // هل الكلمة مستخدمة (موجودة بـ filled) أم لا؟
    const inFilled = filled[srcQid]?.find((w) => w.id === wordId);
    const inBank   = bank[srcQid]?.find((w) => w.id === wordId);
    const chip     = inFilled || inBank;
    if (!chip) return;

    const srcZone = inFilled ? "answer" : "bank";

    // البانك ما بنعدّل عليه أبداً (الكلمات تضل موجودة)
    // بس نعدّل على filled

    if (srcZone === "bank" && isAnswerDest) {
      // من البانك → خانة الإجابة: أضف للـ filled (إذا مش مستخدمة)
      const alreadyUsed = filled[destQid]?.some((w) => w.id === wordId);
      if (alreadyUsed) return;
      setFilled((prev) => ({
        ...prev,
        [destQid]: [...(prev[destQid] || []), chip],
      }));
    } else if (srcZone === "answer" && isBankDest) {
      // من خانة الإجابة → البانك: شيلها من filled فقط
      setFilled((prev) => ({
        ...prev,
        [srcQid]: prev[srcQid].filter((w) => w.id !== wordId),
      }));
    } else if (srcZone === "answer" && isAnswerDest) {
      // من answer → answer نفسها: لا شي
      return;
    }

    setWrong({});
  };

  // ── Click على خانة الإجابة → ارجع آخر كلمة للبانك (= شيلها من filled) ──
  const removeLastWord = (qId) => {
    if (locked) return;
    const last = filled[qId]?.at(-1);
    if (!last) return;
    setFilled((prev) => ({ ...prev, [qId]: prev[qId].slice(0, -1) }));
    setWrong({});
  };

  // ── Check ──────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = questions.some((q) => !filled[q.id] || filled[q.id].length === 0);
    if (hasEmpty) {
      ValidationAlert.info("Please answer all the questions before checking.");
      return;
    }
    let score = 0;
    const wrongTemp = {};
    questions.forEach((q) => {
      const userAnswer = filled[q.id].map((w) => w.text).join(" ");
      if (userAnswer === q.correct) score++;
      else wrongTemp[q.id] = true;
    });
    setWrong(wrongTemp);
    setLocked(true);
    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ── Show Answer ────────────────────────────────────────────────────────────
  const showCorrectAnswers = () => {
    const newFilled = {};
    questions.forEach((q) => {
      newFilled[q.id] = q.correct.split(" ").map((t, i) => ({ id: `correct-${q.id}-${i}`, text: t }));
    });
    setFilled(newFilled);
    setWrong({});
    setLocked(true);
  };

  // ── Reset ──────────────────────────────────────────────────────────────────
  const reset = () => {
    setBank(buildBank());
    setFilled({ q1: [], q2: [], q3: [], q4: [] });
    setWrong({});
    setLocked(false);
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
        <div style={{  }} className="div-forall">
          <h5 className="header-title-page8">
            <span className="ex-A">A</span>unscramble and drag to form a sentence.
          </h5>

          <div className="content-container-wb-unit10-p1-q1">
            {questions.map((q, index) => {
              const bankDropId   = `bank-${q.id}`;
              const answerDropId = `answer-${q.id}`;
              const usedIds      = usedIdsMap[q.id];

              return (
                <div key={q.id} style={{ display: "flex", width: "100%", alignItems: "center", gap: "20px" }}>
                  <span className="num2">{index + 1}</span>
                  <img src={q.img} className="img-wb-unit10-p1-q1" alt="" />

                  <div className="input-container-wb-unit10-p1-q1">
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", width: "100%", justifyContent: "space-between", marginBottom: "10px" }}>
                      <input readOnly value={q.scramble} className="answer-input-review10-p1-q3" />

                      <WordBankZone
                        id={bankDropId}
                        qId={q.id}
                        words={bank[q.id] || []}
                        isOver={overId === bankDropId}
                        disabled={locked}
                        usedIds={usedIds}
                      />
                    </div>

                    <DroppableAnswer
                      id={answerDropId}
                      value={(filled[q.id] || []).map((w) => w.text).join(" ")}
                      isOver={overId === answerDropId}
                      isWrong={!!wrong[q.id]}
                      disabled={locked}
                      onRemoveLast={() => removeLastWord(q.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="action-buttons-container">
            <button className="try-again-button" onClick={reset}>Start Again ↻</button>
            <button className="show-answer-btn" onClick={showCorrectAnswers}>Show Answer</button>
            <button className="check-button2" onClick={checkAnswers}>Check Answer ✓</button>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeChip ? (
          <div style={{ padding: "6px 12px", border: "2px solid #2c5287", borderRadius: "8px", background: "#fff", fontWeight: "600", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", cursor: "grabbing", whiteSpace: "nowrap" }}>
            {activeChip.text}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit10_Page1_Q1;