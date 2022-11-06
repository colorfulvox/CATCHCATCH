import { UpdateCatCoin } from "../../UI/ingame-ui.js";
import { input, camera, aliens } from "../game.js";
import Magic from "./magic.js";
import Skill from "./skill.js";
import {setSound} from "../../SOUND/sound";

export default class Fairy extends Phaser.Physics.Arcade.Sprite {
  // 얘는 공격 스프라이트 객체
  player;
  fairyNum;
  attack;
  // 얘는 스킬 스프라이트 객체
  skill;
  skillUse = false;
  skillCD = 100;
  timer = 0;
  maxAttackCount;
  attackCount;
  maxPierceCount = 99999;
  pierceCount = 99999;
  velocity;
  size = 0.5;
  spriteScale = 1;

  vxm;
  vym;
  vxp;
  vyp;
  // 요정 애니매이션 및 스프라이트 관련

  // 사신 특성
  vampire = 0;
  // swordAura = false;
  // 닌자 특성
  stun = 0;
  deathCount;
  isTriple = false;
  // 슬라임 특성
  bounceCount = 0;
  copyCount = 0;

  // 마녀 특성
  maxBombCount;
  bombCount = 999999;
  bombTime = 3;

  // 레벨
  level = 1;

  // 진화 여부
  evo1 = false;
  evo2 = false;

  skillSprite = 1;
  hh;
  hw;

  constructor(
    scene,
    skillCD,
    dmg,
    dmg_bonus,
    range,
    as,
    asBonus,
    velocity,
    fairyNum,
    player,
    size,
    spriteScale
  ) {
    super(scene, -10000, -10000, "fairy" + fairyNum);
    this.fairyNum = fairyNum;
    this.scale = 0.35;
    this.alpha = 1;
    this.player = player;
    this.skillCD = skillCD;
    this.dmg = dmg;
    this.dmg_bonus = dmg_bonus;
    this.range = range;
    this.as = as;
    this.asBonus = asBonus;
    this.velocity = velocity;
    this.size = size;
    this.spriteScale = spriteScale;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.idleKey = `fairy${this.fairyNum}_idle`;
    this.attackKey = `fairy${this.fairyNum}_attack`;
  }

  // 마법사
  initFairy1(attackCount, pierceCount) {
    this.maxAttackCount = attackCount;
    this.maxPierceCount = pierceCount;
    this.attackCount = attackCount;
    this.pierceCount = pierceCount;
  }

  // 사신
  // initFairy2(size, vampire) {
  //     this.size = size;
  //     this.vampire = vampire;
  //     this.maxPierceCount = 99999;
  //     this.pierceCount = 99999;
  // }

  // 닌자
  initFairy3(stun, deathCount) {
    this.stun = stun;
    this.deathCount = deathCount;
    this.maxPierceCount = 99999;
    this.pierceCount = 99999;
  }

  // 슬라임
  // initFairy4() {
  // }

  // 마녀
  initFairy5(size, maxBombCount) {
    this.size = size;
    this.maxBombCount = maxBombCount;
    this.bombCount = maxBombCount;
    this.maxPierceCount = 99999;
    this.pierceCount = 99999;
    this.bombTime = 99999;
    this.evo1 = true;
  }

  levelUp() {
    this.dmg += this.dmg_bonus;
    switch (this.level) {
      case 1:
        this.levelUp2();
        break;
      case 2:
        this.levelUp3();
        break;
      case 3:
        this.levelUp4();
        break;
      case 4:
        this.levelUp5();
        break;
      case 5:
        this.levelUp6();
        break;
      case 6:
        this.levelUp7();
        break;
      case 7:
        this.levelUp8();
        break;
      case 8:
        this.levelUp9();
        break;
    }
  }

  levelUp2() {
    this.level = 2;
    switch (this.fairyNum) {
      case 1:
        this.maxAttackCount++;
        break;
      case 2:
        this.spriteScale += 0.5;
        break;
      case 3:
        this.range += 2;
        break;
      case 4:
        this.as -= this.asBonus;
        break;
      case 5:
        this.maxBombCount++;
        this.bombCount++;
        break;
    }
  }

  levelUp3() {
    this.level = 3;
    switch (this.fairyNum) {
      case 1:
        this.as -= this.asBonus;
        break;
      case 2:
        this.as -= this.asBonus;
        break;
      case 3:
        this.as -= this.asBonus;
        break;
      case 4:
        this.bounceCount += 3;
        break;
      case 5:
        this.spriteScale += 0.5;
        break;
    }
  }

  levelUp4() {
    this.level = 4;
    switch (this.fairyNum) {
      case 1:
        this.maxPierceCount += 2;
        break;
      case 2:
        this.vampire++;
        break;
      case 3:
        this.stun += 0.5;
        break;
      case 4:
        this.copyCount = 5;
        break;
      case 5:
        this.maxBombCount++;
        this.bombCount++;
        break;
    }
  }

  levelUp5() {
    if (player.coin >= 200) {
      player.coin -= 200;
      this.level = 5;
      this.evo1 = true;
      this.idleKey = `fairy${this.fairyNum}_1_idle`;
      this.attackKey = `fairy${this.fairyNum}_1_attack`;
      switch (this.fairyNum) {
        case 1:
          this.spriteScale = 0.3;
          this.skillSprite = 3;
          this.skillCD = 300;
          break;
        case 2:
          this.skillSprite = 1.5;
          this.skillCD = 300;
          break;
        case 3:
          this.isTriple = true;
          break;
        // 집으로 귀환 가능
        case 4:
          this.skillCD = 7200;
          break;
        // 스페이스바로 즉시 폭발 가능
        case 5:
          this.skillCD = 300;
          break;
      }
    }
    UpdateCatCoin();
  }

  levelUp6() {
    this.level = 6;
    switch (this.fairyNum) {
      case 1:
        this.maxAttackCount++;
        break;
      case 2:
        this.spriteScale += 0.5;
        break;
      case 3:
        this.range += 2;
        break;
      case 4:
        this.as -= this.asBonus;
        break;
      case 5:
        this.maxBombCount++;
        this.bombCount++;
        break;
    }
  }

  levelUp7() {
    this.level = 7;
    switch (this.fairyNum) {
      case 1:
        this.as -= this.asBonus;
        break;
      case 2:
        this.as -= this.asBonus;
        break;
      case 3:
        this.as -= this.asBonus;
        break;
      case 4:
        this.bounceCount += 3;
        break;
      case 5:
        this.spriteScale += 0.5;
        break;
    }
  }

  levelUp8() {
    this.level = 8;
    switch (this.fairyNum) {
      case 1:
        this.maxPierceCount += 2;
        break;
      case 2:
        this.vampire++;
        break;
      case 3:
        this.stun += 0.5;
        break;
      case 4:
        this.copyCount = 10;
        break;
      case 5:
        this.maxBombCount++;
        this.bombCount++;
        break;
    }
  }

  levelUp9() {
    if (player.coin >= 500) {
      player.coin -= 500;
      this.level = 9;
      this.evo2 = true;
      this.idleKey = `fairy${this.fairyNum}_2_idle`;
      this.attackKey = `fairy${this.fairyNum}_2_attack`;
      switch (this.fairyNum) {
        case 1:
          this.spriteScale = 1;
          this.skillSprite = 5;
          break;
        case 2:
          this.skillSprite = 2;
          break;
        case 3:
          this.isTriple = true;
          break;
        // 집으로 귀환 가능
        case 4:
          this.copyCount = 60;
          this.skillCD = 3600;
          break;
        // 스페이스바로 즉시 폭발 가능
        case 5:
          this.bombTime = 99999;
          this.skillCD = 240;
          break;
      }
    }
    UpdateCatCoin();
  }

  normalAttack(magic) {
    magics.add(magic);

    if(this.fairyNum !== 2) {
      setSound.playSE(this.fairyNum - 1);
    }

    this.anims.play(this.attackKey, true);
    // magic.body.width = 50;
    // magic.body.height = 50;
    // magic.body.offset.x = 25;
    // magic.body.offset.y = 25;

    magic.setScale(this.spriteScale);

    this.hw = magic.body.halfWidth;
    this.hh = magic.body.halfHeight;

    magic.setCircle(
      this.hw * this.size,
      this.hh - this.hw * this.size,
      this.hh - this.hw * this.size
    );

    let angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      input.x + camera.scrollX,
      input.y + camera.scrollY
    );
    let magic2;
    let magic3;
    angle = ((angle + Math.PI / 2) * 180) / Math.PI + 90;
    if(this.fairyNum !== 4){
    magic.rotation += (angle - 180) / 60 - 1.5;
    }
    magic.anims.play("magic" + this.fairyNum, true);

    switch (this.fairyNum) {
      case 1:
        if (this.attackCount > 0) {
          this.attackCount--;
          normalAttackTimer = this.as - 10;
        } else {
          this.attackCount = this.maxAttackCount;
          normalAttackTimer = 0;
        }
        if (this.evo2) {
          magic.anims.play("magic" + this.fairyNum+"_2", true);
        }else if(this.evo1){
          magic.anims.play("magic" + this.fairyNum + "_1", true);
          this.hw = magic.body.halfWidth;
          this.hh = magic.body.halfHeight;
      
          magic.setCircle(
            this.hw * (this.size*4),
            this.hh - this.hw * (this.size*4),
            this.hh - this.hw * (this.size*4) 
            
          );
          magic.body.offset.x += 170;
          magic.body.offset.y += 170;
        }
        break;
      case 2:
        magic.setVisible(false);
        this.maxPierceCount = 99999;
        this.pierceCount = 99999;
        magic.body.checkCollision.none = true;
        normalAttackTimer = 0;
        magic.body.offset.x += 35;
        if (this.evo2) {
          let magic2 = new Magic(thisScene, this);
          magic2.setScale(this.spriteScale/1.5);
          let hhw = magic2.body.halfWidth;
          let hhh = magic2.body.halfHeight;
          magic2.setCircle(
            hhw * (this.size*0.8),
            hhh - hhw * (this.size*0.8),
            hhh - hhw * (this.size*0.8)
          );
          magic2.body.offset.x += 35;
          magics.add(magic2);
          let angle = Phaser.Math.Angle.Between(
            this.x,
            this.y,
            input.x + camera.scrollX,
            input.y + camera.scrollY
          );
          angle = ((angle + Math.PI / 2) * 180) / Math.PI + 90;
          magic2.rotation += (angle - 180) / 60 - 1.5;
          magic2.setVisible(false);
          magic2.body.checkCollision.none = true;
          magic2.anims.play("magic" + this.fairyNum + "_2_1", true);
          let auraSpeed = 400;
          thisScene.physics.moveTo(
            magic2,
            input.x + camera.scrollX,
            input.y + camera.scrollY,
            auraSpeed
          );
        }
        break;
      case 3:
        // 3갈래는 영선님 알고리즘 사용하기
        this.maxPierceCount = 99999;
        this.pierceCount = 99999;
        normalAttackTimer = 0;
        if (this.isTriple) {
          magic2 = new Magic(thisScene, this);
          magic3 = new Magic(thisScene, this);
          magics.add(magic2);
          magics.add(magic3);
          if (this.evo2) {
            magic.anims.play("magic3_2", true);
            magic2.anims.play("magic3_2", true);
            magic3.anims.play("magic3_2", true);
          } else if (this.evo1) {
            magic.anims.play("magic3_1", true);
            magic2.anims.play("magic3_1", true);
            magic3.anims.play("magic3_1", true);
          }

          magic2.setCircle(
            this.hw * this.size,
            this.hh - this.hw * this.size,
            this.hh - this.hw * this.size 
            
          );
          magic3.setCircle(
            this.hw * this.size,
            this.hh - this.hw * this.size,
            this.hh - this.hw * this.size 
            
          );
          let num =
            (this.x - (input.x + camera.scrollX)) ** 2 +
            (this.y - (input.y + camera.scrollY)) ** 2;
          let d = 145;
          let angle_dis = Math.sqrt(num);
          let angle_mouse = Math.asin(
            -(input.y + camera.scrollY - this.y) / angle_dis
          );

          angle_mouse = (angle_mouse * 180) / Math.PI;
          if (input.x + camera.scrollX - this.x < 0 && angle_mouse > 0) {
            angle_mouse = 180 - angle_mouse;
          } else if (input.x + camera.scrollX - this.x < 0 && angle_mouse < 0) {
            angle_mouse = -angle_mouse - 180;
          } else if (angle_mouse === -0) {
            angle_mouse = -180;
          }

          if (angle_mouse >= 0) {
            if (0 <= angle_mouse - 30 <= 90) {
              this.vxm =
                this.x + d * Math.cos(((angle_mouse - 30) * Math.PI) / 180);
              this.vym =
                this.y - d * Math.sin(((angle_mouse - 30) * Math.PI) / 180);
            }

            if (0 <= angle_mouse + 30 <= 90) {
              this.vxp =
                this.x + d * Math.cos(((angle_mouse + 30) * Math.PI) / 180);
              this.vyp =
                this.y - d * Math.sin(((angle_mouse + 30) * Math.PI) / 180);
            }
          } else {
            if (0 <= angle_mouse + 30) {
              this.vxm =
                this.x + d * Math.cos(((angle_mouse + 30) * Math.PI) / 180);
              this.vym =
                this.y - d * Math.sin(((angle_mouse + 30) * Math.PI) / 180);
            } else if (-180 < angle_mouse + 30) {
              this.vxm =
                this.x + d * Math.cos((-(angle_mouse + 30) * Math.PI) / 180);
              this.vym =
                this.y + d * Math.sin((-(angle_mouse + 30) * Math.PI) / 180);
            }
            this.vxp =
              this.x -
              d * Math.cos(((180 - (angle_mouse - 30)) * Math.PI) / 180);
            this.vyp =
              this.y -
              d * Math.sin(((180 - (angle_mouse - 30)) * Math.PI) / 180);
          }
        }
        break;
      case 4:
        //
        if(this.evo1){
          magic.anims.play("magic" + this.fairyNum+"_1", true);
        } else if (this.evo2) {
          magic.anims.play("magic" + this.fairyNum+"_2", true);
        }
        if (input.x + camera.scrollX < this.x) {
          magic.flipX = true;
        }
        normalAttackTimer = 0;
        magic.setBounce(this.bounceCount);
        break;
      case 5:
        magic.body.checkCollision.none = true;
        this.bombCount--;
        this.maxPierceCount = 99999;
        this.pierceCount = 99999;
        this.velocity = 0;
        normalAttackTimer = 0;
        if (this.evo2) {
          magic.setPosition(input.x + camera.scrollX, input.y + camera.scrollY);
        }
        break;
    }
    let speed = this.velocity;
    if (this.velocity !== 0) {
      if (
        this.player.body.velocity.x < 0 &&
        this.player.x > input.x + camera.scrollX
      ) {
        speed += this.player.speed;
      } else if (
        this.player.body.velocity.x > 0 &&
        this.player.x < input.x + camera.scrollX
      ) {
        speed += this.player.speed;
      }
    }
    thisScene.physics.moveTo(
      magic,
      input.x + camera.scrollX,
      input.y + camera.scrollY,
      speed
    );
    if (this.isTriple) {
      let angle2 = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.vxp,
        this.vyp
      );
      let angle3 = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.vxm,
        this.vym
      );

      angle2 = ((angle2 + Math.PI / 2) * 180) / Math.PI + 90;
      magic2.rotation += (angle2 - 180) / 60 - 1.5;
      angle3 = ((angle3 + Math.PI / 2) * 180) / Math.PI + 90;
      magic3.rotation += (angle3 - 180) / 60 - 1.5;
      thisScene.physics.moveTo(magic2, this.vxp, this.vyp, speed);
      thisScene.physics.moveTo(magic3, this.vxm, this.vym, speed);
    }
    control = true;
  }

  skillFire() {
    let skill;
    let shw;
    let shh;
    let sSize;
    if (this.evo1) {
      switch (this.fairyNum) {
        case 1:
          setSound.playSE(5);
          skill = new Skill(thisScene, this);
          magics.add(skill);
          skill.setDepth(2);
          skill.setScale(this.skillSprite);
          shw = skill.body.halfWidth;
          shh = skill.body.halfHeight;
          skill.setCircle(
            shw *  (this.size*2.6),
            shh -  shw *  (this.size*2.6),
            shh -  shw *  (this.size*2.6)
          );
          skill.body.offset.x += 20;
          skill.body.offset.y += 22;
          if (this.evo2) {
            skill.anims.play("magic1_2_1", true);
          } else if (this.evo1) {
            skill.anims.play("magic1_1_1", true);
          }
          
          skill.setPosition(input.x + camera.scrollX, input.y + camera.scrollY);
          this.skillUse = true;
          this.timer = 0;
          break;
        case 2:
          setSound.playSE(6);
          skill = new Skill(thisScene, this);
          skill.setDepth(2);
          skill.setScale(this.skillSprite * 3);
          sSize = this.size * 2;
          shw = skill.body.halfWidth;
          shh = skill.body.halfHeight;
          skill.setCircle(
            shw *  sSize,
            shh -  shw *  sSize,
            shh -  shw *  sSize
          );
          skill.body.offset.x += 20;
          skill.body.offset.y += 20;
          skill.anims.play("magic2_1_1", true);
          magics.add(skill);
          skill.setPosition(this.x, this.y);
          this.skillUse = true;
          this.timer = 0;
          break;
        case 3:
          break;
        case 4:
          setSound.playSE(7);
          this.player.x = 0;
          this.player.y = 0;
          thisScene.followPoint.x = 0;
          thisScene.followPoint.y = 0;
          this.skillUse = true;
          this.timer = 0;
          break;
        case 5:
          setSound.playSE(8);
          for (let i = 0; i < bombs.children.entries.length; i++) {
            bombs.children.entries[i].bomb();
          }
          this.skillUse = true;
          this.timer = 0;
          break;
      }
    }
  }
}
