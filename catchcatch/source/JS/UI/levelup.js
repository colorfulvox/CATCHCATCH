import { setSound } from "../SOUND/sound";

const _propertyArr = [
  "fire",
  "normal",
  "thunder",
  "water",
  "earth",
  "god",
  "wizard",
  "reaper",
  "ninja",
  "slime",
  "witch",
];

export default function levelup() {
  const property = {
    fire: {
      name: "불 고양이",
      pet: petFire,
      text: [
        "불 고양이 생성",
        "화염 폭풍 개수 증가",
        "공격주기 감소(쿨타임 감소)",
      ],
    },
    normal: {
      name: "일반 고양이",
      pet: petNormal,
      text: [
        "일반 고양이 생성",
        "보호막 개수 증가",
        "공격주기 감소(쿨타임 감소)",
      ],
    },
    thunder: {
      name: "전기 고양이",
      pet: petThunder,
      text: [
        "전기 고양이 생성",
        "전기 구슬 생성 증가",
        "공격주기 감소(쿨타임 감소)",
      ],
    },
    water: {
      name: "물 고양이",
      pet: petWater,
      text: ["물 고양이 생성", "파도 개수 증가", "공격주기 감소(쿨타임 감소)"],
    },
    earth: {
      name: "땅 고양이",
      pet: petEarth,
      text: ["땅 고양이 생성", "토벽 길이 증가", "공격주기 감소(쿨타임 감소)"],
    },
    god: {
      name: "갓 고양이",
      pet: petGod,
      text: [
        "갓 고양이 생성",
        "스킬 쿨타임 감소",
        "공격주기 감소(쿨타임 감소)",
      ],
    },
    // 2 3 4 [5] 6 7 8 [9]
    wizard: {
      name: "위저드",
      fairy: wizard,
      text: [
        "불마법 개수 증가",
        "공격 속도 증가",
        "관통 효과 적용",
        "마법사 1차 강화",

        "불마법 개수 증가",
        "공격 속도 증가",
        "관통 개수 증가",
        "마법사 2차 강화",
      ],
    },
    reaper: {
      name: "사신",
      fairy: reaper,
      text: [
        "공격 범위 증가",
        "공격 속도 증가",
        "흡혈 효과 적용",
        "사신 1차 강화",

        "공격 범위 증가",
        "공격 속도 증가",
        "흡혈 효과 증가",
        "사신 2차 강화",
      ],
    },
    ninja: {
      name: "닌자",
      fairy: ninja,
      text: [
        "사거리 증가",
        "공격 속도 증가",
        "기절 효과 적용",
        "닌자 1차 강화",

        "사거리 증가",
        "공격 속도 증가",
        "기절 효과 증가",
        "닌자 2차 강화",
      ],
    },
    slime: {
      name: "슬라임",
      fairy: slime,
      text: [
        "공격 속도 증가",
        "튕기는 횟수 증가",
        "복사 효과 적용",
        "슬라임 1차 강화",

        "공격 속도 증가",
        "튕기는 횟수 증가",
        "복사 효과 증가",
        "슬라임 2차 강화",
      ],
    },
    witch: {
      name: "마녀",
      fairy: witch,
      text: [
        "설치 개수 증가Ⅰ",
        "폭팔 반경 증가",
        "설치 개수 증가Ⅱ",
        "마녀 1차 강화",

        "설치 개수 증가Ⅲ",
        "폭팔 반경 증가",
        "설치 개수 증가Ⅳ",
        "마녀 2차 강화",
      ],
    },
  };
  if (ChoiceCat === 5) {
    let rand = Math.floor(Math.random() * 20);
    setSound.playSE(rand);
  } else if (ChoiceCat === 2) {
    setSound.playSE(21);
  } else {
    setSound.playSE(19);
  }

  let randomIndexArray = [];
  const randomCommons = [0, 0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 11);
    console.log(randomNum);
    if (randomIndexArray.indexOf(randomNum) === -1) {
      if (
        randomNum > 5 &&
        property[_propertyArr[randomNum]].fairy.level === 9
      ) {
        i--;
      } else if (
        randomNum < 5 &&
        property[_propertyArr[randomNum]].pet.level === 3
      ) {
        i--;
      } else if (randomNum === 5) {
        let flag = false;
        for (let j = 0; j < 5; j++) {
          if (property[_propertyArr[j]].pet.level !== 3) {
            flag = true;
          }
        }
        if (property[_propertyArr[5]].pet.level === 3) {
          flag = true;
        }
        if (flag === true) {
          i--;
        } else {
          randomIndexArray.push(randomNum);
        }
      } else {
        randomIndexArray.push(randomNum);
      }
    } else {
      i--;
    }
  }
  const gameContainer = document.querySelector("#game-container");

  // const levelupContainer = document.createElement("div");
  // levelupContainer.setAttribute("class", "levelupContainer");
  $this.pause();
  const levelupContainer = document.createElement("div");
  levelupContainer.style.backgroundImage = 'url("images/ui/levelup/Base.png")';
  levelupContainer.style.backgroundPosition = "center";
  levelupContainer.style.backgroundRepeat = "no-repeat";
  levelupContainer.style.backgroundSize = "cotain";
  levelupContainer.setAttribute("class", "levelupContainer");
  console.log(randomIndexArray);
  console.log(property);
  console.log(_propertyArr);
  for (let i = 0; i < 3; i++) {
    let randomCommon = Math.floor(Math.random() * 4);
    while (randomCommons[randomCommon - 1] === 1) {
      randomCommon = Math.floor(Math.random() * 4);
    }
    randomCommons[randomCommon - 1] = 1;
    const levelupContent = document.createElement("div");
    const levelupImg = document.createElement("div");
    const levelupText = document.createElement("div");
    levelupContent.setAttribute("class", "levelupContent");
    levelupImg.setAttribute("class", "levelupImg");
    levelupText.setAttribute("class", "levelupText");
    const levelImgandNameBox = document.createElement("div");
    levelImgandNameBox.setAttribute("class", "levelImgandNameBox");
    const levelupName = document.createElement("div");
    levelupName.setAttribute("class", "levelupName");
    const level = document.createElement("div");
    level.setAttribute("class", "level");

    if (randomIndexArray[i] > 5) {
      levelupContent.setAttribute("id", `${_propertyArr[randomIndexArray[i]]}`);
      levelupText.innerText = `${
        property[_propertyArr[randomIndexArray[i]]].text[
          property[_propertyArr[randomIndexArray[i]]].fairy.level - 1
        ]
      }`;
      level.innerText = `Lv.${
        property[_propertyArr[randomIndexArray[i]]].fairy.level + 1
      }`;
      levelupContent.style.backgroundImage =
        'url("images/ui/levelup/fairyupgrade_addName.png")';
      // 설명인데..
      levelupName.innerHTML = `[${
        property[_propertyArr[randomIndexArray[i]]].name
      }]`;
      // levelupName.textContent += "Lv. 1";
    } else {
      levelupContent.style.backgroundImage =
        'url("images/ui/levelup/commonupgrade_addName.png")';
      console.log(property[_propertyArr[randomIndexArray[i]]]);
      levelupContent.setAttribute("id", `${_propertyArr[randomIndexArray[i]]}`);
      levelupText.innerText =
        property[_propertyArr[randomIndexArray[i]]].text[
          property[_propertyArr[randomIndexArray[i]]].pet.level
        ];
      level.innerText = `Lv.${
        property[_propertyArr[randomIndexArray[i]]].pet.level + 1
      }`;
      levelupName.innerHTML = `${
        property[_propertyArr[randomIndexArray[i]]].name
      }`;
      // levelupName.textContent += "Lv. 1";
    }
    levelupContent.style.backgroundRepeat = "no-repeat";
    levelupContent.style.backgroundPosition = "center";
    levelupContent.style.backgroundSize = "contain";

    //스킬 아이콘
    levelupImg.style.backgroundImage = `url("images/ui/Icon/levelupicon/${randomIndexArray[i]}.png")`;

    levelupImg.style.backgroundRepeat = "no-repeat";
    levelupImg.style.backgroundPosition = "center";
    levelupImg.style.backgroundSize = "contain";

    levelImgandNameBox.appendChild(levelupImg);
    levelImgandNameBox.appendChild(levelupName);
    levelImgandNameBox.appendChild(level);
    levelupContent.appendChild(levelImgandNameBox);
    levelupContent.appendChild(levelupText);
    levelupContainer.appendChild(levelupContent);
  }

  gameContainer.appendChild(levelupContainer);
  const contents = document.querySelectorAll(".levelupContent");
  // const levelupContainer = document.querySelector(".levelupContainer");
  const removeContainer = document.querySelector(".levelupContainer");
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      contents[i].addEventListener("click", () => {
        if (contents[i].id === "wizard") {
          wizard.levelUp();
          console.log(wizard);
        } else if (contents[i].id === "reaper") {
          reaper.levelUp();
          console.log(reaper);
        } else if (contents[i].id === "ninja") {
          ninja.levelUp();
          console.log(ninja);
        } else if (contents[i].id === "slime") {
          slime.levelUp();
          console.log(slime);
        } else if (contents[i].id === "witch") {
          witch.levelUp();
          console.log(witch);
        } else if (contents[i].id === "normal") {
          petNormal.levelUp();
        } else if (contents[i].id === "fire") {
          petFire.levelUp();
        } else if (contents[i].id === "thunder") {
          petThunder.levelUp();
        } else if (contents[i].id === "water") {
          petWater.levelUp();
        } else if (contents[i].id === "earth") {
          petEarth.levelUp();
        } else if (contents[i].id === "god") {
          petGod.levelUp();
        }
        player.expUpdate();
        console.log(player.exp, player.maxExp);
        isLevelup = false;
        $this.resume();
        gameContainer.removeChild(removeContainer);
      });
    }, 500);
  }
}
