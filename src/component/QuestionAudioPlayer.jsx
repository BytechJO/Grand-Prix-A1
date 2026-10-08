import { useState, useEffect, useRef } from "react";
import { TbMessageCircle } from "react-icons/tb";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

export default function QuestionAudioPlayer({
  src,
  captions = [],
  stopAtSecond = null,
}) {
  const clickAudioRef = useRef(null);
  const audioRef = useRef(null);

  const [paused, setPaused] = useState(false);
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
  const [playbackRate, setPlaybackRate] = useState(1);
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const progress = duration ? (current / duration) * 100 : 0;
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

    let interval;

    if (stopAtSecond) {
      interval = setInterval(() => {
        if (audio.currentTime >= stopAtSecond) {
          audio.pause();
          setPaused(true);
          setIsPlaying(false);
          setShowContinue(true);
          clearInterval(interval);
        }
      }, 100);
    }

    const handleEnded = () => {
      audio.currentTime = 0;
      setIsPlaying(false);
      setPaused(false);
      setActiveIndex(null);
      setShowContinue(true);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      if (interval) clearInterval(interval);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setForceRender((prev) => prev + 1);
    }, 1000);

    if (activeIndex === -1 || activeIndex === null) return;

    const el = document.getElementById(`caption-${activeIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return () => clearInterval(timer);
  }, [activeIndex]);

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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        className="audio-popup-read"
        style={{
          width: "50%",
          marginTop: "0px",
        }}
      >
        <div className="audio-inner player-ui">
          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={(e) => {
              const time = e.target.currentTime;
              setCurrent(time);
              updateCaption(time);
            }}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
          ></audio>
          {/* Play / Pause */}
          {/* الوقت - السلايدر - الوقت */}
          <div className="top-row">
            <span className="audio-time">
              {new Date(current * 1000).toISOString().substring(14, 19)}
            </span>

            <input
              type="range"
              className="audio-slider"
              min="0"
              max={duration}
              value={current}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                updateCaption(Number(e.target.value));
              }}
              style={{
                background: `linear-gradient(to right, #430f68 ${
                  (current / duration) * 100
                }%, #d9d9d9ff ${(current / duration) * 100}%)`,
              }}
            />

            <span className="audio-time">
              {new Date(duration * 1000).toISOString().substring(14, 19)}
            </span>
          </div>
          {/* الأزرار 3 أزرار بنفس السطر */}
          <div className="bottom-row">
            {/* فقاعة */}
            <div
              className={`round-btn ${showCaption ? "active" : ""}`}
              style={{ position: "relative" }}
              onClick={() => setShowCaption(!showCaption)}
            >
              <TbMessageCircle size={36} />
              <div
                className={`caption-inPopup ${showCaption ? "show" : ""}`}
                style={{ top: "100%", left: "10%" }}
              >
                {captions.map((cap, i) => (
                  <p
                    key={i}
                    id={`caption-${i}`}
                    className={`caption-inPopup-line2 ${
                      activeIndex === i ? "active" : ""
                    }`}
                  >
                    {cap.text}
                  </p>
                ))}
              </div>
            </div>

            {/* Play */}
            <button className="play-btn2" onClick={togglePlay}>
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>

            {/* Settings */}
            <div className="settings-wrapper" ref={settingsRef}>
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
                      audioRef.current.volume = e.target.value;
                    }}
                  />

                  <label style={{ marginRight: "10px", marginTop: "10px" }}>
                    Speed :
                  </label>
                  <select
                    value={playbackRate}
                    onChange={(e) => {
                      const rate = Number(e.target.value);
                      setPlaybackRate(rate);
                      audioRef.current.playbackRate = rate;
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
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
