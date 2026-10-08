import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit7_Page1_Q2.css";
import bat from "../../../assets/U1 WB/U7/U7P39EXEB-01.svg";
import box from "../../../assets/U1 WB/U7/U7P39EXEB-02.svg";
import bucket from "../../../assets/U1 WB/U7/U7P39EXEB-03.svg";
import boat from "../../../assets/U1 WB/U1/SVG/U1P8EXEC-04.svg";

export default function WB_Unit7_Page1_Q2() {
  const questions = [
    { id: 1, correct: "hungry", options: ["sad", "hungry"], image: bat },
    { id: 2, correct: "scared", options: ["scared", "hungry"], image: box },
    { id: 3, correct: "happy", options: ["happy", "bored"], image: bucket },
  ];

  const colors = ["red", "blue", "green", "orange", "purple", "yellow"];
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [locked, setLocked] = useState(false);
  // الرقم الذي تم الضغط عليه
  const [selectedNumber, setSelectedNumber] = useState(null);
  // { qIndex: 0, value: 2 }

  // الإجابات (رقم + لون)
  const [answers, setAnswers] = useState({});
  // { 0: { value: "hungry", color: "red" } }

  const handleOptionClick = (qIndex, word) => {
    if (locked) return;
    setSelectedNumber({ qIndex, value: word });
  };

  const applyColor = (color) => {
    if (!selectedNumber) return;

    setAnswers((prev) => ({
      ...prev,
      [selectedNumber.qIndex]: {
        value: selectedNumber.value,
        color,
      },
    }));

    setSelectedNumber(null);
  };

  const checkAnswers2 = () => {
    if (locked) return;
    const notAnswered = questions.some((_, index) => !answers[index]);

    if (notAnswered) {
      ValidationAlert.info(
        "Oops!",
        "Please choose a number for all pictures before checking.",
      );
      return;
    }

    let correct = 0;
    let wrong = [];

    questions.forEach((q, index) => {
      if (answers[index]?.value === q.correct) {
        correct++;
      } else {
        wrong.push(index); // ❌ خزّني السؤال الغلط
      }
    });

    setWrongAnswers(wrong);
    setLocked(true); // 🔒 قفل التعديل بعد Check Answer
    if (correct === questions.length) {
      ValidationAlert.success(`Score: ${correct}/${questions.length}`);
    } else if (correct === 0) {
      ValidationAlert.error(`Score: ${correct}/${questions.length}`);
    } else {
      ValidationAlert.warning(`Score: ${correct}/${questions.length}`);
    }
  };
  const showAnswer = () => {
    const correctAnswers = {};

    questions.forEach((q, index) => {
      correctAnswers[index] = {
        value: q.correct,
        color: "red",
      };
    });
    setLocked(true);
    setAnswers(correctAnswers);
    setSelectedNumber(null);
    setWrongAnswers([]); // نخفي الإكسات
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "30px" }}>
      <div className="div-forall" style={{gap:"30px" }}>
        <h4 className="header-title-page8">
          <span className="ex-A">B</span> Color the correct word.
        </h4>

        {/* 🎨 Color Palette */}
        {selectedNumber && (
          <div className="color-palette-wb-u1-p7-q1">
            {colors.map((c) => (
              <div
                key={c}
                className="color-circle"
                style={{ backgroundColor: c }}
                onClick={() => applyColor(c)}
              />
            ))}
            {/* 🧽 زر المسح */}
            <div
              className="color-circle erase"
              onClick={() => {
                setSelectedNumber(null);
              }}
            >
              ✕
            </div>
          </div>
        )}

        <div className="word-section1-wb-u7-p1-q2">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="question-box-wb-u3-p1-q2">
              <img
                src={q.image}
                alt=""
                style={{ height: "170px", width: "auto" }}
              />

              <div className="numbers-row-wb-u7-p1-q2">
                {q.options.map((num) => (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <span
                      className="number-option-wb-u7-p1-q2"
                      style={{
                        color:
                          answers[qIndex]?.value === num
                            ? answers[qIndex]?.color
                            : "transparent",

                        WebkitTextStrokeColor:
                          answers[qIndex]?.value === num
                            ? answers[qIndex]?.color
                            : "#333",
                      }}
                      aria-disabled={locked}
                      onClick={() => handleOptionClick(qIndex, num)}
                    >
                      {num}
                    </span>

                    {wrongAnswers.includes(qIndex) &&
                      answers[qIndex]?.value === num && (
                        <span className="wrong-mark-circle">✕</span>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button
          onClick={() => {
            setAnswers({});
            setSelectedNumber(null);
            setWrongAnswers([]);
            setLocked(false);
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
        <button onClick={showAnswer} className="show-answer-btn swal-continue">
          Show Answer
        </button>

        <button onClick={checkAnswers2} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
}
