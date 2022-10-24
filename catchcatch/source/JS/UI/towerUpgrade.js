export default function tower() {
  const upgradeContent = document.querySelector(".upgradeContent");
  upgradeContent.innerHTML = `
    <div class="tower1234">
        <div class="tower1">1번 타워
        </div>
        <div class="tower3">3번 타워
        </div>
    </div>
    <div class="towerContent">
        <h3>${towerNum}</h3>
        <div class="towerIcons">
            <div>그림</div>
            <div>그림</div>
        </div>
        <div class="towerIcons">
            <div>그림</div>
            <div>그림</div>
            <div>그림</div>
            <div>그림</div>
            <div>그림</div>
        </div>
        <div class="towerIcons">
            <div>그림</div>
            <div>그림</div>
            <div>그림</div>
        </div>
        <div class="towerIcons">
            <div>그림</div>
            <div>그림</div>
            <div>그림</div>
            <div>그림</div>
            <div>그림</div>
        </div>
    </div>
    <div class="tower1234">
        <div class="tower2">2번 타워
        </div>
        <div class="tower4">4번 타워
        </div>
    </div>`;
  for (let i = 1; i < 5; i++) {
    const btn = document.querySelector(`.tower${i}`);
    btn.addEventListener("click", () => {
      towerNum = i;
      tower();
    });
  }
}
