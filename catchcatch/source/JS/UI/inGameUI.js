import "../../CSS/UI/inGameUI.css";

export default function inGameUI() {
  const gameContainer = document.querySelector("#game-container");
  const progress = document.createElement("progress");
  const stats = document.createElement("div");
  const heal = document.createElement("div");
  const dmgmul = document.createElement("div");
  const speed = document.createElement("div");
  progress.setAttribute("id", "progress");
  progress.setAttribute("value", player.exp);
  progress.setAttribute("max", 100);
  stats.setAttribute("class", "stats");
  heal.setAttribute("class", "stat");
  dmgmul.setAttribute("class", "stat");
  speed.setAttribute("class", "stat");
  heal.setAttribute("id", "heal");
  dmgmul.setAttribute("id", "dmgmul");
  speed.setAttribute("id", "speed");
  heal.innerText = `${player.healLevel}Lv`;
  dmgmul.innerText = `${player.dmgmulLevel}Lv`;
  speed.innerText = `${player.speedLevel}Lv`;
  stats.appendChild(heal);
  stats.appendChild(dmgmul);
  stats.appendChild(speed);
  gameContainer.appendChild(progress);
  gameContainer.appendChild(stats);
}

export function updateExp() {
  const progress = document.querySelector("#progress");
  const heal = document.querySelector("#heal");
  const dmgmul = document.querySelector("#dmgmul");
  const speed = document.querySelector("#speed");
  heal.innerText = `${player.healLevel}Lv`;
  dmgmul.innerText = `${player.dmgmulLevel}Lv`;
  speed.innerText = `${player.speedLevel}Lv`;
  progress.setAttribute("value", player.exp);
}
