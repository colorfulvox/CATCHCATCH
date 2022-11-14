import Explosion from "./explosion";
import Boom from "./boom";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  maxHealth;
  health;
  velocity;
  originalVelocity;
  invincible = false;
  monSpecie;
  cc;
  type;
  constructor(scene, maxHealth, velo, randomX, randomY, monSpecie, anim) {
    super(scene, randomX, randomY, monSpecie);
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.velocity = velo;
    this.alpha = 1;
    this.anim = anim;
    this.monSpecie = monSpecie;
    this.cc = "";
    this.type = "monster";
    this.scale = 1;
    this.originalVelocity = this.velocity;
    this.myInvincibleEvent = undefined;
    thisScene.time.addEvent({
      delay: 1200,
      callback: () => {
        this.velocity = this.originalVelocity;
        this.cc = "";
      },
      loop: true,
    });
    scene.add.existing(this);
    scene.physics.add.existing(this);

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
    if (player.ability !== 2) {
      this.clearTint().play(this.anim);
    } else if (player.ability === 2) {
      if (this.monSpecie === "alien") {
        this.setTint(Phaser.Display.Color.RandomRGB().color).play(this.anim);
      }
    }
  }

  dieAnim() {
    new Explosion(thisScene, this.x, this.y);
  }

  boomAnim() {
    new Boom(thisScene, this.x, this.y, this.monSpecie);
  }
  unInvincible() {
    this.myInvincibleEvent = thisScene.time.addEvent({
      delay: 400,
      callback: () => {
        if (this.active === true) {
          this.invincible = false;
          this.anime();
          thisScene.time.removeEvent(this.myInvincibleEvent);
          this.myInvincibleEvent = undefined;
        }
      },
      loop: false,
    });
  }
}
