import React, { useState, useRef, useEffect } from "react";
import img1 from "../../../assets/img_unit2/imgs/33.jpg";
import img2 from "../../../assets/img_unit2/imgs/34.jpg";
import img3 from "../../../assets/img_unit2/imgs/35.jpg";
import img4 from "../../../assets/img_unit2/imgs/36.jpg";
import img5 from "../../../assets/img_unit2/imgs/37.jpg";
import sound1 from "../../../assets/unit1/sounds/P17QF.mp3";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import "./Unit2_Page8_Q3.css";

const Unit2_Page8_Q3 = () => {
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  let startPoint = null;
  const [wrongImages, setWrongImages] = useState([]);
  const [firstDot, setFirstDot] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  // ⭐⭐⭐ NEW: منع الرسم بعد Check Answer
  const [locked, setLocked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  // إعدادات الصوت
  const stopAtSecond = 7.3;

  // زر الكابشن

  const correctMatches = [
    { word: "d", image: ["img1", "img2", "img5"] },
    { word: "t", image: ["img3", "img4"] },
  ];
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 7.17,
      text: "Page 17, exercise F. Does it begin with a D or T? Listen and match.",
    },
    { start: 7.19, end: 9.16, text: "1-doll. " },
    { start: 9.18, end: 11.11, text: "2-dog. " },
    { start: 11.13, end: 13.09, text: "3-tail." },
    { start: 13.11, end: 15.16, text: "4-tall." },
    { start: 15.18, end: 17.22, text: "5-dates." },
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

    setSelectedWord(newLine.word);

    setTimeout(() => {
      setSelectedImage(null);
      setSelectedWord(null);
    }, 300);

    setFirstDot(null);
  };

  // ============================
  // 3️⃣ Check Answers
  // ============================
  const checkAnswers = () => {
    if (showAnswer || locked) return; // ⭐ NEW: لا يمكن إعادة التحقق

    const total = correctMatches.reduce(
      (acc, pair) => acc + pair.image.length,
      0,
    );

    if (lines.length < total) {
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
        (pair) => pair.word === line.word && pair.image.includes(line.image),
      );

      if (isCorrect) correctCount++;
      else wrong.push(line.image);
    });

    setWrongImages(wrong);

    setLocked(true); // ⭐⭐⭐ NEW: أقفل الرسم بعد الضغط على Check Answer

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
    setSelectedImage(null);
    setSelectedWord(null);
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
      <div className="div-forall" style={{}}>
        <h5 className="header-title-page8">
          <span className="mr-2">F</span> Does it begin with{" "}
          <span style={{ color: "red" }}>d</span>or{" "}
          <span style={{ color: "red" }}>t</span>? Listen and match.
        </h5>
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />

        <div className="match-wrapper2-review1-p2-q3" ref={containerRef}>
          {/* الصور */}
          <div className="match-images-row2">
            <div className="img-box2">
              <img
                src={img1}
                alt=""
                className={`clickable-img-unit2-p7-q2 ${
                  selectedImage === "img1" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img1-dot").click()}
                style={{ cursor: "pointer" }}
              />
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
              <img
                src={img2}
                alt="img"
                className={`clickable-img-unit2-p7-q2 ${
                  selectedImage === "img2" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img2-dot").click()}
                style={{ cursor: "pointer" }}
              />
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
              <img
                src={img3}
                className={`clickable-img-unit2-p7-q2 ${
                  selectedImage === "img3" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("img3-dot").click()}
                style={{ cursor: "pointer" }}
              />{" "}
              {!locked && wrongImages.includes("img3") && (
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
              <img
                src={img4}
                className={`clickable-img-unit2-p7-q2 ${
                  selectedImage === "img4" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                alt=""
                onClick={() => document.getElementById("img4-dot").click()}
                style={{ cursor: "pointer" }}
              />{" "}
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
            <div className="img-box2">
              <img
                src={img5}
                alt=""
                className={`clickable-img-unit2-p7-q2 ${
                  selectedImage === "img5" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
                onClick={() => document.getElementById("img5-dot").click()}
                style={{ cursor: "pointer" }}
              />{" "}
              {wrongImages.includes("img5") && (
                <span className="error-mark-img">✕</span>
              )}
              <div
                className="dot2-unit2 start-dot2-unit2"
                data-image="img5"
                id="img5-dot"
                onClick={handleStartDotClick}
              ></div>
            </div>
          </div>

          {/* الجمل */}
          <div className="match-words-row2">
            <div className="word-box2">
              <h5
                onClick={() => document.getElementById("d-dot").click()}
                id="d-char"
                style={{
                  border: "2px solid #2effeaff",
                  borderRadius: "8px",
                  background: "#b7fff8ff",
                  height: "30px",
                  width: "60px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedWord === "d" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
              >
                d
              </h5>
              <div
                className="dot2-unit2 end-dot2-unit2"
                data-word="d"
                id="d-dot"
                onClick={handleEndDotClick}
              ></div>
            </div>

            <div className="word-box2">
              <h5
                onClick={() => document.getElementById("t-dot").click()}
                id="t-char"
                style={{
                  border: "2px solid green",
                  borderRadius: "8px",
                  background: "#92e992",
                  height: "30px",
                  width: "60px",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                className={`clickable-word-unit2-p7-q2 ${
                  selectedWord === "t" ? "selected-item" : ""
                } ${locked || showAnswer ? "disabled-hover" : ""}`}
              >
                t
              </h5>
              <div
                className="dot2-unit2 end-dot2-unit2"
                data-word="t"
                id="t-dot"
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
              setSelectedWord(null);
            }}
            className="try-again-button"
          >
            Start Again ↻
          </button>
          <button onClick={handleShowAnswer} className="show-answer-btn">
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit2_Page8_Q3;
