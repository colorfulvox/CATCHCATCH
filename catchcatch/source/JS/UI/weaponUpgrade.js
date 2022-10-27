export default function weapon() {
  const arr = ["", "", "", "", "", "", "", "", ""];
  const fairy = [wizard, reaper, ninja, slime, witch];
  const upgradecontent = document.querySelector(".upgradeContent");
  upgradecontent.innerHTML = "";
  const weaponContent = document.createElement("div");
  weaponContent.setAttribute("class", "weaponContent");
  fairy.map((el, idx) => {
    const weaponIcons = document.createElement("div");
    weaponIcons.setAttribute("class", "weaponIcons");
    arr.map((e12, idx2) => {
      const div = document.createElement("div");
      if (idx2 < el.level) {
        div.innerText = "완료";
      } else {
        div.innerText = "그림";
      }
      weaponIcons.appendChild(div);
    });
    weaponContent.appendChild(weaponIcons);
  });
  upgradecontent.appendChild(weaponContent);
}
