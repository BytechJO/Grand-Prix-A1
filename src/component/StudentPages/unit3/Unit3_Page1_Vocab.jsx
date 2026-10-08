import backgroundImage from "../../../assets/unit3/imgs3/G1_U3_Pg_22-23 copy.jpg";
import vocabulary from "../../../assets/unit3/sound3/Pg22_Vocabulary_Adult Lady.mp3";
import num1 from "../../../assets/unit3/imgs3/Num1.svg";
import num2 from "../../../assets/unit3/imgs3/Num2.svg";
import num3 from "../../../assets/unit3/imgs3/Num3.svg";
import num4 from "../../../assets/unit3/imgs3/Num4.svg";
import num5 from "../../../assets/unit3/imgs3/Num5.svg";
import num6 from "../../../assets/unit3/imgs3/Num6.svg";
import num7 from "../../../assets/unit3/imgs3/Num7.svg";
import sound4 from "../../../assets/unit3/sound3/U3P22VOC-04.mp3";
import sound5 from "../../../assets/unit3/sound3/U3P22VOC-05.mp3";
import sound6 from "../../../assets/unit3/sound3/U3P22VOC-06.mp3";
import sound1 from "../../../assets/unit3/sound3/U3P22VOC-01.mp3";
import sound2 from "../../../assets/unit3/sound3/U3P22VOC-02.mp3";
import sound3 from "../../../assets/unit3/sound3/U3P22VOC-03.mp3";
import sound7 from "../../../assets/unit3/sound3/U3P22VOC-07.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
const Unit3_Page1_Vocab = () => {
  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={[sound1, sound2, sound3, sound4, sound5, sound6, sound7]}
      nums={[num1, num2, num3, num4, num5, num6, num7]}
      vocabulary={[
        "numbers",
        "Close your book",
        "Open your book",
        "Make a line",
        "Listen!",
        "Quiet!",
        "Take out your pencil",
      ]}
      markers={[
        { id: 1, top: "15%", left: "4%" },
        { id: 2, top: "56%", left: "17%" },
        { id: 3, top: "45%", left: "34%" },
        { id: 4, top: "19%", left: "63%" },
        { id: 5, top: "28%", left: "61%" },
        { id: 6, top: "43%", left: "60%" },
        { id: 7, top: "66%", left: "32%" },
      ]}
      captions={[
        { start: 0, end: 3.1, text: "Page 22, Unit 3, Vocabulary." },
        { start: 3.12, end: 5.15, text: " 1. numbers" },
        { start: 5.17, end: 7.16, text: "2. Close your book." },
        { start: 7.18, end: 9.27, text: "3. Open your book" },
        { start: 9.29, end: 12.2, text: "4. Make a line." },
        { start: 12.22, end: 15.07, text: " 5. Listen!" },
        { start: 15.09, end: 17.13, text: " 6. Quiet!" },
        { start: 17.15, end: 19.26, text: "7.Take out your pencil." },
      ]}
      hight={87}
    />
  );
};

export default Unit3_Page1_Vocab;
