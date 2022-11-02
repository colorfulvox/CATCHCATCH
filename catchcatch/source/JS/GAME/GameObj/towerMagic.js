export default class TowerMagic extends Phaser.Physics.Arcade.Image {
  collidingEditEnemy = null;
  constructor(scene, tower) {

    super(scene, tower.x, tower.y, tower.weaponSprite);
    scene.time.addEvent({ delay: 1000, callback: () => { this.destroy(); }, loop: false });
    this.dmg = tower.towerDmg[tower.towerDmgLevel];
    this.scale = 0.01;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

}