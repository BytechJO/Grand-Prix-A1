import { useRef,useState} from "react";
import audioBtn from "../../assets/unit1/imgs/Page 01/Audio btn.svg";
import "./FlashCardViewer.css";
import AudioWithCaption from "../AudioWithCaption";
export default function FlashCardViewer({ card, openPopup }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const playSound = (soundPath) => {
    if (audioRef.current) {
      audioRef.current.src = soundPath;
      audioRef.current.play();

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };
 
  
  return (
    <div       className="page1-img-wrapper-flashcard"
      style={{ backgroundImage: `url(${card.img})` }}>
      {/* <img
        src={card.img}
        alt="flash"
        className="w-[350px] h-auto rounded-xl shadow-lg"
      /> */}

      {card.audio && (
        <div
          className="audio-btn-wrapper"
          onClick={() => playSound(card.audio)}
        >
          <svg width="22" height="22" viewBox="0 0 90 90">
            <image
              href={audioBtn}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
        </div>
      )}
      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
}
