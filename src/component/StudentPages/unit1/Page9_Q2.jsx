import React, { useRef, useState, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page9_Q2.css";

export default function Page9_Q2() {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const [wrongWords, setWrongWords] = useState([]); // ⭐ تم التعديل هون
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);

  // 🎨 ألوان الكلمات
  const colors = ["red", "blue", "green", "orange", "purple", "yellow"];
  const [selectedWordIndex, setSelectedWordIndex] = useState(null);
  const [wordColors, setWordColors] = useState([
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
    "transparent",
  ]);
  const correctMatches = [
    { word1: "Good", word2: "afternoon." },
    { word1: "Fine,", word2: "thank you." },
    { word1: "How", word2: "are you?" },
  ];

  const handleWordClick = (index) => {
    setSelectedWordIndex(index);
  };

  const applyColor = (color) => {
    const newColors = [...wordColors];
    newColors[selectedWordIndex] = color;
    setWordColors(newColors);
    setSelectedWordIndex(null);
  };

  // ==========================
  // ⭐ Click to Connect Logic
  // ==========================
  const handleStartDotClick = (e) => {
    if (locked || showAnswer) return;
    const word = e.target.dataset.letter;

    // ❌ منع رسم أكثر من خط من نفس الكلمة
    const alreadyUsed = lines.some((line) => line.word === word);
    if (alreadyUsed) return;
    const rect = containerRef.current.getBoundingClientRect();

    setFirstDot({
      word: e.target.dataset.letter,
      x: e.target.getBoundingClientRect().left - rect.left + 8,
      y: e.target.getBoundingClientRect().top - rect.top + 8,
    });
  };

  const handleEndDotClick = (e) => {
    if (locked || showAnswer) return;
    if (!firstDot) return;

    const rect = containerRef.current.getBoundingClientRect();

    const newLine = {
      x1: firstDot.x,
      y1: firstDot.y,
      x2: e.target.getBoundingClientRect().left - rect.left + 8,
      y2: e.target.getBoundingClientRect().top - rect.top + 8,
      word: firstDot.word,
      image: e.target.dataset.image,
    };

    setLines((prev) => [...prev, newLine]);
    setFirstDot(null);
  };

  useEffect(() => {
    const hidePalette = (e) => {
      // إذا الكبس كان على دائرة اللون أو على الكلمة المختارة → لا تخفيه
      if (
        e.target.classList.contains("color-circle") ||
        e.target.classList.contains("H5")
      ) {
        return;
      }

      setSelectedWordIndex(null);
    };

    // إضافة listener
    document.addEventListener("click", hidePalette);

    // تنظيف عند الخروج
    return () => {
      document.removeEventListener("click", hidePalette);
    };
  }, []);

  const checkAnswers = () => {
    if (showAnswer) return;
    // 1️⃣ إذا في خطوط ناقصة
    if (lines.length < correctMatches.length) {
      ValidationAlert.info(
        "Oops!",
        "Please connect all pairs before checking.",
      );
      return;
    }

    // 2️⃣ حساب عدد التوصيلات الصحيحة
    let correctCount = 0;
    const total = correctMatches.length;
    let wrong = []; // ⭐ تم التعديل هون
    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (pair) => pair.word1 === line.word && pair.word2 === line.image,
      );
      if (isCorrect) correctCount++;
      else wrong.push(line.word); // ⭐ تم التعديل هون
    });

    setWrongWords(wrong); // ⭐ تم التعديل هون
    // 3️⃣ تحديد اللون حسب النتيجة
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    // 4️⃣ رسالة النتيجة بشكل HTML
    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
       Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    // 5️⃣ اختيار نوع الرسالة
    if (correctCount === total) {
      ValidationAlert.success(scoreMessage);
    } else if (correctCount === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
    setLocked(true);
  };
  // ⭐ Show Correct Answers
  const showCorrectAnswers = () => {
    const rect = containerRef.current.getBoundingClientRect();

    // 1️⃣ تجهيز خطوط الإجابة الصحيحة
    const correctLines = correctMatches.map((pair) => {
      const startEl = document.querySelector(
        `.start-dot1[data-letter="${pair.word1}"]`,
      );
      const endEl = document.querySelector(
        `.end-dot1[data-image="${pair.word2}"]`,
      );

      return {
        x1: startEl.getBoundingClientRect().left - rect.left + 8,
        y1: startEl.getBoundingClientRect().top - rect.top + 8,
        x2: endEl.getBoundingClientRect().left - rect.left + 8,
        y2: endEl.getBoundingClientRect().top - rect.top + 8,
        word: pair.word1,
        image: pair.word2,
      };
    });

    // 2️⃣ وضع الخطوط
    setLines(correctLines);

    // 3️⃣ إخفاء علامات الإكس
    setWrongWords([]);
    setShowAnswer(true);
    // 4️⃣ إعادة تلوين الكلمات (إذا بدك)
    setWordColors(["green", "green", "green", "green", "green", "green"]);
  };

  return (
    <div
      style={{
        display: "flex",
        // marginTop: "30px",
        padding: "30px",
        justifyContent: "center",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "10px",
        }}
      >
        <h4 className="header-title-page8">
          <span className="ex-A">E</span>Match and color.
        </h4>
        <span style={{ fontSize: "14px", color: "gray" }}>
          Hint: Tap or click twice to color.
        </span>
        {selectedWordIndex !== null && (
          <div className="color-palette">
            {colors.map((c) => (
              <div
                key={c}
                className="color-circle"
                style={{ backgroundColor: c }}
                onClick={() => applyColor(c)}
              ></div>
            ))}
          </div>
        )}

        <div className="container3" ref={containerRef}>
          <div className="word-section1">
            {["Good", "Fine,", "How"].map((word, i) => (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <h5
                  key={i}
                  className={`H5 ${
                    wordColors[0] === "transparent"
                      ? "word-outline"
                      : "word-colored"
                  } ${locked || showAnswer ? "disabled-word" : ""}`}
                  style={{
                    color: wordColors[i],
                    cursor: "pointer",
                    position: "relative",
                    textAlign: "start",
                    width: "100%",
                  }}
                  onClick={() => document.getElementById(`dot-${word}`).click()} // رسم الخط
                  onDoubleClick={() => handleWordClick(i)} // فتح الباليت
                  onTouchEnd={() => handleWordClick(i)}
                >
                  {word}
                </h5>{" "}
                <div
                  id={`dot-${word}`}
                  className="dot1 start-dot1"
                  data-letter={word}
                  onClick={handleStartDotClick}
                ></div>
                {wrongWords.includes(word) && ( // ⭐ تم التعديل هون
                  <span className="error-mark3">✕</span>
                )}
              </div>
            ))}
          </div>

          <div className="word-section2">
            {["thank you.", "are you?", "afternoon."].map((word, i) => (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="dot1 end-dot1"
                  id={`dot-${word}`}
                  data-image={word}
                  onClick={handleEndDotClick}
                ></div>
                <h5
                  key={i + 3}
                  className={`H5 ${
                    wordColors[0] === "transparent"
                      ? "word-outline"
                      : "word-colored"
                  } ${locked || showAnswer ? "disabled-word" : ""}`}
                  style={{
                    color: wordColors[i + 3],
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => document.getElementById(`dot-${word}`).click()}
                  onDoubleClick={() => handleWordClick(i + 3)}
                  onTouchEnd={() => handleWordClick(i + 3)}
                >
                  {word}
                </h5>
              </div>
            ))}
          </div>

          <svg className="lines-layer">
            {lines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="red"
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>
      </div>
      <div className="action-buttons-container">
        <button
          onClick={() => {
            setLines([]);
            setWrongWords([]);
            setWordColors([
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
              "transparent",
            ]);
            setShowAnswer(false);
            setLocked(false); // 🔓 مسموح الرسم مرة أخرى
            setFirstDot(null);
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
        <button
          onClick={showCorrectAnswers}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
}
