import Pg22_1_1_AdultLady from "../../../assets/unit10/sound/Pg82_1.1_Adult Lady.mp3";
import Pg22_1_2_AdultLady from "../../../assets/unit10/sound/Pg82_1.2_Adult Lady.mp3";
import Pg22_1_3_AdultLady from "../../../assets/unit10/sound/Pg82_1.3_Adult Lady.mp3";
import Pg22_1_4_AdultLady from "../../../assets/unit10/sound/Pg82_1.4_Adult Lady.mp3";
import img1 from "../../../assets/unit10/imgs/short e.svg";
import img2 from "../../../assets/unit10/imgs/bed.svg";
import img3 from "../../../assets/unit10/imgs/egg.svg";
import img4 from "../../../assets/unit10/imgs/hen.svg";
import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/unit10/sound/pg82-instruction1-adult-lady_pqWRfWVv.mp3";
import Rabbit from "../../../assets/img_unit2/imgs/Rabbit.svg";
const Unit10_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(Pg22_1_1_AdultLady),
    new Audio(Pg22_1_2_AdultLady),
    new Audio(Pg22_1_3_AdultLady),
    new Audio(Pg22_1_4_AdultLady),
  ];
  const captions= [
  { start: 0.379, end: 1.439, text: "Page 82." },
  { start: 1.86, end: 3.199, text: "Listen and read along." },
  { start: 3.759, end: 4.759, text: "Short E:" },
  { start: 5.159, end: 5.519, text: "bed" },
  { start: 6.039, end: 6.44, text: "egg" },
  { start: 6.799, end: 7.199, text: "hen" },
];
  return (
    <>

         <FourImagesWithAudio
        images={[Rabbit, img1, img2, img3, img4]}
        audioSrc={longAudio}
        checkpoints={[0, 3.65, 5.159,6.039,6.799]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
         captions={captions}
      />
    </>
  );
};

export default Unit10_Page1_Read;
