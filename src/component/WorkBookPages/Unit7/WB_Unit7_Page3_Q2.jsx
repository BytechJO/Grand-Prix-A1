import React, { useMemo, useState } from "react";
import "./WB_Unit7_Page3_Q2.css";
import img1 from "../../../assets/U1 WB/U7/U7P41EXEF-01.svg";
import img2 from "../../../assets/U1 WB/U7/U7P41EXEF-02.svg";
import img3 from "../../../assets/U1 WB/U7/U7P41EXEF-03.svg";
import img4 from "../../../assets/U1 WB/U7/U7P41EXEF-04.svg";
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

// ─── ثوابت ───────────────────────────────────────────────────────────────────
const WORD_BANK = [
  { id: "w1", text: "I am." },
  { id: "w2", text: "happy?" },
  { id: "w3", text: "hungry?" },
  { id: "w4", text: "Yes, I am." },
  { id: "w5", text: "Are you bored?" },
  { id: "w6", text: "Yes, I am." },
];

const CORRECT_MAP = {
  input1: "w1",
  input2: "w2",
  input3: "w3",
  input4: "w4",
  input5: "w5",
  input6: "w6",
};

const INITIAL_ANSWERS = {
  input1: null,
  input2: null,
  input3: null,
  input4: null,
  input5: null,
  input6: null,
};

// ─── WordChip ────────────────────────────────────────────────────────────────
const WordChip = ({ id, text, isUsed, isDisabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: isUsed || isDisabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: "2px solid #2c5287",
        borderRadius: 8,
        background: "white",
        fontWeight: "bold",
        fontSize: 15,
        cursor: isUsed || isDisabled ? "not-allowed" : "grab",
        opacity: isUsed ? 0.35 : isDragging ? 0.5 : 1,
        pointerEvents: isUsed ? "none" : undefined,
        userSelect: "none",
        transition: "opacity .2s",
        touchAction:"none",
        alignSelf: "center",
      }}
    >
      {text}
    </div>
  );
};

// ─── DropInput ────────────────────────────────────────────────────────────────
const DropInput = ({ id, value, isWrong, isLocked, onReturn }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-${id}` });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !isLocked && value && onReturn(id)}
      title={value && !isLocked ? "اضغط لإرجاع الكلمة" : ""}
      className={`answer-input-wb-unit6-p4-q2 ${isOver ? "drag-over-cell" : ""}`}
      style={{
        height:       36,
        // ✅ بدل width: "100%" — خلّيه يتمدد بس بحد معقول
        minWidth:     100,   // حد أدنى لما يكون فاضي
        width:        "auto",
        flexGrow:     1,     // يأخذ المساحة المتاحة فقط داخل الـ flex parent
        flexShrink:   0,
        maxWidth:     220,   // حد أقصى حسب أطول كلمة عندك
        borderBottom: `2px solid ${isWrong ? "#E24B4A" : "black"}`,
        fontSize:     20,
        display:      "flex",
        alignItems:   "flex-end",
        cursor:       value && !isLocked ? "pointer" : "default",
        position:     "relative",
        transition:   "background .15s",
        borderRadius: "4px 4px 0 0",
        overflow:     "hidden",
        whiteSpace:   "nowrap",
        boxSizing:    "border-box",
      }}
    >
      {value || ""}
      {isWrong && <span className="error-mark-input1">✕</span>}
    </div>
  );
};
// ─── Main Component ───────────────────────────────────────────────────────────
const WB_Unit7_Page3_Q2 = () => {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS); // { inputX: wordId | null }
  const [wrongWords, setWrongWords] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const getTextById = (id) => WORD_BANK.find((w) => w.id === id)?.text || "";

  // الكلمات المستخدمة
  const usedWordIds = new Set(Object.values(answers).filter(Boolean));

  const activeWord = WORD_BANK.find((w) => w.id === activeId);

  // ─── Drag End ──────────────────────────────────────────────────────────────
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || locked) return;

    const wordId = active.id;
    const dropId = over.id.replace("drop-", ""); // "input1" etc

    setAnswers((prev) => {
      const updated = { ...prev };

      // لو الكلمة كانت بـ input ثاني → فرّغه
      const oldInput = Object.keys(updated).find((k) => updated[k] === wordId);
      if (oldInput) updated[oldInput] = null;

      // لو الـ input فيه كلمة ثانية → شيلها (ترجع للبنك)
      if (updated[dropId] && updated[dropId] !== wordId) {
        updated[dropId] = null;
      }

      updated[dropId] = wordId;
      return updated;
    });

    setWrongWords([]);
  };

  // ─── Return to bank ────────────────────────────────────────────────────────
  const handleReturn = (inputId) => {
    if (locked) return;
    setAnswers((prev) => ({ ...prev, [inputId]: null }));
    setWrongWords([]);
  };

  // ─── Check ─────────────────────────────────────────────────────────────────
  const checkAnswers = () => {
    if (locked) return;

    const allFilled = Object.values(answers).every((v) => v);
    if (!allFilled) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let correctCount = 0;
    const wrong = [];

    Object.entries(CORRECT_MAP).forEach(([inputId, correctWordId]) => {
      const userText = getTextById(answers[inputId]).trim().toLowerCase();
      const correctText = getTextById(correctWordId).trim().toLowerCase();
      if (userText === correctText) correctCount++;
      else wrong.push(inputId);
    });

    setWrongWords(wrong);
    setLocked(true);

    const total = Object.keys(CORRECT_MAP).length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `<div style="font-size:20px;text-align:center"><span style="color:${color};font-weight:bold">Score: ${correctCount} / ${total}</span></div>`;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // ─── Show Answer ───────────────────────────────────────────────────────────
  const showAnswers = () => {
    setAnswers({
      input1: "w1",
      input2: "w2",
      input3: "w3",
      input4: "w4",
      input5: "w5",
      input6: "w6",
    });
    setWrongWords([]);
    setLocked(true);
  };

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const startAgain = () => {
    setAnswers(INITIAL_ANSWERS);
    setWrongWords([]);
    setLocked(false);
  };

  // ─── Helper ────────────────────────────────────────────────────────────────
  const dz = (id) => (
    <DropInput
      id={id}
      value={getTextById(answers[id])}
      isWrong={wrongWords.includes(id)}
      isLocked={locked}
      onReturn={handleReturn}
    />
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 30,
        }}
      >
        <div
          className="div-forall"
          style={{
            gap: 30,
          }}
        >
          <div className="unit2-page9-q1-container">
            <h4 className="header-title-page8">
              <span className="ex-A">F</span> Drag and drop
            </h4>

            {/* ── Word Bank ── */}
            <div
              style={{
                display: "flex",
                gap: 12,
                padding: 12,
                height: 70,
                width: "100%",
                border: "2px dashed #ccc",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              {WORD_BANK.map((item) => (
                <WordChip
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  isUsed={usedWordIds.has(item.id)}
                  isDisabled={locked}
                />
              ))}
            </div>

            {/* ── Content ── */}
            <div className="content-container-wb-unit6-p4-q2">
              {/* 1 */}
              <div className="section-one-wb-unit6-p4-q2">
                <div className="img-container-wb-unit6-p4-q2">
                  <span
                    style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                  >
                    1
                  </span>
                  <input
                    type="text"
                    value="Are you scared?"
                    readOnly
                    style={{
                      pointerEvents: "none",
                      borderBottom: "2px solid black",
                      width: "75%",
                     fontSize: 20,
                    }}
                  />
                </div>
                <div className="content-input-wb-unit7-p3-q2">
                  <img src={img1} className="img-wb-unit6-p4-q2" />
                  <div style={{ position: "relative", display: "flex" }}>
                    <input
                      type="text"
                      value="Yes, "
                      readOnly
                      style={{
                        pointerEvents: "none",
                        borderBottom: "2px solid black",
                        width: "20%",
                       fontSize: 20,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 6,
                        width: "100%",
                      }}
                    >
                      {dz("input1")}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 */}
              <div className="section-two-wb-unit6-p4-q2">
                <div className="img-container-wb-unit6-p4-q2">
                  <span
                    style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                  >
                    2
                  </span>
                  <input
                    type="text"
                    value="Are you sad?"
                    readOnly
                    style={{
                      pointerEvents: "none",
                      borderBottom: "2px solid black",
                      width: "80%",
                     fontSize: 20,
                    }}
                  />
                </div>
                <div className="content-input-unit5-p6-q1">
                  <img src={img2} className="img-wb-unit6-p4-q2" />
                  <div style={{ position: "relative", display: "flex" }}>
                    <input
                      type="text"
                      value="No, I'm not. I'm "
                      readOnly
                      style={{
                        pointerEvents: "none",
                        borderBottom: "2px solid black",
                        width: "150px",
                       fontSize: 20,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 6,
                        width: "100%",
                      }}
                    >
                      {dz("input2")}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div className="section-three-wb-unit6-p4-q2">
                <div
                  className="img-container-wb-unit6-p4-q2"
                  style={{ position: "relative" }}
                >
                  <span
                    style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                  >
                    3
                  </span>
                  <div style={{ position: "relative", display: "flex" }}>
                    <input
                      type="text"
                      value="Are you"
                      readOnly
                      style={{
                        pointerEvents: "none",
                        borderBottom: "2px solid black",
                        width: "80px",
                       fontSize: 20,
                      }}
                    />
                    {dz("input3")}
                  </div>
                </div>
                <div className="content-input-unit5-p6-q1">
                  <img src={img3} className="img-wb-unit6-p4-q2" />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 6,
                      width: "100%",
                    }}
                  >
                    {dz("input4")}
                  </div>
                </div>
              </div>

              {/* 4 */}
              <div className="section-four-wb-unit6-p4-q2">
                <div className="img-container-wb-unit6-p4-q2">
                  <span
                    style={{ color: "#2c5287", fontWeight: 700, fontSize: 20 }}
                  >
                    4
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 6,
                      width: "100%",
                    }}
                  >
                    {dz("input5")}
                  </div>
                </div>
                <div className="content-input-unit5-p6-q1">
                  <img src={img4} className="img-wb-unit6-p4-q2" />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 6,
                      width: "100%",
                    }}
                  >
                    {dz("input6")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Buttons ── */}
          <div className="action-buttons-container">
            <button onClick={startAgain} className="try-again-button">
              Start Again ↻
            </button>
            <button
              className="show-answer-btn swal-continue"
              onClick={showAnswers}
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

      {/* ── Drag Overlay ── */}
      <DragOverlay>
        {activeWord && (
          <div
            style={{
              padding: "7px 14px",
              border: "2px solid #2c5287",
              borderRadius: 8,
              background: "white",
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: "0 4px 12px rgba(0,0,0,.2)",
              cursor: "grabbing",
            }}
          >
            {activeWord.text}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default WB_Unit7_Page3_Q2;
