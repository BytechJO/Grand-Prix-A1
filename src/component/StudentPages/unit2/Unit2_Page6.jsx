import React, { useState } from "react";
import page_6 from "../../../assets/img_unit2/imgs/Right 1 Unit 02 Stell Birthday6.jpg";
import song from "../../../assets/img_unit2/sounds-unit2/Pg15.Sing_Adult Lady.mp3";
import "./Unit2_Page6.css";
import Unit2_Page6_Q1 from "./Unit2_Page6_Q1";
import Unit2_Page6_Q2 from "./Unit2_Page6_Q2";
import audioBtn from "../../../assets/unit1/imgs/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/unit1/imgs/Page 01/Arrow.svg";
import AudioWithCaption from "../../AudioWithCaption";

const Unit2_Page6 = ({ openPopup }) => {
  const captionsExample = [
    { start: 0, end: 1, text: "Is it my birthday?" },
    { start: 1, end: 2.2, text: "Yes, it is!" },
    { start: 2.22, end: 4.05, text: "It’s my birthday!" },
    { start: 4.08, end: 7.04, text: "Yes, it is! Happy I am." },
    { start: 7.08, end: 9.25, text: "Because it’s my birthday." },
  ];

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_6})` }}
    >
      {/* <img src={page_6} /> */}

      <div
        className="click-icon-unit2-page6-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 10 })}
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
        className="headset-icon-CD-unit2-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "audio",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <AudioWithCaption src={song} captions={captionsExample} />
              </div>
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="click-icon-unit2-page6-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 11 })}
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

export default Unit2_Page6;
