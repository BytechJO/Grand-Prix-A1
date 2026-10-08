import React, { useState } from "react";
import "./Review10_Page1_Q3.css";
import jello from "../../../assets/unit10/imgs/U10P90EXEC-01.svg";
import present from "../../../assets/unit10/imgs/U10P90EXEC-02.svg";
import balloons from "../../../assets/img_unit2/imgs/balloons..jpg";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Review10_Page1_Q3 = () => {
  const [answers, setAnswers] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [disableInputs, setDisableInputs] = useState(false);
  const [inputs, setInputs] = useState({});
  const [wrong, setWrong] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const buildQuestionWordBank = (q) => {
    const text = `${q.questionCorrect} ${q.answerCorrect}`;

    return Array.from(
      new Set(
        text
          .replace(/[?.!,]/g, "")
          .split(/\s+/)
          .filter(Boolean),
      ),
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination || showAnswers) return;

    const { draggableId, destination } = result;

    // 🧠 qId تبع الكلمة
    const draggedQId = draggableId.split("-")[0]; // q1 أو q2

    // 🧠 qId تبع الانبوت
    const targetQId = destination.droppableId.split("_")[0];

    // ❌ منع الإسقاط إذا مش نفس السؤال
    if (draggedQId !== targetQId) return;

    const key = destination.droppableId;
    const draggedWord = draggableId.split("-").slice(1, -1).join(" ");

    // 🧠 اجمع كل الكلمات المستخدمة بهالسؤال
    const usedWords = [
      ...(inputs[`${draggedQId}_question`] || "").split(" "),
      ...(inputs[`${draggedQId}_answer`] || "").split(" "),
    ].filter(Boolean);

    // // ❌ إذا الكلمة مستخدمة → امنعي التكرار
    // if (usedWords.includes(draggedWord)) return;

    const current = inputs[key] || "";

    setInputs({
      ...inputs,
      [key]: current ? `${current} ${draggedWord}` : draggedWord,
    });
  };

  const questions = [
    {
      id: "q1",
      scramble: "w a n t / d o / a p p l e / y o u / a n ?",
      questionCorrect: "Do you want an apple",
      answerCorrect: "Yes I do",
      img: jello,
    },
    {
      id: "q2",
      scramble: "d o / i c e / c r e a m / w a n t / y o u ?",
      questionCorrect: "Do you want ice cream",
      answerCorrect: "No I don't I want a milkshake",
      img: present,
    },
  ];

  const checkAnswers = () => {
    if (showAnswers) return;
    // ❌ فحص إذا في input فاضي
    const hasEmptyInput = questions.some(
      (q) =>
        !inputs[`${q.id}_question`] || inputs[`${q.id}_question`].trim() === "",
    );

    if (hasEmptyInput) {
      ValidationAlert.info(
        "Oops!",
        "Please answer all the questions before checking.",
      );
      return;
    }

    let wrongTemp = {};
    let score = 0;
    const total = questions.length * 2;

    questions.forEach((q) => {
      if (inputs[`${q.id}_question`] !== q.questionCorrect) {
        wrongTemp[`${q.id}_question`] = true;
      } else {
        score++;
      }

      if (inputs[`${q.id}_answer`] !== q.answerCorrect) {
        wrongTemp[`${q.id}_answer`] = true;
      } else {
        score++;
      }
    });

    setWrong(wrongTemp);
    setShowAnswers(true);
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
      </span>
    </div>
  `;
    if (total === score) {
      return ValidationAlert.success(msg);
    } else if (score === 0) {
      return ValidationAlert.error(msg);
    } else {
      return ValidationAlert.warning(msg);
    }
  };

  // ⭐ Show Correct Answers
  const showCorrectAnswers = () => {
    let filled = {};

    questions.forEach((q) => {
      filled[`${q.id}_question`] = q.questionCorrect;
      filled[`${q.id}_answer`] = q.answerCorrect;
    });

    setInputs(filled);
    setWrong({});
    setShowAnswers(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "30px" }}
      >
        <div style={{ gap: "20px" }} className="div-forall">
          <h5 className="header-title-page8">
            <span className="mr-2">C</span> Drag and drop the words to make the
            sentences.
          </h5>
          {/* <Droppable droppableId="global-bank" direction="horizontal">
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
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {buildGlobalWordBank().map((word, i) => (
                  <Draggable
                    key={`global-${word}-${i}`}
                    draggableId={`global-${word}-${i}`}
                    index={i}
                    isDragDisabled={showAnswers}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "7px 14px",
                          border: "2px solid #2c5287",
                          borderRadius: "8px",
                          background: "white",
                          fontWeight: "bold",
                          cursor: "grab",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable> */}

          <div className="content-container-review10-p1-q3">
            {questions.map((q, index) => (
              <div key={q.id} className="section-one11-review10-p1-q3">
                <div style={{ display: "flex", width: "100%", height: "100%" }}>
                  <div className="input-container-review10-p1-q3">
                    <div style={{ display: "flex" }}>
                      <span className="num2">{index + 1}</span>
                      <input
                        readOnly
                        value={q.scramble}
                        className="answer-input-review10-p1-q3"
                      />
                    </div>
                    {/* 🔹 Word Bank خاص بالسؤال */}
                    <Droppable
                      droppableId={`bank-${q.id}`}
                      direction="horizontal"
                    >
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
                            marginBottom: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          {buildQuestionWordBank(q).map((word, i) => (
                            <Draggable
                              key={`${q.id}-${word}-${i}`}
                              draggableId={`${q.id}-${word}-${i}`}
                              index={i}
                              isDragDisabled={showAnswers}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    padding: "7px 14px",
                                    border: "2px solid #2c5287",
                                    borderRadius: "8px",
                                    background: "white",
                                    fontWeight: "bold",
                                    cursor: "grab",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {word}
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    {/* Unscramble input */}
                    <div style={{ position: "relative" }}>
                      <Droppable
                        droppableId={`${q.id}_question`}
                        isDropDisabled={showAnswers}
                      >
                        {(provided, snapshot) => (
                          <input
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            readOnly
                            value={inputs[`${q.id}_question`] || ""}
                            className={`answer-input33-review10-p1-q3 ${
                              snapshot.isDraggingOver ? "drag-over-cell" : ""
                            }`}
                          />
                        )}
                      </Droppable>

                      {wrong[`${q.id}_question`] && (
                        <span className="error-mark-input1">✕</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="content-input-review10-p1-q3">
                  {/* Scramble */}
                  <img
                    src={q.img}
                    className="p9-q1-img2"
                    style={{ height: "160px", width: "auto" }}
                  />
                  {/* Answer input */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <Droppable droppableId={`${q.id}_answer`}>
                      {(provided, snapshot) => (
                        <input
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          readOnly
                          value={inputs[`${q.id}_answer`] || ""}
                          className={`answer-input3-review10-p1-q3 ${
                            snapshot.isDraggingOver ? "drag-over-cell" : ""
                          }`}
                        />
                      )}
                    </Droppable>

                    {wrong[`${q.id}_answer`] && (
                      <span className="error-mark-input1">✕</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ⭐ Buttons */}
          <div className="action-buttons-container">
            <button
              className="try-again-button"
              onClick={() => {
                setAnswers([]);
                setInputs({});
                setWrong({});
                setWrongWords([]);
                setShowAnswers(false);
                setDisableInputs(false);
              }}
            >
              Start Again ↻
            </button>

            <button
              className="show-answer-btn swal-continue"
              onClick={showCorrectAnswers}
            >
              Show Answer
            </button>

            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Review10_Page1_Q3;
