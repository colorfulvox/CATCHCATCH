const arr = ["common", "wizard", "reaper", "ninja", "slime", "witch"];

export default function levelup() {
  const property = {
    common: [],
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
  for (let i = 0; i < 3; i++) {
    const levelupContent = document.createElement("div");
    const levelupImg = document.createElement("div");
    const levelupText = document.createElement("div");
    levelupContent.setAttribute("class", "levelupContent");
    levelupContent.setAttribute("id", `${arr[randomIndexArray[i]]}`);
    levelupImg.setAttribute("class", "levelupImg");
    levelupImg.innerText = `${arr[randomIndexArray[i]]}`;
    levelupText.setAttribute("class", "levelupText");
    if (arr[randomIndexArray[i]] !== "common") {
      levelupText.innerText = `${
        property[arr[randomIndexArray[i]]].fairy.level
      }`;
    } else {
      levelupText.innerText = player.level;
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
        wizard.level++;
        console.log(wizard);
      } else if (contents[i].id === "reaper") {
        reaper.level++;
        console.log(reaper);
      } else if (contents[i].id === "ninja") {
        ninja.level++;
        console.log(ninja);
      } else if (contents[i].id === "slime") {
        slime.level++;
        console.log(slime);
      } else if (contents[i].id === "witch") {
        witch.level++;
        console.log(witch);
      }

      $this.resume();
      gameContainer.removeChild(removeContainer);
    });
  }
}
