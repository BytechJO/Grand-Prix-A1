import React, { useState } from "react";
import "./WB_Unit6_Page3_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U6/U6P35EXEE-01.svg";
import img2 from "../../../assets/U1 WB/U6/U6P35EXEE-02.svg";
import img3 from "../../../assets/U1 WB/U6/U6P35EXEE-03.svg";
import img4 from "../../../assets/U1 WB/U6/U6P35EXEE-04.svg";

const WB_Unit6_Page3_Q1 = () => {
  /* ================= QUESTIONS ================= */

  const questions = [
    {
      id: 1,
      parts: [
        { type: "text", value: "Can" },
        { type: "blank", options: ["she", "he"] },
        { type: "blank", options: ["sail a boat?", "swim?"] },
        { type: "blank", options: ["Yes, he can.", "No, he can’t."] },
        { type: "text", value: "." },
      ],
      correct: ["he", "swim?", "Yes, he can."],
      image: img1,
    },
    {
      id: 2,
      parts: [
        { type: "text", value: "Can" },
        { type: "blank", options: ["she", "he"] },
        { type: "blank", options: ["paint a picture?", "climb a tree?"] },
        { type: "blank", options: ["Yes, he can.", "No, he can’t."] },
        { type: "text", value: "." },
      ],
      correct: ["he", "paint a picture?", "Yes, he can."],
      image: img2,
    },
    {
      id: 3,
      parts: [
        { type: "text", value: "Can" },
        { type: "blank", options: ["she", "he"] },
        { type: "blank", options: ["ride a bike?", "fly a kite?"] },
        { type: "blank", options: ["Yes, he can.", "No, he can’t."] },
        { type: "text", value: "." },
      ],
      correct: ["he", "fly a kite?", "No, he can’t."],
      image: img3,
    },
    {
      id: 4,
      parts: [
        { type: "text", value: "Can" },
        { type: "blank", options: ["it", "he"] },
        { type: "blank", options: ["fly a kite?", "climb a tree?"] },
        { type: "blank", options: ["Yes, it can.", "No, it can’t."] },
        { type: "text", value: "." },
      ],
      correct: ["it", "climb a tree?", "No, it can’t."],
      image: img4,
    },
  ];

  /* ================= STATE ================= */

  const [answers, setAnswers] = useState(
    questions.map((q) => q.correct.map(() => null))
  );
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  /* ================= HANDLERS ================= */

  const handleSelect = (qIndex, blankIndex, option) => {
    if (locked ||showResult) return;
    const updated = [...answers];
    updated[qIndex][blankIndex] = option;
    setAnswers(updated);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (locked ||showResult) return;

    const selectedCount = answers.flat().filter((a) => a !== null).length;
    if (selectedCount === 0) {
      ValidationAlert.info("Please choose an answer first.");
      return;
    }

    let correct = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      q.correct.forEach((c, bIndex) => {
        total++;
        if (answers[qIndex][bIndex] === c) correct++;
      });
    });

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;color:${color}">
        <b>Score: ${correct} / ${total}</b>
      </div>
    `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult(true);
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => [...q.correct]));
    setShowResult(true);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(questions.map((q) => q.correct.map(() => null)));
    setShowResult(false);
    setLocked(false);
  };

  /* ================= RENDER PART ================= */

  const renderPart = (part, qIndex, blankIndex) => {
    if (part.type === "text") {
      return <span className="sentence-text-review5-p2-q3">{part.value}</span>;
    }

    return (
      <span
        className={`blank-options-wb-unit6-b3-q1 ${
          blankIndex === 2 ? "third-blank" : ""
        }`}
      >
        {part.options.map((opt, i) => {
          const isSelected = answers[qIndex][blankIndex] === opt;
          const isWrong =
            showResult &&
            isSelected &&
            opt !== questions[qIndex].correct[blankIndex];

          return (
            <div key={i} className="option-wrapper">
              <span
                className={`option-word-review5-p2-q3 ${
                  isSelected ? "selected2" : ""
                }`}
                onClick={() => handleSelect(qIndex, blankIndex, opt)}
              >
                {opt}
              </span>
              {isWrong && !locked && <div className="wrong-mark">✕</div>}
            </div>
          );
        })}
      </span>
    );
  };

  /* ================= JSX ================= */

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div  className="div-forall"
        style={{
      
          gap: "20px",
        }}
      >
        <h4 className="header-title-page8">
          <span className="ex-A">E</span>Tap or click the correct words for each picture
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px",
          }}
        >
          {questions.map((q, qIndex) => {
            let blankCounter = -1;

            const firstLine = [];
            const secondLine = [];

            q.parts.forEach((part) => {
              if (part.type === "blank") blankCounter++;

              if (blankCounter < 2) firstLine.push({ part, blankCounter });
              else secondLine.push({ part, blankCounter });
            });

            return (
              <div key={q.id} className="question-row-wb-unit6-b3-q1">
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
                >
                  <span className="header-title-page8">{q.id}</span>
                  <img
                    src={q.image}
                 
                    className="img-wb-unit6-p3-q1"
                  />
                </div>

                {/* LINE 1 */}
                <div
                 className="first-line-wb-unit6-b3-q1" style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  {firstLine.map(({ part, blankCounter }, i) =>
                    renderPart(part, qIndex, blankCounter)
                  )}
                </div>

                {/* LINE 2 */}
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  {secondLine.map(({ part, blankCounter }, i) =>
                    renderPart(part, qIndex, blankCounter)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit6_Page3_Q1;
