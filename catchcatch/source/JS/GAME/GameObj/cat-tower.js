import { monsterSet, bossSet } from "../game";
import TowerMagic from "./tower-magic";
import TowerSkill from "./tower-skill";
import tower from "../../UI/tower-upgrade.js";
import Player from "./player";
import { UpdateCatCoin } from "../../UI/ingame-ui.js";

export default class CatTower extends Phaser.Physics.Arcade.Sprite {
  weaponSprite;
  skillSprite;
  towerAttackTimer = 0; //평타 시간
  towerSkillAttackTimer = 0; //스킬 시간
  towerAS = [180, 180, 90]; //평타 기준 연사속도
  towerSkillAS = [[], [], [], [], [], []]; //평타 기준 연사속도
  towerDmg = 13; //기본 대미지
  towerSkillDmg = 6; //스킬 기본 대미지
  towerWeaponSpeed = 500; //발사속도
  towerSkillSpeed = 500; //발사속도
  isAttack = false;
  isTwo = false; //2연발
  isThree = false; //3연발
  bulletLevel = 0;
  towerEvelop = 0;
  circleSize = 1.5;
  circleSizeLevel = 0;
  timedEvent;

  constructor(
    scene,
    stone,
    level,
    x,
    y,
    towerSprite,
    weaponSprite,
    skillSprite
  ) {
    super(scene, x, y, towerSprite);

    this.scene = scene;
    this.weaponSprite = weaponSprite;
    this.skillSprite = skillSprite;
    this.stone = stone;
    this.level = level;
    this.invisible = "false";

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, monsterSet, this.overlaphit);
    scene.physics.add.overlap(this, bossSet, this.overlaphit);

    this.anims.play(towerSprite, true);

    scene.events.on("update", () => {
      this.update();
    });

    console.log(this.level, this.invisible);
  }

  update() {
    if (player.body.velocity.x > 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
    this.towerAttackTimer++;
    if (this.towerAttackTimer === this.towerAS) {
      this.towerAttackTimer = 0;
    }

    if (this.level > 0 && this.invisible === "false") {
      this.invisible = "true";
      this.setVisible(true);
    }
  }

  scale_Circle() {
    this.setScale(this.circleSize);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;
    this.setCircle(hw * 5, hh - hw * 5, hh - hw * 5);
  }

  overlaphit() {}
}
