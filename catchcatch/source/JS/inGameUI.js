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
