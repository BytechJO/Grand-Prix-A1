import React, { useState } from "react";
import img1 from "../../../assets/unit4/imgs/U4P36EXEB-01.svg";
import img2 from "../../../assets/unit4/imgs/U4P36EXEB-02.svg";
import img3 from "../../../assets/unit3/imgs3/P27exeE-03.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review4_Page1_Q2.css";

const Review4_Page1_Q2 = () => {
  const questions = [
    {
      id: 1,
      image: img1,
      items: [
        { text: "It’s a red boat.", correct: "x" },
        { text: "It’s a blue boat.", correct: "✓" },
      ],
    },
    {
      id: 2,
      image: img2,
      items: [
        { text: "It’s a brown goat.", correct: "✓" },
        { text: "It’s a red goat.", correct: "x" },
      ],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل

  const handleSelect = (qId, idx) => {
    if (locked) return; // ⭐ NEW — منع التعديل بعد Show Answer

    setAnswers({
      ...answers,
      [qId]: idx,
    });
    setResults({});
  };

  const checkAnswers = () => {
    if (locked) return; // ⭐ NEW — منع التعديل بعد Show Answer
    const temp = {};
    let correctCount = 0;
    let total = questions.length;

    questions.forEach((q) => {
      const chosenIndex = answers[q.id];

      if (chosenIndex === undefined) {
        temp[q.id] = "empty";
        return;
      }

      const isCorrect = q.items[chosenIndex].correct.toLowerCase() === "✓";

      temp[q.id] = isCorrect ? "correct" : "wrong";

      if (isCorrect) correctCount++;
    });

    setResults(temp);

    if (Object.values(temp).includes("empty")) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size:20px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setLocked(true); // ⭐ NEW — منع التعديل بعد Check
  };

  const reset = () => {
    setAnswers({});
    setResults({});
    setLocked(false); // ⭐ NEW — إعادة التعديل
  };

  // ⭐⭐⭐ NEW — showAnswer
  const showAnswer = () => {
    const correctSelections = {};

    questions.forEach((q) => {
      const correctIdx = q.items.findIndex((item) => item.correct === "✓");
      correctSelections[q.id] = correctIdx;
    });

    setAnswers(correctSelections);
    setResults(() => {
      const res = {};
      questions.forEach((q) => (res[q.id] = "correct"));
      return res;
    });

    setLocked(true); // قفل التعديل
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
          gap: "100px",
        }}
      >
        <h4 className="header-title-page8">
          B Look, read, and tap or click the correct answer.
        </h4>

        <div className="review4-p1-q2-grid">
          {questions.map((q) => (
            <div key={q.id} className="review4-p1-q2-box">
              <img src={q.image} alt="" className="review4-p1-q2-img" />
              <div className="flex flex-col h-full justify-around">
                {q.items.map((item, idx) => {
                  const isSelected = answers[q.id] === idx;
                  const isWrong = results[q.id] === "wrong" && isSelected;

                  return (
                    <div key={idx} className="review3-p1-q3-row">
                      <span className="text-[20px]">{item.text}</span>

                      <div className="review3-p1-q3-input-box">
                        <input
                          type="text"
                          readOnly
                          value={isSelected ? "✓" : ""}
                          onFocus={() => handleSelect(q.id, idx)}
                          className={`review3-p1-q3-input`}
                        />

                        {isWrong && <span className="review3-p1-q3-x">✕</span>}
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
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        {/* ⭐⭐⭐ NEW BUTTON */}
        <button onClick={showAnswer} className="show-answer-btn swal-continue">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review4_Page1_Q2;
