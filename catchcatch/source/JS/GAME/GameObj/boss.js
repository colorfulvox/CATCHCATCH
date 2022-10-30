import {bossSet} from "../game";

export default class Boss extends Phaser.Physics.Arcade.Sprite {

    maxHealth;
    health;
    velo = 0;
    invincible = false;
    bossSpiece;

    constructor(scene, maxHealth, velo, randomX, randomY, bossSpiece, anim, scale, pt, type) {
        scene.time.addEvent({
            delay: 400, callback: () => {
                this.invincible = false
            }, loop: true
        });
        super(scene, randomX, randomY, bossSpiece);
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.velo = velo;
        this.alpha = 1;
        this.anim = anim;
        this.bossSpiece = bossSpiece;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.pt = pt;
        this.scale = scale;
        this.type = type;

    }

    anime() {
        if (this.bossSpiece == 'slime_king') {
            this
                .setTint(0x00ff00)
        } else if (this.bossSpiece == 'fire_giant') {
            this
                .setTint(0xff0000);
        } else if (this.bossSpiece == 'golem') {
            this
                .setTint(0x0000ff)
        } else if (this.bossSpiece == 'unkown') {
            this
                .setTint(0xac28f6)
        }
        this
            .play(this.anim);
        // .setTint(Phaser.Display.Color.RandomRGB().color)
    }
}