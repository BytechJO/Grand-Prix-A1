import React, { useState } from "react";
import "./Review8_Page2_Q4.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/unit8/imgs/U8P73EXEG-01.svg";
import img2 from "../../../assets/unit8/imgs/U8P73EXEG-02.svg";
const Review8_Page2_Q4 = () => {
  // ===============================
  // 🔵 1) الأسئلة (كلها داخل نفس الكومبونينت)
  // ===============================
  const questions = [
    {
      id: 1,
      parts: [
        { type: "text", value: "The" },
        { type: "blank", options: ["sock", "sun"] },
        { type: "text", value: "is over the" },
        { type: "blank", options: ["sea", "zoo"] },
        { type: "text", value: "." },
      ],
      correct: ["sun", "sea"],
      image: img1,
    },

    {
      id: 2,
      parts: [
        { type: "text", value: "The" },
        { type: "blank", options: ["sun", "zebra"] },
        { type: "text", value: "is in the" },
        { type: "blank", options: ["sea", "zoo"] },
        { type: "text", value: "." },
      ],
      correct: ["zebra", "zoo"],
      image: img2,
    },
  ];

  // ===============================
  // 🔵 2) حفظ اختيارات الطالب
  // ===============================
  const [answers, setAnswers] = useState(
    questions.map((q) =>
      q.parts.map((p) => (p.type === "blank" ? null : null)),
    ),
  );
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  // ===============================
  // 🔵 3) الضغط على خيار
  // ===============================
  const handleSelect = (qIndex, blankIndex, option) => {
    if (locked || showResult) return; // ❌ لا يسمح بالتعديل بعد Show Answer
    const updated = [...answers];
    updated[qIndex][blankIndex] = option;
    setAnswers(updated);
    setShowResult(false);
  };

  // ===============================
  // 🔵 4) فحص الإجابات
  // ===============================
  const checkAnswers = () => {
    if (locked || showResult) return; // ❌ لا يسمح بالتعديل بعد Show Answer
    // تحقق إذا الطالب ما اختار ولا شيء
    const selectedCount = answers.flat().filter((a) => a !== null).length;
    if (selectedCount === 0) {
      ValidationAlert.info("");
      return;
    }

    let correct = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      q.correct.forEach((correctAns, blankIndex) => {
        total++;
        if (answers[qIndex][blankIndex] === correctAns) {
          correct++;
        }
      });
    });

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correct} / ${total}
      </span>
    </div>
  `;

    if (correct === total) ValidationAlert.success(scoreMessage);
    else if (correct === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);

    setShowResult(true);
  };
  const showAnswers = () => {
    // اجابة كل سؤال = correct array
    const correctFilled = questions.map((q) => [...q.correct]);

    setAnswers(correctFilled);
    setShowResult(true);
    setLocked(true); // 🔒 قفل الإجابات
  };

  // ===============================
  // 🔵 JSX
  // ===============================
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
        <h3 className="header-title-page8">
          <span className="mr-2">G</span> Look, read, and tap or click the
          correct words.{" "}
        </h3>
        <div
          className="all-content-review8-p2-q4"
          style={{ display: "flex", width: "100%" }}
        >
          {questions.map((q, qIndex) => (
            <div className="question-row-review8-p2-q4 w-full" key={q.id}>
              <div className="sentence-review8-p2-q4">
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "30px",
                  }}
                >
                  <span
                   
                    style={{
                      color: "#2c5287",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    {q.id}
                  </span>
                  <img src={q.image} className="question-img-review8-p2-q4" />
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  {q.parts.map((part, pIndex) => {
                    if (part.type === "text") {
                      return (
                        <span
                          key={pIndex}
                          className="sentence-text-review5-p2-q3"
                        >
                          {part.value}
                        </span>
                      );
                    }

                    if (part.type === "blank") {
                      // blank index == ترتيب هذا الفراغ بين باقي الفراغات
                      const actualBlankIndex = q.parts
                        .filter((p) => p.type === "blank")
                        .indexOf(part);

                      return (
                        <span
                          key={pIndex}
                          className="blank-options-review5-p2-q3"
                        >
                          {part.options.map((opt, optIndex) => {
                            const isSelected =
                              answers[qIndex][actualBlankIndex] === opt;
                            const isWrongSelected =
                              showResult &&
                              isSelected &&
                              opt !== q.correct[actualBlankIndex];

                            return (
                              <div key={optIndex} className="option-wrapper">
                                <span
                                  className={`option-word-review5-p2-q3 ${
                                    isSelected ? "selected2" : ""
                                  }`}
                                  onClick={() =>
                                    handleSelect(qIndex, actualBlankIndex, opt)
                                  }
                                >
                                  {opt}
                                </span>

                                {isWrongSelected && !locked && (
                                  <div className="wrong-mark">✕</div>
                                )}
                              </div>
                            );
                          })}
                        </span>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button
          className="try-again-button"
          onClick={() => {
            setAnswers(
              questions.map((q) =>
                q.parts.map((p) => (p.type === "blank" ? null : null)),
              ),
            );
            setShowResult(false);
            setLocked(false);
          }}
        >
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review8_Page2_Q4;
