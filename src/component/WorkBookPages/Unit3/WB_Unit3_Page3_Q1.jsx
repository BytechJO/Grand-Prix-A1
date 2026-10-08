import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import bat from "../../../assets/U1 WB/U3/SVG/U3P17EXEE-01.svg";
import cap from "../../../assets/U1 WB/U3/SVG/U3P17EXEE-02.svg";
import ant from "../../../assets/U1 WB/U3/SVG/U3P17EXEE-03.svg";
import dad from "../../../assets/U1 WB/U3/SVG/U3P17EXEE-04.svg";
import dad2 from "../../../assets/U1 WB/U3/SVG/U3P17EXEE-05.svg";
import dad3 from "../../../assets/U1 WB/U3/SVG/U3P17EXEE-06.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit3_Page3_Q1.css";

// ─── BankItem ───────────────────────────────────────────────────────────────
// كلمة داخل الـ word bank — تصير disabled لو مستخدمة
const BankItem = ({ word, disabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `bank-${word}`,
    data: { word, source: "bank" },
    disabled,
  });

  return (
    <span
      ref={setNodeRef}
      {...(disabled ? {} : listeners)}
      {...(disabled ? {} : attributes)}
      style={{
        padding: "7px 7px",
        border: "2px solid",
        borderColor: disabled ? "#ccc" : "#2c5287",
        borderRadius: "8px",
        background: disabled ? "#f0f0f0" : "white",
        fontWeight: "bold",
        cursor: disabled ? "default" : isDragging ? "grabbing" : "grab",
        opacity: disabled ? 0.45 : isDragging ? 0.3 : 1,
        transition: "opacity 0.15s, border-color 0.15s",
        userSelect: "none",
        touchAction:"none",
        color: disabled ? "#aaa" : "inherit",
      }}
    >
      {word}
    </span>
  );
};

// ─── SlotDroppable ───────────────────────────────────────────────────────────
// الخانة الواحدة — الكليك عليها يرجع الكلمة للبنك
const SlotDroppable = ({
  index, value, locked, isWrong, onClear,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${index}`,
    disabled: locked,
  });

  return (
    <div
      ref={setNodeRef}
      className={`q-input-wb-unit3-page3-q1 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        background: isOver ? "#e3f2fd" : "white",
        position: "relative",
        cursor: value && !locked ? "pointer" : "default",
      }}
      onClick={() => {
        if (value && !locked) onClear(index);
      }}
      title={value && !locked ? "اضغط لإرجاع الكلمة" : ""}
    >
      {value && (
        <span style={{ pointerEvents: "none", userSelect: "none" }}>
          {value}
        </span>
      )}
      {isWrong && (
        <span className="error-mark-input-wb-unit2-page3-q2">✕</span>
      )}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const images = [bat, cap, ant, dad, dad2, dad3];

const correctAnswers = [
  "Take out your pencil.",
  "Listen!",
  "Make a line.",
  "Open your book.",
  "Quiet!",
  "Close your book.",
];

const shuffleArray = (arr) => {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
};

const WB_Unit3_Page3_Q1 = () => {
  const [bank, setBank] = useState([]);
  const [slots, setSlots] = useState(Array(6).fill(null));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    setBank(shuffleArray(correctAnswers));
    setSlots(Array(6).fill(null));
  }, []);

  // ─── الكلمات المستخدمة ─────────────────────────────────────────────────────
  const usedWords = new Set(slots.filter(Boolean));

  // ─── Drag Start ───────────────────────────────────────────────────────────
  const handleDragStart = (event) => {
    const { data } = event.active;
    setActiveWord(data.current?.word ?? null);
  };

  // ─── Drag End ─────────────────────────────────────────────────────────────
  const handleDragEnd = (event) => {
    setActiveWord(null);
    const { active, over } = event;
    if (!over) return;

    const overId = over.id;
    const word = active.data.current?.word;
    const source = active.data.current?.source;

    if (!overId.startsWith("slot-") || !word) return;
    const targetIndex = Number(overId.replace("slot-", ""));

    setSlots((prev) => {
      const copy = [...prev];

      // لو الكلمة كانت في slot ثاني، نفضّيه
      if (source === "slot") {
        const fromIndex = active.data.current.slotIndex;
        if (fromIndex === targetIndex) return copy;
        copy[fromIndex] = null;
      }

      // لو في الـ target كلمة، ما تحل محلها (اختياري — شيل السطر لو بدك تبدلهم)
      // if (copy[targetIndex]) return copy;

      copy[targetIndex] = word;
      return copy;
    });
  };

  // ─── إرجاع كلمة من slot للبنك (كليك) ─────────────────────────────────────
  const clearSlot = (index) => {
    if (locked) return;
    setSlots((prev) => {
      const copy = [...prev];
      copy[index] = null;
      return copy;
    });
  };

  // ─── Normalize ────────────────────────────────────────────────────────────
  const normalizeText = (text) =>
    text.toLowerCase().replace(/[.!?]/g, "").replace(/\s+/g, " ").trim();

  // ─── Check ────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;
    if (slots.some((s) => !s)) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }
    let correct = 0;
    const wrong = [];
    slots.forEach((s, i) => {
      if (normalizeText(s) === normalizeText(correctAnswers[i])) correct++;
      else wrong.push(i);
    });
    setWrongInputs(wrong);
    setLocked(true);
    const total = correctAnswers.length;
    const color = correct === total ? "green" : correct === 0 ? "red" : "orange";
    ValidationAlert[correct === total ? "success" : correct === 0 ? "error" : "warning"](
      `<div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correct} / ${total}</span>
       </div>`
    );
  };

  const showAnswers = () => {
    setSlots([...correctAnswers]);
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setBank(shuffleArray(correctAnswers));
    setSlots(Array(6).fill(null));
    setWrongInputs([]);
    setLocked(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        className="question-wrapper-unit3-page6-q1"
        style={{ display: "flex", flexDirection: "column",
                 justifyContent: "center", alignItems: "center", padding: "30px" }}
      >
        <div className="div-forall" style={{ gap: "20px" }}>
          <h5 className="header-title-page8">
            <span className="ex-A">E</span>Drag and drop.
          </h5>

          {/* ── Word Bank ─────────────────────────────── */}
          <div style={{
            display: "grid", gap: "10px", padding: "10px", width: "100%",
            border: "2px dashed #ccc", borderRadius: "10px",
            alignItems: "center", gridTemplateColumns: "1fr 1fr 1fr",
          }}>
            {bank.map((w) => (
              <BankItem
                key={w}
                word={w}
                disabled={usedWords.has(w) || locked}
              />
            ))}
          </div>

          {/* ── Slots ─────────────────────────────────── */}
          <div className="row-content10-wb-unit3-page3-q1">
            {images.map((img, i) => (
              <div key={i} className="row2-unit3-page6-q1" style={{ alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <span className="num-span">{i + 1}</span>
                  <img src={img} alt="" className="q-img-wb-unit3-page3-q2" />
                </div>
                <SlotDroppable
                  index={i}
                  value={slots[i]}
                  locked={locked}
                  isWrong={wrongInputs.includes(i)}
                  onClear={clearSlot}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Buttons ───────────────────────────────── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">Start Again ↻</button>
          <button onClick={showAnswers} className="show-answer-btn swal-continue">Show Answer</button>
          <button onClick={checkAnswers} className="check-button2">Check Answer ✓</button>
        </div>
      </div>

      {/* ── Drag Overlay (الكلمة اللي تحت الماوس أثناء السحب) */}
      <DragOverlay>
        {activeWord ? (
          <span style={{
            padding: "7px 10px", border: "2px solid #2c5287",
            borderRadius: "8px", background: "white",
            fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            cursor: "grabbing",
          }}>
            {activeWord}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit3_Page3_Q1;