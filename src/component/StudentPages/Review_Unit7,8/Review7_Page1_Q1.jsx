import React, { useState } from "react";
import "./Review7_Page1_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import imgDown1 from "../../../assets/unit8/imgs/U8P70EXEA-01.svg";
import imgAcross1 from "../../../assets/unit8/imgs/U8P70EXEA-02.svg";
import imgDown2 from "../../../assets/unit8/imgs/U8P70EXEA-03.svg";
import imgAcross2 from "../../../assets/unit8/imgs/U8P70EXEA-04.svg";
import imgDown3 from "../../../assets/unit8/imgs/U8P70EXEA-05.svg";
import imgAcross3 from "../../../assets/unit8/imgs/U8P70EXEA-06.svg";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const crosswordStructure = [
  // Row 1 (10 columns)
  ["B", "B", "B", "B", "B", "B", "B", "B", "B", "1"],

  // Row 2 (10 columns)
  ["B", "B", "2", "W", "W", "W", "W", "B", "B", "W"],

  // Row 3 (10 columns)
  ["B", "B", "W", "B", "B", "B", "B", "B", "B", "W"],

  // Row 4 (10 columns)
  ["B", "B", "W", "B", "3", "W", "W", "W", "W", "W"],

  // Row 5 (5 columns)
  ["B", "B", "W", "B", "W"],

  // Row 6 (5 columns)
  ["4", "W", "W", "W", "W"],

  // Row 7 (3 columns)
  ["B", "B", "W"],
];

const solution = [
  { num: 1, direction: "Down", answer: "cold" },
  { num: 2, direction: "Down", answer: "hungry" },
  { num: 3, direction: "Down", answer: "sad" },
  { num: 2, direction: "Across", answer: "happy" },
  { num: 3, direction: "Across", answer: "scared" },
  { num: 4, direction: "Across", answer: "bored" },
];
export default function Review7_Page1_Q1() {
  const [userGrid, setUserGrid] = useState(
    crosswordStructure.map((row) =>
      row.map((cell) => (cell === "W" || /[1-9]/.test(cell) ? "" : null)),
    ),
  );
  const [wrongCells, setWrongCells] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  const findCellPosition = (num) => {
    for (let r = 0; r < crosswordStructure.length; r++) {
      for (let c = 0; c < crosswordStructure[r].length; c++) {
        if (crosswordStructure[r][c] === String(num)) {
          return { r, c };
        }
      }
    }
    return null;
  };
  const readWord = (startR, startC, direction, length) => {
    let word = "";

    for (let i = 0; i < length; i++) {
      const r = direction === "Down" ? startR + i : startR;
      const c = direction === "Across" ? startC + i : startC;

      if (!userGrid[r] || !userGrid[r][c]) return null;
      word += userGrid[r][c];
    }

    return word;
  };

  const checkAnswers = () => {
    if (showAnswers) return;
    let totalInputCells = 0;
    let hasEmptyCell = false;

    // 1) حساب عدد الخلايا التي يجب تعبئتها
    for (let r = 0; r < crosswordStructure.length; r++) {
      for (let c = 0; c < crosswordStructure[r].length; c++) {
        const cell = crosswordStructure[r][c];

        if (cell === "W" || /[1-9]/.test(cell)) {
          totalInputCells++;

          if (!userGrid[r][c] || userGrid[r][c].trim() === "") {
            hasEmptyCell = true;
          }
        }
      }
    }

    // 2) لو في خانة فاضية → alert
    if (hasEmptyCell) {
      return ValidationAlert.info(
        `<div style="font-size:20px; text-align:center;">Please fill all cells before checking.</div>`,
      );
    }

    // ⭐ NEW — استخدام Set لمنع التكرار
    const correctSet = new Set();
    const wrongSet = new Set();

    // 3) التحقق من كل الكلمات
    solution.forEach((item) => {
      const { num, direction, answer } = item;
      const start = findCellPosition(num);

      if (start) {
        for (let i = 0; i < answer.length; i++) {
          const r = direction === "Down" ? start.r + i : start.r;
          const c = direction === "Across" ? start.c + i : start.c;
          const key = `${r}-${c}`;

          if (userGrid[r] && userGrid[r][c] === answer[i]) {
            correctSet.add(key); // يتم تسجيلها مرة واحدة فقط
          } else {
            wrongSet.add(key); // يتم تسجيلها مرة واحدة فقط
          }
        }
      }
    });

    // 4) تحديث الخلايا الخاطئة
    setWrongCells(Array.from(wrongSet));
    setShowAnswers(true);
    // عدد الخلايا الصحيحة الحقيقي
    const correctFilledCells = correctSet.size;

    // 5) اختيار اللون
    let color =
      correctFilledCells === totalInputCells
        ? "green"
        : correctFilledCells === 0
          ? "red"
          : "orange";

    const scoreMessage = `
    <div style="font-size: 20px; text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctFilledCells} / ${totalInputCells}
      </span>
    </div>
  `;

    // 6) عرض النتيجة
    if (correctFilledCells === totalInputCells) {
      ValidationAlert.success(scoreMessage);
    } else if (correctFilledCells === 0) {
      ValidationAlert.error(scoreMessage);
    } else {
      ValidationAlert.warning(scoreMessage);
    }
  };

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination || showAnswers) return;

    const letter = draggableId.replace("letter-", "");
    const [r, c] = destination.droppableId.split("-").map(Number);

    const updated = [...userGrid];
    updated[r][c] = letter;
    setUserGrid(updated);
  };

  const handleShowAnswers = () => {
    const updated = [...userGrid];

    solution.forEach((item) => {
      const { num, direction, answer } = item;
      const start = findCellPosition(num);

      if (start) {
        for (let i = 0; i < answer.length; i++) {
          const r = direction === "Down" ? start.r + i : start.r;
          const c = direction === "Across" ? start.c + i : start.c;

          updated[r][c] = answer[i]; // اكتب الإجابة الصحيحة
        }
      }
    });

    setUserGrid(updated);
    setShowAnswers(true);
    setWrongCells([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          className="div-forall mb-10"
          style={{
            gap: "20px",
          }}
        >
          <h3 className="header-title-page8">
            <span className="mr-2">A</span> Look and complete the puzzle.
          </h3>

          <Droppable droppableId="letters-bank" isDropDisabled>
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
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {letters.map((l, index) => (
                  <Draggable
                    key={l + index}
                    draggableId={`letter-${l}`}
                    index={index}
                    isDragDisabled={showAnswers}
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
                          cursor: "grab",
                          fontSize: "18px",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {l}
                      </span>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* ===================== الصور ===================== */}
          <div className="grid-container-review7-p1-q1">
            <div className="puzzle-images-box-review7-p1-q1">
              <div className="column-box-review7-p1-q1">
                <h4 className="label">Down</h4>

                <div className="img-item-review7-p1-q1">
                  <span className="num">1</span>
                  <img src={imgDown1} alt="down1" />
                </div>

                <div className="img-item-review7-p1-q1">
                  <span className="num">2</span>
                  <img src={imgDown2} alt="down2" />
                </div>

                <div className="img-item-review7-p1-q1">
                  <span className="num">3</span>
                  <img src={imgDown3} alt="down3" />
                </div>
              </div>

              <div className="column-box-review7-p1-q1">
                <h4 className="label">Across</h4>

                <div className="img-item-review7-p1-q1">
                  <span className="num">2</span>
                  <img src={imgAcross1} alt="across2" />
                </div>

                <div className="img-item-review7-p1-q1">
                  <span className="num">3</span>
                  <img src={imgAcross2} alt="across3" />
                </div>

                <div className="img-item-review7-p1-q1">
                  <span className="num">4</span>
                  <img src={imgAcross3} alt="across4" />
                </div>
              </div>
            </div>

            <div className="crossword-grid">
              {crosswordStructure.map((row, r) => (
                <div key={r} className="row-review7-p1-q1">
                  {row.map((cell, c) => {
                    const isBlock = cell === "B";
                    const isNumber = /[1-9]/.test(cell);

                    return (
                      <div
                        key={r + "-" + c}
                        className={`cell2 ${isBlock ? "block" : "white"}`}
                      >
                        {/* رقم + input */}
                        {isNumber && (
                          <>
                            <span className="number">{cell}</span>
                            <Droppable
                              droppableId={`${r}-${c}`}
                              isDropDisabled={showAnswers}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className={`letter22 ${snapshot.isDraggingOver ? "drag-over-cell" : ""}`}
                                >
                                  {userGrid[r][c] && (
                                    <span className="filled-letter">
                                      {userGrid[r][c]}
                                    </span>
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </>
                        )}
                        {/* خانة بيضاء أو رقم */}
                        {!isBlock && !isNumber && (
                          <>
                            {isNumber && <span className="number">{cell}</span>}

                            <Droppable
                              droppableId={`${r}-${c}`}
                              isDropDisabled={showAnswers}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className={`letter22 ${snapshot.isDraggingOver ? "drag-over-cell" : ""}`}
                                >
                                  {userGrid[r][c] && (
                                    <span className="filled-letter">
                                      {userGrid[r][c]}
                                    </span>
                                  )}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </>
                        )}

                        {/* ❌ دائرة فوق اليمين للخطأ */}
                        {!isBlock && wrongCells.includes(`${r}-${c}`) && (
                          <span className="error-badge-review7-p1-q1">✕</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="action-buttons-container">
          <button
            className="try-again-button"
            onClick={() => {
              setUserGrid(
                crosswordStructure.map((row) =>
                  row.map((cell) =>
                    cell === "W" || /[1-9]/.test(cell) ? "" : null,
                  ),
                ),
              );
              setWrongCells([]);
            }}
          >
            Start Again ↻
          </button>
          {/* ⭐⭐⭐ NEW — زر Show Answer */}
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
    </DragDropContext>
  );
}
