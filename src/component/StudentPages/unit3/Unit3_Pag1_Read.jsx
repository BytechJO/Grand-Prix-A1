import Pg22_1_1_AdultLady from "../../../assets/unit3/sound3/Pg22_1.1_Adult Lady.mp3";
import Pg22_1_2_AdultLady from "../../../assets/unit3/sound3/Pg22_1.2_Adult Lady.mp3";
import Pg22_1_3_AdultLady from "../../../assets/unit3/sound3/Pg22_1.3_Adult Lady.mp3";
import Pg22_1_4_AdultLady from "../../../assets/unit3/sound3/Pg22_1.4_Adult Lady.mp3";
import img1 from "../../../assets/unit3/imgs3/Short a.svg";
import img2 from "../../../assets/unit3/imgs3/ant.svg";
import img3 from "../../../assets/unit3/imgs3/pan.svg";
import img4 from "../../../assets/unit3/imgs3/rat.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/unit3/sound3/U3P22-listen and read along.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
const Unit3_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg22_1_1_AdultLady),
    new Audio(Pg22_1_2_AdultLady),
    new Audio(Pg22_1_3_AdultLady),
    new Audio(Pg22_1_4_AdultLady),
  ];
  const captions = [
   { start: 0, end: 3.05, text: "Page 22. Listen and read along." },
    { start: 3.07, end: 6.14, text: "Short A. Ant, pan, rat." },
    
  ];
  return (
    <>

         <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0, 3.95, 5.11,6.05, 7.00]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit3_Page1_Read;
