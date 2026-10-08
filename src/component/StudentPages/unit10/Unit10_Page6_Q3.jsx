import React, { useState } from "react";
import milk from "../../../assets/unit10/imgs/U10P87EXEF-01.svg";
import bread from "../../../assets/unit10/imgs/U10P87EXEF-02.svg";
import apple from "../../../assets/unit10/imgs/U10P87EXEF-03.svg";
import iceCream from "../../../assets/unit10/imgs/U10P87EXEF-04.svg";
import chicken from "../../../assets/unit10/imgs/U10P87EXEF-05.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit10_Page6_Q3.css";

const Unit10_Page6_Q3 = () => {
  const items = [
    { img: milk, value: "milk" },
    { img: bread, value: "bread" },
    { img: apple, value: "apple" },
    { img: iceCream, value: "ice cream" },
    { img: chicken, value: "chicken" },
  ];

  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const normalize = (str) => str.toLowerCase().replace(/[-_]/g, " ").trim();

  const checkAnswer = () => {
    // 1️⃣ لازم يداير على صورة
    if (!selectedImage) {
      ValidationAlert.info("Please circle one picture first!");
      return;
    }

    // 2️⃣ لازم يكتب
    if (answer.trim() === "") {
      ValidationAlert.info("Please write an answer!");
      return;
    }

    const normalizedAnswer = normalize(answer);
    const validAnswers = items.map((item) => normalize(item.value));
    const normalizedSelected = normalize(selectedImage);

    setChecked(true);

    let score = 0;

    // 4️⃣ لازم المكتوب يطابق الصورة المتداير عليها
    if (normalizedAnswer === normalizedSelected) {
      score = 1;
    }
    setIsCorrect(score === 1);
    const color = score === 1 ? "green" : "red";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold">
        Score: ${score} / 1
      </span>
    </div>
  `;
    // 3️⃣ لازم الكلمة تكون من الخيارات فقط
    if (!validAnswers.includes(normalizedAnswer)) {
      ValidationAlert.error(msg);
      return;
    }

    score === 1 ? ValidationAlert.success(msg) : ValidationAlert.error(msg);
  };

  const reset = () => {
    setAnswer("");
    setChecked(false);
    setSelectedImage(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "60px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">F</span> What do you want? Listen and tap or
          click.
        </h5>

        {/* الصور */}
        <div className="images-row-unit10-page6-q3 w-full">
          {items.map((item, i) => (
            <div
              key={i}
              className={`image-box-unit10-page6-q3 ${
                selectedImage === item.value ? "selected-unit10-page6-q3" : ""
              }`}
              onClick={() => {
                if (checked) return;
                setSelectedImage(item.value);
                setAnswer(item.value); // ⭐ يكتب الكلمة مباشرة
              }}
            >
              <img
                src={item.img}
                alt={item.value}
                style={{ height: "100px", width: "auto" }}
              />
            </div>
          ))}
        </div>

        {/* الجملة */}
        <div
          className="sentence-wrapper-unit10-page6-q3 w-full"
          style={{ position: "relative" }}
        >
          <span>I want</span>

          <span className="auto-answer-unit10-page6-q3">{answer || ""}</span>

          {checked && isCorrect === false && (
            <div className="wrong-mark-unit10-p6-q3">✕</div>
          )}
          <span>.</span>
        </div>
      </div>

      {/* الأزرار */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={checkAnswer} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit10_Page6_Q3;
