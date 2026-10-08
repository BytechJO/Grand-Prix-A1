import React, { useState, useRef, useEffect } from "react";
import CD13_Pg14_Instruction1_AdultLady from "../../../assets/img_unit2/sounds-unit2/CD13.Pg14_Instruction1_Adult Lady.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review8_Page2_Q1.css";
import img1 from "../../../assets/unit8/imgs/U8P73EXED-01.svg";
import img2 from "../../../assets/unit8/imgs/U8P73EXED-02.svg";

const Review8_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(Array(2).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  // 🔥 الداتا المطابقة للصورة
  const items = [
    {
      img: img1,
      text: "",
      options: ["Open your mouth.", "Close your eyes."],
      correctIndex: 0,
    },
    {
      img: img2,
      text: "",
      options: ["Touch your head.", "Raise your hand."],
      correctIndex: 1,
    },
  ];

  const handleSelect = (qIndex, optionIndex) => {
    if (locked || showResult) return; // ❌ لا يسمح بالتعديل بعد Show Answer
    const newAns = [...answers];
    newAns[qIndex] = optionIndex;
    setAnswers(newAns);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (locked || showResult) return; // ❌ لا يسمح بالتعديل بعد Show Answer
    if (answers.includes(null)) {
      ValidationAlert.info("Oops!", "Please circle all words first.");
      return;
    }

    let correctCount = answers.filter(
      (ans, i) => ans === items[i].correctIndex,
    ).length;

    const total = items.length;

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

  const reset = () => {
    setAnswers(Array(items.length).fill(null));
    setShowResult(false);
    setLocked(false);
  };
  const showAnswers = () => {
    // كل سؤال → نضع correctIndex بدل null
    const filled = items.map((item) => item.correctIndex);

    setAnswers(filled);
    setShowResult(true);
    setLocked(true); // 🔒 قفل الإجابات
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
          gap: "90px",
      
        }}
      >
        <div  className="w-full">
          <h5 className="header-title-page8">
            <span className="mr-2">D</span> Look, read, and tap or click the
            correct sentence.
          </h5>
        </div>
        <div className="container-review8-p2-q1 w-full">
          {items.map((q, i) => (
            <div
              key={i}
              className="question-box-review6-p1-q1"
              style={{ width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "80%",
                }}
              ></div>

              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    color: "#2c5287",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  {i + 1}
                </span>
                <div className="img-div-review6-p1-q1">
                  <img
                    src={q.img}
                    className="q3-image-review6-p1-q1"
                    style={{ height: "150px", width: "auto" }}
                  />
                </div>

                <div className="options-row-review6-p1-q1">
                  {q.options.map((word, optIndex) => {
                    const isSelected = answers[i] === optIndex;
                    const isCorrect = optIndex === q.correctIndex;

                    return (
                      <p
                        key={optIndex}
                        className={`
                    option-word-review6-p1-q1
                    ${isSelected ? "selected3" : ""}
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
                        {showResult && isSelected && !isCorrect && !locked && (
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
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review8_Page2_Q1;
