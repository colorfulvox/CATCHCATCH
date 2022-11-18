import { LoseLife } from "../../UI/incode-ui.js";
import { camera } from "../code2.js";

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
                ease: 'Linear'
            });
            this.anims.play("move");
            codeScene2.time.addEvent({
              delay: 1200,
              callback: () => {
                this.anims.play("turn");
                if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  objmap[this.dy][this.dx].destroy();
                  camera.shake(100, 0.01); //camera
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
              ease: 'Linear'
          });
          this.anims.play("move");
          codeScene2.time.addEvent({
            delay: 1200,
            callback: () => {
              this.anims.play("turn");
              if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                objmap[this.dy][this.dx].destroy();
                camera.shake(100, 0.01); //camera
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
              ease: 'Linear'
            });
            this.flipX = true;
            this.anims.play("move");
            codeScene2.time.addEvent({
              delay: 1200,
              callback: () => {
                this.anims.play("turn");
                if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  objmap[this.dy][this.dx].destroy();
                  camera.shake(100, 0.01); //camera
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
              ease: 'Linear'
            });
            this.flipX = true;
            this.anims.play("move");
            codeScene2.time.addEvent({
              delay: 1200,
              callback: () => {
                this.anims.play("turn");
                if (objmap[this.dy][this.dx].type===1&&this.dx === objmap[this.dy][this.dx].dx && this.dy === objmap[this.dy][this.dx].dy) {
                  objmap[this.dy][this.dx].destroy();
                  camera.shake(100, 0.01); //camera
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
    switch (direction) {
      // 오른쪽
      case 0:
        if (dx < 6) {
          this.dx++;
          this.setPosition(
            global.map[this.dy][this.dx][0],
            global.map[this.dy][this.dx][1]
          );
        }
        break;
      // ↖ -1-1
      case 1:
        for (let i = 0; i < 7; i++){
          
        }
        break;
      // ↑
      case 2:

        break;
      // ↗
      case 3:

        break;
      // ←
      case 4:
        break;
      // →
      case 5:

        break;
      // ↙
      case 6:

        break;
      //  ↓ 
      case 7:

        break;
      // ↘
      case 8:

        break;
    }
  }
  defense() {
    this.isDefense = true;
  }

  hitPlayer(player, alien) {
    if (player.invincible === false) {
      player.invincible = true;
      player.body.checkCollision.none = true;
      player.health -= 1;
      // 피해 1 줌
      // stop_game -= 1;
      if (player.health <= 0) {
        gameover();
      }
    }
  }
}
