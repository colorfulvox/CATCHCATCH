import weapon from "./weapon-upgrade.js";
import tower from "./tower-upgrade.js";
import {setSound} from "../SOUND/sound";
export default function initUpgrade() {
  // console.log(this.)
  if (ChoiceCat === 5) {
    let rand = Math.floor(Math.random() * 20);
    setSound.playSE(rand);
  } else {
    setSound.playSE(18);
  }
  $this.pause();
  const gameContainer = document.querySelector("#game-container");
  const upgradeContainer = document.createElement("div");
  const upgradeContent = document.createElement("div");
  const upgradeType = document.createElement("div");
  const weaponType = document.createElement("div");
  const towerType = document.createElement("div");
  upgradeContainer.setAttribute("class", "upgradeContainer");

  upgradeContent.setAttribute("class", "upgradeContent");

  upgradeContent.style.backgroundImage = 'url("images/ui/upgradebase.png")';
  upgradeContent.style.backgroundPosition = "center";
  upgradeContent.style.backgroundRepeat = "no-repeat";
  upgradeContent.style.backgroundSize = "contain";

  upgradeType.setAttribute("class", "upgradeType");
  weaponType.setAttribute("class", "weaponType");
  towerType.setAttribute("class", "towerType");
  weaponType.innerText = "weaponType";
  towerType.innerText = "towerType";
  if (!isUpgrade) {
    window.addEventListener("keydown", sceneHandler);
  }
  towerType.addEventListener("click", () => {
    tower();
  });
  weaponType.addEventListener("click", () => {
    weapon();
  });

  upgradeType.appendChild(weaponType);
  upgradeType.appendChild(towerType);
  upgradeContainer.appendChild(upgradeType);
  upgradeContainer.appendChild(upgradeContent);
  gameContainer.appendChild(upgradeContainer);
  weapon();
}

export function closeUpgrade() {
  const gameContainer = document.querySelector("#game-container");
  const upgradeContainer = document.querySelector(".upgradeContainer");
  gameContainer.removeChild(upgradeContainer);
}
// initUpgrade();

function sceneHandler(e) {
  if (e.key === "Shift") {
    $this.resume();
    closeUpgrade();
    window.removeEventListener("keydown", sceneHandler);
  }
}
