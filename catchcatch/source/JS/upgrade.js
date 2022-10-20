import weapon from "./weaponUpgrade.js";
import tower from "./towerUpgrade.js";
export default function initUpgrade() {
  const app = document.querySelector("#app");
  app.innerHTML = `
  <button class="btn1">헤헤헤헤</button>
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
    weapon();
  });
  const btn1 = document.querySelector(".btn1");
  btn1.addEventListener("click", () => {
    const upgradeContainer = document.querySelector(".upgradeContainer");
    upgradeContainer.style.display = "flex";
  });
}

initUpgrade();
