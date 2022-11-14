import { cursors, mapSize, camera } from "../game.js";
import { GameOver, updateExp } from "../../UI/ingame-ui.js";
import levelup from "../../UI/levelup.js";
import { setSound } from "../../SOUND/sound";

export const Direction = Object.freeze({
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 10;
  health = 10;
  healthLevel = 1;
  dmgMul = 1;
  dmgMulLevel = 1;
  speed = 80;
  speedLevel = 1;
  maxExp = 3;
  exp = 0;
  level = 1;
  maxExpBonus = 3;
  coin = 100000;
  // 캐릭터 특수능력 일단 보류
  ability = 0;
  heal = 0;
  healCount = 0;
  maxHealCount = 600;
  healLevel = 1;
  fairy;
  invincible = false;
  type = "player";
  myInvincibleEvent = undefined;
  rainbow;
  catName;
  constructor(scene, dmgMul, maxHealth, health, catName) {
    super(scene, 1024, 1024, catName);
    this.alpha = 1;
    this.dmgMul = dmgMul;
    this.maxHealth = maxHealth;
    this.health = health;
    this.catName = catName;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers(catName, { start: 0, end: 0 }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers(catName, { start: 1, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(catName, { start: 1, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    if (catName === "cat5") {
      this.rainbow = scene.add.sprite(this.x - 10, this.y, "rainbow");
      UICam.ignore(this.rainbow);
      this.rainbow.setScale(0.4, 0.7);
      this.rainbow.setDepth(1);
      this.rainbow.anims.play("rainbow");
    }
  }

  expUp(i) {
    this.exp += i;
    this.expUpdate();
  }

  commonLevelUp(id) {
    switch (id) {
      case "dmgMul":
        this.dmgMulLevel++;
        this.dmgMul += 0.2;
        break;
      case "health":
        this.healthLevel++;
        this.maxHealth += 2;
        this.health += 2;
        break;
      case "heal":
        this.healLevel++;
        this.heal += 1;
        break;
      case "speed":
        this.speedLevel++;
        this.speed += 5;
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
        this.speed += 1;
        updateExp();
        levelup();
      }
    }
  }

  changeFairy(fairy) {
    this.fairy = fairy;
  }

  move(hpBar, hpBarBG) {
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
    let speedDiag = this.speed * (1 / 1.44);
    if (cursors.left.isDown && cursors.up.isDown) {
      this.body.setVelocityX(-speedDiag);
      this.body.setVelocityY(-speedDiag);
    }

    // Up and right
    if (cursors.right.isDown && cursors.up.isDown) {
      this.body.setVelocityX(speedDiag);
      this.body.setVelocityY(-speedDiag);
    }

    // Down and right
    if (cursors.right.isDown && cursors.down.isDown) {
      this.body.setVelocityX(speedDiag);
      this.body.setVelocityY(speedDiag);
    }

    // Down and left
    if (cursors.left.isDown && cursors.down.isDown) {
      this.body.setVelocityX(-speedDiag);
      this.body.setVelocityY(speedDiag);
    }
    if (this.catName === "cat5") {
      this.rainbow.setVisible(true);
      if (this.body.velocity.x > 0) {
        this.rainbow.x = this.x - 20;
        this.rainbow.y = this.y - 5;
      } else if (this.body.velocity.x < 0) {
        this.rainbow.x = this.x + 20;
        this.rainbow.y = this.y - 5;
      } else if (this.body.velocity.y !== 0) {
        this.rainbow.x = this.x - 20;
        this.rainbow.y = this.y - 5;
      } else {
        this.rainbow.setVisible(false);
      }
    }

    hpBar.setPosition(this.x - 30, this.y + 40);
    hpBarBG.setPosition(this.x - 30, this.y + 40);
  }

  hitByEnemy(damage) {}

  hitPlayer(player, monster) {
    if (ChoiceCat === 5) {
      let rand = Math.floor(Math.random() * 20);
      setSound.playSE(rand);
    } else {
      setSound.playSE(11);
    }
    camera.shake(100, 0.01); //camera
    if (player.invincible === false && monster.monSpecie === "worm") {
      monster.boomAnim();
      player.bombHitPlayer(player, monster);
      monster.destroy();
    } else if (player.invincible === false) {
      player.invincible = true;
      player.body.checkCollision.none = true;
      player.health -= 1;
      // 피해 1 줌
      // stop_game -= 1;
      if (player.health <= 0) {
        player.health = 0;
        camera.fadeEffect.alpha = 0;
        camera.fade(2000);

        let over = () => {
          GameOver();
          $this.pause();
        };
        setTimeout(over, 2000);
      }
    }
    // 공격 맞은 후 일시 무적에 사용
    player.unInvincible();
  }

  bombHitPlayer(player, bombDead) {
    if (ChoiceCat === 5) {
      let rand = Math.floor(Math.random() * 20);
      setSound.playSE(rand);
    } else {
      setSound.playSE(11);
    }
    if (!player.invincible && bombDead.monSpecie != "wormFever") {
      player.invincible = true;
      player.body.checkCollision.none = true;
      player.health -= 3;
      player.unInvincible();
      // 피해 1 줌
      // stop_game -= 1;
      if (player.health <= 0) {
        player.health = 0;
        GameOver();
        $this.pause();
      }
    }
  }

  unInvincible() {
    this.myInvincibleEvent = thisScene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.invincible = false;
        this.body.checkCollision.none = false;
        this.setVisible(true);
        thisScene.time.removeEvent(this.myInvincibleEvent);
        this.myInvincibleEvent = undefined;
      },
      loop: false,
    });
  }
}
