import { cursors, mapSize } from "../game.js";
import { gameover, updateExp } from "../../UI/inGameUI.js";
import levelup from "../../UI/levelup.js";
export const Direction = Object.freeze({
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 100;
  health = 100;
  healthLevel = 1;
  dmgmul = 1;
  dmgmulLevel = 1;
  speed = 100;
  speedLevel = 1;
  maxExp = 5;
  exp = 0;
  level = 1;
  maxExpBonus = 5;
  coin = 1000;
  // 캐릭터 특수능력 일단 보류
  ablity;
  heal = 0;
  healLevel = 1;
  fairy;
  invincible = false;
  constructor(scene, dmgmul, maxHealth, health, catname) {
    super(scene, 0, 0, catname);
    this.scale = 0.7;
    this.alpha = 1;
    this.dmgmul = dmgmul;
    this.maxHealth = maxHealth;
    this.health = health;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers(catname, { start: 0, end: 0 }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(catname, { start: 1, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(catname, { start: 1, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  expUp() {
    this.exp++;
    this.expUpdate();
    updateExp();
  }

  commonLevelUp(id) {
    switch (id) {
      case "dmgmul":
        this.dmgmulLevel++;
        this.dmgmul += 0.1;
        break;
      case "health":
        this.healthLevel++;
        this.maxHealth += 5;
        this.health += 5;
        break;
      case "heal":
        this.healLevel++;
        this.heal += 1;
        break;
      case "speed":
        this.speedLevel++;
        this.speed += 10;
        break;
    }
  }

  expUpdate() {
    if (this.exp >= this.maxExp) {
      if (!isLevelup) {
        this.exp -= this.maxExp;
        this.maxExp += this.maxExpBonus;
        this.level++;
        isLevelup = true;
        levelup();
        updateExp();
      }
    }
    updateExp();
  }

  changeFairy(fairy) {
    this.fairy = fairy;
  }

  move(direction) {
    this.fairy.x = this.x - 20;
    this.fairy.y = this.y - 50;
    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed);
      this.anims.play("left", true);
      this.flipX = true;
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed);
      this.flipX = false;
      this.anims.play("right", true);
    } else {
      this.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      this.setVelocityY(-this.speed);

      if (cursors.left.isDown) {
        this.anims.play("left", true);
      } else {
        this.anims.play("right", true);
      }
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed);

      if (cursors.left.isDown) {
        this.anims.play("left", true);
      } else {
        this.anims.play("right", true);
      }
    } else {
      this.setVelocityY(0);
      if (!cursors.left.isDown && !cursors.right.isDown) {
        this.anims.play("turn", true);
      }
    }
  }

  hitByEnemy(damage) {}

  hitPlayer(player, alien) {
    if (player.invincible == false) {
      player.invincible = true;
      player.health -= 1;
      console.log(player.invincible);
      console.log(player.health);
      // 피해 1 줌
      // stop_game -= 1;
      if (player.health <= 0) {
        gameover();
      }
    }
  }
}
