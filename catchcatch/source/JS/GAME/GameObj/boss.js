import { bossSet } from "../game";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    maxHealth,
    velocity,
    randomX,
    randomY,
    bossSpecie,
    anim,
    scale,
    pt,
    type
  ) {
    scene.time.addEvent({
      delay: 400,
      loop: true,
    });
    super(scene, randomX, randomY, bossSpecie);
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.velocity = velocity;
    this.alpha = 1;
    this.anim = anim;
    this.bossSpecie = bossSpecie;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.pt = pt;
    this.scale = scale;
    this.type = type;
  }

  anime() {
    if (player.ability !== 2) {
      this.clearTint().play(this.anim);
    } else if (player.ability == 2) {
      this.setTint(Phaser.Display.Color.RandomRGB().color).play(this.anim);
    }
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
