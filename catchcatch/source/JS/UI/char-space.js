import "../../CSS/UI/CharSpace.css";
import { StartBtnOn } from "./start-page";
import { SaveData } from "../../main.js";
import { config } from "../GAME/game.js";
import { codeConfig } from "../GAME/code.js";

let _settingSpace;

let _slideList;
let _buyBtn;
let _gameStartBtn;
let _canCount;
const _catNameList = [
  "캐　츠",
  "용냥이",
  "무냥이",
  "영냥이",
  "진냥이",
  "규냥이",
  "희냥이",
];
const _catText = [
  "평범한 고양이",
  "에일리언 대침공",
  "무야호~!",
  "랜덤박스",
  "Nyan Cat!",
  "이게 뭔 소리여",
  "불 좀 꺼줄래?",
];

const CharPageInit = () => {
  //여기서 미리 서버 정보를 가져온다. ---------------------------
  let _AllBtn = document.getElementById("AllBtnList");
  // StartPage가 생성되면 StartPage에 CharPage를 넣는것으로 하자
  _settingSpace = document.createElement("div");
  _settingSpace.className = "SettingSpace";
  _settingSpace.style.display = "none";

  _AllBtn.appendChild(_settingSpace);
  //--------------------------------------------------

  //뒤로가기
  let _BackIcon = document.createElement("button");
  _BackIcon.className = "BackIcon";
  _settingSpace.appendChild(_BackIcon);
  _BackIcon.addEventListener("click", BackStart);

  // 캔 갯수 표시
  let _CanIcon = document.createElement("div");
  _CanIcon.className = "CanIcon";
  _settingSpace.appendChild(_CanIcon);

  _canCount = document.createElement("div");
  _canCount.className = "CanCount";
  _canCount.textContent = "x" + LocalData.Coin;
  _CanIcon.appendChild(_canCount);

  //고양이 구매
  _buyBtn = document.createElement("button");
  _buyBtn.className = "BuyBtn";
  _settingSpace.appendChild(_buyBtn);
  _buyBtn.textContent = "50 Can!";
  _buyBtn.style.display = "none";
  _buyBtn.addEventListener("click", BuyChar);

  // 캐릭터 선택 Space
  let _CharSpace = document.createElement("div");
  _CharSpace.className = "CharSpace";
  _settingSpace.appendChild(_CharSpace);

  //컨텐츠 네임 [캐릭터선택]
  let _ContentName = document.createElement("div");
  _ContentName.className = "ContentName";
  _ContentName.textContent = "[캐릭터선택]";
  _CharSpace.appendChild(_ContentName);

  // 캐릭턴 선택 박스
  let _ChoiceCharBox = document.createElement("div");
  _ChoiceCharBox.className = "ChoiceCharBox";
  _CharSpace.appendChild(_ChoiceCharBox);

  // LEFT Btn
  let _LeftBtn = document.createElement("button");
  _LeftBtn.className = "CharLeftBtn";
  _LeftBtn.addEventListener("click", SlideLeft);
  _ChoiceCharBox.appendChild(_LeftBtn);

  //슬라이드
  let _Slide = document.createElement("div");
  _Slide.className = "Slide";
  _ChoiceCharBox.appendChild(_Slide);

  _slideList = document.createElement("div");
  _slideList.className = "SlideList";
  _Slide.appendChild(_slideList);

  for (let i = 0; i < 7; ++i) {
    let _CharTemp = document.createElement("div");
    _CharTemp.className = "CharTemp";

    //캐릭터 이미지 가져오기
    let _CharImg = document.createElement("img");
    _CharImg.className = "CharImg";
    _CharImg.id = `CharImg_${i}`;

    if (LocalData.Cat[i] !== false) _CharImg.src = `images/CharImg/${i}.png`;
    else _CharImg.src = `images/CharImg/Unable/${i}.png`;
    // _CharImg.style.border = "3px solid black";
    _CharTemp.appendChild(_CharImg);

    //캐릭 이름 가져오기
    let _CharName = document.createElement("div");
    _CharName.className = "CharName";
    _CharName.id = `CharName_${i}`;

    if (LocalData.Cat[i] != false)
      _CharName.innerText = `[${_catNameList[i]}]
      ${_catText[i]}`;
    else _CharName.innerText = "[" + " ???? " + "]" + `\n${_catText[i]}`;
    _CharTemp.appendChild(_CharName);

    _slideList.appendChild(_CharTemp);
  }

  //RightBtn
  let _RightBtn = document.createElement("button");
  _RightBtn.className = "CharRightBtn";
  _RightBtn.addEventListener("click", SlideRight);
  _ChoiceCharBox.appendChild(_RightBtn);

  //--------------------------------------------

  //난이도 선택 및 게임 시작
  let _OtherBtn = document.createElement("div");
  _OtherBtn.className = "OtherBtn";
  _settingSpace.appendChild(_OtherBtn);

  let _LevelBtn = document.createElement("button");
  _LevelBtn.className = "LevelBtn";
  _LevelBtn.textContent = "NORMAL";
  _LevelBtn.style.background =
    "url('images/ui/MapLevelNormal.png') no-repeat center";
  _LevelBtn.style.backgroundSize = "contain";
  _LevelBtn.addEventListener("click", MapLevel);
  _OtherBtn.appendChild(_LevelBtn);

  _gameStartBtn = document.createElement("button");
  _gameStartBtn.className = "GameStartBtn";
  _gameStartBtn.id = "GameStartBtn";
  _gameStartBtn.textContent = "GO!CATCH!";
  _gameStartBtn.style.textAlign = "center";
  _gameStartBtn.addEventListener("click", GameStart);
  _OtherBtn.appendChild(_gameStartBtn);
};

export default CharPageInit;

export const CharSpaceOn = () => {
  _settingSpace.style.display = "flex";
};

export const CharSpaceOff = () => {
  _settingSpace.style.display = "none";
};

// 돌아가기
function BackStart() {
  CharSpaceOff();
  StartBtnOn();
}

function GameStart() {
  //app 자체를 false해야되나?
  if (ChoiceCat === -1) "시작 불가";
  const StartPage = document.querySelector(".StartPage");
  StartPage.style.display = "none";
  let game = new Phaser.Game(config);
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "block";
}

export function CodeStart() {
  //app 자체를 false해야되나?
  const StartPage = document.querySelector(".StartPage");
  StartPage.style.display = "none";
  let game = new Phaser.Game(codeConfig);
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "block";
}

export function GoStage() {
  const StartPage = document.querySelector(".StartPage");
  StartPage.style.display = "none";
}

let CharIndex = 0;

function Slide() {
  _slideList.style.left = -CharIndex * 190 + "px";

  if (LocalData.Cat[CharIndex] !== false) {
    ChoiceCat = CharIndex;
    const target = document.getElementById("GameStartBtn");
    target.disabled = false;
    _buyBtn.style.display = "none";

    const _app = document.getElementById("app");
    _app.style.background = `url("images/ui/${CharIndex}.gif")`;
    _app.style.backgroundPosition = "center";
    _app.style.backgroundRepeat = "no-repeat";
    _app.style.backgroundSize = "cover";
  } else {
    ChoiceCat = -1;
    const target = document.getElementById("GameStartBtn");
    target.disabled = true;
    _buyBtn.style.display = "inline-block";

    const _app = document.getElementById("app");
    _app.style.background = `url("images/ui/0.gif")`;
    _app.style.backgroundPosition = "center";
    _app.style.backgroundRepeat = "no-repeat";
    _app.style.backgroundSize = "cover";
  }
}

function SlideLeft() {
  if (CharIndex > 0) {
    --CharIndex;
    Slide();
  }
}

function SlideRight() {
  if (CharIndex < 6) {
    ++CharIndex;
    Slide();
  }
}

function BuyChar() {
  if (LocalData.Coin >= 50) {
    LocalData.Coin -= 50;
    LocalData.Cat[CharIndex] = true;
    ChoiceCat = CharIndex;

    _canCount.textContent = "x" + LocalData.Coin;

    const ChangeCharImg = document.getElementById(`CharImg_${CharIndex}`);
    ChangeCharImg.src = `images/CharImg/${CharIndex}.png`;
    const ChangeCharName = document.getElementById(`CharName_${CharIndex}`);
    ChangeCharName.innerText =
      "[" + _catNameList[CharIndex] + "]" + `\n${_catText[CharIndex]}`;

    const _app = document.getElementById("app");
    _app.style.background = `url("images/ui/${CharIndex}.gif")`;
    _app.style.backgroundPosition = "center";
    _app.style.backgroundRepeat = "no-repeat";
    _app.style.backgroundSize = "cover";

    this.style.display = "none";
    const target = document.getElementById("GameStartBtn");
    target.disabled = false;
    SaveData();
    // 코인 차감
    // Buybtn 비활성
    // 로컬데이터 수정
  }
}

function MapLevel() {
  if (ChoiceLevel === 0) {
    this.style.background =
      "url('images/ui/MapLevelHard.png') no-repeat center";
    this.style.backgroundSize = "contain";
    this.textContent = "HARD";
    ++ChoiceLevel;
  } else if (ChoiceLevel === 1) {
    this.style.background =
      "url('images/ui/MapLevelHell.png') no-repeat center";
    this.style.backgroundSize = "contain";
    this.textContent = "HELL";
    ++ChoiceLevel;
  } else {
    this.style.background =
      "url('images/ui/MapLevelNormal.png') no-repeat center";
    this.style.backgroundSize = "contain";
    this.textContent = "NORMAL";
    ChoiceLevel = 0;
  }
}
