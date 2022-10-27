import "../../CSS/UI/inGameUI.css";

export default function inGameUI() {
  const gameContainer = document.querySelector("#game-container");
  const progress = document.createElement("progress");
  const stats = document.createElement("div");
  const health = document.createElement("div");
  const attack = document.createElement("div");
  const speed = document.createElement("div");
  progress.setAttribute("id", "progress");
  progress.setAttribute("value", player.exp);
  progress.setAttribute("max", 100);
  stats.setAttribute("class", "stats");
  health.setAttribute("class", "stat");
  attack.setAttribute("class", "stat");
  speed.setAttribute("class", "stat");
  health.innerText = `${player.healLevel}Lv`;
  attack.innerText = `${player.dmgmulLevel}Lv`;
  speed.innerText = `${player.speedLevel}Lv`;
  stats.appendChild(health);
  stats.appendChild(attack);
  stats.appendChild(speed);
  gameContainer.appendChild(progress);
  gameContainer.appendChild(stats);
}

export function updateExp() {
  const progress = document.querySelector("#progress");
  progress.setAttribute("value", player.exp);
}
