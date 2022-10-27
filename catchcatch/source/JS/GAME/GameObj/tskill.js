export default class TSkill extends Phaser.Physics.Arcade.Image {
  collidingEditEnemy = null;
  constructor(scene, tower) {

    super(scene, tower.x, tower.y, tower.skillsprite);
    scene.time.addEvent({ delay: 1000, callback: () => { this.body.checkCollision.none = false; }, loop: false });
    scene.time.addEvent({ delay: 3000, callback: () => { this.destroy(); }, loop: false, startAt: 1000 });
    this.dmg = tower.towerSkillDmg
    this.scale = 0.01;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

}