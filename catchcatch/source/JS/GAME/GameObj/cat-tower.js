import { monsterSet, bossSet } from "../game";
import TowerMagic from "./tower-magic";
import TowerSkill from "./tower-skill";
import tower from "../../UI/tower-upgrade.js";
import Player from "./player";
import { UpdateCatCoin } from "../../UI/ingame-ui.js";

export default class CatTower extends Phaser.Physics.Arcade.Sprite {
  weaponSprite;
  skillSprite;
  towerAttackTimer = 0;
  towerSkillAttackTimer = 0;
  towerAS = 50; //연사속도
  towerASLevel = 0; //연사속도
  towerSkillAS = 50; //연사속도
  towerDmg = 13; //기본 대미지
  towerDmgLevel = 0;
  towerSkillDmg = 6; //스킬 기본 대미지
  towerWeaponSpeed = 500; //발사속도
  towerSkillSpeed = 500; //발사속도
  isAttack = false;
  isTwo = false; //2연발
  isThree = false; //3연발
  bulletLevel = 0;
  towerEvelop1 ="none";
  circleSize = 1.5;
  circleSizeLevel = 0;
  level = 0;
  stone = 0;
  timedEvent;

  constructor(scene, towerX, towerY, towerSprite, weaponSprite, skillSprite, stones) {
    super(scene, towerX, towerY, towerSprite);

    this.scene = scene;
    this.weaponSprite = weaponSprite;
    this.skillSprite = skillSprite;
    this.stone = stones;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, monsterSet, this.overlaphit);
    scene.physics.add.overlap(this, bossSet, this.overlaphit);
    this.anims.play(towerSprite, true);
  }

  scale_Circle() {
    this.setScale(this.circleSize);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;
    this.setCircle(hw * 5, hh - hw * 5, hh - hw * 5);
  }

}
