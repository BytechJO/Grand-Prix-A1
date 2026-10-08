import React, { useState, useMemo } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U4/U4P26EXEBC-01.svg";
import img2 from "../../../assets/U1 WB/U4/U4P26EXEBC-02.svg";
import img3 from "../../../assets/U1 WB/U4/U4P26EXEBC-03.svg";
import img4 from "../../../assets/U1 WB/U4/U4P26EXEBC-04.svg";
import img5 from "../../../assets/U1 WB/U4/U4P26EXEBC-05.svg";
import img6 from "../../../assets/U1 WB/U4/U4P26EXEBC-06.svg";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

const data = [
  {
    parts: [
      { before: "A", middleImg: img1, blank: 0, after: "" },
      { before: "is driving a", middleImg: img4, blank: 1, after: "." },
    ],
    correct: ["fish", "van"],
  },
  {
    parts: [
      { before: "A", middleImg: img2, blank: 0, after: "" },
      { before: "wearing a", middleImg: img5, blank: 1, after: "" },
      {
        before: "is running on his bare",
        middleImg: img3,
        blank: 2,
        after: "",
      },
      {
        before: "after the van with a",
        middleImg: img6,
        blank: 3,
        after: "in his hand.",
      },
    ],
    correct: ["vet", "vest", "feet", "fork"],
  },
];

// ─── Shuffle helper ───────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── Draggable Word ───────────────────────────────────────────────
const DraggableWord = ({ id, word, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: locked || isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
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
    </div>
  );
};

// ─── Droppable Blank ─────────────────────────────────────────────
const DroppableBlank = ({ droppableId, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    disabled: locked,
  });

  return (
    <div className="input-wrapper-wb-unit4-p6-q3">
      <div
        ref={setNodeRef}
        className={`missing-input-wb-unit4-p6-q3 ${isOver ? "drag-over-cell" : ""}`}
        onClick={() => !locked && value && onRemove(droppableId)}
        style={{
          background: isOver ? "#e3f2fd" : "",
          position: "relative",
          cursor: !locked && value ? "pointer" : "default",
          transition: "background 0.15s ease",
        }}
        title={!locked && value ? "Click to remove" : ""}
      >
        {value}
        {isWrong && <span className="wrong-icon-review4-p2-q1">✕</span>}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────
const WB_Unit4_Page6_Q3 = () => {
  // ⭐ شفل الكلمات مرة وحدة عند أول render
  const shuffledBank = useMemo(
    () =>
      shuffle(
        data.flatMap((d, qi) =>
          d.correct.map((word, bi) => ({ word, id: `bank-${qi}-${bi}` })),
        ),
      ),
    [],
  );

  const emptyAnswers = () =>
    data.map((d) => Array(d.correct.length).fill(null));

  const [answers, setAnswers] = useState(emptyAnswers());
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // usedIds بالـ bankId
  const usedIds = answers
    .flat()
    .filter(Boolean)
    .map((a) => a.bankId);

  // ─── Drag Handlers ─────────────────────────────────────────
  const handleDragStart = (event) => {
    const item = shuffledBank.find((b) => b.id === event.active.id);
    setActiveWord(item?.word ?? null);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("blank-")) return;

    const bankItem = shuffledBank.find((b) => b.id === active.id);
    if (!bankItem) return;

    // blank-qIndex-blankIndex
    const parts = over.id.split("-");
    const qi = Number(parts[1]);
    const bi = Number(parts[2]);

    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);

      // منع نفس الـ bankId يُستخدم مرتين
      const alreadyUsed = copy.flat().some((a) => a?.bankId === bankItem.id);
      if (alreadyUsed) return prev;

      // إزالة الكلمة من مكانها القديم (نفس الكلمة بـ bankId مختلف)
      copy.forEach((row, r) => {
        row.forEach((val, c) => {
          if (val?.word === bankItem.word) copy[r][c] = null;
        });
      });

      copy[qi][bi] = { word: bankItem.word, bankId: bankItem.id };
      return copy;
    });

    setWrongInputs((prev) => prev.filter((w) => w !== `${qi}-${bi}`));
  };

  // ─── Remove on click ───────────────────────────────────────
  const handleRemove = (droppableId) => {
    const parts = droppableId.split("-");
    const qi = Number(parts[1]);
    const bi = Number(parts[2]);

    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[qi][bi] = null;
      return copy;
    });
    setWrongInputs([]);
  };

  // ─── Check ─────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((arr) => arr.some((val) => !val));
    if (hasEmpty) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    let wrong = [];
    let correctCount = 0;

    answers.forEach((arr, qi) => {
      arr.forEach((val, bi) => {
        if (val?.word === data[qi].correct[bi]) {
          correctCount++;
        } else {
          wrong.push(`${qi}-${bi}`);
        }
      });
    });

    setWrongInputs(wrong);
    setLocked(true);

    const totalInputs = data.reduce(
      (acc, item) => acc + item.correct.length,
      0,
    );
    const color =
      correctCount === totalInputs
        ? "green"
        : correctCount === 0
          ? "red"
          : "orange";

    const scoreMessage = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${totalInputs}
        </span>
      </div>
    `;

    correctCount === totalInputs
      ? ValidationAlert.success(scoreMessage)
      : correctCount === 0
        ? ValidationAlert.error(scoreMessage)
        : ValidationAlert.warning(scoreMessage);
  };

  // ─── Show Answer ───────────────────────────────────────────
  const showAnswer = () => {
    const usedBankIds = new Set();
    const filled = data.map((d, qi) =>
      d.correct.map((word, bi) => {
        const bankItem = shuffledBank.find(
          (b) => b.word === word && !usedBankIds.has(b.id),
        );
        if (bankItem) {
          usedBankIds.add(bankItem.id);
          return { word: bankItem.word, bankId: bankItem.id };
        }
        return null;
      }),
    );
    setAnswers(filled);
    setWrongInputs([]);
    setLocked(true);
  };

  // ─── Reset ─────────────────────────────────────────────────
  const reset = () => {
    setAnswers(emptyAnswers());
    setWrongInputs([]);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper">
        <div className="div-forall" style={{ gap: "50px" }}>
          <h3 className="header-title-page8">
            <span className="ex-A">C</span> Drag the words and say the
            sentences.
          </h3>

          {/* ─── Word Bank (مشفّل) ─── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {shuffledBank.map(({ id, word }) => (
              <DraggableWord
                key={id}
                id={id}
                word={word}
                locked={locked}
                isUsed={usedIds.includes(id)}
              />
            ))}
          </div>

          {/* ─── Sentences ─── */}
          {data.map((item, qi) => (
            <div className="row-missing" key={qi}>
              <span className="num">{qi + 1}.</span>
              <div className="sentence-wb-unit4-p6-q3">
                {item.parts.map((p, bi) => (
                  <span
                    key={bi}
                    className="sentence-part"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {p.before}
                    <DroppableBlank
                      droppableId={`blank-${qi}-${bi}`}
                      value={answers[qi][bi]?.word || ""}
                      isWrong={wrongInputs.includes(`${qi}-${bi}`)}
                      locked={locked}
                      onRemove={handleRemove}
                    />
                    {p.after}
                    <img src={p.middleImg} className="middle-img" alt="" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button
            onClick={showAnswer}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answers ✓
          </button>
        </div>
      </div>

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeWord && (
          <div
            style={{
              padding: "7px 14px",
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

export default WB_Unit4_Page6_Q3;
