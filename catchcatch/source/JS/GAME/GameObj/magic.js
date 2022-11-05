import {setSound} from "../../SOUND/sound";

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
          setSound.playSE(1);
          if (this.texture.key !== "magic2_2_1") {
            if (this.fairy.evo2) {
              this.anims.play("magic2_2");
            } else if (this.fairy.evo1) {
              this.anims.play("magic2_1");
            } else {
              this.anims.play("magic2");
            }
          }
          if (this.texture.key === "magic2" || this.texture.key === "magic2_1" || this.texture.key === "magic2_2") {
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
    let size = this.fairy.size * 2;
    let hh = this.body.halfWidth;
    let hw = this.body.halfHeight;
    
    if (this.fairy.level >= 3) {
      size = this.fairy.size*1.3;
    }

    if (this.fairy.level >= 7) {
      size = this.fairy.size*0.95;
    }

    this.setCircle(
      hw * size,
      hh - hw * size,
      hh - hw * size
    );
    this.body.offset.x += 10;
    this.body.offset.y += 11;

    if (this.fairy.level >= 3) {

      this.body.offset.x -= 10;
      this.body.offset.y -= 11;
    }
    if (this.fairy.level >= 7) {

      this.body.offset.x -= 14;
      this.body.offset.y -= 15;
    }
    if (!this.isBomb) {
      this.isBomb = true;
      this.fairy.bombCount++;
    }

    if (this.fairy.level === 9) {
      this.anims.play("magic5_3");
    } else if (this.fairy.level >= 5) {
      this.anims.play("magic5_2");
    } else {
      this.anims.play("magic5_1");
    }
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
