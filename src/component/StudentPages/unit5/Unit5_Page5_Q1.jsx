import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit5_Page5_Q1.css";
import sound1 from "../../../assets/unit5/sounds/U5P44EXEA1.mp3";
import bat from "../../../assets/unit5/imgs/U5P44EXEA1-01.svg";
import box from "../../../assets/unit5/imgs/U5P44EXEA1-02.svg";
import bucket from "../../../assets/unit5/imgs/U5P44EXEA1-03.svg";
import boat from "../../../assets/unit5/imgs/U5P44EXEA1-04.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const Unit5_Page5_Q1 = () => {
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [showResult, setShowResult] = useState(false);
  const stopAtSecond = 10.8;

  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer

  const items = [
    { img: bat, correct: "g" },
    { img: box, correct: "k" },
    { img: bucket, correct: "k" },
    { img: boat, correct: "g" },
  ];
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 5.13,
      text: "Page 44, Right Activities, Exercise A, Number 1.",
    },
    {
      start: 5.15,
      end: 10.25,
      text: " Does it begin with G or K? Listen and circle.",
    },
    { start: 10.27, end: 13.04, text: "1. Goat" },
    { start: 13.07, end: 15.1, text: "2. Kangaroo " },
    { start: 15.12, end: 17.18, text: "3. Kite " },
    { start: 17.2, end: 20.04, text: "4. Grapes" },
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
          gap: "60px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">A</span>
          <span style={{ color: "purple" }}>1</span>Does it begin with
          <span style={{ color: "red" }}>g</span> or{" "}
          <span style={{ color: "red" }}>k</span> ? Tap or click the beginning
          letter.
        </h5>

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
          <div className="gk-container-unit5-pg5-q1">
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
                    ${answers[index] === "g" ? "selected3" : ""}
                    ${
                      showResult &&
                      answers[index] === "g" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "g")}
                  >
                    g
                    {showResult &&
                      answers[index] === "g" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-mark-Unit5_Page5_Q1">✕</span>
                      )}
                  </span>

                  {/* P OPTION */}
                  <span
                    className={`gk-option 
                    ${answers[index] === "k" ? "selected3" : ""}
                    ${
                      showResult &&
                      answers[index] === "k" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "k")}
                  >
                    k
                    {showResult &&
                      answers[index] === "k" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-mark-Unit5_Page5_Q1">✕</span>
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

export default Unit5_Page5_Q1;
