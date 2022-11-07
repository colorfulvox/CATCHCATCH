import {mines} from "../game";
import {UpdateCatCoin} from "../../UI/ingame-ui";
import {setSound} from "../../SOUND/sound";

export default class Mine extends Phaser.Physics.Arcade.Sprite {
    mine = 0;
    coinTime;

    constructor(scene, mineX, mineY, minesprite, cointimes) {
        super(scene, mineX, mineY, minesprite, cointimes);

        this.scene = scene;
        this.minesprite = minesprite;
        this.coinTime = cointimes;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.overlap(this, player, this.overlapOpen);
    }

    scale_Circle() {
        this.setScale(1);
        let hw = this.body.halfWidth;
        let hh = this.body.halfHeight;
        this.setCircle(hw * 1, hh - hw * 1, hh - hw * 1);
    }

    set_anime(){
        this.play(this.minesprite);
    }

    overlapOpen(mine, player) {
        console.log(mine)
        var range = Phaser.Math.Distance.Between(mine.x, mine.y, 0, 0);

        if (gameTimer % 7200 === 0) {
            mine.coinTime = gameTimer / 7200;
        }
        if (0 <= range && range < 500) {
            player.coin += 1 + mine.coinTime;
        } else if (500 <= range && range < 5000) {
            player.coin += 2 + mine.coinTime;
        } else {
            player.coin += 3 + mine.coinTime;
        }
        UpdateCatCoin();
        setSound.playSE(17);
        mine.destroy();
    }
}
