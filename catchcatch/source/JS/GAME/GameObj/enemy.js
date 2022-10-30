import Explosion from "./Explosion";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  maxHealth;
  health;
  velo;
  invincible = false;
  monSpiece;
  cc;
  constructor(scene, maxHealth, velo, randomX, randomY, monSpiece, anim,type) {
    scene.time.addEvent({delay:400, callback:()=>{this.invincible=false}, loop: true});
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
    if (this.cc == 'earth'){
      let original_velo = this.velo;
      this.velo = 0;
      scene.time.addEvent({ delay: 1200, callback: () => { this.velo = original_velo; }, loop: false });
    }
    else if (this.cc == 'water'){
      let original_velo = this.velo;
      this.velo = 10;
      scene.time.addEvent({ delay: 6000, callback: () => { this.velo = original_velo; }, loop: false });
    }
  }

  anime(){
    if (this.monSpiece == 'alien'){
      this
      .setTint(0xff0000)
    }
    else if (this.monSpiece == 'worm'){
      this
      .setTint(0x00ff00);}

    else if (this.monSpiece == 'sonic'){
      this
      .setTint(0x0000ff)
    }

    else if (this.monSpiece == 'turtle'){
      this
      .setTint(0xac28f6)
    }

    else if (this.monSpiece == 'slime'){
      this
      .setTint(0x000000)
    }

    else if (this.monSpiece == 'baby_slime'){
      this
      .setTint(0x000000)
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
