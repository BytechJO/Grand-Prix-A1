import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit4_Page6_Q2.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import img1 from "../../../assets/U1 WB/U4/U4P26EXEB-01.svg";
import img2 from "../../../assets/U1 WB/U4/U4P26EXEB-02.svg";
import img3 from "../../../assets/U1 WB/U4/U4P26EXEB-03.svg";
import img4 from "../../../assets/U1 WB/U4/U4P26EXEB-04.svg";
import img5 from "../../../assets/U1 WB/U4/U4P26EXEB-05.svg";
import img6 from "../../../assets/U1 WB/U4/U4P26EXEB-06.svg";

const correctWords = ["fish", "feet", "fork", "vet", "van", "vest"];
const images = [img1, img2, img3, img4, img5, img6];

// ─── Draggable Word ───────────────────────────────────────────────
const DraggableWord = ({ word, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `word-${word}`,
    disabled: locked || isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="word-box-wb-unit4-p4-q1"
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

// ─── Droppable Cell ───────────────────────────────────────────────
const DroppableCell = ({ droppableId, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableId,
    disabled: locked,
  });

  return (
    <div
      ref={setNodeRef}
      className={`input-cell-wb-unit4-p6-q2 ${isOver ? "drag-over-cell" : ""}`}
      onClick={() => !locked && value && onRemove(droppableId)}
      style={{
        position: "relative",
        background: isOver ? "#e3f2fd" : "",
        cursor: !locked && value ? "pointer" : "default",
        transition: "background 0.15s ease",
      }}
      title={!locked && value ? "Click to remove" : ""}
    >
      {value}
      {isWrong && value && (
        <span className="wrong-x-circle-wb-u1-p8-q2">✕</span>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────
export default function WB_Unit4_Page6_Q2() {
  const [columnF, setColumnF] = useState(["", "", ""]);
  const [columnV, setColumnV] = useState(["", "", ""]);
  const [wrong, setWrong] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  // الكلمات المستخدمة في الكولمنين
  const usedWords = [...columnF, ...columnV].filter(Boolean);

  // ─── Drag Handlers ───────────────────────────────────────────
  const handleDragStart = (event) => {
    setActiveWord(event.active.id.replace("word-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    if (locked) return;

    const { active, over } = event;
    if (!over) return;

    const word = active.id.replace("word-", "");
    const dest = over.id; // "f-0", "v-1", ...

    if (dest.startsWith("f-")) {
      const index = Number(dest.split("-")[1]);
      setColumnF((prev) => {
        const updated = [...prev];
        // إزالة الكلمة من أي مكان ثاني في نفس الكولمن
        const existingF = updated.indexOf(word);
        if (existingF !== -1) updated[existingF] = "";
        // إزالتها من الكولمن الثاني لو موجودة
        setColumnV((prevV) => {
          const copy = [...prevV];
          const existingV = copy.indexOf(word);
          if (existingV !== -1) copy[existingV] = "";
          return copy;
        });
        updated[index] = word;
        return updated;
      });
    } else if (dest.startsWith("v-")) {
      const index = Number(dest.split("-")[1]);
      setColumnV((prev) => {
        const updated = [...prev];
        const existingV = updated.indexOf(word);
        if (existingV !== -1) updated[existingV] = "";
        setColumnF((prevF) => {
          const copy = [...prevF];
          const existingF = copy.indexOf(word);
          if (existingF !== -1) copy[existingF] = "";
          return copy;
        });
        updated[index] = word;
        return updated;
      });
    }

    setWrong((prev) => prev.filter((w) => w !== word));
  };

  // ─── Remove on click ─────────────────────────────────────────
  const handleRemove = (droppableId) => {
    if (droppableId.startsWith("f-")) {
      const index = Number(droppableId.split("-")[1]);
      setColumnF((prev) => {
        const copy = [...prev];
        copy[index] = "";
        return copy;
      });
    } else if (droppableId.startsWith("v-")) {
      const index = Number(droppableId.split("-")[1]);
      setColumnV((prev) => {
        const copy = [...prev];
        copy[index] = "";
        return copy;
      });
    }
    setWrong([]);
  };

  // ─── Check ───────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    const allInputs = [...columnF, ...columnV];
    if (allInputs.some((w) => !w || w.trim() === "")) {
      return ValidationAlert.info(
        "Please complete all answers before checking.",
      );
    }

    let wrongWords = [];
    columnF.forEach((w) => {
      if (!w.startsWith("f")) wrongWords.push(w);
    });
    columnV.forEach((w) => {
      if (!w.startsWith("v")) wrongWords.push(w);
    });

    setWrong(wrongWords);
    setLocked(true);

    const total = correctWords.length;
    const correctCount = total - wrongWords.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">Score: ${correctCount} / ${total}</span>
      </div>
    `;

    correctCount === total
      ? ValidationAlert.success(msg)
      : correctCount === 0
        ? ValidationAlert.error(msg)
        : ValidationAlert.warning(msg);
  };

  // ─── Show Answer ─────────────────────────────────────────────
  const showCorrectAnswers = () => {
    setColumnF(correctWords.filter((w) => w.startsWith("f")));
    setColumnV(correctWords.filter((w) => w.startsWith("v")));
    setWrong([]);
    setLocked(true);
  };

  // ─── Reset ───────────────────────────────────────────────────
  const reset = () => {
    setColumnF(["", "", ""]);
    setColumnV(["", "", ""]);
    setWrong([]);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper" style={{ padding: "30px" }}>
        <div className="div-forall" style={{  }}>
          <h3 className="header-title-page8">
            <span className="ex-A">B</span> Drag and drop.
          </h3>

          {/* ─── Word Bank ─── */}
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
            {correctWords.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                locked={locked}
                isUsed={usedWords.includes(word)}
              />
            ))}
          </div>

          <div className="content-container-wb-unit4-p6-q2">
            {/* ─── Image Bank ─── */}
            <div className="img-bank-wb-unit4-p6-q2">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={correctWords[i]}
                  style={{ height: "100px", width: "auto" }}
                />
              ))}
            </div>

            {/* ─── Table ─── */}
            <div className="table-div-wb-unit4-p6-q2">
              <table className="sorting-table-wb-unit4-p6-q2">
                <thead>
                  <tr>
                    <th>f</th>
                    <th>v</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2].map((i) => (
                    <tr key={i}>
                      <td style={{ position: "relative" }}>
                        <DroppableCell
                          droppableId={`f-${i}`}
                          value={columnF[i]}
                          isWrong={wrong.includes(columnF[i])}
                          locked={locked}
                          onRemove={handleRemove}
                        />
                      </td>
                      <td style={{ position: "relative" }}>
                        <DroppableCell
                          droppableId={`v-${i}`}
                          value={columnV[i]}
                          isWrong={wrong.includes(columnV[i])}
                          locked={locked}
                          onRemove={handleRemove}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button
            className="show-answer-btn swal-continue"
            onClick={showCorrectAnswers}
          >
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswers}>
            Check Answer ✓
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
}
