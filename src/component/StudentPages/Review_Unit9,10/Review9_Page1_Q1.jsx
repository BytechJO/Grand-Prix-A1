import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review9_Page1_Q1.css";
import img1 from "../../../assets/unit10/imgs/U10P88EXEA-01.svg";
import img2 from "../../../assets/unit10/imgs/U10P88EXEA-02.svg";
import img3 from "../../../assets/unit10/imgs/U10P88EXEA-03.svg";
import img4 from "../../../assets/unit10/imgs/U10P88EXEA-04.svg";

const Review9_Page1_Q1 = () => {
  const [answers, setAnswers] = useState(Array(4).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // ⭐ NEW

  const items = [
    { img: img1, options: ["horse", "chicken"], correctIndex: 1 },
    { img: img2, options: ["cow", "goat"], correctIndex: 0 },
    { img: img3, options: ["dog", "horse"], correctIndex: 1 },
    { img: img4, options: ["dog", "goat"], correctIndex: 1 },
  ];

  const handleSelect = (qIndex, optionIndex) => {
    if (showAnswer || showResult) return; // ⭐ منع التعديل بعد Show Answer

    const newAns = [...answers];
    newAns[qIndex] = optionIndex;
    setAnswers(newAns);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (showAnswer || showResult) return; // ⭐ منع التعديل بعد Show Answer

    if (answers.includes(null)) {
      ValidationAlert.info("Oops!", "Please circle all words first.");
      return;
    }

    let correctCount = answers.filter(
      (ans, i) => ans === items[i].correctIndex,
    ).length;

    const total = items.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult(true);
  };

  const reset = () => {
    setAnswers(Array(items.length).fill(null));
    setShowResult(false);
    setShowAnswer(false); // ⭐ Reset disables Show Answer mode
  };

  // =====================================================
  // ⭐⭐   SHOW ANSWER FUNCTION
  // =====================================================
  const handleShowAnswer = () => {
    const correct = items.map((q) => q.correctIndex);
    setAnswers(correct);
    setShowAnswer(true);
    setShowResult(true);
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
          gap: "60px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="mr-2">A</span> Look and tap or click the correct
          word.{" "}
        </h5>

        <div className="container-review9-p1-q1">
          {items.map((q, i) => (
            <div key={i} className="question-box-review9-p1-q1 ">
              <div>
                <span
                  style={{
                    color: "#2c5287",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  {i + 1}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                <img
                  src={q.img}
                  className="q3-image-review6-p1-q1"
                  style={{ height: "130px", width: "auto" }}
                />

                <div className="options-row-unit8-p5-q3">
                  {q.options.map((word, optIndex) => {
                    const isSelected = answers[i] === optIndex;
                    const isCorrect = optIndex === q.correctIndex;

                    return (
                      <p
                        key={optIndex}
                        className={`
                          option-word-review6-p1-q1
                          ${isSelected ? "selected3" : ""}
                          ${
                            showResult && isSelected && !isCorrect
                              ? "wrong"
                              : ""
                          }
                          ${showResult && isCorrect ? "correct" : ""}
                        `}
                        onClick={() => handleSelect(i, optIndex)}
                      >
                        {word}

                        {showResult && isSelected && !isCorrect && (
                          <span className="wrong-x-review4-p2-q3">✕</span>
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button
          className="show-answer-btn swal-continue"
          onClick={handleShowAnswer}
        >
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review9_Page1_Q1;
