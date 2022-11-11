export default class TowerSkill extends Phaser.Physics.Arcade.Sprite {
  collidingEditEnemy = null;
  tower;
  angle;
  sx;
  sy;
  constructor(scene, tower, x, y, delayTime, endDelayTime, scaleSize) {
    super(scene, x, y, tower.skillSprite);
    this.tower = tower;
    scene.time.addEvent({
      delay: endDelayTime,
      callback: () => {
        this.destroy();
      },
      loop: false,
      startAt: delayTime,
    });
    this.dmg = tower.towerSkillDmg[tower.stone];
    this.scale = scaleSize;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.events.on("update", () => {
      this.update();
    });

    if (this.tower.stone === 3) {
      this.angle = Math.floor(Math.random() * 360);
      this.sx = Math.cos(this.angle * (Math.PI / 180)) * 300;
      this.sy = Math.sin(this.angle * (Math.PI / 180)) * 200;
    }
  }

  update() {
    if (this.tower.stone === 0 && this.active) {
      this.x = player.x;
      this.y = player.y;
    }
    if (this.tower.stone === 3 && this.active) {
      this.scene.physics.moveTo(this, this.x + this.sx, this.y + this.sy, 130);
    }
    // if (this.tower.stone === 4 && this.active) {
    //   this.body.immovable = true;
    // }
  }
}
