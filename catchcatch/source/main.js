import "./CSS/upgrade.css";
import "./CSS/index.css";
// import initUpgrade from "./JS/upgrade";
import StartPageInit from "./JS/StartPage.js";
import CharPageInit from "./JS/CharPage";

function Init() {
  StartPageInit(); //스타트 페이지 init
  CharPageInit(); // 캐릭터 페이지 init
}

Init();
