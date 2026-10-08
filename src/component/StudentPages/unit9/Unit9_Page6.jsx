import page_6 from "../../../assets/unit9/imgs/Right 1 Unit 09 A Day on the Farm6.png";
import "./Unit9_Page6.css";

import CD25_Pg27_Song_AdultLady from "../../../assets/unit9/sound/cd74pg81-song-adult-lady_stCYa8RR.mp3";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit9_Page6 = ({ openPopup }) => {
const captionsExample = [
  {
    start: 0.34,
    end: 4.239,
    text: "Page 81, exercise F. Let's sing.",
  },
  {
    start: 5.279,
    end: 6.019,
    text: "I like cows.",
  },
  {
    start: 6.119,
    end: 7.079,
    text: "How many cows are there?",
  },
  {
    start: 7.379,
    end: 9.319,
    text: "There are seven cows.",
  },
  {
    start: 9.639,
    end: 10.579,
    text: "He likes horses.",
  },
  {
    start: 10.719,
    end: 12.039,
    text: "How many horses are there?",
  },
  {
    start: 12.42,
    end: 14.639,
    text: "There are four horses.",
  },
  {
    start: 15.38,
    end: 16.479,
    text: "We like them all.",
  },
  {
    start: 17.02,
    end: 18.02,
    text: "What do you like?",
  },
];

  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_6})` }}
    >
      {/* <img src={page_6} /> */}

      <div
        className="click-icon-unit9-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
           style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 102 })}
        >
         <image
                     href={arrowBtn}
                     className="svg-img"
                     x="0"
                     y="0"
                     width="90"
                     height="90"
                   />
        </svg>
      </div>
      <div
        className="click-icon-unit9-page6-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 103 })}
           style={{ overflow: "visible" }}
        >
          <image
                      href={arrowBtn}
                      className="svg-img"
                      x="0"
                      y="0"
                      width="90"
                      height="90"
                    />
        </svg>
      </div>

      <div
        className="headset-icon-CD-unit9-page6-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
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
                <AudioWithCaption src={CD25_Pg27_Song_AdultLady} captions={captionsExample} />
              </div>
            )
          }
           style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={audioBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
    </div>
  );
};

export default Unit9_Page6;
