import React, { useState } from "react";
import "./WB_Unit10_Page6_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U10/U10P62EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U10/U10P62EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U10/U10P62EXEA-03.svg";
import img4 from "../../../assets/U1 WB/U10/U10P62EXEA-04.svg";
import img5 from "../../../assets/U1 WB/U10/U10P62EXEA-05.svg";
import img6 from "../../../assets/U1 WB/U10/U10P62EXEA-06.svg";
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
  { img: img1, scrambled: "geg", answer: "egg" },
  { img: img2, scrambled: "ent", answer: "net" },
  { img: img3, scrambled: "tej", answer: "jet" },
  { img: img4, scrambled: "ebd", answer: "bed" },
  { img: img5, scrambled: "neh", answer: "hen" },
  { img: img6, scrambled: "nte", answer: "ten" },
];

// ─── حرف قابل للسحب من الـ scrambled ────────────────────────────────────────
const LetterChip = ({ id, letter, used, locked }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: used || locked,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "2px solid #2c5287",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        cursor: used || locked ? "not-allowed" : "grab",
        background: used ? "#e0e0e0" : "white",
        color: used ? "#aaa" : "",
        opacity: isDragging ? 0.3 : used ? 0.45 : 1,
        userSelect: "none",
        transition: "opacity 0.2s, background 0.2s",
        pointerEvents: used || locked ? "none" : "auto",
        touchAction:"none",
        flexShrink: 0,
      }}
    >
      {letter}
    </div>
  );
};

// ─── Drop zone (المكان اللي تحط فيه الحروف) ──────────────────────────────────
const DropZone = ({ id, placedIds, isWrong, locked, onRemoveLetter }) => {
  const { setNodeRef, isOver } = useDroppable({ id, disabled: locked });

  // استخرج الحرف من الـ id: "0-g-0" → "g"
  const word = placedIds.map((pid) => pid.split("-")[1]).join("");

  return (
    <div
      ref={setNodeRef}
      className={`text-input ${isOver ? "drag-over-cell" : ""}`}
      style={{
        display: "flex",
        gap: "4px",
        minHeight: "44px",
        alignItems: "center",
        padding: "4px 8px",
        // borderRadius: "8px",
        background: isOver ? "#e3f2fd" : "white",
        borderBottom: `2px solid black`,
        transition: "background 0.15s, border-color 0.15s",
        flexWrap: "wrap",
      }}
    >
      {placedIds.map((pid) => {
        const letter = pid.split("-")[1];
        return (
          <div
            key={pid}
            style={{
              // width: 34,
              // height: 34,
              // borderRadius: "50%",
              // border: "2px solid #2c5287",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              // background: "#dbeafe",
              // color: "#2c5287",
              fontSize: "18px",
              cursor: locked ? "default" : "pointer",
              userSelect: "none",
            }}
            title={locked ? "" : "Click to remove"}
            onClick={() => !locked && onRemoveLetter(pid)}
          >
            {letter}
          </div>
        );
      })}

      {/* علامة الخطأ */}
      {isWrong && locked && (
        <div
          className="error-icon"
          style={{ color: "#e53935", fontWeight: "bold" }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
const WB_Unit10_Page6_Q1 = () => {
  // inputs[i] = مصفوفة IDs الحروف اللي انحطت في الـ drop zone للسؤال i
  const [inputs, setInputs] = useState(
    Array.from({ length: data.length }, () => []),
  );
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [locked, setLocked] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null); // { id, letter }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // كل IDs المستخدمة في أي drop zone
  const usedIds = inputs.flat();

  // ─── إزالة حرف من الـ drop zone (كبسة) ───────────────────────────────────
  const removeLetter = (qIndex, letterId) => {
    setInputs((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[qIndex] = copy[qIndex].filter((id) => id !== letterId);
      return copy;
    });
    setWrongInputs(Array(data.length).fill(false));
  };

  // ─── Drag start ────────────────────────────────────────────────────────────
  const handleDragStart = (event) => {
    const id = event.active.id;
    const letter = id.split("-")[1];
    setActiveLetter({ id, letter });
  };

  // ─── Drag end ──────────────────────────────────────────────────────────────
  const handleDragEnd = (event) => {
    setActiveLetter(null);
    if (locked) return;

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id; // مثلاً "0-g-0"
    const dest = over.id; // مثلاً "drop-0"

    if (!dest.startsWith("drop-")) return;

    const qIndex = Number(dest.replace("drop-", ""));
    if (Number.isNaN(qIndex)) return;

    // تأكد الحرف من نفس السؤال
    const fromQIndex = Number(activeId.split("-")[0]);
    if (fromQIndex !== qIndex) return;

    // لا تضيف نفس الحرف مرتين
    if (usedIds.includes(activeId)) return;

    // لا تزيد عن طول الإجابة
    if (inputs[qIndex].length >= data[qIndex].answer.length) return;

    setInputs((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[qIndex] = [...copy[qIndex], activeId];
      return copy;
    });

    setWrongInputs(Array(data.length).fill(false));
  };

  // ─── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    if (inputs.some((arr) => arr.length === 0)) {
      ValidationAlert.info("Please fill in all the answers before checking.");
      return;
    }

    let correctCount = 0;
    const wrongFlags = data.map((item, i) => {
      const word = inputs[i]
        .map((id) => id.split("-")[1])
        .join("")
        .toLowerCase();
      if (word === item.answer) {
        correctCount++;
        return false;
      }
      return true;
    });

    setWrongInputs(wrongFlags);
    setLocked(true);

    const total = data.length;
    const msg = `Score: ${correctCount} / ${total}`;
    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const handleShowAnswer = () => {
    const correct = data.map((item, qIndex) =>
      item.answer.split("").map((ch, i) => `${qIndex}-${ch}-${i}`),
    );
    setInputs(correct);
    setWrongInputs(Array(data.length).fill(false));
    setLocked(true);
  };

  const reset = () => {
    setInputs(Array.from({ length: data.length }, () => []));
    setWrongInputs(Array(data.length).fill(false));
    setLocked(false);
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
          <h3 className="header-title-page8">
            <span className="ex-A">A</span>Drag and drop.
          </h3>

          <div className="unscramble-row-wb-unit10-p6-q1 w-full">
            {data.map((item, index) => (
              <div className="unscramble-box-wb-unit10-p6-q1" key={index}>
                {/* الصورة والرقم */}
                <div className="img-box-wb-unit10-p6-q1">
                  <span
                    className="num"
                    style={{ fontSize: "25px", fontWeight: "600" }}
                  >
                    {index + 1}
                  </span>
                  <img src={item.img} alt="" className="img-wb-unit10-p6-q1" />
                </div>

                <div className="input-row">
                  {/* ─── الحروف المبعثرة ─── */}
                  <span className="pattern" style={{ fontSize: "22px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {item.scrambled.split("").map((ch, i) => {
                        const id = `${index}-${ch}-${i}`;
                        return (
                          <LetterChip
                            key={id}
                            id={id}
                            letter={ch}
                            used={usedIds.includes(id)}
                            locked={locked}
                          />
                        );
                      })}
                    </div>
                  </span>

                  {/* ─── Drop zone ─── */}
                  <div className="input-wrapper">
                    <DropZone
                      id={`drop-${index}`}
                      placedIds={inputs[index]}
                      isWrong={wrongInputs[index]}
                      locked={locked}
                      onRemoveLetter={(letterId) =>
                        removeLetter(index, letterId)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Buttons ──────────────────────────────────────────────────── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
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

      {/* ─── Drag Overlay ─────────────────────────────────────────────── */}
      <DragOverlay>
        {activeLetter ? (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid #2c5287",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              background: "white",
              color: "#2c5287",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeLetter.letter}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit10_Page6_Q1;
