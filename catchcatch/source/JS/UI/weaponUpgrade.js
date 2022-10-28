import Player from "../GAME/GameObj/player";

export default function weapon() {
  const arr = ["", "", "", "", "", "", "", "", ""];
  const fairy = [wizard, reaper, ninja, slime, witch];
  const upgradecontent = document.querySelector(".upgradeContent");
  upgradecontent.innerHTML = "";
  const weaponContent = document.createElement("div");
  weaponContent.setAttribute("class", "weaponContent");
  const levelContent = document.createElement("div");
  levelContent.setAttribute("class", "levelContent");
  arr.map((el, idx) => {
    const div = document.createElement("div");
    div.setAttribute("class", "level");
    div.innerText = `Lv.${idx + 1}`;
    levelContent.appendChild(div);
  });
  weaponContent.appendChild(levelContent);
  fairy.map((el, idx) => {
    const weaponIcons = document.createElement("div");
    weaponIcons.setAttribute("class", "weaponIcons");
    arr.map((e12, idx2) => {
      const div = document.createElement("div");
      if (idx2 < el.level) {
        div.innerText = "완료";
      } else {
        div.innerText = "그림";
        if (idx2 === 4 || idx2 === 8) {
          div.addEventListener("click", () => {
            if (fairy[idx].level === idx2) {
              fairy[idx].levelUp();
            }
          });
        }
      }
      weaponIcons.appendChild(div);
    });
    weaponContent.appendChild(weaponIcons);
  });

  upgradecontent.appendChild(weaponContent);
}
