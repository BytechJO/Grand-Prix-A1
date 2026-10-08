import React, { useState, useRef, useEffect } from "react";
import "./Unit7_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/unit7/img/U7P62EXEA2-01.svg";
import img2 from "../../../assets/unit7/img/U7P62EXEA2-02.svg";
import img3 from "../../../assets/unit7/img/U7P62EXEA2-03.svg";
import img4 from "../../../assets/unit7/img/U7P62EXEA2-04.svg";
import img5 from "../../../assets/unit7/img/U7P62EXEA2-05.svg";
import img6 from "../../../assets/unit7/img/U7P62EXEA2-06.svg";
import img7 from "../../../assets/unit7/img/U7P62EXEA2-07.svg";
import img8 from "../../../assets/unit7/img/U7P62EXEA2-08.svg";
import img9 from "../../../assets/unit7/img/U7P62EXEA2-09.svg";
import img10 from "../../../assets/unit7/img/U7P62EXEA2-10.svg";
import sound1 from "../../../assets/unit7/sound/U7P62EXEA2.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const data = [
  {
    id: 1,
    letter: "w",
    images: [
      { id: 1, src: img1, value: 1 },
      { id: 2, src: img2, value: 2 },
      { id: 3, src: img3, value: 3 },
      { id: 4, src: img4, value: 4 },
      { id: 5, src: img5, value: 5 },
    ],
    correct: [1, 3, 4],
  },
  {
    id: 2,
    letter: "h",
    images: [
      { id: 1, src: img6, value: 1 },
      { id: 2, src: img7, value: 2 },
      { id: 3, src: img8, value: 3 },
      { id: 4, src: img9, value: 4 },
      { id: 5, src: img10, value: 5 },
    ],
    correct: [2, 3, 4],
  },
];

export default function Unit7_Page5_Q2() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // ⭐ NEW

  // ---------------------- AUDIO SETUP (unchanged) -----------------------
  // إعدادات الصوت
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const stopAtSecond = 3.5;

  // -----------------------------------------------------------------------

  const handleSelect = (qId, value) => {
    if (showAnswer || submitted) return; // ❌ ممنوع تعديل الإجابات بعد Show Answer

    setAnswers((prev) => {
      const current = prev[qId] || [];

      // Unselect if selected before
      if (current.includes(value)) {
        return { ...prev, [qId]: current.filter((v) => v !== value) };
      }

      // Max selections = 3
      if (current.length >= 3) return prev;

      return { ...prev, [qId]: [...current, value] };
    });
  };

  const handleCheck = () => {
    if (showAnswer || submitted) return;
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
      start: 0,
      end: 5.44,
      text: "Page 62, Right activities. Exercise A, number two.",
    },
    {
      start: 5.55,
      end: 10.82,
      text: " Which pictures begin with the same sound? Listen and circle. ",
    },
    {
      start: 10.9,
      end: 20.32,
      text: "One, W. Watermelon, burger, whale, wagon, hand.",
    },
    {
      start: 20.4,
      end: 29.58,
      text: "  Two, H. Watch, house, hat, hammer, web.",
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
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          // width: "60%",
          justifyContent: "flex-start",
        }}
      >
        <h5 className="header-title-page8">
          <span className="mr-2" style={{ color: "purple" }}>
            2
          </span>
          Listen and tap or click the pictures that start with the same sound.
        </h5>

        {/* AUDIO PLAYER — unchanged */}
        {/* -------------------------------------------------- */}
        {/* ... audio code remains as-is ... */}
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />

        {/* -------------------------------------------------- */}

        {data.map((q) => (
          <div
            key={q.id}
            className="question-row-Unit5_Page5_Q2"
            style={{ margin: "5px" }}
          >
            <span
              className="q-number"
              style={{ color: "#2c5287", fontSize: "20px", fontWeight: "700" }}
            >
              {q.id}
            </span>

            <span
              style={{
                color: "#2c5287",
                fontSize: "20px",
                fontWeight: "700",
                marginLeft: "5px",
              }}
            >
              {q.letter}
            </span>

            <div className="images-row-Unit7_Page5_Q2">
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
                    className={`img-box-Unit7_Page5_Q2 
                      ${isSelected ? "selected-Unit5_Page5_Q2" : ""} 
                      ${isWrong ? "wrong" : ""}`}
                    onClick={() => handleSelect(q.id, img.value)}
                  >
                    <img src={img.src} alt="" style={{height:"80px" ,width:"80px"}}/>

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
