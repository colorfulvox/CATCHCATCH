export default class TSkill extends Phaser.Physics.Arcade.Image {
  collidingEditEnemy = null;
  tower;
  constructor(scene, tower, delaytime, enddelaytime, scalesize) {

    super(scene, tower.x, tower.y, tower.skillsprite, delaytime, enddelaytime, scalesize);
    this.tower = tower;
    scene.time.addEvent({ delay: delaytime, callback: () => { this.body.checkCollision.none = false; }, loop: false });
    scene.time.addEvent({ delay: enddelaytime, callback: () => { this.destroy(); }, loop: false, startAt: delaytime });
    this.dmg = tower.towerSkillDmg
    this.scale = scalesize;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

}