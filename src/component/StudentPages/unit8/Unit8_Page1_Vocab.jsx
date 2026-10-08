import backgroundImage from "../../../assets/unit8/imgs/G1_U8 _Pg_64-65 copy1.jpg";
import vocabulary from "../../../assets/unit8/sound/Pg64_Vocabulary_Adult Lady.mp3";
import "./Unit8_Page1.css";
import num1 from "../../../assets/img_unit2/imgs/Num1.svg";
import num2 from "../../../assets/img_unit2/imgs/Num2.svg";
import num3 from "../../../assets/img_unit2/imgs/Num3.svg";
import num4 from "../../../assets/img_unit2/imgs/Num4.svg";
import num5 from "../../../assets/img_unit2/imgs/Num5.svg";
import num6 from "../../../assets/img_unit2/imgs/Num6.svg";
import num7 from "../../../assets/img_unit2/imgs/Num7.svg";
import num8 from "../../../assets/unit4/imgs/Num8.svg";
import num9 from "../../../assets/unit7/img/Num9.svg";
import sound1 from "../../../assets/unit8/sound/U8P64VOC01.mp3";
import sound2 from "../../../assets/unit8/sound/U8P64VOC02.mp3";
import sound3 from "../../../assets/unit8/sound/U8P64VOC03.mp3";
import sound4 from "../../../assets/unit8/sound/U8P64VOC04.mp3";
import sound5 from "../../../assets/unit8/sound/U8P64VOC05.mp3";
import sound6 from "../../../assets/unit8/sound/U8P64VOC06.mp3";
import sound7 from "../../../assets/unit8/sound/U8P64VOC07.mp3";
import sound8 from "../../../assets/unit8/sound/U8P64VOC08.mp3";
import sound9 from "../../../assets/unit8/sound/U8P64VOC09.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
const Unit8_Page1_Vocab = () => {
  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={[
        sound1,
        sound2,
        sound3,
        sound4,
        sound5,
        sound6,
        sound7,
        sound8,
        sound9,
      ]}
      nums={[num1, num2, num3, num4, num5, num6, num7, num8, num9]}
      vocabulary={[
        "eye",
        "nose",
        "mouth",
        "head",
        "knee",
        "leg",
        "touch",
        "arm",
        "hand",
      ]}
      markers={[
        { id: 1, top: "29%", left: "26%" },
        { id: 2, top: "33%", left: "27%" },
        { id: 3, top: "37%", left: "28%" },
        { id: 4, top: "21%", left: "38%" },
        { id: 5, top: "49%", left: "31%" },
        { id: 6, top: "50%", left: "27%" },
        { id: 7, top: "43%", left: "75%" },
        { id: 8, top: "45%", left: "90%" },
        { id: 9, top: "55%", left: "74%" },
      ]}
      captions={[
        { start: 0, end: 3.17, text: "Page 64, Unit 8, Vocabulary." },
        { start: 3.25, end: 5.29, text: " 1.eye" },
        { start: 5.33, end: 8.01, text: "2.nose" },
        { start: 8.05, end: 10.12, text: "3.mouth" },
        { start: 10.15, end: 13.0, text: "4.head" },
        { start: 13.05, end: 15.11, text: " 5.knee" },
        { start: 15.15, end: 18.0, text: " 6.leg" },
        { start: 18.03, end: 20.08, text: "7.touch" },
        { start: 20.11, end: 22.24, text: "8.arm" },
        { start: 22.27, end: 25.19, text: "9.hand" },
      ]}
    />
  );
};

export default Unit8_Page1_Vocab;
