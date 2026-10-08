import React, { useState } from "react";
import "./Unit2_Page7_Q3.css"; // ضيفي فيه الكود الي فوق
import ValidationAlert from "../../Popup/ValidationAlert";
const Unit2_Page7_Q3 = () => {
  const sentences = [
    "hello, I'm John? this is Stella.",
    "how are you.",
    "fine. thank you!",
  ];
  const [checked, setChecked] = useState(false);
  const [circledWords, setCircledWords] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  const correct = {
    0: [0, 5, 15], // جملة رقم 0، الأحرف التي يجب أن تُحاط بدائرة
    1: [0, 11], // جملة رقم 1، حرفين خاطئين
    2: [0, 4, 6, 15], // جملة رقم 2، الأحرف الخاطئة
  };
  const checkAnswers = (circledWords, correctAnswers) => {
    if (showAnswer) return;
    if (Object.keys(circledWords).length === 0) {
      ValidationAlert.info("Please circle at least one mistake.");
      return;
    }

    let totalCorrect = 0;
    let studentCorrect = 0;

    for (let sentence in correctAnswers) {
      totalCorrect += correctAnswers[sentence].length;
    }

    for (let sentence in circledWords) {
      circledWords[sentence].forEach((index) => {
        if (
          correctAnswers[sentence] &&
          correctAnswers[sentence].includes(index)
        ) {
          studentCorrect++;
        }
      });
    }

    setChecked(true); // 🔥 الآن نمنع التعديل ونظهر X للغلط

    const scoreMessage = `Score: ${studentCorrect} / ${totalCorrect}`;

    if (studentCorrect === totalCorrect)
      return ValidationAlert.success(scoreMessage);
    if (studentCorrect === 0) return ValidationAlert.error(scoreMessage);
    return ValidationAlert.warning(scoreMessage);
  };

  const handleWordClick = (sIndex, wIndex) => {
    if (showAnswer) return; // 🔒 يمنع التعديل بعد Check أو Show Answer
    setCircledWords((prev) => {
      const updated = { ...prev };

      // إذا ما كان في دوائر مسبقة للجملة → نعمل مصفوفة جديدة
      if (!updated[sIndex]) {
        updated[sIndex] = [wIndex];
      }
      // إذا الكلمة عليها دائرة → نشيلها
      else if (updated[sIndex].includes(wIndex)) {
        updated[sIndex] = updated[sIndex].filter((i) => i !== wIndex);
      }
      // إذا بدنا نضيف دائرة جديدة مع الإبقاء على الباقي
      else {
        updated[sIndex] = [...updated[sIndex], wIndex];
      }

      return updated;
    });

    setChecked(false);
  };

  //   console.log(result.status); // "all-correct" | "all-wrong" | "partial"
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
          gap: "80px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="mr-2">C</span> Tap or click the mistakes.
        </h5>

        <div className="sentence-container-review1-p16-exc">
          {sentences.map((sentence, sIndex) => (
            <div
              key={sIndex}
              style={{
                margin: "14px",
                fontSize: "25px",
                fontWeight: "500",
              }}
            >
              <span style={{ color: "#2c5287", fontWeight: "700" }}>
                {sIndex + 1}
              </span>{" "}
              {sentence.split("").map((char, wIndex) => {
                const isCircled = circledWords[sIndex]?.includes(wIndex);
                const isCorrect =
                  checked && correct[sIndex]?.includes(wIndex) && isCircled;
                const isWrong =
                  checked &&
                  !showAnswer &&
                  isCircled &&
                  !correct[sIndex]?.includes(wIndex);

                return (
                  <span
                    key={wIndex}
                    onClick={() => handleWordClick(sIndex, wIndex)} // 🔒 يمنع التعديل بعد الفحص
                    className={`char-container ${
                      isCircled ? "circled" : ""
                    } ${isCorrect ? "correct" : ""}`}
                  >
                    {char}
                    {isWrong && <span className="wrong-x-unit2-q3">✕</span>}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button
          onClick={() => {
            setCircledWords({});
            setChecked(false);
            setShowAnswer(false);
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
        <button
          className="show-answer-btn swal-continue"
          onClick={() => {
            let answerObj = {};

            // نضع كل الحروف الصحيحة كأنها مختارة
            Object.keys(correct).forEach((sIndex) => {
              answerObj[sIndex] = [...correct[sIndex]];
            });

            setCircledWords(answerObj);
            setShowAnswer(true); // يمنع التعديل بعد ذلك
            setChecked(false); // لا نريد أن يظهر X
          }}
        >
          Show Answer
        </button>

        <button
          className="check-button2"
          onClick={() => checkAnswers(circledWords, correct)}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit2_Page7_Q3;
