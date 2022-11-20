import { setSound } from "../../SOUND/sound.js";
import { LoseLife } from "../../UI/incode-ui.js";
import { camera } from "../code2.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 1;
  health = 1;
  invincible = false;
  type;
  monSpiece;
  dx;
  dy;
  velo = 100;
  constructor(scene, i, j, x, y, type) {
    let monSpiece;
    switch (type) {
      case 0:
        monSpiece = "tower1";
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
        camera
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
    this.setScale(2);
    if (this.type !== 0) {
      this.setScale(1.2);
    }
    let hh = this.body.halfHeight;
    let hw = this.body.halfWidth;
    this.setCircle(hw*0.5, hh - hw*0.5, hh - hw*0.5);

    if (this.type === 0) {
      this.body.debugBodyColor = 0x0000ff;
    } else {
      this.body.debugBodyColor = 0xb21d0a;
    }
    this.anime();
    this.setDepth(3);
  }

  update() {}

  move(direction) {
    switch (direction) {
      // 오른쪽
      case 1:
        if (this.dx < 6) {
          if(objmap[this.dy][this.dx+1] === 0 || objmap[this.dy][this.dx+1].type === -1){
              sendmap[this.dy][this.dx] = 0;
              objmap[this.dy][this.dx] = 0;
            this.dx++;
            if (objmap[this.dy][this.dx].type !== -1) {
              sendmap[this.dy][this.dx] = 3;
              objmap[this.dy][this.dx] = this;
            }
              codeScene2.tweens.add({
                targets: this,
                x: map[this.dy][this.dx][0],
                y: map[this.dy][this.dx][1],
                delay: 100,
                ease: 'Linear'
            });
            this.anims.play("slime_move");
            codeScene2.time.addEvent({
              delay: 600,
              callback: () => {
                this.anims.play("slime_idle");
                if (objmap[this.dy][this.dx].type===-1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  this.destroy();
                  camera.shake(100, 0.01); //camera
                  setSound.playSE(11);
                  objmap[this.dy][this.dx].health--;
                  LoseLife();
                }
              },
              loop: false,
            });
          }
        }
        break;
      // 왼쪽
      case 2:
        if (this.dx > 0) {
          this.flipX = true;
          if (objmap[this.dy][this.dx - 1] === 0 || objmap[this.dy][this.dx - 1].type === -1) {
            sendmap[this.dy][this.dx] = 0;
            objmap[this.dy][this.dx] = 0;
            this.dx--;
            if (objmap[this.dy][this.dx].type !== -1) {
              sendmap[this.dy][this.dx] = 3;
              objmap[this.dy][this.dx] = this;
            }
            codeScene2.tweens.add({
              targets: this,
              x: map[this.dy][this.dx][0],
              y: map[this.dy][this.dx][1],
              delay: 100,
              ease: 'Linear'
          });
          this.anims.play("slime_move");
          codeScene2.time.addEvent({
            delay: 600,
            callback: () => {
              this.anims.play("slime_idle");
              if (objmap[this.dy][this.dx].type===-1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                this.destroy();
                camera.shake(100, 0.01); //camera
                setSound.playSE(11);
                objmap[this.dy][this.dx].health--;
                LoseLife();
              }
            },
            loop: false,
          });
          }
        }
        break;
      // 위쪽
      case 3:
        if (this.dy > 0) {
          if (objmap[this.dy - 1][this.dx] === 0 || objmap[this.dy - 1][this.dx].type === -1) {
            sendmap[this.dy][this.dx] = 0;
            objmap[this.dy][this.dx] = 0;
            this.dy--;
            if (objmap[this.dy][this.dx].type !== -1) {
              sendmap[this.dy][this.dx] = 3;
              objmap[this.dy][this.dx] = this;
            }
            codeScene2.tweens.add({
              targets: this,
              x: map[this.dy][this.dx][0],
              y: map[this.dy][this.dx][1],
              delay: 100,
              ease: 'Linear'
            });
            this.flipX = true;
            this.anims.play("slime_move");
            codeScene2.time.addEvent({
              delay: 600,
              callback: () => {
                this.anims.play("slime_idle");
                if (objmap[this.dy][this.dx].type===-1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  this.destroy();
                  camera.shake(100, 0.01); //camera
                  setSound.playSE(11);
                  objmap[this.dy][this.dx].health--;
                  LoseLife();
                }
              },
              loop: false,
            });
          }
        }
        break;
      // 아래쪽
      case 4:
        if (this.dy < 6) {
          if (objmap[this.dy + 1][this.dx] === 0 || objmap[this.dy + 1][this.dx].type === -1) {
            sendmap[this.dy][this.dx] = 0;
            objmap[this.dy][this.dx] = 0;
            this.dy++;
            if (objmap[this.dy][this.dx].type !== -1) {
              sendmap[this.dy][this.dx] = 3;
              objmap[this.dy][this.dx] = this;
            }
            codeScene2.tweens.add({
              targets: this,
              x: map[this.dy][this.dx][0],
              y: map[this.dy][this.dx][1],
              delay: 100,
              ease: 'Linear'
            });
            this.flipX = true;
            this.anims.play("slime_move");
            codeScene2.time.addEvent({
              delay: 600,
              callback: () => {
                this.anims.play("slime_idle");
                if (objmap[this.dy][this.dx].type===-1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  this.destroy();
                  camera.shake(100, 0.01); //camera
                  setSound.playSE(11);
                  objmap[this.dy][this.dx].health--;
                  LoseLife();
                }
              },
              loop: false,
            });
          }
        }
        break; 
    }
  }

  anime() {
    this.clearTint().play(this.anim);
    // .setTint(Phaser.Display.Color.RandomRGB().color)
  }

  die_anim() {
    new Explosion(codeScene, this.x, this.y);
    // this.scene.m_explosionSound.play();  몬스터 폭발 사운드
  }
}
