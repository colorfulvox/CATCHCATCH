export default class Magic extends Phaser.Physics.Arcade.Sprite {
  collidingEditEnemy = null;
  stun;
  isFirst = true;
  fairy;
  isBomb = false;
  bounceCount = 0;

  constructor(scene, fairy) {
    super(scene, fairy.x, fairy.y, "magic" + fairy.fairyNum);
    this.stun = fairy.stun;
    this.fairy = fairy;

    if (fairy.fairyNum === 2) {
      scene.time.addEvent({
        delay: 300,
        callback: () => {
          this.body.checkCollision.none = false;
          this.setVisible(true);
          if (this.texture.key === "magic2") {
            this.setVelocity(0, 0);
          }
        },
        loop: false,
      });
    }
    if (fairy.fairyNum === 5) {
      scene.time.addEvent({
        delay: 1000 * fairy.bombtime,
        callback: () => {
          this.bomb();
        },
        loop: false,
      });
      bombs.add(this);
    } else {
      scene.time.addEvent({
        delay: fairy.range * 1000,
        callback: () => {
          this.destroy();
        },
        loop: false,
      });
    }
    this.pierceCount = fairy.maxPierceCount;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  bomb() {
    this.body.checkCollision.none = false;
    this.setScale(this.fairy.spriteScale * 2);

    if (!this.isBomb) {
      this.isBomb = true;
      this.fairy.bombCount++;
    }
    this.anims.play("magic5_1", true);
    thisScene.time.addEvent({
      delay: this.fairy.range * 1000,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
  }

  setBounce(bounceCount) {
    this.bounceCount = bounceCount;
  }
}
