import React, { useMemo, useState } from "react";
import "./WB_Unit3_Page4_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit3_Page4_Q1 = () => {
  const questions = useMemo(
    () => [
      {
        letters: "ltmnblistenpolq",
        answer: "Listen!",
        words: [
          { start: 5, length: 6 }, // "listen"
        ],
      },
      {
        letters: "yrxbmakeoiakhqglineybcz",
        answer: "Make a line.",
        words: [
          { start: 4, length: 4 }, // "make"
          { start: 10, length: 1 }, // "a"
          { start: 15, length: 4 }, // "line"
        ],
      },
      {
        letters: "bzopenutyeyourlkjhbookmmrd",
        answer: "Open your book.",
        words: [
          { start: 2, length: 4 }, // "open"
          { start: 10, length: 4 }, // "your"
          { start: 18, length: 4 }, // "book"
        ],
      },
      {
        letters: "uhkjquietbfas",
        answer: "Quiet!",
        words: [
          { start: 5, length: 5 }, // "quiet"
        ],
      },
    ],
    []
  );

  // flat array من اندكسات الحروف الصحيحة بالترتيب لكل سؤال
  const correctIndices = useMemo(
    () =>
      questions.map((q) =>
        q.words.flatMap(({ start, length }) =>
          Array.from({ length }, (_, i) => start + i)
        )
      ),
    [questions]
  );

  // progress[qIndex] = عدد الحروف المحددة حتى الآن
  const [progress, setProgress] = useState({});
  const [inputs, setInputs] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // ─── Click handler ────────────────────────────────────────────────────────
  const handleCharClick = (qIndex, cIndex) => {
    if (checked || showAnswer) return;

    const correct = correctIndices[qIndex];
    const current = progress[qIndex] ?? 0;

    // لو اكتملت الكلمات كلها، ما في شي يصير
    if (current === correct.length) return;

    // الحرف التالي المطلوب بالترتيب
    const nextExpected = correct[current];

    if (cIndex === nextExpected) {
      const newProgress = current + 1;
      setProgress((prev) => ({ ...prev, [qIndex]: newProgress }));

      // لو اكتملت كل الحروف → عبّي الـ input
      if (newProgress === correct.length) {
        setInputs((prev) => ({ ...prev, [qIndex]: questions[qIndex].answer }));
      }
    }
    // حرف غلط → تجاهل
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const normalizeAnswer = (s) => s.toLowerCase().replace(/[^a-z]/g, "");
  const normalizeInput  = (s) => s.toLowerCase().replace(/[^a-z]/g, "");

  const isCircleCorrect = (i) =>
    (progress[i] ?? 0) === correctIndices[i].length;

  const isWriteCorrect = (i) =>
    normalizeInput(inputs[i] || "") === normalizeAnswer(questions[i].answer);

  // ─── Actions ──────────────────────────────────────────────────────────────
  const startAgain = () => {
    setProgress({});
    setInputs({});
    setChecked(false);
    setShowAnswer(false);
  };

  const showTheAnswer = () => {
    const fullProgress = {};
    const fullInputs   = {};
    questions.forEach((q, i) => {
      fullProgress[i] = correctIndices[i].length;
      fullInputs[i]   = q.answer;
    });
    setProgress(fullProgress);
    setInputs(fullInputs);
    setShowAnswer(true);
    setChecked(false);
  };

  const checkAnswer = () => {
    if (showAnswer) return;

    for (let i = 0; i < questions.length; i++) {
      const done     = (progress[i] ?? 0) === correctIndices[i].length;
      const hasInput = inputs[i] && inputs[i].trim() !== "";
      if (!done && !hasInput) {
        ValidationAlert.info(`Please complete question ${i + 1}.`);
        return;
      }
    }

    let score = 0;
    questions.forEach((_, i) => {
      if (isCircleCorrect(i)) score++;
    });

    setChecked(true);

    const total = questions.length;
    const msg   = `Score: ${score} / ${total}`;
    if (score === total) return ValidationAlert.success(msg);
    if (score === 0)     return ValidationAlert.error(msg);
    return ValidationAlert.warning(msg);
  };

  // ─── Render ───────────────────────────────────────────────────────────────
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
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span className="ex-A">G</span>Tap or click the hidden words.
        </h5>

        <div className="wb-unit3-p4-q1-rows">
          {questions.map((q, qIndex) => {
            const correct  = correctIndices[qIndex];
            const done     = progress[qIndex] ?? 0;
            const selected = new Set(correct.slice(0, done));
            const nextChar = correct[done]; // undefined لو اكتمل

            return (
              <div key={qIndex} className="wb-unit3-p4-q1-row">
                <div className="wb-unit3-p4-q1-left">

                  {/* ── Letters line ── */}
                  <div className="wb-unit3-p4-q1-line">
                    <span className="wb-unit3-p4-q1-number">{qIndex + 1}</span>

                    <span className="wb-unit3-p4-q1-letters">
                      {q.letters.split("").map((ch, cIndex) => {
                        const isSelected = selected.has(cIndex);
                        const isNext     = !checked && !showAnswer && cIndex === nextChar;

                        return (
                          <span
                            key={cIndex}
                            className={[
                              "wb-unit3-p4-q1-char",
                              isSelected ? "is-circled" : "",
                              isNext     ? "is-next"    : "",
                            ].join(" ").trim()}
                            onClick={() => handleCharClick(qIndex, cIndex)}
                          >
                            {ch}
                          </span>
                        );
                      })}
                    </span>

                    {/* ✕ لو checked وحلقة الدائرة غلط */}
                    {checked && !isCircleCorrect(qIndex) && (
                      <div className="wrong-mark-wb-unit3-p4-q1">✕</div>
                    )}
                  </div>

                  {/* ── Input line ── */}
                  <div className="wb-unit3-p4-q1-write">
                    <input
                      className="wb-unit3-p4-q1-input"
                      value={inputs[qIndex] || ""}
                      readOnly
                    />
                    {checked && inputs[qIndex]?.trim() !== "" && !isWriteCorrect(qIndex) && (
                      <div className="wrong-mark-wb-unit3-p4-q1">✕</div>
                    )}
                  </div>

                </div>

                {/* الكلمة على اليمين */}
                <span className="wb-unit3-p4-q1-rightBtn">
                  {q.answer}
                </span>
              </div>
            );
          })}
        </div>

        <div className="action-buttons-container">
          <button className="try-again-button" onClick={startAgain}>
            Start Again ↻
          </button>
          <button className="show-answer-btn swal-continue" onClick={showTheAnswer}>
            Show Answer
          </button>
          <button className="check-button2" onClick={checkAnswer}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default WB_Unit3_Page4_Q1;