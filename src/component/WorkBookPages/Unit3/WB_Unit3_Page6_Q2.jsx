import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-01.svg";
import img2 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-02.svg";
import img3 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-03.svg";
import img4 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-04.svg";
import img5 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-05.svg";
import img6 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-06.svg";
import img7 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-07.svg";
import img8 from "../../../assets/U1 WB/U3/SVG/U3P20EXEB-08.svg";
import sound1 from "../../../assets/U1 WB/U3/audio/cd5pg20-instruction2-adult-lady_JnX8npTM.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const WB_Unit3_Page6_Q2 = () => {
  const stopAtSecond = 8.159;
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer

  // ================================
  // ✔ Captions Array
  // ================================
const captions = [
  {
    start: 0.219,
    end: 8.159,
    text: "Phonics Exercise B. Do they have the same vowel sound? Listen and write check or X.",
  },
  {
    start: 8.739,
    end: 11.039,
    text: "1-mop, cat.",
  },
  {
    start: 11.579,
    end: 14.239,
    text: "2-ran, can.",
  },
  {
    start: 14.819,
    end: 17.42,
    text: "3-mat, ant.",
  },
  {
    start: 18.239,
    end: 20.959,
    text: "4-hat, nest.",
  },
];

  const questions = [
    {
      id: 1,
      image1: img1,
      image2: img2,
      correct: "✗",
    },
    { id: 2, image1: img3, image2: img4, correct: "✓" },
    {
      id: 3,
      image1: img5,
      image2: img6,
      correct: "✓",
    },
    {
      id: 4,
      image1: img7,
      image2: img8,
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
      answers[q.id] === q.correct ? "correct" : "wrong"
    );

    setShowResult(results);
setLocked(true)
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
            gap: "10px",
         
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">B</span> Do they have the same
          <span style={{ color: "red" }}> vowel sound </span>? Listen and tap or click 
          <span style={{ color: "red" }}> ✓ </span> or
          <span style={{ color: "red" }}> ✗</span>.
        </h5>

        <QuestionAudioPlayer
                    src={sound1}
                    captions={captions}
                    stopAtSecond={stopAtSecond}
                  />
        
        <div className="wb-unit3-p6-q2-container">
          {questions.map((q, index) => (
            <div key={q.id} className="review9-p2-q2-question-box">
              <p
                className="unit6-p1-q1-question-text"
                style={{ fontSize: "20px" }}
              >
                <span style={{ color: "darkblue", fontWeight: "700" }}>
                  {q.id}.
                </span>
              </p>

              <div className="unit10-p1-q2-flex">
                <div style={{ display: "flex" }}>
                  <img
                    src={q.image1}
                    alt=""
                    className="wb-unit3-p6-q2-question-img"
                  />
                  <img
                    src={q.image2}
                    alt=""
                    className="wb-unit3-p6-q2-question-img"
                  />
                </div>

                <div className="unit10-p1-q2-options-box">
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

                    {
                      showResult[index] === "wrong" &&
                      answers[q.id] === "✓" && (
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

                    {
                      showResult[index] === "wrong" &&
                      answers[q.id] === "✗" && (
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

export default WB_Unit3_Page6_Q2;
