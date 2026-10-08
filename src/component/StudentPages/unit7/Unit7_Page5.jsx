import page_5 from "../../../assets/unit7/img/Right 1 Unit 07 What are Matter5.jpg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import "./Unit7_Page5.css";
import Unit7_Page5_Q1 from "./Unit7_Page5_Q1";
import Unit7_Page5_Q2 from "./Unit7_Page5_Q2";
import Unit7_Page5_Q3 from "./Unit7_Page5_Q3";
import Unit7_Page5_Q4 from "./Unit7_Page5_Q4";
const Unit7_Page5 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* <img src={page_5} /> */}
      <div
        className="click-icon-unit7-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 73 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>
      <div
        className="click-icon-unit7-page5-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 74 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>
      <div
        className="click-icon-unit7-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 75 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>

      <div
        className="click-icon-unit7-page5-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 76 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>
    </div>
  );
};

export default Unit7_Page5;
