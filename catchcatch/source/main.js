import "./CSS/UI/upgrade.css";
import "./CSS/UI/index.css";
import "./CSS/GAME/style.css";
import "./CSS/UI/levelup.css";
// import initUpgrade from "./JS/upgrade";
import StartPageInit from "./JS/UI/start-page.js";
import CharPageInit from "./JS/UI/char-space";
import perlin from "./JS/GAME/perlin.js";
import initUpgrade from "./JS/UI/upgrade.js";
import levelup from "./JS/UI/levelup.js";
import ingameUi from "./JS/UI/ingame-ui.js";
import { setSound } from "./JS/SOUND/sound";

global.noise = {};
perlin();
// localStorage.clear();
// 로컬 데이터
global.LocalData = localStorage.getItem("data");
if (global.LocalData === null) {
  localStorage.setItem(
    "data",
    JSON.stringify({
      Coin: 0,
      Cat: [true, false, false, false, false, false, false],
    })
  );
}
global.LocalData = JSON.parse(localStorage.getItem("data"));
// 게임 시작 전 데이터
global.ChoiceCat = 0;
global.ChoiceLevel = 0;
//경험치
global.exp = 0;
global.level = 0;

global.pause = false;
global.isUpgrade = false;
global.isLevelup = false;
global.levelCount = 0;

global.inGameCoin = 0;

// 튜토리얼
global.isTutorial = true;

function Init() {
  StartPageInit(); //스타트 페이지 init
}
function SaveData() {
  localStorage.setItem("data", JSON.stringify(LocalData));
}
export { SaveData };

Init();
