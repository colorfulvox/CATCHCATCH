// import "./CSS/UI/upgrade.css";
// import "./CSS/UI/index.css";
// import "./CSS/GAME/style.css";
// import "./CSS/UI/levelup.css";
// // import initUpgrade from "./JS/upgrade";
// import StartPageInit from "./JS/UI/StartPage.js";
// import CharPageInit from "./JS/UI/CharSpace";
// import perlin from "./JS/GAME/perlin.js";
// import initUpgrade from "./JS/UI/upgrade.js";
// import levelup from "./JS/UI/levelup.js";
// import inGameUI from "./JS/UI/inGameUI.js";

// global.noise = {};
// perlin();
// // localStorage.clear();

// // 로컬 데이터
// global.LocalData = localStorage.getItem("data");
// if (global.LocalData === null) {
//   localStorage.setItem(
//     "data",
//     JSON.stringify({
//       Coin: 1000,
//       Cat: [true, false, false, false, false, false, false],
//     })
//   );
// }
// global.LocalData = JSON.parse(localStorage.getItem("data"));
// // 게임 시작 전 데이터
// global.ChoiceCat = 0;
// global.ChoiceLevel = 0;

// //경험치
// global.exp = 0;
// global.level = 0;

// global.pause = false;
// global.isUpgrade = false;
// global.isLevelup = false;

// function Init() {
//   StartPageInit(); //스타트 페이지 init
//   CharPageInit(); // 캐릭터 페이지 init
// }

// function SaveData() {
//   localStorage.setItem("data", JSON.stringify(LocalData));
// }
// export { SaveData };

// Init();
//---------------------------------------------------------------------------
// 코드 모드 함수 예시

// 버튼 생성--------------------------------------------
const submitbtn = document.createElement("button");
submitbtn.style.width = "70px";
submitbtn.style.height = "40px";
submitbtn.style.position = "absolute";
submitbtn.textContent = "제출하기";
submitbtn.addEventListener("click", submit);

const app = document.getElementById("app");
app.appendChild(submitbtn);
//------------------------------------------------

import { run } from "../../CodeMode/CodeMode"; //바탕 화면이나 문서 경로에 저장

// 유저가 쓸 함수 ----------------------------------------
export function hello() {
  console.log("hello world");
}

export function heycode() {
  console.log("heycode");
}

export function exit() {
  console.log("exit");
}

export function selectpos(y, x) {
  console.log(y, x);
  submitbtn.style.left = `${x}px`;
  submitbtn.style.top = `${y}px`;
}
// --------------------------------------------

function submit() {
  run();
}
//----------------------------------------------------------------------------
