import backgroundImage from "../../../assets/unit5/imgs/P40-41.jpg";
import vocabulary from "../../../assets/unit5/sounds/Pg40_Vocabulary_Adult Lady.mp3";
import num1 from "../../../assets/unit3/imgs3/Num1.svg";
import num2 from "../../../assets/unit3/imgs3/Num2.svg";
import num3 from "../../../assets/unit3/imgs3/Num3.svg";
import num4 from "../../../assets/unit3/imgs3/Num4.svg";
import num5 from "../../../assets/unit3/imgs3/Num5.svg";
import num6 from "../../../assets/unit3/imgs3/Num6.svg";
import num7 from "../../../assets/unit3/imgs3/Num7.svg";
import num8 from "../../../assets/unit5/imgs/Num8.svg";
import sound1 from "../../../assets/unit5/sounds/U5P40-01.mp3";
import sound2 from "../../../assets/unit5/sounds/U5P40-02.mp3";
import sound3 from "../../../assets/unit5/sounds/U5P40-03.mp3";
import sound4 from "../../../assets/unit5/sounds/U5P40-04.mp3";
import sound5 from "../../../assets/unit5/sounds/U5P40-05.mp3";
import sound6 from "../../../assets/unit5/sounds/U5P40-06.mp3";
import sound7 from "../../../assets/unit5/sounds/U5P40-07.mp3";
import sound8 from "../../../assets/unit5/sounds/U5P40-08.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";

const Unit5_Page1_Vocab = () => {
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
        "board",
        " map",
        " book",
        "globe",
        "poster",
        "trash bin",
        "desk",
        "chair",
      ]}
      markers={[
        { id: 1, top: "16%", left: "24%" },
        { id: 2, top: "21%", left: "44%" },
        { id: 3, top: "51%", left: "59%" },
        { id: 4, top: "32%", left: "39%" },
        { id: 5, top: "28%", left: "57%" },
        { id: 6, top: "37%", left: "59%" },
        { id: 7, top: "46%", left: "39%" },
        { id: 8, top: "32%", left: "19%" },
      ]}
      captions={[
        { start: 0, end: 3.16, text: "Page 40, Unit 5 Vocabulary: " },
        { start: 3.18, end: 5.26, text: "1.	Board." },
        { start: 5.28, end: 8.03, text: "2.	Map." },
        { start: 8.05, end: 10.15, text: "3.	Book." },
        { start: 10.17, end: 13.12, text: "4.	Globe. " },
        { start: 13.15, end: 15.22, text: "5.	Poster." },
        { start: 15.24, end: 18.07, text: "6.	trash bin." },
        { start: 18.09, end: 20.18, text: "7.	Desk." },
        { start: 20.2, end: 22.21, text: "8.	Chair." },
      ]}
     
    />
  );
};

export default Unit5_Page1_Vocab;
