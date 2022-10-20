import "../CSS/CharPageInit.css";

// const _CharPage = document.createElement("div");
// const _app = document.getElementById("app");
// _CharPage.id = "CharPage";
// _CharPage.style.display = "none";
// _app.appendChild(_CharPage);

var _CharPage;

const CharPageInit = () => {
  //여기서 미리 서버 정보를 가져온다.

  // StartPage가 생성되면 StartPage에 CharPage를 넣는것으로 하자
  _CharPage = document.createElement("div");
  var _StartPage = document.getElementById("StartPage");
  _CharPage.id = "CharPage";
  _CharPage.style.display = "none";
  _StartPage.appendChild(_CharPage);

  //캐릭터 템플릿
  const _CharTemplate = document.createElement("div");
  _CharTemplate.id = "CharTemplate";
  _CharPage.appendChild(_CharTemplate);

  //Slide버튼
  const _LeftBtn = document.createElement("button");
  _LeftBtn.id = "ChoiceBtn";
  _LeftBtn.style.top = "60%";
  _LeftBtn.style.left = "28%";

  _CharPage.appendChild(_LeftBtn);

  const _RightBtn = document.createElement("button");
  _RightBtn.id = "ChoiceBtn";
  _RightBtn.style.top = "60%";
  _RightBtn.style.left = "72%";

  _CharPage.appendChild(_RightBtn);

  // 게임 시작 버튼
  const _StartBtn = document.createElement("button");
  _StartBtn.id = "StartBtn";

  _CharPage.appendChild(_StartBtn);
};

export default CharPageInit;

export const CharPageOn = () => {
  _CharPage.style.display = "block";
};

export const CharPageOff = () => {
  _CharPage.style.display = "none";
};
