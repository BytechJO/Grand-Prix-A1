import React, { useState } from "react";
import "./Review4_Page1_Q3.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/unit4/imgs/U4P36EXEC-01.svg";
import img2 from "../../../assets/unit4/imgs/U4P36EXEC-02.svg";
import img3 from "../../../assets/unit4/imgs/U4P36EXEC-03.svg";
import img4 from "../../../assets/unit4/imgs/U4P36EXEC-04.svg";

const shapesData = [
  { id: 1, shape: "circle", img: img1 },
  { id: 2, shape: "square", img: img2 },
  { id: 3, shape: "triangle", img: img3 },
  { id: 4, shape: "rectangle", img: img4 },
];

const options = ["triangle", "circle", "square", "rectangle"];

const Review4_Page1_Q3 = () => {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل

  const handleSelect = (rowId, option) => {
    if (locked) return; // ⭐ NEW — منع التعديل بعد Show Answer
    setAnswers((prev) => ({
      ...prev,
      [rowId]: option,
    }));
    setChecked(false);
  };

  const checkAnswers = () => {
    if (locked) return; // ⭐ NEW — منع التعديل بعد Show Answer
    if (Object.keys(answers).length < shapesData.length) {
      ValidationAlert.info("Please choose an answer for each shape.");
      return;
    }

    let score = 0;

    shapesData.forEach((row) => {
      if (answers[row.id] === row.shape) score++;
    });

    setChecked(true);

    let color =
      score === shapesData.length ? "green" : score === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size:20px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${shapesData.length}
      </span>
    </div>
  `;

    if (score === shapesData.length) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setLocked(true); // ⭐ NEW — منع التعديل بعد Check
  };

  const reset = () => {
    setAnswers({});
    setChecked(false);
    setLocked(false); // ⭐ NEW — إعادة فتح التعديل
  };

  // ⭐⭐⭐ NEW — Show Answer
  const showAnswer = () => {
    const correctSelections = {};
    shapesData.forEach((row) => {
      correctSelections[row.id] = row.shape; // الإجابة الصحيحة
    });

    setAnswers(correctSelections);
    setChecked(true); // إظهار ✓ و X الصحيحة فقط
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
          gap: "50px",
        }}
      >
        <h4 className="header-title-page8">
          <span className="mr-2">C</span> Look and tap or click on the box with
          the correct shape.
        </h4>

        <table className="shapes-table-wrapper-review4-p1-q3 w-full">
          <thead>
            <tr>
              <th>What shape is it?</th>
              {options.map((opt, i) => (
                <th key={i}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {shapesData.map((row) => (
              <tr key={row.id}>
                <td className="img-cell-wrapper-review4-p1-q3">
                  <img
                    src={row.img}
                    alt=""
                    className="shape-img-wrapper-review4-p1-q3"
                    style={{ height: "50px", width: "auto" }}
                  />
                </td>

                {options.map((opt, index) => {
                  const selected = answers[row.id] === opt;
                  const isCorrect = checked && opt === row.shape && selected;
                  const isWrong = checked && opt !== row.shape && selected;

                  return (
                    <td
                      key={index}
                      className={`cell-wrapper-review4-p1-q3 ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(row.id, opt)}
                    >
                      {selected && <span className="correct-mark">✓</span>}

                      {isWrong && <div className="wrong-badge">✕</div>}
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

        {/* ⭐⭐⭐ NEW BUTTON */}
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

export default Review4_Page1_Q3;
