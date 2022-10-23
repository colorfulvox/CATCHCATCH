<<<<<<< HEAD
import "../CSS/inGameUI.css";

export default function inGameUI() {}
=======
export default function inGameUI() {
  const app = document.querySelector("#app");
  const UIContainer = document.createElement("div");
  UIContainer.class = "UIContainer";
  const progress = document.createElement("progress");
  progress.id = "progress";
  progress.value = exp;
  progress.min = "0";
  progress.max = "3";
  UIContainer.appendChild(progress);
  app.appendChild(UIContainer);
}
>>>>>>> 5cadbc8eeca6b8f03b5950c798de8c39a5a2d72a
