import React, { useState } from "react";
import presentImg from "../../../assets/img_unit2/imgs/Present img.svg";
import pizza from "../../../assets/img_unit2/imgs/pizza.svg";
import beard from "../../../assets/img_unit2/imgs/bird.svg";
import boat from "../../../assets/img_unit2/imgs/boate22.svg";
import pencil from "../../../assets/img_unit2/imgs/pincel22.svg";
import "./Unit2_Page5.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit2_Page5_Q3 = () => {
  const options = [
    { img: boat, num: 1 },
    { img: pizza, num: 2 },
    { img: beard, num: 3 },
    { img: pencil, num: 4 },
  ];

  // ✅ نسمح فقط باختيار إجابة واحدة
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index); // اختيار إجابة واحدة فقط
  };

  const scoreMessage = `
    <div style="font-size: 20px; text-align:center; margin-top: 8px;">
      <span style="color:green; font-weight:bold;">
         Score: 1 /1
      </span>
    </div>
  `;

  // ✅ الفحص فقط إذا الطالب اختار أو لا
  const checkAnswers = () => {
    if (selected === null) {
      ValidationAlert.info("Oops!", "Please select an answer first.");
      return;
    }

    // إذا بدك لاحقًا تضيف صح/غلط، هون منعمله.
    ValidationAlert.success(scoreMessage);
  };

  // 🔄 زر الريست
  const resetAnswers = () => {
    setSelected(null);
  };

  return (
    <div>
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
            gap: "80px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="ex-A">B</span> Tap or click on a picture and
            practice reading out loud!
          </h5>

          <div className="unit2-q3-content">
            {/* الصورة الرئيسية */}
            <div className="q3-main-img-box">
              <img src={presentImg} alt="main" className="q3-main-img" />
            </div>

            {/* الخيارات */}
            <div className="q3-options">
              {options.map((item, index) => (
                <div
                  key={item.num}
                  className={`q3-option-item ${
                    selected === index ? "active" : ""
                  }`}
                  onClick={() => handleSelect(index)}
                >
                  <di>
                    <span className="q3-number">{item.num}</span>
                  </di>
                  <img src={item.img} className="q3-option-img" alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={resetAnswers} className="try-again-button">
          Start Again ↻
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit2_Page5_Q3;
