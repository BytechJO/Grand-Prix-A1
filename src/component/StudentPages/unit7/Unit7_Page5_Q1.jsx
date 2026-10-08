import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit7_Page5_Q1.css";
import img1 from "../../../assets/unit7/img/U7P62EXEA1-01.svg";
import img2 from "../../../assets/unit7/img/U7P62EXEA1-02.svg";
import img3 from "../../../assets/unit7/img/U7P62EXEA1-03.svg";
import img4 from "../../../assets/unit7/img/U7P62EXEA1-04.svg";

const Unit7_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(Array(4).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // ⭐ NEW

  const items = [
    { img: img1, options: ["house", "hand"], correctIndex: 0 },
    { img: img2, options: ["water", "window"], correctIndex: 0 },
    { img: img3, options: ["woman", "water"], correctIndex: 1 },
    { img: img4, options: ["house", "hat"], correctIndex: 1 },
  ];

  const handleSelect = (qIndex, optionIndex) => {
    if (showAnswer || showResult) return; // 🔒 ممنوع يغير لما تظهر الإجابات

    const newAns = [...answers];
    newAns[qIndex] = optionIndex;
    setAnswers(newAns);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (showAnswer || showResult) return; // 🔒 ممنوع يغير لما تظهر الإجابات

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
    setShowAnswer(false); // ⭐ reset show answer
  };

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
          gap: "120px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">A</span>
          <span className="mr-2" style={{ color: "purple" }}>
            1
          </span>
          Look and tap or click the correct word.
        </h5>

        <div className="container-unit7-p5-q1">
          {items.map((q, i) => (
            <div key={i} className="question-box-unit7-p5-q1">
              <span
                style={{
                  color: "#2c5287",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {i + 1}
              </span>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                <div className="img-div-unit7-p5-q1">
                  <img src={q.img} className="q3-image-unit7-p5-q1" />
                </div>

                <div className="options-row-unit7-p5-q1">
                  {q.options.map((word, optIndex) => {
                    const isSelected = answers[i] === optIndex;
                    const isCorrect = optIndex === q.correctIndex;

                    return (
                      <p
                        key={optIndex}
                        className={`
                          option-word-unit7-p5-q1
                          ${isSelected ? "selected3" : ""}
                          ${
                            showResult && isSelected && !isCorrect
                              ? "wrong"
                              : ""
                          }
                          ${showResult && isCorrect ? "correct" : ""}
                        `}
                        onClick={() => handleSelect(i, optIndex)}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        {word}

                        {showResult &&
                          isSelected &&
                          !isCorrect &&
                          !showAnswer && (
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

export default Unit7_Page5_Q1;
