import React, { useState, useEffect, useRef } from "react";
import "./WB_Unit9_Page6_Q2.css";
import sound1 from "../../../assets/U1 WB/U9/audio/cd11pg56-instruction1-adult-lady_ynLikPrn.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

import img1 from "../../../assets/U1 WB/U9/U9P56EXEB01-01.svg";
import img2 from "../../../assets/U1 WB/U9/U9P56EXEB01-02.svg";
import img3 from "../../../assets/U1 WB/U9/U9P56EXEB01-03.svg";
import img4 from "../../../assets/U1 WB/U9/U9P56EXEB02-01.svg";
import img5 from "../../../assets/U1 WB/U9/U9P56EXEB02-02.svg";
import img6 from "../../../assets/U1 WB/U9/U9P56EXEB02-03.svg";
const data = [
  {
    id: 1,
    src1: img1,
    src2: img2,
    src3: img3,
    options: [
      { label: "Fish", answer: true },
      { label: "Kite", answer: false },
      { label: "Knight", answer: false },
    ],
  },
  {
    id: 2,
    src1: img4,
    src2: img5,
    src3: img6,
    options: [
      { label: "Crib", answer: false },
      { label: "Knight", answer: true },
      { label: "Fish", answer: false },
    ],
  },
];

const WB_Unit9_Page6_Q2 = () => {
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const stopAtSecond = 7.28;

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 7.28,
      text: "Phonics exercise B. Which picture has a different sound? Listen and write X.",
    },
    {
      start: 7.87,
      end: 12.08,
      text: "1, pink, moon, needle.",
    },
    {
      start: 12.73,
      end: 17.18,
      text: "2, note, mule, newspaper.",
    },
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
        style={{
          gap: "60px",
        }}
      >
        <h5 className="header-title-page8" style={{ alignItems: "baseline" }}>
          <span className="ex-A">B</span> Which picture has a{" "}
          <span style={{ color: "red" }}>different beginning sound</span>?
          Listen and tap or click<span style={{ color: "red" }}>✕</span> .
        </h5>

        <QuestionAudioPlayer
          src={sound1}
          stopAtSecond={stopAtSecond}
          captions={captions}
        />
        <div className="shorti-container-wb-unit9-p6-q2 ">
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

              <div
                key={question.id}
                className="question-box2-review6-p2-q1"
                style={{ gap: "5px" }}
              >
                {/* <span className="question-number">{question.id}</span> */}

                {/* الصورة الواحدة */}
                <div style={{ display: "flex" }}>
                  <img
                    src={question.src1}
                    className="main-img-wb-unit9-p6-q2"
                    alt=""
                  />
                  <img
                    src={question.src2}
                    className="main-img-wb-unit9-p6-q2"
                    alt=""
                  />
                  <img
                    src={question.src3}
                    className="main-img-wb-unit9-p6-q2"
                    alt=""
                  />
                </div>
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
                          <span className="wrong-x-circle-wb-unit8-p6-q2">
                            ✕
                          </span>
                        )}

                      <span className="check-box-review6-p2-q1">
                        {selected[question.id] === index ? "✕" : ""}
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

export default WB_Unit9_Page6_Q2;
