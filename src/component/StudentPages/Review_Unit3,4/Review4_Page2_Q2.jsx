import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review4_Page2_Q2.css";
import sound1 from "../../../assets/unit4/sounds/U4P37EXEF.mp3";
import bat from "../../../assets/unit4/imgs/U4P37EXEF-01.svg";
import box from "../../../assets/unit4/imgs/U4P37EXEF-02.svg";
import bucket from "../../../assets/unit4/imgs/U4P37EXEF-03.svg";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Review4_Page2_Q2 = () => {
  const [answers, setAnswers] = useState([null, null, null]);
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer
  const items = [
    { img: bat, correct: "f" },
    { img: box, correct: "f" },
    { img: bucket, correct: "v" },
  ];
  const stopAtSecond = 9.02;

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 9.02,
      text: "Page 37, Exercise F. What is the beginning sound or the word? Listen and circle. ",
    },
    {
      start: 9.04,
      end: 10.14,
      text: "Farm.",
    },
    { start: 10.16, end: 11.08, text: "Fever." },
    { start: 11.1, end: 12.19, text: "Valley." },
  ];

  const handleSelect = (index, value) => {
    if (locked) return; // ⭐ NEW — منع التعديل بعد Show Answer
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    // 🔥 يمنع بقاء الإكس بعد ما يغيّر الطالب جوابه
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (locked) return; // ⭐ NEW — منع التعديل بعد Show Answer
    if (answers.includes(null)) {
      ValidationAlert.info("Oops!", "Please answer all items first.");
      return;
    }

    const correctCount = answers.filter(
      (a, i) => a?.toLowerCase() === items[i].correct?.toLowerCase(),
    ).length;

    const total = items.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    setLocked(true); // ⭐ NEW — قفل التعديل بعد Check
    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setTimeout(() => setShowResult(true), 200);
  };

  const resetAnswers = () => {
    setAnswers([null, null, null]);
    setShowResult(false);
    setLocked(false); // ⭐ NEW — إعادة فتح التعديل
  };

  // ⭐⭐⭐ NEW — Show Answer
  const showAnswer = () => {
    const correctFilled = items.map((item) => item.correct);

    setAnswers(correctFilled); // ضع الإجابات الصحيحة
    setShowResult(true); // إظهار النتيجة
    setLocked(true); // قفل الخيارات
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
          gap: "40px",
        }}
      >
        <div className="w-full">
          <h5 className="header-title-page8">
            <span className="mr-2">F</span> Listen and tap or click on the
            beginning letter.
          </h5>
        </div>
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />

        <div
          className="imgFeild"
          style={{
            display: "flex",
            gap: "13px",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <div className="fv-container">
            {items.map((item, index) => (
              <div className="fv-item" key={index}>
                <div
                  style={{
                    display: "flex",
                    gap: "13px",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: "darkblue",
                      fontWeight: "600",
                    }}
                  >
                    {index + 1}
                  </span>
                  <img src={item.img} className="fv-image" />
                </div>
                <div className="fv-options">
                  {/* B OPTION */}
                  <span
                    style={{ position: "relative" }}
                    className={`fv-option 
                    ${answers[index] === "f" ? "selected-review4-p2-q2" : ""}
                    ${
                      showResult &&
                      answers[index] === "f" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "f")}
                  >
                    f
                    {showResult &&
                      answers[index] === "f" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x-fv">✕</span>
                      )}
                  </span>

                  {/* P OPTION */}
                  <span
                    style={{ position: "relative" }}
                    className={`fv-option 
                    ${answers[index] === "v" ? "selected-review4-p2-q2" : ""}
                    ${
                      showResult &&
                      answers[index] === "v" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "v")}
                  >
                    v
                    {showResult &&
                      answers[index] === "v" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x-fv">✕</span>
                      )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={resetAnswers} className="try-again-button">
          Start Again ↻
        </button>
        {/* ⭐⭐⭐ NEW — زر Show Answer */}
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

export default Review4_Page2_Q2;
