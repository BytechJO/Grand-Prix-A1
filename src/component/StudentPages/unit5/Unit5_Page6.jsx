import page_6 from "../../../assets/unit5/imgs/Right 1 Unit 05 Welcome to My Class6.jpg";
import "./Unit5_Page6.css";
import Unit5_Page6_Q1 from "./Unit5_Page6_Q1";
import Unit5_Page6_Q3 from "./Unit5_Page6_Q3";
import CD25_Pg27_Song_AdultLady from "../../../assets/unit5/sounds/U5P45Sing.mp3";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit5_Page6 = ({ openPopup }) => {
  const captionsExample = [
    { start: 0, end: 5.0, text: "Page 45, exercise G. Let's sing. " },
    {
      start: 5.03,
      end: 7.44,
      text: "This is my book, look at my book.",
    },
    { start: 7.47, end: 10.21, text: " This is your book, look at your book." },
    {
      start: 10.24,
      end: 16.11,
      text: " Is this your pen? Yes, it is. Look at your pen.",
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
        className="click-icon-unit5-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 53 })}
        >
          <image
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
            className="svg-img"
          />
        </svg>
      </div>
      <div
        className="click-icon-unit5-page6-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 54 })}
          style={{ overflow: "visible" }}
        >
          <image
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
            className="svg-img"
          />
        </svg>
      </div>

      <div
        className="headset-icon-CD-unit5-page6-1 hover:scale-110 transition"
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
                <AudioWithCaption
                  src={CD25_Pg27_Song_AdultLady}
                  captions={captionsExample}
                />
              </div>
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
            className="svg-img"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit5_Page6;
