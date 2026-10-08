import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import "./AudioWithCaption.css";

const AudioWithCaption = ({ src, captions, onCaptionChange }) => {
  const audioRef = useRef(null);
  const settingsRef = useRef(null);
  const captionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const changeSpeed = () => {
    const currentIndex = speeds.indexOf(playbackRate);
    const nextRate = speeds[(currentIndex + 1) % speeds.length];

    setPlaybackRate(nextRate);
    audioRef.current.playbackRate = nextRate;
  };
  // تحديث الهايلايت حسب الوقت
  const updateCaption = (time) => {
    if (!captions || captions.length === 0) return;

    const index = captions.findIndex(
      (cap) => time >= cap.start && time <= cap.end,
    );

    setActiveIndex(index);
    if (onCaptionChange) onCaptionChange(index);
  };

  // تشغيل/إيقاف
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      if (captions) setShowCaption(true);
    }
    setIsPlaying(!isPlaying);
  };

  // إغلاق settings عند الضغط خارج
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (activeIndex === -1) return;

    const activeElement = document.getElementById(`caption-${activeIndex}`);

    if (activeElement) {
      activeElement.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className="audio-popup">
      {/* مؤشر السرعة */}
      <div className="audio-inner player-ui">
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={(e) => {
            setCurrent(e.target.currentTime);
            updateCaption(e.target.currentTime);
          }}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => {
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setActiveIndex(-1); // يرجّع الهايلايت لأول سطر
          }}
        />
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
          {captions && captions.length > 0 ? (
            <div
              className={`round-btn ${showCaption ? "active" : ""}`}
              onClick={() => setShowCaption(!showCaption)}
            >
              <TbMessageCircle size={40} />
            </div>
          ) : (
            <div></div>
          )}

          {/* Play */}
          <button className="play-btn2" onClick={togglePlay}>
            {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
          </button>

          {/* Settings */}
          <div className="settings-wrapper" ref={settingsRef}>
            <button
              className={`round-btn ${showSettings ? "active" : ""}`}
              onClick={() => setShowSettings(!showSettings)}
            >
              <IoMdSettings size={40} />
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

                <label style={{ marginRight:"10px",marginTop: "10px" }}>Speed :</label>
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
        {/* الكابشن تحت الأزرار */}
        {captions && captions.length > 0 && showCaption && (
          <>
            <h3 style={{ fontSize: "20px", fontWeight: "500" }}>
              Text to speech :
            </h3>
            <div className="caption-box" ref={captionRef}>
              {captions.map((cap, i) => (
                <p
                  key={i}
                  id={`caption-${i}`}
                  className={i === activeIndex ? "active-caption" : ""}
                >
                  {cap.text}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioWithCaption;
