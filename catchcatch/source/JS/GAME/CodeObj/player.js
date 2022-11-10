import { cursors, mapSize } from "../game.js";
import { gameOver, updateExp } from "../../UI/ingame-ui.js";
import levelup from "../../UI/levelup.js";
export const Direction = Object.freeze({
  Up: "Up",
  Down: "Down",
  Left: "Left",
  Right: "Right",
});

export default class Player extends Phaser.Physics.Arcade.Sprite {
  maxHealth = 20;
  health = 20;
  healthLevel = 1;
  dmgmul = 1;
  dmgmulLevel = 1;
  speed = 100;
  speedLevel = 1;
  maxExp = 3;
  exp = 0;
  level = 1;
  maxExpBonus = 1;
  coin = 1000;
  // 캐릭터 특수능력 일단 보류
  ablity;
  heal = 0;
  healCount = 0;
  maxHealCount = 300;
  healLevel = 1;
  fairy;
  invincible = false;
  constructor(scene, maxHealth, health, catname) {
    super(scene, 0, 0, catname);
    this.alpha = 1;
    this.maxHealth = maxHealth;
    this.health = health;
    scene.add.existing(this);
    scene.physics.add.existing(this);
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
