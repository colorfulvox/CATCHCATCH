import weapon from "./weaponUpgrade.js";
import tower from "./towerUpgrade.js";
import player from "./playerUpgrade.js";
export default function initUpgrade() {
  // console.log(this.)

  $this.pause();
  const gameContainer = document.querySelector("#game-container");
  const upgradeContainer = document.createElement("div");
  const upgradeContent = document.createElement("div");
  const upgradeType = document.createElement("div");
  const playerType = document.createElement("div");
  const weaponType = document.createElement("div");
  const towerType = document.createElement("div");
  upgradeContainer.setAttribute("class", "upgradeContainer");
  upgradeContent.setAttribute("class", "upgradeContent");
  upgradeType.setAttribute("class", "upgradeType");
  playerType.setAttribute("class", "playerType");
  weaponType.setAttribute("class", "weaponType");
  towerType.setAttribute("class", "towerType");
  playerType.innerText = "playerType";
  weaponType.innerText = "weaponType";
  towerType.innerText = "towerType";
  playerType.addEventListener("click", () => {
    player();
    thiss.resume();
    console.log(pause);
  });
  if (!isUpgrade) {
    window.addEventListener("keydown", sceneHandler);
  }
  towerType.addEventListener("click", () => {
    tower();
  });
  weaponType.addEventListener("click", () => {
    weapon();
  });
  upgradeType.appendChild(playerType);

  upgradeType.appendChild(weaponType);
  upgradeType.appendChild(towerType);
  upgradeContainer.appendChild(upgradeType);
  upgradeContainer.appendChild(upgradeContent);
  gameContainer.appendChild(upgradeContainer);
  player();
}

export function closeUpgrade() {
  const gameContainer = document.querySelector("#game-container");
  const upgradeContainer = document.querySelector(".upgradeContainer");
  gameContainer.removeChild(upgradeContainer);
}
// initUpgrade();

function sceneHandler(e) {
  if (e.key == "Shift") {
    $this.resume();
    closeUpgrade();
    window.removeEventListener("keydown", sceneHandler);
  }
}
