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
    if (this.body.velocity.x > 0) this.flipX = true;
    else this.flipX = false;
    if (this.cc === 'earth'){
      this.velocity = 0;
    }
    else if (this.cc === 'water'){
      this.velocity = 10;
    }
  }

  anime(){
    if (this.monSpecie === 'alien'){
      this
      .setTint(0xFFFA00) // 노랑
    }
    else if (this.monSpecie === 'alien_plus'){
      this
      .setTint(0xC29F6D)  // 갈색
    }
    else if (this.monSpecie === 'worm'){
      this
      .setTint(0x00ff00);} // 연두

    else if (this.monSpecie === 'worm_plus'){
      this  
      .setTint(0xFFAAFF)}  // 핑크

    else if (this.monSpecie === 'sonic'){
      this
      .setTint(0x0000ff)  // 파랑
    }

    else if (this.monSpecie === 'turtle'){
      this
      .setTint(0xac28f6) // 보라
    }

    else if (this.monSpecie === 'slime'){
      this
      .setTint(0x000000)  // 검정
    }

    else if (this.monSpecie === 'baby_slime'){
      this
      .setTint(0x000000)  // 검정
    }

    else if (this.monSpecie === 'fly'){
      this
      .setTint(0x00EBFF)  // 시안블루
    }
    this
    .play(this.anim);
    // .setTint(Phaser.Display.Color.RandomRGB().color)

  }

  die_anim(){
    new Explosion(thisScene, this.x, this.y);
    // this.scene.m_explosionSound.play();  몬스터 폭발 사운드
  }
}
