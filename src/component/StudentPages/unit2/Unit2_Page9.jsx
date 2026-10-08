import React, { useState } from "react";
import page_9 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday9.jpg";
import "./Unit2_Page9.css";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import Unit2_Page9_Q1 from "./Unit2_Page9_Q1";
import Unit2_Page9_Q2 from "./Unit2_Page9_Q2";
import Unit2_Page9_Q3 from "./Unit2_Page9_Q3";

const Unit2_Page9 = ({ openPopup }) => {
  const [activePopup, setActivePopup] = useState(null);
  const captionsExample = [
    { start: 0, end: 1, text: "Hello!" },
    { start: 1, end: 2.2, text: "My name is Tom." },
    { start: 2.2, end: 4, text: "I like apples." },
  ];
  return (
    <div className="page1-img-wrapper"

          style={{ backgroundImage: `url(${page_9})` }}>
      {/* <img src={page_9} /> */}
       <div
          className="click-icon-unit2-page9-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
        onClick={() =>
         openPopup("exercise", { startIndex: 18 })
        }
        style={{ overflow: "visible" }}
      >
        <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
      </svg>
 </div>
       <div
          className="click-icon-unit2-page9-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
        onClick={() =>
          openPopup("exercise", { startIndex: 19 })
        }
        style={{ overflow: "visible" }}
      >
        <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
      </svg>
</div>
        <div
          className="click-icon-unit2-page9-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
        onClick={() =>
         openPopup("exercise", { startIndex: 20 })
        }
       style={{ overflow: "visible" }}
      >
        <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
      </svg>
      </div>
    </div>
  );
};

export default Unit2_Page9;
