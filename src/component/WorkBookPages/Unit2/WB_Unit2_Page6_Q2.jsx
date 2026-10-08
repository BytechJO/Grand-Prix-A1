import React, { useState, useRef, useEffect } from "react";
import "./WB_Unit2_Page6_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/U1 WB/U2/U2P14EXEB01-01.svg";
import img2 from "../../../assets/U1 WB/U2/U2P14EXEB01-02.svg";
import img3 from "../../../assets/U1 WB/U2/U2P14EXEB01-03.svg";
import img4 from "../../../assets/U1 WB/U2/U2P14EXEB02-01.svg";
import img5 from "../../../assets/U1 WB/U2/U2P14EXEB02-02.svg";
import img6 from "../../../assets/U1 WB/U2/U2P14EXEB02-03.svg";
import img7 from "../../../assets/U1 WB/U2/U2P14EXEB03-01.svg";
import img8 from "../../../assets/U1 WB/U2/U2P14EXEB03-02.svg";
import img9 from "../../../assets/U1 WB/U2/U2P14EXEB03-03.svg";
import img10 from "../../../assets/U1 WB/U2/U2P14EXEB04-01.svg";
import img11 from "../../../assets/U1 WB/U2/U2P14EXEB04-02.svg";
import img12 from "../../../assets/U1 WB/U2/U2P14EXEB04-03.svg";
import sound1 from "../../../assets/U1 WB/U2/audio/cd3pg14-instruction1-adult-lady_VPBph8tW.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const data = [
  {
    id: 1,

    images: [
      { id: 1, src: img1, value: 1 },
      { id: 2, src: img2, value: 2 },
      { id: 3, src: img3, value: 3 },
    ],
    correct: [2],
  },
  {
    id: 2,

    images: [
      { id: 1, src: img4, value: 1 },
      { id: 2, src: img5, value: 2 },
      { id: 3, src: img6, value: 3 },
    ],
    correct: [1],
  },
  {
    id: 3,

    images: [
      { id: 1, src: img7, value: 1 },
      { id: 2, src: img8, value: 2 },
      { id: 3, src: img9, value: 3 },
    ],
    correct: [0],
  },
  {
    id: 4,

    images: [
      { id: 1, src: img10, value: 1 },
      { id: 2, src: img11, value: 2 },
      { id: 3, src: img12, value: 3 },
    ],
    correct: [1],
  },
];

export default function WB_Unit2_Page6_Q2() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // ⭐ NEW
  const stopAtSecond = 6.699;
  // -----------------------------------------------------------------------

  const handleSelect = (qId, value) => {
    if (showAnswer || submitted) return;

    setAnswers((prev) => {
      const current = prev[qId]?.[0];

      if (current === value) {
        return { ...prev, [qId]: [] }; // إلغاء الاختيار
      }

      return { ...prev, [qId]: [value] }; // استبدال
    });
  };

  const handleCheck = () => {
    if (showAnswer) return;
    if (!answers[data[0].id] || answers[data[0].id].length === 0) {
      ValidationAlert.info("Please select at least one picture in question 1.");
      return;
    }
    if (!answers[data[1].id] || answers[data[1].id].length === 0) {
      ValidationAlert.info("Please select at least one picture in question 2.");
      return;
    }

    let correctCount = 0;
    const total = data.reduce((sum, q) => sum + q.correct.length, 0);

    data.forEach((q) => {
      const studentAnswers = answers[q.id] || [];
      q.correct.forEach((correctValue) => {
        if (studentAnswers.includes(correctValue)) {
          correctCount++;
        }
      });
    });

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = ` 
      <div style="font-size:20px;text-align:center;margin-top:8px">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowAnswer(false); // ⭐ NEW
  };

  const handleShowAnswer = () => {
    const correctAnswers = {};

    data.forEach((q) => {
      correctAnswers[q.id] = q.correct; // أعطيه الإجابات الصحيحة لكل سؤال
    });

    setAnswers(correctAnswers);
    setShowAnswer(true);
    setSubmitted(true);
  };

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0.099,
      end: 6.699,
      text: "Phonics exercise B. Listen and circle the picture with a different beginning sound.",
    },

    {
      start: 7.379,
      end: 11.399,
      text: "1, bat, bowl, purse.",
    },

    {
      start: 12.039,
      end: 15.859,
      text: "2, plate, basket, pen.",
    },

    {
      start: 16.359,
      end: 20.619,
      text: "3, cat, balloon, ball.",
    },

    {
      start: 21.399,
      end: 25.759,
      text: "4, bread, pail, beans.",
    },
  ];

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
      <div className="div-forall" style={{ gap: "10px" }}>
        <h5 className="header-title-page8">
          <span className="ex-A">B</span>Listen and tap or click the picture
          with a different <span className="text-red-500">beginning sound</span>
        </h5>

        {/* AUDIO PLAYER — unchanged */}
        {/* 
-------------------------------------------------- */}
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
        {/* ... audio code remains as-is ... */}

        {/* -------------------------------------------------- */}
        <div className="content-container-wb-p6-q2">
          {data.map((q) => (
            <div
              key={q.id}
              className="question-row-Unit5_Page5_Q2"
              style={{ marginTop: "15px" }}
            >
              <span
                className="q-number"
                style={{
                  color: "#2c5287",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {q.id}
              </span>

              <div className="images-row-wb-unit2-p6-q2">
                {q.images.map((img) => {
                  const isSelected = answers[q.id]?.includes(img.value);
                  const isWrong =
                    submitted &&
                    isSelected &&
                    !q.correct.includes(img.value) &&
                    !showAnswer;

                  return (
                    <div
                      key={img.id}
                      className={`img-box-wb-unit2-p6-q2
                      ${isSelected ? "selected-Unit5_Page5_Q2" : ""} 
                      ${isWrong ? "wrong" : ""}`}
                      onClick={() => handleSelect(q.id, img.value)}
                    >
                      <img
                        src={img.src}
                        alt=""
                        style={{ height: "120px", objectFit: "cover" }}
                      />

                      {isWrong && (
                        <div className="wrong-mark-Unit5_Page5_Q2">✕</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button
          className="show-answer-btn swal-continue"
          onClick={handleShowAnswer}
        >
          Show Answer
        </button>

        <button onClick={handleCheck} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
}
