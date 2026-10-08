import React, { useState, useRef } from "react";
import boy from "../../../assets/img_unit2/imgs/boy 01.png";
import fotball from "../../../assets/img_unit2/imgs/Football.jpg";
import bird from "../../../assets/img_unit2/imgs/bird.jpg";
import pizza2 from "../../../assets/img_unit2/imgs/Pizza (2).jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit2_Page10_Q2.css";
// import { faFootball } from "@fortawesome/free-solid-svg-icons";
const Unit2_Page10_Q2 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  let startPoint = null;
  const [wrongWords, setWrongWords] = useState([]); // ⭐ تم التعديل هون
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  // ⭐⭐⭐ NEW: منع الرسم بعد Check Answer
  const [locked, setLocked] = useState(false);
  const correctMatches = [
    { word: "bird", image: "img1" },
    { word: "boy", image: "img2" },
    { word: "pizza", image: "img3" },
    { word: "ball", image: "img4" },
  ];

  // ============================
  // 1️⃣ الضغط على النقطة الأولى (start-dot)
  // ============================
  const handleStartDotClick = (e) => {
    if (showAnswer || locked) return; // ⭐ NEW: لا تسمح بالرسم عند القفل

    const rect = containerRef.current.getBoundingClientRect();
    const imgId = e.target.dataset.image;
    setSelectedImage(imgId);
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

    setSelectedWord(newLine.word);

    setTimeout(() => {
      setSelectedImage(null);
      setSelectedWord(null);
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
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="mr-2">E</span> Read and match.
        </h5>

        <div className="container12-unit2-pg10-q2" ref={containerRef}>
          {/* الصف الأول */}
          <div className="matching-row2">
            <div className="img-with-dot2">
              <span className="span-num2">1</span>{" "}
              <img
                src={bird}
                className={`matched-img2 ${
                  selectedImage === "img1" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("dot-img1").click()}
                style={{ height: "auto", width: "120px", cursor: "pointer" }}
              />
              {wrongWords.includes("bird") && ( // ⭐ تم التعديل هون
                <span className="error-mark8-u2-p19-q2">✕</span>
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
                  data-word="ball"
                  id="dot-ball"
                  onClick={handleEndDotClick}
                ></div>
              </div>

              <span
                className={`word-text2 ${
                  selectedWord === "ball" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("dot-ball").click()}
                style={{ cursor: "pointer" }}
              >
                Ball
              </span>
            </div>
          </div>

          {/* الصف الثاني */}
          <div className="matching-row2">
            <div className="img-with-dot2">
              <span className="span-num2">2</span>{" "}
              <img
                src={boy}
                className={`matched-img2 ${
                  selectedImage === "img2" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("dot-img2").click()}
                style={{ height: "auto", width: "120px", cursor: "pointer" }}
              />
              {wrongWords.includes("boy") && ( // ⭐ تم التعديل هون
                <span className="error-mark8-u2-p19-q2">✕</span>
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
                  data-word="pizza"
                  id="dot-pizza"
                  onClick={handleEndDotClick}
                ></div>
              </div>

              <span
                className={`word-text2 ${
                  selectedWord === "pizza" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("dot-pizza").click()}
                style={{ cursor: "pointer" }}
              >
                pizza
              </span>
            </div>
          </div>
          {/* الصف الثالث */}
          <div className="matching-row2">
            <div className="img-with-dot2">
              <span className="span-num2">3</span>{" "}
              <img
                src={pizza2}
                className={`matched-img2 ${
                  selectedImage === "img3" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("dot-img3").click()}
                style={{ height: "auto", width: "120px", cursor: "pointer" }}
              />
              {wrongWords.includes("pizza") && ( // ⭐ تم التعديل هون
                <span className="error-mark8-u2-p19-q2">✕</span>
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
                  data-word="bird"
                  id="dot-bird"
                  onClick={handleEndDotClick}
                ></div>
              </div>

              <span
                className={`word-text2 ${
                  selectedWord === "bird" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("dot-bird").click()}
                style={{ cursor: "pointer" }}
              >
                bird
              </span>
            </div>
          </div>

          {/* الصف الرابع */}
          <div className="matching-row2">
            <div className="img-with-dot2">
              <span className="span-num2">4</span>{" "}
              <img
                src={fotball}
                className={`matched-img2 ${
                  selectedImage === "img4" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("dot-img4").click()}
                style={{ height: "auto", width: "120px", cursor: "pointer" }}
              />
              {wrongWords.includes("ball") && ( // ⭐ تم التعديل هون
                <span className="error-mark8-u2-p19-q2">✕</span>
              )}{" "}
              <div className="dot-wrapper2">
                <div
                  className="dot2 start-dot2"
                  data-image="img4"
                  id="dot-img4"
                  onClick={handleStartDotClick}
                ></div>
              </div>
            </div>
            <div className="word-with-dot2">
              <div className="dot-wrapper2">
                <div
                  className="dot2 end-dot2"
                  data-word="boy"
                  id="dot-boy"
                  onClick={handleEndDotClick}
                ></div>
              </div>

              <span
                className={`word-text2 ${
                  selectedWord === "boy" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("dot-boy").click()}
                style={{ cursor: "pointer" }}
              >
                boy
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
  setShowAnswer(false);
  setLocked(false);

  setSelectedImage(null);
  setSelectedWord(null);
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
setSelectedImage(null);
setSelectedWord(null);

setLines(finalLines);
setWrongWords([]);
setShowAnswer(true);
setLocked(true);  }}
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

export default Unit2_Page10_Q2;
