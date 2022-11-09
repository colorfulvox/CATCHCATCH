export default class TowerMagic extends Phaser.Physics.Arcade.Sprite {
  collidingEditEnemy = null;

  constructor(scene, tower) {
    super(scene, tower.x, tower.y, tower.weaponSprite);
    scene.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.active) {
          this.anims.play(tower.weaponDeadSprite, true);
          this.body.velocity.x = 0;
          this.body.velocity.y = 0;
          this.body.checkCollision.none = true;
        }
      },
      loop: false,
    });
    scene.time.addEvent({
      delay: 1500,
      callback: () => {
        if (this.active) {
          this.destroy();
        }
      },
      loop: false,
    });
    this.dmg = tower.towerDmg;
    // this.scale = 0.01;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
