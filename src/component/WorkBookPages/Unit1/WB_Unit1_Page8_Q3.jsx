import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page8_Q3.css";
import sound1 from "../../../assets/U1 WB/U1/Audio/RWBU1P8EXEC.mp3";
import bat from "../../../assets/U1 WB/U1/SVG/U1P8EXEC-01.svg";
import box from "../../../assets/U1 WB/U1/SVG/U1P8EXEC-02.svg";
import bucket from "../../../assets/U1 WB/U1/SVG/U1P8EXEC-03.svg";
import boat from "../../../assets/U1 WB/U1/SVG/U1P8EXEC-04.svg";
import img5 from "../../../assets/U1 WB/U1/SVG/U1P8EXEC-05.svg";
import img6 from "../../../assets/U1 WB/U1/SVG/U1P8EXEC-06.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const WB_Unit1_Page8_Q3 = () => {
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [showResult, setShowResult] = useState(false);
  const stopAtSecond = 5.1;
  const [showAnswer, setShowAnswer] = useState(false);

  const items = [
    { img: bat, correct: "d" },
    { img: box, correct: "t" },
    { img: bucket, correct: "d" },
    { img: boat, correct: "d" },
    { img: img5, correct: "t" },
    { img: img6, correct: "t" },
  ];
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 5.16,
      text: "Phonics Exercise C. Listen, look, and circle. ",
    },
    {
      start: 5.18,
      end: 7.08,
      text: "1.	door. ",
    },
    { start: 7.1, end: 8.28, text: "2.	toy." },
    { start: 8.3, end: 11.24, text: "3.	doll." },
    { start: 11.26, end: 13.2, text: "4. desk." },
    { start: 13.22, end: 15.25, text: "5. train." },
    { start: 15.27, end: 17.25, text: "6. telephone." },
  ];

 
  const handleSelect = (index, value) => {
    if (showAnswer || showResult) return; // ❌ يمنع التغيير بعد Show Answer

    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (showAnswer || showResult) return; // ❌ يمنع التغيير بعد Show Answer
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
    setAnswers([null, null, null, null]);
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
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">C</span> Drag and drop the words.
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
            width:"100%",
            flexDirection: "column",
          }}
        >
          <div className="dt-container-wb-u1-p8-q3 ">
            {items.map((item, index) => (
              <div className="dt-item-wb-u1-p8-q3" key={index}>
                <img src={item.img} className="dt-image-wb-u1-p8-q3" />
                <div className="dt-options-wb-u1-p8-q3">
                  {/* B OPTION */}
                  <span
                    className={`bp-option 
                    ${answers[index] === "d" ? "selected" : ""}
                    ${
                      showResult &&
                      answers[index] === "d" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "d")}
                  >
                   D
                    {showResult &&
                      answers[index] === "d" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x-wb-u1-p8-q3">✕</span>
                      )}
                  </span>

                  {/* P OPTION */}
                  <span
                    className={`bp-option 
                    ${answers[index] === "t" ? "selected" : ""}
                    ${
                      showResult &&
                      answers[index] === "t" &&
                      answers[index] !== item.correct
                        ? "wrong-answer"
                        : ""
                    }`}
                    onClick={() => handleSelect(index, "t")}
                  >
                    T
                    {showResult &&
                      answers[index] === "t" &&
                      answers[index] !== item.correct && (
                        <span className="wrong-x-wb-u1-p8-q3">✕</span>
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

export default WB_Unit1_Page8_Q3;
