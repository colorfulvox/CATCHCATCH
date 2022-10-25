
export default class Magic extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, lifetime, fairy) {

    super(scene, fairy.x, fairy.y, "magic"+fairy.fairynum);
    this.lifetime = lifetime;
    this.timer = 0;
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

}