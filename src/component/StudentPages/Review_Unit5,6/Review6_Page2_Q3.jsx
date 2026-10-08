import React, { useState } from "react";
import "./Review6_Page2_Q3.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review6_Page2_Q3 = () => {
  const sentences = [
    { word1: "pit", word2: "chip", word3: "top", num: 1 },
    { word1: "bit", word2: "sun", word3: "fix", num: 2 },
    { word1: "cup", word2: "pick", word3: "fit", num: 3 },
    { word1: "box", word2: "mix", word3: "tip", num: 4 },
    { word1: "kick", word2: "desk", word3: "rip", num: 5 },
    { word1: "sip", word2: "cap", word3: "pin", num: 6 },
  ];

  const correct = {
    0: [0, 1],
    1: [0, 2],
    2: [1, 2],
    3: [1, 2],
    4: [0, 2],
    5: [0, 2],
  };

  const [circledWords, setCircledWords] = useState({});
  const [checked, setChecked] = useState(false);

  // ⭐ NEW — Show Answer Mode
  const [showAnswerMode, setShowAnswerMode] = useState(false);

  const handleWordClick = (sIndex, wIndex) => {
    if (showAnswerMode || checked) return; // ⛔ منع النقر أثناء الشو أنسر

    setCircledWords((prev) => {
      const existing = prev[sIndex] || [];

      if (existing.includes(wIndex)) {
        return {
          ...prev,
          [sIndex]: existing.filter((i) => i !== wIndex),
        };
      }

      if (existing.length >= 2) {
        return {
          ...prev,
          [sIndex]: existing.filter((i) => i !== wIndex),
        };
      }

      return {
        ...prev,
        [sIndex]: [...existing, wIndex],
      };
    });
    setChecked(false);
  };

  const checkAnswers = () => {
    if (showAnswerMode || checked) return; // ⛔ منع النقر أثناء الشو أنسر

    if (
      Object.keys(circledWords).length < sentences.length ||
      Object.values(circledWords).some((arr) => arr.length < 2)
    ) {
      ValidationAlert.info(
        "Oops!",
        "Please circle two words in each sentence!",
      );
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

  // ⭐⭐⭐ NEW — Show Answer Function
  const showAnswers = () => {
    const final = {};

    Object.keys(correct).forEach((index) => {
      final[index] = correct[index]; // ضع الإجابات الصحيحة كما هي
    });

    setCircledWords(final);
    setChecked(true);
    setShowAnswerMode(true);
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
          gap: "120px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="mr-2">F</span> Circle{" "}
          <span style={{ color: "red" }}>the short i</span> words.
        </h5>

        <div className="review6-p2-q3-sentence-container2 w-full">
          {sentences.map((sentence, sIndex) => (
            <div className="review3-p2-q2-sentence-row" key={sIndex}>
              <span
                className="review3-p2-q2-num"
                style={{ color: "#2c5287", fontWeight: "700" }}
              >
                {sIndex + 1}
              </span>

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

                        {isWrong && !showAnswerMode && (
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
              setShowAnswerMode(false);
            }}
            className="try-again-button"
          >
            Start Again ↻
          </button>

          <button
            onClick={showAnswers}
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

export default Review6_Page2_Q3;
