import ingameUi from "../../UI/ingame-ui";
import { monsterSet } from "../game";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 3;
  health = 3;
  velo;
  invincible = false;
  type;
  monSpiece;
  dx;
  dy;
  location;
  velo = 100;
  constructor(scene, i, j, x, y, type) {
    let monSpiece;
    switch (type) {
      case 0:
        monSpiece = "wall";
        break;
      case 1:
        monSpiece = "slime";
    }
    super(scene, x, y, monSpiece);
    this.monSpiece = monSpiece;
    this.dx = i;
    this.dy = j;

    this.alpha = 1;
    switch (type) {
      case 0:
        this.anim = this.monSpiece + "_idle";
        this.health = 1;
        this.weak = 0;
        break;
      case 1:
        this.anim = this.monSpiece + "_idle";
        this.health = 1;
        this.weak = 0;
        break;
    }
    this.type = type;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.location = location;
    scene.events.on("update", () => {
      this.update();
    });
    this.setScale(1);
    if (this.type !== 0) {
      this.setScale(1.2);
    }
    let hh = this.body.halfHeight;
    let hw = this.body.halfWidth;
    this.setCircle(hw, 0, hh - hw);

    if (this.type === 0) {
      this.body.debugBodyColor = 0x0000ff;
    } else {
      this.body.debugBodyColor = 0xb21d0a;
    }
    this.anime();
    this.setDepth(3);
  }

  update() {}

  anime() {
    this.clearTint().play(this.anim);
    // .setTint(Phaser.Display.Color.RandomRGB().color)
  }

  die_anim() {
    new Explosion(codeScene, this.x, this.y);
    // this.scene.m_explosionSound.play();  몬스터 폭발 사운드
  }
}
