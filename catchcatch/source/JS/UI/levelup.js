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
  "heal",
  "coin",
];

export default function levelup() {
  const property = {
    fire: {
      name: "불 고양이",
      pet: petFire,
      text: ["불 고양이 소환", "화염 폭풍 증가", "화염 폭풍 추가 증가"],
    },
    normal: {
      name: "평범한 고양이",
      pet: petNormal,
      text: ["평범한 고양이 소환", "탄환 수 증가", "탄환 수 추가 증가"],
    },
    thunder: {
      name: "번개 고양이",
      pet: petThunder,
      text: ["번개 고양이 소환", "낙뢰 수 증가 ", "낙뢰 수 추가 증가"],
    },
    water: {
      name: "물 고양이",
      pet: petWater,
      text: ["물 고양이 소환", "파도 개수 증가", "파도 개수 추가 증가"],
    },
    earth: {
      name: "땅 고양이",
      pet: petEarth,
      text: ["땅 고양이 소환", "토벽 길이 증가", "토벽 길이 추가 증가"],
    },
    god: {
      name: "갓 고양이",
      pet: petGod,
      text: ["신 강림", "ھەقسىز شىزاڭ", "تيەنئەنمېننى \nئېسىڭىزدە تۇتۇڭ"],
    },
    // 2 3 4 [5] 6 7 8 [9]
    wizard: {
      name: "위저드",
      fairy: wizard,
      text: [
        "불마법 개수 증가",
        "공격 속도 증가",
        "관통 효과 적용",
        "스킬 해금 \n범위 내 적을 피격하는 마법진 소환",

        "불마법 개수 증가",
        "공격 속도 증가",
        "관통 개수 증가",
        "스킬 강화 \n마법진의 범위 증가",
      ],
    },
    reaper: {
      name: "사신",
      fairy: reaper,
      text: [
        "공격 범위 증가",
        "공격 속도 증가",
        "흡혈 효과 적용",
        "스킬 해금 \n일정 시간 공격속도 \n무제한",

        "공격 범위 증가",
        "공격 속도 증가",
        "흡혈 효과 증가",
        "요정 강화 \n공격을 할 시 \n검기를 날립니다.",
      ],
    },
    ninja: {
      name: "닌자",
      fairy: ninja,
      text: [
        "사거리 증가",
        "공격 속도 증가",
        "기절 효과 적용",
        "요정 강화 \n공격이 이제\n3갈래로 나뉩니다.",

        "사거리 증가",
        "공격 속도 증가",
        "기절 효과 증가",
        "요정 강화 \n공격이 일정 확률로\n적을 즉사시킵니다.",
      ],
    },
    slime: {
      name: "슬라임",
      fairy: slime,
      text: [
        "공격 속도 증가",
        "튕기는 횟수 증가",
        "복사 효과 적용",
        "스킬 해금 \n원형범위에 \n대미지를 입힙니다.",

        "공격 속도 증가",
        "튕기는 횟수 증가",
        "복사 효과 증가",
        "요정 강화 \n공격이 튕기는 확률이 대폭 증가합니다.",
      ],
    },
    witch: {
      name: "마녀",
      fairy: witch,
      text: [
        "설치 개수 증가Ⅰ",
        "폭팔 반경 증가",
        "설치 개수 증가Ⅱ",
        "스킬 강화 \n스킬 쿨타임이 \n50% 감소합니다.",

        "설치 개수 증가Ⅲ",
        "폭팔 반경 증가",
        "설치 개수 증가Ⅳ",
        "요정 강화 \n이제 마우스 커서에\n폭탄을 설치합니다.",
      ],
    },
    heal: { name: "회복", text: "체력 5 회복" },
    coin: { name: "캔", text: "캔 1개 획득" },
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
  if (levelCount === 11) {
    randomIndexArray = [11, 12];
  } else {
    for (let i = 0; i < 3; i++) {
      let randomNum;
      if (levelCount >= 8) {
        randomNum = Math.floor(Math.random() * 13);
      } else {
        randomNum = Math.floor(Math.random() * 11);
      }
      if (randomIndexArray.indexOf(randomNum) === -1) {
        if (
          randomNum > 5 &&
          randomNum < 11 &&
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
  for (let i = 0; i < randomIndexArray.length; i++) {
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

    if (randomIndexArray[i] > 5 && randomIndexArray[i] < 11) {
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
    } else if (randomIndexArray[i] >= 11) {
      levelupContent.setAttribute("id", `${_propertyArr[randomIndexArray[i]]}`);
      levelupText.innerText = `${
        property[_propertyArr[randomIndexArray[i]]].text
      }`;
      // level.innerText = `Lv.${
      //   property[_propertyArr[randomIndexArray[i]]].fairy.level + 1
      // }`;
      levelupContent.style.backgroundImage =
        'url("images/ui/levelup/tunaspace.png")';
      // 설명인데..
      levelupName.innerHTML = `[${
        property[_propertyArr[randomIndexArray[i]]].name
      }]`;
    } else {
      levelupContent.style.backgroundImage =
        'url("images/ui/levelup/petupgrade_addName.png")';
      console.log(property[_propertyArr[randomIndexArray[i]]]);
      levelupContent.setAttribute("id", `${_propertyArr[randomIndexArray[i]]}`);
      levelupText.innerText =
        property[_propertyArr[randomIndexArray[i]]].text[
          property[_propertyArr[randomIndexArray[i]]].pet.level
        ];
      level.innerText = `Lv.${
        property[_propertyArr[randomIndexArray[i]]].pet.level + 1
      }`;
      levelupName.innerHTML = `[${
        property[_propertyArr[randomIndexArray[i]]].name
      }]`;
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
    if (ChoiceCat === 3) {
      const div = document.createElement("div");
      div.setAttribute("class", "que");
      div.innerText = "?";
      div.setAttribute("id", `${_propertyArr[randomIndexArray[i]]}`);
      levelupContent.appendChild(div);
    }
  }

  gameContainer.appendChild(levelupContainer);
  let contents;
  if (ChoiceCat === 3) {
    contents = document.querySelectorAll(".que");
  } else {
    contents = document.querySelectorAll(".levelupContent");
  }
  // const levelupContainer = document.querySelector(".levelupContainer");
  const removeContainer = document.querySelector(".levelupContainer");

  for (let i = 0; i < randomIndexArray.length; i++) {
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
        } else if (contents[i].id === "heal") {
          player.health += 5;
          if (player.health >= 10) {
            player.health = 10;
          }
        } else if (contents[i].id === "coin") {
          inGameCoin += 1;
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
