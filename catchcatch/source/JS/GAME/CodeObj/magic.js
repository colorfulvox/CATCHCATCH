export default class Magic extends Phaser.Physics.Arcade.Sprite {
    collidingEditEnemy = null;
    element;

    constructor(scene, element) {
        super(scene, 0, 0, "magic" + element);
        this.element = element;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}