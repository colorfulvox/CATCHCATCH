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
    if (idx !== 0) {
      const div = document.createElement("div");
      div.setAttribute("class", "level");
      div.innerText = `Lv.${idx + 1}`;
      levelContent.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.style.width = "120px";
      div.innerText = "";
      levelContent.appendChild(div);
    }
  });
  weaponContent.appendChild(levelContent);
  let iconidx = 1;
  fairy.map((el, idx) => {
    const weaponIcons = document.createElement("div");
    weaponIcons.setAttribute("class", "weaponIcons");
    arr.map((e12, idx2) => {
      const div = document.createElement("div");
      const img = document.createElement("img");
      if (idx2 === 0) {
        div.setAttribute("class", "fairyicon");
        div.style.backgroundImage = `url("images/ui/Icon/char/fairy${iconidx++}.png")`;
        div.style.backgroundPosition = "center";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundSize = "contain";
      } else {
        div.setAttribute("class", "weaponicon");
        img.setAttribute("class", "weaponImg");
        div.style.backgroundImage = `url("images/ui/upgradeicon.png")`;
        div.style.backgroundPosition = "center";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundSize = "contain";
        if (idx2 < el.level) {
          img.src = "images/ui/Icon/sample.png";
        } else {
          img.src = "images/ui/Icon/sample.png";

          if (idx2 === 4 || idx2 === 8) {
            div.addEventListener("click", () => {
              if (fairy[idx].level === idx2) {
                fairy[idx].levelUp();
                weapon();
              }
            });
          }
        }
      }
      div.appendChild(img);
      weaponIcons.appendChild(div);
    });
    weaponContent.appendChild(weaponIcons);
  });

  upgradecontent.appendChild(weaponContent);
}
