import "../../CSS/UI/mode.css";
import { StartBtnOn } from "./start-page.js";
import Stage from "./stage.js";

export default function Mode() {
  const $app = document.querySelector("#app");
  const modePage = document.createElement("div");
  modePage.setAttribute("class", "modePage");

  let _BackIcon = document.createElement("button");
  _BackIcon.className = "BackIcon";
  modePage.appendChild(_BackIcon);
  _BackIcon.addEventListener("click", BackStart);

  const modeTitle = document.createElement("div");
  modeTitle.setAttribute("class", "modeTitle");
  modePage.appendChild(modeTitle);
  modeTitle.innerText = "모드 선택";

  const modeContainer = document.createElement("div");
  modeContainer.setAttribute("class", "modeContainer");
  modePage.appendChild(modeContainer);

  const defense = document.createElement("div");
  defense.setAttribute("class", "modeEl");
  modeContainer.appendChild(defense);
  defense.addEventListener("click", () => {
    Stage("defense");
    modePage.style.display = "none";
  });

  const survive = document.createElement("div");
  survive.setAttribute("class", "modeEl");
  modeContainer.appendChild(survive);
  survive.addEventListener("click", () => {
    Stage("survive");
    modePage.style.display = "none";
  });

  $app.appendChild(modePage);
}

function BackStart() {
  OffStage();
  StartBtnOn();
}

function OffStage() {
  const modepage = document.querySelector(".modePage");
  const StartPage = document.querySelector(".StartPage");
  const app = document.querySelector("#app");
  StartPage.style.display = "flex";
  app.removeChild(modepage);
  StartBtnOn();
}
