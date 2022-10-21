import "./CSS/upgrade.css";
import "./CSS/index.css";
import "./CSS/levelup.css";
import initUpgrade from "./JS/upgrade";
import StartPageInit from "./JS/StartPage.js";
import levelup from "./JS/levelup.js";
import inGameUI from "./JS/inGameUI.js";

global.exp = 0;
function Init() {
  StartPageInit(); //스타트 페이지 init
  // inGameUI();
}
levelup();
inGameUI();
// Init();
