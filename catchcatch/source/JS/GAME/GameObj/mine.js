import { mines } from "../game";

export default class Mine extends Phaser.Physics.Arcade.Image {
  minesprite;
  mine = 0;

  constructor(scene, mineX, mineY, minesprite) {
    super(scene, mineX, mineY, minesprite);

    this.scene = scene;
    this.minesprite = minesprite;
    

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, player, this.overlapopen);
  }

  scale_Circle() {
    this.setScale(0.1);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;
    this.setCircle(hw * 1, hh - hw * 1, hh - hw * 1);
  }

  overlapopen(mine, player){
    var range = Phaser.Math.Distance.Between(
        mine.x,
        mine.y,
        0,
        0
    )



    if(0 <= range && range < 100){
        coin += 1;
        // cointext.setText('coin: ' + coin);
    }
    if(100 <= range && range < 500){
        coin += 2;
        // cointext.setText('coin: ' + coin);
    }
    if(500 <= range && range < 1000){
        coin += 3;
        // cointext.setText('coin: ' + coin);
    }

    mine.destroy();
  }


}
