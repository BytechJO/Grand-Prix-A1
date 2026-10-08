import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./WB_Unit1_Page4_Q2.css";

export default function WB_Unit1_Page4_Q2() {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const [wrongWords, setWrongWords] = useState([]);
  const startPointRef = useRef(null);
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);
    const [selectedLeftWord, setSelectedLeftWord] = useState(null);
    const [selectedRightWord, setSelectedRightWord] = useState(null);
  const correctMatches = [
    { word1: "Stella I’m. Hello!", word2: "Hello! I’m Stella." },
    { word1: "thank Fine, you.", word2: "Fine, thank you." },
    { word1: "afternoon Good !", word2: "Good afternoon!" },
    { word1: "you How are ?", word2: "How are you?" },
  ];

  // ==========================
  // ⭐ Click to Connect Logic
  // ==========================
  const handleStartDotClick = (e) => {
    if (locked || showAnswer) return;
    const word = e.target.dataset.letter;
 setSelectedLeftWord(word);
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

     setSelectedRightWord(newLine.image);

    setTimeout(() => {
      setSelectedLeftWord(null);
      setSelectedRightWord(null);
    }, 300);

    setFirstDot(null);
  };

  const checkAnswers = () => {
    if (showAnswer) return;
    // 1️⃣ إذا في خطوط ناقصة
    if (lines.length < correctMatches.length) {
      ValidationAlert.info(
        "Oops!",
        "Please connect all pairs before checking."
      );
      return;
    }

    // 2️⃣ حساب عدد التوصيلات الصحيحة
    let correctCount = 0;
    const total = correctMatches.length;
    let wrong = []; // ⭐ تم التعديل هون
    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (pair) => pair.word1 === line.word && pair.word2 === line.image
      );
      if (isCorrect) correctCount++;
      else wrong.push(line.word); // ⭐ تم التعديل هون
    });

    setWrongWords(wrong); // ⭐ تم التعديل هون
      setLocked(true);
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
  };
  // ⭐ Show Correct Answers
  const showCorrectAnswers = () => {
    const rect = containerRef.current.getBoundingClientRect();

    // 1️⃣ تجهيز خطوط الإجابة الصحيحة
    const correctLines = correctMatches.map((pair) => {
      const startEl = document.querySelector(
        `.start-dot5[data-letter="${pair.word1}"]`
      );
      const endEl = document.querySelector(
        `.end-dot5[data-image="${pair.word2}"]`
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
   setSelectedLeftWord(null);
    setSelectedRightWord(null);

    // 2️⃣ وضع الخطوط
    setLines(correctLines);
    setShowAnswer(true);
      setLocked(true);
    // 3️⃣ إخفاء علامات الإكس
    setWrongWords([]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",padding:"30px"
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "30px",
       
        }}
      >
        <h5 className="header-title-page8">
          {" "}
          <span className="ex-A">D</span> Unscramble and match.
        </h5>

        <div className="matching-wrapper2" ref={containerRef}>
          <div className="column2 left-column">
            {[
              "Stella I’m. Hello!",
              "thank Fine, you.",
              "afternoon Good !",
              "you How are ?",
            ].map((word, i) => (
              <div className="word-row2" key={i}>
                <span className="num2">{i + 1}</span>
                <span
                   className={`word-text3 ${
                      selectedLeftWord === word ? "selected-item" : ""
                    } ${locked || showAnswer ? "disabled-hover" : ""}`}
                  onClick={() => document.getElementById(`dot-${word}`).click()}
                  style={{ cursor: "pointer", width: "230px" }}
                >
                  {word}
                </span>
                <div
                  className="dot5 start-dot5"
                  data-letter={word}
                  id={`dot-${word}`}
                  onClick={handleStartDotClick}
                ></div>
                {wrongWords.includes(word) && (
                  <span className="error-mark4-wb-u1-p4-q2">✕</span>
                )}
              </div>
            ))}
          </div>

          <div className="column2 right-column">
            {[
              "Good afternoon!",
              "How are you?",
              "Hello! I’m Stella.",
              "Fine, thank you.",
            ].map((word, i) => (
              <div className="word-row2" key={i}>
                <div
                  className="dot5 end-dot5"
                  data-image={word}
                  id={`dot-${word}`}
                  onClick={handleEndDotClick}
                ></div>
                <span
                  className="word-text3"
                  onClick={() => document.getElementById(`dot-${word}`).click()}
                  style={{ cursor: "pointer", width: "230px" }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>

          <svg className="lines-layer5">
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
            setShowAnswer(false);
               setLocked(false); // 🔓 مسموح الرسم مرة أخرى
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
