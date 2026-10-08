import React, { useState, useEffect, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review9_Page2_Q1.css";
import sound1 from "../../../assets/unit10/sound/cd82pg89-instruction1-adult-lady_HJ6dZOlG.mp3";
import img2 from "../../../assets/unit10/imgs/U10P89EXED-01.svg";
import img3 from "../../../assets/unit10/imgs/U10P89EXED-02.svg";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const data = [
  {
    parts: [
      {
        before: "The ",
        blank: 1,
        after: "an walks at",
      },
      {
        before: " ",
        blank: 2,
        after: "ight.",
      },
    ],
    correct: ["m", "n"],
    img: img2,
  },
  {
    parts: [
      {
        before: "My",
        blank: 1,
        after: "om is a",
      },
      {
        before: " ",
        blank: 2,
        after: "urse",
      },
    ],
    correct: ["m", "n"],
    img: img3,
  },
];

const Review9_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(
    data.map((d) => Array(d.correct.length).fill("")),
  );
  const [wrongInputs, setWrongInputs] = useState([]);

  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل بعد Show Answer

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || locked) return;

    const value = draggableId.replace("char-", "");

    // 🟢 1) إذا رجع الحرف على الـ bank
    if (destination.droppableId === "char-bank") {
      setAnswers((prev) => {
        const updated = prev.map((row) => [...row]);

        updated.forEach((row, q) =>
          row.forEach((cell, b) => {
            if (cell === value) updated[q][b] = "";
          }),
        );

        return updated;
      });

      setWrongInputs([]);
      return;
    }

    // 🟢 2) إذا drop على خانة
    if (destination.droppableId.startsWith("slot-")) {
      const [, qIndex, blankIndex] = destination.droppableId
        .split("-")
        .map(Number);

      setAnswers((prev) => {
        const updated = prev.map((row) => [...row]);

        updated[qIndex][blankIndex] = value;
        return updated;
      });

      setWrongInputs([]);
    }
  };

  const checkAnswers = () => {
    if (locked) return; // ⭐ NEW — لا تعديل بعد Show Answer
    // 1) افحص إذا في أي خانة فاضية
    const hasEmpty = answers.some((arr) =>
      arr.some((val) => val.trim() === ""),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please fill in all blanks before checking!");
      return;
    }

    // 2) اجمع كل الأخطاء
    let wrong = [];
    let correctCount = 0;

    answers.forEach((arr, qIndex) => {
      arr.forEach((val, blankIndex) => {
        if (val.trim() === data[qIndex].correct[blankIndex]) {
          correctCount++; // صح
        } else {
          wrong.push(`${qIndex}-${blankIndex}`); // غلط
        }
      });
    });

    setWrongInputs(wrong);

    // 3) احسب العدد الكلي للحقول
    const totalInputs = data.reduce(
      (acc, item) => acc + item.correct.length,
      0,
    );

    // 4) اختر اللون حسب السكور
    let color =
      correctCount === totalInputs
        ? "green"
        : correctCount === 0
          ? "red"
          : "orange";

    const scoreMessage = `
    <div style="font-size:20px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${totalInputs}
      </span>
    </div>
  `;
    setLocked(true); // ⭐ NEW — قفل التعديل بعد Check
    // 5) طباعة النتيجة
    if (correctCount === totalInputs) {
      ValidationAlert.success(scoreMessage);
    } else if (correctCount === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
  };
  // ⭐⭐⭐ NEW — Show Answer
  const showAnswer = () => {
    const correctFilled = data.map((d) => [...d.correct]);

    setAnswers(correctFilled); // ضع الإجابات الصحيحة
    setWrongInputs([]); // إزالة الأخطاء
    setLocked(true); // قفل الحقول
  };
  const stopAtSecond = 3.5;


  // ================================
  // ✔ Captions Array
  // ================================
const captions = [
  {
    start: 0.479,
    end: 4.639,
    text: "Page 89, exercise D. Listen and write."
  },

  {
    start: 5.44,
    end: 8.019,
    text: "1, the man walks at night."
  },

  {
    start: 8.72,
    end: 11.1,
    text: "2, my mom is a nurse."
  }
];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="page8-wrapper">
        <div
          className="div-forall"
          style={{
            gap: "30px",
          }}
        >
          <h3 className="header-title-page8">
            <span className="mr-2">D</span> Listen and drag the correct letters.
          </h3>

          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />
      

          <Droppable droppableId="char-bank" isDropDisabled={locked}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px",
                  border: "2px dashed #ccc",
                  borderRadius: "10px",
                  // margin: "10px 0",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {["m", "n"].map((char, index) => (
                  <Draggable
                    key={char}
                    draggableId={`char-${char}`}
                    index={index}
                    isDragDisabled={locked}
                  >
                    {(provided) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "7px 14px",
                          border: "2px solid #2c5287",
                          borderRadius: "8px",
                          background: "white",
                          fontWeight: "bold",
                          fontSize: "22px",
                          cursor: "grab",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {char}
                      </span>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {data.map((item, qIndex) => (
            <div className="row-missing" key={qIndex}>
              <span className="num">{qIndex + 1}.</span>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div className="sentence-review4-p2-q1">
                  {item.parts.map((p, blankIndex) => (
                    <span
                      key={blankIndex}
                      className="sentence-part"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {p.before}

                      <div className="input-wrapper-review9-p2-q2">
                        <Droppable
                          droppableId={`slot-${qIndex}-${blankIndex}`}
                          isDropDisabled={locked}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`missing-input-review4-p2-q1 ${
                                snapshot.isDraggingOver ? "drag-over-cell" : ""
                              }`}
                            >
                              {answers[qIndex][blankIndex] && (
                                <Draggable
                                  draggableId={`filled-${answers[qIndex][blankIndex]}-${qIndex}-${blankIndex}`}
                                  index={0}
                                  isDragDisabled
                                >
                                  {(provided) => (
                                    <span
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {answers[qIndex][blankIndex]}
                                    </span>
                                  )}
                                </Draggable>
                              )}
                              {provided.placeholder}

                              {wrongInputs.includes(
                                `${qIndex}-${blankIndex}`,
                              ) && (
                                <span className="wrong-icon-review4-p2-q1">
                                  ✕
                                </span>
                              )}
                            </div>
                          )}
                        </Droppable>
                      </div>

                      {p.after}
                    </span>
                  ))}
                </div>
                <img
                  src={item.img}
                  className="middle-img-review9-p2-q2"
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
        <div className="action-buttons-container">
          <button
            className="try-again-button"
            onClick={() => {
              setAnswers(data.map((d) => Array(d.correct.length).fill("")));
              setWrongInputs([]);
              setLocked(false); // ⭐ NEW — فتح التعديل من جديد
            }}
          >
            Start Again ↻
          </button>

          {/* ⭐⭐⭐ NEW BUTTON */}
          <button
            onClick={showAnswer}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>

          <button className="check-button2" onClick={checkAnswers}>
            Check Answers ✓
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Review9_Page2_Q1;
