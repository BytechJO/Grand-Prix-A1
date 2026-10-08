import React, { useState, useEffect, useRef } from "react";
import "./Review6_Page2_Q1.css";
import sound1 from "../../../assets/unit6/sounds/U6P55EXED.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/unit6/imgs/U6P55EXED-01.svg";
import img2 from "../../../assets/unit6/imgs/U6P55EXED-02.svg";
import img3 from "../../../assets/unit6/imgs/U6P55EXED-03.svg";
import img4 from "../../../assets/unit6/imgs/U6P55EXED-04.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const data = [
  {
    id: 1,
    src: img1,
    options: [
      { label: "Fish", answer: true },
      { label: "Kite", answer: false },
    ],
  },
  {
    id: 2,
    src: img2,
    options: [
      { label: "Crib", answer: true },
      { label: "Knight", answer: false },
    ],
  },
  {
    id: 3,
    src: img3,
    options: [
      { label: "Five", answer: false },
      { label: "Lips", answer: true },
    ],
  },
  {
    id: 4,
    src: img4,
    options: [
      { label: "Ice", answer: false },
      { label: "Figs", answer: true },
    ],
  },
];

const Review6_Page2_Q1 = () => {
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const stopAtSecond = 7.9;

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 8.1,
      text: "Page 55, exercise D, which picture has the short I sound? Listen and write check. ",
    },
    { start: 8.12, end: 11.17, text: " 1. Fish, kite.  " },
    { start: 11.19, end: 14.23, text: "2. Crib, knight. " },
    { start: 14.25, end: 18.03, text: "3. Five, lips. " },
    { start: 18.05, end: 21.2, text: "4. Ice, figs." },
  ];

  const checkAnswers = () => {
    if (locked) return; // 🔒 منع التعديل بعد رؤية الحل

    const totalQuestions = data.length;
    let correct = 0;

    // تأكد إنو جاوب كل الأسئلة
    for (let q of data) {
      if (selected[q.id] === undefined) {
        ValidationAlert.info("");
        return;
      }
    }

    // حساب عدد الإجابات الصحيحة
    data.forEach((q) => {
      const chosenIndex = selected[q.id];
      if (q.options[chosenIndex].answer === true) {
        correct++;
      }
    });
    const color =
      correct === totalQuestions ? "green" : correct === 0 ? "red" : "orange";
    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
      Score: ${correct} / ${totalQuestions}
      </span>
    </div>
  `;

    // النتيجة
    if (correct === totalQuestions) {
      ValidationAlert.success(scoreMessage);
    } else if (correct === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
    setShowResult(true);
    setLocked(true);
  };
  const handleSelect = (qId, index) => {
    if (locked) return; // 🔒 منع التعديل بعد رؤية الحل
    setSelected((prev) => ({ ...prev, [qId]: index }));
    setShowResult(false);
  };
  const showAnswers = () => {
    const correctSelection = {};

    data.forEach((q) => {
      const correctIndex = q.options.findIndex((opt) => opt.answer === true);
      correctSelection[q.id] = correctIndex;
    });

    setSelected(correctSelection);
    setShowResult(false);
    setLocked(true);
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
        style={
          {
            // gap: "30px",
          }
        }
      >
        <h5 className="header-title-page8">
          D Which picture has the <span style={{ color: "red" }}>short i</span>{" "}
          sound? Listen and tap or click.{" "}
          <span style={{ color: "red" }}>✓</span> .
        </h5>
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />

        <div className="shorti-container-review6-p2-q1 w-full">
          {data.map((question) => (
            <div key={question.id} className="question-box-review6-p2-q1 ">
              <span
                style={{
                  color: "darkblue",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                {question.id}
              </span>

              <div key={question.id} className="question-box2-review6-p2-q1">
                {/* الصورة الواحدة */}
                <img
                  src={question.src}
                  className="main-img-review6-p2-q1"
                  alt=""
                />

                {/* الخيارات */}
                <div className="options-review6-p2-q1">
                  {question.options.map((opt, index) => (
                    <div
                      key={index}
                      className={`option-review6-p2-q1 ${
                        selected[question.id] === index
                          ? "selected-review6-p2-q1"
                          : ""
                      }`}
                      onClick={() => handleSelect(question.id, index)}
                    >
                      {/* X عند الغلط */}
                      {showResult &&
                        selected[question.id] === index &&
                        opt.answer === false && (
                          <span className="wrong-x-circle-review6-p2-q1">
                            ✕
                          </span>
                        )}

                      <span className="check-box-review6-p2-q1">
                        {selected[question.id] === index ? "✓" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button
          className="try-again-button"
          onClick={() => {
            setSelected({});
            setShowResult(false);
            setLocked(false);
          }}
        >
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review6_Page2_Q1;
