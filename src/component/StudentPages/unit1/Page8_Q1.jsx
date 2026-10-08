import React, { useState, useRef, useEffect } from "react";
import CD6_Pg8_Instruction1_AdultLady from "../../../assets/unit1/sounds/pg8-instruction1-all.mp3";
import Pg8_1_1_AdultLady from "../../../assets/unit1/sounds/Pg8_1.1_Adult Lady.mp3";
import Pg8_1_2_AdultLady from "../../../assets/unit1/sounds/Pg8_1.2_Adult Lady.mp3";
import Pg8_1_3_AdultLady from "../../../assets/unit1/sounds/Pg8_1.3_Adult Lady.mp3";
import Pg8_1_4_AdultLady from "../../../assets/unit1/sounds/Pg8_1.4_Adult Lady.mp3";
import deer from "../../../assets/unit1/imgs/deer flip.svg";
import duck from "../../../assets/unit1/imgs/duck.svg";
import taxi from "../../../assets/unit1/imgs/taxi_1.svg";
import tiger from "../../../assets/unit1/imgs/tiger.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import ValidationAlert from "../../Popup/ValidationAlert";

const Page8_Q1 = () => {
  const clickAudioRef = useRef(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAutoAnswer, setIsAutoAnswer] = useState(false);
  const data = [
    {
      word: "deer",
      missing: "d",
      sound: Pg8_1_4_AdultLady,
      src: deer,
      num: "4",
    },
    {
      word: "duck",
      missing: "d",
      sound: Pg8_1_3_AdultLady,
      src: duck,
      num: "3",
    },
    {
      word: "tiger",
      missing: "t",
      sound: Pg8_1_1_AdultLady,
      src: tiger,
      num: "1",
    },
    {
      word: "taxi",
      missing: "t",
      sound: Pg8_1_2_AdultLady,
      src: taxi,
      num: "2",
    },
  ];

  const displayOrder = [2, 3, 1, 0]; // ترتيب الكلمات

  const [answers, setAnswers] = useState({
    letters: Array(data.length).fill(null), // لكل كلمة حرف
  });

  const [wrongLetters, setWrongLetters] = useState(data.map(() => false));

  const stopAtSecond = 9;

  const lettersBank = [
    { id: "l-d", value: "d" },
    { id: "l-t", value: "t" },
  ];

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 4.23,
      text: "Page 8. Right Activities. Exercise A, number 1. ",
    },
    {
      start: 4.25,
      end: 8.28,
      text: "Listen and write the missing letters. Number the pictures.  ",
    },
    { start: 8.3, end: 11.05, text: "1-tiger." },
    { start: 11.07, end: 13.12, text: "2-taxi." },
    { start: 13.14, end: 15.14, text: "3-duck." },
    { start: 15.16, end: 17.13, text: "4-deer." },
  ];

  const onDragEnd = (result) => {
    if (!result.destination || showAnswer) return;

    const { draggableId, destination } = result;

    // 1) Letter drop zones
    if (
      draggableId.startsWith("l-") &&
      destination.droppableId.startsWith("letter-drop-")
    ) {
      const index = Number(destination.droppableId.replace("letter-drop-", ""));
      const value = draggableId.replace("l-", ""); // d أو t

      setAnswers((prev) => {
        const letters = [...prev.letters];
        letters[index] = value;
        return { ...prev, letters };
      });

      setWrongLetters(data.map(() => false));
      return;
    }

    // 2) Number drop zones
  };

  const reset = () => {
    setAnswers({
      letters: Array(data.length).fill(null),
    });

    setWrongLetters(data.map(() => false));

    setShowAnswer(false);
    setIsAutoAnswer(false);
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    // 1️⃣ فحص الفراغ
    if (answers.letters.some((v) => !v)) {
      ValidationAlert.info(
        "Oops!",
        "Please complete all answers before checking.",
      );
      return;
    }

    let correctLetters = 0;
    let correctNumbers = 0;

    // 2️⃣ الحساب
    data.forEach((item, i) => {
      const pickedLetter = answers.letters[i];

      if (pickedLetter === item.missing) correctLetters++;
    });

    const totalPoints = data.length;
    const score = correctLetters;

    // 3️⃣ تحديد الغلط
    const letterWrongs = data.map(
      (item, i) => answers.letters[i] !== item.missing,
    );

    setWrongLetters(letterWrongs);

    setShowAnswer(true);

    // 4️⃣ الرسالة
    const color =
      score === totalPoints ? "green" : score === 0 ? "red" : "orange";

    const scoreMessage = `
    <div style="font-size: 20px; margin-top: 10px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${totalPoints}
      </span>
    </div>
  `;

    if (score === totalPoints) ValidationAlert.success(scoreMessage);
    else if (score === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="page8-wrapper" style={{ padding: "30px" }}>
        <div
          className="div-forall"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            position: "relative",
            gap: "30px",
      
          }}
        >
          <header className="header-title-page8">
            <span className="ex-A">A</span>{" "}
            <span className="number-of-q">1</span> Listen and drag the missing letter. the missing
            letters. Number the pictures.
          </header>

          <audio ref={clickAudioRef} style={{ display: "none" }} />
          <QuestionAudioPlayer
            src={CD6_Pg8_Instruction1_AdultLady}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />
          <Droppable droppableId="letters-bank" direction="horizontal">
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
                  width: "100%",
                  // margin: "10px 0",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {lettersBank.map((l, i) => (
                  <Draggable
                    key={l.id}
                    draggableId={l.id}
                    index={i}
                    isDragDisabled={showAnswer}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bank-item"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          border: "2px solid #2c5287",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          background: "white",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {l.value}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* ✅ الكلمات */}
          <div
            className="div-input"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
              // marginLeft:"40px",
              width: "100%",
            }}
          >
            {displayOrder.map((dataIndex, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "40px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <span className="number-of-q">{index + 1}</span>
                  <Droppable droppableId={`letter-drop-${dataIndex}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`char-drop ${
                          snapshot.isDraggingOver ? "drag-over-cell" : ""
                        }`}
                        style={{
                          width: "40px",
                          height: "45px",
                          borderBottom: "2px solid #2c5287",
                          // borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "30px",
                          background: snapshot.isDraggingOver
                            ? "#c4e5fcff"
                            : "white",
                          color: isAutoAnswer ? "red" : "black",
                        }}
                      >
                        {answers.letters[dataIndex] || ""}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>

                  <span
                    style={{
                      textAlign: "center",
                      fontSize: "25px",
                    }}
                  >
                    {data[dataIndex].word.slice(1)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: "column",
                  }}
                >
                  <img
                    key={data[dataIndex].num}
                    src={data[dataIndex].src}
                    className="exercise-image"
                    // onClick={() => playSound(item.sound)}
                  />
                </div>
                {wrongLetters[dataIndex] && (
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "0%",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "2px solid white",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>

          <button
            className="show-answer-btn swal-continue"
            onClick={() => {
              setShowAnswer(true);
              setIsAutoAnswer(true);

              setAnswers({
                letters: data.map((item) => item.missing),

                numbers: data.map((item) => `n-${item.num}`),
              });

              setWrongLetters(data.map(() => false));
            }}
          >
            Show Answer
          </button>

          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Page8_Q1;
