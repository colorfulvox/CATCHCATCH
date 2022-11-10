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
  towerDmg = 100; //기본 대미지
  towerSkillDmg = 6; //스킬 기본 대미지
  towerWeaponSpeed = 1000; //발사속도
  towerSkillSpeed = 500; //발사속도
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
    weaponDeadSprite,
    skillSprite,
    skillShowSprite,
    skillDeadSprite
  ) {
    super(scene, x, y, towerSprite);

    this.scene = scene;
    this.weaponSprite = weaponSprite;
    this.weaponDeadSprite = weaponDeadSprite;
    this.skillSprite = skillSprite;
    this.skillShowSprite = skillShowSprite;
    this.skillDeadSprite = skillDeadSprite;
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
  }

  update() {
    if (player.body.velocity.x > 0) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }
    this.towerAttackTimer++;
    if (this.towerAttackTimer >= this.towerAS[this.stone]) {
      this.towerAttackTimer = 0;
      if (this.stone === 0 && this.level > 0 && this.invisible === "true") {
        for (let i = 0; i < this.level; i++) {
          let magic = new TowerMagic(this.scene, this);
          petAttacks.add(magic);
          magic.anims.play(this.weaponSprite);
          let angle = Math.floor(Math.random() * 360);
          let x = Math.cos(angle * (Math.PI / 180));
          let y = Math.sin(angle * (Math.PI / 180));
          this.scene.physics.moveTo(magic, this.x + x, this.y + y, 300);
        }
      }
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

  levelUp() {
    this.level++;
  }

  overlaphit() {}
}
