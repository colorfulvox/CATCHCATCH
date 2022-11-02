import "../../CSS/UI/StartPage.css";
import "./char-space.js";
import CharPageInit, {CharSpaceOn} from "./char-space.js";

let mode = true;
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
        mode = !mode;
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
    let Btn = document.createElement("button");
    Btn.className = "StartBtn";
    Btn.textContent = "GameStart";

    //이벤트 리스너 추가------------
    if (mode === true) {
        Btn.addEventListener("click", GoSelectChar);
    } else {
        Btn.addEventListener("click", () => {
            console.log("코딩모드 시작");
        });
    }
    //-------------------------

    _GoSelectChar.appendChild(Btn);

    _StartBtn.appendChild(_GoSelectChar); //시작하기 버튼 추가;
    //================================================

    // 랭킹 ============================================
    if (mode === false) {
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
    StartBtnOff();
    CharSpaceOn();
}
