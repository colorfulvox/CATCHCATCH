import "../../CSS/UI/inGameUI.css";

export default function inGameUI() {
  const gameContainer = document.querySelector("#game-container");
  const progress = document.createElement("progress");
  progress.setAttribute("id", "progress");
  progress.setAttribute("value", exp);
  progress.setAttribute("max", 3);
  gameContainer.appendChild(progress);
}

export function updateExp() {
  const progress = document.querySelector("#progress");
  progress.setAttribute("value", exp);
}
