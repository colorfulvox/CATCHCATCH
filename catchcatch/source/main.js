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
      Coin: 100,
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

// 튜토리얼
global.isTutorial = true;

// 1. ws 모듈 취득
// 2. WebSocket 서버 생성/구동
// const socket = new WebSocket("ws://k7c106.p.ssafy.io:8080");
//
// socket.addEventListener("open", function (event) {
//   socket.send("Hello Server!");
// });
//
// // 메시지 수신
// socket.addEventListener("message", function (event) {
//   console.log("Message from server ", event.data);
// });

function Init() {
  StartPageInit(); //스타트 페이지 init
}
function SaveData() {
  localStorage.setItem("data", JSON.stringify(LocalData));
}
export { SaveData };

Init();
