export default function levelup() {
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
    levelupImg.setAttribute("class", "levelupImg");
    levelupImg.innerText = "특성 아이콘";
    levelupText.setAttribute("class", "levelupText");
    levelupText.innerText = "설명";
    levelupContent.appendChild(levelupImg);
    levelupContent.appendChild(levelupText);
    levelupContainer.appendChild(levelupContent);
  }

  gameContainer.appendChild(levelupContainer);
  const contents = document.querySelectorAll(".levelupContent");
  // const levelupContainer = document.querySelector(".levelupContainer");
  console.log(contents);
  const removeContainer = document.querySelector(".levelupContainer");
  for (let i = 0; i < 3; i++) {
    contents[i].addEventListener("click", () => {
      console.log("특성");
      $this.resume();
      gameContainer.removeChild(removeContainer);
    });
  }
}
