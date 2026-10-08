import React, { useState } from "react";
import page_2 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match8.jpg";
import { FaHeadphones } from "react-icons/fa";
import { PiCursorClickBold } from "react-icons/pi";
import Popup from "../../Popup/Popup";
import "./Review7_Page2.css";
import song from "../../../assets/unit4/sounds/Pg33_Song_Adult Lady.mp3";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import AudioWithCaption from "../../AudioWithCaption";
// import Review5_Page2_Q1 from "./Review5_Page2_Q1";
// import Review5_Page2_Q2 from "./Review5_Page2_Q2";
// import Review5_Page2_Q3 from "./Review5_Page2_Q3";

const Review7_Page2 = ({ openPopup }) => {
  return (
    <div
         className="page1-img-wrapper"
         // onClick={handleImageClick}
         style={{ backgroundImage: `url(${page_2})` }}
       >
         {/* <img src={page_2} /> */}
   
         <div
           className="click-icon-review7-page2-2 hover:scale-110 transition"
           style={{ overflow: "visible" }}
         >
           <svg
             width="22"
             height="22"
             viewBox="0 0 90 90"
             onClick={() => openPopup("exercise", { startIndex:88 })}
             style={{ overflow: "visible" }}
           >
             <image
               className="svg-img"
               href={arrowBtn}
               x="0"
               y="0"
               width="90"
               height="90"
             />
           </svg>
         </div>
         <div
           className="click-icon-review7-page2-3  hover:scale-110 transition"
           style={{ overflow: "visible" }}
         >
           <svg
             width="22"
             height="22"
             viewBox="0 0 90 90"
             onClick={() => openPopup("exercise", { startIndex: 89 })}
             style={{ overflow: "visible" }}
           >
             <image
               className="svg-img"
               href={arrowBtn}
               x="0"
               y="0"
               width="90"
               height="90"
             />
           </svg>
         </div>
         <div
           className="click-icon-review7-page2-1 hover:scale-110 transition"
           style={{ overflow: "visible" }}
         >
           <svg
             width="22"
             height="22"
             viewBox="0 0 90 90"
             onClick={() => openPopup("exercise", { startIndex: 90 })}
             style={{ overflow: "visible" }}
           >
             <image
               className="svg-img"
               href={arrowBtn}
               x="0"
               y="0"
               width="90"
               height="90"
             />
           </svg>
         </div>
       </div>
  );
};

export default Review7_Page2;
