const _StartPage = document.createElement("div");
const _app = document.getElementById("app");
_StartPage.id = "StartPage";
_StartPage.style.display = "none";
_app.appendChild(_StartPage);

const StartPageInit = () => {
  // 로고 생성==================================
  const _Logo = document.createElement("div");
  _Logo.id = "Logo";

  var LogoImg = document.createElement("img");
  LogoImg.src = "./Img/Logo.gif";
  LogoImg.width = 1000;
  LogoImg.height = 300;
  _Logo.appendChild(LogoImg);

  _StartPage.appendChild(_Logo); // 로고 추가
  //============================================

  // 시작하기 버튼 ====================================
  const _GoSelectChar = document.createElement("div");
  _GoSelectChar.id = "GoSelectCharId";
  var Btn = document.createElement("button");
  Btn.className = "StartBtn";
  Btn.textContent = "시작하기";

  //이벤트 리스너 추가------------
  Btn.addEventListener("click", GoSelectChar);
  //-------------------------

  _GoSelectChar.appendChild(Btn);

  _StartPage.appendChild(_GoSelectChar); //시작하기 버튼 추가;
  //=================================================

  // 랭킹 =============================================
  const _Ranked = document.createElement("div");
  _Ranked.id = "RankedId";
  var Btn = document.createElement("button");
  Btn.className = "StartBtn";
  Btn.textContent = "랭킹 순위";
  _Ranked.appendChild(Btn);

  _StartPage.appendChild(_Ranked); //랭킹 버튼 추가;
  //=================================================

  // 게임 종료 ===========================================
  const _QuitGame = document.createElement("div");
  _QuitGame.id = "QuitGameId";
  var Btn = document.createElement("button");
  Btn.className = "StartBtn";
  Btn.textContent = "종료";
  _QuitGame.appendChild(Btn);

  _StartPage.appendChild(_QuitGame); //게임종료 버튼 추가;
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
  _StartPage.style.display = "block";
};

export const StartPageOff = () => {
  _StartPage.style.display = "none";
};

// 캐릭터 선택 버튼 클릭 이벤트 리스너
function GoSelectChar() {
  StartBtnOff();
}
