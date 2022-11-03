import "../../CSS/UI/stagepage.css";
import { StartBtnOn } from "./start-page.js";
import { codeConfig } from "../GAME/code.js";

const diff = [1, 1, 2, 3, 4, 5];
global.stageNum = 0;

export default function Stage() {
  const $app = document.querySelector("#app");
  const stagePage = document.createElement("div");
  stagePage.setAttribute("class", "stagePage");

  let _BackIcon = document.createElement("button");
  _BackIcon.className = "BackIcon";
  stagePage.appendChild(_BackIcon);
  _BackIcon.addEventListener("click", BackStart);

  for (let i = 0; i < 6; i++) {
    const stage = document.createElement("div");
    stage.setAttribute("class", "stage");
    const stageText = document.createElement("div");
    stageText.setAttribute("class", "stageText");
    stageText.innerText = `${i + 1}`;
    const stageDiff = document.createElement("div");
    stageDiff.setAttribute("class", "stageDiff");
    for (let j = 0; j < diff[i]; j++) {
      const star = document.createElement("img");
      star.src = "images/ui/Icon/sample.png";
      stageDiff.appendChild(star);
    }
    stage.appendChild(stageText);
    stage.appendChild(stageDiff);
    stagePage.appendChild(stage);
    stage.addEventListener("click", () => {
      stagePage.style.display = "none";
      stageNum = i + 1;
      let game = new Phaser.Game(codeConfig);
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
  StartPage.style.display = "flex";
  stagePage.style.display = "none";
  StartBtnOn();
}
