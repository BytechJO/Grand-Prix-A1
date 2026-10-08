import React, { useState, useEffect, useRef } from "react";
import "./Review8_Page2_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/unit8/imgs/U8P73EXEE-01.svg";
import img2 from "../../../assets/unit8/imgs/U8P73EXEE-02.svg";
import img3 from "../../../assets/unit8/imgs/U8P73EXEE-03.svg";
import img4 from "../../../assets/unit8/imgs/U8P73EXEE-04.svg";
import img5 from "../../../assets/unit8/imgs/U8P73EXEE-05.svg";
import img6 from "../../../assets/unit8/imgs/U8P73EXEF-04.svg";
import sound1 from "../../../assets/unit8/sound/U8P73EXEE.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
// الصور + الحرف الصحيح
const shapesData = [
  { id: 1, img: img1, correct: "S" },
  { id: 2, img: img2, correct: "S" },
  { id: 3, img: img3, correct: "Z" },
  { id: 4, img: img4, correct: "S" },
  { id: 5, img: img5, correct: "Z" },
  { id: 6, img: img6, correct: "Z" },
];

// الصفوف (الحروف)
const options = ["S", "Z"];

const Review8_Page2_Q2 = () => {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  
  const stopAtSecond = 8.22;
  

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 8.22,
      text: " Page 73, Exercise E. What letter does it begin with?Listen and write check.",
    },
    {
      start: 8.25,
      end: 10.02,
      text: "Soup",
    },
    { start: 10.05, end: 11.05, text: "sack" },
    { start: 11.07, end: 12.16, text: "zoo" },
    { start: 12.18, end: 14.06, text: "spoon" },
    { start: 14.09, end: 15.09, text: "zebra" },
    { start: 15.12, end: 17.02, text: "zipper" },
  ];


  // اختيار خانة
  const handleSelect = (imgId, letter) => {
    if (locked) return;

    setAnswers((prev) => ({
      ...prev,
      [imgId]: letter,
    }));
    setChecked(false);
  };

  // Check Answer
  const checkAnswers = () => {
    if (locked) return;

    if (Object.keys(answers).length < shapesData.length) {
      ValidationAlert.info(
        "Oops!",
        "Please choose an answer for each picture.",
      );
      return;
    }

    let score = 0;
    shapesData.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });

    setChecked(true);
    setLocked(true);

    const total = shapesData.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  // Show Answer
  const showAnswer = () => {
    const correctSelections = {};
    shapesData.forEach((item) => {
      correctSelections[item.id] = item.correct;
    });

    setAnswers(correctSelections);
    setChecked(true);
    setLocked(true);
  };

  // Reset
  const reset = () => {
    setAnswers({});
    setChecked(false);
    setLocked(false);
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
        <h4 className="header-title-page8">
          <span className="mr-2">E</span> Listen and tap or click the correct
          answer.
        </h4>
     
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
        <table className="shapes-table-wrapper-review8-p2-q2 w-full">
          <thead>
            <tr>
              <th
                className="transparent-border"
                style={{ backgroundColor: "white" }}
              ></th>
              {shapesData.map((item) => (
                <th key={item.id}>
                  <img
                    src={item.img}
                    alt=""
                    className="shape-img-wrapper-review4-p1-q3"
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {options.map((letter) => (
              <tr key={letter}>
                <td className="img-cell-wrapper-review8-p2-q2">
                  <strong style={{ fontSize: "25px" }}>{letter}</strong>
                </td>

                {shapesData.map((item) => {
                  const selected = answers[item.id] === letter;
                  const isCorrect =
                    checked && selected && item.correct === letter;
                  const isWrong =
                    checked && selected && item.correct !== letter;

                  return (
                    <td
                      key={item.id}
                      className={`cell-wrapper-review4-p1-q3 ${
                        selected ? "selected-review8-p2-q2" : ""
                      }`}
                      onClick={() => handleSelect(item.id, letter)}
                    >
                      {selected && (
                        <span className="correct-mark-review8-p2-q2">✓</span>
                      )}

                      {isWrong && (
                        <div className="wrong-badge-review8-p2-q2 ">✕</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswer} className="show-answer-btn swal-continue">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review8_Page2_Q2;
