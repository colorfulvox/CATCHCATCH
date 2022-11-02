import {bossSet, monsterSet} from "../game";
import TowerMagic from "./towerMagic";
import TowerSkill from "./towerSkill";
import tower from "../../UI/towerUpgrade.js";

export default class CatTower extends Phaser.Physics.Arcade.Image {
    weaponSprite;
    skillSprite;
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
    towerWeaponSpeed = 500; //발사속도
    towerSkillSpeed = 500; //발사속도
    isTwo = false; //2연발
    isThree = false; //3연발
    bulletLevel = 0;
    bulletMax = 2;
    towerEvelop = [false, false, false, false]; //전기, 불, 물, 땅
    towerEvelop1 = [false, false, false, false]; //전기, 불, 물, 땅
    towerEvelop2 = [false, false, false, false]; //전기, 불, 물, 땅
    isTowerEvelop1 = false;
    isTowerEvelop2 = false;
    circleSize = 0.1;
    circleSizeMax = 10;
    circleSizeLevel = 0;
    level = 0;

    timedEvent;

    constructor(scene, towerX, towerY, towerSprite, weaponSprite, skillSprite) {
        super(scene, towerX, towerY, towerSprite);

        this.scene = scene;
        this.weaponSprite = weaponSprite;
        this.skillSprite = skillSprite;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.overlap(this, monsterSet, this.overlapHit);
        scene.physics.add.overlap(this, bossSet, this.overlapHit);
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
                magicRight = new TowerMagic(game, tower);
                magicLeft = new TowerMagic(game, tower);
                towerAttacks.add(magic);
                towerAttacks.add(magicLeft);
                towerAttacks.add(magicRight);
            }
        }
        game.physics.add.overlap(towerAttacks, monsterSet, tower.attack);
        tower.towerAttackTimer = 0;

        magic.rotation = Phaser.Math.Angle.Between(tower.x, tower.y, mouse.x, mouse.y);
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
            (mouse.type === "boss" && mouse.bossSpecie !== "golem")
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
        if (thTower.towerDmgLevel < 10) {
            thTower.towerDmgLevel += 1;
            thTower.level++;
            tower();
        }
    }

    bulletFunc(thTower) {
        if (thTower.bulletLevel < 2) {
            if (thTower.isTwo === false && thTower.isThree === false) {
                thTower.isTwo = true;
                thTower.bulletLevel += 1;
            } else if (thTower.isTwo === true && thTower.isThree === false) {
                thTower.isThree = true;
                thTower.bulletLevel += 1;
            }
            thTower.level++;
            tower();
        }
    }

    rangeFunc(thTower) {
        if (thTower.level >= 10) {
            if (thTower.circleSizeLevel < 10) {
                thTower.circlesize += 0.01;
                thTower.circleSizeLevel++;
                thTower.level++;
            }
            tower();
        }
    }

    speedFunc(thTower) {
        if (thTower.level >= 10) {
            if (thTower.towerASLevel < 10) {
                thTower.towerASLevel += 1;
                thTower.level++;
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
            }

            alien.invincible = true;
        }
    }

    skillAttack(skill, alien) {
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
            }
        }
    }

    overlapHit(tower, enemy) {
        if (tower.towerAttackTimer > tower.towerAS[tower.towerASLevel]) {
            tower.magicFire(tower.scene, tower, enemy, tower.towerWeaponSpeed);
            tower.towerAttackTimer = 0;
        }

        if (tower.towerSkillAttackTimer > tower.towerSkillAS) {
            tower.skillFire(tower.scene, tower, enemy, tower.towerSkillSpeed);
            tower.towerSkillAttackTimer = 0;
        }
    }

    skillFire(game, tower, mouse, speed) {
        if (
            mouse.type !== "boss" ||
            (mouse.type === "boss" && mouse.bossSpecie !== "golem")
        ) {
            let skill;
            if (tower.towerEvelop[0] === true) {
                skill = new TowerSkill(game, tower, 1000, 3000, 0.01);

            } else if (tower.towerEvelop[1] === true) {
                skill = new TowerSkill(game, tower, 1000, 10000, 0.01);

                skill.dmg = skill.dmg / 2;
            } else if (tower.towerEvelop[2] === true) {
                skill = new TowerSkill(game, tower, 1000, 3000, 0.01);

                mouse.CC = "water"
            } else if (tower.towerEvelop[3] === true) {
                skill = new TowerSkill(game, tower, 1000, 3000, 0.01);

                mouse.CC = "earth"
            }

            if (skill) {
                console.log(skill)
                skill.body.checkCollision.none = true;
                let hw = skill.body.halfWidth;
                let hh = skill.body.halfHeight;
                skill.setCircle(hw * 100, hh - hw * 100, hh - hw * 100);

                towerSkillAttacks.add(skill);
                game.physics.add.overlap(
                    towerSkillAttacks,
                    monsterSet,
                    tower.skillAttack
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