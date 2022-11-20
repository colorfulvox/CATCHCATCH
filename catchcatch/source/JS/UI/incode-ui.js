import "../../CSS/UI/inCodeUI.css";
import Stage from "./stage.js";
import { codeConfig } from "../GAME/code.js";
import { setSound } from "../SOUND/sound";
import Mode from "./mode.js";
import { codeConfig2 } from "../GAME/code2.js";

let inputspace;

export let showscore;

let mode;

export default function IncodeUI(newMode) {
  const gameContainer = document.querySelector("#game-container");
  const oldLifeContainer = document.querySelector(".lifeContainer");
  const pin = document.createElement("div");
  mode = newMode;
  if (oldLifeContainer) {
    gameContainer.removeChild(oldLifeContainer);
  }

  pin.setAttribute("class", "pin");
  pin.innerText = global.PinNumber;
  pin.style.textAlign = "center";
  pin.style.lineHeight = "60px";
  pin.addEventListener("click", copypinnumber);
  pin.addEventListener("mouseover", hoverPin);
  pin.addEventListener("mouseout", deletePin);
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

  const lifeContainer = document.createElement("div");

  if (mode === "디펜스") {
    lifeContainer.setAttribute("class", "lifeContainer");
    showscore = document.createElement("div");
    showscore.setAttribute("class", "showscore");
    showscore.textContent = "0 Score";

    for (let i = 0; i < 3; i++) {
      const img = document.createElement("img");
      img.setAttribute("class", "lifeImg");
      img.src = "images/ui/heart.png";
      lifeContainer.appendChild(img);
    }

    gameContainer.appendChild(showscore);
  } else {
    lifeContainer.setAttribute("class", "lifeContainer2");
    for (let i = 0; i < 5; i++) {
      const img = document.createElement("img");
      img.setAttribute("class", "lifeImg");
      img.src = "images/ui/heart.png";
      lifeContainer.appendChild(img);
    }
  }
  gameContainer.appendChild(lifeContainer);

  buttonContainer.appendChild(backBtn);
  buttonContainer.appendChild(reBtn);

  gameContainer.appendChild(pin);
  gameContainer.appendChild(buttonContainer);

  // makeranking();
  // codegameclear();
}

let removeToast;

export function LoseLife() {
  if (mode === "디펜스") {
    health -= 1;
    if (health < 0) {
      null;
    } else {
      const lifeContainer = document.querySelector(".lifeContainer");
      const life = document.querySelector(".lifeImg");
      lifeContainer.removeChild(life);
    }
  } else {
    health2 -= 1;
    if (health2 < 0) {
      null;
    } else {
      const lifeContainer = document.querySelector(".lifeContainer2");
      const life = document.querySelector(".lifeImg");
      lifeContainer.removeChild(life);
    }
  }
}

function toast(string) {
  const toast = document.getElementById("toast");

  toast.classList.contains("reveal")
    ? (clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 1000)))
    : (removeToast = setTimeout(function () {
        document.getElementById("toast").classList.remove("reveal");
      }, 1000));
  toast.classList.add("reveal"), (toast.innerText = string);
}

function hoverPin() {
  const gameContainer = document.querySelector("#game-container");
  const modal = document.createElement("div");
  modal.setAttribute("class", "pinModal");
  modal.innerText = "클릭하면 복사됩니다.";
  gameContainer.appendChild(modal);
}

function deletePin() {
  const gameContainer = document.querySelector("#game-container");
  const modal = document.querySelector(".pinModal");
  gameContainer.removeChild(modal);
}

function copypinnumber() {
  copyStringToClipboard(global.PinNumber);
  const modal = document.querySelector(".pinModal");
  const gameContainer = document.querySelector("#game-container");
  if (mode === "턴") {
    const showTurn = document.createElement("div");
    showTurn.setAttribute("class", "showTurn");
    showTurn.textContent = "0 TURN";
    gameContainer.appendChild(showTurn);
  }
  if (modal) {
    deletePin();
  }
  const pin = document.querySelector(".pin");
  gameContainer.removeChild(pin);

  const toastspace = document.createElement("div");
  toastspace.id = "toast";
  gameContainer.appendChild(toastspace);

  toast("클립보드 복사 완료!");
}

function copyStringToClipboard(string) {
  function handler(event) {
    event.clipboardData.setData("text/plain", string);
    event.preventDefault();
    document.removeEventListener("copy", handler, true);
  }

  document.addEventListener("copy", handler, true);
  document.execCommand("copy");
}

function BacktoStage() {
  const gameContainer = document.querySelector("#game-container");
  gameContainer.innerHTML = "";
  gameContainer.style.display = "none";
  if (mode === "디펜스") {
    codeGame.destroy(true);
    codeGame = null;
    codeScene = "";
  } else {
    codeGame2.destroy(true);
    codeScene2 = "";
  }
  let Data = {
    action: "endGame",
    pinnumber: PinNumber,
  };
  socket.send(JSON.stringify(Data));
  const app = document.querySelector("#app");
  if (mode === "디펜스") {
    const stagePage = document.querySelector(".stagePage");
    app.removeChild(stagePage);
    Stage();
  } else {
    const modePage = document.querySelector(".modePage");
    app.removeChild(modePage);
    Mode();
  }
}

function Replay() {
  setSound.playSE(24);
  const gameContainer = document.querySelector("#game-container");
  gameContainer.innerHTML = "";
  if (mode === "디펜스") {
    codeGame.destroy(true);
    codeGame = null;
    codeGame = new Phaser.Game(codeConfig);
  } else {
    codeGame2.destroy(true);
    codeGame2 = new Phaser.Game(codeConfig2);
  }
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

  const selectarea = document.createElement("select");
  selectarea.id = "selectarea";
  selectarea.className = "selectarea";

  const option_1 = document.createElement("option");
  option_1.className = "opt";
  option_1.value = "광주";
  option_1.text = "광주";
  selectarea.appendChild(option_1);
  const option_2 = document.createElement("option");
  option_2.className = "opt";
  option_2.value = "대전";
  option_2.text = "대전";
  selectarea.appendChild(option_2);
  const option_3 = document.createElement("option");
  option_3.className = "opt";
  option_3.value = "구미";
  option_3.text = "구미";
  selectarea.appendChild(option_3);
  const option_4 = document.createElement("option");
  option_4.className = "opt";
  option_4.value = "부울경";
  option_4.text = "부울경";
  selectarea.appendChild(option_4);
  const option_5 = document.createElement("option");
  option_5.className = "opt";
  option_5.value = "서울";
  option_5.text = "서울";
  selectarea.appendChild(option_5);
  const option_6 = document.createElement("option");
  option_6.className = "opt";
  option_6.value = "8기";
  option_6.text = "8기";
  selectarea.appendChild(option_6);

  rankingpanel.appendChild(selectarea);

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
  } else if (inputspace.value.length > 7) {
    alert("닉네임은 최대 7자입니다.");
  } else {
    const selected = document.getElementById("selectarea");
    let Data = {
      action: "newranking",
      name: inputspace.value,
      score: score,
      area: selected.options[selected.selectedIndex].value,
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

export function UpdateTurn(n) {
  const showTurn = document.querySelector(".showTurn");
  showTurn.innerText = `${n} TURN`;
}

export function CodeCatch2Gameover() {
  const gameContainer = document.querySelector("#game-container");

  const resultpanel = document.createElement("div");
  resultpanel.setAttribute("class", "resultpanel");
  gameContainer.appendChild(resultpanel);

  const Gameover = document.createElement("div");
  Gameover.setAttribute("class", "Catch2Gameover");
  resultpanel.appendChild(Gameover);

  const backbtn = document.createElement("button");
  backbtn.setAttribute("class", "submitbtn");
  backbtn.textContent = "확인";
  resultpanel.appendChild(backbtn);
}

export function CodeCatch2Gamclear() {
  const gameContainer = document.querySelector("#game-container");

  const resultpanel = document.createElement("div");
  resultpanel.setAttribute("class", "resultpanel");
  gameContainer.appendChild(resultpanel);

  const Gameclear = document.createElement("div");
  Gameclear.setAttribute("class", "Catch2Gameclear");
  resultpanel.appendChild(Gameclear);

  const backbtn = document.createElement("button");
  backbtn.setAttribute("class", "submitbtn");
  backbtn.textContent = "확인";
  resultpanel.appendChild(backbtn);
}
