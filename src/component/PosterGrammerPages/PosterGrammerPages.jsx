import { useRef } from "react";
import audioBtn from "../../assets/unit1/imgs/Page 01/Audio btn.svg";
import AudioWithCaption from "../AudioWithCaption";
import "./PosterGrammerPages.css";
export default function PosterViewer({ poster, openPopup }) {
  return (
    <div className="poster-grammar-wrapper">
      {/* 🔥 الصورة العريضة */}
      <img
        src={poster.img}
        alt="poster"
        className="poster-grammar-img max-w-full max-h-[80vh] object-fill rounded-xl shadow-lg"
      />

      {/* 🔊 زر الصوت داخل popup */}
      {poster.audio && (
        <div
          className="audio-btn-poster hover:scale-110 transition"
          onClick={() =>
            openPopup(
              "audio",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <AudioWithCaption
                  src={poster.audio}
                  captions={poster.captions}
                />
              </div>
            )
          }
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
    </div>
  );
}
