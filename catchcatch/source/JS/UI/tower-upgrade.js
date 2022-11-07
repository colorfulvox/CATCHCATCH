let _towerNum = 0;
let _targetid = null;

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
  tower1.setAttribute("class", "towerdefault");
  tower1.id = "tower1";
  // tower1.style.backgroundImage = `url("images/ui/Icon/tower/char/default.png")`;
  tower2.setAttribute("class", "towerdefault");
  tower2.id = "tower2";
  // tower2.style.backgroundImage = `url("images/ui/Icon/tower/char/default.png")`;
  tower3.setAttribute("class", "towerdefault");
  tower3.id = "tower3";
  // tower3.style.backgroundImage = `url("images/ui/Icon/tower/char/default.png")`;
  tower4.setAttribute("class", "towerdefault");
  tower4.id = "tower4";
  // tower4.style.backgroundImage = `url("images/ui/Icon/tower/char/default.png")`;
  if (_targetid === null) {
    _targetid = "tower1";
  }

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

  let nextsection_1 = false;

  for (let i = 0; i < 2; i++) {
    const con = document.createElement("div");
    con.style.backgroundImage = `url("images/ui/towericonslot.png")`;
    con.style.backgroundPosition = "center";
    con.style.backgroundRepeat = "no-repeat";
    con.style.backgroundSize = "cover";
    con.setAttribute("class", "con");

    const count = document.createElement("div");
    count.setAttribute("class", "towerskillimg");
    count.style.backgroundImage = `url("images/ui/icon/tower/${i + 1}.png")`;

    count.innerText = `${tier1[i].current}/${tier1[i].max}`;
    con.appendChild(count);
    count.addEventListener("click", tier1[i].click);
    count.addEventListener("click", () => {
      count.innerText = `${tier1[i].current}/${tier1[i].max}`;
    });
    towerIcons1.appendChild(con);
  }

  if (tier1[0].current + tier1[1].current >= 10) {
    nextsection_1 = true;
  }

  let nextsection_2 = false;

  let ischoose = false;

  if (nextsection_1) {
    for (let i = 0; i < 4; i++) {
      if (towers[_towerNum].towerEvelop1[i]) ischoose = true;
    }
  }

  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "property");
    div.style.backgroundImage = `url("images/ui/towericonslot.png")`;
    div.style.backgroundPosition = "center";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundSize = "cover";

    const propertyimg = document.createElement("div");
    propertyimg.setAttribute("class", "propertyimg");

    div.appendChild(propertyimg);

    if (nextsection_1) {
      if (ischoose) {
        if (towers[_towerNum].towerEvelop1[i]) {
          nextsection_2 = true;
          propertyimg.style.backgroundImage = `url("images/ui/icon/tower/property_${
            i + 1
          }.png")`;
        } else {
          propertyimg.style.backgroundImage = `url("images/ui/Icon/skilllock.png`;
        }
      } else {
        propertyimg.style.backgroundImage = `url("images/ui/icon/tower/property_${
          i + 1
        }.png")`;
      }
    } else
      propertyimg.style.backgroundImage = `url("images/ui/Icon/skilllock.png`;

    div.addEventListener("click", () => {
      if (!towers[_towerNum].isTowerEvelop1) {
        towers[_towerNum].changeEvelop(i, towers[_towerNum]);
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
    count.setAttribute("class", "towerskillimg");

    if (nextsection_2)
      count.style.backgroundImage = `url("images/ui/Icon/tower/${i + 3}.png")`;
    else count.style.backgroundImage = `url("images/ui/Icon/skilllock.png`;

    con.appendChild(count);
    count.addEventListener("click", tier3[i].click);
    count.addEventListener("click", () => {
      count.innerText = `${tier3[i].current}/${tier3[i].max}`;
    });
    towerIcons3.appendChild(con);
  }

  let nextsection_3 = false;
  if (tier3[0].current + tier3[1].current >= 10) nextsection_3 = true;

  ischoose = false;
  if (nextsection_3) {
    for (let i = 0; i < 4; i++) {
      if (towers[_towerNum].towerEvelop2[i]) ischoose = true;
    }
  }

  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "property");
    div.style.backgroundImage = `url("images/ui/towericonslot.png")`;
    div.style.backgroundPosition = "center";
    div.style.backgroundRepeat = "no-repeat";
    div.style.backgroundSize = "cover";
    const propertyimg = document.createElement("div");
    propertyimg.setAttribute("class", "propertyimg");
    div.appendChild(propertyimg);

    if (nextsection_3) {
      if (ischoose) {
        if (towers[_towerNum].towerEvelop2[i]) {
          propertyimg.style.backgroundImage = `url("images/ui/icon/tower/property_${
            i + 1
          }.png")`;
        } else {
          propertyimg.style.backgroundImage = `url("images/ui/Icon/skilllock.png`;
        }
      } else {
        propertyimg.style.backgroundImage = `url("images/ui/icon/tower/property_${
          i + 1
        }.png")`;
      }
    } else
      propertyimg.style.backgroundImage = `url("images/ui/Icon/skilllock.png`;

    div.addEventListener("click", () => {
      if (!towers[_towerNum].isTowerEvelop2) {
        towers[_towerNum].changeEvelop(i, towers[_towerNum]);
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
    const btn = document.getElementById(`tower${i}`);

    if (towers[i - 1].isTowerEvelop2) {
      btn.setAttribute("class", `tower5`);
    } else {
      if (towers[i - 1].isTowerEvelop1) {
        for (let j = 0; j < 4; ++j) {
          if (towers[i - 1].towerEvelop1[j]) {
            btn.setAttribute("class", `tower${j + 1}`);
            break;
          }
        }
      }
    }

    btn.addEventListener("click", (e) => {
      _towerNum = i - 1;
      _targetid = e.target.id;
      tower();
    });
  }

  clickevent();
}

function clickevent() {
  const targetid = document.getElementById(_targetid);

  if (targetid === null) return;
  if (targetid.className === "towerdefault")
    targetid.style.backgroundImage = `url("images/ui/Icon/tower/char/default_act.png`;
  else if (targetid.className === "tower1")
    targetid.style.backgroundImage = `url("images/ui/Icon/tower/char/1_act.png`;
  else if (targetid.className === "tower2")
    targetid.style.backgroundImage = `url("images/ui/Icon/tower/char/2_act.png`;
  else if (targetid.className === "tower3")
    targetid.style.backgroundImage = `url("images/ui/Icon/tower/char/3_act.png`;
  else if (targetid.className === "tower4")
    targetid.style.backgroundImage = `url("images/ui/Icon/tower/char/4_act.png`;
  else if (targetid.className === "tower5")
    targetid.style.backgroundImage = `url("images/ui/Icon/tower/char/5_act.png`;
}
