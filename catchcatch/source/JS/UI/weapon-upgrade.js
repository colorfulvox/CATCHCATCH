import Player from "../GAME/GameObj/player";
import {setSound} from "../SOUND/sound";

export default function weapon() {
    const arr = ["", "", "", "", "", "", "", "", ""];
    const fairy = [wizard, reaper, ninja, slime, witch];
    const upgradeContent = document.querySelector(".upgradeContent");
    upgradeContent.innerHTML = "";
    const weaponContent = document.createElement("div");
    weaponContent.setAttribute("class", "weaponContent");
    const levelContent = document.createElement("div");
    levelContent.setAttribute("class", "levelContent");
    //   arr.map((el, idx) => {
    //     if (idx !== 0) {
    //       const div = document.createElement("div");
    //       div.setAttribute("class", "level");
    //       div.innerText = `Lv.${idx + 1}`;
    //       levelContent.appendChild(div);
    //     } else {
    //       const div = document.createElement("div");
    //       div.style.width = "120px";
    //       div.innerText = "";
    //       levelContent.appendChild(div);
    //     }
    //   });
    weaponContent.appendChild(levelContent);
    let iconIdx = 1;
    fairy.map((el, idx) => {
        const weaponIcons = document.createElement("div");
        weaponIcons.setAttribute("class", "weaponIcons");
        arr.map((e12, idx2) => {
            const div = document.createElement("div");
            const img = document.createElement("img");
            if (idx2 === 0) {
                div.setAttribute("class", "fairyicon");
                div.style.backgroundImage = `url("images/ui/Icon/char/fairy${iconIdx++}.png")`;
                div.style.backgroundPosition = "center";
                div.style.backgroundRepeat = "no-repeat";
                div.style.backgroundSize = "contain";
                div.style.border = "4px solid rgb(213, 243, 255)";
            } else {
                div.setAttribute("class", "weaponicon");
                img.setAttribute("class", "weaponImg");

                if (idx2 < el.level) {
                    if (idx2 !== 4 && idx2 !== 8) {
                        div.style.backgroundImage = `url("images/ui/upgradeiconactive.png")`;
                        div.style.backgroundPosition = "center";
                        div.style.backgroundRepeat = "no-repeat";
                        div.style.backgroundSize = "contain";
                    } else if (idx2 === 4) {
                        div.style.backgroundImage = `url("images/ui/upgradeicon_weapon.png")`;
                        div.style.backgroundPosition = "center";
                        div.style.backgroundRepeat = "no-repeat";
                        div.style.backgroundSize = "contain";
                    } else if (idx2 === 8) {
                        div.style.backgroundImage = `url("images/ui/upgradeicon_weapon2.png")`;
                        div.style.backgroundPosition = "center";
                        div.style.backgroundRepeat = "no-repeat";
                        div.style.backgroundSize = "contain";
                    }

                    img.src = `images/ui/Icon/charskill/${iconIdx - 1}/${idx2}.png`;
                } else {
                    div.style.backgroundImage = `url("images/ui/upgradeicon.png")`;
                    div.style.backgroundPosition = "center";
                    div.style.backgroundRepeat = "no-repeat";
                    div.style.backgroundSize = "contain";

                    if (idx2 === 4 || idx2 === 8) {
                        if (el.level === idx2) {
                            img.src = "images/ui/Icon/weaponlock.gif";
                        } else {
                            img.src = "images/ui/Icon/skilllock.png";
                        }

                        if (idx2 === 4 && el.level === 4) {
                            div.addEventListener("click", () => {
                                fairy[idx].levelUp();
                                weapon();
                            });
                        } else if (idx2 === 8 && el.level === 8) {
                            div.addEventListener("click", () => {
                                fairy[idx].levelUp();
                                weapon();
                            });
                        }

                        div.addEventListener("click", () => {
                            setSound.playSE(9);
                            fairy[idx].levelUp();
                            weapon();
                        });

                    } else {
                        img.src = "images/ui/Icon/skilllock.png";
                    }
                }
            }
            div.appendChild(img);
            weaponIcons.appendChild(div);
        });
        weaponContent.appendChild(weaponIcons);
    });

    upgradeContent.appendChild(weaponContent);
}
