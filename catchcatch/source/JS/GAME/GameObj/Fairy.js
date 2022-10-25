import { cursors, mapSize } from "../game.js";

export default class Fairy extends Phaser.Physics.Arcade.Sprite {

  // 얘는 공격 스프라이트 객체
  player;
  fairynum;
  attack;
  // 얘는 스킬 스프라이트 객체
  skill;
  skill_use = false;
  skill_cd = 100;
  timer = 0;
  attackcount;
  piercecount;
  velo;
  size;
  vampire;
  stun;
  aura;
  aura_range;
  block;
  bombcount;
  constructor(scene, skill_cd,
     dmg, dmg_bonus, range, as,
      as_bonus, velo, fairynum, player) {

    super(scene, -100, -100, "fairy"+fairynum);
    this.scale = 0.35;
    this.alpha = 1;
    this.player = player;
    this.skill_cd = skill_cd;
    this.dmg = dmg;
    this.dmg_bonus = dmg_bonus;
    this.range = range;
    this.as=as;
    this.as_bonus = as_bonus;
    this.velo = velo;

    scene.add.existing(this);
    scene.physics.add.existing(this);

  }
  // 마법사
  initFalry1(attackcount, piercecount){
    this.attackcount = attackcount;
    this.piercecount = piercecount;
  }
  // 사신
  initFalry2(  size, vampire){
    this.attackcount = attackcount;
    this.piercecount = piercecount;
  }
  // 닌자
  initFalry3(stun){
    this.stun = stun;
  }
  // 슬라임
  initFalry4(size, aura, aura_range, block){
    this.size = size;
    this.aura = aura;
    this.aura_range = aura_range;
    this.block = block;
  }
  // 마녀
  initFalry5(size, bombcount){
    this.size = size;
    this.bombcount = bombcount;
  }

  Enemyhit(fairy, alien) {

  }
}