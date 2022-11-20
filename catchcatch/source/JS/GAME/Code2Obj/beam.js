export default class Beam extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y, "beam");
    codeScene2.time.addEvent({
      delay: 500,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
    this.scale = 1.2;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.anims.play("beam");
  }

}
