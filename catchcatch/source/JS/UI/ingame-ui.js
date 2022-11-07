import "../../CSS/UI/inGameUI.css";
import { CharSpaceOn } from "./char-space.js";

let _timerTxt = document.createElement("div");
let _minute = 0;
let _second = 0;

let _catCoin;

export default function ingameUi() {
  const fairy = [wizard, reaper, ninja, slime, witch];
  const fairyName = ["wizard", "reaper", "ninja", "slime", "witch"];
  const fairyActive = [
    "wizardActive",
    "reaperActive",
    "ninjaActive",
    "slimeActive",
    "witchActive",
  ];
  const gameContainer = document.querySelector("#game-container");
  // const progress = document.createElement("progress");

  const holeHp = document.createElement("div");
  holeHp.setAttribute("class", "holeHp");
  const hp = document.createElement("div");
  hp.setAttribute("class", "hp");
  hp.innerText = hole.hp;
  holeHp.appendChild(hp);
  gameContainer.appendChild(holeHp);

  _catCoin = document.createElement("div");
  _catCoin.setAttribute("class", "catCoin");
  _catCoin.setAttribute("id", "catCoin");
  _catCoin.textContent = player.coin + " Coin";

  const stats = document.createElement("div");
  const heal = document.createElement("div");
  const healTxt = document.createElement("div");

  const dmgMul = document.createElement("div");
  const dmgMulTxt = document.createElement("div");

  const speed = document.createElement("div");
  const speedTxt = document.createElement("div");

  _timerTxt.setAttribute("class", "Timer");
  gameContainer.appendChild(_timerTxt);
  _minute = 0;
  _second = 0;

  _timerTxt.textContent = `${_minute}:${_second}`;

  // progress.setAttribute("id", "progress");
  // progress.setAttribute("value", player.exp);
  // progress.setAttribute("max", 100);
  stats.setAttribute("class", "stats");
  heal.setAttribute("class", "stat");
  healTxt.setAttribute("class", "healTxt");

  dmgMul.setAttribute("class", "stat");
  dmgMulTxt.setAttribute("class", "dmgMulTxt");

  speed.setAttribute("class", "stat");
  speedTxt.setAttribute("class", "speedTxt");

  heal.setAttribute("id", "heal");
  heal.style.backgroundImage = "url('images/ui/Icon/sample.png')";
  heal.style.backgroundPosition = "center";
  heal.style.backgroundRepeat = "no-repeat";
  heal.style.backgroundSize = "contain";

  dmgMul.setAttribute("id", "dmgMul");
  dmgMul.style.backgroundImage = "url('images/ui/Icon/sample.png')";
  dmgMul.style.backgroundPosition = "center";
  dmgMul.style.backgroundRepeat = "no-repeat";
  dmgMul.style.backgroundSize = "contain";

  speed.setAttribute("id", "speed");
  speed.style.backgroundImage = "url('images/ui/Icon/sample.png')";
  speed.style.backgroundPosition = "center";
  speed.style.backgroundRepeat = "no-repeat";
  speed.style.backgroundSize = "contain";

  healTxt.innerText = `Lv.${player.healLevel}`;
  heal.appendChild(healTxt);
  dmgMulTxt.innerText = `Lv.${player.dmgMulLevel}`;
  dmgMul.appendChild(dmgMulTxt);
  speedTxt.innerText = `Lv.${player.speedLevel}`;
  speed.appendChild(speedTxt);

  stats.appendChild(_catCoin);
  stats.appendChild(heal);
  stats.appendChild(dmgMul);
  stats.appendChild(speed);
  // gameContainer.appendChild(progress);

  // 쿨타임
  const coolContainer = document.createElement("div");
  coolContainer.setAttribute("class", "coolContainer");
  const html = document.querySelector("html");
  fairy.map((el, idx) => {
    html.style.setProperty(`--${fairyName[idx]}`, fairy[idx].skillCD / 60);
    const div = document.createElement("img");
    div.setAttribute("class", "fairy");
    div.src = `images/ui/Icon/char/fairy${idx + 1}.png`;
    div.classList.add(`${fairyName[idx]}`);
    div.classList.add(`${fairyActive[idx]}`);
    div.innerText = "요정";
    coolContainer.appendChild(div);
  });
  gameContainer.appendChild(coolContainer);
  gameContainer.appendChild(stats);
}

export function updateExp() {
  // const progress = document.querySelector("#progress");
  const heal = document.querySelector(".healTxt");
  const dmgMul = document.querySelector(".dmgMulTxt");
  const speed = document.querySelector(".speedTxt");
  heal.innerText = `Lv.${player.healLevel}`;
  dmgMul.innerText = `Lv.${player.dmgMulLevel}`;
  speed.innerText = `Lv.${player.speedLevel} `;
  // progress.setAttribute("value", player.exp);
}

export function updateHP() {
  // console.log(hole.hp);
  const holeHp = document.querySelector(".holeHp");
  const hp = document.querySelector(".hp");
  hp.innerText = hole.hp;
}

export function GameOver() {
  const gameContainer = document.querySelector("#game-container");
  const gameOverContainer = document.createElement("div");
  gameOverContainer.setAttribute("class", "gameOverContainer");
  const gameOver = document.createElement("div");
  gameOver.setAttribute("class", "gameOver");
  gameOver.innerText = "GAME OVER";
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
  gameOverContainer.appendChild(gameOver);
  gameOverContainer.appendChild(again);
  gameContainer.appendChild(gameOverContainer);
}

export function UpdateTimer() {
  if (global.gameTimer !== 0 && global.gameTimer % 60 === 0) {
    ++_second;
    if (_second === 60) {
      ++_minute;
      _second = 0;
    }
  }
  if (_second < 10) {
    if (_minute < 10) _timerTxt.textContent = `0${_minute}:0${_second}`;
    else _timerTxt.textContent = `${_minute}:0${_second}`;
  } else if (_minute < 10) {
    if (_second < 10) _timerTxt.textContent = `0${_minute}:0${_second}`;
    else _timerTxt.textContent = `0${_minute}:${_second}`;
  } else _timerTxt.textContent = `w${_minute}:${_second}`;

  if (_minute === 20) {
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
  _catCoin.textContent = player.coin + " Coin";
}

export function useSkill(num) {
  const fairy = [wizard, reaper, ninja, slime, witch];
  const fairyName = ["wizard", "reaper", "ninja", "slime", "witch"];
  const fairyActive = [
    "wizardActive",
    "reaperActive",
    "ninjaActive",
    "slimeActive",
    "witchActive",
  ];
  const coolContainer = document.querySelector(".coolContainer");
  const html = document.querySelector("html");
  // html.style.setProperty(`--${fairyName[num]}`, `${fairy[num].skillCD a/ 60}s`);
  const div = document.querySelector(`.${fairyName[num]}`);

  div.style.background = `conic-gradient(rgba(255,255,255,1) var(--percentage), rgba(0,0,0,1) ${
    (fairy[num].timer * 100) / fairy[num].skillCD
  }%)`;
  if (div.classList.length === 3) {
    div.classList.remove(`${fairyActive[num]}`);
  }
  coolContainer.replaceChild(coolContainer.childNodes[num], div);
}

export function canSkill(num) {
  const fairyActive = [
    "wizardActive",
    "reaperActive",
    "ninjaActive",
    "slimeActive",
    "witchActive",
  ];
  const fairyName = ["wizard", "reaper", "ninja", "slime", "witch"];
  const coolContainer = document.querySelector(".coolContainer");
  const div = document.querySelector(`.${fairyName[num]}`);
  if (div.childNodes.length !== 3) {
    div.style.background = "";
    div.classList.add(`${fairyActive[num]}`);

    coolContainer.replaceChild(coolContainer.childNodes[num], div);
  }
}

export function messageBoss(boss) {
  const gameContainer = document.querySelector("#game-container");
  const div = document.createElement("div");
  div.setAttribute("class", "bossMessage");
  console.log(boss);
  if (boss === "슬라임 킹") {
    div.innerHTML = `<p style="color: red">${boss} 보스가 등장합니다.</p>`;
  } else if (boss === "골렘") {
    div.innerHTML = `<p style="color: red">${boss} 보스가 등장합니다.</p>`;
  } else if (boss === "불거인") {
    div.innerHTML = `<p style="color: red">${boss} 보스가 등장합니다.</p>`;
  } else {
    div.innerHTML = `<p style="color: red">${boss}가 몰려옵니다.</p>`;
  }
  gameContainer.appendChild(div);
  setTimeout(() => {
    div.innerHTML = "";
    console.log(123);
  }, 10000);
}
