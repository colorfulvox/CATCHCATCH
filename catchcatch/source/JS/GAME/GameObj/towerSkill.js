export default class TowerSkill extends Phaser.Physics.Arcade.Image {
  collidingEditEnemy = null;
  tower;
  constructor(scene, tower, delayTime, endDelayTime, scaleSize) {

    super(scene, tower.x, tower.y, tower.skillSprite, delayTime, endDelayTime, scaleSize);
    this.tower = tower;
    scene.time.addEvent({ delay: delayTime, callback: () => { this.body.checkCollision.none = false; }, loop: false });
    scene.time.addEvent({ delay: endDelayTime, callback: () => { this.destroy(); }, loop: false, startAt: delayTime });
    this.dmg = tower.towerSkillDmg
    this.scale = scaleSize;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

}