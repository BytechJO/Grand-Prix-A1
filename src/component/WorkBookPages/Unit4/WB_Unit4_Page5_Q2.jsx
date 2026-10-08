import React, { useState } from "react";
// import "./WB_Unit2_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const grid = [
  ["b", "t", "e", "r", "i", "s", "u", "t"],
  ["s", "q", "u", "a", "r", "e", "b", "r"],
  ["u", "i", "c", "i", "l", "g", "w", "i"],
  ["b", "l", "u", "e", "u", "b", "r", "a"],
  ["e", "n", "n", "b", "n", "t", "r", "n"],
  ["c", "i", "r", "c", "l", "e", "u", "g"],
  ["s", "l", "b", "e", "a", "e", "r", "l"],
  ["i", "e", "l", "c", "d", "i", "c", "e"],
];

const words = [
  {
    text: "red",
    coords: [
      [5, 2],
      [6, 3],
      [7, 4],
    ],
  },
  {
    text: "blue",
    coords: [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
    ],
  },
  {
    text: "triangle",
    coords: [
      [0, 7],
      [1, 7],
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
      [7, 7],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "circle",
    coords: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "square",
    coords: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
];

export default function WB_Unit4_Page5_Q2() {
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wrongTry, setWrongTry] = useState(false);
  const [allSelections, setAllSelections] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleCellClick = (r, c) => {
    // ⛔ قفل التفاعل
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
    setLocked(true);

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
    setLocked(false);
    setAllSelections([]); // ⭐️ هذه كانت ناقصة
  };

  return (
    <div className="wordsearch-wrapper">
      <div className="page8-wrapper">
        <div className="div-forall" style={{ gap:"20px"}}>
          <h3 className="header-title-page8">
            <span className="ex-A">J</span>Find the words.
          </h3>
          <div className="word-bank-wb-u4-p5-q1 w-full">
            {words.map((w, i) => (
              <span
                key={i}
                className="word-box-wb-u1-p8-q2"
                style={{ position: "relative" }}
              >
                {w.text}
                {/* ✖ إكس داخل دائرة للكلمات الخاطئة */}
                {wrongWords.includes(w.text) && (
                  <span className="wrong-x-circle-wb-u4-p5-q1">✕</span>
                )}
              </span>
            ))}
          </div>
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
