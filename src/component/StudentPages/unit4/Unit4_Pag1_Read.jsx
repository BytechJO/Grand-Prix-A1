import React, { useState, useRef, useEffect } from "react";
import listenSound from "../../../assets/unit4/sounds/U4P28 Listen and read along.mp3";
import bird from "../../../assets/unit4/sounds/Pg28_1.2_Adult Lady.mp3";
import ball from "../../../assets/unit4/sounds/Pg28_1.3_Adult Lady.mp3";
import boy from "../../../assets/unit4/sounds/Pg28_1.4_Adult Lady.mp3";
import bSound from "../../../assets/unit4/sounds/Pg28_1.1_Adult Lady.mp3";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import img1 from "../../../assets/unit4/imgs/f.svg";
import img2 from "../../../assets/unit4/imgs/feet.svg";
import img3 from "../../../assets/unit4/imgs/fish.svg";
import img4 from "../../../assets/unit4/imgs/fork.svg";
import longAudio from "../../../assets/unit1/sounds/pg4-instruction1-adult-lady_9KnGFLcl.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
const Unit4_Page1_Read = () => {

  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(bSound),
    new Audio(bird),
    new Audio(ball),
    new Audio(boy),
  ];
  
const captions = [
   { start: 0, end: 3.05, text: "Page 10. Listen and read along." },
    { start: 3.07, end: 6.14, text: "B, bird, ball, boy " },
    
  ];

  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={listenSound}
        checkpoints={[0,3.2,4.2, 5.25, 6.22]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit4_Page1_Read;
