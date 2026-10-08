import React, { useRef } from "react";
import page3 from "../../../assets/unit1/imgs/Pages/Right 1 Unit 01 Good Morning World 2_page-0003.jpg";
const Page3 = ({ goToUnit }) => {
  const clickableAreas = [
    {
      title: "Unit 6",
      startIndex: 46,
      top: "9%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 7",
      startIndex: 58,
      top: "25%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 8",
      startIndex: 64,
      top: "46%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 9",
      startIndex: 76,
      top: "62%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
    {
      title: "Unit 10",
      startIndex: 82,
      top: "77%",
      left: "14%",
      width: "20%",
      height: "8%",
    },
  ];

  const imgRef = useRef(null);

  const handleClick = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = ((x / rect.width) * 100).toFixed(2);
    const yPercent = ((y / rect.height) * 100).toFixed(2);

    // اختياري: تنقل للوحدة 3 كمثال عند أي نقرة
    // goToUnit(22);
  };
  return (
    <div
      className="page1-img-wrapper"
      ref={imgRef}
      onClick={handleClick}
      style={{ backgroundImage: `url(${page3})` }}
    >
      {/* <img
        src={page3}
        alt="Book Index"
        ref={imgRef}
        onClick={handleClick}
        className="w-full h-full rounded-2xl shadow-lg"
      /> */}
      {clickableAreas.map((area, index) => (
        <div
          key={index}
          onClick={() => goToUnit(area.startIndex)}
          className="absolute cursor-pointer hover:scale-105 transition-all duration-150"
          style={{
            top: area.top,
            left: area.left,
            width: area.width,
            height: area.height,
            // border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Page3;
