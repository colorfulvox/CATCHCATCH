import { monsterSet, bossSet } from "../game";
import TMagic from "./tmagic";
import TSkill from "./tskill";

export default class CatTower extends Phaser.Physics.Arcade.Image {
  weaponsprite;
  skillsprite;
  towerAttackTimer = 0;
  towerSkillAttackTimer = 0;
  towerAS = [55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5]; //연사속도
  towerASLevel = 0; //연사속도
  towerSkillAS = 50; //연사속도
  towerDmg = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; //기본 대미지 
  towerDmgLevel = 0;
  towerSkillDmg = 6; //스킬 기본 대미지
  towerweaponspeed = 500; //발사속도
  towerskillspeed = 500; //발사속도
  isAttack = false;
  istwo = false; //2연발
  isthree = false;//3연발
  bulletLevel = 0;
  towerEvelop =[true, false, false, false]; //전기, 불, 물, 땅
  circlesize = 0.01;

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
    this.setScale(circlesize);
    console.log(this);
    let hw = this.body.halfWidth;
    let hh = this.body.halfHeight;
    this.setCircle(hw * 5, hh - hw * 5, hh - hw * 5);
  }

  magicFire(game, tower, mouse, speed) {
    let magic = new TMagic(game, tower);

    let magicleft = new TMagic(game, tower);

    let magicright = new TMagic(game, tower);
    if (mouse.type !== "boss" || (mouse.type === "boss" && mouse.bossSpiece !=="slime_king")) {
      console.log(mouse)
      if (this.isthree === false && this.istwo === false) {
        towerAttacks.add(magic);
      } else if(this.isthree === false && this.istwo === true) {
        towerAttacks.add(magic);
        towerAttacks.add(magicleft);
      }
      else{
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
    if (mouse.type !== "boss" || (mouse.type === "boss" && mouse.bossSpiece !=="slime_king")) {
      if (tower.isthree === false && tower.istwo === false) {
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
      } else if(tower.isthree === false && tower.istwo === true) {
        game.physics.moveTo(magicleft, vxm, vym, speed);
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
      }
      else{
        game.physics.moveTo(magicleft, vxm, vym, speed);
        game.physics.moveTo(magic, mouse.x, mouse.y, speed);
        game.physics.moveTo(magicright, vxp, vyp, speed);
      }
    }
    // control = true;
  }

  damageFunc(){
    towerDmgLevel +=1;
  }

  bulletFunc(){
if(this.istwo === false && this.isthree === false){
  this.istwo === true
  bulletLevel += 1;
}
else if(this.istwo === true && this.isthree === false){
  this.three === true
  bulletLevel += 1;
}
  }

  rangeFunc(){
    circlesize += 0.01;
  }

  speedFunc(){
    towerASLevel += 1;
  }

  attack(magic, alien) {
    if (!alien.invincible) {
      magic.destroy();
      
      alien.health -= magic.dmg;
      //   console.log(alien.health);
      alien.invincible = true;
      if (alien.health <= 0) {
        alien.destroy();
        monsterCount -= 1;
      }
    }
  }

  skillattack(skill, alien) {
    if (!alien.invincible) {
      if(skill.tower.towerEvelop[0] === true){
        if(Math.floor(Math.random() * (10 - 1) + 1) === 1){
          console.log("즉사")
        alien.health -= skill.dmg * 9999;
        }
        else{
          alien.health -= 0;
        }
      }
      else if(skill.tower.towerEvelop[1] === true){
        alien.health -= skill.dmg/2;
      }
      else if(skill.tower.towerEvelop[2] === true){
        alien.CC = 'water';
      }
      else if(skill.tower.towerEvelop[3] === true){
        alien.CC = 'earth';
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
    if (mouse.type !== "boss" || (mouse.type === "boss" && mouse.bossSpiece !=="slime_king")) {
      let skill;
      if(tower.towerEvelop[0] === true){
        skill = new TSkill(game, tower, 1000, 3000, 0.01);
      }
      else if(tower.towerEvelop[1] === true){
        skill = new TSkill(game, tower, 1000, 10000, 0.05);
        skill.dmg = skill.dmg/2;
      }
      else if(tower.towerEvelop[2] === true){
        skill = new TSkill(game, tower, 1000, 3000, 0.01);

      }
      else if(tower.towerEvelop[3] === true){
        skill = new TSkill(game, tower, 1000, 3000, 0.01);

      }
    
    skill.body.checkCollision.none = true;
    var hw = skill.body.halfWidth;2
    var hh = skill.body.halfHeight;
    skill.setCircle(hw * 1000, hh - hw * 1000, hh - hw * 1000);

    towerSkillAttacks.add(skill);
    // console.log(towerSkillAttacks)
    game.physics.add.overlap(towerSkillAttacks, monsterSet, tower.skillattack);

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
