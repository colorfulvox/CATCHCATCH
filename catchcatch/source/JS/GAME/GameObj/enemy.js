import Explosion from "./explosion";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  maxHealth;
  health;
  velo;
  original_velo;
  invincible = false;
  monSpiece;
  cc;
  constructor(scene, maxHealth, velo, randomX, randomY, monSpiece, anim,type) {
    scene.time.addEvent({ delay: 400, callback: () => { if(this.active===true){this.invincible = false; this.anime()}}, loop: true });
    super(scene, randomX, randomY, monSpiece);
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.velo = velo;
    this.alpha = 1;
    this.anim = anim;
    this.monSpiece = monSpiece;
    this.type = type;
    this.cc = '';
    this.scale = 1;
    this.original_velo = this.velo;
    thisScene.time.addEvent({ delay: 1200, callback: () => { this.velo = this.original_velo; this.cc = ""; }, loop: true });
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
      this.velo = 0;
    }
    else if (this.cc === 'water'){
      this.velo = 10;
    }
  }

  anime(){
    if (this.monSpiece == 'alien'){
      this
      .setTint(0xFFFA00) // 노랑
    }
    else if (this.monSpiece == 'alien_plus'){
      this
      .setTint(0xC29F6D)  // 갈색
    }
    else if (this.monSpiece == 'worm'){
      this
      .setTint(0x00ff00);} // 연두

    else if (this.monSpiece == 'worm_plus'){
      this  
      .setTint(0xFFAAFF)}  // 핑크

    else if (this.monSpiece == 'sonic'){
      this
      .setTint(0x0000ff)  // 파랑
    }

    else if (this.monSpiece == 'turtle'){
      this
      .setTint(0xac28f6) // 보라
    }

    else if (this.monSpiece == 'slime'){
      this
      .setTint(0x000000)  // 검정
    }

    else if (this.monSpiece == 'baby_slime'){
      this
      .setTint(0x000000)  // 검정
    }

    else if (this.monSpiece == 'fly'){
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
