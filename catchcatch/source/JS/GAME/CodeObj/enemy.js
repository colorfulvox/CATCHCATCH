import Explosion from "./explosion";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  maxHealth = 3;
  health = 3;
  velo;
  invincible = false;
  type;
  monSpiece;
  constructor(scene, velo, randomX, randomY, monSpiece, anim, type) {
    scene.time.addEvent({ delay: 400, callback: () => { if(this.active===true){this.invincible = false; this.anime()}}, loop: true });
    super(scene, randomX, randomY, monSpiece);
    this.velo = velo;
    this.alpha = 1;
    this.anim = anim;
    this.monSpiece = monSpiece;
    this.type = type;
    this.scale = 1;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anime();
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
