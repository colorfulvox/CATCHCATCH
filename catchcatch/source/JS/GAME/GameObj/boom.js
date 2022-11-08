export default class Boom extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
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
    this.scale = 2;
    UICam.ignore(this);
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
