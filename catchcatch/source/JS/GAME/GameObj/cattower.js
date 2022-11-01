import { monsterSet, bossSet } from "../game";
import TMagic from "./tmagic";
import TSkill from "./tskill";
import tower from "../../UI/towerUpgrade.js";

export default class CatTower extends Phaser.Physics.Arcade.Image {
  weaponsprite;
  skillsprite;
  towerAttackTimer = 0;
  towerSkillAttackTimer = 0;
  towerAS = [50, 47, 44, 41, 38, 35, 32, 29, 26, 23, 20]; //연사속도
  towerASLevel = 0; //연사속도
  towerASMax = 10;
  towerSkillAS = 50; //연사속도
  towerDmg = [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50]; //기본 대미지
  towerDmgLevel = 0;
  towerDmgMax = 10;
  towerSkillDmg = 6; //스킬 기본 대미지
  towerweaponspeed = 500; //발사속도
  towerskillspeed = 500; //발사속도
  isAttack = false;
  istwo = false; //2연발
  isthree = false; //3연발
  bulletLevel = 0;
  bulletMax = 2;
  towerEvelop = [false, false, false, false]; //전기, 불, 물, 땅
  towerEvelop1 = [false, false, false, false]; //전기, 불, 물, 땅
  towerEvelop2 = [false, false, false, false]; //전기, 불, 물, 땅
  isTowerEvelop1 = false;
  isTowerEvelop2 = false;
  circlesize = 0.1;
  circlesizeMax = 10;
  circlesizeLevel = 0;
  level = 0;

  timedEvent;
  constructor(scene, towerX, towerY, towersprite, weaponsprite, skillsprite) {
    super(scene, towerX, towerY, towersprite);

    this.scene = scene;
    this.weaponsprite = weaponsprite;
    this.skillsprite = skillsprite;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.overlap(this, monsterSet, this.overlaphit);
    scene.physics.add.overlap(this, bossSet, this.overlaphit);
  }

  scale_Circle() {
    this.setScale(this.circlesize);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;
    this.setCircle(hw * 5, hh - hw * 5, hh - hw * 5);
  }

  magicFire(game, tower, mouse, speed) {
    let magic = new TMagic(game, tower);

    let magicleft = new TMagic(game, tower);

    let magicright = new TMagic(game, tower);
    if (
      mouse.type !== "boss" ||
      (mouse.type === "boss" && mouse.bossSpiece !== "golem")
    ) {
      if (this.isthree === false && this.istwo === false) {
        towerAttacks.add(magic);
      } else if (this.isthree === false && this.istwo === true) {
        towerAttacks.add(magic);
        towerAttacks.add(magicleft);
      } else {
        towerAttacks.add(magic);
        towerAttacks.add(magicleft);
        towerAttacks.add(magicright);
      }
    }
    game.physics.add.overlap(towerAttacks, monsterSet, tower.attack);
    tower.towerAttackTimer = 0;

    let angle = Phaser.Math.Angle.Between(tower.x, tower.y, mouse.x, mouse.y);

    magic.rotation = angle;
    var num = (tower.x - mouse.x) ** 2 + (tower.y - mouse.y) ** 2;
    var d = 145;
    var angle_dis = Math.sqrt(num);
    var angle_mouse = Math.asin(-(mouse.y - tower.y) / angle_dis);

    angle_mouse = (angle_mouse * 180) / Math.PI;
    if (mouse.x - tower.x < 0 && angle_mouse > 0) {
      angle_mouse = 180 - angle_mouse;
    } else if (mouse.x - tower.x < 0 && angle_mouse < 0) {
      angle_mouse = -angle_mouse - 180;
    } else if (angle_mouse === -0) {
      angle_mouse = -180;
    }

    var vxm;
    var vym;
    var vxp;
    var vyp;

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
      if (tower.isthree === false && tower.istwo === false) {
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
      } else if (tower.isthree === false && tower.istwo === true) {
        game.physics.moveTo(magicleft, vxm, vym, speed);
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
      } else {
        game.physics.moveTo(magicleft, vxm, vym, speed);
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
        game.physics.moveTo(magicright, vxp, vyp, speed);
      }
    }
    // control = true;
  }

  damageFunc(thtower) {
    if (thtower.towerDmgLevel < 10) {
      thtower.towerDmgLevel += 1;
      thtower.level++;
      tower();
    }
  }

  bulletFunc(thtower) {
    if (thtower.bulletLevel < 2) {
      if (thtower.istwo === false && thtower.isthree === false) {
        thtower.istwo = true;
        thtower.bulletLevel += 1;
      } else if (thtower.istwo === true && thtower.isthree === false) {
        thtower.isthree = true;
        thtower.bulletLevel += 1;
      }
      thtower.level++;
      tower();
    }
  }

  rangeFunc(thtower) {
    if (thtower.level >= 10) {
      if (thtower.circlesizeLevel < 10) {
        thtower.circlesize += 0.01;
        thtower.circlesizeLevel++;
        thtower.level++;
      }
      tower();
    }
  }

  speedFunc(thtower) {
    if (thtower.level >= 10) {
      if (thtower.towerASLevel < 10) {
        thtower.towerASLevel += 1;
        thtower.level++;
      }
      tower();
    }
  }

  changeEvelop(num) {
    if (this.level >= 9 && !this.isTowerEvelop1) {
      if (!this.isTowerEvelop1) {
        this.towerEvelop[num] = true;
        this.towerEvelop1[num] = true;
        this.isTowerEvelop1 = true;
        this.level++;
      }
    } else if (this.level >= 19) {
      if (!this.isTowerEvelop2) {
        if (!this.towerEvelop[num]) {
          this.towerEvelop[num] = true;
          this.towerEvelop2[num] = true;
          this.isTowerEvelop2 = true;
          this.level++;
        } else if (this.towerEvelop[num]) {
          alert("중복");
        }
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
      //   console.log(alien.health);
      
      if (alien.health <= 0) {
        alien.destroy();
        monsterCount -= 1;
      }
      alien.invincible = true;
    }
  }

  skillattack(skill, alien) {
    if (!alien.invincible) {
      if (skill.tower.towerEvelop[0] === true) {
        if (Math.floor(Math.random() * (10 - 1) + 1) === 1) {
          console.log("즉사");
          alien.health -= skill.dmg * 9999;
        } else {
          alien.health -= 0;
        }
      } else if (skill.tower.towerEvelop[1] === true) {
        alien.health -= skill.dmg / 2;
      } else if (skill.tower.towerEvelop[2] === true) {
        alien.CC = "water";
      } else if (skill.tower.towerEvelop[3] === true) {
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
      tower.magicFire(tower.scene, tower, enemy, tower.towerweaponspeed);
      tower.towerAttackTimer = 0;
    }

    if (tower.towerSkillAttackTimer > tower.towerSkillAS) {
      tower.skillFire(tower.scene, tower, enemy, tower.towerskillspeed);
      tower.towerSkillAttackTimer = 0;
    }
  }

  skillFire(game, tower, mouse, speed) {
    // console.log(1234)
    if (
      mouse.type !== "boss" ||
      (mouse.type === "boss" && mouse.bossSpiece !== "golem")
    ) {
      let skill;
      if (tower.towerEvelop[0] === true) {
        skill = new TSkill(game, tower, 1000, 3000, 0.01);

      } else if (tower.towerEvelop[1] === true) {
        skill = new TSkill(game, tower, 1000, 10000, 0.01);

        skill.dmg = skill.dmg / 2;
      } else if (tower.towerEvelop[2] === true) {
        skill = new TSkill(game, tower, 1000, 3000, 0.01);

        mouse.CC = "water"
      } else if (tower.towerEvelop[3] === true) {
        skill = new TSkill(game, tower, 1000, 3000, 0.01);

        mouse.CC = "earth"
      }

      if (skill) {
        console.log(skill)
        skill.body.checkCollision.none = true;
        var hw = skill.body.halfWidth;
        var hh = skill.body.halfHeight;
        skill.setCircle(hw*100, hh - hw*100, hh - hw*100);

        towerSkillAttacks.add(skill);
        // console.log(towerSkillAttacks)
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

}
