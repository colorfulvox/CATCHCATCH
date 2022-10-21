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
  const levelupContainer = document.querySelector(".levelupContainer");
  console.log(contents);
  for (let i = 0; i < 3; i++) {
    contents[i].addEventListener("click", () => {
      console.log("특성");
      levelupContainer.style.display = "none";
      expUp();
    });
  }
}

function expUp() {
  const interval = setInterval(() => {
    console.log(exp);
    exp++;
    const levelupContainer = document.querySelector(".levelupContainer");
    if (exp === 3) {
      clearInterval(interval);
      levelupContainer.style.display = "flex";
      exp = 0;
    }
  }, 1000);
}

expUp();
