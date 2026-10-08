import React, { useState } from "react";
import "./WB_Unit2_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U2/U2P13EXEJ-01.svg";
import img2 from "../../../assets/U1 WB/U2/U2P13EXEJ-02.svg";
import img3 from "../../../assets/U1 WB/U2/U2P13EXEJ-03.svg";
import img4 from "../../../assets/U1 WB/U2/U2P13EXEJ-04.svg";
import img5 from "../../../assets/U1 WB/U2/U2P13EXEJ-05.svg";
import img6 from "../../../assets/U1 WB/U2/U2P13EXEJ-06.svg";
const grid = [
  ["a", "l", "c", "k", "c", "a", "r", "d"],
  ["b", "a", "l", "l", "o", "o", "n", "s"],
  ["e", "r", "j", "p", "s", "o", "t", "a"],
  ["p", "r", "e", "s", "e", "n", "t", "j"],
  ["o", "s", "l", "r", "c", "o", "p", "l"],
  ["e", "e", "l", "a", "h", "a", "t", "h"],
  ["s", "n", "o", "o", "l", "l", "k", "b"],
  ["e", "t", "p", "e", "a", "t", "h", "e"],
];

const words = [
  {
    text: "cake",
    src: img1,
    coords: [
      [4, 4],
      [5, 5],
      [6, 6],
      [7, 7],
    ],
  },
  {
    text: "jello",
    src: img2,
    coords: [
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
    ],
  },
  {
    text: "balloons",
    src: img3,
    coords: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "card",
    src: img4,
    coords: [
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "present",
    src: img5,
    coords: [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "hat",
    src: img6,
    coords: [
      [5, 4],
      [5, 5],
      [5, 6],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
];

export default function WB_Unit2_Page5_Q2() {
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wrongTry, setWrongTry] = useState(false);
  const [allSelections, setAllSelections] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);

 const handleCellClick = (r, c) => {
  // ⛔ منع التفاعل بعد التشيك أو الشو
  if (showAnswer) return;
  if (locked) return;

  // ⛔ منع الكبس على خلايا كلمات صحيحة
  if (isFoundCell(r, c)) return;

  setSelected((prev) => {
    const exists = prev.some(
      (coord) => coord[0] === r && coord[1] === c
    );

    // 🔁 toggle
    if (exists) {
      return prev.filter(
        (coord) => !(coord[0] === r && coord[1] === c)
      );
    }

    return [...prev, [r, c]];
  });
};


  const isHighlighted = (r, c) => {
    return (
      selected.some((coord) => coord[0] === r && coord[1] === c) ||
      allSelections.some((sel) =>
        sel.some((coord) => coord[0] === r && coord[1] === c)
      )
    );
  };

  const isFoundCell = (r, c) => {
    return words.some(
      (w) =>
        foundWords.includes(w.text) &&
        w.coords.some((coord) => coord[0] === r && coord[1] === c)
    );
  };

  const checkAnswers = () => {
    if (showAnswer ||locked) return;
    let foundList = [];
    if (selected.length === 0) {
      return ValidationAlert.info("");
    }
    words.forEach((word) => {
      const isCorrect =
        word.coords.length > 0 &&
        word.coords.every(([r, c]) =>
          selected.some((sel) => sel[0] === r && sel[1] === c)
        );

      if (isCorrect) foundList.push(word.text);
    });

    setFoundWords(foundList);
setLocked(true);

    // الكلمات الخاطئة = التي لم يجدها الطالب
    const wrong = words
      .map((w) => w.text)
      .filter((txt) => !foundList.includes(txt));

    setWrongWords(wrong);
    let total = words.length;
    let color =
      foundList.length === total
        ? "green"
        : foundList.length === 0
        ? "red"
        : "orange";

    const msg = `
      <div style="font-size:20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${foundList.length} / ${total}
        </span>
      </div>
    `;
    // النتيجة
    if (foundList.length === total) {
      ValidationAlert.success(msg);
    } else if (foundList.length === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setShowAnswer(true);
    // 1) جميع الكلمات تعتبر صحيحة
    setFoundWords(words.map((w) => w.text));
  setLocked(true); // 🔒
    // 2) ضع كل الإحداثيات داخل allSelections لتسليط الضوء عليها
    const allCoords = words.map((w) => w.coords);
    setAllSelections(allCoords);

    // 3) إزالة أي اختيار يدوي
    setSelected([]);

    // 4) إزالة الأخطاء
    setWrongWords([]);
  };

  const reset = () => {
    setSelected([]);
    setFoundWords([]);
    setWrongTry(false);
    setWrongWords([]);
    setShowAnswer(false);
    setLocked(false)
    setAllSelections([]); // ⭐️ هذه كانت ناقصة
  };

  return (
    <div className="wordsearch-wrapper">
      <div className="page8-wrapper">
        <div className="div-forall" style={{ }}>
          <h3 className="header-title-page8">
            <span className="ex-A">H</span>Find the words.
          </h3>
          <div className="container-word-grid-wb-u2-p5-q2">
            <div className={`grid-wb-u1-p6-q2 ${wrongTry ? "shake" : ""}`}>
              {grid.map((row, rIdx) => (
                <div key={rIdx} className="row-wb-u1-p6-q2">
                  {row.map((cell, cIdx) => (
                    <div
                      key={cIdx}
                      className={`cell-wb-u2-p5-q2
                    ${isHighlighted(rIdx, cIdx) ? "highlight" : ""} 
                    ${isFoundCell(rIdx, cIdx) ? "found" : ""}
                `}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="word-btn-wb-u2-p5-q2">
              {words.map((w, i) => (
                <div key={w.text} className="word-label-wrapper-wb-u2-p5-q2">
                  <div
                    className={`word-label-wb-u2-p5-q2 ${
                      foundWords.includes(w.text) ? "done" : ""
                    }`}
                  >
                    <p>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "rgb(44, 82, 135)",
                        }}
                      >
                        {i + 1}
                      </span>{" "}
                      {w.text}
                    </p>
                    <img
                      src={w.src}
                      style={{ height: "120px", width: "auto" }}
                    />
                  </div>

                  {/* ✖ إكس داخل دائرة للكلمات الخاطئة */}
                  {wrongWords.includes(w.text) && (
                    <span className="wrong-x-circle-wb-u1-p6-q2">✕</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn swal-continue" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
}
