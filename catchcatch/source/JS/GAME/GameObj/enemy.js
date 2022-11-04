import Explosion from "./explosion";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  maxHealth;
  health;
  velocity;
  originalVelocity;
  invincible = false;
  monSpecie;
  cc;
  constructor(scene, maxHealth, velo, randomX, randomY, monSpecie, anim,type) {
    scene.time.addEvent({ delay: 400, callback: () => { if(this.active===true){this.invincible = false; this.anime()}}, loop: true });
    super(scene, randomX, randomY, monSpecie);
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.velocity = velo;
    this.alpha = 1;
    this.anim = anim;
    this.monSpecie = monSpecie;
    this.type = type;
    this.cc = '';
    this.scale = 1;
    this.originalVelocity = this.velocity;
    thisScene.time.addEvent({ delay: 1200, callback: () => { this.velocity = this.originalVelocity; this.cc = ""; }, loop: true });
    scene.add.existing(this);
    scene.physics.add.existing(this);


    scene.events.on("update", () => {
      this.update();
    });
  }

  update(){
    if(!this.body){
      return;
    }
    if (this.body.velocity.x > 0) this.flipX = false;
    else this.flipX = true;
    if (this.cc === 'earth'){
      this.velocity = 0;
    }
    else if (this.cc === 'water'){
      this.velocity = 10;
    }
  }

  anime(){
    this
    .clearTint()
    .play(this.anim);
    // .setTint(Phaser.Display.Color.RandomRGB().color)

  }

  dieAnim(){
    new Explosion(thisScene, this.x, this.y);
    // this.scene.m_explosionSound.play();  몬스터 폭발 사운드
  }
}
