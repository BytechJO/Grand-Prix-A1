import React, { useState } from "react";
import page_8 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday8.jpg";
import "./Unit2_Page8.css";
import Unit2_Page8_Q1 from "./Unit2_Page8_Q1";
import Unit2_Page8_Q3 from "./Unit2_Page8_Q3";
import Unit2_Page8_Q2 from "./Unit2_Page8_Q2";

import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";

const Unit2_Page8 = ({ openPopup }) => {
  return (
    <div className="page1-img-wrapper"
      
          style={{ backgroundImage: `url(${page_8})` }}>
      {/* <img src={page_8} /> */}
      <div
        className="click-icon-unit2-page8-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", { startIndex: 15 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="click-icon-unit2-page8-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
           openPopup("exercise", { startIndex: 16 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="click-icon-unit2-page8-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
          openPopup("exercise", { startIndex: 17 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
    </div>
  );
};

export default Unit2_Page8;
