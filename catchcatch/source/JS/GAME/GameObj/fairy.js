import {cursors, mapSize} from "../game.js";

export default class Fairy extends Phaser.Physics.Arcade.Sprite {

    // 얘는 공격 스프라이트 객체
    player;
    fairyNum;
    attack;
    // 얘는 스킬 스프라이트 객체
    skill;
    skillUse = false;
    skillCd = 100;
    timer = 0;
    attackCount;
    pierceCount;
    velo;
    size;
    vampire;
    stun;
    aura;
    auraRange;
    block;
    bombCount;

    constructor(scene, skillCd,
                dmg, dmgBonus, range, as,
                asBonus, velo, fairyNum, player) {

        super(scene, -100, -100, "fairy" + fairyNum);
        this.scale = 0.35;
        this.alpha = 1;
        this.player = player;
        this.skillCd = skillCd;
        this.dmg = dmg;
        this.dmg_bonus = dmgBonus;
        this.range = range;
        this.as = as;
        this.as_bonus = asBonus;
        this.velo = velo;

        scene.add.existing(this);
        scene.physics.add.existing(this);

    }

    // 마법사
    initFairy1(attackCount, pierceCount) {
        this.attackCount = attackCount;
        this.pierceCount = pierceCount;
    }

    // 사신
    initFairy2(size, vampire) {
        this.attackCount = attackCount;
        this.pierceCount = pierceCount;
    }

    // 닌자
    initFairy3(stun) {
        this.stun = stun;
    }

    // 슬라임
    initFairy4(size, aura, auraRange, block) {
        this.size = size;
        this.aura = aura;
        this.auraRange = auraRange;
        this.block = block;
    }

    // 마녀
    initFairy5(size, bombCount) {
        this.size = size;
        this.bombCount = bombCount;
    }

    enemyHit(fairy, alien) {

    }
}