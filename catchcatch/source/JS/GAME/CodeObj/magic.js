export default class Magic extends Phaser.Physics.Arcade.Sprite {
  collidingEditEnemy = null;
  element;

  constructor(scene, element) {
    super(scene, 0, 0, "magic" + element);
    this.element = element;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    let hh = this.body.halfHeight;
    let hw = this.body.halfWidth;
    this.setCircle(hw, 0, hh - hw);
    this.setDepth(3);
  }
}
