let _towerNum = 0;
export default function tower() {
  const towers = [towerLU, towerRU, towerLD, towerRD];
  const tier1 = [
    {
      click: () => {
        towers[_towerNum].damageFunc(towers[_towerNum]);
      },
      current: towers[_towerNum].towerDmgLevel,
      max: towers[_towerNum].towerDmgMax,
    },
    {
      click: () => {
        towers[_towerNum].bulletFunc(towers[_towerNum]);
      },
      current: towers[_towerNum].bulletLevel,
      max: towers[_towerNum].bulletMax,
    },
  ];
  const tier3 = [
    {
      click: () => {
        towers[_towerNum].rangeFunc(towers[_towerNum]);
      },

      current: towers[_towerNum].circleSizeLevel,
      max: towers[_towerNum].circleSizeMax,
    },
    {
      click: () => {
        towers[_towerNum].speedFunc(towers[_towerNum]);
      },
      current: towers[_towerNum].towerASLevel,
      max: towers[_towerNum].towerASMax,
    },
  ];

  const upgradeContent = document.querySelector(".upgradeContent");
  upgradeContent.innerHTML = "";
  const tower13 = document.createElement("div");
  tower13.setAttribute("class", "tower1234");
  const tower24 = document.createElement("div");
  tower24.setAttribute("class", "tower1234");
  const tower1 = document.createElement("div");
  const tower2 = document.createElement("div");
  const tower3 = document.createElement("div");
  const tower4 = document.createElement("div");
  tower1.setAttribute("class", "tower1");
  tower2.setAttribute("class", "tower2");
  tower3.setAttribute("class", "tower3");
  tower4.setAttribute("class", "tower4");
  tower1.innerText = "1번 타워";
  tower2.innerText = "2번 타워";
  tower3.innerText = "3번 타워";
  tower4.innerText = "4번 타워";
  tower13.appendChild(tower1);
  tower13.appendChild(tower3);
  tower24.appendChild(tower2);
  tower24.appendChild(tower4);
  const towerContent = document.createElement("div");
  towerContent.setAttribute("class", "towerContent");
  const towerIcons1 = document.createElement("div");
  const towerIcons2 = document.createElement("div");
  const towerIcons3 = document.createElement("div");
  const towerIcons4 = document.createElement("div");
  towerIcons1.setAttribute("class", "towerIcons");
  towerIcons2.setAttribute("class", "towerIcons");
  towerIcons3.setAttribute("class", "towerIcons");
  towerIcons4.setAttribute("class", "towerIcons");
  for (let i = 0; i < 2; i++) {
    const con = document.createElement("div");
    con.style.backgroundImage = `url("images/ui/towericonslot.png")`;
    con.style.backgroundPosition = "center";
    con.style.backgroundRepeat = "no-repeat";
    con.style.backgroundSize = "cover";
    con.setAttribute("class", "con");

    const count = document.createElement("div");
    count.innerText = `${tier1[i].current}/${tier1[i].max}`;
    con.appendChild(count);
    count.addEventListener("click", tier1[i].click);
    count.addEventListener("click", () => {
      count.innerText = `${tier1[i].current}/${tier1[i].max}`;
    });
    towerIcons1.appendChild(con);
  }
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "property");
    div.style.backgroundImage = `url("images/ui/towericonslot.png")`;
    div.style.backgroundPosition = "center";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundSize = "cover";
    if (towers[_towerNum].towerEvelop1[i]) {
      div.innerText = "완료";
    } else {
      div.innerText = "그림";
    }
    div.addEventListener("click", () => {
      if (!towers[towerNum].isTowerEvelop1) {
        towers[towerNum].changeEvelop(i, towers[towerNum]);
      }
    });
    towerIcons2.appendChild(div);
  }
  for (let i = 0; i < 2; i++) {
    const con = document.createElement("div");
    con.setAttribute("class", "con");
    con.style.backgroundImage = `url("images/ui/towericonslot.png")`;
    con.style.backgroundPosition = "center";
    con.style.backgroundRepeat = "no-repeat";
    con.style.backgroundSize = "cover";

    // div.innerText = "그림";
    const count = document.createElement("div");
    count.innerText = `${tier3[i].current}/${tier3[i].max}`;
    con.appendChild(count);
    count.addEventListener("click", tier3[i].click);
    count.addEventListener("click", () => {
      count.innerText = `${tier3[i].current}/${tier3[i].max}`;
    });
    towerIcons3.appendChild(con);
  }
  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "property");
    div.style.backgroundImage = `url("images/ui/towericonslot.png")`;
    div.style.backgroundPosition = "center";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundSize = "cover";
    if (towers[_towerNum].towerEvelop2[i]) {
      div.innerText = "완료";
    } else {
      div.innerText = "그림";
    }
    div.addEventListener("click", () => {
      if (!towers[_towerNum].isTowerEvelop2) {
        towers[_towerNum].changeEvelop(i);
      }
    });
    towerIcons4.appendChild(div);
  }
  towerContent.appendChild(towerIcons1);
  towerContent.appendChild(towerIcons2);
  towerContent.appendChild(towerIcons3);
  towerContent.appendChild(towerIcons4);
  const levels = document.createElement("div");
  const level1 = document.createElement("div");
  const level2 = document.createElement("div");
  const level3 = document.createElement("div");
  const level4 = document.createElement("div");
  levels.setAttribute("class", "levels");
  level1.setAttribute("class", "levelss");
  level2.setAttribute("class", "levelss");
  level3.setAttribute("class", "levelss");
  level4.setAttribute("class", "levelss");
  level1.innerText = "Lv.1~9";
  level2.innerText = "Lv.10";
  level3.innerText = "Lv.11~19";
  level4.innerText = "Lv.20";
  levels.appendChild(level1);
  levels.appendChild(level2);
  levels.appendChild(level3);
  levels.appendChild(level4);
  upgradeContent.appendChild(tower13);
  upgradeContent.appendChild(levels);
  upgradeContent.appendChild(towerContent);
  upgradeContent.appendChild(tower24);

  for (let i = 1; i < 5; i++) {
    const btn = document.querySelector(`.tower${i}`);
    btn.addEventListener("click", () => {
      _towerNum = i - 1;
      tower();
    });
  }
}
