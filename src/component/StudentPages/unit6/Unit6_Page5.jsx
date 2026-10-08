import page_5 from "../../../assets/unit6/imgs/Right 1 Unit 06 Can We Go to the Park5.jpg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import "./Unit6_Page5.css";
import Unit6_Page5_Q1 from "./Unit6_Page5_Q1";
import Unit6_Page5_Q2 from "./Unit6_Page5_Q2";
import CD24_Pg26_Instructions1_AdultLady from "../../../assets/unit3/sound3/CD24.Pg26_Instructions1_Adult Lady.mp3";
import Unit6_Page5_Q3 from "./Unit6_Page5_Q3";
import Unit6_Page5_Q4 from "./Unit6_Page5_Q4";
const Unit6_Page5 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* <img src={page_5} /> */}
      <div
        className="click-icon-unit6-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 55 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img" />
        </svg>
      </div>
      <div
        className="click-icon-unit6-page5-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 56 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>
      <div
        className="click-icon-unit6-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 57 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>

      <div
        className="click-icon-unit6-page5-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 58 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>
    </div>
  );
};

export default Unit6_Page5;
