export default class Attack extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, "attack");
    scene.time.addEvent({
      delay: 750,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.play("attack");
    let hh = this.body.halfHeight;
    let hw = this.body.halfWidth;
    this.setCircle(hw*0.5, hh - hw*0.5, hh - hw*0.5);
  }
}
