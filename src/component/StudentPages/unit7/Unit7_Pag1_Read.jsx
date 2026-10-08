import bird from "../../../assets/unit7/sound/Pg58_1.2_Adult Lady.mp3";
import ball from "../../../assets/unit7/sound/Pg58_1.3_Adult Lady.mp3";
import boy from "../../../assets/unit7/sound/Pg58_1.4_Adult Lady.mp3";
import bSound from "../../../assets/unit7/sound/Pg58_1.1_Adult Lady.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import img1 from "../../../assets/unit7/img/h.svg";
import img2 from "../../../assets/unit7/img/hand.svg";
import img3 from "../../../assets/unit7/img/hat.svg";
import img4 from "../../../assets/unit7/img/house.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/unit7/sound/U7P58ListenAndReadAlong.mp3";

const Unit7_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(bSound),
    new Audio(bird),
    new Audio(ball),
    new Audio(boy),
  ];

const captions = [
   { start: 0, end: 4.04, text: " Page 58. Listen and read along." },
    { start: 3.07, end: 8.15, text: "  H. Hand, hat, house." },
    
  ];

  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0, 4.57, 5.60, 6.21, 7.71]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit7_Page1_Read;
