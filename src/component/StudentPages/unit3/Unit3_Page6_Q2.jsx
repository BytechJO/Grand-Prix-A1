import React, { useState } from "react";
import "./Unit3_Page6_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/unit3/imgs3/P27exeE-01.svg";
import img2 from "../../../assets/unit3/imgs3/P27exeE-02.svg";
import img3 from "../../../assets/unit3/imgs3/P27exeE-03.svg";
import img4 from "../../../assets/unit3/imgs3/P27exeE-04.svg";
const Unit3_Page6_Q2 = () => {
  const questions = [
    {
      id: 1,
      text: "Close your book.",
      image: img1,
      correct: "✓",
    },
    { id: 2, text: "Quiet!", image: img2, correct: "✓" },
    {
      id: 3,
      text: "Take out your pencil.",
      image: img3,
      correct: "✗",
    },
    {
      id: 4,
      text: "Make a line.",
      image: img4,
      correct: "✓",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const selectAnswer = (id, value) => {
    if (showCorrectAnswers) return;
    setAnswers({ ...answers, [id]: value });
    setShowResult([]);
  };
  const showAnswersFunc = () => {
    const correctMap = {};
    questions.forEach((q) => {
      correctMap[q.id] = q.correct;
    });

    setAnswers(correctMap);
    setShowResult(questions.map(() => "correct"));
    setShowCorrectAnswers(true);
  };

  const checkAnswers = () => {
    if (showCorrectAnswers) return;
    // 1) فحص الخانات الفارغة
    const isEmpty = questions.some((q) => !answers[q.id]);
    if (isEmpty) {
      ValidationAlert.info("Please choose ✓ or ✗ for all questions!");
      return;
    }

    // 2) مقارنة الإجابات
    const results = questions.map((q) =>
      answers[q.id] === q.correct ? "correct" : "wrong",
    );

    setShowResult(results);
    setShowCorrectAnswers(true);
    // 3) حساب السكور
    const correctCount = results.filter((r) => r === "correct").length;
    const total = questions.length;
    const scoreMsg = `${correctCount} / ${total}`;

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${scoreMsg}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const resetAnswers = () => {
    setAnswers({});
    setShowResult([]);
    setShowCorrectAnswers(false);
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
          <span className="ex-A">E</span> Does the picture match the sentence?
          Tap or click
          <span style={{ color: "red" }}> ✓ </span> or
          <span style={{ color: "red" }}> ✗</span>.
        </h5>

        <div className="unit3-q5-container">
          {questions.map((q, index) => (
            <div key={q.id} className="unit3-q5-question-box">
              <p
                className="unit3-q5-question-text"
                style={{
                  fontSize: "20px",
                }}
              >
                <span style={{ color: "darkblue", fontWeight: "700" }}>
                  {q.id}.
                </span>
                {q.text}
              </p>

              <div className="unit3-q5-flex">
                <img src={q.image} alt="" className="unit3-q5-question-img" />

                <div className="unit3-q5-options-box">
                  {/* خيار الصح */}
                  <div className="option-wrapper">
                    <div
                      className={`option-btn ${
                        answers[q.id] === "✓" ? "selected" : ""
                      }`}
                      onClick={() => selectAnswer(q.id, "✓")}
                    >
                      ✓
                    </div>

                    {showResult[index] === "wrong" && answers[q.id] === "✓" && (
                      <div className="unit3-q5-wrong-icon">✕</div>
                    )}
                  </div>

                  {/* خيار الخطأ */}
                  <div className="option-wrapper">
                    <div
                      className={`option-btn ${
                        answers[q.id] === "✗" ? "selected" : ""
                      }`}
                      onClick={() => selectAnswer(q.id, "✗")}
                    >
                      ✗
                    </div>

                    {showResult[index] === "wrong" && answers[q.id] === "✗" && (
                      <div className="unit3-q5-wrong-icon">✕</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="action-buttons-container">
          <button onClick={resetAnswers} className="try-again-button">
            Start Again ↻
          </button>
          <button onClick={showAnswersFunc} className="show-answer-btn">
            Show Answer
          </button>

          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit3_Page6_Q2;
