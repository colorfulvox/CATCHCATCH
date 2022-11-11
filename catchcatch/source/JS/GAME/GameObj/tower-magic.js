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
    this.dmg = tower.towerDmg[tower.stone];
    // this.scale = 0.01;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(1);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;

    if (tower.stone === 0) {
      this.setCircle(hw * 0.5, (hh - hw) * 0.5, (hh - hw) * 0.5);
      this.body.offset.x = 23;
      this.body.offset.y = 23;
    } else if (tower.stone === 4) {
      this.setScale(3);
      this.setCircle(hw * 0.5, (hh - hw) * 0.5, (hh - hw) * 0.5);
      this.body.offset.x = 23;
      this.body.offset.y = 23;
    } else if (tower.stone === 5) {
      this.setScale(1.5);
      this.setCircle(hw * 1, (hh - hw) * 0.5, (hh - hw) * 0.5);
      this.body.offset.x = 15;
      this.body.offset.y = 14;
    }
  }
}
