import React, { useState, useRef, useEffect } from "react";
import "./Review5_Page2_Q2.css";
import sound1 from "../../../assets/unit6/sounds/U6P53EXEE.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";

// Example images imports. Replace with your actual paths.
import img1a from "../../../assets/unit6/imgs/U6P53EXEE01-01.svg";
import img1b from "../../../assets/unit6/imgs/U6P53EXEE01-02.svg";
import img1c from "../../../assets/unit6/imgs/U6P53EXEE01-03.svg";

import img2a from "../../../assets/unit6/imgs/U6P53EXEE02-01.svg";
import img2b from "../../../assets/unit6/imgs/U6P53EXEE02-02.svg";
import img2c from "../../../assets/unit6/imgs/U6P53EXEE02-03.svg";

import img3a from "../../../assets/unit6/imgs/U6P53EXEE03-01.svg";
import img3b from "../../../assets/unit6/imgs/U6P53EXEE03-02.svg";
import img3c from "../../../assets/unit6/imgs/U6P53EXEE03-03.svg";

import img4a from "../../../assets/unit6/imgs/U6P53EXEE04-01.svg";
import img4b from "../../../assets/unit6/imgs/U6P53EXEE04-02.svg";
import img4c from "../../../assets/unit6/imgs/U6P53EXEE04-03.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Review5_Page2_Q2 = () => {
  const groups = [
    { images: [img1a, img1b, img1c], different: 2 },
    { images: [img2a, img2b, img2c], different: 1 },
    { images: [img3a, img3b, img3c], different: 0 },
    { images: [img4a, img4b, img4c], different: 2 },
  ];
  const [showResult2, setShowResult2] = useState(false);
  const [selected, setSelected] = useState(Array(groups.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const stopAtSecond = 9;

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 9.04,
      text: "Page 53, exercise E. Which picture begins with a different sound? Listen and write X.",
    },
    { start: 9.06, end: 13.14, text: "1. goose, gate, kiwi," },
    { start: 13.16, end: 17.17, text: "2. kick, goat, kite," },
    { start: 17.19, end: 22.06, text: "3. king, garlic, game,  " },
    { start: 22.08, end: 27.09, text: "4. kangaroo, key, grapes. " },
  ];


  const handleSelect = (groupIndex, imageIndex) => {
    if (locked || showResult2) return; // 🔒 منع التعديل بعد Show Answer
    const updated = [...selected];
    updated[groupIndex] = imageIndex;
    setSelected(updated);
    setShowResult2(false);
  };
  const showAnswers = () => {
    const correctSelections = groups.map((g) => g.different);

    setSelected(correctSelections);
    setShowResult2(true);
    setLocked(true); // 🔒 قفل التعديل
  };

  const checkAnswers = () => {
    if (locked || showResult2) return; // 🔒 منع التعديل بعد Show Answer
    if (selected.some((val) => val === null)) {
      ValidationAlert.info("Please choose a circle (f or v) for all items!");
      return;
    }
    let correctCount = 0;
    let wrongCount = 0;
    groups.forEach((group, index) => {
      if (selected[index] === null)
        return ValidationAlert.info(
          "Please choose a circle (f or v) for all items!",
        );

      if (selected[index] === group.different) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const total = groups.length; // 8 نقاط
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;
    // تحديد الرسالة حسب نوع الإجابات
    if (correctCount === groups.length) {
      ValidationAlert.success(scoreMessage);
    } else if (correctCount === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
    setShowResult2(true);
  };

  const reset = () => {
    setSelected(Array(groups.length).fill(null));
    setShowResult(false);
    setShowResult2(false);
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
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          // width: "60%",
          justifyContent: "flex-start",
        }}
      >
        <h3 className="header-title-page8">
          <span className="mr-2"> E</span> Listen and tap the pictures that
          start with a different sound.
        </h3>
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
       
        <div className="exercise-row-review5-p2-q2">
          {groups.map((group, gIndex) => (
            <div className="ds-group-box-review5-p2-q2 " key={gIndex}>
              <span style={{ color: "darkblue", fontWeight: "700" }}>
                {gIndex + 1}
              </span>
              {group.images.map((img, iIndex) => {
                const isSelected = selected[gIndex] === iIndex;
                const isCorrect = group.different === iIndex;

                return (
                  <div
                    className="ds-image-wrapper-review5-p2-q2 "
                    key={iIndex}
                    onClick={() => !locked && handleSelect(gIndex, iIndex)}
                  >
                    <img src={img} className="ds-image-review5-p2-q2 " />

                    {/* Display X only when result is shown */}
                    {isSelected && <div className="ds-x">✕</div>}
                    {/* ❌ دائرة حمراء فيها X بيضاء للخطأ فقط عند النتيجة */}
                    {showResult2 && !locked && isSelected && !isCorrect && (
                      <span className="wrong-x-circle-review5-p2-q2">✕</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
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

export default Review5_Page2_Q2;
