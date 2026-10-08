import React, { useState, useRef, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa";

const ModernVocabularyComponent = ({
  backgroundImage,
  mainAudio,
  wordAudios,
  nums,
  vocabulary,
  markers,
  captions,
  hight
}) => {
  const mainAudioRef = useRef(null);
  const wordRefs = useRef(wordAudios.map(() => React.createRef()));

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showCaption, setShowCaption] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [forceRender, setForceRender] = useState(0);
  // =========================
  // Sync captions + words
  // =========================
  const updateSync = (time) => {
    if (!captions || captions.length === 0) return;

    const capIdx = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end,
    );
    setActiveIndex(capIdx !== -1 ? capIdx : null);

    const wordIdx = captions
      .slice(1)
      .findIndex((w) => time >= w.start && time <= w.end);
    setActiveIndex2(wordIdx !== -1 ? wordIdx : null);
  };

  // =========================
  // Play / Pause main audio
  // =========================
  const togglePlay = () => {
    const audio = mainAudioRef.current;
    if (!audio) return;

    // 🔥 وقف أصوات الكلمات
    wordRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // =========================
  // Play word audio
  // =========================
  const playWordAudio = (index) => {
    if (!mainAudioRef.current) return;

    mainAudioRef.current.pause();
    setIsPlaying(false);

    wordRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    const audio = wordRefs.current[index].current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setClickedIndex(index);

      audio.onended = () => {
        setClickedIndex(null);
      };
    }
  };

  // =========================
  // Auto scroll active caption
  // =========================
  useEffect(() => {
    if (activeIndex !== null) {
      const el = document.getElementById(`cap-${activeIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeIndex]);

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col items-center gap-[30px]">
      <div className="w-full bg-white p-5 rounded-[2rem] overflow-hidden border border-slate-100 flex flex-col lg:flex-row relative justify-center">
        {/* ================= AUDIO ================= */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full justify-center w-full">
            <div
              className="audio-popup-vocab-container"
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "0px 20px",
                position: "relative",
                alignItems: "center",
              }}
            >
              <div className="audio-popup-vocab">
                <div className="audio-inner player-ui">
                  <audio
                    ref={mainAudioRef}
                    src={mainAudio}
                    onTimeUpdate={(e) => {
                      const t = e.target.currentTime;
                      setCurrent(t);
                      updateSync(t);
                    }}
                    onLoadedMetadata={(e) => setDuration(e.target.duration)}
                    onEnded={(e) => {
                      e.target.currentTime = 0;
                      setCurrent(0);
                      setIsPlaying(false);
                      setActiveIndex(null);
                      setActiveIndex2(null);
                    }}
                  />

                  {/* time + slider */}
                  <div className="top-row">
                    <span className="audio-time">
                      {new Date(current * 1000).toISOString().substring(14, 19)}
                    </span>

                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={current}
                      className="audio-slider"
                      onChange={(e) => {
                        mainAudioRef.current.currentTime = e.target.value;
                      }}
                      style={{
                        background: `linear-gradient(to right, #430f68 ${
                          (current / duration) * 100
                        }%, #d9d9d9ff ${(current / duration) * 100}%)`,
                      }}
                    />

                    <span className="audio-time">
                      {new Date(duration * 1000)
                        .toISOString()
                        .substring(14, 19)}
                    </span>
                  </div>

                  {/* controls */}
                  <div className="bottom-row">
                    <div
                      className={`round-btn ${showCaption ? "active" : ""}`}
                      onClick={() => setShowCaption(!showCaption)}
                    >
                      <TbMessageCircle size={36} />
                    </div>

                    <button className="play-btn2" onClick={togglePlay}>
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>

                    <div className="relative">
                      <button
                        className={`round-btn ${showSettings ? "active" : ""}`}
                        onClick={() => setShowSettings(!showSettings)}
                      >
                        <IoMdSettings size={36} />
                      </button>

                      {showSettings && (
                        <div className="settings-popup">
                          <label>Volume</label>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={volume}
                            onChange={(e) => {
                              setVolume(e.target.value);
                              mainAudioRef.current.volume = e.target.value;
                            }}
                          />
                          <label
                            style={{ marginRight: "10px", marginTop: "10px" }}
                          >
                            Speed :
                          </label>
                          <select
                            value={playbackRate}
                            onChange={(e) => {
                              const rate = Number(e.target.value);
                              setPlaybackRate(rate);

                              if (mainAudioRef.current) {
                                mainAudioRef.current.playbackRate = rate;
                              }
                            }}
                          >
                            <option value="0.5">0.5x</option>
                            <option value="0.75">0.75x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.25x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================= IMAGE + CAPTION ================= */}
          <div className="p-4 md:p-3 flex flex-col items-center justify-center relative">
            {/* 🔥 NEW CAPTION STYLE */}
            <div
              className={`absolute -top-2 left-13 z-999999 w-[50%] max-w-md transition-all duration-500 ${
                showCaption
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
            >
              <div className="p-4 rounded-2xl border border-white shadow-lg text-left bg-white/90 backdrop-blur max-h-[200px] overflow-y-auto">
                {captions.map((cap, i) => (
                  <p
                    key={i}
                    id={`cap-${i}`}
                    className={`transition-all duration-300 ${
                      activeIndex === i
                        ? "text-purple-900 font-bold scale-105"
                        : "text-gray-400"
                    }`}
                  >
                    {cap.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative rounded-[1.5rem] overflow-hidden border-[6px] border-white group">
              <img
                src={backgroundImage}
                alt="scene"
                className="w-full h-auto object-contain max-h-[70vh]"
              />

              {markers.map((marker, i) => (
                <div
                  key={marker.id}
                  className={`absolute cursor-pointer transition-all duration-500 ${
                    activeIndex2 === i || clickedIndex === i
                      ? "scale-150 z-10 brightness-110"
                      : "hover:scale-110"
                  }`}
                  style={{
                    top: marker.top,
                    left: marker.left,
                    // width: "30px",
                    // height: "30px",
                  }}
                  onClick={() => playWordAudio(i)}
                >
                  <img
                    src={nums[i]}
                    alt={`num-${i + 1}`}
                    className="w-full h-full"
                    style={{ height: "22px" }}
                  />

                  {(activeIndex2 === i || clickedIndex === i) && (
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-40 -z-10"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* tip */}
          <div className="rounded-[1.5rem] w-full">
            <p className="text-red-700">
              💡 Tip: Click on the numbers or words to hear the pronunciation!
            </p>
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className={`w-full lg:w-80 bg-white p-6 lg:border-l border-slate-100 flex flex-col justify-center h-[${hight}vh]`}>
          <h2 className="text-2xl font-black mb-6">VOCABULARY</h2>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {vocabulary.map((word, i) => (
              <button
                key={i}
                onClick={() => playWordAudio(i)}
                className={`flex items-center p-2 rounded-2xl transition ${
                  activeIndex2 === i || clickedIndex === i
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50"
                }`}
              >
                <span className="mr-3">{i + 1}</span>
                <span>{word}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* hidden audios */}
      {wordAudios.map((src, i) => (
        <audio key={i} ref={wordRefs.current[i]} src={src} />
      ))}
    </div>
  );
};

export default ModernVocabularyComponent;
