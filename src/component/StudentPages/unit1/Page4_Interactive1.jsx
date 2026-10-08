import React, { useState } from "react";
import backgroundImage from "../../../assets/unit1/imgs/Page 01/01.jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import MySVG from "../../../assets/unit1/imgs/U1P4 highlight 1.svg";

const Page4_Interactive1 = () => {
  const [clickedPoint, setClickedPoint] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  // ✅ منطقة المطعم (بالنسب المئوية)
  const targetArea = {
    x1: 24,
    y1: 8.5,
    x2: 100,
    y2: 34.5,
  };

  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    console.log(xPercent, yPercent);

    setClickedPoint({
      x: xPercent,
      y: yPercent,
      inside:
        xPercent >= targetArea.x1 &&
        xPercent <= targetArea.x2 &&
        yPercent >= targetArea.y1 &&
        yPercent <= targetArea.y2,
    });
  };

  const handleCheck = () => {
    if (showAnswer) return;
    // 1️⃣ إذا الطالب ما ضغط على الصورة
    if (!clickedPoint) {
      ValidationAlert.info(
        "Pay Attention!",
        "Please click on a spot in the image before checking.",
      );
      return;
    }

    // 2️⃣ نحدد إنو الصواب / خطأ
    const correct = clickedPoint.inside;
    const total = 1;
    const score = correct ? 1 : 0;

    // 3️⃣ نحدد اللون حسب الإجابة
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    // 4️⃣ نكتب رسالة العلامة
    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
 Score: ${score} / ${total}
      </span>
    </div>
  `;

    // 5️⃣ نحدد نوع الإشعار حسب النتيجة
    if (score === total) {
      setCheckResult("success");
      ValidationAlert.success("Bravo!", "You clicked on the restaurant! 🏆");
    } else if (score === 0) {
      setCheckResult("fail");
      ValidationAlert.error("Oops!", "This is not the restaurant. Try again!");
    } else {
      ValidationAlert.warning(scoreMessage);
    }
  };

  const handleStartAgain = () => {
    setClickedPoint(null);
    setCheckResult(null);
    setShowAnswer(false);
  };
  const handleShowAnswer = () => {
    setShowAnswer(true);
    setClickedPoint(null); // نمسح النقطة اللي كبسها الطالب
    setCheckResult("success"); // اختيارية إذا بدك يظهر نجاح
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap:"50px",
          alignItems: "center",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <img
            src={Rabbit}
            style={{ height: "50px",  width: "auto" }}
          />{" "}
          <h5 className="header-title-page8">
            I need your help. Can you help me find the restaurant by tapping or
            clicking on it?
          </h5>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src={backgroundImage}
            alt="interactive"
            onClick={handleImageClick}
            style={{
              width: "auto",
              height: "70vh",
              cursor: "pointer",
              borderRadius: "8px",
              display: "block",
            }}
          />

          {/* ✅ الدائرة الحمراء في مكان الكبس */}
          {clickedPoint && (
            <div
              style={{
                position: "absolute",
                top: `${clickedPoint.y}%`,
                left: `${clickedPoint.x}%`,
                width: "3%",
                height: "3%",
                backgroundColor: "red",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            ></div>
          )}
          {(checkResult === "success" || showAnswer) && (
            <img
              src={MySVG}
              alt="answer highlight"
              style={{
                position: "absolute",
                top: `${targetArea.y1}%`,
                left: `${targetArea.x1}%`,
                height: `${targetArea.y2}%`,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>
      <div className="action-buttons-container ">
        <button className="try-again-button" onClick={handleStartAgain}>
          Start Again ↻
        </button>
        <button className="show-answer-btn" onClick={handleShowAnswer}>
          Show Answer
        </button>
        <button className="check-button2" onClick={handleCheck}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page4_Interactive1;
