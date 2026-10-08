import React, { useState, useRef, useEffect } from "react";
import img1 from "../../../assets/unit6/imgs/U6P52EXEC-01.svg";
import img2 from "../../../assets/unit6/imgs/U6P52EXEC-02.svg";
import img3 from "../../../assets/unit6/imgs/U6P52EXEC-03.svg";
import img4 from "../../../assets/unit6/imgs/U6P52EXEC-04.svg";
import sound1 from "../../../assets/unit1/sounds/P17QF.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review5_Page1_Q3.css";
const Review5_Page1_Q3 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  let startPoint = null;
  const [wrongImages, setWrongImages] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // ⭐⭐⭐ NEW: منع الرسم بعد Check Answer
  const [locked, setLocked] = useState(false);
  const audioRef = useRef(null);
  const correctMatches = [
    { word: "Yes, it is.", image: [""] },
    { word: "No, it isn’t.", image: ["img1", "img2", "img3", "img4"] },
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

    const newLine = {
      x1: firstDot.x,
      y1: firstDot.y,

      x2: e.target.getBoundingClientRect().left - rect.left + 8,
      y2: e.target.getBoundingClientRect().top - rect.top + 8,

      word: e.target.dataset.word, // حرف d أو t
      image: firstDot.image, // الصورة المختارة
    };

    setLines((prev) => [...prev, newLine]);

    setSelectedAnswer(newLine.word);

    setTimeout(() => {
      setSelectedImage(null);
      setSelectedAnswer(null);
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

    let correctCount = 0;
    let wrong = [];

    lines.forEach((line) => {
      const isCorrect = correctMatches.some(
        (pair) => pair.word === line.word && pair.image.includes(line.image),
      );

      if (isCorrect) {
        correctCount++;
      } else {
        wrong.push(line.image); // ✅ خزّني اسم صورة الخطأ فقط
      }
    });

    setWrongImages(wrong); // ✅ حفظ الصور الغلط
    setLocked(true); // ⭐⭐⭐ NEW: أقفل الرسم بعد الضغط على Check Answer

    const total = 4;
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
  const handleShowAnswer = () => {
    // امنعي التعديل
    setShowAnswer(true);
    setLocked(true); // ⭐ NEW: ممنوع الرسم بعد Show Answer

    // امسحي الخطوط القديمة + الغلط
    setLines([]);
    setWrongImages([]);

    const rect = containerRef.current.getBoundingClientRect();

    // ارسم الخطوط الصحيحة
    let answerLines = [];

    correctMatches.forEach((pair) => {
      pair.image.forEach((imgId) => {
        // جيبي نقط البداية
        const startDot = document.querySelector(`[data-image="${imgId}"]`);
        const endDot = document.querySelector(`[data-word="${pair.word}"]`);

        if (startDot && endDot) {
          answerLines.push({
            x1: startDot.getBoundingClientRect().left - rect.left + 8,
            y1: startDot.getBoundingClientRect().top - rect.top + 8,
            x2: endDot.getBoundingClientRect().left - rect.left + 8,
            y2: endDot.getBoundingClientRect().top - rect.top + 8,
            word: pair.word,
            image: imgId,
          });
        }
      });
    });
setSelectedImage(null);
setSelectedAnswer(null);
    setLines(answerLines);
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
          <span className="mr-2">C</span> Look, read and match.
        </h5>

        <div className="match-wrapper2 w-full" ref={containerRef}>
          {/* الصور */}
          <div className="match-images-row2">
            <div className="img-box2">
              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  1
                </span>
                <img
                  src={img1}
                  alt=""
                  className={`clickable-img-unit2-p7-q2 ${
                    selectedImage === "img1" ? "selected-item" : ""
                  } ${locked || showAnswer ? "disabled-hover" : ""}`}
                  onClick={() => document.getElementById("img1-dot").click()}
                />
              </div>
              <h5
                style={{
                  border: "2px solid #2effeaff",
                  borderRadius: "8px",
                  background: "#b7fff8ff",
                  padding: "0px 5px",
                  display: "flex",
                  fontSize: "18px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedImage === "img1" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img1-dot").click()}
              >
                Is this a pen?
              </h5>
              {wrongImages.includes("img1") && (
                <span className="error-mark-img">✕</span>
              )}

              <div
                className="dot2-unit2 start-dot2-unit2"
                data-image="img1"
                id="img1-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div className="img-box2">
              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  2
                </span>
                <img
                  src={img2}
                  alt="img"
                  className={`clickable-img-unit2-p7-q2 ${
                    selectedImage === "img2" ? "selected-item" : ""
                  } ${locked || showAnswer ? "disabled-hover" : ""}`}
                  onClick={() => document.getElementById("img2-dot").click()}
                />
              </div>
              <h5
                style={{
                  border: "2px solid #2effeaff",
                  borderRadius: "8px",
                  background: "#b7fff8ff",
                  display: "flex",
                  padding: "0px 5px",
                  fontSize: "18px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedImage === "img2" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img2-dot").click()}
              >
                Is this an eraser?
              </h5>
              {wrongImages.includes("img2") && (
                <span className="error-mark-img">✕</span>
              )}
              <div
                className="dot2-unit2 start-dot2-unit2"
                data-image="img2"
                id="img2-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>

            <div className="img-box2">
              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  3
                </span>
                <img
                  src={img3}
                  alt=""
                  className={`clickable-img-unit2-p7-q2 ${
                    selectedImage === "img3" ? "selected-item" : ""
                  } ${locked || showAnswer ? "disabled-hover" : ""}`}
                  onClick={() => document.getElementById("img3-dot").click()}
                />
              </div>
              <h5
                style={{
                  border: "2px solid #2effeaff",
                  borderRadius: "8px",
                  background: "#b7fff8ff",
                  padding: "0px 5px",
                  display: "flex",
                  fontSize: "18px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedImage === "img3" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img3-dot").click()}
              >
                Is this a chair?
              </h5>
              {wrongImages.includes("img3") && (
                <span className="error-mark-img">✕</span>
              )}
              <div
                className="dot2-unit2 start-dot2-unit2"
                data-image="img3"
                id="img3-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>
            <div className="img-box2">
              <div style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    color: "#2c5287",
                    fontWeight: "700",
                    fontSize: "20px",
                  }}
                >
                  4
                </span>
                <img
                  src={img4}
                  alt=""
                  className={`clickable-img-unit2-p7-q2 ${
                    selectedImage === "img4" ? "selected-item" : ""
                  } ${locked || showAnswer ? "disabled-hover" : ""}`}
                  onClick={() => document.getElementById("img4-dot").click()}
                />
              </div>
              <h5
                style={{
                  border: "2px solid #2effeaff",
                  borderRadius: "8px",
                  background: "#b7fff8ff",
                  padding: "0px 5px",
                  display: "flex",
                  fontSize: "18px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedImage === "img4" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img4-dot").click()}
              >
                Is this a desk?
              </h5>
              {wrongImages.includes("img4") && (
                <span className="error-mark-img">✕</span>
              )}
              <div
                className="dot2-unit2 start-dot2-unit2"
                data-image="img4"
                id="img4-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>
          </div>

          {/* الجمل */}
          <div className="match-words-row2">
            <div className="word-box2-review6-p1-q3">
              <h5
                style={{
                  border: "2px solid #2effeaff",
                  borderRadius: "8px",
                  background: "#b7fff8ff",
                  fontSize: "18px",
                  display: "flex",
                  padding: "0px 5px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedAnswer === "Yes, it is." ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("Yes-dot").click()}
              >
                Yes, it is.
              </h5>
              <div
                className="dot2-unit2 end-dot2-unit2"
                data-word="Yes, it is."
                id="Yes-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>

            <div className="word-box2-review6-p1-q3">
              <h5
                style={{
                  border: "2px solid #2effeaff",
                  borderRadius: "8px",
                  background: "#b7fff8ff",
                  fontSize: "18px",
                  display: "flex",
                  padding: "0px 5px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedAnswer === "No, it isn’t." ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("No-dot").click()}
              >
                No, it isn’t.
              </h5>
              <div
                className="dot2-unit2 end-dot2-unit2"
                data-word="No, it isn’t."
                id="No-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>
          </div>

          {/* الخطوط */}
          <svg className="lines-layer2">
            {lines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="red"
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>

        <div className="action-buttons-container">
          <button
           onClick={() => {
  setLines([]);
  setWrongImages([]);
  setShowAnswer(false);
  setLocked(false);

  setSelectedImage(null);
  setSelectedAnswer(null);
}}
            className="try-again-button"
          >
            Start Again ↻
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn">
            Show Answer
          </button>
          <button onClick={checkAnswers2} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review5_Page1_Q3;
