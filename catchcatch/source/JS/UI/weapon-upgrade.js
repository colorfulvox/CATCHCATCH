import Player from "../GAME/GameObj/player";
import { setSound } from "../SOUND/sound";

export default function weapon() {
  const property = {
    common: {
      name: "공통",
      health: { level: player.healthLevel, text: "최대 체력 증가" },
      dmgMul: { level: player.dmgMulLevel, text: "공격력 증가" },
      heal: { level: player.healLevel, text: "회복력 증가" },
      speed: { level: player.speedLevel, text: "이동속도 증가" },
    },
    // 2 3 4 [5] 6 7 8 [9]
    wizard: {
      name: "위저드",
      fairy: wizard,
      text: [
        "불마법 개수 증가",
        "공격 속도 증가",
        "관통 효과 적용",
        "마법사 1차 강화",

        "불마법 개수 증가",
        "공격 속도 증가",
        "관통 개수 증가",
        "마법사 2차 강화",
      ],
    },
    reaper: {
      name: "사신",
      fairy: reaper,
      text: [
        "공격 범위 증가",
        "공격 속도 증가",
        "흡혈 효과 적용",
        "사신 1차 강화",

        "공격 범위 증가",
        "공격 속도 증가",
        "흡혈 효과 증가",
        "사신 2차 강화",
      ],
    },
    ninja: {
      name: "닌자",
      fairy: ninja,
      text: [
        "사거리 증가",
        "공격 속도 증가",
        "기절 효과 적용",
        "닌자 1차 강화",

        "사거리 증가",
        "공격 속도 증가",
        "기절 효과 증가",
        "닌자 2차 강화",
      ],
    },
    slime: {
      name: "슬라임",
      fairy: slime,
      text: [
        "공격 속도 증가",
        "튕기는 횟수 증가",
        "복사 효과 적용",
        "슬라임 1차 강화",

        "공격 속도 증가",
        "튕기는 횟수 증가",
        "복사 효과 증가",
        "슬라임 2차 강화",
      ],
    },
    witch: {
      name: "마녀",
      fairy: witch,
      text: [
        "설치 개수 증가Ⅰ",
        "폭팔 반경 증가",
        "설치 개수 증가Ⅱ",
        "마녀 1차 강화",

        "설치 개수 증가Ⅲ",
        "폭팔 반경 증가",
        "설치 개수 증가Ⅳ",
        "마녀 2차 강화",
      ],
    },
  };
  const arr = ["", "", "", "", "", "", "", "", ""];
  const fairy = [wizard, reaper, ninja, slime, witch];
  const fairyName = ["wizard", "reaper", "ninja", "slime", "witch"];
  const upgradeContent = document.querySelector(".upgradeContent");
  upgradeContent.innerHTML = "";
  const weaponContent = document.createElement("div");
  weaponContent.setAttribute("class", "weaponContent");
  const levelContent = document.createElement("div");
  levelContent.setAttribute("class", "levelContent");
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
          } else {
            img.src = "images/ui/Icon/skilllock.png";
          }
        }
      }
      div.appendChild(img);
      if (idx2 !== 0) {
        div.addEventListener("mouseover", () => {
          const box = document.createElement("div");
          box.setAttribute("class", "box");
          box.innerText = `${property[fairyName[idx]].text[idx2 - 1]}`;
          div.appendChild(box);
        });
        div.addEventListener("mouseout", () => {
          const box = document.querySelector(".box");
          div.removeChild(box);
        });
      }
      weaponIcons.appendChild(div);
    });
    weaponContent.appendChild(weaponIcons);
  });

  upgradeContent.appendChild(weaponContent);
}
