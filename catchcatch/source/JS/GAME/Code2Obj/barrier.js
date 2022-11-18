export default class Barrier extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, player) {
    super(scene, x, y,"barrier");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    codeScene2.time.addEvent({
      delay: 3000,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
    this.anims.play("barrier");
  }

}
