import "../../CSS/UI/CharSpace.css";
import {StartBtnOn} from "./start-page";
import {SaveData} from "../../main.js";
import {config} from "../GAME/game.js";

let _SettingSpace;

let _SlideList;
let _BuyBtn;
let _GameStartBtn;
let _CanCount;
const catnamelist = [
    "캐　츠",
    "용냥이",
    "무냥이",
    "영냥이",
    "진냥이",
    "규냥이",
    "희냥이",
];

const CharPageInit = () => {
    //여기서 미리 서버 정보를 가져온다. ---------------------------
    let _AllBtn = document.getElementById("AllBtnList");
    // StartPage가 생성되면 StartPage에 CharPage를 넣는것으로 하자
    _SettingSpace = document.createElement("div");
    _SettingSpace.className = "SettingSpace";
    _SettingSpace.style.display = "none";

    _AllBtn.appendChild(_SettingSpace);
    //--------------------------------------------------

    //뒤로가기
    let _BackIcon = document.createElement("button");
    _BackIcon.className = "BackIcon";
    _SettingSpace.appendChild(_BackIcon);
    _BackIcon.addEventListener("click", BackStart);

    // 캔 갯수 표시
    let _CanIcon = document.createElement("div");
    _CanIcon.className = "CanIcon";
    _SettingSpace.appendChild(_CanIcon);

    _CanCount = document.createElement("div");
    _CanCount.className = "CanCount";
    _CanCount.textContent = "x" + LocalData.Coin;
    _CanIcon.appendChild(_CanCount);

    //고양이 구매
    _BuyBtn = document.createElement("button");
    _BuyBtn.className = "BuyBtn";
    _SettingSpace.appendChild(_BuyBtn);
    _BuyBtn.textContent = "100 Can!";
    _BuyBtn.style.display = "none";
    _BuyBtn.addEventListener("click", BuyChar);

    // 캐릭터 선택 Space
    let _CharSpace = document.createElement("div");
    _CharSpace.className = "CharSpace";
    _SettingSpace.appendChild(_CharSpace);

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

    _SlideList = document.createElement("div");
    _SlideList.className = "SlideList";
    _Slide.appendChild(_SlideList);

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

        if (LocalData.Cat[i] !== false)
            _CharName.textContent = "[" + catnamelist[i] + "]";
        else _CharName.textContent = "[" + " ???? " + "]";
        _CharTemp.appendChild(_CharName);

        _SlideList.appendChild(_CharTemp);
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
    _SettingSpace.appendChild(_OtherBtn);

    let _LevelBtn = document.createElement("button");
    _LevelBtn.className = "LevelBtn";
    _LevelBtn.textContent = "NORMAL";
    _LevelBtn.style.background =
        "url('images/ui/MapLevelNormal.png') no-repeat center";
    _LevelBtn.style.backgroundSize = "contain";
    _LevelBtn.addEventListener("click", MapLevel);
    _OtherBtn.appendChild(_LevelBtn);

    _GameStartBtn = document.createElement("button");
    _GameStartBtn.className = "GameStartBtn";
    _GameStartBtn.id = "GameStartBtn";
    _GameStartBtn.textContent = "GO!CATCH!";
    _GameStartBtn.style.textAlign = "center";
    _GameStartBtn.addEventListener("click", GameStart);
    _OtherBtn.appendChild(_GameStartBtn);
};

export default CharPageInit;

export const CharSpaceOn = () => {
    _SettingSpace.style.display = "flex";
};

export const CharSpaceOff = () => {
    _SettingSpace.style.display = "none";
};

// 돌아가기
function BackStart() {
    CharSpaceOff();
    StartBtnOn();
}

function GameStart() {
    //app 자체를 false해야되나?
    if (ChoiceCat === -1) console.log("시작 불가");
    const StartPage = document.querySelector(".StartPage");
    StartPage.style.display = "none";
    let game = new Phaser.Game(config);
    const gameContainer = document.querySelector("#game-container");
    gameContainer.style.display = "block";
}

let CharIndex = 0;

function Slide() {
    _SlideList.style.left = -CharIndex * 190 + "px";
    if (LocalData.Cat[CharIndex] !== false) {
        ChoiceCat = CharIndex;
        const target = document.getElementById("GameStartBtn");
        target.disabled = false;
        _BuyBtn.style.display = "none";
    } else {
        ChoiceCat = -1;
        const target = document.getElementById("GameStartBtn");
        target.disabled = true;
        _BuyBtn.style.display = "inline-block";
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
    if (LocalData.Coin >= 100) {
        LocalData.Coin -= 100;
        LocalData.Cat[CharIndex] = true;
        ChoiceCat = CharIndex;

        _CanCount.textContent = "x" + LocalData.Coin;

        const ChangeCharImg = document.getElementById(`CharImg_${CharIndex}`);
        ChangeCharImg.src = `images/CharImg/${CharIndex}.png`;
        const ChangeCharName = document.getElementById(`CharName_${CharIndex}`);
        ChangeCharName.textContent = "[" + catnamelist[CharIndex] + "]";

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
