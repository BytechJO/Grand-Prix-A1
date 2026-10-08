import React, { useState, useEffect } from "react";
import bat from "../../../assets/U1 WB/U4/U4P21EXEB-01.svg";
import cap from "../../../assets/U1 WB/U4/U4P21EXEB-02.svg";
import ant from "../../../assets/U1 WB/U4/U4P21EXEB-03.svg";
import dad from "../../../assets/U1 WB/U4/U4P21EXEB-04.svg";
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
import "./WB_Unit4_Page1_Q2.css";

const questions = [
  {
    img: bat,
    parts: [
      { type: "text", value: "It's a brown " },
      { type: "input", answer: "cow" },
      { type: "text", value: "." },
    ],
  },
  {
    img: cap,
    parts: [
      { type: "input", answer: "It's a" },
      { type: "text", value: " yellow " },
      { type: "input", answer: "boat" },
      { type: "text", value: "." },
    ],
  },
  {
    img: ant,
    parts: [
      { type: "input", answer: "It's a" },
      { type: "text", value: " blue bird." },
    ],
  },
  {
    img: dad,
    parts: [
      { type: "input", answer: "It's a" },
      { type: "text", value: " red " },
      { type: "input", answer: "ball" },
      { type: "text", value: "." },
    ],
  },
];

const wordBank = questions.flatMap((q, qIndex) =>
  q.parts
    .filter((p) => p.type === "input")
    .map((p, pIndex) => ({ word: p.answer, id: `bank-${qIndex}-${pIndex}` }))
);

// ─── Draggable Word ───────────────────────────────────────────────
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
    </span>
  );
};

// ─── Droppable Input Blank ────────────────────────────────────────
const DroppableInputBlank = ({ droppableId, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    disabled: locked,
  });

  return (
    <span style={{ position: "relative" }}>
      <span ref={setNodeRef}>
        <input
          type="text"
          className={`inline-input-wb-unit4-p1-q2 ${isOver ? "drag-over-cell" : ""}`}
          value={value?.word || ""}
          readOnly
          disabled={locked}
          onClick={() => !locked && value && onRemove(droppableId)}
          style={{
            background: isOver ? "#e3f2fd" : "",
            cursor: !locked && value ? "pointer" : "default",
          }}
          title={!locked && value ? "Click to remove" : ""}
        />
      </span>
      {isWrong && (
        <span className="error-mark-input-wb-unit2-page3-q2">✕</span>
      )}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────
const WB_Unit4_Page1_Q2 = () => {
  const emptyAnswers = () =>
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? null : null)));

  const [answers, setAnswers] = useState(emptyAnswers());
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const [selectedColors, setSelectedColors] = useState(questions.map(() => null));
  const [activePaletteIndex, setActivePaletteIndex] = useState(null);
  const [svgContent, setSvgContent] = useState({});

  const paletteColors = ["brown", "rgb(255, 187, 0)", "blue", "red"];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // ─── Load SVGs ───────────────────────────────────────────────
  useEffect(() => {
    const loadSvgs = async () => {
      const files = [bat, cap, ant, dad];
      const contents = await Promise.all(
        files.map((file) =>
          fetch(file)
            .then((r) => r.text())
            .then((text) =>
              text
                .replaceAll('fill="none"', 'fill="currentColor"')
                .replaceAll(/stroke="[^"]*"/g, 'stroke="currentColor"')
            )
        )
      );
      setSvgContent(contents);
    };
    loadSvgs();
  }, []);

  // ─── usedIds للتتبع بالـ id مش الكلمة ───────────────────────
  const usedIds = answers.flat().filter(Boolean).map((a) => a.bankId);

  // ─── Drag Handlers ───────────────────────────────────────────
  const handleDragStart = (event) => {
    const bankItem = wordBank.find((item) => item.id === event.active.id);
    setActiveWord(bankItem?.word ?? null);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("blank-")) return;

    const bankItem = wordBank.find((item) => item.id === active.id);
    if (!bankItem) return;

    const parts = over.id.split("-");
    const qi = Number(parts[1]);
    const pi = Number(parts[2]);

    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);

      // منع نفس الـ bankId يُستخدم مرتين
      const alreadyUsed = copy.flat().some((a) => a?.bankId === bankItem.id);
      if (alreadyUsed) return prev;

      // إزالة نفس الكلمة من نفس السؤال لو موجودة بـ id مختلف
      copy[qi] = copy[qi].map((a) => (a?.word === bankItem.word ? null : a));

      copy[qi][pi] = { word: bankItem.word, bankId: bankItem.id };
      return copy;
    });

    setWrongInputs([]);
  };

  // ─── Remove on click ─────────────────────────────────────────
  const handleRemoveFromBlank = (droppableId) => {
    const parts = droppableId.split("-");
    const qi = Number(parts[1]);
    const pi = Number(parts[2]);

    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[qi][pi] = null;
      return copy;
    });
    setWrongInputs([]);
  };

  // ─── Check ───────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    // فحص الخانات الفاضية
    for (let qi = 0; qi < questions.length; qi++) {
      for (let pi = 0; pi < questions[qi].parts.length; pi++) {
        const part = questions[qi].parts[pi];
        if (part.type === "input" && !answers[qi][pi]) {
          ValidationAlert.info(`Please complete question ${qi + 1}.`);
          return;
        }
      }
    }

    let wrong = [];
    let score = 0;
    let total = 0;

    questions.forEach((q, qi) => {
      q.parts.forEach((p, pi) => {
        if (p.type === "input") {
          total++;
          if (answers[qi][pi]?.word?.trim() === p.answer) {
            score++;
          } else {
            wrong.push(`${qi}-${pi}`);
          }
        }
      });
    });

    setWrongInputs(wrong);
    setLocked(true);

    const msg = `Score: ${score} / ${total}`;
    score === total
      ? ValidationAlert.success(msg)
      : score === 0
      ? ValidationAlert.error(msg)
      : ValidationAlert.warning(msg);
  };

  // ─── Show Answer ─────────────────────────────────────────────
  const showAnswers = () => {
    const filled = questions.map((q, qi) =>
      q.parts.map((p, pi) => {
        if (p.type !== "input") return null;
        // نبحث عن الـ bankItem اللي إجابته تساوي p.answer
        // لو في تكرار (زي "It's a") نتأكد ما نستخدم نفس الـ id مرتين
        return null; // placeholder — بنحسبها تدريجياً تحت
      })
    );

    // نبني الإجابات بشكل يضمن كل bankId يُستخدم مرة وحدة بس
    const usedBankIds = new Set();
    const result = questions.map((q, qi) =>
      q.parts.map((p, pi) => {
        if (p.type !== "input") return null;
        const bankItem = wordBank.find(
          (b) => b.word === p.answer && !usedBankIds.has(b.id)
        );
        if (bankItem) {
          usedBankIds.add(bankItem.id);
          return { word: bankItem.word, bankId: bankItem.id };
        }
        return null;
      })
    );

    setAnswers(result);
    setWrongInputs([]);
    setLocked(true);
  };

  // ─── Reset ───────────────────────────────────────────────────
  const reset = () => {
    setAnswers(emptyAnswers());
    setWrongInputs([]);
    setLocked(false);
    setSelectedColors(questions.map(() => null));
    setActivePaletteIndex(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="question-wrapper-unit3-page6-q1"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall">
          <div className="w-full">
            <h5 className="header-title-page8">
              <span className="ex-A">B</span>Drag and color the pictures.
            </h5>
            <span style={{ fontSize: "14px", color: "gray" }}>
              Hint: Double Click to Color Word
            </span>
          </div>

          {/* ─── Word Bank ─── */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              borderRadius: "10px",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {wordBank.map(({ id, word }) => (
              <DraggableWord
                key={id}
                id={id}
                word={word}
                locked={locked}
                isUsed={usedIds.includes(id)} // ✅ بالـ id مش الكلمة
              />
            ))}
          </div>

          {/* ─── Questions ─── */}
          <div className="content-container-wb-unit4-p1-q2">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="row2-wb-unit4-p1-q2">
                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="num-span">{qIndex + 1}</span>
                  {svgContent[qIndex] ? (
                    <div
                      className="svg-wrapper wb-svg-colorable"
                      style={{ color: selectedColors[qIndex] || "transparent" }}
                      onDoubleClick={() => setActivePaletteIndex(qIndex)}
                      onTouchStart={() => setActivePaletteIndex(qIndex)}
                      dangerouslySetInnerHTML={{ __html: svgContent[qIndex] }}
                    />
                  ) : (
                    <div className="svg-placeholder">Loading...</div>
                  )}
                </div>

                {activePaletteIndex === qIndex && (
                  <div className="color-palette-wb-unit4-p1-q2">
                    {paletteColors.map((color) => (
                      <button
                        key={color}
                        className="color-circle"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          const copy = [...selectedColors];
                          copy[qIndex] = color;
                          setSelectedColors(copy);
                          setActivePaletteIndex(null);
                        }}
                      />
                    ))}
                  </div>
                )}

                <div className="sentence-wrapper-wb-unit4-p1-q2">
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text") {
                      return (
                        <span key={pIndex} className="sentence-text">
                          {part.value}
                        </span>
                      );
                    }
                    return (
                      <DroppableInputBlank
                        key={pIndex}
                        droppableId={`blank-${qIndex}-${pIndex}`}
                        value={answers[qIndex][pIndex]}
                        isWrong={wrongInputs.includes(`${qIndex}-${pIndex}`)}
                        locked={locked}
                        onRemove={handleRemoveFromBlank}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswers} className="show-answer-btn swal-continue">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeWord && (
          <span
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
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit4_Page1_Q2;