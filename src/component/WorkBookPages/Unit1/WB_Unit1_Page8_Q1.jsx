import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page8_Q1.css";
import audio1 from "../../../assets/U1 WB/U1/Audio/RWBU1P8EXEA.mp3";
import img1 from "../../../assets/U1 WB/U1/SVG/U1P8EXEA-01.svg";
import img2 from "../../../assets/U1 WB/U1/SVG/U1P8EXEA-02.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const WB_Unit1_Page8_Q1 = () => {
  const questions = [
    {
      img: img1,
      type: "end", // الخيارات بنهاية الجملة
      parts: {
        before: "The food is in the ",
        after: ".",
      },
      options: ["dish", "deer"],
      correctIndex: 0,
    },
    {
      img: img2,
      type: "middle", // الخيارات داخل الجملة
      parts: {
        before: "The ",
        after: " is round.",
      },
      options: ["table", "tiger"],
      correctIndex: 0,
    },
  ];

  const stopAtSecond = 5.5;
 
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 6.0,
      text: "Phonics Exercise A. Listen, read, and circle the correct word. ",
    },
    {
      start: 6.02,
      end: 8.26,
      text: "1.	the food is in the dish.",
    },
    { start: 8.28, end: 11.15, text: "2.	the table is round." },
  ];


  const [answers, setAnswers] = useState(() => {
    const arr = Array(questions.length).fill(null);

    return arr;
  });

  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const selectOption = (qIndex, optIndex) => {
    if (showAnswer || showResult) return;
    const updated = [...answers];
    updated[qIndex] = optIndex;
    setAnswers(updated);
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (showAnswer || showResult) return;
    if (answers.includes(null)) {
      return ValidationAlert.info("Oops!", "Please circle all the words!");
    }

    const total = questions.length;
    let correct = 0;

    answers.forEach((ans, i) => {
      if (ans === questions[i].correctIndex) correct++;
    });

    let color = correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correct} / ${total}
        </span>
      </div>`;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult(true);
  };

  const reset = () => {
    setAnswers(() => {
      const arr = Array(questions.length).fill(null);

      return arr;
    });
    setShowResult(false);
    setShowAnswer(false);
  };

  const showCorrectAnswers = () => {
    const correct = questions.map((q) => q.correctIndex);
    setAnswers(correct);
    setShowAnswer(true);
    setShowResult(false);
  };

  return (
    <div className="page8-wrapper" style={{ padding: "30px" }}>
      <div className="div-forall" style={{}}>
        <h3 className="header-title-page8">
          <span className="ex-A">A</span> Listen and tap or click the correct
          word.
        </h3>
         
         <QuestionAudioPlayer  src={audio1} captions={captions} stopAtSecond={stopAtSecond}   />
      
        <div className="container-wb-u1-p8-q1">
          {questions.map((q, i) => (
            <div key={i} className="question-box-wb-u1-p8-q1">
              <span
                className="num"
                style={{
                  color: "darkblue",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
              >
                {i + 1}
              </span>

              <img
                src={q.img}
                className="q-image-wb-u1-p8"
                alt="question"
                style={{ height: "100px", width: "auto" }}
              />

              <div className="sentence-options">
                {q.type === "end" && (
                  <>
                    <span
                      className="sentence-text"
                      style={{
                        color: "black",
                        fontSize: "20px",
                      }}
                    >
                      {q.parts.before}
                    </span>

                    {/* الخيارات في آخر الجملة */}
                    {q.options.map((word, optIndex) => {
                      const isSelected = answers[i] === optIndex;
                      const isCorrect = optIndex === q.correctIndex;

                      return (
                        <span
                          key={optIndex}
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: "20px",
                          }}
                          className={`option-word-wb-u1-p5-q1
                ${isSelected ? "selected3-wb-u1-p5-q1" : ""}
                ${showResult && isSelected && !isCorrect ? "wrong" : ""}
                ${showResult && isCorrect ? "correct" : ""}
            `}
                          onClick={() => selectOption(i, optIndex)} // ← ← الحل هنا
                        >
                          {word}
                          {optIndex === 0 ? "/" : ""}
                          {showResult && isSelected && !isCorrect && (
                            <span className="wrong-x-wb-u1-p5-q1">✕</span>
                          )}
                        </span>
                      );
                    })}

                    <span
                      className="sentence-text"
                      style={{
                        color: "black",
                        fontSize: "20px",
                      }}
                    >
                      {q.parts.after}
                    </span>
                  </>
                )}

                {/* النموذج الثاني: الكلمات داخل الجملة */}
                {q.type === "middle" && (
                  <>
                    <span
                      className="sentence-text"
                      style={{
                        color: "black",
                        fontSize: "20px",
                      }}
                    >
                      {q.parts.before}
                    </span>

                    {q.options.map((word, optIndex) => {
                      const isSelected = answers[i] === optIndex;
                      const isCorrect = optIndex === q.correctIndex;

                      return (
                        <span
                          key={optIndex}
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: "20px",
                          }}
                          className={`option-word-wb-u1-p5-q1
                ${isSelected ? "selected3-wb-u1-p5-q1" : ""}
                ${showResult && isSelected && !isCorrect ? "wrong" : ""}
                ${showResult && isCorrect ? "correct" : ""}
            `}
                          onClick={() => selectOption(i, optIndex)}
                        >
                          {word}
                          {optIndex === 0 ? "/" : ""}
                          {showResult && isSelected && !isCorrect && (
                            <span className="wrong-x-wb-u1-p5-q1">✕</span>
                          )}
                        </span>
                      );
                    })}

                    <span
                      className="sentence-text"
                      style={{
                        color: "black",
                        fontSize: "20px",
                      }}
                    >
                      {q.parts.after}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button
          className="show-answer-btn swal-continue"
          onClick={showCorrectAnswers}
        >
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit1_Page8_Q1;
