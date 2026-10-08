import React, { useState } from "react";
import "./WB_Unit7_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const grid = [
  ["s", "c", "a", "r", "e", "d", "a"],
  ["e", "s", "p", "d", "s", "a", "d"],
  ["h", "c", "o", "l", "d", "c", "h"],
  ["h", "a", "p", "p", "y", "a", "y"],
  ["h", "u", "n", "g", "r", "y", "s"],
  ["b", "o", "r", "e", "d", "d", "a"],
  ["b", "d", "u", "c", "p", "d", "c"],
];

const words = [
  {
    text: "sad",
    coords: [
      [1, 4],
      [1, 5],
      [1, 6],
    ],
  },
  {
    text: "bored",
    coords: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
    ],
  },
  {
    text: "happy",
    coords: [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "hungry",
    coords: [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "cold",
    coords: [
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "scared",
    coords: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
];

export default function WB_Unit7_Page5_Q2() {
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wrongTry, setWrongTry] = useState(false);
  const [allSelections, setAllSelections] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCellClick = (r, c) => {
    // ⛔ منع التفاعل بعد التشيك أو الشو
    if (locked || showAnswer) return;

    // ⛔ منع الكبس على خلايا كلمات صحيحة
    if (isFoundCell(r, c)) return;

    setSelected((prev) => {
      const exists = prev.some((coord) => coord[0] === r && coord[1] === c);

      // 🔁 toggle
      if (exists) {
        return prev.filter((coord) => !(coord[0] === r && coord[1] === c));
      }

      return [...prev, [r, c]];
    });
  };

  const isHighlighted = (r, c) => {
    return (
      selected.some((coord) => coord[0] === r && coord[1] === c) ||
      allSelections.some((sel) =>
        sel.some((coord) => coord[0] === r && coord[1] === c),
      )
    );
  };

  const isFoundCell = (r, c) => {
    return words.some(
      (w) =>
        foundWords.includes(w.text) &&
        w.coords.some((coord) => coord[0] === r && coord[1] === c),
    );
  };

  const checkAnswers = () => {
    if (showAnswer || locked) return;
    let foundList = [];
    if (selected.length === 0) {
      return ValidationAlert.info("");
    }
    words.forEach((word) => {
      const isCorrect =
        word.coords.length > 0 &&
        word.coords.every(([r, c]) =>
          selected.some((sel) => sel[0] === r && sel[1] === c),
        );

      if (isCorrect) foundList.push(word.text);
    });

    setFoundWords(foundList);

    // الكلمات الخاطئة = التي لم يجدها الطالب
    const wrong = words
      .map((w) => w.text)
      .filter((txt) => !foundList.includes(txt));

    setWrongWords(wrong);
    setLocked(true);

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

    // 2) ضع كل الإحداثيات داخل allSelections لتسليط الضوء عليها
    const allCoords = words.map((w) => w.coords);
    setAllSelections(allCoords);
    setLocked(true);

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
    setLocked(false);

    setAllSelections([]); // ⭐️ هذه كانت ناقصة
  };

  return (
    <div className="wordsearch-wrapper">
      <div className="page8-wrapper">
        <div className="div-forall" style={{ }}>
          <h3 className="header-title-page8">
            <span className="ex-A">J</span>Look and complete the puzzle.
          </h3>
          <div className="container-word-grid-wb-u7-p5-q2">
            <div className={`grid-wb-u1-p6-q2 ${wrongTry ? "shake" : ""}`}>
              {grid.map((row, rIdx) => (
                <div key={rIdx} className="row-wb-u1-p6-q2">
                  {row.map((cell, cIdx) => (
                    <div
                      key={cIdx}
                      className={`cell-wb-u1-p6-q2 
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

            <div className="word-btn-wb-u7-p5-q2">
              {words.map((w) => (
                <div key={w.text} className="word-label-wrapper-wb-u1-p6-q2">
                  <div
                    className={`word-label-wb-u1-p6-q2 ${
                      foundWords.includes(w.text) ? "done" : ""
                    }`}
                  >
                    {w.text}
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
