import "../../CSS/UI/inCodeUI.css";
import Stage from "./stage.js";
import { codeConfig } from "../GAME/code.js";

export default function IncodeUI() {
  const gameContainer = document.querySelector("#game-container");

  const pin = document.createElement("div");
  pin.setAttribute("class", "pin");
  pin.innerText = "핀 번호 : " + global.PinNumber;
  pin.style.textAlign = "center";
  pin.style.lineHeight = "100px";
  pin.style.fontSize = "large";

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

  gameContainer.appendChild(pin);
  gameContainer.appendChild(buttonContainer);
}

function BacktoStage() {
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "none";
  const pin = document.querySelector(".pin");
  const buttonContainer = document.querySelector(".buttonContainer");
  gameContainer.removeChild(pin);
  gameContainer.removeChild(buttonContainer);
  const app = document.querySelector("#app");
  const stagePage = document.querySelector(".stagePage");
  app.removeChild(stagePage);
  codeGame.destroy(true);
  codeGame = null;
  Stage();
}

function Replay() {
  const gameContainer = document.querySelector("#game-container");
  const pin = document.querySelector(".pin");
  const buttonContainer = document.querySelector(".buttonContainer");
  gameContainer.removeChild(pin);
  gameContainer.removeChild(buttonContainer);
  codeGame.destroy(true);
  codeGame = null;
  codeGame = new Phaser.Game(codeConfig);
  let Data = {
    action: "endGame",
    pinnumber: PinNumber,
  };
  socket.send(JSON.stringify(Data));
}
