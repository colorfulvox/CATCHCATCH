import Explosion from "./explosion";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 3;
  health = 3;
  velo;
  invincible = false;
  type;
  monSpiece;
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
    super(scene, randomX, randomY, monSpiece);
    this.velo = velo;
    this.alpha = 1;
    switch (type) {
      case 0:
        let randomNum = Math.floor(Math.random() * 7 + 1);
        this.monSpiece = "cat" + randomNum;
        this.anim = "cat" + randomNum;
        break;
      case 1:
        this.monSpiece = "alien";
        this.anim = this.monSpiece;
        break;
      case 2:
        this.monSpiece = "worm";
        this.anim = this.monSpiece;
        break;
      case 3:
        this.monSpiece = "sonic";
        this.anim = this.monSpiece;
        break;
      case 4:
        this.monSpiece = "turtle";
        this.anim = this.monSpiece;
        break;
      case 5:
        this.monSpiece = "babySlime";
        this.anim = "slime";
        break;
    }
    this.type = type;
    this.scale = 0.8;
    if (this.monSpiece === "babySlime") {
      this.scale = 2;
    } else if (this.monSpiece === "alien" || this.monSpiece === "alienPlus") {
      this.scale = 2.5;
    } else if (
      this.monSpiece === "turtle" ||
      this.monSpiece === "sonic" ||
      this.monSpiece === "slime"
    ) {
      this.scale = 3;
    }
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anime();
    scene.events.on("update", () => {
      this.update();
    });
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
