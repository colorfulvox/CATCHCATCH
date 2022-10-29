export default class Magic extends Phaser.Physics.Arcade.Sprite {
  collidingEditEnemy = null;
  stun;
  isFirst = true;
  fairy;
  bounceCount = 0;
  constructor(scene, fairy) {

    super(scene, fairy.x, fairy.y, "magic" + fairy.fairyNum);
    this.stun = fairy.stun;
    this.fairy = fairy;
    scene.time.addEvent({ delay: (fairy.range * 1000), callback: () => { console.log(this); this.destroy(); }, loop: false });
    if (fairy.fairyNum === 2) {
      scene.time.addEvent({ delay: 300, callback: () => { this.body.checkCollision.none = false; this.setVisible(true); this.setVelocity(0, 0); }, loop: false });
    }
    if (fairy.fairyNum === 5) {
      scene.time.addEvent({ delay: 1000 * fairy.bombtime, callback: () => { this.body.checkCollision.none = false; this.setScale(fairy.spriteScale*2); fairy.bombcount++; this.anims.play("magic5_1", true); }, loop: false });
    }
    this.pierceCount = fairy.maxPierceCount;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  setBounce(bounceCount){
    this.bounceCount = bounceCount;
  }
}