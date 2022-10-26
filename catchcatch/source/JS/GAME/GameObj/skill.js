export default class Skill extends Phaser.Physics.Arcade.Sprite {
  collidingEditEnemy = null;
  dmg;
  constructor(scene, fairy) {
    super(scene, fairy.x, fairy.y, "skill" + fairy.fairyNum);
    scene.time.addEvent({ delay: (fairy.range * 1000), callback: () => { this.destroy(); }, loop: false });
    this.dmg = fairy.dmg;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}