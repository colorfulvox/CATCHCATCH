export default function levelup() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div class="levelupContainer">
      <div class="levelupContent">
        <div class="levelupImg">특성 아이콘</div>
        <div class="levelupText">설명</div>
      </div>
      <div class="levelupContent">
        <div class="levelupImg">특성 아이콘</div>
        <div class="levelupText">설명</div>
      </div>
      <div class="levelupContent">
        <div class="levelupImg">특성 아이콘</div>
        <div class="levelupText">설명</div>
      </div>
    </div>
  `;
  const contents = document.querySelectorAll(".levelupContent");
  console.log(contents);
  for (let i = 0; i < 3; i++) {
    contents[i].addEventListener("click", () => {
      console.log("특성");
    });
  }
}
