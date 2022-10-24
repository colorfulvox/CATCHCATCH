import weapon from "./weaponUpgrade.js";
import tower from "./towerUpgrade.js";
export default function initUpgrade() {
  const app = document.querySelector("#app");
  app.innerHTML = `
  <div class="upgradeContainer">
    <div class="upgradeType">
        <div class="weaponType">weapon</div>
        <div class="towerType">tower</div>
    </div>
    <div class="upgradeContent">
    </div>
  </div>`;
  const towerType = document.querySelector(".towerType");
  towerType.addEventListener("click", () => {
    tower();
  });
  weapon();
  const weaponType = document.querySelector(".weaponType");
  weaponType.addEventListener("click", () => {
    const upgradeContent = document.querySelector(".upgradeContent");
    weapon();
  });
}

initUpgrade();
