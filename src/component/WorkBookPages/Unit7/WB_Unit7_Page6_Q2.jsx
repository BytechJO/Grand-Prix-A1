import React, { useState, useRef, useEffect } from "react";
import CD13_Pg14_Instruction1_AdultLady from "../../../assets/img_unit2/sounds-unit2/CD13.Pg14_Instruction1_Adult Lady.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U7/U7P44EXEB-01.svg";
import img2 from "../../../assets/U1 WB/U7/U7P44EXEB-02.svg";
import img3 from "../../../assets/U1 WB/U7/U7P44EXEB-03.svg";
import img4 from "../../../assets/U1 WB/U7/U7P44EXEB-04.svg";
import "./WB_Unit7_Page6_Q2.css"
const WB_Unit7_Page6_Q2 = () => {
  const [answers, setAnswers] = useState(Array(4).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  // 🔥 الداتا المطابقة للصورة
  const items = [
    {
      img: img1,
      text: "",
      options: ["hat", "hand"],
      correctIndex: 1,
    },
    {
      img: img2,
      text: "",
      options: ["woman", "window"],
      correctIndex: 1,
    },
    {
      img: img3,
      text: "",
      options: ["window", "woman"],
      correctIndex: 1,
    },
    {
      img: img4,
      text: "",
      options: ["water", "window"],
      correctIndex: 0,
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
      (ans, i) => ans === items[i].correctIndex
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
      <div  className="div-forall"
        style={{
          gap: "60px",
        
        }}
      >
        <div className="w-full">
          <h5 className="header-title-page8">
            {" "}
            <span className="ex-A">B</span>Tap or click the word for each picture.
          </h5>
        </div>
        <div className="container-wb-unit6-p6-q2">
          {items.map((q, i) => (
            <div
              key={i}
              className="question-box-wb-unit7-p6-q2"
              style={{ width: "100%" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "50px",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
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
                <img
                  src={q.img}
                  className="q3-image-wb-unit7-p6-q2"
         
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div className="options-row-wb-unit7-p6-q2">
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

export default WB_Unit7_Page6_Q2;
