import React, { useState, useEffect, useRef } from "react";
import page_5 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday5.jpg";
import "./Unit2_Page5.css";
import Unit2_Page5_Q1 from "./Unit2_Page5_Q1";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import Unit2_Page5_Q2 from "./Unit2_Page5_Q2";
import Unit2_Page5_Q3 from "./Unit2_Page5_Q3";
import Unit2_Page5_Q4 from "./Unit2_Page5_Q4";
const Unit2_Page5 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
   
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* <img src={page_5} /> */}

      <div
        className="click-icon-unit2-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 6 })}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>

      <div
        className="click-icon-unit2-page5-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 7 })}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>

      <div
        className="click-icon-unit2-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 8 })}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>

      <div
        className="click-icon-unit2-page5-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 9 })}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
    </div>
  );
};

export default Unit2_Page5;
