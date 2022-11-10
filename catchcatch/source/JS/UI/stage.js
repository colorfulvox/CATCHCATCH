import "../../CSS/UI/stagepage.css";
import { StartBtnOn } from "./start-page.js";
import { codeConfig, config } from "../GAME/code.js";
import { setSound } from "../SOUND/sound";

const diff = [1, 2, 3, 4, 5, 6];
const fsize = ["30px"];
const txt = [
  "몬스터x10",
  "몬스터x10\n랜덤 위치",
  "몬스터x10\n랜덤 위치+타입",
  "몬스터x10\n랜덤 위치+타입\n고양이x5",
  "몬스터x10\n랜덤 위치+타입\n고양이x5+이동",
  "랭킹전 ",
];
global.stageNum = 0;

global.debugmode = false;

export default function Stage() {
  const $app = document.querySelector("#app");
  const stagePage = document.createElement("div");
  stagePage.setAttribute("class", "stagePage");

  let _BackIcon = document.createElement("button");
  _BackIcon.className = "BackIcon";
  stagePage.appendChild(_BackIcon);
  _BackIcon.addEventListener("click", BackStart);

  let debugmode = document.createElement("div");
  debugmode.className = "debugmode";
  stagePage.appendChild(debugmode);
  debugmode.textContent = "디버깅 모드";

  let debugicon = document.createElement("input");
  debugicon.type = "checkbox";
  debugicon.className = "debugicon";
  debugmode.appendChild(debugicon);

  for (let i = 0; i < 6; i++) {
    const stage = document.createElement("div");
    stage.setAttribute("class", "stage");

    const stagelevel = document.createElement("div");
    stagelevel.setAttribute("class", "stagelevel");
    stage.appendChild(stagelevel);

    for (let j = 0; j < diff[i]; ++j) {
      const stagestar = document.createElement("img");
      stagestar.setAttribute("class", "stagestar");
      stagestar.src = "/images/ui/StageStar.png";

      stagelevel.appendChild(stagestar);
    }
    const stageText = document.createElement("div");
    stageText.setAttribute("class", "stageText");
    stageText.innerText = txt[i];
    if (i === 0 || i === 5) stageText.style.marginTop = "50px";
    if (i === 5) stageText.style.fontSize = "30px";
    if (i === 4 || i === 3) stageText.style.marginTop = "30px";
    // const stageDiff = document.createElement("div");
    // stageDiff.setAttribute("class", "stageDiff");
    // for (let j = 0; j < diff[i]; j++) {
    // const star = document.createElement("img");
    // star.src = "images/ui/Icon/sample.png";
    // stageDiff.appendChild(star);
    // }
    stage.appendChild(stageText);
    // stage.appendChild(stageDiff);

    stagePage.appendChild(stage);
    stage.addEventListener("click", () => {
      if (debugicon.checked === true) {
        global.debugmode = true;
      } else global.debugmode = false;
      config();
      setSound.playSE(24);
      stagePage.style.display = "none";
      stageNum = i + 1;
      global.codeGame = new Phaser.Game(codeConfig);
      const gameContainer = document.querySelector("#game-container");
      gameContainer.style.display = "block";
    });
  }
  $app.appendChild(stagePage);
}

function BackStart() {
  OffStage();
  StartBtnOn();
}

function OffStage() {
  const stagePage = document.querySelector(".stagePage");
  const StartPage = document.querySelector(".StartPage");
  const app = document.querySelector("#app");
  StartPage.style.display = "flex";
  app.removeChild(stagePage);
  StartBtnOn();
}
