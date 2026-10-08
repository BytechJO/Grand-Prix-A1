import React, { useState } from "react";
import "./WB_Unit1_Page6_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const grid = [
  ["y", "h", "d", "y", "w", "u", "h"],
  ["l", "o", "u", "r", "h", "o", "e"],
  ["d", "w", "o", "b", "h", "y", "l"],
  ["e", "a", "u", "e", "b", "e", "l"],
  ["e", "r", "b", "d", "o", "r", "o"],
  ["u", "e", "o", "r", "h", "a", "e"],
  ["i", "y", "o", "o", "b", "o", "w"],
  ["g", "o", "o", "d", "b", "y", "e"],
  ["o", "u", "l", "l", "e", "h", "h"],
];

const words = [
  {
    text: "goodbye",
    coords: [
      [7, 0],
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
    ],
  },
  {
    text: "hello",
    coords: [
      [0, 6],
      [1, 6],
      [2, 6],
      [3, 6],
      [4, 6]
    ],
  },
  {
    text: "how are you",
    coords: [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
      [8, 1],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
];

export default function WB_Unit1_Page6_Q2() {
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wrongTry, setWrongTry] = useState(false);
  const [allSelections, setAllSelections] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);

const handleCellClick = (r, c) => {
  if (locked) return;        // ⛔ بعد التشيك أو الشو
  if (isFoundCell(r, c)) return;

  setSelected((prev) => {
    const exists = prev.some(
      (coord) => coord[0] === r && coord[1] === c
    );

    // toggle
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
    if (showAnswer) return;
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
    setLocked(false)
    setShowAnswer(false);
    setAllSelections([]); // ⭐️ هذه كانت ناقصة
  };

  return (
    <div className="wordsearch-wrapper" >
      <div className="page8-wrapper">
        <div className="div-forall" style={{  }}>
          <h3 className="header-title-page8">
            <span className="ex-A">H</span>Find the words.
          </h3>
          <div className="container-word-grid-wb-u1-p6-q2">
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

            <div className="word-btn-wb-u1-p6-q2">
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
