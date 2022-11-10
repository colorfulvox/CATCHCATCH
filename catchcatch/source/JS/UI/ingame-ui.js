import "../../CSS/UI/inGameUI.css";
import { CharSpaceOn } from "./char-space.js";

let _timerTxt = document.createElement("div");
let _minute = 0;
let _second = 0;

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
  const fairyBack = [
    "wizardBack",
    "reaperBack",
    "ninjaBack",
    "slimeBack",
    "witchBack",
  ];
  const gameContainer = document.querySelector("#game-container");
  // const progress = document.createElement("progress");

  _timerTxt.setAttribute("class", "Timer");
  gameContainer.appendChild(_timerTxt);
  _minute = 0;
  _second = 0;

  _timerTxt.textContent = `${_minute}:${_second}`;

  // 쿨타임
  const coolContainer = document.createElement("div");
  coolContainer.setAttribute("class", "coolContainer");
  const html = document.querySelector("html");
  fairy.map((el, idx) => {
    html.style.setProperty(`--${fairyName[idx]}`, fairy[idx].skillCD / 60);
    const div = document.createElement("div");
    div.setAttribute("class", "fairy");
    const img = document.createElement("img");
    img.src = `images/ui/Icon/char/fairy${idx + 1}.png`;
    div.classList.add(`${fairyName[idx]}`);
    img.classList.add(`${fairyActive[idx]}`);
    img.innerText = "요정";
    div.appendChild(img);
    const back = document.createElement("div");
    back.setAttribute("class", `${fairyBack[idx]}`);
    back.classList.add(`back`);
    div.appendChild(back);
    coolContainer.appendChild(div);
  });

  if (isTutorial) {
    const img = document.createElement("img");
    img.setAttribute("class", "tutorialKey");
    img.src = "images/ui/tutorial/tutorial_keyboard.png";
    const mouse = document.createElement("img");
    mouse.setAttribute("class", "tutorialMouse");
    mouse.src = "images/ui/tutorial/tutorial_mouse.png";
    gameContainer.appendChild(img);
    gameContainer.appendChild(mouse);

    const skill = document.createElement("img");
    skill.setAttribute("class", "tutorialNumber");
    skill.src = "images/ui/tutorial/tutorial_number.png";
    const space = document.createElement("img");
    space.setAttribute("class", "tutorialSpace");
    space.src = "images/ui/tutorial/tutorial_spacebar.png";
    gameContainer.appendChild(space);
    gameContainer.appendChild(skill);

    const stat = document.createElement("img");
    stat.setAttribute("class", "tutorialStat");
    stat.src = "images/ui/tutorial/tutorial_shift.png";
    gameContainer.appendChild(stat);

    setTimeout(() => {
      gameContainer.removeChild(img);
      gameContainer.removeChild(space);
      gameContainer.removeChild(skill);
      gameContainer.removeChild(mouse);
      gameContainer.removeChild(stat);
    }, 7000);
  }
  gameContainer.appendChild(coolContainer);
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

export function GoHome() {
  window.location.reload();
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
  const fairyBack = [
    "wizardBack",
    "reaperBack",
    "ninjaBack",
    "slimeBack",
    "witchBack",
  ];
  const div = document.querySelector(`${fairyName[num]}`);
  const html = document.querySelector("html");
  // html.style.setProperty(`--${fairyName[num]}`, `${fairy[num].skillCD a/ 60}s`);
  const back = document.querySelector(`.${fairyBack[num]}`);

  back.style.background = "rgba(255,0,0,0.7)";
  back.style.top = `${(fairy[num].timer * 100) / fairy[num].skillCD}%`;
  back.style.display = "block";
  // if (div.classList.length === 3) {
  //   div.classList.remove(`${fairyActive[num]}`);
  // }
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
  // if (div.childNodes.length !== 3) {
  //   div.style.background = "";
  //   div.classList.add(`${fairyActive[num]}`);

  //   coolContainer.replaceChild(coolContainer.childNodes[num], div);
  // }
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

function ChangeWeapon() {
  const gameContainer = document.querySelector("#game-container");
  const img = document.createElement("img");
  img.setAttribute("class", "tutorialNumber");
  img.src = "images/ui/tutorial/tutorial_number.png";
  const space = document.createElement("img");
  space.setAttribute("class", "tutorialSpace");
  space.src = "images/ui/tutorial/tutorial_spacebar.png";
  gameContainer.appendChild(space);
  gameContainer.appendChild(img);

  setTimeout(() => {
    gameContainer.removeChild(img);
    gameContainer.removeChild(space);
    // ShowUI();
  }, 5000);
}

// function ShowUI() {
//   const gameContainer = document.querySelector("#game-container");
//   const level = document.createElement("img");
//   const hp = document.createElement("img");
//   const coin = document.createElement("img");

//   level.src = "images/ui/tutorial/tutorial_level.png";
//   hp.src = "images/ui/tutorial/tutorial_hp.png";
//   coin.src = "images/ui/tutorial/tutorial_coin.png";

//   level.setAttribute("class", "tutorialLevel");
//   hp.setAttribute("class", "tutorialHp");
//   coin.setAttribute("class", "tutorialCoin");

//   gameContainer.appendChild(level);
//   gameContainer.appendChild(hp);
//   gameContainer.appendChild(coin);
// }
