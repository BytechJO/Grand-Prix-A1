import page_5 from "../../../assets/unit8/imgs/Right 1 Unit 08 At the Soccer Match5.jpg";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import "./Unit8_Page5.css";

const Unit8_Page5 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* <img src={page_5} /> */}

      <div
        className="click-icon-unit8-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 79 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>

      <div
        className="click-icon-unit8-page5-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 80 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>
      <div
        className="click-icon-unit8-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 81 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>

      <div
        className="click-icon-unit8-page5-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 82 })}
        >
          <image href={arrowBtn} x="0" y="0" width="90" height="90" className="svg-img"/>
        </svg>
      </div>
    </div>
  );
};

export default Unit8_Page5;
