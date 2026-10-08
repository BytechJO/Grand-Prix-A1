import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit5_Page6_Q1.css";
import img1 from "../../../assets/U1 WB/U5/U5P32EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U5/U5P32EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U5/U5P32EXEA-03.svg";
import img6 from "../../../assets/U1 WB/U5/U5P32EXEA-04.svg";
import img7 from "../../../assets/U1 WB/U5/U5P32EXEA-05.svg";
import img8 from "../../../assets/U1 WB/U5/U5P32EXEA-06.svg";

const data = [
  {
    id: 1,
    letter: "k",
    images: [
      { id: 1, src: img1, value: 1 },
      { id: 2, src: img2, value: 2 },
      { id: 3, src: img3, value: 3 },
    ],
    correct: [1, 3],
  },
  {
    id: 2,
    letter: "g",
    images: [
      { id: 1, src: img6, value: 1 },
      { id: 2, src: img7, value: 2 },
      { id: 3, src: img8, value: 3 },
    ],
    correct: [1, 2],
  },
];

export default function WB_Unit5_Page6_Q1() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // ⭐ NEW

  // -----------------------------------------------------------------------

  const handleSelect = (qId, value) => {
    if (showAnswer || submitted) return;
    // ❌ ممنوع تعديل الإجابات بعد Show Answer

    setAnswers((prev) => {
      const current = prev[qId] || [];

      // Unselect if selected before
      if (current.includes(value)) {
        return { ...prev, [qId]: current.filter((v) => v !== value) };
      }

      // Max selections = 2
      if (current.length >= 2) return prev;

      return { ...prev, [qId]: [...current, value] };
    });
  };

  const handleCheck = () => {
    if (showAnswer || submitted) return;
    if (!answers[data[0].id] || answers[data[0].id].length === 0) {
      ValidationAlert.info("Please select at least one picture in question 1.");
      return;
    }
    if (!answers[data[1].id] || answers[data[1].id].length === 0) {
      ValidationAlert.info("Please select at least one picture in question 2.");
      return;
    }

    let correctCount = 0;
    const total = data.reduce((sum, q) => sum + q.correct.length, 0);

    data.forEach((q) => {
      const studentAnswers = answers[q.id] || [];
      q.correct.forEach((correctValue) => {
        if (studentAnswers.includes(correctValue)) {
          correctCount++;
        }
      });
    });

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = ` 
      <div style="font-size:20px;text-align:center;margin-top:8px">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowAnswer(false); // ⭐ NEW
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};

    data.forEach((q) => {
      correctAnswers[q.id] = q.correct; // أعطيه الإجابات الصحيحة لكل سؤال
    });

    setAnswers(correctAnswers);
    setShowAnswer(true);
    setSubmitted(true);
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
      <div  className="div-forall"
        style={{
     
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">A</span> Tap or click the pictures that start with the letter.
        </h5>

        {data.map((q) => (
          <div
            key={q.id}
            className="question-row-Unit5_Page5_Q2 w-full"
            style={{ marginTop: "15px" }}
          >
            <span
              style={{
                color: "#2c5287",
                fontSize: "40px",
                fontWeight: "700",
                marginLeft: "5px",
              }}
            >
              {q.letter}
            </span>

            <div className="images-row-wb-unit5-p6-q1">
              {q.images.map((img) => {
                const isSelected = answers[q.id]?.includes(img.value);
                const isWrong =
                  submitted &&
                  isSelected &&
                  !q.correct.includes(img.value) &&
                  !showAnswer;

                return (
                  <div
                    key={img.id}
                    className={`img-box-Unit5_Page5_Q2 
                      ${isSelected ? "selected-Unit5_Page5_Q2" : ""} 
                      ${isWrong ? "wrong" : ""}`}
                    onClick={() => handleSelect(q.id, img.value)}
                  >
                    <img src={img.src} alt="" />

                    {isWrong && (
                      <div className="wrong-mark-Unit5_Page5_Q2">✕</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button
          className="show-answer-btn swal-continue"
          onClick={handleShowAnswer}
        >
          Show Answer
        </button>

        <button onClick={handleCheck} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
}
