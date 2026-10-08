import React, { useState } from "react";
import "./WB_Unit8_Page2_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/U1 WB/U8/U8P46EXED-01.svg";
import img2 from "../../../assets/U1 WB/U8/U8P46EXED-02.svg";
import img3 from "../../../assets/U1 WB/U8/U8P46EXED-03.svg";
import img4 from "../../../assets/U1 WB/U8/U8P46EXED-04.svg";
const questions = [
  {
    id: 1,
    img: img1,
    sentence: "Bend your knee.",
    words: ["bend", "your", "knee"],
    letters: "eigstbendzivyourploelkneeshkd",
  },
  {
    id: 2,
    img: img2,
    sentence: "Close your eyes.",
    words: ["close", "your", "eyes"],
    letters: "wopdcloseklbgyourzqeyesdt",
  },
  {
    id: 3,
    img: img3,
    sentence: "Touch your nose.",
    words: ["touch", "your", "nose"],
    letters: "oitouchwqytyourkhjfmnosevbyw",
  },
  {
    id: 4,
    img: img4,
    sentence: "Raise your hand.",
    words: ["raise", "your", "hand"],
    letters: "lkuiraisebcxzyourythandvrmib",
  },
];

const WB_Unit8_Page2_Q2 = () => {
  const [foundWords, setFoundWords] = useState({});
  const [currentWord, setCurrentWord] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState({});
  const [locked, setLocked] = useState(false);

  const handleLetterClick = (qId, letter, index) => {
    if (locked) return;

    const next = currentWord + letter;
    setCurrentWord(next);

    const question = questions.find((q) => q.id === qId);
    const expectedIndex = currentWordIndex[qId] || 0;
    const expectedWord = question.words[expectedIndex];

    // ❌ لو الكلمة اللي عم تتكوّن مش بداية الكلمة المتوقعة
    if (!expectedWord.startsWith(next.toLowerCase())) {
      setCurrentWord("");
      return;
    }

    // ✅ لما تكتمل الكلمة الصح
    if (next.toLowerCase() === expectedWord.toLowerCase()) {
      const startIndex = index - expectedWord.length + 1;
      const indexes = Array.from(
        { length: expectedWord.length },
        (_, i) => startIndex + i,
      );

      setFoundWords((prev) => ({
        ...prev,
        [qId]: [...(prev[qId] || []), expectedWord],
      }));

      setSelectedIndexes((prev) => ({
        ...prev,
        [qId]: [...(prev[qId] || []), ...indexes],
      }));

      // ⏭️ انتقل للكلمة اللي بعدها
      setCurrentWordIndex((prev) => ({
        ...prev,
        [qId]: expectedIndex + 1,
      }));

      setCurrentWord("");
    }
  };

  const checkAnswers = () => {
    if (locked) return;

    // 🔒 تأكّد إنو كل سؤال فيه كلمة واحدة على الأقل
    const hasEmptyQuestion = questions.some((q) => {
      const foundCount = foundWords[q.id]?.length || 0;
      return foundCount === 0;
    });

    if (hasEmptyQuestion) {
      ValidationAlert.info("Please choose at least one word in each question.");
      return;
    }

    // ✅ حساب السكور (نفسه بدون تغيير)
    let correctCount = 0;
    let totalCount = 0;

    questions.forEach((q) => {
      q.words.forEach((word) => {
        totalCount++;
        if (foundWords[q.id]?.includes(word)) {
          correctCount++;
        }
      });
    });
    setLocked(true);

    const color =
      correctCount === totalCount
        ? "green"
        : correctCount === 0
          ? "red"
          : "orange";

    const type =
      correctCount === totalCount
        ? "success"
        : correctCount === 0
          ? "error"
          : "warning";

    ValidationAlert[type](`
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold;">
        Score: ${correctCount} / ${totalCount}
      </span>
    </div>
  `);
  };
  const reset = () => {
    setFoundWords({});
    setSelectedIndexes({});
    setCurrentWord("");
    setCurrentWordIndex({});
    setLocked(false);
    setShowAnswers(false);
  };
  const handleShowAnswers = () => {
    const allFoundWords = {};
    const allSelectedIndexes = {};
    const allCurrentIndexes = {};

    questions.forEach((q) => {
      allFoundWords[q.id] = [...q.words];
      allCurrentIndexes[q.id] = q.words.length;

      let indexes = [];

      q.words.forEach((word) => {
        const startIndex = q.letters.toLowerCase().indexOf(word.toLowerCase());

        if (startIndex !== -1) {
          indexes.push(
            ...Array.from({ length: word.length }, (_, i) => startIndex + i),
          );
        }
      });

      allSelectedIndexes[q.id] = indexes;
    });

    setFoundWords(allFoundWords);
    setSelectedIndexes(allSelectedIndexes);
    setCurrentWordIndex(allCurrentIndexes);
    setCurrentWord("");
    setLocked(true);
    setShowAnswers(true);
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
          gap: "15px",
        }}
      >
        <h4 className="header-title-page8">
          <span className="ex-A">D</span>Tap or click to find the words.
        </h4>
        <div className="content-container-all-wb-unit8-p2-q2">
          {questions.map((q) => (
            <div className="content-container-wb-unit8-p2-q2">
              <div className="img-container-wb-unit8-p2-q2">
                <b>{q.id}</b>
                <img src={q.img} style={{ height: "100px", width: "auto" }} />
              </div>
              <div key={q.id} className="wb-unit6-p5-q2-question">
                <p className="wb-unit6-p5-q2-sentence">{q.sentence}</p>

                <div
                  className="wb-unit6-p5-q2-letters"
                  style={{ width: "400px" }}
                >
                  {q.letters.split("").map((l, i) => {
                    const isSelected = selectedIndexes[q.id]?.includes(i);

                    return (
                      <span
                        key={i}
                        className={`wb-unit6-p5-q2-letter ${
                          isSelected ? "wb-unit6-p5-q2-letter-selected" : ""
                        }`}
                        onClick={() => handleLetterClick(q.id, l, i)}
                      >
                        {l}
                      </span>
                    );
                  })}
                </div>

                <div className="wb-unit6-p5-q2-found">
                  {foundWords[q.id]?.map((w, i) => (
                    <span key={i} className="wb-unit6-p5-q2-found-word">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button
          className="show-answer-btn swal-continue"
          onClick={handleShowAnswers}
        >
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit8_Page2_Q2;
