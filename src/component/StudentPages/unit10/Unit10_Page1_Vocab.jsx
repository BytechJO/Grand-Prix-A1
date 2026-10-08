import backgroundImage from "../../../assets/unit10/imgs/G1_10 _Pg_82-83 copy.jpg";
import vocabulary from "../../../assets/unit10/sound/Pg82_Vocabulary_Adult Lady.mp3";
import num1 from "../../../assets/unit3/imgs3/Num1.svg";
import num2 from "../../../assets/unit3/imgs3/Num2.svg";
import num3 from "../../../assets/unit3/imgs3/Num3.svg";
import num4 from "../../../assets/unit3/imgs3/Num4.svg";
import num5 from "../../../assets/unit3/imgs3/Num5.svg";
import num6 from "../../../assets/unit3/imgs3/Num6.svg";
import num7 from "../../../assets/unit3/imgs3/Num7.svg";
import num8 from "../../../assets/unit5/imgs/Num8.svg";
import num9 from "../../../assets/unit7/img/Num9.svg";
import num10 from "../../../assets/unit7/img/Num10.svg";

import sound1 from "../../../assets/unit10/sound/unit10-sound1.mp3";
import sound2 from "../../../assets/unit10/sound/unit10-sound2.mp3";
import sound3 from "../../../assets/unit10/sound/unit10-sound3.mp3";
import sound4 from "../../../assets/unit10/sound/unit10-sound4.mp3";
import sound5 from "../../../assets/unit10/sound/unit10-sound5.mp3";
import sound6 from "../../../assets/unit10/sound/unit10-sound6.mp3";
import sound7 from "../../../assets/unit10/sound/unit10-sound7.mp3";
import sound8 from "../../../assets/unit10/sound/unit10-sound8.mp3";
import sound9 from "../../../assets/unit10/sound/unit10-sound9.mp3";
import sound10 from "../../../assets/unit10/sound/unit10-sound10.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
const Unit10_Page1_Vocab = () => {
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
        "ice cream",
        "milk",
        "bread",
        "sweet",
        "apple",
        "fruit",
        "chicken",
        "order",
        "wait",
        "cafeteria",
      ]}
      markers={[
        { id: 1, top: "48%", left: "25%" },
        { id: 2, top: "34%", left: "45%" },
        { id: 3, top: "34%", left: "21%" },
        { id: 4, top: "46%", left: "41%" },
        { id: 5, top: "25%", left: "20%" },
        { id: 6, top: "28%", left: "12%" },
        { id: 7, top: "16%", left: "20%" },
        { id: 8, top: "44%", left: "49%" },
        { id: 9, top: "45%", left: "66%" },
        { id: 10, top: "19%", left: "51%" },
      ]}
      captions={[
        { start: 0.52, end: 3.24, text: "Page 82. Unit 10 vocabulary." },

        { start: 3.92, end: 4.56, text: "Ice cream." },
        { start: 5.18, end: 5.6, text: "Milk." },
        { start: 6.26, end: 6.72, text: "Bread." },
        { start: 7.44, end: 7.98, text: "Sweet." },
        { start: 8.74, end: 9.12, text: "Apple." },
        { start: 9.84, end: 10.3, text: "Fruit." },
        { start: 11.12, end: 11.6, text: "Chicken." },
        { start: 12.44, end: 12.9, text: "Order." },
        { start: 13.68, end: 14.12, text: "Wait." },
        { start: 14.8, end: 15.6, text: "Cafeteria." },
      ]}
    />
  );
};

export default Unit10_Page1_Vocab;
