import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page5_Q1.css";
import img1 from "../../../assets/U1 WB/U1/SVG/U1P5EXEE-01.svg";
import img2 from "../../../assets/U1 WB/U1/SVG/U1P5EXEE-02.svg";
import img3 from "../../../assets/U1 WB/U1/SVG/U1P5EXEE-03.svg";
import img4 from "../../../assets/U1 WB/U1/SVG/U1P5EXEE-04.svg";
const WB_Unit1_Page5_Q1 = () => {
  // 🔥 الداتا المطابقة للصورة
  const items = [
    {
      img: img1,
      options: ["Good morning!", "Good evening!"],
      correctIndex: 0,
    },
    {
      img: img2,
      options: ["Goodbye!", "Hello!"],
      correctIndex: 0,
    },
    {
      img: img3,
      options: ["Good afternoon!", "Good morning!"],
      correctIndex: 0,
    },
    {
      img: img4,
      options: ["Hello! I’m Stella.", "Good evening!"],
      correctIndex: 0,
    },
  ];
  const [answers, setAnswers] = useState(() => {
    const arr = Array(items.length).fill(null);
    return arr;
  });
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (qIndex, optionIndex) => {
    if (showAnswer ||showResult) return;

    const newAns = [...answers];
    newAns[qIndex] = optionIndex;
    setAnswers(newAns);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (showAnswer||showResult) return;

    // تجاهل السؤال الأول عند التحقق من اكتمال الإجابات
    if (answers.includes(null)) {
      ValidationAlert.info("Oops!", "Please circle all words first.");
      return;
    }

    // حساب الإجابات الصحيحة "باستثناء السؤال الأول"
    let correctCount = answers.filter(
      (ans, i) => ans === items[i].correctIndex
    ).length;

    const total = items.length; // عدد الأسئلة التي تُحسب فقط

    let color =
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

  const showCorrectAnswers = () => {
    const correct = items.map((item) => item.correctIndex);
    setAnswers(correct);
    setShowAnswer(true);
    setShowResult(false);
  };

  const reset = () => {
    setAnswers(() => {
      const arr = Array(items.length).fill(null);
      return arr;
    });
    setShowAnswer(false);
    setShowResult(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",padding:"30px"
      }}
    >
      <div   className="div-forall"
        style={{
          gap: "30px",
      
        }}
      >
        
          <h5 className="header-title-page8">
            <span className="ex-A">E</span>
            Tap or click the correct greeting.
          </h5>
      
        <div className="container-wb-u1-p5-q1">
          {items.map((q, i) => (
            <div
              key={i}
              className="question-box-wb-u1-p5-q1"
              style={{ width: "100%" }}
            >
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
                  <img
                    src={q.img}
                    className="q3-image-wb-unit1-p5-q1"
                    
                  />
                </div>

                <div className="options-row-unit7-p5-q1">
                  {q.options.map((word, optIndex) => {
                    const isSelected = answers[i] === optIndex;
                    const isCorrect = optIndex === q.correctIndex;

                    return (
                      <p
                        key={optIndex}
                        className={`
                    option-word-wb-u1-p5-q1
                    ${isSelected ? "selected3-wb-u1-p5-q1" : ""}
                    ${showResult && isSelected && !isCorrect ? "wrong" : ""}
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
                        {showResult && isSelected && !isCorrect && (
                          <span className="wrong-x-wb-u1-p5-q1">✕</span>
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
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button
          onClick={showCorrectAnswers}
          className="show-answer-btn swal-continue"
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

export default WB_Unit1_Page5_Q1;
