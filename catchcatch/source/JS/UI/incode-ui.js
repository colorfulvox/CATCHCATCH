import "../../CSS/UI/inCodeUI.css";
import Stage from "./stage.js";

export default function IncodeUI() {
  const gameContainer = document.querySelector("#game-container");

  const pin = document.createElement("div");
  pin.setAttribute("class", "pin");
  pin.innerText = "핀번호";

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "buttonContainer");

  const backBtn = document.createElement("div");
  backBtn.innerText = "뒤로가기";
  backBtn.setAttribute("class", "backBtn");
  backBtn.addEventListener("click", BacktoStage);

  const reBtn = document.createElement("div");
  reBtn.innerText = "다시하기";
  reBtn.setAttribute("class", "reBtn");
  reBtn.addEventListener("click", Replay);

  buttonContainer.appendChild(backBtn);
  buttonContainer.appendChild(reBtn);

  const textContainer = document.createElement("div");
  textContainer.setAttribute("class", "textContainer");

  const bullet = document.createElement("div");
  bullet.setAttribute("class", "bullet");
  bullet.innerText = "총알수";

  const monsterAmount = document.createElement("div");
  monsterAmount.setAttribute("class", "monsterAmount");
  monsterAmount.innerText = "남은 몬스터 수 ";

  textContainer.appendChild(bullet);
  textContainer.appendChild(monsterAmount);

  gameContainer.appendChild(pin);
  gameContainer.appendChild(buttonContainer);
  gameContainer.appendChild(textContainer);
}

export function updateMoster() {
  const monsterAmount = document.querySelector(".monsterAmount");
  monsterAmount.innerText = "남은 몬스터 수 ";
}

export function updateBullet() {
  const bullet = document.querySelector(".bullet");
  bullet.innerText = "총알 수 ";
}

function BacktoStage() {
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "none";
  Stage();
}

function Replay() {}
