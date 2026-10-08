import backgroundImage from "../../../assets/unit9/imgs/G1_U9 _Pg_76-77 copy.jpg";
import vocabulary from "../../../assets/unit9/sound/Pg76_Vocabulary_Adult Lady.mp3";
import num1 from "../../../assets/unit3/imgs3/Num1.svg";
import num2 from "../../../assets/unit3/imgs3/Num2.svg";
import num3 from "../../../assets/unit3/imgs3/Num3.svg";
import num4 from "../../../assets/unit3/imgs3/Num4.svg";
import num5 from "../../../assets/unit3/imgs3/Num5.svg";
import num6 from "../../../assets/unit3/imgs3/Num6.svg";
import num7 from "../../../assets/unit3/imgs3/Num7.svg";
import num8 from "../../../assets/unit5/imgs/Num8.svg";
import sound1 from "../../../assets/unit1/sounds/pg4-vocabulary-1-goodbye.mp3";
import sound2 from "../../../assets/unit1/sounds/pg4-vocabulary-2-how are you.mp3";
import sound3 from "../../../assets/unit1/sounds/pg4-vocabulary-3-fine thank you.mp3";
import sound4 from "../../../assets/unit1/sounds/pg4-vocabulary-4-hello..mp3";
import sound5 from "../../../assets/unit1/sounds/pg4-vocabulary-5-good morning.mp3";
import sound6 from "../../../assets/unit1/sounds/pg4-vocabulary-2-how are you.mp3";
import sound7 from "../../../assets/unit1/sounds/pg4-vocabulary-3-fine thank you.mp3";
import sound8 from "../../../assets/unit1/sounds/pg4-vocabulary-3-fine thank you.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";

const Unit9_Page1_Vocab = () => {
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
          "horse",
              "stable",
              "barn",
              "chicken",
              "goat",
              "cow",
              "grass",
              "cat",
      ]}
      markers={[
        { id: 1, top: "20%", left: "22%" },
        { id: 2, top: "19%", left: "8%" },
        { id: 3, top: "12%", left: "50%" },
        { id: 4, top: "39%", left: "48%" },
        { id: 5, top: "62%", left: "39%" },
        { id: 6, top: "23%", left: "77%" },
        { id: 7, top: "58%", left: "79%" },
        { id: 8, top: "43%", left: "80%" },
       
      ]}
      captions={[
    {
      start: 0,
      end: 3.27,
      text: "Page 76, Unit 9.Vocabulary.",
    },
    { start: 3.3, end: 5.27, text: "1. horse." },
    { start: 5.3, end: 8.07, text: "2. stable" },
    { start: 8.10, end: 10.19, text: "3. barn" },
    { start: 10.22, end: 13.05, text: "4. chicken" },
    { start: 13.07, end: 15.18, text: "5. goat" },
    { start: 15.21, end: 18.08, text: "6. cow" },
    { start: 18.12, end: 20.27, text: "7. grass" },
    { start: 20.3, end: 23.06, text: "8. cat" },
  ]}
    />
  );
};

export default Unit9_Page1_Vocab;
