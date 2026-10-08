import page_10 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday10.jpg";
import "./Unit2_Page10.css";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";

const Unit2_Page10 = ({ openPopup }) => {
  return (
    <div className="page1-img-wrapper"
       
          style={{ backgroundImage: `url(${page_10})` }}>
      {/* <img src={page_10} /> */}
      <div
        className="click-icon-unit2-page10-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
         openPopup("exercise", { startIndex: 21 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="click-icon-unit2-page10-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", { startIndex: 22 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="click-icon-unit2-page10-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup("exercise", { startIndex: 23 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
      <div
        className="click-icon-unit2-page10-4  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
           openPopup("exercise", { startIndex: 24 })
          }
          style={{ overflow: "visible" }}
        >
          <image className="svg-img" href={arrowBtn} x="0" y="0" width="90" height="90" />
        </svg>
      </div>
    </div>
  );
};

export default Unit2_Page10;
