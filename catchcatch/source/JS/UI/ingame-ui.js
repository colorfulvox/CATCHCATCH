import "../../CSS/UI/inGameUI.css";
import { CharSpaceOn } from "./char-space.js";
import { SaveData } from "../../main.js";

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

  const levelText = document.createElement("div");
  levelText.setAttribute("class", "levelText");
  levelText.innerText = `Lv.${player.level}`;
  gameContainer.appendChild(levelText);

  _timerTxt.setAttribute("class", "Timer");
  gameContainer.appendChild(_timerTxt);
  _minute = 10;
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
    img.src = `images/ui/Icon/cool/fairy${idx + 1}.png`;
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
    }, 10000);
  }
  gameContainer.appendChild(coolContainer);

  // GameOver();
}

export function updateExp() {
  const levelText = document.querySelector(".levelText");
  levelText.innerText = `Lv.${player.level}`;
}

export function GameOver() {
  const gameContainer = document.querySelector("#game-container");

  const GameClearSpace = document.createElement("div");
  GameClearSpace.setAttribute("class", "GameClearSpace");

  const FailText = document.createElement("div");
  FailText.setAttribute("class", "FailText");
  // ClearText.textContent = "GameClear!";

  GameClearSpace.appendChild(FailText);

  const resultspace = document.createElement("div");
  resultspace.setAttribute("class", "resultspace");
  GameClearSpace.appendChild(resultspace);

  const canimg = document.createElement("div");
  canimg.setAttribute("class", "canimg");
  resultspace.appendChild(canimg);

  const cantxt = document.createElement("div");
  cantxt.setAttribute("class", "cantxt");
  resultspace.appendChild(cantxt);

  let cancount;
  if (ChoiceLevel === 0) {
    cancount = parseInt(global.killCount / 30);
  } else if (ChoiceLevel === 1) {
    cancount = parseInt(global.killCount / 25);
  } else if (ChoiceLevel === 2) {
    cancount = parseInt(global.killCount / 20);
  }
  cancount += inGameCoin;
  cantxt.textContent = "x" + cancount;

  // cantxt.textContent = "x20";
  global.LocalData.Coin += cancount;
  SaveData();

  const GoHomeBtn = document.createElement("button");
  GoHomeBtn.setAttribute("class", "GoHomeBtn");
  // GoHomeBtn.style.backgroundImage = "url('images/ui/homeslot.png')";

  GoHomeBtn.addEventListener("click", GoHome);

  GameClearSpace.appendChild(GoHomeBtn);

  gameContainer.appendChild(GameClearSpace);
}

export function UpdateTimer() {
  if (_minute < 1) {
    _timerTxt.style.color = "red";
  }
  if (global.gameTimer !== 0 && global.gameTimer % 60 === 0) {
    --_second;
    if (_second === -1) {
      --_minute;
      _second = 59;
    }
  }
  if (_second < 10) {
    if (_minute < 10) _timerTxt.textContent = `0${_minute}:0${_second}`;
    else _timerTxt.textContent = `${_minute}:0${_second}`;
  } else if (_minute < 10) {
    if (_second < 10) _timerTxt.textContent = `0${_minute}:0${_second}`;
    else _timerTxt.textContent = `0${_minute}:${_second}`;
  } else _timerTxt.textContent = `w${_minute}:${_second}`;

  if (_minute === 0 && _second === 0) {
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
  // ClearText.textContent = "GameClear!";

  GameClearSpace.appendChild(ClearText);

  const resultspace = document.createElement("div");
  resultspace.setAttribute("class", "resultspace");
  GameClearSpace.appendChild(resultspace);

  const canimg = document.createElement("div");
  canimg.setAttribute("class", "canimg");
  resultspace.appendChild(canimg);

  const cantxt = document.createElement("div");
  cantxt.setAttribute("class", "cantxt");
  resultspace.appendChild(cantxt);

  let cancount;
  if (ChoiceLevel === 0) {
    cancount = parseInt(global.killCount / 30);
  } else if (ChoiceLevel === 1) {
    cancount = parseInt(global.killCount / 25);
  } else if (ChoiceLevel === 2) {
    cancount = parseInt(global.killCount / 20);
  }
  cantxt.textContent = "x" + cancount;
  // cantxt.textContent = "x20";
  global.LocalData.Coin += cancount;
  SaveData();

  const GoHomeBtn = document.createElement("button");
  GoHomeBtn.setAttribute("class", "GoHomeBtn");
  GoHomeBtn.style.backgroundImage = "url('images/ui/homeslot.png')";

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
  if (boss === "슬라임 킹") {
    div.innerHTML = `<p style="color: red">${boss} 보스가 등장합니다.</p>`;
  } else if (boss === "골렘") {
    div.innerHTML = `<p style="color: red">${boss} 보스가 등장합니다.</p>`;
  } else if (boss === "불거인") {
    div.innerHTML = `<p style="color: red">${boss} 보스가 등장합니다.</p>`;
  } else if (boss === "피버") {
    div.innerHTML = `<p class="fever">FEVER Time</P>`;
  } else {
    div.innerHTML = `<p style="color: red">${boss}가 몰려옵니다.</p>`;
  }
  gameContainer.appendChild(div);
  setTimeout(() => {
    div.innerHTML = "";
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
