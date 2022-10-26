import { cursors, mapSize } from "../game.js";


export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  maxHealth;
  health;
  velo;
  invincible = false;
  constructor(scene, maxHealth, velo, randomX, randomY, monSpiece, anim) {
    scene.time.addEvent({delay:400, callback:()=>{this.invincible=false}, loop: true});
    super(scene, randomX, randomY, monSpiece);
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.velo = velo;
    this.alpha = 1;
    this.anim = anim;
    scene.add.existing(this);
    scene.physics.add.existing(this);

  }

  anime(){
    this
    .setTint(Phaser.Display.Color.RandomRGB().color)
    .play(this.anim);
  }

}