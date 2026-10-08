import Pg22_1_1_AdultLady from "../../../assets/unit9/sound/Pg76_1.1_Adult Lady.mp3";
import Pg22_1_2_AdultLady from "../../../assets/unit9/sound/Pg76_1.2_Adult Lady.mp3";
import Pg22_1_3_AdultLady from "../../../assets/unit9/sound/Pg76_1.3_Adult Lady.mp3";
import Pg22_1_4_AdultLady from "../../../assets/unit9/sound/Pg76_1.4_Adult Lady.mp3";
import img1 from "../../../assets/unit9/imgs/M.svg";
import img2 from "../../../assets/unit9/imgs/milk.svg";
import img3 from "../../../assets/unit9/imgs/man.svg";
import img4 from "../../../assets/unit9/imgs/mom.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/unit9/sound/pg76-intruction1-adult-lady_JZRYUgvN.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
const Unit9_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg22_1_1_AdultLady),
    new Audio(Pg22_1_2_AdultLady),
    new Audio(Pg22_1_3_AdultLady),
    new Audio(Pg22_1_4_AdultLady),
  ];
const captions = [
  {
    text: "Page 76. Listen and read along.",
    start: 0.28,
    end: 3.399,
  },
  {
    text: "M",
    start: 3.899,
    end: 4.159,
  },
  {
    text: "milk",
    start: 4.819,
    end: 5.239,
  },
  {
    text: "man",
    start: 5.92,
    end: 6.44,
  },
  {
    text: "mom",
    start: 7.019,
    end: 7.519,
  },
];
  return (
    <>

         <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0, 3.399, 4.819,5.92,7.019]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
         captions={captions}
      />
    </>
  );
};

export default Unit9_Page1_Read;
