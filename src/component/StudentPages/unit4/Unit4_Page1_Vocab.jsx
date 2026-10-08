import backgroundImage from "../../../assets/unit4/imgs/G1_U4_Pg_28-29 copy.jpg";
import vocabulary from "../../../assets/unit4/sounds/Pg28_Vocabulary_Adult Lady.mp3";
import num1 from "../../../assets/unit4/imgs/Num1.svg";
import num2 from "../../../assets/unit4/imgs/Num2.svg";
import num3 from "../../../assets/unit4/imgs/Num3.svg";
import num4 from "../../../assets/unit4/imgs/Num4.svg";
import num5 from "../../../assets/unit4/imgs/Num5.svg";
import num6 from "../../../assets/unit4/imgs/Num6.svg";
import num7 from "../../../assets/unit4/imgs/Num7.svg";
import num8 from "../../../assets/unit4/imgs/Num8.svg";
import sound1 from "../../../assets/unit4/sounds/U4P28VOC-01.mp3";
import sound2 from "../../../assets/unit4/sounds/U4P28VOC-02.mp3";
import sound3 from "../../../assets/unit4/sounds/U4P28VOC-03.mp3";
import sound4 from "../../../assets/unit4/sounds/U4P28VOC-04.mp3";
import sound5 from "../../../assets/unit4/sounds/U4P28VOC-05.mp3";
import sound6 from "../../../assets/unit4/sounds/U4P28VOC-06.mp3";
import sound7 from "../../../assets/unit4/sounds/U4P28VOC-07.mp3";
import sound8 from "../../../assets/unit4/sounds/U4P28VOC-08.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import "./Unit4_Page1.css";
const Unit4_Page1_Vocab = () => {
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
      ]}
      nums={[num1, num2, num3, num4, num5, num6, num7, num8]}
      vocabulary={[
        "brown",
        "blue",
        "yellow",
        "square",
        "rectangle",
        "triangle",
        "red",
        "circle",
      ]}
      markers={[
        { id: 1, top: "31%", left: "15%" },
        { id: 2, top: "50%", left: "40%" },
        { id: 3, top: "71%", left: "36%" },
        { id: 4, top: "73%", left: "53%" },
        { id: 5, top: "54%", left: "32%" },
        { id: 6, top: "59%", left: "51%" },
        { id: 7, top: "19%", left: "31%" },
        { id: 7, top: "38", left: "75%" },
      ]}
      captions={[
        { start: 4.35, end: 8.29, text: "Page 28, unit 4 vocabulary. " },
        { start: 8.33, end: 11.05, text: "1.	brown. " },
        { start: 11.09, end: 13.05, text: "2.	blue. " },
        { start: 13.09, end: 15.24, text: "3.	yellow. " },
        { start: 15.27, end: 18.13, text: "4.	square. " },
        { start: 18.17, end: 21.0, text: "5.	rectangle." },
        { start: 21.04, end: 23.11, text: "6.	triangle. " },
        { start: 23.14, end: 25.27, text: "7.	red. " },
        { start: 25.3, end: 26.29, text: "8.	circle. " },
      ]}
    />
  );
};

export default Unit4_Page1_Vocab;
