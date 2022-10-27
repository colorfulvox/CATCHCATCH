const propertyArr = ["common", "wizard", "reaper", "ninja", "slime", "witch"];
const commonArr = ["health", "dmgmulLevel", "heal", "speed"];
export default function levelup() {
  const property = {
    common: {
      health: { level: player.healthLevel, text: "최대 체력 증가" },
      dmgmulLevel: { level: player.dmgmulLevel, text: "공격력 증가" },
      heal: { level: player.healLevel, text: "회복력 증가" },
      speed: { level: player.speedLevel, text: "이동속도 증가" },
    },
    wizard: { fairy: wizard },
    reaper: { fairy: reaper },
    ninja: { fairy: ninja },
    slime: { fairy: slime },
    witch: { fairy: witch },
  };
  let randomIndexArray = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.floor(Math.random() * 6);
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      i--;
    }
  }
  console.log(randomIndexArray);
  const gameContainer = document.querySelector("#game-container");
  // const levelupContainer = document.createElement("div");
  // levelupContainer.setAttribute("class", "levelupContainer");
  $this.pause();
  const levelupContainer = document.createElement("div");
  levelupContainer.setAttribute("class", "levelupContainer");
  const randomCommon = Math.floor(Math.random() * 4);
  for (let i = 0; i < 3; i++) {
    const levelupContent = document.createElement("div");
    const levelupImg = document.createElement("div");
    const levelupText = document.createElement("div");
    levelupContent.setAttribute("class", "levelupContent");
    levelupContent.setAttribute("id", `${propertyArr[randomIndexArray[i]]}`);
    levelupImg.setAttribute("class", "levelupImg");
    levelupImg.innerText = `${propertyArr[randomIndexArray[i]]}`;
    levelupText.setAttribute("class", "levelupText");
    if (propertyArr[randomIndexArray[i]] !== "common") {
      levelupText.innerText = `${
        property[propertyArr[randomIndexArray[i]]].fairy.level
      }`;
    } else {
      levelupText.innerText =
        property.common[commonArr[randomCommon]].level +
        property.common[commonArr[randomCommon]].text;
    }
    levelupContent.appendChild(levelupImg);
    levelupContent.appendChild(levelupText);
    levelupContainer.appendChild(levelupContent);
  }

  gameContainer.appendChild(levelupContainer);
  const contents = document.querySelectorAll(".levelupContent");
  // const levelupContainer = document.querySelector(".levelupContainer");
  const removeContainer = document.querySelector(".levelupContainer");
  for (let i = 0; i < 3; i++) {
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
      } else {
        player[`${commonArr[randomCommon]}Level`] += 1;
      }

      $this.resume();
      gameContainer.removeChild(removeContainer);
    });
  }
}
