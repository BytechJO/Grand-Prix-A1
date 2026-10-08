import React, { useState } from "react";
import "./WB_Unit6_Page5_Q2.css";
import img1 from "../../../assets/U1 WB/U6/U6P37EXEJ-01.svg";
import img2 from "../../../assets/U1 WB/U6/U6P37EXEJ-02.svg";
import img3 from "../../../assets/U1 WB/U6/U6P37EXEJ-03.svg";
import img4 from "../../../assets/U1 WB/U6/U6P37EXEJ-04.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
const questions = [
  {
    id: 1,
    img: img1,
    sentence: "She can fly a kite.",
    words: ["she", "can", "fly", "a", "kite"],
    letters: "typolshehguecanvqxzflyiklppatyeikitebcm",
  },
  {
    id: 2,
    img: img2,
    sentence: "It can't swim.",
    words: ["it", "cant", "swim"],
    letters: "kloiuitponbcantrwqaswimmhgfd",
  },
  {
    id: 3,
    img: img3,
    sentence: "It can't climb a tree.",
    words: ["it", "cant", "climb", "a", "tree"],
    letters: "ascxitwqtycantlnmclimbpxczajhiyktreewqer",
  },
  {
    id: 4,
    img: img4,
    sentence: "He can't sail a boat.",
    words: ["he", "cant", "sail", "a", "boat"],
    letters: "kuyjhebzwsacantlzassailtruhavkooboatkhtg",
  },
];

const WB_Unit6_Page5_Q2 = () => {
  const [foundWords, setFoundWords] = useState({});
  const [currentWord, setCurrentWord] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState({});
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
        (_, i) => startIndex + i
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
  };
const showAnswers = () => {
  const allFoundWords = {};
  const allSelectedIndexes = {};
  const allWordIndexes = {};

  questions.forEach((q) => {
    allFoundWords[q.id] = [...q.words];

    let indexes = [];

    q.words.forEach((word) => {
      const startIndex = q.letters.toLowerCase().indexOf(word.toLowerCase());

      if (startIndex !== -1) {
        const wordIndexes = Array.from(
          { length: word.length },
          (_, i) => startIndex + i
        );

        indexes.push(...wordIndexes);
      }
    });

    allSelectedIndexes[q.id] = indexes;
    allWordIndexes[q.id] = q.words.length;
  });

  setFoundWords(allFoundWords);
  setSelectedIndexes(allSelectedIndexes);
  setCurrentWordIndex(allWordIndexes);
  setCurrentWord("");
  setLocked(true);
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
        <h4 className="header-title-page8">
          <span className="ex-A">J</span>Find the words.
        </h4>
        <div className="flex flex-col gap-5">
        {questions.map((q) => (
          <div className="content-container-wb-unit6-p5-q2">
            <div key={q.id} className="wb-unit6-p5-q2-question">
              <p className="wb-unit6-p5-q2-sentence">
                <b>{q.id}</b> {q.sentence}
              </p>

              <div className="wb-unit6-p5-q2-letters">
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
            <img src={q.img} className="img-wb-unit6-p5-q2"/>
          </div>
        ))}</div>
      </div>
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
          <button
              className="show-answer-btn swal-continue"
              onClick={showAnswers}
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

export default WB_Unit6_Page5_Q2;
