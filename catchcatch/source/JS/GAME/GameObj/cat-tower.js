import { monsterSet, bossSet } from "../game";
import TowerMagic from "./tower-magic";
import TowerSkill from "./tower-skill";
import tower from "../../UI/tower-upgrade.js";
import Player from "./player";


export default class CatTower extends Phaser.Physics.Arcade.Sprite {
  weaponSprite;
  skillSprite;
  towerAttackTimer = 0;
  towerSkillAttackTimer = 0;
  towerAS = [50, 47, 44, 41, 38, 35, 32, 29, 26, 23, 20]; //연사속도
  towerASCost = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
  towerASLevel = 0; //연사속도
  towerASMax = 10;
  towerSkillAS = 50; //연사속도
  towerDmg = [13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43]; //기본 대미지
  towerDmgCost = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  towerDmgLevel = 0;
  towerDmgMax = 10;
  towerSkillDmg = 6; //스킬 기본 대미지
  towerWeaponSpeed = 500; //발사속도
  towerSkillSpeed = 500; //발사속도
  isAttack = false;
  isTwo = false; //2연발
  isThree = false; //3연발
  bulletLevel = 0;
  bulletMax = 2;
  bulletCost = [0, 50, 100];
  towerEvelop1 = [false, false, false, false]; //전기, 불, 물, 땅
  towerEvelop2 = [false, false, false, false]; //전기, 불, 물, 땅
  towerEvelopCost = [200, 1000];
  isTowerEvelop1 = false;
  isTowerEvelop2 = false;
  circleSize = 1.5;
  circleSizeMax = 10;
  circleSizeLevel = 0;
  circleSizeCost = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
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

  magicFire(game, tower, mouse, speed) {
    let magic = new TowerMagic(game, tower);

    let magicLeft;

    let magicRight;
    if (
      mouse.type !== "boss" ||
      (mouse.type === "boss" && mouse.bossSpecie !== "golem")
    ) {
      if (this.isThree === false && this.isTwo === false) {
        towerAttacks.add(magic);
      } else if (this.isThree === false && this.isTwo === true) {
        magicLeft = new TowerMagic(game, tower);
        towerAttacks.add(magic);
        towerAttacks.add(magicLeft);
      } else {
        magicLeft = new TowerMagic(game, tower);
        magicRight = new TowerMagic(game, tower);
        towerAttacks.add(magic);
        towerAttacks.add(magicLeft);
        towerAttacks.add(magicRight);
      }
    }
    game.physics.add.overlap(towerAttacks, monsterSet, tower.attack);
    tower.towerAttackTimer = 0;

    let angle = Phaser.Math.Angle.Between(tower.x, tower.y, mouse.x, mouse.y);

    magic.rotation = angle;
    let num = (tower.x - mouse.x) ** 2 + (tower.y - mouse.y) ** 2;
    let d = 145;
    let angle_dis = Math.sqrt(num);
    let angle_mouse = Math.asin(-(mouse.y - tower.y) / angle_dis);

    angle_mouse = (angle_mouse * 180) / Math.PI;
    if (mouse.x - tower.x < 0 && angle_mouse > 0) {
      angle_mouse = 180 - angle_mouse;
    } else if (mouse.x - tower.x < 0 && angle_mouse < 0) {
      angle_mouse = -angle_mouse - 180;
    } else if (angle_mouse === -0) {
      angle_mouse = -180;
    }

    let vxm;
    let vym;
    let vxp;
    let vyp;

    if (angle_mouse >= 0) {
      if (0 <= angle_mouse - 30 <= 90) {
        vxm = tower.x + d * Math.cos(((angle_mouse - 30) * Math.PI) / 180);
        vym = tower.y - d * Math.sin(((angle_mouse - 30) * Math.PI) / 180);
      }

      if (0 <= angle_mouse + 30 <= 90) {
        vxp = tower.x + d * Math.cos(((angle_mouse + 30) * Math.PI) / 180);
        vyp = tower.y - d * Math.sin(((angle_mouse + 30) * Math.PI) / 180);
      }
    } else {
      if (0 <= angle_mouse + 30) {
        vxm = tower.x + d * Math.cos(((angle_mouse + 30) * Math.PI) / 180);
        vym = tower.y - d * Math.sin(((angle_mouse + 30) * Math.PI) / 180);
      } else if (-180 < angle_mouse + 30) {
        vxm = tower.x + d * Math.cos((-(angle_mouse + 30) * Math.PI) / 180);
        vym = tower.y + d * Math.sin((-(angle_mouse + 30) * Math.PI) / 180);
      }
      vxp =
        tower.x - d * Math.cos(((180 - (angle_mouse - 30)) * Math.PI) / 180);
      vyp =
        tower.y - d * Math.sin(((180 - (angle_mouse - 30)) * Math.PI) / 180);
    }
    if (
      mouse.type !== "boss" ||
      (mouse.type === "boss" && mouse.bossSpiece !== "golem")
    ) {
      if (tower.isThree === false && tower.isTwo === false) {
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
      } else if (tower.isThree === false && tower.isTwo === true) {
        game.physics.moveTo(magicLeft, vxm, vym, speed);
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
      } else {
        game.physics.moveTo(magicLeft, vxm, vym, speed);
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
        game.physics.moveTo(magicRight, vxp, vyp, speed);
      }
    }
    // control = true;
  }

  damageFunc(thTower) {
    if (
      thTower.towerDmgLevel < 10 &&
      player.coin >= thTower.towerDmgCost[thTower.towerDmgLevel + 1]
    ) {
      player.coin -= thTower.towerDmgCost[thTower.towerDmgLevel + 1];

      thTower.towerDmgLevel += 1;
      thTower.level++;
      tower();
    }
  }

  bulletFunc(thTower) {
    if (thTower.bulletLevel < 2) {
      if (
        thTower.isTwo === false &&
        thTower.isThree === false &&
        player.coin >= thTower.bulletCost[thTower.bulletLevel + 1]
      ) {
        player.coin -= thTower.bulletCost[thTower.bulletLevel + 1];
        thTower.isTwo = true;
        thTower.bulletLevel += 1;
      } else if (
        thTower.isTwo === true &&
        thTower.isThree === false &&
        player.coin >= thTower.bulletCost[thTower.bulletLevel + 1]
      ) {
        player.coin -= thTower.bulletCost[thTower.bulletLevel + 1];
        thTower.isThree = true;
        thTower.bulletLevel += 1;
      }

      thTower.level++;

      tower();
    }
  }

  rangeFunc(thTower) {
    if (thTower.level >= 10) {
      if (
        thTower.circleSizeLevel < 10 &&
        player.coin >= thTower.circleSizeCost[thTower.circleSizeLevel + 1]
      ) {
        player.coin -= thTower.circleSizeCost[thTower.circleSizeLevel + 1];
        thTower.circlesize += 0.01;
        thTower.circleSizeLevel++;
        thTower.level++;
      }

      tower();
    }
  }

  speedFunc(thTower) {
    if (thTower.level >= 10) {
      if (
        thTower.towerASLevel < 10 &&
        player.coin >= thTower.towerASCost[thTower.towerASLevel + 1]
      ) {
        player.coin -= thTower.towerASCost[thTower.towerASLevel + 1];
        thTower.towerASLevel += 1;
        thTower.level++;
      }
      tower();

    }
  }

  changeEvelop(num, thTower) {
    if (this.level >= 9 && !this.isTowerEvelop1) {
      if (!this.isTowerEvelop1 && player.coin >= thTower.towerEvelopCost[0]) {
        player.coin -= thTower.towerEvelopCost[0];

        this.towerEvelop1[num] = true;
        this.isTowerEvelop1 = true;
        thTower.stone = num + 1;
        this.anims.play(`${num + 1}_idle`, true);
        this.level++;
      } else if (player.coin < thTower.towerEvelopCost[0]) {
        alert("코인 부족");
      }
    } else if (this.level >= 19) {
      if (!this.isTowerEvelop2) {
        if (
          !this.towerEvelop1[num] &&
          player.coin >= thTower.towerEvelopCost[1]
        ) {
          player.coin -= thTower.towerEvelopCost[1];

          this.towerEvelop2[num] = true;
          this.isTowerEvelop2 = true;

          this.level++;
        } else if (this.towerEvelop1[num]) {
          alert("중복");
        } else {
          alert("코인 부족");
        }
      } else if (
        player.coin < thTower.towerEvelopCost[0] ||
        player.coin < thTower.towerEvelopCost[1]
      ) {
        alert("코인 부족");
      }
    } else {
      alert("레벨 부족");
    }

    tower();
  }

  attack(magic, alien) {
    if (!alien.invincible) {
      magic.destroy();

      alien.health -= magic.dmg;

      if (alien.health <= 0) {
        alien.destroy();
        monsterCount -= 1;
      }
      alien.invincible = true;
    }
  }

  skillattack(skill, alien) {
    if (!alien.invincible) {
      if (skill.tower.towerEvelop1[0] === true) {
        if (Math.floor(Math.random() * (10 - 1) + 1) === 1) {
          alien.health -= skill.dmg * 9999;
        } else {
          alien.health -= 0;
        }
      } else if (skill.tower.towerEvelop1[1] === true) {
        alien.health -= skill.dmg / 2;
      } else if (skill.tower.towerEvelop1[2] === true) {
        alien.CC = "water";
      } else if (skill.tower.towerEvelop1[3] === true) {
        alien.CC = "earth";
      }

      if (skill.tower.towerEvelop2[0] === true) {
        if (Math.floor(Math.random() * (10 - 1) + 1) === 1) {
          alien.health -= skill.dmg * 9999;
        } else {
          alien.health -= 0;
        }
      } else if (skill.tower.towerEvelop2[1] === true) {
        alien.health -= skill.dmg / 2;
      } else if (skill.tower.towerEvelop2[2] === true) {
        alien.CC = "water";
      } else if (skill.tower.towerEvelop2[3] === true) {
        alien.CC = "earth";
      }

      alien.invincible = true;
      if (alien.health <= 0) {
        alien.destroy();
        monsterCount -= 1;
      }
    }
  }

  overlaphit(tower, enemy) {
    if (tower.towerAttackTimer > tower.towerAS[tower.towerASLevel]) {
      tower.magicFire(tower.scene, tower, enemy, tower.towerWeaponSpeed);
      tower.towerAttackTimer = 0;
    }
    
    if (tower.towerSkillAttackTimer > tower.towerSkillAS) {
      tower.skillFire(tower.scene, tower, enemy, tower.towerSkillSpeed);
      tower.towerSkillAttackTimer = 0;
    }
    tower.anims.play(`${tower.stone}_attack`, true);
  }

  skillFire(game, tower, mouse, speed) {
    if (
      mouse.type !== "boss" ||
      (mouse.type === "boss" && mouse.bossSpecie !== "golem")
    ) {
      let skill;
      let skill2;
      if (tower.towerEvelop1[0] === true) {
        skill = new TowerSkill(game, tower, 1000, 3000, 0.01);
      } else if (tower.towerEvelop1[1] === true) {
        skill = new TowerSkill(game, tower, 1000, 10000, 0.01);
        skill.dmg = skill.dmg / 2;
      } else if (tower.towerEvelop1[2] === true) {
        skill = new TowerSkill(game, tower, 1000, 3000, 0.01);
        mouse.CC = "water";
      } else if (tower.towerEvelop1[3] === true) {
        skill = new TowerSkill(game, tower, 1000, 3000, 0.01);
        mouse.CC = "earth";
      }

      if (skill) {
        skill.body.checkCollision.none = true;
        let hw = skill.body.halfWidth;
        let hh = skill.body.halfHeight;
        skill.setCircle(hw * 100, hh - hw * 100, hh - hw * 100);
        towerSkillAttacks.add(skill);
      }


      if (tower.towerEvelop2[0] === true) {
        skill2 = new TowerSkill(game, tower, 0, 3000, 0.01);
      } else if (tower.towerEvelop2[1] === true) {
        skill2 = new TowerSkill(game, tower, 0, 10000, 0.01);
        skill2.dmg = skill2.dmg / 2;
      } else if (tower.towerEvelop2[2] === true) {
        skill2 = new TowerSkill(game, tower, 0, 3000, 0.01);
        mouse.CC = "water";
      } else if (tower.towerEvelop2[3] === true) {
        skill2 = new TowerSkill(game, tower, 0, 3000, 0.01);
        mouse.CC = "earth";
      }

      if (skill2) {
        skill2.body.checkCollision.none = true;
        let hw = skill2.body.halfWidth;
        let hh = skill2.body.halfHeight;
        skill2.setCircle(hw * 1000, hh - hw * 1000, hh - hw * 1000);
        towerSkillAttacks.add(skill2);
      }

      game.physics.add.overlap(
        towerSkillAttacks,
        monsterSet,
        tower.skillattack
      );

      tower.towerSkillAttackTimer = 0;

      game.tweens.add({
        targets: skill,
        x: mouse.x,
        y: mouse.y,
        duration: speed,
        ease: "Linear",
        completeDelay: speed,
      });

    }
  }
}
