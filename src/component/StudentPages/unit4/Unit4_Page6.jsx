import page_6 from "../../../assets/unit4/imgs/Right 1 Unit 04 Wonderful Shapes and Colors6.jpg";
import "./Unit4_Page6.css";
import song from "../../../assets/unit4/sounds/U4P33Song.mp3";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";
import Unit4_Page6_Q2 from "./Unit4_Page6_Q2";
const Unit4_Page6 = ({ openPopup }) => {
  const captionsExample = [
    { start: 0, end: 4.09, text: "Page 33, Exercise F. Let's sing." },
    {
      start: 4.12,
      end: 11.02,
      text: "It's blue! It's blue! What is it? What is it?",
    },
    {
      start: 11.05,
      end: 17.07,
      text: "It's a blue boat!It's brown! It's brown!",
    },
    {
      start: 17.09,
      end: 22.02,
      text: " What is it? What is it? It's a brown cow!",
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
        className="click-icon-unit4-page6-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 35 })}
          style={{ overflow: "visible" }}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90"  className="svg-img"/>
        </svg>
      </div>

      <div
        className="headset-icon-CD-unit4-page6-1 hover:scale-110 transition"
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
                <AudioWithCaption src={song} captions={captionsExample} />
              </div>
            )
          }
          style={{ overflow: "visible" }}
        >
          <image href={audioBtn} x="0" y="0" width="90" height="90"  className="svg-img"/>
        </svg>
      </div>
    </div>
  );
};

export default Unit4_Page6;
