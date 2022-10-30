import "../../CSS/UI/inGameUI.css";
import { CharSpaceOn } from "./CharSpace.js";

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
  const _catcoin = document.createElement("div");
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
  if (hole.hp >= 0) {
    const holeHP = document.querySelector(".holeHP");
    const hp = document.querySelector(".hp");
    hp.innerText = hole.hp;
  }
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
