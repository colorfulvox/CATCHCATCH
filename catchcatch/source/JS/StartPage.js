import "../CSS/startPage.css";
import "./CharSpace.js";
import { CharSpaceOn } from "./CharSpace.js";

const _StartPage = document.createElement("div");
const _app = document.getElementById("app");
_StartPage.className = "StartPage";
_StartPage.style.display = "none";
_app.appendChild(_StartPage);

const StartPageInit = () => {
  _app.style.background = "url('../Background.gif')";
  _app.style.backgroundPosition = "center";
  _app.style.backgroundRepeat = "no-repeat";
  _app.style.backgroundSize = "cover";
  // 로고 생성=======================================
  const _Logo = document.createElement("div");
  _Logo.className = "Logo";

  var LogoImg = document.createElement("img");
  LogoImg.src = "images/Logo.png";

  LogoImg.width = 1000;
  LogoImg.height = 300;
  _Logo.appendChild(LogoImg);

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
  var Btn = document.createElement("button");
  Btn.className = "StartBtn";
  Btn.textContent = "GameStart";

  // Btn.type = "submit";

  Btn.style.backgroundImage = "url('../images/ui/Button_1.png')";
  Btn.style.backgroundSize = "contain";
  Btn.style.backgroundRepeat = "no-repeat";
  Btn.style.backgroundPosition = "center";
  Btn.style.fontFamily = "KenneyBlocks";

  //이벤트 리스너 추가------------
  Btn.addEventListener("click", GoSelectChar);
  //-------------------------

  _GoSelectChar.appendChild(Btn);

  _StartBtn.appendChild(_GoSelectChar); //시작하기 버튼 추가;
  //================================================

  // 랭킹 ============================================
  const _Ranked = document.createElement("div");
  _Ranked.className = "RankedId";
  var Btn = document.createElement("button");
  Btn.className = "StartBtn";
  Btn.textContent = "Ranking";

  Btn.style.backgroundImage = "url('../images/ui/Button_1.png')";
  Btn.style.backgroundSize = "contain";
  Btn.style.backgroundRepeat = "no-repeat";
  Btn.style.backgroundPosition = "center";
  Btn.style.fontFamily = "KenneyBlocks";

  _Ranked.appendChild(Btn);

  _StartBtn.appendChild(_Ranked); //랭킹 버튼 추가;
  //=================================================

  // 게임 종료 ===========================================
  const _QuitGame = document.createElement("div");
  _QuitGame.className = "QuitGameId";
  var Btn = document.createElement("button");
  Btn.className = "StartBtn";
  Btn.textContent = "Exit";

  Btn.style.backgroundImage = "url('../images/ui/Button_1.png')";
  Btn.style.backgroundSize = "contain";
  Btn.style.backgroundRepeat = "no-repeat";
  Btn.style.backgroundPosition = "center";
  Btn.style.fontFamily = "KenneyBlocks";

  _QuitGame.appendChild(Btn);

  _StartBtn.appendChild(_QuitGame); //게임종료 버튼 추가;
  //=================================================
  StartPageOn();
};
export default StartPageInit;

export const StartBtnOn = () => {
  const StartBtnClassList = document.querySelectorAll(".StartBtn");
  for (let i = 0; i < StartBtnClassList.length; ++i) {
    StartBtnClassList[i].style.display = "block";
  }
};

export const StartBtnOff = () => {
  const StartBtnClassList = document.querySelectorAll(".StartBtn");

  for (let i = 0; i < StartBtnClassList.length; ++i) {
    StartBtnClassList[i].style.display = "none";
  }
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
  StartBtnOff();
  CharSpaceOn();
}
