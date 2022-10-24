import "../../CSS/UI/CharSpace.css";
import { StartBtnOn } from "./StartPage";
import { SaveData } from "../../main.js";
import { config } from "../GAME/game.js";

var _CharSpace;

var _SlideList;

const CharPageInit = () => {
  //여기서 미리 서버 정보를 가져온다. ---------------------------
  var _AllBtn = document.getElementById("AllBtnList");
  // StartPage가 생성되면 StartPage에 CharPage를 넣는것으로 하자
  _CharSpace = document.createElement("div");
  _CharSpace.className = "CharSpace";
  _CharSpace.style.display = "none";
  _AllBtn.appendChild(_CharSpace);
  //--------------------------------------------------

  // ChoiceChar = 캐릭터 템플릿 + Slide 버튼
  var _ChoiceChar = document.createElement("div");
  _ChoiceChar.className = "ChoiceChar";
  _CharSpace.appendChild(_ChoiceChar);

  //Left - Slide버튼
  const _LeftBtn = document.createElement("button");
  _LeftBtn.className = "ChoiceBtn";
  _ChoiceChar.appendChild(_LeftBtn);

  _LeftBtn.addEventListener("click", SlideLeft);

  const _Slide = document.createElement("div");
  _Slide.className = "Slide";
  _ChoiceChar.appendChild(_Slide);

  //캐릭터 슬라이드 리스트
  _SlideList = document.createElement("ul");
  _SlideList.className = "SlideList";
  _Slide.appendChild(_SlideList);

  //캐릭터 템플릿 5개 생성
  for (let i = 0; i < 5; ++i) {
    const _CharTemplate = document.createElement("li");

    _CharTemplate.className = "CharTemplate";

    // CharObj = 이미지 + 구매 버튼
    const _CharObj = document.createElement("div");
    _CharObj.className = "CharObj";

    // 캐릭터 이미지
    var CharImg = document.createElement("img");
    CharImg.src = `images/CharImg/${i}.png`;
    CharImg.width = 150;
    CharImg.height = 150;
    CharImg.style.margin = "10px";
    CharImg.style.position = "absolute";

    _CharObj.appendChild(CharImg);

    // 구매 버튼
    if (LocalData.Cat[i] === false) {
      var Buybtn = document.createElement("button");
      Buybtn.textContent = "100";
      Buybtn.style.position = "absolute";
      Buybtn.style.left = "20%";
      Buybtn.style.bottom = "0%";
      Buybtn.style.width = "100px";

      Buybtn.id = `${i}`;
      Buybtn.addEventListener("click", BuyChar);

      _CharObj.appendChild(Buybtn);
    } else {
      if (ChoiceCat === -1) ChoiceCat = i;
    }
    // _CharTemplate <= CharOBj
    _CharTemplate.appendChild(_CharObj);

    var CharContxt = document.createElement("p");
    CharContxt.textContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu maximus purus. In hac habitasse platea dictumst. Aenean sit amet mauris elit. Aliquam posuere pharetra ipsum, eu ullamcorper arcu tincidunt id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer sit amet ipsum est. Nulla sodales felis sit amet velit commodo, fringilla fringilla nisi posuere. Aenean tempor cursus augue a blandit. Curabitur tempus ante ex. Praesent ullamcorper finibus erat quis laoreet. Vestibulum volutpat metus quis blandit placerat.";
    CharContxt.style.margin = "10px";
    _CharTemplate.appendChild(CharContxt);

    _SlideList.appendChild(_CharTemplate);
  }

  //Right - Slide버튼
  const _RightBtn = document.createElement("button");
  _RightBtn.className = "ChoiceBtn";
  _ChoiceChar.appendChild(_RightBtn);

  _RightBtn.addEventListener("click", SlideRight);
  //--------------------------------------------------

  // CharBtnList = 뒤로가기 + 게임시작 + 난이도
  const _CharBtnList = document.createElement("div");
  _CharBtnList.className = "CharBtnList";
  _CharSpace.appendChild(_CharBtnList);

  // 뒤로가기
  const _BackStartBtn = document.createElement("button");
  _BackStartBtn.className = "CharBtn";
  _BackStartBtn.textContent = "뒤로가기";
  // 이벤트 리스너 추가 ------------------------
  _BackStartBtn.addEventListener("click", BackStart);
  // -------------------------------------
  _CharBtnList.appendChild(_BackStartBtn);

  // 게임시작
  const _StartGameBtn = document.createElement("button");
  _StartGameBtn.className = "CharBtn";
  _StartGameBtn.textContent = "게임 시작";
  _CharBtnList.appendChild(_StartGameBtn);
  _StartGameBtn.addEventListener("click", GameStart);

  // 난이도 설정 임시로 버튼
  const _MapLevel = document.createElement("button");
  _MapLevel.className = "CharBtn";
  _MapLevel.textContent = "일반 모드";
  _CharBtnList.appendChild(_MapLevel);
  _MapLevel.addEventListener("click", MapLevel);
};

export default CharPageInit;

export const CharSpaceOn = () => {
  _CharSpace.style.display = "flex";
};

export const CharSpaceOff = () => {
  _CharSpace.style.display = "none";
};

function BackStart() {
  CharSpaceOff();
  StartBtnOn();
}

function GameStart() {
  //app 자체를 false해야되나?
  if (ChoiceCat === -1) console.log("시작 불가");
  const StartPage = document.querySelector(".StartPage");
  StartPage.style.display = "none";
  var game = new Phaser.Game(config);
  const gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "block";

  console.log(ChoiceCat);
  console.log(ChoiceLevel);
}

let CharIndex = 0;
function SlideLeft() {
  if (CharIndex > 0) {
    --CharIndex;
    _SlideList.style.left = -CharIndex * 760 + "px";
    if (LocalData.Cat[CharIndex] != false) ChoiceCat = CharIndex;
    else ChoiceCat = -1;
  }
}

function SlideRight() {
  if (CharIndex < 4) {
    ++CharIndex;
    _SlideList.style.left = -CharIndex * 760 + "px";
    if (LocalData.Cat[CharIndex] != false) ChoiceCat = CharIndex;
    else ChoiceCat = -1;
  }
}
function BuyChar() {
  if (LocalData.Coin >= 100) {
    LocalData.Coin -= 100;
    LocalData.Cat[this.id] = true;
    ChoiceCat = this.id;

    this.style.display = "none";
    SaveData();
    // 코인 차감
    // Buybtn 비활성
    // 로컬데이터 수정
  }
}

function MapLevel() {
  if (ChoiceLevel === 0) {
    this.textContent = "하드 모드";
    ++ChoiceLevel;
  } else if (ChoiceLevel === 1) {
    this.textContent = "지옥 모드";
    ++ChoiceLevel;
  } else {
    this.textContent = "일반 모드";
    ChoiceLevel = 0;
  }
}
