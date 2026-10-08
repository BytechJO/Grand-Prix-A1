import React, { useState, useRef, useEffect } from "react";
import "./Review3_Page2_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review3_Page2_Q2 = () => {
  const sentences = [
    { word1: "hot", word2: "sun", word3: "sat", num: 1 },
    { word1: "lip", word2: "tap", word3: "top", num: 2 },
    { word1: "pat", word2: "run", word3: "pot", num: 3 },
    { word1: "mop", word2: "jet", word3: "gap", num: 4 },
    { word1: "ran", word2: "sit", word3: "hut", num: 5 },
  ];

  const correct = {
    0: [2],
    1: [1],
    2: [0],
    3: [2],
    4: [0],
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
          gap: "90px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="mr-2">E</span> Circle the{" "}
          <span style={{ color: "red" }}>short a</span> words.
        </h5>

        <div className="review3-p2-q2-sentence-container2">
          {sentences.map((sentence, sIndex) => (
            <div className="review3-p2-q2-sentence-row" key={sIndex}>
              <span className="review3-p2-q2-num">{sIndex + 1}</span>

              <div className="review3-p2-q2-word-box">
                {[sentence.word1, sentence.word2, sentence.word3].map(
                  (word, wIndex) => {
                    const isCircled = circledWords[sIndex]?.includes(wIndex);
                    const isWrong =
                      checked &&
                      isCircled &&
                      !correct[sIndex]?.includes(wIndex);

                    return (
                      <span
                        key={wIndex}
                        className={`review3-p2-q2-word ${
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
                  },
                )}
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

export default Review3_Page2_Q2;
