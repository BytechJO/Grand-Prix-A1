import React, { useState, useRef, useEffect } from "react";
import "./WB_Unit6_Page6_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U6/U6P38EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U6/U6P38EXEA-02.svg";
import img3 from "../../../assets/U1 WB/U6/U6P38EXEA-03.svg";
import img4 from "../../../assets/U1 WB/U6/U6P38EXEA-04.svg";
import img5 from "../../../assets/U1 WB/U6/U6P38EXEA-05.svg";
import img6 from "../../../assets/U1 WB/U6/U6P38EXEA-06.svg";
import sound1 from "../../../assets/U1 WB/U6/audio/cd8pg38-instruction1-adult-lady_19BTUJxp.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const WB_Unit6_Page6_Q1 = () => {
  const stopAtSecond = 7.66;
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer

  // ================================
  // ✔ Captions Array
  // ================================
 const captions = [
  {
    start: 0,
    end: 7.66,
    text: "Phonics exercise A. Does it have short I? Listen and write check or X.",
  },
  {
    start: 8.46,
    end: 9.62,
    text: "1, figs.",
  },
  {
    start: 10.08,
    end: 11.56,
    text: "2, nine.",
  },
  {
    start: 12.16,
    end: 13.74,
    text: "3, ship.",
  },
  {
    start: 14.32,
    end: 15.78,
    text: "4, kite.",
  },
  {
    start: 16.46,
    end: 17.96,
    text: "5, sit.",
  },
  {
    start: 18.72,
    end: 20.2,
    text: "6, pie.",
  },
];

  const questions = [
    {
      id: 1,
      image: img1,
      correct: "✓",
    },
    { id: 2, image: img2, correct: "✗" },
    {
      id: 3,
      image: img3,
      correct: "✓",
    },
    {
      id: 4,
      image: img4,
      correct: "✗",
    },
    {
      id: 5,
      image: img5,
      correct: "✓",
    },
    {
      id: 6,
      image: img6,
      correct: "✗",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState([]);

  const selectAnswer = (id, value) => {
    if (locked) return; // 🔒 ممنوع التعديل بعد Show Answer
    setAnswers({ ...answers, [id]: value });
    setShowResult(false);
  };
  const showAnswers = () => {
    const corrects = {};
    questions.forEach((q) => {
      corrects[q.id] = q.correct; // ✓ أو ✗
    });

    setAnswers(corrects);
    setShowResult([]); // إخفاء كل X
    setLocked(true); // 🔒 قفل التعديل
  };

  const checkAnswers = () => {
    if (locked) return;
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

    // 3) حساب السكور
    const correctCount = results.filter((r) => r === "correct").length;
    const total = questions.length;
    const scoreMsg = `${correctCount} / ${total}`;
    setLocked(true);
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
    setLocked(false); // ← مهم جداً
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
          gap: "20px",
   
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">A</span>
          Does it have a <span style={{ color: "red" }}>short i</span>? Listen
          and tap or click <span style={{ color: "red" }}> ✓ </span> or
          <span style={{ color: "red" }}> ✗</span>.
        </h5>

        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />

        <div className="wb-unit6-p6-q1-container">
          {questions.map((q, index) => (
            <div key={q.id} className="unit6-p1-q1-question-box">
              <p
                className="unit6-p1-q1-question-text"
                style={{ fontSize: "20px" }}
              >
                <span style={{ color: "darkblue", fontWeight: "700" }}>
                  {q.id}.
                </span>
              </p>

              <div className="wb-unit6-p6-q1-flex">
                <img
                  src={q.image}
                  alt=""
                  className="unit6-p1-q1-question-img"
                />

                <div className="wb-unit6-p6-q1-options-box">
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
                      <div className="unit6-p1-q1-wrong-icon">✕</div>
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
                      <div className="unit6-p1-q1-wrong-icon">✕</div>
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
          {/* ⭐⭐⭐ NEW — زر Show Answer */}
          <button
            onClick={showAnswers}
            className="show-answer-btn swal-continue"
          >
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

export default WB_Unit6_Page6_Q1;
