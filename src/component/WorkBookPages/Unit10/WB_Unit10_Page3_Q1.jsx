import React, { useState, useRef } from "react";
import img1 from "../../../assets/U1 WB/U10/U10P59EXEE-01-01.svg";
import img2 from "../../../assets/U1 WB/U10/U10P59EXEE-01-02.svg";
import img3 from "../../../assets/U1 WB/U10/U10P59EXEE-02-01.svg";
import img4 from "../../../assets/U1 WB/U10/U10P59EXEE-02-02.svg";
import img5 from "../../../assets/U1 WB/U10/U10P59EXEE-03-01.svg";
import img6 from "../../../assets/U1 WB/U10/U10P59EXEE-03-02.svg";
import img7 from "../../../assets/U1 WB/U10/U10P59EXEE-04-01.svg";
import img8 from "../../../assets/U1 WB/U10/U10P59EXEE-04-02.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit10_Page3_Q1.css"

const WB_Unit10_Page3_Q1 = () => {
  const data = [
    {
      id: 1,
      word: "I want fruit.",
      imgs: [
        { src: img1, answer: false }, // short i
        { src: img2, answer: true },
      ],
    },
    {
      id: 2,
      word: "I want chicken.",
      imgs: [
        { src: img3, answer: false}, // short i
        { src: img4, answer: true },
      ],
    },
    {
      id: 3,
      word: "I want bread.",
      imgs: [
        { src: img5, answer: false },
        { src: img6, answer: true }, // short i
      ],
    },
    {
      id: 4,
      word: "I want ice cream.",
      imgs: [
        { src: img7, answer: true }, // short i
        { src: img8, answer: false },
      ],
    },
  ];

  const [selected, setSelected] = useState({});

  const [showResult, setShowResult] = useState(false);
  const [showAnswerState, setShowAnswerState] = useState(false);
  const handleSelect = (qId, index) => {
     if (showAnswerState || showResult) return;

    setSelected((prev) => ({ ...prev, [qId]: index }));
    setShowResult(false);
  };

  const showCorrectAnswers = () => {
    let correctSelections = {};

    data.forEach((q) => {
      const correctIndex = q.imgs.findIndex((img) => img.answer === true);
      correctSelections[q.id] = correctIndex;
    });

    setSelected(correctSelections);
    setShowResult(false);
    setShowAnswerState(true);
  };

  const checkAnswers = () => {
    if (showAnswerState) return;
    const totalQuestions = data.length; // لأن أول سؤال لا يُحسب

    let correct = 0;

    // تأكد إنو جاوب كل الأسئلة
    for (let q of data) {
      if (selected[q.id] === undefined) {
        ValidationAlert.info("");
        return;
      }
    }

    // حساب عدد الإجابات الصحيحة
    data.forEach((q) => {
      const chosenIndex = selected[q.id];
      if (q.imgs[chosenIndex].answer === true) {
        correct++;
      }
    });

    const color =
      correct === totalQuestions ? "green" : correct === 0 ? "red" : "orange";
    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
      Score: ${correct} / ${totalQuestions}
      </span>
    </div>
  `;

    // النتيجة
    if (correct === totalQuestions) {
      ValidationAlert.success(scoreMessage);
    } else if (correct === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
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
          gap: "30px",
     
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">E</span>Tap or click the correct box.
          <span style={{ color: "red" }}>✓</span> .
        </h5>

        <div className="shorti-container-wb-u1-q2 w-full">
          {data.map((question) => (
            <div key={question.id} className="question-box-wb-unit10-p3-q1">
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                <span
                  style={{
                    color: "darkblue",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  {question.id}
                </span>
                {question.word}
              </div>
              <div className="shorti-container-wb-u1-q2 ">
                {question.imgs.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className={`img-box-wb-unit10-p3-q1  ${
                        selected[question.id] === index ? "selected-wb-u1-q2" : ""
                      }`}
                      onClick={() => handleSelect(question.id, index)}
                    >
                      {showResult &&
                        !showAnswerState &&
                        selected[question.id] === index &&
                        img.answer === false && (
                          <span className="wrong-x-circle-wb-u1-p3-q2">✕</span>
                        )}

                      <img src={img.src} alt="TEST" />
                      <div className="check-box-wb-unit10-p3-q1 ">
                        {selected[question.id] === index ? "✓" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button
          className="try-again-button"
          onClick={() => {
            setSelected({});
            setShowResult(false);
            setShowAnswerState(false);
          }}
        >
          Start Again ↻
        </button>
        <button
          className="show-answer-btn swal-continue"
          onClick={showCorrectAnswers}
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

export default WB_Unit10_Page3_Q1;
