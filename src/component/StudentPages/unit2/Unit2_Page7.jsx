import React, { useState } from "react";
import page_7 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday7.jpg";
import "./Unit2_Page7.css";
import Unit2_Page7_Q2 from "./Unit2_Page7_Q2";
import Unit2_Page7_Q1 from "./Unit2_Page7_Q1";
import Unit2_Page7_Q3 from "./Unit2_Page7_Q3";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";

const Unit2_Page7 = ({ openPopup }) => {
  const [activePopup, setActivePopup] = useState(null);
  return (
    <div className="page1-img-wrapper"
   
          style={{ backgroundImage: `url(${page_7})` }}>
      {/* <img src={page_7} /> */}

      <div
        className="click-icon-unit2-page7-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", { startIndex: 12 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>

      <div
        className="click-icon-unit2-page7-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", { startIndex: 13 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="click-icon-unit2-page7-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
          openPopup("exercise", { startIndex: 14 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
    </div>
  );
};

export default Unit2_Page7;
