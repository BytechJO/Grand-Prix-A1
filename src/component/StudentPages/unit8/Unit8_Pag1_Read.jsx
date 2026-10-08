import bird from "../../../assets/unit8/sound/Pg64_1.2_Adult Lady.mp3";
import ball from "../../../assets/unit8/sound/Pg64_1.3_Adult Lady.mp3";
import boy from "../../../assets/unit8/sound/Pg64_1.4_Adult Lady.mp3";
import bSound from "../../../assets/unit8/sound/Pg64_1.1_Adult Lady.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
import img1 from "../../../assets/unit8/imgs/S.svg";
import img2 from "../../../assets/unit8/imgs/sun.svg";
import img3 from "../../../assets/unit8/imgs/sock.svg";
import img4 from "../../../assets/unit8/imgs/sea.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/unit8/sound/U8P64ListenandReadalong.mp3";

const Unit8_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(bSound),
    new Audio(bird),
    new Audio(ball),
    new Audio(boy),
  ];

const captions = [
   { start: 0, end: 3.5, text: "Page 64. Listen and read along." },
    { start: 3.6, end:7.24, text: "S, sun, sock, sea " },
    
  ];
  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0,3.5, 5.04, 5.35, 6.6]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit8_Page1_Read;
