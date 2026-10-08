import React, { useState } from "react";
import img1 from "../../../assets/U1 WB/U9/U9P53EXEG-01.svg";
import img2 from "../../../assets/U1 WB/U9/U9P53EXEG-02.svg";
import img3 from "../../../assets/U1 WB/U9/U9P53EXEG-03.svg";
import img4 from "../../../assets/U1 WB/U9/U9P53EXEG-04.svg";
import img5 from "../../../assets/U1 WB/U9/U9P53EXEG-05.svg";
import img6 from "../../../assets/U1 WB/U9/U9P53EXEG-06.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit9_Page3_Q2.css";

const WB_Unit9_Page3_Q2 = () => {
  const items = [
    { img: img1, value: "horse" },
    { img: img2, value: "cat" },
    { img: img3, value: "goat" },
    { img: img4, value: "cow" },
    { img: img5, value: "chicken" },
    { img: img6, value: "dog" },
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
          gap: "40px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">F</span> What do you want? Tap or click an
          animal.
        </h5>

        {/* الصور */}
        <div className="images-row-wb-unit9-p3-q2 w-full">
          {items.map((item, i) => (
            <div
              key={i}
              className={`image-box-unit10-page6-q3 ${
                selectedImage === item.value ? "selected-unit10-page6-q3" : ""
              }`}
              onClick={() => {
                if (checked) return;
                setSelectedImage(item.value);
                setAnswer(item.value); // ⭐ اكتب اسم الصورة داخل الانبوت
              }}
            >
              <img
                src={item.img}
                alt={item.value}
                style={{ height: "130px", width: "auto" }}
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

          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="write-input-unit10-page6-q3"
            disabled={checked}
          />

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

export default WB_Unit9_Page3_Q2;
