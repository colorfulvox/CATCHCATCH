import ingameUi from "../../UI/ingame-ui";
import { monsterSet } from "../game";

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

  move(direction) {
    switch (direction) {
      // 오른쪽
      case 1:
        if (this.dx < 6) {
          if(objmap[this.dy][this.dx+1] === 0 || objmap[this.dy][this.dx+1].type !== 0){
              sendmap[this.dy][this.dx] = 0;
              objmap[this.dy][this.dx] = 0;
              this.dx++;
              sendmap[this.dy][this.dx] = 1;
              objmap[this.dy][this.dx] = this;
              codeScene2.tweens.add({
                targets: this,
                x: map[this.dy][this.dx][0],
                y: map[this.dy][this.dx][1],
                delay: 100,
                ease: 'Linear'
            });
            this.anims.play("slime_move");
            codeScene2.time.addEvent({
              delay: 1200,
              callback: () => {
                this.anims.play("slime_idle");
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
          if (objmap[this.dy][this.dx - 1] === 0 || objmap[this.dy][this.dx - 1].type !== 0) {
            sendmap[this.dy][this.dx] = 0;
            objmap[this.dy][this.dx] = 0;
            this.dx--;
            sendmap[this.dy][this.dx] = 1;
            objmap[this.dy][this.dx] = this;
            codeScene2.tweens.add({
              targets: this,
              x: map[this.dy][this.dx][0],
              y: map[this.dy][this.dx][1],
              delay: 100,
              ease: 'Linear'
          });
          this.anims.play("slime_move");
          codeScene2.time.addEvent({
            delay: 1200,
            callback: () => {
              this.anims.play("slime_idle");
            },
            loop: false,
          });
          }
        }
        break;
      // 위쪽
      case 3:
        if (this.dy > 0) {
          if (objmap[this.dy - 1][this.dx] === 0 || objmap[this.dy - 1][this.dx].type !== 0) {
            sendmap[this.dy][this.dx] = 0;
            objmap[this.dy][this.dx] = 0;
            this.dy--;
            sendmap[this.dy][this.dx] = 1;
            objmap[this.dy][this.dx] = this;
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
              delay: 1200,
              callback: () => {
                this.anims.play("slime_idle");
              },
              loop: false,
            });
          }
        }
        break;
      // 아래쪽
      case 4:
        if (this.dy < 6) {
          if (objmap[this.dy + 1][this.dx] === 0 || objmap[this.dy + 1][this.dx].type !== 0) {
            sendmap[this.dy][this.dx] = 0;
            objmap[this.dy][this.dx] = 0;
            this.dy++;
            sendmap[this.dy][this.dx] = 1;
            objmap[this.dy][this.dx] = this;
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
              delay: 1200,
              callback: () => {
                this.anims.play("slime_idle");
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
