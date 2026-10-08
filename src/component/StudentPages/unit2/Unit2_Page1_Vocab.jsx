import backgroundImage from "../../../assets/img_unit2/imgs/02-03 New copy.jpg";
import vocabulary from "../../../assets/img_unit2/sounds-unit2/Pg10_Vocabulary_Adult Lady.mp3";
import "./Unit2_Page1.css";
import num1 from "../../../assets/img_unit2/imgs/Num1.svg";
import num2 from "../../../assets/img_unit2/imgs/Num2.svg";
import num3 from "../../../assets/img_unit2/imgs/Num3.svg";
import num4 from "../../../assets/img_unit2/imgs/Num4.svg";
import num5 from "../../../assets/img_unit2/imgs/Num5.svg";
import num6 from "../../../assets/img_unit2/imgs/Num6.svg";
import num7 from "../../../assets/img_unit2/imgs/Num7.svg";
import sound1 from "../../../assets/img_unit2/sounds-unit2/U2-01.mp3";
import sound2 from "../../../assets/img_unit2/sounds-unit2/U2-02.mp3";
import sound3 from "../../../assets/img_unit2/sounds-unit2/U2-03.mp3";
import sound4 from "../../../assets/img_unit2/sounds-unit2/U2-04.mp3";
import sound5 from "../../../assets/img_unit2/sounds-unit2/U2-05.mp3";
import sound6 from "../../../assets/img_unit2/sounds-unit2/U2-06.mp3";
import sound7 from "../../../assets/img_unit2/sounds-unit2/U2-07.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
const Unit2_Page1_Vocab = () => {
  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={[sound1, sound2, sound3, sound4, sound5, sound6, sound7]}
      nums={[num1, num2, num3, num4, num5, num6, num7]}
      vocabulary={[
        "party hat",
        "jello",
        "cake",
        "happy birthday ",
        "balloons",
        "present",
        "card",
      ]}
      markers={[
        { id: 1, top: "29%", left: "34%" },
        { id: 2, top: "58%", left: "28%" },
        { id: 3, top: "48%", left: "28%" },
        { id: 4, top: "13%", left: "44%" },
        { id: 5, top: "25%", left: "3%" },
        { id: 6, top: "56%", left: "68%" },
        { id: 7, top: "55%", left: "73%" },
      ]}
      captions={[
        { start: 0, end: 3.1, text: "Page 10, Unit 2, Vocabulary." },
        { start: 3.12, end: 5.15, text: " 1. Party Hat. " },
        { start: 5.17, end: 7.16, text: "2. Jello." },
        { start: 7.18, end: 9.27, text: "3. Cake. " },
        { start: 9.29, end: 12.2, text: "4. Happy Birthday." },
        { start: 12.22, end: 15.07, text: " 5. Balloons." },
        { start: 15.09, end: 17.13, text: " 6. Present. " },
        { start: 17.15, end: 19.26, text: "7.card" },
      ]}
      hight={87}
    />
  );
};

export default Unit2_Page1_Vocab;
