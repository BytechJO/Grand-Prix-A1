import React, { useState, useRef } from "react";
import boy from "../../../assets/img_unit2/imgs/Boy.jpg";
import pen from "../../../assets/img_unit2/imgs/Pincl.jpg";
import ball from "../../../assets/img_unit2/imgs/Football.jpg";
import paint from "../../../assets/img_unit2/imgs/Paint.jpg";
import bird from "../../../assets/img_unit2/imgs/bird.jpg";
import pizza from "../../../assets/img_unit2/imgs/Pizza.jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit2_Page5.css";

const Unit2_Page5_Q1 = () => {
  const audioRef = useRef(null);

  const exerciseData = [
    {
      letter: "b",
      options: [
        { word: "bird", src: bird },
        { word: "pizza", src: pizza },
      ],
    },
    {
      letter: "b",
      options: [
        { word: "Paint", src: paint },
        { word: "ball", src: ball },
      ],
    },
    {
      letter: "p",
      options: [
        { word: "pen", src: pen },
        { word: "boy", src: boy },
      ],
    },
  ];

  const [answers, setAnswers] = useState(Array(exerciseData.length).fill(null));
  const [results, setResults] = useState(Array(exerciseData.length).fill(null)); // ✅ لتحديد الصح والخطأ
  const [showAnswer, setShowAnswer] = useState(false);
  const resetAnswers = () => {
    setAnswers(Array(exerciseData.length).fill(null));
    setResults(Array(exerciseData.length).fill(null)); // ✅ اخفاء الأخطاء عند الإعادة
    setShowAnswer(false);
  };

  const checkAnswers = () => {
    if (showAnswer) return;
    if (answers.includes(null)) {
      ValidationAlert.info("Oops!", "Please choose for all rows first.");
      return;
    }

    let newResults = [...results];

    exerciseData.forEach((row, i) => {
      const selectedIndex = answers[i];
      const selectedWord = row.options[selectedIndex].word;
      newResults[i] = selectedWord.toLowerCase().startsWith(row.letter); // ✅ true / false
    });

    setResults(newResults);

    let correct = newResults.filter(Boolean).length;
    const total = exerciseData.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
        Score: ${correct} / ${total}
        </span>
      </div>
    `;

    if (correct === total) ValidationAlert.success(scoreMessage);
    else if (correct === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };
  const handleShowAnswer = () => {
    let correctAnswers = exerciseData.map((row) => {
      return row.options.findIndex((opt) =>
        opt.word.toLowerCase().startsWith(row.letter),
      );
    });

    setAnswers(correctAnswers);
    setResults(Array(exerciseData.length).fill(true)); // الكل صح
    setShowAnswer(true);
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
          display: "flex",
          flexDirection: "column",
          gap: "30px",
       
          justifyContent: "flex-start",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">A</span>{" "}
          <span style={{ color: "purple" }}>1</span> Which picture starts with
          the letter? Tap or click the correct box.
        </h5>

        <div
          className="imgFeild"
          style={{
            display: "flex",
            margin: "80px 0px",
            gap: "13px",
            justifyContent: "space-around",
          }}
        >
          {exerciseData.map((item, rowIndex) => (
            <div
              key={rowIndex}
              className="row11"
              style={{ display: "flex", position: "relative" }}
            >
              <span className="letter-Q1-Pag5-Unit2">{item.letter}</span>

              {item.options.map((opt, optIndex) => (
                <div
                  key={optIndex}
                  className="img-option"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (showAnswer || results[rowIndex] !== null) return;

                    setAnswers((prev) => {
                      const updated = [...prev];
                      updated[rowIndex] = optIndex;
                      return updated;
                    });
                  }}
                >
                  <img
                    src={opt.src}
                    // className="exercise-image"
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "contain",
                      border: "1px solid #72d0f6",
                      borderRadius: "8px",
                      marginLeft: "0px",
                    }}
                  />

                  <div
                    className={`check-box1 ${
                      answers[rowIndex] === optIndex ? "selected1" : ""
                    }`}
                    style={{
                      border: "1px solid #72d0f6",
                      borderRadius: "7px",
                      height: "40px",
                      width: "40px",
                      fontSize: "25px",
                      fontWeight: "500",
                      marginTop: "10px",
                      position: "relative", // ✅ مهم لظهور X فوقه
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {answers[rowIndex] === optIndex && (
                      <span style={{ color: "red", fontWeight: "700" }}>✓</span>
                    )}

                    {results[rowIndex] === false &&
                      answers[rowIndex] === optIndex && (
                        <span className="wrong-x2">✕</span>
                      )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={resetAnswers} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={handleShowAnswer} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit2_Page5_Q1;
