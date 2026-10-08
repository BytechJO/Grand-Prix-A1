import React, { useState } from "react";
import img1 from "../../../assets/unit10/imgs/U10P88EXEC-01.svg";
import img2 from "../../../assets/unit10/imgs/U10P88EXEC-02.svg";
import img3 from "../../../assets/unit10/imgs/U10P88EXEC-03.svg";
import img4 from "../../../assets/unit10/imgs/U10P88EXEC-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review9_Page1_Q3.css";

const Review9_Page1_Q3 = () => {
  const questions = [
    {
      id: 1,
      image: img3,
      mainImg: img1,
      text: "What does she like?",
      items: [
        { text: "She likes horses.", correct: "x" },
        { text: "She likes chickens.", correct: "✓" },
      ],
    },
    {
      id: 2,
      image: img4,
      mainImg: img2,
      text: "What does he like?",
      items: [
        { text: "He likes dogs.", correct: "x" },
        { text: "He likes cats.", correct: "✓" },
      ],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  // -------------------------
  // اختيار جواب واحد فقط لكل سؤال
  // -------------------------
  const handleSelect = (qId, idx) => {
    if (showAnswer) return; // ❌ ممنوع التعديل بعد Show Answer
    setAnswers({
      ...answers,
      [qId]: idx, // نخزن رقم الخيار المختار
    });
    setResults({});
  };

  const checkAnswers = () => {
    if (showAnswer) return; // ❌ ممنوع التعديل بعد Show Answer
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
    setShowAnswer(true);
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
  };
  const reset = () => {
    setAnswers({});
    setResults({});
    setShowAnswer(false); // ← مهم جداً
  };
  const handleShowAnswer = () => {
    const correctAnswers = {};

    questions.forEach((q) => {
      const correctIndex = q.items.findIndex(
        (item) => item.correct.toLowerCase() === "✓",
      );
      correctAnswers[q.id] = correctIndex;
    });

    setAnswers(correctAnswers);
    setResults({});
    setShowAnswer(true);
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
          gap: "60px",
     
        }}
      >
        <div className="review3-p1-q3-wrapper">
          <h4 className="header-title-page8">
            <span className="mr-2">C</span> Look, read, and tap the correct answer. 
          
          </h4>

          <div className="review9-p1-q3-grid">
            <div className="flex flex-col gap-20">
              {questions.map((q) => (
                <div key={q.id} className="review9-p1-q3-box">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      // width:"100%",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img src={q.mainImg} className="review9-p1-q3-img" />{" "}
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <input
                          className="input-text-field"
                          style={{
                            border: "2px solid black",
                            fontSize: "18px",
                            borderRadius: "8px",
                          }}
                          value={q.text}
                        />
                      </div>{" "}
                    </div>

                    {/* <span className="Unit5-P6-Q3-text">{q.text}</span> */}
                  </div>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img src={q.image} alt="" className="review9-p1-q3-img" />
                    <div>
                      {q.items.map((item, idx) => {
                        const isSelected = answers[q.id] === idx;
                        const isWrong = results[q.id] === "wrong" && isSelected;

                        return (
                          <div key={idx} className="review3-p1-q3-row">
                            <span className="review9-p1-q3-text">
                              {item.text}
                            </span>

                            <div className="review3-p1-q3-input-box">
                              <input
                                type="text"
                                readOnly
                                value={isSelected ? "✓" : ""}
                                onFocus={() => handleSelect(q.id, idx)}
                                className={`review3-p1-q3-input`}
                                disabled={showAnswer}
                                style={{
                                  cursor: showAnswer
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              />

                              { isWrong && (
                                <span className="review3-p1-q3-x">✕</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>
        {/* ⭐⭐⭐ NEW — زر Show Answer */}
        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review9_Page1_Q3;
