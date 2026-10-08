import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page8_Q2.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

function BankWord({ word, id, isUsed, disabled }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || disabled,
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
        color: isUsed ? "#aaa" : "inherit",
        fontWeight: "bold",
        cursor: isUsed || disabled ? "default" : "grab",
        opacity: isDragging ? 0.4 : isUsed ? 0.5 : 1,
        userSelect: "none",
        touchAction: "none",
        pointerEvents: isUsed ? "none" : "auto",
        ...( isUsed ? { borderColor: "#ccc" } : {} ),
      }}
    >
      {word}
    </span>
  );
}

function DroppableCell({ id, value, isWrong, showAnswer, locked, onClear }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} style={{ position: "relative" }}>
      <input
        className={`missing-input-wb-unit1-p8-q2 ${isOver ? "drag-over-cell" : ""}`}
        value={value}
        readOnly
        disabled={showAnswer || locked}
        onClick={() => {
          if (value && !showAnswer && !locked) onClear(id, value);
        }}
        style={{
          cursor: value && !showAnswer && !locked ? "pointer" : "default",
        }}
      />
      {isWrong && value.trim() !== "" && (
        <span className="wrong-x-circle-wb-u1-p8-q2">✕</span>
      )}
    </div>
  );
}

export default function WB_Unit1_Page8_Q2() {
  const correctWords = ["table", "dish", "duck", "tiger", "taxi", "deer"];

  const [columnD, setColumnD] = useState(["", "", ""]);
  const [columnT, setColumnT] = useState(["", "", ""]);
  const [wrong, setWrong] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);
  const [activeWord, setActiveWord] = useState(null);

  const usedWords = [...columnD, ...columnT].filter((w) => w !== "");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const handleDragStart = (event) => {
    const parts = event.active.id.split("-");
    const word = parts.slice(1, parts.length - 1).join("-");
    setActiveWord(word);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    const { active, over } = event;
    if (!over || showAnswer) return;

    const parts = active.id.split("-");
    const word = parts.slice(1, parts.length - 1).join("-");
    const [col, idx] = over.id.split("-");
    const index = parseInt(idx);

    let newColumnD = [...columnD];
    let newColumnT = [...columnT];

    newColumnD = newColumnD.map((v) => (v === word ? "" : v));
    newColumnT = newColumnT.map((v) => (v === word ? "" : v));

    if (col === "d") {
      newColumnD[index] = word;
    } else if (col === "t") {
      newColumnT[index] = word;
    }

    setColumnD(newColumnD);
    setColumnT(newColumnT);
    setWrong([]);
  };

  const handleClear = (cellId, word) => {
    const [col, idx] = cellId.split("-");
    const index = parseInt(idx);
    if (col === "d") {
      const newColumnD = [...columnD];
      newColumnD[index] = "";
      setColumnD(newColumnD);
    } else {
      const newColumnT = [...columnT];
      newColumnT[index] = "";
      setColumnT(newColumnT);
    }
    setWrong((prev) => prev.filter((w) => w !== word));
  };

  const checkAnswers = () => {
    if (showAnswer || locked) return;

    const allInputs = [...columnD, ...columnT];
    const hasEmpty = allInputs.some((w) => w.trim() === "");

    if (hasEmpty) {
      return ValidationAlert.info(
        "Oops!",
        "Please complete all answers before checking.",
      );
    }

    let wrongWords = [];
    setLocked(true);

    columnD.forEach((w) => {
      if (!correctWords.includes(w) || !w.startsWith("d")) wrongWords.push(w);
    });

    columnT.forEach((w) => {
      if (!correctWords.includes(w) || !w.startsWith("t")) wrongWords.push(w);
    });

    setWrong(wrongWords);

    const total = correctWords.length;
    const correctCount = total - wrongWords.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showCorrectAnswers = () => {
    setColumnD(correctWords.filter((w) => w.startsWith("d")));
    setColumnT(correctWords.filter((w) => w.startsWith("t")));
    setWrong([]);
    setShowAnswer(true);
  };

  const reset = () => {
    setColumnD(["", "", ""]);
    setColumnT(["", "", ""]);
    setWrong([]);
    setShowAnswer(false);
    setLocked(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="page8-wrapper" style={{ padding: "30px" }}>
        <div className="div-forall" style={{}}>
          <h3 className="header-title-page8">
            <span className="ex-A">B</span>
            Drag and drop the words.
          </h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "10px",
              border: "2px dashed #ccc",
              width: "100%",
              borderRadius: "10px",
              margin: "10px 0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {correctWords.map((w, i) => (
              <BankWord
                key={`bank-${w}-${i}`}
                id={`bank-${w}-${i}`}
                word={w}
                isUsed={usedWords.includes(w)}
                disabled={locked || showAnswer}
              />
            ))}
          </div>

          <div className="table-div-wb-u1-p8-q2 w-full">
            <table className="sorting-table-wb-u1-p8-q2">
              <thead>
                <tr>
                  <th>d</th>
                  <th>t</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2].map((row, i) => (
                  <tr key={i}>
                    <td style={{ position: "relative" }}>
                      <DroppableCell
                        id={`d-${i}`}
                        value={columnD[i]}
                        isWrong={wrong.includes(columnD[i]) && columnD[i] !== ""}
                        showAnswer={showAnswer}
                        locked={locked}
                        onClear={handleClear}
                      />
                    </td>
                    <td style={{ position: "relative" }}>
                      <DroppableCell
                        id={`t-${i}`}
                        value={columnT[i]}
                        isWrong={wrong.includes(columnT[i]) && columnT[i] !== ""}
                        showAnswer={showAnswer}
                        locked={locked}
                        onClear={handleClear}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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

      <DragOverlay>
        {activeWord && (
          <span
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              cursor: "grabbing",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {activeWord}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
}