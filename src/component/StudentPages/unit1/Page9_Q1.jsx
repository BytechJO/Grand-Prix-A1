import React, { useState } from "react";
import conversation from "../../../assets/unit1/imgs/Ask and answer.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

const Page9_Q1 = () => {
  // ✅ الإحداثيات كلها نسب مئوية (نسبة من الصورة)
  const clickableAreas = [
    { x: 14, y: 7.5, w: 27.8, h: 10 }, // غيّري هاي الأرقام حسب ما بدك
  ];

  const [inputs, setInputs] = useState(Array(clickableAreas.length).fill(""));

  const handleInputChange = (value, index) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleCheck = () => {
    if (inputs.some((value) => value.trim() === "")) {
      ValidationAlert.info();
      return;
    }
    let scoreMessage = ``;
    ValidationAlert.success(scoreMessage);
  };

  const handleReset = () => {
    setInputs(Array(clickableAreas.length).fill(""));
  };

  return (
    <div
      className="page8-wrapper"
      style={{
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
        gap:"120px"
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A">D</span> Answer and read
        </h5>

        {/* ✅ الصورة هي المرجع */}
        <div
          className="content-container-unit1-p9-q1"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "3 / 1", // نسبة الصورة
          }}
        >
          <img
            src={conversation}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />

          {clickableAreas.map((area, index) => (
            <input
              key={index}
              value={inputs[index]}
              onChange={(e) => handleInputChange(e.target.value, index)}
              style={{
                position: "absolute",
                top: `${area.y}%`,
                left: `${area.x}%`,
                width: `${area.w}%`,
                height: `${area.h}%`,
                fontSize: "1.3vw",
                borderBottom: "2px solid black",
                // borderRadius:"8px"
              }}
            />
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="action-buttons-container">
        <button onClick={handleReset} className="try-again-button">
          Start Again ↻
        </button>
        {/* 
        <button onClick={handleCheck} className="check-button2">
          Check Answer ✓
        </button> */}
      </div>
    </div>
  );
};

export default Page9_Q1;
