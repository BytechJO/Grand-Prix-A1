import page_1 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match7.jpg";
import "./Review7_Page1.css";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import Review7_Page1_Q1 from "./Review7_Page1_Q1";
// import Review7_Page1_Q2 from "./Review5_Page1_Q2";
// import Review7_Page1_Q3 from "./Review5_Page1_Q3";

const Review7_Page1 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      {/* <img src={page_1} /> */}

      <div
        className="click-icon-review7-page1-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 85 })}
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
           className="click-icon-review7-page1-3 hover:scale-110 transition"
           style={{ overflow: "visible" }}
         >
           <svg
             width="22"
             height="22"
             viewBox="0 0 90 90"
             onClick={() => openPopup("exercise", { startIndex: 86 })}
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
           className="click-icon-review7-page1-1 hover:scale-110 transition"
           style={{ overflow: "visible" }}
         >
           <svg
             width="22"
             height="22"
             viewBox="0 0 90 90"
             onClick={() => openPopup("exercise", { startIndex: 87 })}
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

export default Review7_Page1;
