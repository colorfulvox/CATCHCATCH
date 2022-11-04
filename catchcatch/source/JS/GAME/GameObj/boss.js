import {bossSet} from "../game";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, maxHealth, velocity, randomX, randomY, bossSpecie, anim, scale, pt, type) {
        scene.time.addEvent({
            delay: 400, callback: () => {
                if (this.active === true) {
                    this.invincible = false;
                    this.anime()
                }
            }, loop: true
        });
        super(scene, randomX, randomY, bossSpecie);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.velocity = velocity;
        this.alpha = 1;
        this.anim = anim;
        this.bossSpecie = bossSpecie;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.pt = pt;
        this.scale = scale;
        this.type = type;
    }

    anime() {
        this
            .clearTint()
            .play(this.anim);
        // .setTint(Phaser.Display.Color.RandomRGB().color)
    }
}