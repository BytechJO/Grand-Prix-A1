import backgroundImage from "../../../assets/unit1/imgs/Page 01/01.jpg";
import num1 from "../../../assets/unit1/imgs/Page 01/Num1.svg";
import num2 from "../../../assets/unit1/imgs/Page 01/Num2.svg";
import num3 from "../../../assets/unit1/imgs/Page 01/Num3.svg";
import num4 from "../../../assets/unit1/imgs/Page 01/Num4.svg";
import num5 from "../../../assets/unit1/imgs/Page 01/Num5.svg";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import "../../../index.css";
import soundFull from "../../../assets/unit1/sounds/Pg4_Vocabulary_Adult Lady.mp3";
import sound1 from "../../../assets/unit1/sounds/pg4-vocabulary-1-goodbye.mp3";
import sound4 from "../../../assets/unit1/sounds/pg4-vocabulary-4-hello..mp3";
import sound5 from "../../../assets/unit1/sounds/pg4-vocabulary-5-good morning.mp3";
import sound2 from "../../../assets/unit1/sounds/pg4-vocabulary-2-how are you.mp3";
import sound3 from "../../../assets/unit1/sounds/pg4-vocabulary-3-fine thank you.mp3";

const Page4_vocabulary = () => {
  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={soundFull}
      wordAudios={[sound1, sound2, sound3, sound4, sound5]}
      nums={[num1, num2, num3, num4, num5]}
      vocabulary={[
        "Goodbye!",
        "How are you?",
        "Fine, thank you.",
        "Hello!",
        "Good morning!",
      ]}
      markers={[
        { id: 1, top: "43%", left: "13%" },
        { id: 2, top: "44%", left: "55%" },
        { id: 3, top: "42%", left: "72%" },
        { id: 4, top: "22%", left: "41%" },
        { id: 5, top: "27%", left: "33%" },
      ]}
      captions={[
        {
          start: 0,
          end: 3.0,
          text: "Page 4, Unit 1. Good morning, world.Vocabulary.",
        },
        { start: 3.02, end: 5.1, text: "1. Goodbye." },
        { start: 5.13, end: 7.0, text: "2. How are you?" },
        { start: 7.03, end: 10.5, text: "3. Fine, thank you." },
        { start: 10.52, end: 12.1, text: "4. Hello." },
        { start: 12.12, end: 15.0, text: "5. Good morning." },
      ]}
      hight={70}
    />
  );
};

export default Page4_vocabulary;
