import { monsterSet } from "../game";
import Explosion from "./explosion";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 3;
  health = 3;
  velo;
  invincible = false;
  type;
  monSpiece;
  weak;
  constructor(scene, velo, randomX, randomY, monSpiece, anim, type) {
    scene.time.addEvent({
      delay: 400,
      callback: () => {
        if (this.active === true) {
          this.invincible = false;
          this.anime();
        }
      },
      loop: true,
    });
    switch (type) {
      case 0:
        let randomNum = Math.floor(Math.random() * 7 + 1);
        monSpiece = "cat" + randomNum;
        break;
      case 1:
        monSpiece = "alien";
        break;
      case 2:
        monSpiece = "worm";
        break;
      case 3:
        monSpiece = "sonic";
        break;
      case 4:
        monSpiece = "turtle";
        break;
      case 5:
        monSpiece = "slime";
        break;
    }
    super(scene, randomX, randomY, monSpiece);
    this.velo = velo;
    this.alpha = 1;
    this.monSpiece = monSpiece;
    switch (type) {
      case 0:
        this.anim = monSpiece;
        this.health = 1;
        this.weak = 0;
        break;
      case 1:
        this.anim = this.monSpiece;
        this.health = 1;
        this.weak = 0;
        break;
      case 2:
        this.anim = this.monSpiece;
        this.weak = 5;
        break;
      case 3:
        this.anim = this.monSpiece;
        this.weak = 4;
        break;
      case 4:
        this.anim = this.monSpiece;
        this.weak = 2;
        break;
      case 5:
        this.anim = this.monSpiece;
        this.weak = 3;
        break;
    }
    this.type = type;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anime();

    scene.events.on("update", () => {
      this.update();
    });
    this.setScale(0.8);
    if (this.monSpiece === "babySlime") {
      this.setScale(2);
    } else if (this.monSpiece === "alien" || this.monSpiece === "alienPlus") {
      this.setScale(2.5);
    } else if (
      this.monSpiece === "turtle" ||
      this.monSpiece === "sonic" ||
      this.monSpiece === "slime"
    ) {
      this.setScale(3);
    }

    let hh = this.body.halfHeight;
    let hw = this.body.halfWidth;
    this.setCircle(hw, 0, hh - hw);
  }

  update() {
    if (!this.body) {
      return;
    }
    if (this.body.velocity.x > 0) this.flipX = false;
    else this.flipX = true;
    if (this.cc === "earth") {
      this.velocity = 0;
    } else if (this.cc === "water") {
      this.velocity = 10;
    }
  }

  anime() {
    this.clearTint().play(this.anim);
    // .setTint(Phaser.Display.Color.RandomRGB().color)
  }

  die_anim() {
    new Explosion(thisScene, this.x, this.y);
    // this.scene.m_explosionSound.play();  몬스터 폭발 사운드
  }
}
