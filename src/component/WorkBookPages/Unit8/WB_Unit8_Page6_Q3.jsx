import React, { useState } from "react";
import bat from "../../../assets/U1 WB/U8/U8P50EXEC-01.svg";
import cap from "../../../assets/U1 WB/U8/U8P50EXEC-02.svg";
import cap1 from "../../../assets/U1 WB/U8/U8P50EXEC-03.svg";
import cap2 from "../../../assets/U1 WB/U8/U8P50EXEC-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit8_Page6_Q3.css";

const WB_Unit8_Page6_Q3 = () => {
  const items = [
    {
      img: bat,
      correct: "zebra",
      correctInput: "zebra",
      input: "",
      options: ["zoo", "zebra"],
    },
    {
      img: cap,
      correct: "sun",
      correctInput: "sun",
      input: "",
      options: ["sun", "sea"],
    },
    {
      img: cap1,
      correct: "sock",
      correctInput: "sock",
      input: "",
      options: ["sock", "sun"],
    },
    {
      img: cap2,
      correct: "zipper",
      correctInput: "zipper",
      input: "",
      options: ["zebra", "zipper"],
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));

  const [locked, setLocked] = useState(false);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const handleSelect = (value, index) => {
    if (locked || showResult) return;

    const newSel = [...selected];
    newSel[index] = value;
    setSelected(newSel);

    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    setShowResult(false);
  };
  const resetAll = () => {
    setSelected(["", "", "", ""]);
    setAnswers(["", "", "", ""]);
    setWrongInputs([]);
    setShowResult(false);
    setLocked(false); // 🔒 قفل كل شيء
  };
const showAnswers = () => {
  setSelected(items.map((item) => item.correct));
  setAnswers(items.map((item) => item.correctInput));
  setWrongInputs([]);
  setShowResult(false);
  setLocked(true);
};

  const checkAnswers = () => {
    if (locked || showResult) return;
    // 1) التشييك إذا في دائرة مش مختارة
    if (selected.some((s) => s === "")) {
      ValidationAlert.info("Please choose a circle (f or v) for all items!");
      return;
    }

    // 2) التشييك إذا في input فاضي
    if (answers.some((a) => a.trim() === "")) {
      ValidationAlert.info("Please fill in all the writing boxes!");
      return;
    }

    let wrong = [];
    let score = 0;

    items.forEach((item, i) => {
      const circleCorrect = selected[i] === item.correct;
      const inputCorrect =
        answers[i].toLowerCase() === item.correctInput.toLowerCase();
      if (!circleCorrect || !inputCorrect) {
        wrong.push(i);
      }
    });

    setWrongInputs(wrong);
    setShowResult(true);

    const total = items.length * 2; // 8 نقاط
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) {
      ValidationAlert.success(scoreMessage);
    } else if (score === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
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
          // gap: "30px",
        
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">C</span> Tap or click the word for each
          picture.
        </h5>

        <div className="question-grid-wb-unit8-p6-q3">
          {items.map((item, i) => (
            <div className="question-box-wb-unit8-p6-q3" key={i}>
              <div style={{ display: "flex", gap: "20px" }}>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#1d4f7b",
                  }}
                >
                  {i + 1}
                </span>
                <div className="img-option-wb-unit8-p6-q3">
                  <img src={item.img} className="q-img-wb-unit8-p6-q3" />

                  {/* f / v choices */}
                  <div className="choices-wb-unit8-p6-q3">
                    {item.options.map((choice, idx) => (
                      <div className="circle-wrapper" key={idx}>
                        <div
                          className={`circle-choice-unit6-page6-q2 ${
                            selected[i] === choice ? "active" : ""
                          }`}
                          onClick={() => handleSelect(choice, i)}
                        >
                          {choice}
                        </div>

                        {/* علامة الخطأ */}
                        {!locked &&
                          showResult &&
                          selected[i] === choice &&
                          choice !== item.correct && (
                            <div className="wrong-mark">✕</div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* writing input */}
              <div className="input-wrapper-unit6-p6-q2">
                {item.input}
                <input
                  type="text"
                  className="write-input-wb-unit8-p6-q3"
                  value={answers[i]}
                  readOnly
                />
                {/* X فوق الإنبت إذا كانت الكلمة غلط */}
                {!locked &&
                  showResult &&
                  answers[i].trim() !== "" &&
                  answers[i].trim().toLowerCase() !==
                    item.correctInput.toLowerCase() &&
                  wrongInputs.includes(i) && (
                    <div className="wrong-mark">✕</div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>
        {/* ⭐⭐⭐ NEW — زر Show Answer */}
        <button onClick={showAnswers} className="show-answer-btn swal-continue">
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit8_Page6_Q3;
