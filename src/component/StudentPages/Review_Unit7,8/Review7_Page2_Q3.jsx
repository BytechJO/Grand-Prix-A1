import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page2_Q3.css";
import sound1 from "../../../assets/unit8/sound/U8P71EXEF.mp3";
import bat from "../../../assets/unit8/imgs/U8P71EXEF-01.svg";
import box from "../../../assets/unit8/imgs/U8P71EXEF-02.svg";
import bucket from "../../../assets/unit8/imgs/U8P71EXEF-03.svg";
import boat from "../../../assets/unit8/imgs/U8P71EXEF-04.svg";
import img5 from "../../../assets/unit8/imgs/U8P71EXEF-05.svg";
import img6 from "../../../assets/unit8/imgs/U8P71EXEF-06.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Review7_Page2_Q3 = () => {
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [showResult, setShowResult] = useState(false);
  const stopAtSecond = 5.98;

  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer

  const items = [
    { img: bat, correct: "w" },
    { img: box, correct: "h" },
    { img: bucket, correct: "w" },
    { img: boat, correct: "h" },
    { img: img5, correct: "w" },
    { img: img6, correct: "h" },
  ];
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 6.06,
      text: "Page 71, exercise F. Listen and circle the beginning sound ",
    },
    {
      start: 6.09,
      end: 8.11,
      text: "1-watch",
    },
    { start: 8.14, end: 10.17, text: "2- house" },
    { start: 10.2, end: 12.15, text: "3-whale" },
    { start: 12.19, end: 14.14, text: "4-hanger" },
    { start: 14.18, end: 16.22, text: "5-water" },
    { start: 16.25, end: 18.2, text: "6-hare" },
  ];

  const handleSelect = (index, value) => {
    if (locked) return; // ⭐ NEW — منع التعديل بعد Show Answer
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
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
    setAnswers(Array(items.length).fill(null));
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
          gap: "30px",
        }}
      >
        <div  className="w-full">
          <h5 className="header-title-page8">
            <span className="mr-2">F</span> Listen and tap or click the correct
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
            width: "100%",
            gap: "13px",
            flexDirection: "column",
          }}
        >
          <div className="wh-container-review7-p2-q3 w-full">
            {items.map((item, index) => (
              <div className="gk-item" key={index}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <span
                    className="q-number"
                    style={{
                      color: "#2c5287",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {index + 1}
                  </span>
                  <img src={item.img} className="gk-image" />
                </div>

                <div className="gk-options">
                  {/* B OPTION */}
                  <span
                    className={`gk-option 
                    ${answers[index] === "h" ? "selected" : ""}
                    ${
                      showResult &&
                      answers[index] === "h" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "h")}
                  >
                    h
                    {showResult &&
                      answers[index] === "h" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x">✕</span>
                      )}
                  </span>

                  {/* P OPTION */}
                  <span
                    className={`gk-option 
                    ${answers[index] === "w" ? "selected" : ""}
                    ${
                      showResult &&
                      answers[index] === "w" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "w")}
                  >
                    w
                    {showResult &&
                      answers[index] === "w" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x">✕</span>
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

export default Review7_Page2_Q3;
