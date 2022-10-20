import "../CSS/CharSpace.css";
import { StartBtnOn } from "./StartPage";

var _CharSpace;

var _SlideList;

const CharPageInit = () => {
  //여기서 미리 서버 정보를 가져온다.
  var _StartBtnList = document.getElementById("StartBtnList");
  // StartPage가 생성되면 StartPage에 CharPage를 넣는것으로 하자
  _CharSpace = document.createElement("div");
  _CharSpace.className = "CharSpace";
  _CharSpace.style.display = "none";
  _StartBtnList.appendChild(_CharSpace);
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
  for (let i = 1; i <= 5; ++i) {
    const _CharTemplate = document.createElement("li");

    _CharTemplate.className = "CharTemplate";
    var CharImg = document.createElement("img");
    CharImg.src = "images/CharImg/1.png";
    CharImg.width = 150;
    CharImg.height = 150;
    CharImg.style.margin = "10px";

    _CharTemplate.appendChild(CharImg);

    var CharContxt = document.createElement("p");
    CharContxt.textContent =
      "다솜 감사합니다 비나리 우리는 노트북 아련 그루잠 바람꽃\
     도담도담 그루잠 나래 산들림 이플 별빛 비나리 나래 옅구름 \
     도서관 예그리나 도담도담 아름드리 안녕 이플 별하 함초롱하다 아련 나래 우리는\
      바나나 미리내 가온누리 로운 컴퓨터 소록소록 바람꽃 옅구름 책방 감사합니다 별빛 \
      도서관 아름드리 이플 포도 나래 별빛 이플 옅구름 미리내 아슬라 노트북.";
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
  // --------------------------------------
  _CharBtnList.appendChild(_BackStartBtn);

  // 게임시작
  const _StartGameBtn = document.createElement("button");
  _StartGameBtn.className = "CharBtn";
  _StartGameBtn.textContent = "게임 시작";
  _CharBtnList.appendChild(_StartGameBtn);

  // 난이도 설정 임시로 버튼
  const _MapLevel = document.createElement("button");
  _MapLevel.className = "CharBtn";
  _MapLevel.textContent = "난이도";
  _CharBtnList.appendChild(_MapLevel);
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

  console.log("GameStart");
}

let CharIndex = 0;
function SlideLeft() {
  if (CharIndex > 0) {
    --CharIndex;
    _SlideList.style.left = -CharIndex * 760 + "px";
  }
}

function SlideRight() {
  if (CharIndex < 4) {
    ++CharIndex;
    _SlideList.style.left = -CharIndex * 760 + "px";
  }
}
