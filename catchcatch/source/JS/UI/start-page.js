// 랭킹을 가져오기전에 먼저 디자인 해버린다..

import "../../CSS/UI/StartPage.css";
import "./char-space.js";

import CharPageInit, { CharSpaceOn, CodeStart, GoStage } from "./char-space.js";
import Stage from "./stage.js";
let _RankingList;
import { setSound } from "../SOUND/sound";
import { attack } from "../GAME/code.js";

let _mode = true;

let RankingListTxt = [];
let RankingData = [];

global.IsStarted = false;
global.PinNumber = "";
global.socket = "";
global.IsRunning = false;

let InputArea;
let S_GradeSpace;
let S_NameSpace;
let S_ScoreSpace;

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
  _Logo.id = "Logo";

  let LogoImg = document.createElement("img");
  LogoImg.src = "images/ui/Logo.png";

  LogoImg.width = 1000;
  LogoImg.height = 300;
  _Logo.appendChild(LogoImg);
  _Logo.addEventListener("click", () => {
    _mode = !_mode;
    StartPageInit();
    if (!_mode) {
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

          RankingData = JSON.parse(JSON.stringify(msg.ranking));
          console.log(`당신의 Pin번호는 "${PinNumber}" 입니다.`);
          UpdateRanking();
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
          attack(msg.attack, msg.angle, msg.type);
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
    //랭킹 리스트 화면 생성 --------------------------------
    _RankingList = document.createElement("div");
    _RankingList.className = "RankingList";
    _StartPage.appendChild(_RankingList);
    _RankingList.style.display = "none";

    const MySpace = document.createElement("div");
    MySpace.className = "RankingSpace";
    MySpace.style.width = "100%";
    MySpace.style.height = "60px";
    // MySpace.style.border = "4px solid black";
    MySpace.style.marginTop = "60px";
    MySpace.style.marginBottom = "40px";
    _RankingList.appendChild(MySpace);

    // 뒤로가기 생성
    const RankingBack = document.createElement("button");
    RankingBack.className = "RankingBack";
    _RankingList.appendChild(RankingBack);
    RankingBack.addEventListener("click", RankingListOff);

    RankingListTxt = [];

    //랭킹 리스트 생성
    const MyRanking = document.createElement("div");
    MyRanking.className = "InputTemp";

    const BlankRanking = document.createElement("div");
    BlankRanking.className = "BlankTemp";
    MyRanking.appendChild(BlankRanking);

    S_GradeSpace = document.createElement("div");
    S_GradeSpace.className = "GradeSpace";
    BlankRanking.appendChild(S_GradeSpace);

    S_NameSpace = document.createElement("div");
    S_NameSpace.className = "NameSpace";
    BlankRanking.appendChild(S_NameSpace);

    S_ScoreSpace = document.createElement("div");
    S_ScoreSpace.className = "ScoreSpace";
    BlankRanking.appendChild(S_ScoreSpace);

    //--------------------------------------------------
    const InputSpace = document.createElement("div");
    InputSpace.className = "InputSpace";
    MyRanking.appendChild(InputSpace);

    const RankingSearchBtn = document.createElement("button");
    RankingSearchBtn.className = "RankingSearchBtn";
    RankingSearchBtn.textContent = "검색";
    RankingSearchBtn.addEventListener("click", SearchResult);
    InputSpace.appendChild(RankingSearchBtn);

    InputArea = document.createElement("input");
    InputArea.className = "InputArea";
    InputSpace.appendChild(InputArea);

    // RankingListTxt.push([GradeSpace, NameSpace, ScoreSpace]);

    MySpace.appendChild(MyRanking);

    for (let i = 0; i < 5; ++i) {
      const RankingSpace = document.createElement("div");
      RankingSpace.className = "RankingSpace";
      RankingSpace.style.width = "100%";
      RankingSpace.style.height = "60px";
      // RankingSpace.style.border = "4px solid black";
      _RankingList.appendChild(RankingSpace);

      const MyRanking = document.createElement("div");
      MyRanking.className = "RankingTemp";

      const GradeSpace = document.createElement("div");
      GradeSpace.className = "GradeSpace";
      MyRanking.appendChild(GradeSpace);
      GradeSpace.textContent = i + 1;

      const NameSpace = document.createElement("div");
      NameSpace.className = "NameSpace";
      MyRanking.appendChild(NameSpace);

      const ScoreSpace = document.createElement("div");
      ScoreSpace.className = "ScoreSpace";
      MyRanking.appendChild(ScoreSpace);

      RankingListTxt.push([NameSpace, ScoreSpace]);

      RankingSpace.appendChild(MyRanking);
    }

    //-----------------------------------------------

    const _Ranked = document.createElement("div");
    _Ranked.className = "RankedId";
    let Btn = document.createElement("button");
    Btn.className = "StartBtn";
    Btn.textContent = "Ranking";
    Btn.addEventListener("click", RankingListOn);
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
  setSound.setBGM(0);
  StartBtnOff();
  CharSpaceOn();
}

function RankingListOn() {
  let logo = document.getElementById("Logo");
  logo.style.display = "none";
  _RankingList.style.display = "flex";
}

function RankingListOff() {
  let logo = document.getElementById("Logo");
  logo.style.display = "block";
  _RankingList.style.display = "none";
  S_GradeSpace.textContent = "";
  S_NameSpace.textContent = "";
  S_ScoreSpace.textContent = "";
}

function UpdateRanking() {
  // RankingListTxt[0][0].textContent = "1"; //내 등급
  // RankingListTxt[0][1].textContent = "chu"; //내 별명
  // RankingListTxt[0][2].textContent = 200; //내 스코어
  console.log(RankingData);
  for (let i = 0; i < RankingData.length; ++i) {
    console.log(RankingData[i]);
    RankingListTxt[i][0].textContent = RankingData[i][0]; //유저 별명
    RankingListTxt[i][1].textContent = RankingData[i][1]; //유저 스코어
  }
}

function SearchResult() {
  if (InputArea.value === "") return;
  socket = new WebSocket("ws://k7c106.p.ssafy.io:8080");
  socket.onopen = function () {
    IsStarted = false;
    PinNumber = null;
    let name = InputArea.value.toString();
    var Data = {
      action: "searchranking",
      searchname: name,
    };
    socket.send(JSON.stringify(Data));
    InputArea.value = "";
  };
  socket.onmessage = function (data) {
    var msg = JSON.parse(data.data.toString());
    S_GradeSpace.textContent = "";
    S_NameSpace.textContent = "";
    S_ScoreSpace.textContent = "";

    if (msg.action === "searchranking") {
      if (msg.check === false) {
        S_NameSpace.textContent = msg.log;
        S_NameSpace.style.fontSize = "15px";
      } else {
        S_GradeSpace.textContent = msg.grade;
        S_NameSpace.textContent = msg.name;
        S_ScoreSpace.textContent = msg.score;

        if (msg.grade.length >= 4) {
          S_GradeSpace.style.fontSize = "20px";
        } else {
          S_GradeSpace.style.fontSize = "xx-large";
        }
        if (msg.name.length > 5) {
          S_NameSpace.style.fontSize = "15px";
        } else {
          S_NameSpace.style.fontSize = "x-large";
        }
      }
    }
  };

  // console.log(InputArea.value);
}
