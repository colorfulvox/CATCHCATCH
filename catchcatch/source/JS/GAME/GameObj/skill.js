export default class Skill extends Phaser.Physics.Arcade.Sprite {
    collidingEditEnemy = null;
    dmg;
    fairy;
    isSkill = true;
    pierceCount = 999999;

    constructor(scene, fairy) {
        super(scene, fairy.x, fairy.y, "skill" + fairy.fairyNum);
        let delay = 2000;
        if (fairy.fairyNum === 4) {
            delay = 400;
        }
        scene.time.addEvent({
            delay: (fairy.range * delay), callback: () => {
                this.destroy();
            }, loop: false
        });
        this.dmg = fairy.dmg * 2;
        this.fairy = fairy;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.anims.play("anim")
    }
}