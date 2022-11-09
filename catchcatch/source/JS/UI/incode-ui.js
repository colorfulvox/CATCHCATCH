import "../../CSS/UI/inCodeUI.css";
import Stage from "./stage.js";
import { codeConfig } from "../GAME/code.js";

let inputspace;

export let showscore;

export default function IncodeUI() {
  const gameContainer = document.querySelector("#game-container");

  const pin = document.createElement("div");
  pin.setAttribute("class", "pin");
  pin.innerText = global.PinNumber;
  pin.style.textAlign = "center";
  pin.style.lineHeight = "60px";
  // pin.style.fontSize = "large";

  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "buttonContainer");

  const backBtn = document.createElement("div");
  // backBtn.innerText = "뒤로가기";
  backBtn.setAttribute("class", "backBtn");
  backBtn.addEventListener("click", BacktoStage);

  const reBtn = document.createElement("div");
  // reBtn.innerText = "다시하기";
  reBtn.setAttribute("class", "reBtn");
  reBtn.addEventListener("click", Replay);

  showscore = document.createElement("div");
  showscore.setAttribute("class", "showscore");
  showscore.textContent = "0 Score";

  gameContainer.appendChild(showscore);

  buttonContainer.appendChild(backBtn);
  buttonContainer.appendChild(reBtn);

  gameContainer.appendChild(pin);
  gameContainer.appendChild(buttonContainer);

  // makeranking();
  // codegameclear();
}

function BacktoStage() {
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "none";
  const pin = document.querySelector(".pin");
  const buttonContainer = document.querySelector(".buttonContainer");

  const rankingpanel = document.querySelector(".rankingpanel");
  const resultpanel = document.querySelector(".resultpanel");
  const tempshowscore = document.querySelector(".showscore");

  gameContainer.removeChild(pin);
  gameContainer.removeChild(buttonContainer);
  gameContainer.removeChild(tempshowscore);

  if (rankingpanel != null) gameContainer.removeChild(rankingpanel);
  if (resultpanel != null) gameContainer.removeChild(resultpanel);

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

export function makeranking() {
  const gameContainer = document.querySelector("#game-container");

  const rankingpanel = document.createElement("div");
  rankingpanel.setAttribute("class", "rankingpanel");
  gameContainer.appendChild(rankingpanel);

  const scorespace = document.createElement("div");
  scorespace.setAttribute("class", "scorespace");
  scorespace.textContent = global.score + " score";
  rankingpanel.appendChild(scorespace);

  inputspace = document.createElement("input");
  inputspace.setAttribute("class", "inputspace");
  inputspace.placeholder = "닉네임을 입력해주세요.";

  rankingpanel.appendChild(inputspace);

  const submitspace = document.createElement("div");
  submitspace.setAttribute("class", "submitspace");
  rankingpanel.appendChild(submitspace);

  const submitbtn = document.createElement("button");
  submitbtn.setAttribute("class", "submitbtn");
  submitbtn.textContent = "등록";
  submitspace.appendChild(submitbtn);

  submitbtn.addEventListener("click", submitranking);

  const cancelbtn = document.createElement("button");
  cancelbtn.setAttribute("class", "submitbtn");
  cancelbtn.textContent = "나가기";

  cancelbtn.addEventListener("click", cancelranking);
  submitspace.appendChild(cancelbtn);
}

function submitranking() {
  if (inputspace.value === "") {
    inputspace.placeholder = "닉네임을 먼저 입력하세요.";
  } else {
    let Data = {
      action: "newranking",
      name: inputspace.value,
      score: global.score,
    };
    socket.send(JSON.stringify(Data));
    BacktoStage();
  }
}

export function codegameclear() {
  const gameContainer = document.querySelector("#game-container");

  const resultpanel = document.createElement("div");
  resultpanel.setAttribute("class", "resultpanel");
  gameContainer.appendChild(resultpanel);

  const scorespace = document.createElement("div");
  scorespace.setAttribute("class", "scorespace");
  scorespace.textContent = global.score + " score";
  scorespace.style.marginTop = "30px";
  resultpanel.appendChild(scorespace);

  const submitspace = document.createElement("div");
  submitspace.setAttribute("class", "submitspace");
  resultpanel.appendChild(submitspace);

  const okbtn = document.createElement("button");
  okbtn.setAttribute("class", "submitbtn");
  okbtn.textContent = "확인";
  okbtn.style.marginTop = "20px";
  submitspace.appendChild(okbtn);

  submitspace.addEventListener("click", cancelranking);
}

function cancelranking() {
  BacktoStage();
}
