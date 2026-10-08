import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit2_Page10_Q3.css";
import sound1 from "../../../assets/unit1/sounds/P19QF.mp3";
import ball from "../../../assets/img_unit2/imgs/Football.jpg";
import bag from "../../../assets/img_unit2/imgs/bag.jpg";
import pants from "../../../assets/img_unit2/imgs/pants.jpg";
import panda from "../../../assets/img_unit2/imgs/panda.jpg";
import paper from "../../../assets/img_unit2/imgs/paper.jpg";
import baby from "../../../assets/img_unit2/imgs/baby.jpg";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit2_Page10_Q3 = () => {
  const audioRef = useRef(null);
  const stopAtSecond = 4.2;
  const [showAnswer, setShowAnswer] = useState(false);

  // إعدادات الصوت
  const [paused, setPaused] = useState(false);
  // إعدادات الصوت
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const settingsRef = useRef(null);
  const [forceRender, setForceRender] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0, end: 4.19, text: "Page 19, Exercise f. Listen and circle." },
    { start: 4.21, end: 9.01, text: "1-ball, baby, bag. " },
    { start: 9.03, end: 14.03, text: "2-pants, paper, panda- " },
  ];

  // ================================
  // ✔ Update caption highlight
  // ================================
  const updateCaption = (time) => {
    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end,
    );
    setActiveIndex(index);
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    const interval = setInterval(() => {
      if (audio.currentTime >= stopAtSecond) {
        audio.pause();
        setPaused(true);
        setIsPlaying(false);
        setShowContinue(true);
        clearInterval(interval);
      }
    }, 100);

    // عند انتهاء الأوديو يرجع يبطل أنيميشن + يظهر Continue
    const handleEnded = () => {
      const audio = audioRef.current;
      audio.currentTime = 0; // ← يرجع للبداية
      setIsPlaying(false);
      setPaused(false);
      setActiveIndex(null);
      setShowContinue(true);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000); // كل ثانية

    if (activeIndex === -1 || activeIndex === null) return;

    const el = document.getElementById(`caption-${activeIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return () => clearInterval(timer);
  }, [activeIndex]);
  const questions = [
    {
      id: 1,
      images: [ball, baby, bag],
      correct: "b",
      options: ["b", "p"],
    },
    {
      id: 2,
      images: [pants, paper, panda],
      correct: "p",
      options: ["b", "p"],
    },
  ];

  const [answers, setAnswers] = useState({});
  //   const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const handleSelect = (qId, option) => {
    if (showResult || showAnswer) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
    setShowResult(false);
  };

  const checkAnswers = () => {
    if (showAnswer || showResult) return;
    // 🔸 تحقق إذا الطالب جاوب على الكل
    if (Object.keys(answers).length < questions.length) {
      ValidationAlert.info("Oops!", "Please answer all items first.");
      return;
    }

    // 🔹 احسب عدد الإجابات الصح
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id]?.toLowerCase() === q.correct.toLowerCase()) {
        correctCount++;
      }
    });

    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
    setShowResult(true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPaused(false);
      setIsPlaying(true);
    } else {
      audio.pause();
      setPaused(true);
      setIsPlaying(false);
    }
  };
  const handleShowAnswer = () => {
    let correctObj = {};
    questions.forEach((q) => {
      correctObj[q.id] = q.correct; // نعبّي الإجابات الصحيحة مباشرة
    });

    setAnswers(correctObj);
    setShowAnswer(true);
    setShowResult(false);
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
     
          <h5 className="header-title-page8">
            <span className="mr-2">F</span> Listen and tap or click the starting
            letter.
          </h5>
          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={stopAtSecond}
          />

          <div className="questions-grid">
            {questions.map((q) => (
              <div key={q.id} className="question-box">
                <div className="question-number">{q.id}</div>

                <div className="images-row">
                  {q.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      className="question-img-unit2-p10-q3"
                    />
                  ))}
                </div>

                <div className="options-row">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt;
                    const isWrong =
                      showResult &&
                      isSelected &&
                      answers[q.id]?.toLowerCase() !== q.correct.toLowerCase();
                    const isCorrectShow = showAnswer;

                    return (
                      <span
                        key={opt}
                        className={`option-letter  ${
                          isSelected ? "selected3" : ""
                        } ${isCorrectShow ? "correct-answer" : ""}`}
                        onClick={() => !showAnswer && handleSelect(q.id, opt)}
                      >
                        {opt}
                        {isWrong && <span className="wrong-x10-3">✕</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
   
      <div className="action-buttons-container">
        <button
          onClick={() => {
            setAnswers({});
            setShowResult(false);
            setShowAnswer(false);
          }}
          className="try-again-button"
        >
          Start Again ↻
        </button>
        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit2_Page10_Q3;
