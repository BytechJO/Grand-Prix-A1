import page_5 from "../../../assets/unit3/imgs3/right1-unit3-page5.jpg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Page 01/Right Video Button.svg";
import "./Unit3_Page5.css";
import Unit3_Page5_Q1 from "./Unit3_Page5_Q1";
import Unit3_Page5_Q2 from "./Unit3_Page5_Q2";
import Unit3_Page5_Q3 from "./Unit3_Page5_Q3";
import Unit3_Page5_Q4 from "./Unit3_Page5_Q4";
const Unit3_Page5 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* <img src={page_5} /> */}
      <div
        className="click-icon-unit3-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 25 })}
            style={{ overflow: "visible" }}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90"  className="svg-img" />
        </svg>
      </div>

      <div
        className="click-icon-unit3-page5-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 26 })}
            style={{ overflow: "visible" }}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90"  className="svg-img"/>
        </svg>
      </div>

      <div
        className="click-icon-unit3-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }} 
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 27 })}
            style={{ overflow: "visible" }}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90"  className="svg-img"/>
        </svg>
      </div>

      <div
        className="click-icon-unit3-page5-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 28 })}
        style={{ overflow: "visible" }}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90"  className="svg-img"/>
        </svg>
      </div>
    </div>
  );
};

export default Unit3_Page5;
