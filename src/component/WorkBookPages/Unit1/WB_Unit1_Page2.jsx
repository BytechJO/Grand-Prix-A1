import React, { useRef } from "react";
import page2 from "../../../assets/U1 WB/U1/Right Int WB G1 U12.png";

const WB_Unit1_Page2 = () =>
  // { goToUnit }
  {
    //   const clickableAreas = [
    //     {
    //       title: "Unit 1",
    //       startIndex: 4,
    //       top: "9%",
    //       left: "13%",
    //       width: "20%",
    //       height: "8%",
    //     },
    //     {
    //       title: "Unit 2",
    //       startIndex: 10,
    //       top: "25%",
    //       left: "13%",
    //       width: "20%",
    //       height: "8%",
    //     },
    //     {
    //       title: "Unit 3",
    //       startIndex: 22,
    //       top: "46%",
    //       left: "13%",
    //       width: "20%",
    //       height: "8%",
    //     },
    //     {
    //       title: "Unit 4",
    //       startIndex: 28,
    //       top: "62%",
    //       left: "13%",
    //       width: "20%",
    //       height: "8%",
    //     },
    //     {
    //       title: "Unit 5",
    //       startIndex: 40,
    //       top: "77%",
    //       left: "13%",
    //       width: "20%",
    //       height: "8%",
    //     },
    //   ];

    //   const imgRef = useRef(null);

    //   const handleClick = (e) => {
    //     const rect = imgRef.current.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;

    //     const xPercent = ((x / rect.width) * 100).toFixed(2);
    //     const yPercent = ((y / rect.height) * 100).toFixed(2);

    //     console.log(`🟢 top: "${yPercent}%", left: "${xPercent}%"`);

    //     // اختياري: تنقل للوحدة 3 كمثال عند أي نقرة
    //     // goToUnit(22);
    //   };

    return (
      <div
        className="page1-img-wrapper"
        style={{ backgroundImage: `url(${page2})` }}
      >
        {/* <img
        src={page2}
        alt="Book Index"
        // ref={imgRef}
        // onClick={handleClick}
        className="w-full h-full rounded-2xl shadow-lg"
      /> */}
        {/* 
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          onClick={() => {  
            goToUnit(area.startIndex);
          }}
          className="absolute cursor-pointer hover:scale-105 transition-all duration-150"
          style={{
            top: area.top,
            left: area.left,
            width: area.width,
            height: area.height,
            // border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        ></div>
      ))} */}
      </div>
    );
  };

export default WB_Unit1_Page2;
