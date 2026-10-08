import React, { useState, useEffect, useRef } from "react";
import "./WB_Unit8_Page6_Q2.css";
import sound1 from "../../../assets/U1 WB/U8/audio/cd10pg50-instruction1-adult-lady_1N1yIVsG.mp3";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U8/U8P50EXEB-01.svg";
import img2 from "../../../assets/U1 WB/U8/U8P50EXEB-02.svg";
import img3 from "../../../assets/U1 WB/U8/U8P50EXEB-03.svg";
import img4 from "../../../assets/U1 WB/U8/U8P50EXEB-04.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const data = [
  {
    id: 1,
    src: img1,
    options: [
      { label: "Fish", answer: false },
      { label: "Kite", answer: false },
      { label: "Knight", answer: true },
    ],
  },
  {
    id: 2,
    src: img2,
    options: [
      { label: "Crib", answer: false },
      { label: "Knight", answer: true },
      { label: "Fish", answer: false },
    ],
  },
  {
    id: 3,
    src: img3,
    options: [
      { label: "Five", answer: false },
      { label: "Knight", answer: false },
      { label: "Lips", answer: true },
    ],
  },
  {
    id: 4,
    src: img4,
    options: [
      { label: "Ice", answer: false },
      { label: "Figs", answer: false },
      { label: "Figs", answer: true },
    ],
  },
];

const WB_Unit8_Page6_Q2 = () => {
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const stopAtSecond = 7.34;

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 7.34,
      text: "Phonics exercise B. Which picture begins with a different sound? Listen and write X.",
    },
    {
      start: 8.05,
      end: 12.0,
      text: "1, zebra, zipper, seal.",
    },
    {
      start: 12.58,
      end: 16.76,
      text: "2, soup, zoo, sea.",
    },
    {
      start: 17.47,
      end: 21.94,
      text: "3, sun, sponge, zebra.",
    },
    {
      start: 22.71,
      end: 26.88,
      text: "4, zoo, zipper, sponge.",
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
          gap: "5px",
         
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">B</span> Which picture begins with a
          <span style={{ color: "red" }}>different sound?</span> Listen and tap
          or click <span style={{ color: "red" }}>✕</span> .
        </h5>
        <QuestionAudioPlayer
          src={sound1}
          stopAtSecond={stopAtSecond}
          captions={captions}
        />

        <div className="shorti-container-wb-unit8-p6-q2 ">
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
                {/* <span className="question-number">{question.id}</span> */}

                {/* الصورة الواحدة */}
                <img
                  src={question.src}
                  className="main-img-wb-unit8-p6-q2"
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

export default WB_Unit8_Page6_Q2;
