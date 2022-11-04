import "../../CSS/UI/StartPage.css";
import "./char-space.js";

import CharPageInit, { CharSpaceOn, CodeStart, GoStage } from "./char-space.js";
import Stage from "./stage.js";
import {setSound} from "../SOUND/sound";
import {attack} from "../GAME/code.js";

let _mode = true;

global.IsStarted = false;
global.PinNumber = "";
global.socket = "";
global.IsRunning = false;

const _StartPage = document.createElement("div");
const _app = document.getElementById("app");
_StartPage.className = "StartPage";
_StartPage.style.display = "none";
_app.appendChild(_StartPage);

const StartPageInit = () => {
  _app.removeChild(_StartPage);
  _app.appendChild(_StartPage);
  _StartPage.innerHTML = "";
  _app.style.background = "url('images/ui/Background.gif')";
  _app.style.backgroundPosition = "center";
  _app.style.backgroundRepeat = "no-repeat";
  _app.style.backgroundSize = "cover";
  // 로고 생성=======================================
  const _Logo = document.createElement("div");
  _Logo.className = "Logo";

  let LogoImg = document.createElement("img");
  LogoImg.src = "images/ui/Logo.png";

  LogoImg.width = 1000;
  LogoImg.height = 300;
  _Logo.appendChild(LogoImg);
  _Logo.addEventListener("click", () => {
    _mode = !_mode;
    StartPageInit();
    if(!_mode){
      socket = new WebSocket("ws://k7c106.p.ssafy.io:8080");

      socket.onopen = function () {
        IsStarted = false;
        PinNumber = null;
    
        var Data = {
          action: "exeClientInit",
        };
        socket.send(JSON.stringify(Data));
      };
    
      socket.onmessage = function (data) {
        var msg = JSON.parse(data.data.toString());
      
        if (msg.action === "PinNumber") {
          PinNumber = msg.pinnumber;
          console.log(`당신의 Pin번호는 "${PinNumber}" 입니다.`);
        }
        // 게임 시작시 1초 마다 서버에게 데이터를 보내는걸 시작한다.
        else if (msg.action === "StartGame") {
          IsStarted = true;
          IsRunning = false;
          codeScene.scene.resume();
        }
        // 1번의 cycle이 끝나면 보낸다.
        else if (msg.action === "codeData") {
          //여기서 바뀐 정보를 전달 받는다.
          attack(msg.attack,msg.angle,msg.type);
          IsRunning = false;
        }
      };
    }
  });

  _StartPage.appendChild(_Logo); // 로고 추가
  //==============================================

  // 모든 버튼 div
  const _AllBtn = document.createElement("div");
  _AllBtn.className = "AllBtnList";
  _AllBtn.id = "AllBtnList";
  _StartPage.appendChild(_AllBtn);

  // 시작 버튼 div
  const _StartBtn = document.createElement("div");
  _StartBtn.className = "StartBtnList";

  _AllBtn.appendChild(_StartBtn);
  // 시작하기 버튼 ====================================
  const _GoSelectChar = document.createElement("div");
  _GoSelectChar.className = "GoSelectCharId";
  let Btn = document.createElement("button");
  Btn.className = "StartBtn";
  Btn.textContent = "GameStart";

  //이벤트 리스너 추가------------
  if (_mode === true) {
    Btn.addEventListener("click", GoSelectChar);
  } else {
    Btn.addEventListener("click", () => {
      console.log("코딩모드 시작");
      //   CodeStart();
      GoStage();
      Stage();
    });
  }
  //-------------------------

  _GoSelectChar.appendChild(Btn);

  _StartBtn.appendChild(_GoSelectChar); //시작하기 버튼 추가;
  //================================================

  // 랭킹 ============================================
  if (_mode === false) {
    const _Ranked = document.createElement("div");
    _Ranked.className = "RankedId";
    let Btn = document.createElement("button");
    Btn.className = "StartBtn";
    Btn.textContent = "Ranking";
    _Ranked.appendChild(Btn);

    _StartBtn.appendChild(_Ranked); //랭킹 버튼 추가;
  } else {
    const _Ranked = document.createElement("div");
    _Ranked.className = "RankedId";
    _Ranked.style.height = "70px";
    _StartBtn.appendChild(_Ranked);
    CharPageInit();
  }
  //=================================================
  StartPageOn();
};
export default StartPageInit;

export const StartBtnOn = () => {
  const StartBtnClassList = document.querySelector(".StartBtnList");
  StartBtnClassList.style.display = "flex";

  // document.querySelectorAll(".StartBtn");
  // for (let i = 0; i < StartBtnClassList.length; ++i) {
  //   StartBtnClassList[i].style.display = "block";
  // }
};

export const StartBtnOff = () => {
  const StartBtnClassList = document.querySelector(".StartBtnList");
  StartBtnClassList.style.display = "none";
  // const StartBtnClassList = document.querySelectorAll(".StartBtn");

  // for (let i = 0; i < StartBtnClassList.length; ++i) {
  //   StartBtnClassList[i].style.display = "none";
  // }
};

export const StartPageOn = () => {
  StartBtnOn();
  _StartPage.style.display = "flex";
};

export const StartPageOff = () => {
  _StartPage.style.display = "none";
};

// 캐릭터 선택 버튼 클릭 이벤트 리스너
function GoSelectChar() {
    setSound.playSE(1);
    setSound.setBGM(0);
    StartBtnOff();
    CharSpaceOn();
}
