import backgroundImage from "../../../assets/unit6/imgs/G1_U6_Pg_46-47 copy.jpg";
import vocabulary from "../../../assets/unit6/sounds/u6p46voc_bpnMzbOm.mp3";
import num1 from "../../../assets/unit3/imgs3/Num1.svg";
import num2 from "../../../assets/unit3/imgs3/Num2.svg";
import num3 from "../../../assets/unit3/imgs3/Num3.svg";
import num4 from "../../../assets/unit3/imgs3/Num4.svg";
import num5 from "../../../assets/unit3/imgs3/Num5.svg";
import num6 from "../../../assets/unit3/imgs3/Num6.svg";
import num7 from "../../../assets/unit3/imgs3/Num7.svg";
import num8 from "../../../assets/unit5/imgs/Num8.svg";
import num9 from "../../../assets/unit6/imgs/Num9.svg";
import sound1 from "../../../assets/unit6/sounds/U6P46VOC-01.mp3";
import sound2 from "../../../assets/unit6/sounds/U6P46VOC-02.mp3";
import sound3 from "../../../assets/unit6/sounds/U6P46VOC-03.mp3";
import sound4 from "../../../assets/unit6/sounds/U6P46VOC-04.mp3";
import sound5 from "../../../assets/unit6/sounds/U6P46VOC-05.mp3";
import sound6 from "../../../assets/unit6/sounds/U6P46VOC-06.mp3";
import sound7 from "../../../assets/unit6/sounds/U6P46VOC-07.mp3";
import sound8 from "../../../assets/unit6/sounds/U6P46VOC-08.mp3";
import sound9 from "../../../assets/unit6/sounds/U6P46VOC-09.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";

const Unit6_Page1_Vocab = () => {
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
        "fly a kite",
        "play the violin",
        "ride a bike",
        "ride a scooter",
        "feed the birds",
        "climb a tree",
        "fish",
        "paint a picture",
        "swim",
      ]}
      markers={[
        { id: 1, top: "24%", left: "30%" },
        { id: 2, top: "34%", left: "63%" },
        { id: 3, top: "51%", left: "22%" },
        { id: 4, top: "39%", left: "42%" },
        { id: 5, top: "41%", left: "13%" },
        { id: 6, top: "26%", left: "68%" },
        { id: 7, top: "71%", left: "42%" },
        { id: 8, top: "75%", left: "45%" },
        { id: 9, top: "61%", left: "66%" },
      ]}
      captions={[
        { start: 0, end: 3.16, text: "Page 46, Unit 6, Vocabulary" },
        { start: 3.18, end: 6.07, text: "1. Fly a kite. " },
        { start: 6.09, end: 9.01, text: "2. Play the violin." },
        { start: 9.03, end: 11.25, text: "3. Ride a bike." },
        { start: 11.27, end: 14.26, text: "4. Ride a scooter." },
        { start: 14.28, end: 17.26, text: "5. Feed the birds." },
        { start: 17.28, end: 21.0, text: "6. Climb a tree. " },
        { start: 21.02, end: 23.13, text: "7. Fish. " },
        { start: 23.15, end: 26.11, text: "8. Paint a picture." },
        { start: 26.13, end: 28.23, text: "9. Swim." },
      ]}
      // hight={87}
    />
  );
};

export default Unit6_Page1_Vocab;
