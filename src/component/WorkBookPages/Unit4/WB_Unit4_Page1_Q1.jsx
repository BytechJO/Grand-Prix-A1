import React, { useState, useRef } from "react";
import boy from "../../../assets/U1 WB/U4/U4P21EXEA-01.svg";
import fotball from "../../../assets/img_unit2/imgs/Football.jpg";
import bird from "../../../assets/U1 WB/U4/U4P21EXEA-02.svg";
import pizza2 from "../../../assets/U1 WB/U4/U4P21EXEA-03.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

import "./WB_Unit4_Page1_Q1.css";
// import { faFootball } from "@fortawesome/free-solid-svg-icons";
const WB_Unit4_Page1_Q1 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  let startPoint = null;
  const [wrongWords, setWrongWords] = useState([]); // ⭐ تم التعديل هون
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedLeftWord, setSelectedLeftWord] = useState(null);
  const [selectedRightWord, setSelectedRightWord] = useState(null);

  // ⭐⭐⭐ NEW: منع الرسم بعد Check Answer
  const [locked, setLocked] = useState(false);
  const correctMatches = [
    { word: "It’s a circle.", image: "img2" },
    { word: "It’s a square.", image: "img3" },
    { word: "It’s a triangle.", image: "img1" },
  ];

  // ============================
  // 1️⃣ الضغط على النقطة الأولى (start-dot)
  // ============================
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐ NEW: لا تسمح بالرسم عند القفل

    const rect = containerRef.current.getBoundingClientRect();
    const imgId = e.target.dataset.image;
    setSelectedLeftWord(imgId);
    // ⭐⭐⭐ NEW: منع رسم أكثر من خط من نفس الصورة
    const alreadyUsed = lines.some((line) => line.image === imgId);
    if (alreadyUsed) return;
    // -----------------------------------------------------

    setFirstDot({
      image: imgId,
      x: e.target.getBoundingClientRect().left - rect.left + 8,
      y: e.target.getBoundingClientRect().top - rect.top + 8,
    });
  };

  // ============================
  // 2️⃣ الضغط على النقطة الثانية (end-dot)
  // ============================
  const handleEndDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐ NEW
    if (!firstDot) return;

    const rect = containerRef.current.getBoundingClientRect();

    const endWord = e.target.dataset.word || null;
    const endImage = e.target.dataset.image || null;

    const newLine = {
      x1: firstDot.x,
      y1: firstDot.y,
      x2: e.target.getBoundingClientRect().left - rect.left + 8,
      y2: e.target.getBoundingClientRect().top - rect.top + 8,

      word: firstDot.word || endWord, // نأخذ الكلمة من البداية أو النهاية حسب المتوفر
      image: firstDot.image || endImage, // نفس الشي للصورة
    };

    setLines((prev) => [...prev, newLine]);
    setSelectedRightWord(newLine.image);

    setTimeout(() => {
      setSelectedLeftWord(null);
      setSelectedRightWord(null);
    }, 300);

    setFirstDot(null);
  };

  const checkAnswers2 = () => {
    if (showAnswer || locked) return; // ⭐ NEW: لا يمكن إعادة التحقق
    if (lines.length < correctMatches.length) {
      ValidationAlert.info(
        "Oops!",
        "Please connect all the pairs before checking.",
      );
      return;
    }

    let wrong = [];
    let correctCount = 0;

    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (pair) => pair.word === line.word && pair.image === line.image,
      );

      if (isCorrect) correctCount++;
      else wrong.push(line.word);
    });

    setWrongWords(wrong);
    setLocked(true); // ⭐⭐⭐ NEW: أقفل الرسم بعد الضغط على Check Answer

    const total = correctMatches.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; margin-top: 10px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
           Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
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

          <h5 className="header-title-page8">
            {" "}
            <span className="ex-A">A</span> Look, read, and match.
          </h5>

          <div className="container12 w-full" ref={containerRef}>
            {/* الصف الأول */}
            <div className="matching-row2">
              <div className="img-with-dot2-wb-unit4-p1-q1">
                <span className="span-num2">1</span>{" "}
                <img
                  src={bird}
                  className={`matched-img2 ${locked || showAnswer ? "disabled-hover" : ""}`}
                  alt=""
                  onClick={() => document.getElementById("dot-img1").click()}
                  style={{ height: "auto", width: "120px", cursor: "pointer" }}
                />
                <span
                  className={`word-text2-wb-unit4-p1-q1 ${
                    selectedLeftWord === "img1" ? "selected-item" : ""
                  }${locked || showAnswer ? "disabled-word" : ""}`}
                  onClick={() => document.getElementById("dot-img1").click()}
                  style={{ cursor: "pointer", width: "350px" }}
                >
                  What shape is it?
                </span>
                {wrongWords.includes("It’s a triangle.") && ( // ⭐ تم التعديل هون
                  <span className="error-mark8-wb-unit4-p1-q1">✕</span>
                )}{" "}
                <div className="dot-wrapper2">
                  <div
                    className="dot2 start-dot2"
                    data-image="img1"
                    id="dot-img1"
                    onClick={handleStartDotClick}
                  ></div>
                </div>
              </div>
              <div className="word-with-dot2">
                <div className="dot-wrapper2">
                  <div
                    className="dot2 end-dot2"
                    data-word="It’s a circle."
                    id="dot-ball"
                    onClick={handleEndDotClick}
                  ></div>
                </div>

                <span
                  className={`word-text2-wb-unit4-p1-q1 ${
                    locked || showAnswer ? "disabled-word" : ""
                  }`}
                  onClick={() => document.getElementById("dot-ball").click()}
                  style={{ cursor: "pointer", width: "100px" }}
                >
                  It’s a circle.
                </span>
              </div>
            </div>

            {/* الصف الثاني */}
            <div className="matching-row2">
              <div className="img-with-dot2-wb-unit4-p1-q1">
                <span className="span-num2">2</span>{" "}
                <img
                  src={boy}
                  className={`matched-img2 ${
                    locked || showAnswer ? "disabled-hover" : ""
                  }`}
                  alt=""
                  onClick={() => document.getElementById("dot-img2").click()}
                  style={{ height: "auto", width: "120px", cursor: "pointer" }}
                />
                <span
                  className={`word-text2-wb-unit4-p1-q1 ${
                    selectedLeftWord === "img2" ? "selected-item" : ""
                  }${locked || showAnswer ? "disabled-word" : ""}`}
                  onClick={() => document.getElementById("dot-img2").click()}
                  style={{ cursor: "pointer", width: "350px" }}
                >
                  What shape is it?
                </span>
                {wrongWords.includes("It’s a circle.") && ( // ⭐ تم التعديل هون
                  <span className="error-mark8-wb-unit4-p1-q1">✕</span>
                )}{" "}
                <div className="dot-wrapper2">
                  <div
                    className="dot2 start-dot2"
                    data-image="img2"
                    id="dot-img2"
                    onClick={handleStartDotClick}
                  ></div>
                </div>
              </div>
              <div className="word-with-dot2">
                <div className="dot-wrapper2">
                  <div
                    className="dot2 end-dot2"
                    data-word="It’s a square."
                    id="dot-pizza"
                    onClick={handleEndDotClick}
                  ></div>
                </div>

                <span
                  className={`word-text2-wb-unit4-p1-q1 ${
                    locked || showAnswer ? "disabled-word" : ""
                  }`}
                  onClick={() => document.getElementById("dot-pizza").click()}
                  style={{ cursor: "pointer", width: "100px" }}
                >
                  It’s a square.
                </span>
              </div>
            </div>
            {/* الصف الثالث */}
            <div className="matching-row2">
              <div className="img-with-dot2-wb-unit4-p1-q1">
                <span className="span-num2">3</span>{" "}
                <img
                  src={pizza2}
                  className={`matched-img2 ${
                    locked || showAnswer ? "disabled-hover" : ""
                  }`}
                  alt=""
                  onClick={() => document.getElementById("dot-img3").click()}
                  style={{ height: "auto", width: "120px", cursor: "pointer" }}
                />
                <span
                  className={`word-text2-wb-unit4-p1-q1  ${
                    selectedLeftWord === "img3" ? "selected-item" : ""
                  }${locked || showAnswer ? "disabled-word" : ""}`}
                  onClick={() => document.getElementById("dot-img3").click()}
                  style={{ cursor: "pointer", width: "350px" }}
                >
                  What shape is it?
                </span>
                {wrongWords.includes("It’s a square.") && ( // ⭐ تم التعديل هون
                  <span className="error-mark8-wb-unit4-p1-q1">✕</span>
                )}{" "}
                <div className="dot-wrapper2">
                  <div
                    className="dot2 start-dot2"
                    id="dot-img3"
                    data-image="img3"
                    onClick={handleStartDotClick}
                  ></div>
                </div>
              </div>
              <div className="word-with-dot2">
                <div className="dot-wrapper2">
                  <div
                    className="dot2 end-dot2"
                    data-word="It’s a triangle."
                    id="dot-bird"
                    onClick={handleEndDotClick}
                  ></div>
                </div>

                <span
                  className={`word-text2-wb-unit4-p1-q1 ${
                    locked || showAnswer ? "disabled-word" : ""
                  }`}
                  onClick={() => document.getElementById("dot-bird").click()}
                  style={{ cursor: "pointer", width: "100px" }}
                >
                  It’s a triangle.
                </span>
              </div>
            </div>

            <svg className="lines-layer2">
              {lines.map((line, i) => (
                <line key={i} {...line} stroke="red" strokeWidth="3" />
              ))}
            </svg>
          </div>
        </div>
  
      <div className="action-buttons-container">
        <button
          onClick={() => {
            setLines([]);
            setWrongWords([]);
            setFirstDot(null);
               setSelectedLeftWord(null);
              setSelectedRightWord(null);
            setShowAnswer(false);
            setLocked(false); // ⭐⭐⭐ NEW: إعادة فتح الرسم
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
        {/* Show Answer */}
        <button
          onClick={() => {
            const rect = containerRef.current.getBoundingClientRect();

            const getDotPosition = (selector) => {
              const el = document.querySelector(selector);
              if (!el) return { x: 0, y: 0 };
              const r = el.getBoundingClientRect();
              return {
                x: r.left - rect.left + 8,
                y: r.top - rect.top + 8,
              };
            };

            const finalLines = correctMatches.map((line) => ({
              ...line,
              x1: getDotPosition(`[data-word="${line.word}"]`).x,
              y1: getDotPosition(`[data-word="${line.word}"]`).y,
              x2: getDotPosition(`[data-image="${line.image}"]`).x,
              y2: getDotPosition(`[data-image="${line.image}"]`).y,
            }));

            setLines(finalLines);
            setWrongWords([]);
               setSelectedLeftWord(null);
              setSelectedRightWord(null);
            setShowAnswer(true);
            setLocked(true); // ⭐ NEW: ممنوع الرسم بعد Show Answer
          }}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button onClick={checkAnswers2} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit4_Page1_Q1;
