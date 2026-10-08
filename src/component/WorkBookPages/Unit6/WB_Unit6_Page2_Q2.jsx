import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit6_Page2_Q2.css";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

// 🔹 الصور
import img1 from "../../../assets/U1 WB/U6/U6P34EXED-01.svg";
import img2 from "../../../assets/U1 WB/U6/U6P34EXED-02.svg";
import img3 from "../../../assets/U1 WB/U6/U6P34EXED-03.svg";
import img4 from "../../../assets/U1 WB/U6/U6P34EXED-04.svg";

/* ================= DATA ================= */

const leftParts = [
  { id: 1, text: "He can't" },
  { id: 2, text: "He can't" },
  { id: 3, text: "It can't" },
  { id: 4, text: "I can" },
];

const images = [
  { id: "img1", src: img1 },
  { id: "img2", src: img2 },
  { id: "img3", src: img3 },
  { id: "img4", src: img4 },
];

const rightParts = [
  { id: "r1", text: "sail a boat." },
  { id: "r2", text: "climb a tree." },
  { id: "r3", text: "swim." },
  { id: "r4", text: "ride a bike." },
];

const correctMatches = [
  { leftId: 1, right: "ride a bike.", image: "img3" },
  { leftId: 2, right: "sail a boat.", image: "img4" },
  { leftId: 3, right: "climb a tree.", image: "img2" },
  { leftId: 4, right: "swim.", image: "img1" },
];

const correctSentences = {
  1: "He can't ride a bike.",
  2: "He can't sail a boat.",
  3: "It can't climb a tree.",
  4: "I can swim.",
};

/* ================= DraggableSentence ================= */

const DraggableSentence = ({ sentence, locked, isUsed }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sentence-${sentence}`,
    disabled: locked || isUsed,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "2px 5px",
        border: `2px solid ${isUsed ? "#aaa" : "#2c5287"}`,
        borderRadius: "8px",
        background: isUsed ? "#e0e0e0" : "white",
        fontWeight: "bold",
        color: isUsed ? "#999" : "",
        cursor: locked || isUsed ? "default" : "grab",
        opacity: isDragging ? 0.3 : 1,
        touchAction: "none",
        userSelect: "none",
        transition: "all 0.2s",
      }}
    >
      {sentence}
    </div>
  );
};

/* ================= DroppableWriteBox ================= */

const DroppableWriteBox = ({ id, value, isWrong, locked, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `write-${id}`,
    disabled: locked,
  });

  return (
    <div className="input-wrapper-wb-unit6-p2-q2">
      <div
        ref={setNodeRef}
        className={`write-drop-wb-unit6-p2-q2 ${isOver ? "drag-over-cell" : ""}`}
        onClick={() => !locked && value && onRemove(id)}
        style={{
          background: isOver ? "#e3f2fd" : "",
          cursor: !locked && value ? "pointer" : "default",
          transition: "background 0.15s ease",
          position: "relative",
        }}
        title={!locked && value ? "Click to remove" : ""}
      >
        {value || ""}
        {isWrong && <span className="wrong-input-mark-wb-unit6-p2-q2">✕</span>}
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const WB_Unit6_Page2_Q2 = () => {
  const containerRef = useRef(null);

  const [lines, setLines] = useState([]);
  const [firstPoint, setFirstPoint] = useState(null);
  const [wrongLeft, setWrongLeft] = useState([]);
  const [written, setWritten] = useState({});
  const [locked, setLocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [activeSentence, setActiveSentence] = useState(null);
  const [selectedLeftId, setSelectedLeftId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const usedSentences = Object.values(written).filter(Boolean);

  /* ================= DnD Handlers ================= */

  const handleDragStart = (event) => {
    setActiveSentence(event.active.id.replace("sentence-", ""));
  };

  const handleDragEnd = (event) => {
    setActiveSentence(null);
    if (locked) return;

    const { active, over } = event;
    if (!over || !over.id.startsWith("write-")) return;

    const sentence = active.id.replace("sentence-", "");
    const id = over.id.replace("write-", "");

    setWritten((prev) => {
      const updated = { ...prev };

      // شيل الجملة من أي مكان قديم
      Object.keys(updated).forEach((key) => {
        if (updated[key] === sentence) delete updated[key];
      });

      updated[id] = sentence;
      return updated;
    });
  };

  const handleRemoveWritten = (id) => {
    setWritten((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  /* ================= MATCHING LINE HELPERS ================= */

  const getDotCenter = (parent, selector) => {
    const rect = containerRef.current.getBoundingClientRect();
    const dot = parent.querySelector(selector);
    if (!dot) return null;
    const r = dot.getBoundingClientRect();
    return {
      x: r.left - rect.left + r.width / 2,
      y: r.top - rect.top + r.height / 2,
    };
  };

  const getDotCenterFromParent = (parent, dotSelector) => {
    return getDotCenter(parent, dotSelector);
  };

  /* ================= CLICK HANDLERS ================= */

  const handleStart = (e) => {
    if (locked) return;
    const data = e.currentTarget.dataset;

    let type = null;
    if (data.leftId) type = "left";
    else if (data.image) type = "image";

    let pos = null;
    if (type === "left") {
      pos = getDotCenterFromParent(e.currentTarget, ".start-dot");
      setSelectedLeftId(Number(data.leftId));
      setSelectedImageId(null);
    } else if (type === "image") {
      pos = getDotCenterFromParent(e.currentTarget, ".start-dot");
      setSelectedImageId(data.image);
    } else return;

    if (!pos) return;

    setFirstPoint({
      type,
      leftId: data.leftId ? Number(data.leftId) : null,
      image: data.image || null,
      x: pos.x,
      y: pos.y,
    });
  };

  const handleEnd = (e) => {
    if (!firstPoint || locked) return;
    const data = e.currentTarget.dataset;

    let endType = null;
    if (data.leftId) endType = "left";
    else if (data.image) endType = "image";
    else if (data.right) endType = "right";

    if (firstPoint.type === "left" && endType !== "image") {
      setFirstPoint(null);
      return;
    }
    if (firstPoint.type === "image" && endType !== "right") {
      setFirstPoint(null);
      return;
    }

    let pos = null;
    if (endType === "image" || endType === "right") {
      pos = getDotCenterFromParent(e.currentTarget, ".end-dot");
    }
    if (!pos) return;

    const newLine = {
      x1: firstPoint.x,
      y1: firstPoint.y,
      x2: pos.x,
      y2: pos.y,
      leftId: firstPoint.leftId,
      image: firstPoint.image || data.image,
      right: data.right || null,
    };

    setLines((prev) => {
      let filtered = prev;
      if (firstPoint.type === "left") {
        // امسح أي خط قديم طالع من نفس leftId
        // وأي خط قديم واصل لنفس الصورة من اليسار
        filtered = filtered.filter(
          (l) =>
            l.leftId !== firstPoint.leftId &&
            !(l.image === data.image && l.leftId != null),
        );
      } else if (firstPoint.type === "image") {
        // امسح أي خط قديم طالع من نفس الصورة لليمين
        // وأي خط قديم واصل لنفس right من صورة
        filtered = filtered.filter(
          (l) =>
            !(l.image === firstPoint.image && l.right != null) &&
            !(l.right === data.right && l.right != null),
        );
      }
      return [...filtered, newLine];
    });

    if (firstPoint.type === "left" && endType === "image") {
      const startFromImagePos = getDotCenterFromParent(
        e.currentTarget,
        ".start-dot",
      );
      setSelectedLeftId(null);
      setSelectedImageId(data.image); // ⭐ الصورة تصير selected بعد ربطها باليسار
      setFirstPoint({
        type: "image",
        image: data.image,
        x: startFromImagePos?.x ?? pos.x,
        y: startFromImagePos?.y ?? pos.y,
      });
    } else {
      setSelectedLeftId(null);
      setSelectedImageId(null);
      setFirstPoint(null);
    }
  };

  /* ================= CHECK ================= */

  const checkAnswers = () => {
    if (checked || locked) return;

    const emptyInputs = Object.keys(correctSentences).filter(
      (id) => !written[id] || written[id].trim() === "",
    );
    if (emptyInputs.length > 0) {
      ValidationAlert.info(
        "Pay attention!",
        "Please complete all the sentences before checking.",
      );
      return;
    }

    if (lines.length < correctMatches.length * 2) {
      ValidationAlert.info(
        "Pay attention!",
        "Please connect all the pairs before checking.",
      );
      return;
    }

    let score = 0;
    let wrong = [];
    let wrongInputsArr = [];

    Object.entries(correctSentences).forEach(([id, text]) => {
      const userVal = written[id]?.trim().toLowerCase() || "";
      if (userVal && userVal !== text.toLowerCase()) {
        wrongInputsArr.push(Number(id));
      }
    });

    setWrongInputs(wrongInputsArr);

    correctMatches.forEach((c) => {
      const leftToImg = lines.find(
        (l) => l.leftId === c.leftId && l.image === c.image,
      );
      const imgToRight = lines.find(
        (l) => l.image === c.image && l.right === c.right,
      );

      if (leftToImg && imgToRight) {
        score++;
      } else {
        wrong.push(c.leftId);
      }
    });

    Object.entries(correctSentences).forEach(([id, text]) => {
      if (written[id]?.trim().toLowerCase() === text.toLowerCase()) {
        score++;
      }
    });

    setWrongLeft(wrong);
    setChecked(true);
    setLocked(true);

    const total = correctMatches.length + Object.keys(correctSentences).length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](
      `<div style="font-size:20px;text-align:center;color:${color}"><b>Score: ${score} / ${total}</b></div>`,
    );
  };

  /* ================= SHOW ANSWER ================= */

  const showAnswer = () => {
    const finalLines = [];

    correctMatches.forEach((c) => {
      const leftEl = document.querySelector(`[data-left-id="${c.leftId}"]`);
      const imgEl = document.querySelector(`[data-image="${c.image}"]`);
      const rightEl = document.querySelector(`[data-right="${c.right}"]`);

      if (!leftEl || !imgEl || !rightEl) return;

      const leftDot = getDotCenter(leftEl, ".start-dot");
      const imageEndDot = getDotCenter(imgEl, ".end-dot");
      if (leftDot && imageEndDot) {
        finalLines.push({
          x1: leftDot.x,
          y1: leftDot.y,
          x2: imageEndDot.x,
          y2: imageEndDot.y,
        });
      }

      const imageStartDot = getDotCenter(imgEl, ".start-dot");
      const rightDot = getDotCenter(rightEl, ".end-dot");
      if (imageStartDot && rightDot) {
        finalLines.push({
          x1: imageStartDot.x,
          y1: imageStartDot.y,
          x2: rightDot.x,
          y2: rightDot.y,
        });
      }
    });

    setLines(finalLines);
    setWritten(correctSentences);
    setLocked(true);
    setChecked(true);
    setWrongInputs([]);
    setWrongLeft([]);
  };

  /* ================= RESET ================= */

  const reset = () => {
    setLines([]);
    setWritten({});
    setWrongLeft([]);
    setLocked(false);
    setChecked(false);
    setFirstPoint(null);
    setWrongInputs([]);
    setActiveSentence(null);
    setSelectedLeftId(null);
    setSelectedImageId(null);
  };

  /* ================= RENDER ================= */

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
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "20px" }}>
          <h4 className="header-title-page8">
            <span className="ex-A">D</span>connect the words to the images to
            build sentences.
          </h4>

          {/* ─── Sentence Bank ─── */}
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
            {Object.values(correctSentences).map((sentence) => (
              <DraggableSentence
                key={sentence}
                sentence={sentence}
                locked={locked}
                isUsed={usedSentences.includes(sentence)}
              />
            ))}
          </div>

          {/* ─── Matching Area ─── */}
          <div className="matching-area" ref={containerRef}>
            {/* LEFT */}
            <div className="left-col-wb-unit6-p2-q2">
              {leftParts.map((l, i) => (
                <div
                  key={i}
                  className="item-wb-unit6-p2-q2 clickable"
                  data-left-id={l.id}
                  onClick={handleStart}
                >
                  <span className="num-wb-unit6-p2-q2">{i + 1}</span>
                  <span
                    className={`word-text-wb-unit6-p2-q2 ${selectedLeftId === l.id ? "selected-item" : ""} ${locked ? "disabled-word" : ""}`}
                  >
                    {l.text}
                  </span>
                  <div className="dot-wb-unit6-p2-q2 start-dot" />
                  {wrongLeft.includes(l.id) && checked && (
                    <span className="wrong-mark-wb-unit6-p2-q2">✕</span>
                  )}
                </div>
              ))}
            </div>

            {/* IMAGES */}
            <div className="mid-col-wb-unit6-p2-q2">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="item-wb-unit6-p2-q2 clickable"
                  data-image={img.id}
                  onClick={(e) => (firstPoint ? handleEnd(e) : handleStart(e))}
                >
                  <div className="dot-wb-unit6-p2-q2 end-dot" />
                  <img
                    src={img.src}
                    alt=""
                    className={`matched-img2 ${selectedImageId === img.id ? "selected-item" : ""} ${locked ? "disabled-hover" : ""}`}
                  />
                  <div className="dot-wb-unit6-p2-q2 start-dot" />
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <div className="right-col-wb-unit6-p2-q2">
              {rightParts.map((r) => (
                <div
                  key={r.id}
                  className="item-wb-unit6-p2-q2 clickable"
                  data-right={r.text}
                  onClick={handleEnd}
                >
                  <div className="dot-wb-unit6-p2-q2 end-dot" />
                  <span
                    className={`word-text-wb-unit6-p2-q2 ${locked ? "disabled-word" : ""}`}
                  >
                    {r.text}
                  </span>
                </div>
              ))}
            </div>

            {/* LINES */}
            <svg className="lines-layer">
              {lines.map((l, i) => (
                <line
                  key={i}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="red"
                  strokeWidth="3"
                />
              ))}
            </svg>
          </div>

          {/* ─── Write Section ─── */}
          <div className="write-section-wb-unit6-p2-q2">
            {Object.keys(correctSentences).map((id) => (
              <div key={id} className="write-line-wb-unit6-p2-q2">
                <span>{id}</span>
                <DroppableWriteBox
                  id={id}
                  value={written[id] || ""}
                  isWrong={checked && wrongInputs.includes(Number(id))}
                  locked={locked}
                  onRemove={handleRemoveWritten}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── Buttons ─── */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswer} className="show-answer-btn">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* ─── Drag Overlay ─── */}
      <DragOverlay>
        {activeSentence && (
          <div
            style={{
              padding: "2px 5px",
              border: "2px solid #2c5287",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              cursor: "grabbing",
            }}
          >
            {activeSentence}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit6_Page2_Q2;
