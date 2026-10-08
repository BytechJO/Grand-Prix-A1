import React, { useState, useRef, useEffect } from "react";
import "./WB_Unit9_Page6_Q3.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U9/U9P56EXED-01.svg";
import img2 from "../../../assets/U1 WB/U9/U9P56EXED-02.svg";
import img3 from "../../../assets/U1 WB/U9/U9P56EXED-03.svg";
import img4 from "../../../assets/U1 WB/U9/U9P56EXED-04.svg";
import sound1 from "../../../assets/U1 WB/U9/audio/cd13pg56-instruction3-adult-lady_5RDExqyQ.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const WB_Unit9_Page6_Q4 = () => {
  const stopAtSecond = 3.5;
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0.06,
      end: 7.56,
      text: "Phonics exercise D. Does it begin with N? Listen and write check or X.",
    },
    {
      start: 8.32,
      end: 9.76,
      text: "1, mop.",
    },
    {
      start: 10.42,
      end: 11.88,
      text: "2, net.",
    },
    {
      start: 12.38,
      end: 14.08,
      text: "3, needle.",
    },
    {
      start: 14.64,
      end: 16.38,
      text: "4, man.",
    },
  ];

  const questions = [
    {
      id: 1,
      image: img1,
      correct: "✗",
    },
    { id: 2, image: img2, correct: "✓" },
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
    setLocked(true);
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
          gap: "50px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">D</span>
          Does it begin with
          <span style={{ color: "red" }}> n </span>? Listen and tap or click
          <span style={{ color: "red" }}> ✓ </span> or
          <span style={{ color: "red" }}> ✗</span>.
        </h5>
        <QuestionAudioPlayer
          src={sound1}
          stopAtSecond={stopAtSecond}
          captions={captions}
        />
        <div className="wb-unit9-p6-q3-container">
          {questions.map((q, index) => (
            <div key={q.id} className="wb-unit9-p6-q3-question-box">
              <p
                className="unit6-p1-q1-question-text"
                style={{ fontSize: "20px" }}
              >
                <span style={{ color: "darkblue", fontWeight: "700" }}>
                  {q.id}.
                </span>
              </p>

              <div className="wb-unit9-p6-q3-flex">
                <img
                  src={q.image}
                  alt=""
                  className="unit6-p1-q1-question-img"
                />

                <div className="wb-unit9-p6-q3-options-box">
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

export default WB_Unit9_Page6_Q4;
