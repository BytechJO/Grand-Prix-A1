import React, { useState, useRef, useEffect } from "react";
import "./Unit2_Page10_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import sound1 from "../../../assets/unit1/sounds/P19QD.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit2_Page10_Q1 = () => {
  const [isShowMode, setIsShowMode] = useState(false);
  const stopAtSecond = 4.5;

  const sentences = [
    { word1: "ball", word2: "pencil", num: 1 },
    { word1: "boy", word2: "pencil", num: 2 },
    { word1: "pink", word2: "bird", num: 3 },
    { word1: "pizza", word2: "bird", num: 4 },
    { word1: "ball", word2: "pink", num: 5 },
    { word1: "ball", word2: "pizza", num: 6 },
  ];

  const correct = {
    0: [0],
    1: [0],
    2: [1],
    3: [0],
    4: [1],
    5: [0],
  };

  const [circledWords, setCircledWords] = useState({});
  const [checked, setChecked] = useState(false);

  const handleWordClick = (sIndex, wIndex) => {
    if (isShowMode || checked) return; // 🚫 ممنوع التغيير بعد show answer

    setCircledWords((prev) => ({
      ...prev,
      [sIndex]: [wIndex], // 🟢 كل جملة لها اختيار واحد فقط
    }));
    setChecked(false);
  };

  const handleShowAnswer = () => {
    let correctSelections = {};

    // نحدد الاختيارات الصحيحة فقط
    Object.keys(correct).forEach((key) => {
      correctSelections[key] = [...correct[key]]; // الدائرة على الصحيحة فقط
    });

    setCircledWords(correctSelections);
    setIsShowMode(true); // 🚫 يمنع التعديل
    setChecked(false);
  };
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0, end: 4.26, text: " Page 19, exercise D. Listen and circle. " },
    { start: 4.28, end: 7.02, text: "1-pencil." },
    { start: 7.04, end: 9.01, text: "2-boy." },
    { start: 9.03, end: 10.21, text: "3-bird." },
    { start: 10.23, end: 13.1, text: "4-pizza. " },
    { start: 13.12, end: 14.29, text: "5-pink." },
    { start: 14.31, end: 17.06, text: "6-ball." },
  ];

  const checkAnswers = () => {
    if (isShowMode || checked) return;
    if (Object.keys(circledWords).length < 6) {
      ValidationAlert.info("Oops!", "Please circle at least one mistake.");
      return;
    }

    let totalCorrect = 0;
    let studentCorrect = 0;

    for (let sIndex in correct) totalCorrect += correct[sIndex].length;

    for (let sIndex in circledWords) {
      circledWords[sIndex].forEach((wIndex) => {
        if (correct[sIndex]?.includes(wIndex)) studentCorrect++;
      });
    }

    setChecked(true);

    const scoreMessage = `Score: ${studentCorrect} / ${totalCorrect}`;
    if (studentCorrect === totalCorrect) ValidationAlert.success(scoreMessage);
    else if (studentCorrect === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
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
          {" "}
          <span className="mr-2">D</span> Listen and tap or click the word you
          hear.
        </h5>

        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />

        <div className="content-container10">
          <div className="sentence-container2-unit2-pg10-q1">
            {sentences.map((sentence, sIndex) => (
              <div key={sIndex} className="sentence-row">
                <span className="num2">{sIndex + 1}</span>
                {[sentence.word1, sentence.word2].map((word, wIndex) => {
                  const isCircled = circledWords[sIndex]?.includes(wIndex);
                  const isWrong =
                    checked && isCircled && !correct[sIndex]?.includes(wIndex);

                  return (
                    <span
                      key={wIndex}
                      onClick={() => handleWordClick(sIndex, wIndex)}
                      className={`word-text10 ${isCircled ? "circled2" : ""}`}
                    >
                      {word}
                      {isWrong && <span className="wrong-x10">✕</span>}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="action-buttons-container">
          <button
            onClick={() => {
              setCircledWords({});
              setChecked(false);
              setIsShowMode(false); // 🔄 رجوع لوضع اللعب
            }}
            className="try-again-button"
          >
            Start Again ↻
          </button>
          <button
            onClick={handleShowAnswer}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit2_Page10_Q1;
