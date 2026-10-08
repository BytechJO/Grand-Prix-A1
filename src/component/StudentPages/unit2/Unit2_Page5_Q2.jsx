import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit2_Page5.css";
import sound1 from "../../../assets/unit1/sounds/P14Q2.mp3";
import bat from "../../../assets/img_unit2/imgs/bat.jpg";
import box from "../../../assets/img_unit2/imgs/box.jpg";
import bucket from "../../../assets/img_unit2/imgs/bucket.jpg";
import boat from "../../../assets/img_unit2/imgs/boat.jpg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit2_Page5_Q2 = () => {
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [showResult, setShowResult] = useState(false);
  const stopAtSecond = 11.18;
  const [showAnswer, setShowAnswer] = useState(false);

  const items = [
    { img: bat, correct: "b" },
    { img: box, correct: "p" },
    { img: bucket, correct: "b" },
    { img: boat, correct: "b" },
  ];
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 5.16,
      text: "Page 14, Right activities. Exercise A, number two. ",
    },
    {
      start: 5.18,
      end: 11.18,
      text: "Does it begin with a B or P? Listen and circle. ",
    },
    { start: 11.2, end: 12.28, text: "Bat." },
    { start: 12.3, end: 13.22, text: "Pail." },
    { start: 13.24, end: 14.19, text: "Box. " },
    { start: 14.21, end: 15.13, text: "Boat." },
  ];

  const handleSelect = (index, value) => {
    if (showAnswer) return; // ❌ يمنع التغيير بعد Show Answer

    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (showAnswer) return; // ❌ يمنع التغيير بعد Show Answer
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

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setTimeout(() => setShowResult(true), 200);
  };
  const handleShowAnswer = () => {
    // تحديد الإجابات الصحيحة تلقائياً
    const correctAnswers = items.map((item) => item.correct);

    setAnswers(correctAnswers);
    setShowResult(true);
    setShowAnswer(true); // يمنع أي تعديل بعد هيك
  };

  const resetAnswers = () => {
    setAnswers(Array(items.length).fill(null));
    setShowResult(false);
    setShowAnswer(false); // يمنع أي تعديل بعد هيك
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
            <span style={{ color: "purple" }}>2</span> Does it begin with{" "}
            <span style={{ color: "red" }}>b</span> or{" "}
            <span style={{ color: "red" }}>p</span>? Listen and circle.
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
          <div className="bp-container">
            {items.map((item, index) => (
              <div className="bp-item" key={index}>
                <img src={item.img} className="bp-image" />
                <div className="bp-options">
                  {/* B OPTION */}
                  <span
                    style={{ position: "relative" }}
                    className={`bp-option 
                    ${answers[index] === "b" ? "selected" : ""}
                    ${
                      showResult &&
                      answers[index] === "b" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "b")}
                  >
                    b
                    {showResult &&
                      answers[index] === "b" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x-u2-p5-q2">✕</span>
                      )}
                  </span>

                  {/* P OPTION */}
                  <span
                    style={{ position: "relative" }}
                    className={`bp-option 
                    ${answers[index] === "p" ? "selected" : ""}
                    ${
                      showResult &&
                      answers[index] === "p" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "p")}
                  >
                    p
                    {showResult &&
                      answers[index] === "p" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x-u2-p5-q2">✕</span>
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
        <button onClick={handleShowAnswer} className="show-answer-btn">
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit2_Page5_Q2;
