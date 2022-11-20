import { LoseLife } from "../../UI/incode-ui.js";
import { camera } from "../code2.js";
import Attack from "./attack.js";
import Barrier from "./Barrier.js";
import { setSound } from "../../SOUND/sound.js";

export const Direction = Object.freeze({
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 5;
  health = 5;
  healthLevel = 1;
  isDefense = false;
  dx;
  dy;
  type = -1;
  // 캐릭터 특수능력 일단 보류
  invincible = false;
  constructor(scene, maxHealth, i, j, x, y, catname) {
    super(scene, x, y, catname);
    this.alpha = 1;
    this.dx = i;
    this.dy = j;
    this.maxHealth = maxHealth;
    this.health = maxHealth;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers(catname, { start: 0, end: 0 }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "move",
      frames: this.anims.generateFrameNumbers(catname, { start: 1, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.body.checkCollision.none = true;
  }

  action(key, direction) {
    switch (key) {
      case "move":
        this.move(direction);
        break;
      case "attack":
        this.attack(direction);
        break;
      case "defense":
        this.defense();
        break;
    }
  }


  move(direction) {
    switch (direction) {
      // 오른쪽
      case 1:
        if (this.dx < 6) {
          if (objmap[this.dy][this.dx + 1] === 0 || objmap[this.dy][this.dx + 1].type !== 0) {
            if (sendmap[this.dy][this.dx] === 5) {
              sendmap[this.dy][this.dx] = 4;
            }else{
              sendmap[this.dy][this.dx] = 0;
            }
            objmap[this.dy][this.dx] = 0;
            this.dx++;
            if (objmap[this.dy][this.dx].type !== 1) {
              if (sendmap[this.dy][this.dx] === 4) {
                sendmap[this.dy][this.dx] = 5;
              } else {
                sendmap[this.dy][this.dx] = 1;
              }
              objmap[this.dy][this.dx] = this;
            }
              codeScene2.tweens.add({
                targets: this,
                x: map[this.dy][this.dx][0],
                y: map[this.dy][this.dx][1],
                delay: 100,
                duration: 500,
                ease: 'Linear'
              });
            if (this.flipX) {
              this.flipX = false;
            }
            this.anims.play("move");
            codeScene2.time.addEvent({
              delay: 600,
              callback: () => {
                this.anims.play("turn");
                if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  objmap[this.dy][this.dx].destroy();
                  camera.shake(100, 0.01); //camera
                  setSound.playSE(12);
                  objmap[this.dy][this.dx].health--;
                  LoseLife();
                  sendmap[this.dy][this.dx] = 1;
                  objmap[this.dy][this.dx] = this;
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
          if (objmap[this.dy][this.dx - 1] === 0 || objmap[this.dy][this.dx - 1].type !== 0) {
            if (sendmap[this.dy][this.dx] === 5) {
              sendmap[this.dy][this.dx] = 4;
            }else{
              sendmap[this.dy][this.dx] = 0;
            }
            objmap[this.dy][this.dx] = 0;
            this.dx--;
            if(objmap[this.dy][this.dx].type!==1){
              sendmap[this.dy][this.dx] = 1;
              objmap[this.dy][this.dx] = this;
            }
            codeScene2.tweens.add({
              targets: this,
              x: map[this.dy][this.dx][0],
              y: map[this.dy][this.dx][1],
              delay: 100,
              duration: 500,
              ease: 'Linear'
          });
          this.anims.play("move");
          codeScene2.time.addEvent({
            delay: 600,
            callback: () => {
              this.anims.play("turn");
              if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                objmap[this.dy][this.dx].destroy();
                camera.shake(100, 0.01); //camera
                setSound.playSE(12);
                objmap[this.dy][this.dx].health--;
                LoseLife();
                sendmap[this.dy][this.dx] = 1;
                objmap[this.dy][this.dx] = this;
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
          if (objmap[this.dy - 1][this.dx] === 0 || objmap[this.dy - 1][this.dx].type !== 0) {
            if (sendmap[this.dy][this.dx] === 5) {
              sendmap[this.dy][this.dx] = 4;
            }else{
              sendmap[this.dy][this.dx] = 0;
            }
            objmap[this.dy][this.dx] = 0;
            this.dy--;
            if(objmap[this.dy][this.dx].type!==1){
              sendmap[this.dy][this.dx] = 1;
              objmap[this.dy][this.dx] = this;
            }
            codeScene2.tweens.add({
              targets: this,
              x: map[this.dy][this.dx][0],
              y: map[this.dy][this.dx][1],
              delay: 100,
              duration: 500,
              ease: 'Linear'
            });
            this.flipX = true;
            this.anims.play("move");
            codeScene2.time.addEvent({
              delay: 600,
              callback: () => {
                this.anims.play("turn");
                if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  objmap[this.dy][this.dx].destroy();
                  camera.shake(100, 0.01); //camera
                  setSound.playSE(12);
                  objmap[this.dy][this.dx].health--;
                  LoseLife();
                  sendmap[this.dy][this.dx] = 1;
                  objmap[this.dy][this.dx] = this;
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
          if (objmap[this.dy + 1][this.dx] === 0 || objmap[this.dy + 1][this.dx].type !== 0) {
            if (sendmap[this.dy][this.dx] === 5) {
              sendmap[this.dy][this.dx] = 4;
            }else{
              sendmap[this.dy][this.dx] = 0;
            }
            objmap[this.dy][this.dx] = 0;
            this.dy++;
            if(objmap[this.dy][this.dx].type!==1){
              sendmap[this.dy][this.dx] = 1;
              objmap[this.dy][this.dx] = this;
            }
            codeScene2.tweens.add({
              targets: this,
              x: map[this.dy][this.dx][0],
              y: map[this.dy][this.dx][1],
              delay: 100,
              duration: 500,
              ease: 'Linear'
            });
            this.flipX = true;
            this.anims.play("move");
            codeScene2.time.addEvent({
              delay: 600,
              callback: () => {
                this.anims.play("turn");
                if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  objmap[this.dy][this.dx].destroy();
                  camera.shake(100, 0.01); //camera
                  setSound.playSE(12);
                  objmap[this.dy][this.dx].health--;
                  LoseLife();
                  sendmap[this.dy][this.dx] = 1;
                  objmap[this.dy][this.dx] = this;
                }
              },
              loop: false,
            });
          }
        }
        break; 
    }
  }
  attack(direction) {
    console.log(direction);
    switch (direction) {
      // ↖ -1-1
      case 1: 
        this.magic(225);
        break;
      // ↑ -1 0
      case 2:
        this.magic(270);
        break;
      // ↗ -1 1
      case 3:
        this.magic(315);
        break;
      // ← 0 -1
      case 4:
        this.magic(180);
        break;
      // → - +1
      case 5:
        this.magic(0);
        break;
      // ↙ +1 -1
      case 6:
        this.magic(135);
        break;
      //  ↓ +1 0
      case 7:
        this.magic(90);
        break;
      // ↘ +1 +1
      case 8:
        this.magic(45);
        break;
    }
  }
  defense() {
    this.isDefense = true;
    let barrier = new Barrier(codeScene2, map[this.dy][this.dx][0],map[this.dy][this.dx][1], this );
    barrier.setDepth(10);
  }

  magic(angle) {
    let attack = new Attack(codeScene2, map[this.dy][this.dx][0],map[this.dy][this.dx][1]);
    code2magicSet.add(attack);
    attack.setDepth(10);
    let x = Math.cos(angle * (Math.PI / 180));
    let y = Math.sin(angle * (Math.PI / 180));
    attack.rotation += angle / 60;
    setSound.playSE(2);
    codeScene2.physics.moveTo(attack, map[this.dy][this.dx][0] + x, map[this.dy][this.dx][1] + y, 800);
  }

}
