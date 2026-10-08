import React, { useState } from "react";
import "./WB_Unit7_Page2_Q2.css";

const WB_Unit7_Page2_Q2 = () => {
  const questions = [
    "Are you happy?",
    "Are you sad?",
    "Are you bored?",
    "Are you hungry?",
    "Are you cold?",
  ];

  const [answers, setAnswers] = useState(Array(5).fill(""));

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const reset = () => {
    setAnswers(Array(5).fill(""));
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
          gap: "50px",
   
        }}
      >
        <h4 className="header-title-page8">
          <span className="ex-A">D</span>
         What about you? Read and answer the questions.
        </h4>

        <div className="wb-unit7-p2-q2-questions">
          {questions.map((q, index) => (
            <div key={index} className="wb-unit7-p2-q2-row">
              <span className="wb-unit7-p2-q2-number">{index + 1}</span>
              <span className="wb-unit7-p2-q2-question">{q}</span>
              <input
                type="text"
                className="wb-unit7-p2-q2-input"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit7_Page2_Q2;
