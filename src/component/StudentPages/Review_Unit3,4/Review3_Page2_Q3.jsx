import React, { useState, useRef, useEffect } from "react";
import CD13_Pg14_Instruction1_AdultLady from "../../../assets/img_unit2/sounds-unit2/CD13.Pg14_Instruction1_Adult Lady.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page2_Q3.css";
import sound1 from "../../../assets/unit4/sounds/U4P35EXEF.mp3";
import img1 from "../../../assets/unit4/imgs/U4P35EXEF-01-01.svg";
import img2 from "../../../assets/unit4/imgs/U4P35EXEF-01-02.svg";
import img3 from "../../../assets/unit4/imgs/U4P35EXEF-02-01.svg";
import img4 from "../../../assets/unit4/imgs/U4P35EXEF-02-02.svg";
import img5 from "../../../assets/unit4/imgs/U4P35EXEF-03-01.svg";
import img6 from "../../../assets/unit4/imgs/U4P35EXEF-03-02.svg";
import img7 from "../../../assets/unit4/imgs/U4P35EXEF-04-01.svg";
import img8 from "../../../assets/unit4/imgs/U4P35EXEF-04-02.svg";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Review3_Page2_Q3 = () => {
  const [answers, setAnswers] = useState([null, null, null, null]);

  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false); // ⭐ NEW — يمنع التعديل بعد Show Answer
  const stopAtSecond = 6.26;

  // ----------- الداتا الجديدة الخاصة بسؤال short a ---------------
  const items = [
    {
      id: 1,
      items: [
        { img: img1, word: "dates", isShortA: false },
        { img: img2, word: "bag", isShortA: true },
      ],
    },
    {
      id: 2,
      items: [
        { img: img3, word: "lake", isShortA: false },
        { img: img4, word: "hat", isShortA: true },
      ],
    },
    {
      id: 3,
      items: [
        { img: img5, word: "flag", isShortA: true },
        { img: img6, word: "shape", isShortA: false },
      ],
    },
    {
      id: 4,
      items: [
        { img: img7, word: "cape", isShortA: false },
        { img: img8, word: "fan", isShortA: true },
      ],
    },
  ];
  // --------------------------------------------------------------

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 6.26,
      text: "Page 35, Exercise F. Which word has a short A? Listen and circle.",
    },
    {
      start: 6.28,
      end: 10.03,
      text: "1. Dates. Bag. ",
    },
    { start: 10.05, end: 12.19, text: "2. Lake. Hat." },
    { start: 12.21, end: 15.24, text: "3. Flag. Shape." },
    { start: 15.26, end: 19.09, text: "4. Cape. Fan." },
  ];

  const handleSelect = (index, value) => {
    if (locked) return; // ⭐ NEW — لا يسمح بالتعديل بعد Show Answer
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setShowResult(false);
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    if (locked) return; // ⭐ NEW — لا يسمح بالتعديل بعد Show Answer
    if (answers.includes(null)) {
      ValidationAlert.info("Oops!", "Please answer all items first.");
      return;
    }

    const correctCount = answers.filter(
      (selected, i) => items[i].items[selected]?.isShortA,
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

    setLocked(true); // ⭐ NEW — إغلاق التعديل بعد check
  };

  const resetAnswers = () => {
    setAnswers(Array(items.length).fill(null));
    setShowResult(false);
    setLocked(false); // ⭐ NEW — فتح التعديل
  };

  // ⭐⭐⭐ NEW — Show Answer
  const showAnswer = () => {
    const correctSelections = items.map((item) =>
      item.items.findIndex((choice) => choice.isShortA),
    );

    setAnswers(correctSelections); // تحديد الإجابات الصحيحة
    setShowResult(true); // أظهر النتيجة
    setLocked(true); // اقفل التعديل
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
        <div>
          <h5 className="header-title-page8">
            <span className="mr-2">F</span> Which word has a{" "}
            <span style={{ color: "red" }}>short a</span>
            ?Listen and tap or click.
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
          <div className="container-review3-p2-q3">
            {items.map((item, index) => (
              <div className="shortA-options">
                {item.items.map((choice, chIndex) => (
                  <div
                    key={chIndex}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img src={choice.img} className="shortA-img" />
                    <p
                      className={`shortA-word
                           ${answers[index] === chIndex ? "selected" : ""}
                           ${showResult && choice.isShortA ? "correct" : ""}
                           ${showResult && answers[index] === chIndex && !choice.isShortA ? "wrong" : ""}`}
                      onClick={() => handleSelect(index, chIndex)}
                    >
                      {choice.word}{" "}
                      {locked &&
                      answers[index] === chIndex &&
                      !choice.isShortA ? (
                        <span className="review3-p2-q3-wrong-x">✕</span>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={resetAnswers} className="try-again-button">
          Start Again ↻
        </button>
        {/* ⭐⭐⭐ NEW: زر Show Answer */}
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

export default Review3_Page2_Q3;
