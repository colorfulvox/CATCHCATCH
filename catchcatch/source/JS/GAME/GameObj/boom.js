import { setSound } from "../../SOUND/sound";

export default class Boom extends Phaser.Physics.Arcade.Sprite {
  dmg;
  constructor(scene, x, y, monSpecie) {
    // magic5_1를 나중에 폭발 스프라이트 애니메이션  key로 바꾸기
    super(scene, x, y, "monster_boom");
    scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });

    scene.add.existing(this);
    scene.physics.add.existing(this);
    if (monSpecie === "worm") {
      this.setScale(2);
      this.dmg = 50;
    } else if (monSpecie === "wormPlus") {
      this.setScale(3);
      this.dmg = 100;
    } else if (monSpecie === "wormFinal") {
      this.setScale(4);
      this.dmg = 200;
    } else {
      this.setScale(5);
      this.dmg = 500;
    }

    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;

    this.setCircle(hw, 0, hh - hw);
    UICam.ignore(this);
    setSound.playSE(22);
    this.play("monster_boom");
    scene.time.addEvent({
      delay: 100,
      callback: () => {
        bombDead.add(this);
      },
      loop: false,
    });
  }
}
