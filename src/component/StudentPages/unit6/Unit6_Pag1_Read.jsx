import Pg22_1_1_AdultLady from "../../../assets/unit6/sounds/Pg46_1.1_Adult Lady.mp3";
import Pg22_1_2_AdultLady from "../../../assets/unit6/sounds/Pg46_1.2_Adult Lady.mp3";
import Pg22_1_3_AdultLady from "../../../assets/unit6/sounds/Pg46_1.3_Adult Lady.mp3";
import Pg22_1_4_AdultLady from "../../../assets/unit6/sounds/Pg46_1.4_Adult Lady.mp3";
import img1 from "../../../assets/unit6/imgs/short i.svg";
import img2 from "../../../assets/unit6/imgs/sit.svg";
import img3 from "../../../assets/unit6/imgs/hill.svg";
import img4 from "../../../assets/unit6/imgs/pin.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/unit6/sounds/U6P46Listenandread.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
const Unit6_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg22_1_1_AdultLady),
    new Audio(Pg22_1_2_AdultLady),
    new Audio(Pg22_1_3_AdultLady),
    new Audio(Pg22_1_4_AdultLady),
  ];
   const captions = [
   { start: 0, end: 3.8, text: "Page 46, Listen and read along. " },
    { start: 3.9, end: 7.00, text: "Short I. Sit.Hill. Pin. " },
    
  ];
  return (
    <>

         <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0, 3.8, 5.11,6.05, 7.00]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit6_Page1_Read;
