import React, { useState, useRef, useEffect } from "react";
import "./WB_Unit10_Page6_Q3.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit10_Page6_Q3 = () => {
  const sentences = [
    { word1: "wet", word2: "net", word3: "ten", word4: "set", num: 1 },
    { word1: "net", word2: "ten", word3: "hen", word4: "men", num: 2 },
    { word1: "fed", word2: "jet", word3: "red", word4: "bed", num: 3 },
  ];

  const correct = {
    0: [2],
    1: [0],
    2: [1],
  };

  const [circledWords, setCircledWords] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false); // ⭐ NEW — يمنع التعديل بعد Show Answer


  const handleWordClick = (sIndex, wIndex) => {
    if (locked) return; // ⭐ منع التغيير عند القفل

    setCircledWords((prev) => ({
      ...prev,
      [sIndex]: [wIndex],
    }));

    setChecked(false);
  };

  const checkAnswers = () => {
    if (locked) return; // ⭐ منع التغيير عند القفل
    if (Object.keys(circledWords).length < sentences.length) {
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

    setLocked(true); // ⭐ NEW — يمنع التعديل بعد Check Answer
  };

  const showAnswer = () => {
    const correctSelections = {};

    Object.keys(correct).forEach((sIndex) => {
      correctSelections[sIndex] = correct[sIndex]; // ضع الدوائر على الإجابات الصحيحة فقط
    });

    setCircledWords(correctSelections);
    setChecked(false); // إزالة الأخطاء
    setLocked(true); // قفل التعديل
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
            <span className="ex-A">C</span>Read the words. Tap or click the word with a
            a<span style={{ color: "red" }}>different sound.</span>
          </h5>
      
          <div className="review3-p2-q2-sentence-container2 w-full">
            {sentences.map((sentence, sIndex) => (
              <div className="review3-p2-q2-sentence-row" key={sIndex}>
                <span className="review3-p2-q2-num">{sIndex + 1}</span>

                <div className="wb-unit10-p6-q2-word-box">
                  {[
                    sentence.word1,
                    sentence.word2,
                    sentence.word3,
                    sentence.word4,
                  ].map((word, wIndex) => {
                    const isCircled = circledWords[sIndex]?.includes(wIndex);
                    const isWrong =
                      checked &&
                      isCircled &&
                      !correct[sIndex]?.includes(wIndex);

                    return (
                      <span
                        key={wIndex}
                        className={`wb-unit10-p6-q2-word ${
                          isCircled ? "circled" : ""
                        }`}
                        onClick={() => handleWordClick(sIndex, wIndex)}
                      >
                        {word}
                        {isWrong && (
                          <span className="review3-p2-q2-wrong-x">✕</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>


        <div className="action-buttons-container">
          <button
            onClick={() => {
              setCircledWords({});
              setChecked(false);
              setLocked(false); // ⭐ فتح التعديل من جديد
            }}
            className="try-again-button"
          >
            Start Again ↻
          </button>

          {/* ⭐⭐⭐ تمت إضافة زر Show Answer */}
          <button
            onClick={showAnswer}
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

export default WB_Unit10_Page6_Q3;
