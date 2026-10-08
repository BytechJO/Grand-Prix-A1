import page_5 from "../../../assets/unit9/imgs/Right 1 Unit 09 A Day on the Farm5.png";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import pauseBtn from "../../../assets/unit1/imgs/Right Video Button.svg";
import "./Unit9_Page5.css";

const Unit9_Page5 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      // onClick={handleImageClick}
      style={{ backgroundImage: `url(${page_5})` }}
    >
      {/* <img src={page_5} /> */}
      <div
        className="click-icon-unit9-page5-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
           style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 98 })}
        >
       <image
                   href={arrowBtn}
                   className="svg-img"
                   x="0"
                   y="0"
                   width="90"
                   height="90"
                 />
        </svg>
      </div>

      <div
        className="click-icon-unit9-page5-2  hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
           style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 99 })}
        >
       <image
                   href={arrowBtn}
                   className="svg-img"
                   x="0"
                   y="0"
                   width="90"
                   height="90"
                 />
        </svg>
      </div>

      <div
        className="click-icon-unit9-page5-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
           style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 100 })}
        >
<image
            href={arrowBtn}
            className="svg-img"
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="click-icon-unit9-page5-4 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
           style={{ overflow: "visible" }}
          onClick={() => openPopup("exercise", { startIndex: 101 })}
        >
        <image
                    href={arrowBtn}
                    className="svg-img"
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

export default Unit9_Page5;
