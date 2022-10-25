export default class Magic extends Phaser.Physics.Arcade.Sprite {
    collidingEditEnemy = null;

    constructor(scene, lifeTime, fairy) {

        super(scene, fairy.x, fairy.y, "magic" + fairy.fairyNum);
        this.lifeTime = lifeTime;
        this.timer = 0;
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

}