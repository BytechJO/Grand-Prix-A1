import React, { useState } from "react";
import "./WB_Unit10_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U10/U10P61EXEJ-01.svg";
import img2 from "../../../assets/U1 WB/U10/U10P61EXEJ-02.svg";
import img3 from "../../../assets/U1 WB/U10/U10P61EXEJ-03.svg";
import img4 from "../../../assets/U1 WB/U10/U10P61EXEJ-04.svg";
import img5 from "../../../assets/U1 WB/U10/U10P61EXEJ-05.svg";
import img6 from "../../../assets/U1 WB/U10/U10P61EXEJ-06.svg";

const grid = [
  ["m", "e", "l", "h", "m", "e", "d", "s", "k"],
  ["a", "p", "p", "l", "e", "i", "b", "p", "i"],
  ["e", "k", "a", "h", "s", "m", "i", "l", "k"],
  ["i", "c", "e", "c", "r", "e", "a", "m", "k"],
  ["c", "l", "s", "b", "r", "e", "a", "d", "f"],
  ["e", "i", "p", "a", "r", "b", "m", "h", "r"],
  ["c", "h", "i", "c", "k", "e", "n", "h", "u"],
  ["i", "p", "c", "c", "c", "d", "a", "c", "i"],
  ["h", "a", "a", "h", "e", "l", "a", "d", "t"],
];

const words = [
  {
    text: "milk",
    src: img1,
    coords: [
      [2, 5],
      [2, 6],
      [2, 7],
      [2, 8],
    ],
  },
  {
    text: "apple",
    src: img2,
    coords: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  },
  {
    text: "chicken",
    src: img3,
    coords: [
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5],
      [6, 6],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "bread",
    src: img4,
    coords: [
      [4, 3],
      [4, 4],
      [4, 5],
      [4, 6],
      [4, 7],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "fruit",
    src: img5,
    coords: [
      [4, 8],
      [5, 8],
      [6, 8],
      [7, 8],
      [8, 8],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
  {
    text: "ice cream",
    src: img6,
    coords: [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [3, 7],
    ], // لو بدك بحطلك الإحداثيات لاحقاً
  },
];

export default function WB_Unit10_Page5_Q2() {
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [wrongTry, setWrongTry] = useState(false);
  const [allSelections, setAllSelections] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [locked, setLocked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleCellClick = (r, c) => {
    // ⛔ منع أي تفاعل بعد التشيك أو الشو
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
    setShowAnswer(true);
    words.forEach((word) => {
      const isCorrect =
        word.coords.length > 0 &&
        word.coords.every(([r, c]) =>
          selected.some((sel) => sel[0] === r && sel[1] === c),
        );

      if (isCorrect) foundList.push(word.text);
    });

    setFoundWords(foundList);
    setLocked(true); // 🔒 قفل
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
    setLocked(true); // 🔒 قفل
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
    setLocked(false); // 🔒 قفل
    setAllSelections([]); // ⭐️ هذه كانت ناقصة
  };

  return (
    <div className="wordsearch-wrapper">
      <div className="page8-wrapper">
        <div className="div-forall" style={{}}>
          <h3 className="header-title-page8">
            <span className="ex-A">J</span> Tap or click the hidden words!
          </h3>
          <div className="container-word-grid-wb-unit10-p5-q2">
            <div className={`grid-wb-u1-p6-q2 ${wrongTry ? "shake" : ""}`}>
              {grid.map((row, rIdx) => (
                <div key={rIdx} className="row-wb-u1-p6-q2">
                  {row.map((cell, cIdx) => (
                    <div
                      key={cIdx}
                      className={`cell-wb-unit10-p5-q2
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

            <div className="word-btn-wb-unit10-p5-q2">
              {words.map((w, i) => (
                <div
                  className={`word-label-wb-u10-p5-q2 ${
                    foundWords.includes(w.text) ? "done" : ""
                  }`}
                >
                  <img
                    src={w.src}
                    style={{ height: "100px", width: "100px" }}
                  />
                  <p>{w.text}</p>
                  {/* ✖ إكس داخل دائرة للكلمات الخاطئة */}
                  {wrongWords.includes(w.text) && (
                    <span className="wrong-x-circle-wb-unit10-p5-q2">✕</span>
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
