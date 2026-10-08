import page_6 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match6.jpg";
import "./Unit8_Page6.css";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import song from "../../../assets/unit8/sound/CD65.Pg69_Song_Adult Lady.mp3";
import AudioWithCaption from "../../AudioWithCaption";
const Unit8_Page6 = ({ openPopup }) => {
  const captionsExample = [
    { start: 0, end: 5.00, text: "Page 69. Exercise G, let's sing. " },
    {
      start: 5.03,
      end: 10.28,
      text: "What is this? What is this? Hey, it's my arm.",
    },
    { start: 10.30, end: 16.09, text: "Hey, it's my arm. I touch my arm. I touch my arm." },
    {
      start: 16.12,
      end: 20.02,
      text: " Touch your arm too. Touch your arm too.",
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
        className="click-icon-unit8-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 83 })}
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
        className="click-icon-unit8-page6-3  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 84 })}
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
        className="headset-icon-CD-unit8-page6-1 hover:scale-110 transition"
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

export default Unit8_Page6;
