import backgroundImage from "../../../assets/unit7/img/U7P58-59.jpg";
import vocabulary from "../../../assets/unit7/sound/Pg58_Vocabulary_Adult Lady.mp3";
import "./Unit7_Page1.css";
import num1 from "../../../assets/img_unit2/imgs/Num1.svg";
import num2 from "../../../assets/img_unit2/imgs/Num2.svg";
import num3 from "../../../assets/img_unit2/imgs/Num3.svg";
import num4 from "../../../assets/img_unit2/imgs/Num4.svg";
import num5 from "../../../assets/img_unit2/imgs/Num5.svg";
import num6 from "../../../assets/img_unit2/imgs/Num6.svg";
import num7 from "../../../assets/img_unit2/imgs/Num7.svg";
import num8 from "../../../assets/unit4/imgs/Num8.svg";
import num9 from "../../../assets/unit7/img/Num9.svg";
import num10 from "../../../assets/unit7/img/Num10.svg";
import sound1 from "../../../assets/unit7/sound/U7VOC-01.mp3";
import sound2 from "../../../assets/unit7/sound/U7VOC-02.mp3";
import sound3 from "../../../assets/unit7/sound/U7VOC-03.mp3";
import sound4 from "../../../assets/unit7/sound/U7VOC-04.mp3";
import sound5 from "../../../assets/unit7/sound/U7VOC-05.mp3";
import sound6 from "../../../assets/unit7/sound/U7VOC-06.mp3";
import sound7 from "../../../assets/unit7/sound/U7VOC-07.mp3";
import sound8 from "../../../assets/unit7/sound/U7VOC-08.mp3";
import sound9 from "../../../assets/unit7/sound/U7VOC-09.mp3";
import sound10 from "../../../assets/unit7/sound/U7VOC-10.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
const Unit7_Page1_Vocab = () => {
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
        sound10,
      ]}
      nums={[num1, num2, num3, num4, num5, num6, num7, num8, num9, num10]}
      vocabulary={[
        "cold",
        "shiver",
        "hungry",
        "bored",
        "scared",
        "crawl",
        "listen",
        "sad",
        "broken",
        "happy",
      ]}
      markers={[
        { id: 1, top: "32%", left: "35%" },
        { id: 2, top: "30%", left: "41%" },
        { id: 3, top: "20%", left: "24%" },
        { id: 4, top: "41%", left: "13%" },
        { id: 5, top: "30%", left: "66%" },
        { id: 6, top: "38%", left: "54%" },
        { id: 7, top: "55%", left: "35%" },
        { id: 8, top: "59%", left: "64%" },
        { id: 9, top: "75%", left: "56%" },
        { id: 10, top: "53%", left: "53%" },
      ]}
      captions={[
        { start: 0, end: 3.88, text: "Page 10, Unit 2, Vocabulary." },
        { start: 4.0, end: 7.34, text: " 1. cold " },
        { start: 7.4, end: 10.08, text: "2. shiver" },
        { start: 10.1, end: 12.63, text: "3. hungry" },
        { start: 12.7, end: 15.02, text: "4. bored" },
        { start: 15.1, end: 17.74, text: " 5. scared" },
        { start: 17.8, end: 20.31, text: " 6. crawl" },
        { start: 20.4, end: 22.68, text: "7.listen" },
        { start: 22.7, end: 25.16, text: " 8. sad" },
        { start: 25.2, end: 27.86, text: "9. broken" },
        { start: 27.9, end: 30.0, text: "10. happy" },
      ]}
    />
  );
};

export default Unit7_Page1_Vocab;
