import WB_Unit1_Page1 from "../WorkBookPages/Unit1/WB_Unit1_Page1";
import WB_Unit1_Page2 from "../WorkBookPages/Unit1/WB_Unit1_Page2";
import WB_Unit1_Page3 from "../WorkBookPages/Unit1/WB_Unit1_Page3";
import WB_Unit1_Page4 from "../WorkBookPages/Unit1/WB_Unit1_Page4";
import WB_Unit1_Page5 from "../WorkBookPages/Unit1/WB_Unit1_Page5";
import WB_Unit1_Page6 from "../WorkBookPages/Unit1/WB_Unit1_Page6";
import WB_Unit1_Page7 from "../WorkBookPages/Unit1/WB_Unit1_Page7";
import WB_Unit1_Page8 from "../WorkBookPages/Unit1/WB_Unit1_Page8";

import WB_Unit2_Page1 from "../WorkBookPages/Unit2/WB_Unit2_Page1";
import WB_Unit2_Page2 from "../WorkBookPages/Unit2/WB_Unit2_Page2";
import WB_Unit2_Page3 from "../WorkBookPages/Unit2/WB_Unit2_Page3";
import WB_Unit2_Page4 from "../WorkBookPages/Unit2/WB_Unit2_Page4";
import WB_Unit2_Page5 from "../WorkBookPages/Unit2/WB_Unit2_Page5";
import WB_Unit2_Page6 from "../WorkBookPages/Unit2/WB_Unit2_Page6";

import WB_Unit3_Page1 from "../WorkBookPages/Unit3/WB_Unit3_Page1";
import WB_Unit3_Page2 from "../WorkBookPages/Unit3/WB_Unit3_Page2";
import WB_Unit3_Page3 from "../WorkBookPages/Unit3/WB_Unit3_Page3";
import WB_Unit3_Page4 from "../WorkBookPages/Unit3/WB_Unit3_Page4";
import WB_Unit3_Page5 from "../WorkBookPages/Unit3/WB_Unit3_Page5";
import WB_Unit3_Page6 from "../WorkBookPages/Unit3/WB_Unit3_Page6";

import WB_Unit4_Page1 from "../WorkBookPages/Unit4/WB_Unit4_Page1";
import WB_Unit4_Page2 from "../WorkBookPages/Unit4/WB_Unit4_Page2";
import WB_Unit4_Page3 from "../WorkBookPages/Unit4/WB_Unit4_Page3";
import WB_Unit4_Page4 from "../WorkBookPages/Unit4/WB_Unit4_Page4";
import WB_Unit4_Page5 from "../WorkBookPages/Unit4/WB_Unit4_Page5";
import WB_Unit4_Page6 from "../WorkBookPages/Unit4/WB_Unit4_Page6";

import WB_Unit5_Page1 from "../WorkBookPages/Unit5/WB_Unit5_Page1";
import WB_Unit5_Page2 from "../WorkBookPages/Unit5/WB_Unit5_Page2";
import WB_Unit5_Page3 from "../WorkBookPages/Unit5/WB_Unit5_Page3";
import WB_Unit5_Page4 from "../WorkBookPages/Unit5/WB_Unit5_Page4";
import WB_Unit5_Page5 from "../WorkBookPages/Unit5/WB_Unit5_Page5";
import WB_Unit5_Page6 from "../WorkBookPages/Unit5/WB_Unit5_Page6";

import WB_Unit6_Page1 from "../WorkBookPages/Unit6/WB_Unit6_Page1";
import WB_Unit6_Page2 from "../WorkBookPages/Unit6/WB_Unit6_Page2";
import WB_Unit6_Page3 from "../WorkBookPages/Unit6/WB_Unit6_Page3";
import WB_Unit6_Page4 from "../WorkBookPages/Unit6/WB_Unit6_Page4";
import WB_Unit6_Page5 from "../WorkBookPages/Unit6/WB_Unit6_Page5";
import WB_Unit6_Page6 from "../WorkBookPages/Unit6/WB_Unit6_Page6";

import WB_Unit7_Page1 from "../WorkBookPages/Unit7/WB_Unit7_Page1";
import WB_Unit7_Page2 from "../WorkBookPages/Unit7/WB_Unit7_Page2";
import WB_Unit7_Page3 from "../WorkBookPages/Unit7/WB_Unit7_Page3";
import WB_Unit7_Page4 from "../WorkBookPages/Unit7/WB_Unit7_Page4";
import WB_Unit7_Page5 from "../WorkBookPages/Unit7/WB_Unit7_Page5";
import WB_Unit7_Page6 from "../WorkBookPages/Unit7/WB_Unit7_Page6";

import WB_Unit8_Page1 from "../WorkBookPages/Unit8/WB_Unit8_Page1";
import WB_Unit8_Page2 from "../WorkBookPages/Unit8/WB_Unit8_Page2";
import WB_Unit8_Page3 from "../WorkBookPages/Unit8/WB_Unit8_Page3";
import WB_Unit8_Page4 from "../WorkBookPages/Unit8/WB_Unit8_Page4";
import WB_Unit8_Page5 from "../WorkBookPages/Unit8/WB_Unit8_Page5";
import WB_Unit8_Page6 from "../WorkBookPages/Unit8/WB_Unit8_Page6";

import WB_Unit9_Page1 from "../WorkBookPages/Unit9/WB_Unit9_Page1";
import WB_Unit9_Page2 from "../WorkBookPages/Unit9/WB_Unit9_Page2";
import WB_Unit9_Page3 from "../WorkBookPages/Unit9/WB_Unit9_Page3";
import WB_Unit9_Page4 from "../WorkBookPages/Unit9/WB_Unit9_Page4";
import WB_Unit9_Page5 from "../WorkBookPages/Unit9/WB_Unit9_Page5";
import WB_Unit9_Page6 from "../WorkBookPages/Unit9/WB_Unit9_Page6";

import WB_Unit10_Page1 from "../WorkBookPages/Unit10/WB_Unit10_Page1";
import WB_Unit10_Page2 from "../WorkBookPages/Unit10/WB_Unit10_Page2";
import WB_Unit10_Page3 from "../WorkBookPages/Unit10/WB_Unit10_Page3";
import WB_Unit10_Page4 from "../WorkBookPages/Unit10/WB_Unit10_Page4";
import WB_Unit10_Page5 from "../WorkBookPages/Unit10/WB_Unit10_Page5";
import WB_Unit10_Page6 from "../WorkBookPages/Unit10/WB_Unit10_Page6";

import WordList_Page1 from "../WorkBookPages/WordList/WordList_Page1";
import WordList_Page2 from "../WorkBookPages/WordList/WordList_Page2";

export const workbookPages = (openPopup, goToUnit) => [
  <WB_Unit1_Page1 />,
  <WB_Unit1_Page2 />,
  <WB_Unit1_Page3 openPopup={openPopup} />,
  <WB_Unit1_Page4 openPopup={openPopup} />,
  <WB_Unit1_Page5 openPopup={openPopup} />,
  <WB_Unit1_Page6 openPopup={openPopup} />,
  <WB_Unit1_Page7 openPopup={openPopup} />,
  <WB_Unit1_Page8 openPopup={openPopup} />,

  <WB_Unit2_Page1 openPopup={openPopup} />,
  <WB_Unit2_Page2 openPopup={openPopup} />,
  <WB_Unit2_Page3 openPopup={openPopup} />,
  <WB_Unit2_Page4 openPopup={openPopup} />,
  <WB_Unit2_Page5 openPopup={openPopup} />,
  <WB_Unit2_Page6 openPopup={openPopup} />,

  <WB_Unit3_Page1 openPopup={openPopup} />,
  <WB_Unit3_Page2 openPopup={openPopup} />,
  <WB_Unit3_Page3 openPopup={openPopup} />,
  <WB_Unit3_Page4 openPopup={openPopup} />,
  <WB_Unit3_Page5 openPopup={openPopup} />,
  <WB_Unit3_Page6 openPopup={openPopup} />,

  <WB_Unit4_Page1 openPopup={openPopup} />,
  <WB_Unit4_Page2 openPopup={openPopup} />,
  <WB_Unit4_Page3 openPopup={openPopup} />,
  <WB_Unit4_Page4 openPopup={openPopup} />,
  <WB_Unit4_Page5 openPopup={openPopup} />,
  <WB_Unit4_Page6 openPopup={openPopup} />,

  <WB_Unit5_Page1 openPopup={openPopup} />,
  <WB_Unit5_Page2 openPopup={openPopup} />,
  <WB_Unit5_Page3 openPopup={openPopup} />,
  <WB_Unit5_Page4 openPopup={openPopup} />,
  <WB_Unit5_Page5 openPopup={openPopup} />,
  <WB_Unit5_Page6 openPopup={openPopup} />,

  <WB_Unit6_Page1 openPopup={openPopup} />,
  <WB_Unit6_Page2 openPopup={openPopup} />,
  <WB_Unit6_Page3 openPopup={openPopup} />,
  <WB_Unit6_Page4 openPopup={openPopup} />,
  <WB_Unit6_Page5 openPopup={openPopup} />,
  <WB_Unit6_Page6 openPopup={openPopup} />,

  <WB_Unit7_Page1 openPopup={openPopup} />,
  <WB_Unit7_Page2 openPopup={openPopup} />,
  <WB_Unit7_Page3 openPopup={openPopup} />,
  <WB_Unit7_Page4 openPopup={openPopup} />,
  <WB_Unit7_Page5 openPopup={openPopup} />,
  <WB_Unit7_Page6 openPopup={openPopup} />,

  <WB_Unit8_Page1 openPopup={openPopup} />,
  <WB_Unit8_Page2 openPopup={openPopup} />,
  <WB_Unit8_Page3 openPopup={openPopup} />,
  <WB_Unit8_Page4 openPopup={openPopup} />,
  <WB_Unit8_Page5 openPopup={openPopup} />,
  <WB_Unit8_Page6 openPopup={openPopup} />,

  <WB_Unit9_Page1 openPopup={openPopup} />,
  <WB_Unit9_Page2 openPopup={openPopup} />,
  <WB_Unit9_Page3 openPopup={openPopup} />,
  <WB_Unit9_Page4 openPopup={openPopup} />,
  <WB_Unit9_Page5 openPopup={openPopup} />,
  <WB_Unit9_Page6 openPopup={openPopup} />,

  <WB_Unit10_Page1 openPopup={openPopup} />,
  <WB_Unit10_Page2 openPopup={openPopup} />,
  <WB_Unit10_Page3 openPopup={openPopup} />,
  <WB_Unit10_Page4 openPopup={openPopup} />,
  <WB_Unit10_Page5 openPopup={openPopup} />,
  <WB_Unit10_Page6 openPopup={openPopup} />,

  <WordList_Page1 />,
  <WordList_Page2 />,
  // ...
];
