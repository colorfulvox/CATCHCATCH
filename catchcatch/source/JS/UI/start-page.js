// 랭킹을 가져오기전에 먼저 디자인 해버린다..

import "../../CSS/UI/StartPage.css";
import "./char-space.js";

import CharPageInit, { CharSpaceOn, CodeStart, GoStage } from "./char-space.js";
import Stage from "./stage.js";
let _RankingList;
import { setSound } from "../SOUND/sound";
import { attack } from "../GAME/code.js";

let _Logo;

let _mode = false;

let RankingListTxt = [];
let RankingData = [];
let NewData = [];

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
  if (_mode) _app.style.background = "url('images/ui/0.gif')";
  else _app.style.background = "url('images/ui/codebackground.gif')";

  _app.style.backgroundPosition = "center";
  _app.style.backgroundRepeat = "no-repeat";
  _app.style.backgroundSize = "cover";
  // 치트 모드
  const download = document.createElement("a");
  download.href =
    "https://drive.google.com/file/d/1F80fDXLW4OsULtJJWctVRGVlL2F9BZ5D/view?usp=share_link";
  download.target = "_blank";
  download.setAttribute("class", "download");
  const downImg = document.createElement("img");
  downImg.setAttribute("class", "downImg");
  if (_mode) downImg.src = "images/ui/download_green.png";
  else downImg.src = "images/ui/download_blue.png";
  download.appendChild(downImg);
  _StartPage.appendChild(download);
  const cheatdiv = document.querySelector(".cheat");
  if (cheatdiv != null) _app.removeChild(cheatdiv);

  const cheat = document.createElement("div");
  let cheatNum = 0;
  cheat.setAttribute("class", "cheat");
  cheat.addEventListener("click", () => {
    cheatNum += 1;
    if (cheatNum === 5) {
      cheatMode = true;
    } else {
      cheatMode = false;
    }
  });
  _app.appendChild(cheat);
  // 로고 생성=======================================
  _Logo = document.createElement("div");
  _Logo.className = "Logo";
  _Logo.id = "Logo";

  if (!_mode) {
    socket = new WebSocket("wss://www.catchcatch.kr/api");

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
        RankingData = RankingData.map((el, idx) => {
          return [idx + 1, ...el];
        });
        NewData = RankingData;
        InitRanking();
        // UpdateRanking();
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
      } else if (msg.action === "RankingUpdate") {
        RankingData = JSON.parse(JSON.stringify(msg.ranking));
        RankingData = RankingData.map((el, idx) => {
          return [idx + 1, ...el];
        });
        NewData = RankingData;
        const RankingContainer = document.querySelector(".RankingContainer");
        const RankingList = document.querySelector(".RankingList");
        RankingList.removeChild(RankingContainer);
        InitRanking();
      }
    };
  }
  _Logo.addEventListener("click", () => {
    _mode = !_mode;
    StartPageInit();
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
  const _CodeChar = document.createElement("div");

  let Btn = document.createElement("button");

  Btn.textContent = "GameStart";
  const codeBtn = document.createElement("button");
  _CodeChar.appendChild(codeBtn);
  if (_mode) {
    Btn.className = "StartBtn";
    codeBtn.className = "StartBtn";
    codeBtn.textContent = "CODE CATCH";
  } else {
    Btn.className = "CodeStartBtn";
    codeBtn.className = "CodeStartBtn";
    codeBtn.textContent = "CATCH CATCH";
  }

  //이벤트 리스너 추가------------
  if (_mode === true) {
    let LogoImg = document.createElement("img");
    LogoImg.setAttribute("id", "logoimg");
    // LogoImg.src = "images/ui/Logo2.gif";

    LogoImg.width = 600;
    LogoImg.height = 300;
    _Logo.appendChild(LogoImg);
    LogoImg.src = "images/ui/Logo2.gif";
    // BGM
    setSound.setBGM(0);
    Btn.addEventListener("click", GoSelectChar);
  } else {
    let LogoImg = document.createElement("img");
    LogoImg.setAttribute("id", "logoimg");
    // LogoImg.src = "images/ui/Logo2.gif";

    LogoImg.width = 600;
    LogoImg.height = 300;
    _Logo.appendChild(LogoImg);
    LogoImg.src = "images/ui/codelogo.gif";
    setSound.setBGM(4);
    Btn.addEventListener("click", () => {
      //   CodeStart();
      setSound.playSE(16);
      GoStage();
      Stage();
    });
  }
  //-------------------------

  _GoSelectChar.appendChild(Btn);

  _StartBtn.appendChild(_GoSelectChar); //시작하기 버튼 추가;
  if (_mode) {
    _StartBtn.appendChild(_CodeChar); //시작하기 버튼 추가;
  }
  //================================================

  // 랭킹 ============================================
  if (_mode === false) {
    //랭킹 리스트 화면 생성 --------------------------------
    _RankingList = document.createElement("div");
    _RankingList.className = "RankingList";
    _StartPage.appendChild(_RankingList);
    _RankingList.style.display = "none";

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
    // MyRanking.appendChild(BlankRanking);

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
    // MyRanking.appendChild(InputSpace);

    const RankingSearchBtn = document.createElement("button");
    RankingSearchBtn.className = "RankingSearchBtn";
    RankingSearchBtn.textContent = "검색";
    RankingSearchBtn.addEventListener("click", SearchResult);
    InputSpace.appendChild(RankingSearchBtn);

    InputArea = document.createElement("input");
    InputArea.className = "InputArea";
    InputSpace.appendChild(InputArea);
    InputArea.addEventListener("change", SearchResult);

    const eight = document.createElement("button");
    eight.className = "eight_tapBtn";
    eight.addEventListener("click", () => {
      ChangeTap("Eight");
    });
    eight.innerText = "8기";
    InputSpace.appendChild(eight);
    const seven = document.createElement("button");
    seven.className = "seven_tapBtn";
    seven.addEventListener("click", () => {
      ChangeTap("Seven");
    });
    seven.innerText = "7기";
    InputSpace.appendChild(seven);
    const All = document.createElement("button");
    All.className = "all_tapBtn";
    All.addEventListener("click", () => {
      ChangeTap("All");
    });
    All.innerText = "전체";
    InputSpace.appendChild(All);

    // RankingListTxt.push([GradeSpace, NameSpace, ScoreSpace]);

    // MySpace.appendChild(MyRanking);
    _RankingList.appendChild(InputSpace);

    //-----------------------------------------------

    const _Ranked = document.createElement("div");
    _Ranked.className = "RankedId";
    let Btn = document.createElement("button");
    Btn.className = "CodeStartBtn";
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
  if (_mode === false) {
    _StartBtn.appendChild(_CodeChar); //시작하기 버튼 추가;
  }
  //=================================================
  _CodeChar.addEventListener("click", () => {
    _mode = !_mode;
    StartPageInit();
    if (!_mode) {
      socket = new WebSocket("wss://www.catchcatch.kr/api");

      socket.onopen = function () {
        IsStarted = false;
        PinNumber = null;

        var Data = {
          action: "exeClientInit",
        };
        socket.send(JSON.stringify(Data));
      };

      socket.onmessage = function (data) {
        console.log(data.data);
        var msg = JSON.parse(data.data.toString());

        if (msg.action === "PinNumber") {
          PinNumber = msg.pinnumber;
          RankingData = JSON.parse(JSON.stringify(msg.ranking));
          RankingData = RankingData.map((el, idx) => {
            return [idx + 1, ...el];
          });
          NewData = RankingData;
          InitRanking();
          // UpdateRanking();
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
        } else if (msg.action === "RankingUpdate") {
          RankingData = JSON.parse(JSON.stringify(msg.ranking));
          RankingData = RankingData.map((el, idx) => {
            return [idx + 1, ...el];
          });
          NewData = RankingData;
          const RankingContainer = document.querySelector(".RankingContainer");
          const RankingList = document.querySelector(".RankingList");
          RankingList.removeChild(RankingContainer);
          InitRanking();
        }
      };
    }
  });
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
  setSound.playSE(16);
  StartBtnOff();
  CharSpaceOn();
}

function RankingListOn() {
  setSound.playSE(16);
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

function SearchResult(e) {
  setSound.playSE(16);
  if (e.target.value) {
    NewData = RankingData.filter((el) => el[1].includes(e.target.value));
  } else {
    NewData = RankingData;
  }
  const RankingContainer = document.querySelector(".RankingContainer");
  const RankingList = document.querySelector(".RankingList");
  RankingList.removeChild(RankingContainer);
  InitRanking();
}

function ChangeTap(tap) {
  if (tap === "All") {
    NewData = RankingData;
  } else if (tap === "Eight") {
    NewData = RankingData.filter((el) => el[3] === "8기");
  } else {
    NewData = RankingData.filter((el) => el[3] !== "8기");
  }
  const RankingContainer = document.querySelector(".RankingContainer");
  const RankingList = document.querySelector(".RankingList");
  RankingList.removeChild(RankingContainer);
  InitRanking();
}

function InitRanking() {
  const RankingContainer = document.createElement("div");
  RankingContainer.setAttribute("class", "RankingContainer");
  const RankingList = document.querySelector(".RankingList");
  for (let i = 0; i < NewData.length; ++i) {
    const RankingSpace = document.createElement("div");
    RankingSpace.className = "RankingSpace";
    _RankingList.appendChild(RankingSpace);

    const MyRanking = document.createElement("div");
    MyRanking.className = "RankingTemp";

    const GradeSpace = document.createElement("div");
    GradeSpace.className = "GradeSpace";
    MyRanking.appendChild(GradeSpace);
    GradeSpace.textContent = `${i + 1}`;

    const areaspace = document.createElement("div");

    if (NewData[i][3] === "광주") {
      areaspace.textContent = "광주";
      areaspace.className = "areaspace_1";
    } else if (NewData[i][3] === "대전") {
      areaspace.textContent = "대전";
      areaspace.className = "areaspace_2";
    } else if (NewData[i][3] === "구미") {
      areaspace.textContent = "구미";
      areaspace.className = "areaspace_3";
    } else if (NewData[i][3] === "부울경") {
      areaspace.textContent = "부울경";
      areaspace.className = "areaspace_4";
    } else if (NewData[i][3] === "서울") {
      areaspace.textContent = "서울";
      areaspace.className = "areaspace_5";
    } else if (NewData[i][3] === "8기") {
      areaspace.textContent = "8기";
      areaspace.className = "areaspace_6";
    }

    MyRanking.appendChild(areaspace);

    const NameSpace = document.createElement("div");
    NameSpace.className = "NameSpace";
    NameSpace.innerText = `${NewData[i][1]}`;
    MyRanking.appendChild(NameSpace);

    const ScoreSpace = document.createElement("div");
    ScoreSpace.className = "ScoreSpace";
    ScoreSpace.innerText = `${NewData[i][2]}`;
    MyRanking.appendChild(ScoreSpace);

    RankingListTxt.push([NameSpace, ScoreSpace]);

    RankingSpace.appendChild(MyRanking);
    RankingContainer.appendChild(RankingSpace);
  }
  RankingList.appendChild(RankingContainer);
}
