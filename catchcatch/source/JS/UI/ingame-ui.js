import "../../CSS/UI/inGameUI.css";
import {CharSpaceOn} from "./char-space.js";

let timerTxt = document.createElement("div");
let minute = 0;
let second = 0;

let catCoin;

export default function ingameUi() {
    const gameContainer = document.querySelector("#game-container");
    // const progress = document.createElement("progress");

    const holeHp = document.createElement("div");
    holeHp.setAttribute("class", "holeHp");
    const hp = document.createElement("div");
    hp.setAttribute("class", "hp");
    hp.innerText = hole.hp;
    holeHp.appendChild(hp);
    gameContainer.appendChild(holeHp);

    catCoin = document.createElement("div");
    catCoin.setAttribute("class", "catCoin");
    catCoin.setAttribute("id", "catCoin");
    catCoin.textContent = global.coin + " Coin";

    const stats = document.createElement("div");
    const heal = document.createElement("div");
    const healTxt = document.createElement("div");

    const dmgMul = document.createElement("div");
    const dmgMulTxt = document.createElement("div");

    const speed = document.createElement("div");
    const speedTxt = document.createElement("div");

    timerTxt.setAttribute("class", "Timer");
    gameContainer.appendChild(timerTxt);
    minute = 0;
    second = 0;

    timerTxt.textContent = `${minute}:${second}`;

    // progress.setAttribute("id", "progress");
    // progress.setAttribute("value", player.exp);
    // progress.setAttribute("max", 100);
    stats.setAttribute("class", "stats");
    heal.setAttribute("class", "stat");
    healTxt.setAttribute("class", "healTxt");

    dmgMul.setAttribute("class", "stat");
    dmgMulTxt.setAttribute("class", "dmgMulTxt");

    speed.setAttribute("class", "stat");
    speedTxt.setAttribute("class", "speedTxt");

    heal.setAttribute("id", "heal");
    heal.style.backgroundImage = "url('images/ui/Icon/sample.png')";
    heal.style.backgroundPosition = "center";
    heal.style.backgroundRepeat = "no-repeat";
    heal.style.backgroundSize = "contain";

    dmgMul.setAttribute("id", "dmgMul");
    dmgMul.style.backgroundImage = "url('images/ui/Icon/sample.png')";
    dmgMul.style.backgroundPosition = "center";
    dmgMul.style.backgroundRepeat = "no-repeat";
    dmgMul.style.backgroundSize = "contain";

    speed.setAttribute("id", "speed");
    speed.style.backgroundImage = "url('images/ui/Icon/sample.png')";
    speed.style.backgroundPosition = "center";
    speed.style.backgroundRepeat = "no-repeat";
    speed.style.backgroundSize = "contain";

    healTxt.innerText = `Lv.${player.healLevel}`;
    heal.appendChild(healTxt);
    dmgMulTxt.innerText = `Lv.${player.dmgMulLevel}`;
    dmgMul.appendChild(dmgMulTxt);
    speedTxt.innerText = `Lv.${player.speedLevel}`;
    speed.appendChild(speedTxt);

    stats.appendChild(catCoin);
    stats.appendChild(heal);
    stats.appendChild(dmgMul);
    stats.appendChild(speed);
    // gameContainer.appendChild(progress);
    gameContainer.appendChild(stats);
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

export function updateHP() {
    // console.log(hole.hp);
    const holeHp = document.querySelector(".holeHp");
    const hp = document.querySelector(".hp");
    hp.innerText = hole.hp;
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
        ++second;
        if (second === 60) {
            ++minute;
            second = 0;
        }
    }
    if (second < 10) {
        if (minute < 10) timerTxt.textContent = `0${minute}:0${second}`;
        else timerTxt.textContent = `${minute}:0${second}`;
    } else if (minute < 10) {
        if (second < 10) timerTxt.textContent = `0${minute}:0${second}`;
        else timerTxt.textContent = `0${minute}:${second}`;
    } else timerTxt.textContent = `w${minute}:${second}`;

    if (minute === 20) {
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

function GoHome() {
    window.location.reload();
}

export function UpdateCatCoin() {
    catCoin.textContent = global.coin + " Coin";
}
