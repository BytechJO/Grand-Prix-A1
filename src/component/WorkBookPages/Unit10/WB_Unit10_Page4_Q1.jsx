import React, { useState } from "react";
import img1 from "../../../assets/U1 WB/U10/U10P60EXEG-01.svg";
import img2 from "../../../assets/U1 WB/U10/U10P60EXEG-02.svg";
import img3 from "../../../assets/U1 WB/U10/U10P60EXEG-03.svg";
import img4 from "../../../assets/U1 WB/U10/U10P60EXEG-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit10_Page4_Q1.css";

const WB_Unit10_Page4_Q1 = () => {
  const questions = [
    {
      id: 1,
      image: img1,
      text: "Do you want bread?",
      items: [
        { text: "Yes, I do.", correct: "✓" },
        { text: "No, I don’t. I want milk", correct: "x" },
      ],
    },
    {
      id: 2,
      image: img2,
      text: "Do you want an apple?",
      items: [
        { text: "Yes, I do.", correct: "✓" },
        { text: "No, I don’t. I want a steak.", correct: "x" },
      ],
    },
    {
      id: 3,
      image: img3,
      text: "Do you want fruit?",
      items: [
        { text: "Yes, I do.", correct: "x" },
        { text: "No, I don’t. I want chicken.", correct: "✓" },
      ],
    },
    {
      id: 4,
      image: img4,
      text: "Do you want milk?",
      items: [
        { text: "Yes, I do.", correct: "x" },
        { text: "No, I don’t. I want ice cream.", correct: "✓" },
      ],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  // -------------------------
  // اختيار جواب واحد فقط لكل سؤال
  // -------------------------
  const handleSelect = (qId, idx) => {
    if (showAnswer) return; // ❌ ممنوع التعديل بعد Show Answer
    setAnswers({
      ...answers,
      [qId]: idx, // نخزن رقم الخيار المختار
    });
    setResults({});
  };

  const checkAnswers = () => {
    if (showAnswer) return; // ❌ ممنوع التعديل بعد Show Answer
    const temp = {};
    let correctCount = 0;
    let total = questions.length;

    questions.forEach((q) => {
      const chosenIndex = answers[q.id];

      if (chosenIndex === undefined) {
        temp[q.id] = "empty";
        return;
      }

      const isCorrect = q.items[chosenIndex].correct.toLowerCase() === "✓";

      temp[q.id] = isCorrect ? "correct" : "wrong";

      if (isCorrect) correctCount++;
    });

    setResults(temp);
    setShowAnswer(true);
    if (Object.values(temp).includes("empty")) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size:20px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;
    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };
  const reset = () => {
    setAnswers({});
    setResults({});
    setShowAnswer(false); // ← مهم جداً
  };
  const handleShowAnswer = () => {
    const correctAnswers = {};

    questions.forEach((q) => {
      const correctIndex = q.items.findIndex(
        (item) => item.correct.toLowerCase() === "✓",
      );
      correctAnswers[q.id] = correctIndex;
    });

    setAnswers(correctAnswers);
    setResults({});
    setShowAnswer(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <h4 className="header-title-page8">
          <span className="ex-A">G</span>Tap or click the correct box.
          <span style={{ color: "red" }}>✓</span>.{" "}
        </h4>

        <div className="wb-unit10-p4-q1-grid w-full">
          {questions.map((q) => (
            <div key={q.id} className="wb-unit10-p4-q1-box">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={q.image} alt="" className="wb-unit10-p4-q1-img" />
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="wb-unit10-p4-q1-text"
                    style={{
                      color: "#1d4f7b",
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    {q.id}
                  </span>
                  <span className="wb-unit10-p4-q1-text">{q.text}</span>
                </div>
              </div>
              <div>
                {q.items.map((item, idx) => {
                  const isSelected = answers[q.id] === idx;
                  const isWrong = results[q.id] === "wrong" && isSelected;

                  return (
                    <div key={idx} className="wb-unit10-p4-q1-row">
                      <div className="review3-p1-q3-input-box">
                        <input
                          type="text"
                          readOnly
                          value={isSelected ? "✓" : ""}
                          onFocus={() => handleSelect(q.id, idx)}
                          className={`wb-unit10-p4-q1-input`}
                          disabled={showAnswer}
                          style={{
                            cursor: showAnswer ? "not-allowed" : "pointer",
                          }}
                        />

                        {isWrong && <span className="review3-p1-q3-x">✕</span>}
                      </div>{" "}
                      <span className="wb-unit10-p4-q1-text">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>
        {/* ⭐⭐⭐ NEW — زر Show Answer */}
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
  );
};

export default WB_Unit10_Page4_Q1;
