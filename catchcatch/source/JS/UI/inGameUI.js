import "../../CSS/UI/inGameUI.css";
import { CharSpaceOn } from "./CharSpace.js";

let Timertxt = document.createElement("div");
let Minute = 0;
let Second = 0;

let _catcoin;

export default function inGameUI() {
  const gameContainer = document.querySelector("#game-container");
  // const progress = document.createElement("progress");

  const holeHP = document.createElement("div");
  holeHP.setAttribute("class", "holeHP");
  const hp = document.createElement("div");
  hp.setAttribute("class", "hp");
  hp.innerText = hole.hp;
  holeHP.appendChild(hp);
  gameContainer.appendChild(holeHP);

  _catcoin = document.createElement("div");
  _catcoin.setAttribute("class", "catcoin");
  _catcoin.setAttribute("id", "catcoin");
  _catcoin.textContent = global.coin + " Coin";

  const stats = document.createElement("div");
  const heal = document.createElement("div");
  const healtxt = document.createElement("div");

  const dmgmul = document.createElement("div");
  const dmgmultxt = document.createElement("div");

  const speed = document.createElement("div");
  const speedtxt = document.createElement("div");

  Timertxt.setAttribute("class", "Timer");
  gameContainer.appendChild(Timertxt);
  Minute = 0;
  Second = 0;

  Timertxt.textContent = `${Minute}:${Second}`;

  // progress.setAttribute("id", "progress");
  // progress.setAttribute("value", player.exp);
  // progress.setAttribute("max", 100);
  stats.setAttribute("class", "stats");
  heal.setAttribute("class", "stat");
  healtxt.setAttribute("class", "healtxt");

  dmgmul.setAttribute("class", "stat");
  dmgmultxt.setAttribute("class", "dmgmultxt");

  speed.setAttribute("class", "stat");
  speedtxt.setAttribute("class", "speedtxt");

  heal.setAttribute("id", "heal");
  heal.style.backgroundImage = "url('../images/ui/Icon/sample.png')";
  heal.style.backgroundPosition = "center";
  heal.style.backgroundRepeat = "no-repeat";
  heal.style.backgroundSize = "contain";

  dmgmul.setAttribute("id", "dmgmul");
  dmgmul.style.backgroundImage = "url('../images/ui/Icon/sample.png')";
  dmgmul.style.backgroundPosition = "center";
  dmgmul.style.backgroundRepeat = "no-repeat";
  dmgmul.style.backgroundSize = "contain";

  speed.setAttribute("id", "speed");
  speed.style.backgroundImage = "url('../images/ui/Icon/sample.png')";
  speed.style.backgroundPosition = "center";
  speed.style.backgroundRepeat = "no-repeat";
  speed.style.backgroundSize = "contain";

  healtxt.innerText = `Lv.${player.healLevel}`;
  heal.appendChild(healtxt);
  dmgmultxt.innerText = `Lv.${player.dmgmulLevel}`;
  dmgmul.appendChild(dmgmultxt);
  speedtxt.innerText = `Lv.${player.speedLevel}`;
  speed.appendChild(speedtxt);

  stats.appendChild(_catcoin);
  stats.appendChild(heal);
  stats.appendChild(dmgmul);
  stats.appendChild(speed);
  // gameContainer.appendChild(progress);
  gameContainer.appendChild(stats);
}

export function updateExp() {
  // const progress = document.querySelector("#progress");
  const heal = document.querySelector(".healtxt");
  const dmgmul = document.querySelector(".dmgmultxt");
  const speed = document.querySelector(".speedtxt");
  heal.innerText = `Lv.${player.healLevel}`;
  dmgmul.innerText = `Lv.${player.dmgmulLevel}`;
  speed.innerText = `Lv.${player.speedLevel} `;
  // progress.setAttribute("value", player.exp);
}

export function updateHP() {
  // console.log(hole.hp);
  const holeHP = document.querySelector(".holeHP");
  const hp = document.querySelector(".hp");
  hp.innerText = hole.hp;
}

export function gameover() {
  const gameContainer = document.querySelector("#game-container");
  const gameoverContainer = document.createElement("div");
  gameoverContainer.setAttribute("class", "gameoverContainer");
  const gameover = document.createElement("div");
  gameover.setAttribute("class", "gameover");
  gameover.innerText = "GAME OVER";
  const again = document.createElement("div");
  again.innerText = "다시하기";
  again.setAttribute("class", "again");
  again.addEventListener("click", () => {
    // gameContainer.innerHTML = "";
    // gameContainer.style.display = "none";
    // const startPage = document.querySelector(".StartPage");
    // startPage.style.display = "flex";
    // gameContainer.removeChild(gameoverContainer);
    // CharSpaceOn();
    // $this.restart();
    window.location.reload();
  });
  gameoverContainer.appendChild(gameover);
  gameoverContainer.appendChild(again);
  gameContainer.appendChild(gameoverContainer);
}
export function Updatetimer() {
  if (global.gameTimer != 0 && global.gameTimer % 95 === 0) {
    ++Second;
    if (Second === 60) {
      ++Minute;
      Second = 0;
    }
  }
  if (Second < 10) {
    if (Minute < 10) Timertxt.textContent = `0${Minute}:0${Second}`;
    else Timertxt.textContent = `${Minute}:0${Second}`;
  } else if (Minute < 10) {
    if (Second < 10) Timertxt.textContent = `0${Minute}:0${Second}`;
    else Timertxt.textContent = `0${Minute}:${Second}`;
  } else Timertxt.textContent = `w${Minute}:${Second}`;

  if (Minute === 20) {
    $this.pause();
    GameClear();
    //게임클리어
  }
}

function GameClear() {
  // 게임 중지
  const gameContainer = document.querySelector("#game-container");

  const GameClearSpace = document.createElement("div");
  GameClearSpace.setAttribute("class", "GameClearSpace");

  const ClearText = document.createElement("div");
  ClearText.setAttribute("class", "ClearText");
  ClearText.textContent = "GameClear!";

  GameClearSpace.appendChild(ClearText);

  const GoHomeBtn = document.createElement("button");
  GoHomeBtn.setAttribute("class", "GoHomeBtn");
  GoHomeBtn.textContent = "홈으로";

  GoHomeBtn.addEventListener("click", GoHome);

  GameClearSpace.appendChild(GoHomeBtn);

  gameContainer.appendChild(GameClearSpace);
}

function GoHome() {
  window.location.reload();
}

export function UpdateCatCoin() {
  _catcoin.textContent = global.coin + " Coin";
}
