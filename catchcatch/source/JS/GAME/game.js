import Fairy from "./GameObj/fairy.js";
import Magic from "./GameObj/magic.js";
import Player from "./GameObj/player.js";
import Enemy from "./GameObj/enemy.js";
import ingameUi, {
  GameOver,
  useSkill,
  canSkill,
  messageBoss,
} from "../UI/ingame-ui.js";
import levelup from "../UI/levelup.js";
import initUpgrade, { closeUpgrade } from "../UI/upgrade.js";

import CatTower from "./GameObj/cat-tower.js";

import Boss from "./GameObj/boss.js";
import Mine from "./GameObj/mine.js";

import { UpdateTimer } from "../UI/ingame-ui.js";
import { setSound } from "../SOUND/sound.js";

export const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  parent: "game-container",
  backgroundColor: "black",
  resolution: window.devicePixelRatio,
  pixelArt: true,
  roundPixels: true,
  audio: {
    disableWebAudio: true,
  },
  scene: {
    //scene 제어에
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      debug: false,
      fixedStep: false,
    },
  },
};

// 난이도
let difficulty_spawn = 0;
let difficulty_vel = 0;
let difficulty_hp = 0;

//player start
// 고양이 json
let cats;
// 플레이어 객체
global.player = "";
global.shield = true;
// 타워

// 캐릭터 선택 시 변경될 변수
let catNumber = 0;
// 요정
let nowFairy = 0;
let fairySet = [, , , , ,];
let fairy;
global.thisScene = "";
// 공격 및 공격 딜레이 관련
global.control = false;
global.normalAttackTimer = 0;
let normalAttackAS = 20;
let magic;
global.magics = "";
let hitTimer = 0;
let hitVisible = true;
global.bombDead = "";
export let cursors;
let gameOver = false;
let scoreText;
// 마우스 포인터 관련
export let input;
let mouse;
global.cheatMode = false;
//player end

//gametimer
global.gameTimer = 0;

//map start
let map = "";
let tileset_flower = "";
let tileset_plant = "";
let tileset_props = "";
let tileset_basic = "";
let runeLayer = "";
let grassLayer = "";
let flowersLayer = "";
let fieldLayer = "";
let wallLayer = "";
// let treesLayer = "";
// let propsLayer = "";
//map end
export let camera;

let frameTime = 0;
//navi start
//navi end

//coin start
global.coin = 0;
//coin end

//enemy start

// 몬스터 변수 선언
export let monsterSet;
let monster;
export let bossSet;
export let bossMagicSet;
let fireGiantIndex;

let monsterSpawn = 300;

let killCount = 0;

// 보스
let slimeKing;
let golem;
let fireGiant;
let fireGiantAura;
// 보스 패턴
let pt;
// 보스 활성 확인
let bossActive;
let bossGolemActive;
let bossFireGiantActive;

let monX;
let monY;
global.monsterCount = 0;
let randomLocation = 0;
let feverTime = 0;
let feverLock = false;
let fever_late = 0;
let randomMonster = 0;

// 임시 구멍
global.hole = "";

// 몬스터 이미지

//enemy end

//tower start
global.petAttacks = "";
global.petSkillAttacks = "";
//tower end

//mine start
let mine;
let mineCount = 5;
let StartMineRangeX = -3000;
let StartMineRangeY = -3000;
let EndMineRangeX = 3000;
let EndMineRangeY = 3000;

global.mines = "";

//mine end

//exp bar start
let expBar;
let expBarBG;
global.UICam = "";
//exp bar end

//hp bar start
let hpBar;
let hpBarBG;

//hp bar end

function preload() {
  //map start
  this.load.image("flower", "images/map/First Asset pack.png"); //식물
  this.load.image("plant", "images/map/TX Plant.png"); //나무
  this.load.image("props", "images/map/TX Props.png"); //비석
  this.load.image("basic", "images/map/TX Tileset Grass.png"); //타일
  this.load.tilemapTiledJSON("map", "images/map/map.json");
  //map end

  //tower start

  this.load.spritesheet("catNone", "images/cattower/towerNone.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("catThunder", "images/cattower/towerThunder.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("catFire", "images/cattower/towerFire.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("catWater", "images/cattower/towerWater.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("catEarth", "images/cattower/towerEarth.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("catFinal", "images/cattower/towerFinal.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.image("skill", "images/cattower/skill.png");

  //pet start
  this.load.spritesheet("petNormal", "images/pet/petNormal.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
  this.load.spritesheet("petThunder", "images/pet/petThunder.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
  this.load.spritesheet("petFire", "images/pet/petFire.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
  this.load.spritesheet("petWater", "images/pet/petWater.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
  this.load.spritesheet("petEarth", "images/pet/petEarth.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
  this.load.spritesheet("petGod", "images/pet/petGod.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
  //petmagic
  this.load.spritesheet("catNormalMagic", "images/pet/normalMagic.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("catEarthMagic", "images/pet/earthMagic.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("catGodMagic", "images/pet/godMagic.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("catNormalSkill", "images/pet/normalSkill.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("catThunderSkill", "images/pet/thunderSkill.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("catFireSkill", "images/pet/fireSkill.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("catWaterSkill", "images/pet/waterSkill.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("catEarthSkill", "images/pet/earthSkill.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("catGodSkill", "images/pet/godSkill.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  //pet end

  //tower end

  //navi start
  //navi end

  //mine start
  this.load.spritesheet("mineani", "images/hole/new_hole.png", {
    frameWidth: 100,
    frameHeight: 100,
  });
  //mine end

  //player start
  // 플레이어 스프라이트
  this.load.spritesheet("cat1", "images/cat/cat1.png", {
    frameWidth: 96,
    frameHeight: 100,
  });
  this.load.spritesheet("cat2", "images/cat/cat2.png", {
    frameWidth: 116,
    frameHeight: 112,
  });
  this.load.spritesheet("cat3", "images/cat/cat3.png", {
    frameWidth: 116,
    frameHeight: 112,
  });
  this.load.spritesheet("cat4", "images/cat/cat4.png", {
    frameWidth: 96,
    frameHeight: 100,
  });
  this.load.spritesheet("rainbow", "images/cat/rainbow_270x150.png", {
    frameWidth: 135,
    frameHeight: 75,
  });
  this.load.spritesheet("cat5", "images/cat/cat5.png", {
    frameWidth: 96,
    frameHeight: 100,
  });
  this.load.spritesheet("cat6", "images/cat/cat6.png", {
    frameWidth: 116,
    frameHeight: 112,
  });
  this.load.spritesheet("cat7", "images/cat/cat7.png", {
    frameWidth: 96,
    frameHeight: 100,
  });

  // 공격 스프라이트
  this.load.spritesheet("magic1", "images/attack/weapon/magic1.png", {
    frameWidth: 138,
    frameHeight: 138,
    endFrame: 4,
  });

  this.load.spritesheet("magic1_1", "images/attack/weapon/magic1_1.png", {
    frameWidth: 362,
    frameHeight: 362,
    endFrame: 7,
  });
  this.load.spritesheet("magic1_1_1", "images/attack/weapon/magic1_1_1.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 24,
  });
  this.load.spritesheet("magic1_2", "images/attack/weapon/magic1_2.png", {
    frameWidth: 138,
    frameHeight: 138,
    endFrame: 4,
  });
  this.load.spritesheet("magic1_2_1", "images/attack/weapon/magic1_2_1.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 24,
  });
  this.load.spritesheet("magic2", "images/attack/weapon/magic2.png", {
    frameWidth: 192,
    frameHeight: 108,
  });
  this.load.spritesheet("magic2_1", "images/attack/weapon/magic2_1.png", {
    frameWidth: 192,
    frameHeight: 108,
  });
  this.load.spritesheet("magic2_2", "images/attack/weapon/magic2_2.png", {
    frameWidth: 192,
    frameHeight: 108,
  });
  this.load.spritesheet("magic2_1_1", "images/attack/weapon/magic2_1_1.png", {
    frameWidth: 74,
    frameHeight: 74,
  });
  this.load.spritesheet("magic2_2_1", "images/attack/weapon/magic2_2_1.png", {
    frameWidth: 192,
    frameHeight: 108,
  });

  this.load.spritesheet("magic3", "images/attack/weapon/magic3.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 7,
  });
  this.load.spritesheet("magic3_1", "images/attack/weapon/magic3_1.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 7,
  });
  this.load.spritesheet("magic3_2", "images/attack/weapon/magic3_2.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 7,
  });
  this.load.spritesheet(
    "magic4",
    "images/attack/weapon/slime_attack1_48x48.png",
    {
      frameWidth: 48,
      frameHeight: 48,
      endFrame: 2,
    }
  );

  this.load.spritesheet(
    "magic4_1",
    "images/attack/weapon/slime_attack2_48x48.png",
    {
      frameWidth: 48,
      frameHeight: 48,
      endFrame: 2,
    }
  );

  this.load.spritesheet(
    "magic4_2",
    "images/attack/weapon/slime_attack3_48x48.png",
    {
      frameWidth: 48,
      frameHeight: 48,
      endFrame: 2,
    }
  );

  this.load.spritesheet(
    "magic5",
    "images/attack/weapon/8_protectioncircle_spritesheet.png",
    { frameWidth: 100, frameHeight: 100, endFrame: 61 }
  );

  this.load.spritesheet("magic5_1", "images/attack/weapon/magic5_1.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 8,
  });
  this.load.spritesheet("magic5_2", "images/attack/weapon/magic5_2.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 8,
  });
  this.load.spritesheet("magic5_3", "images/attack/weapon/magic5_3.png", {
    frameWidth: 74,
    frameHeight: 74,
    endFrame: 8,
  });
  // 스킬 스프라이트

  this.load.spritesheet(
    "skill4",
    "images/attack/weapon/10_weaponhit_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );
  // 요정 스프라이트
  this.load.spritesheet("fairy1", "images/fairy/fairy1.png", {
    frameWidth: 150,
    frameHeight: 142,
  });

  this.load.spritesheet("fairy1_1", "images/fairy/fairy1_yellow.png", {
    frameWidth: 150,
    frameHeight: 142,
  });

  this.load.spritesheet("fairy1_2", "images/fairy/fairy1_Red.png", {
    frameWidth: 150,
    frameHeight: 142,
  });

  this.load.spritesheet("fairy2", "images/fairy/fairy2.png", {
    frameWidth: 230,
    frameHeight: 210,
  });

  this.load.spritesheet("fairy2_1", "images/fairy/fairy2_Red.png", {
    frameWidth: 230,
    frameHeight: 210,
  });

  this.load.spritesheet("fairy2_2", "images/fairy/fairy2_black.png", {
    frameWidth: 230,
    frameHeight: 210,
  });

  this.load.spritesheet("fairy3", "images/fairy/fairy3.png", {
    frameWidth: 140,
    frameHeight: 140,
  });

  this.load.spritesheet("fairy3_1", "images/fairy/fairy3_Red.png", {
    frameWidth: 140,
    frameHeight: 140,
  });

  this.load.spritesheet("fairy3_2", "images/fairy/fairy3_master.png", {
    frameWidth: 140,
    frameHeight: 140,
  });

  this.load.spritesheet("fairy4", "images/fairy/fairy4.png", {
    frameWidth: 136,
    frameHeight: 170,
  });

  this.load.spritesheet("fairy4_1", "images/fairy/fairy4_blue.png", {
    frameWidth: 136,
    frameHeight: 170,
  });

  this.load.spritesheet("fairy4_2", "images/fairy/fairy4_green.png", {
    frameWidth: 136,
    frameHeight: 170,
  });

  this.load.spritesheet("fairy5", "images/fairy/fairy5.png", {
    frameWidth: 160,
    frameHeight: 190,
  });

  this.load.spritesheet("fairy5_1", "images/fairy/fairy5_red.png", {
    frameWidth: 160,
    frameHeight: 190,
  });

  this.load.spritesheet("fairy5_2", "images/fairy/fairy5_black.png", {
    frameWidth: 160,
    frameHeight: 190,
  });

  //player end

  //enemy start

  // 몬스터

  this.load.spritesheet("monster_die", "images/monster/monster_die2.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("monster_boom", "images/monster/monster_die.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("monster_fever", "images/monster/monster_fever.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("alien", "images/monster/alien.png", {
    frameWidth: 20,
    frameHeight: 20,
  });

  this.load.spritesheet("worm", "images/monster/worm.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  this.load.spritesheet("sonic", "images/monster/sonic.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  this.load.spritesheet("turtle", "images/monster/turtle.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  this.load.spritesheet("slime", "images/monster/slime.png", {
    frameWidth: 16,
    frameHeight: 16,
  });

  this.load.spritesheet("fly", "images/monster/fly.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  this.load.spritesheet("alienPlus", "images/monster/alienPlus.png", {
    frameWidth: 20,
    frameHeight: 20,
  });

  this.load.spritesheet("alienFinal", "images/monster/alienFinal.png", {
    frameWidth: 20,
    frameHeight: 20,
  });

  this.load.spritesheet("wormPlus", "images/monster/wormPlus.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  this.load.spritesheet("wormFinal", "images/monster/wormFinal.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  this.load.spritesheet("wormFever", "images/monster/wormFever.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  //   보스
  this.load.spritesheet("slimeKing", "images/boss/slimeKing.png", {
    frameWidth: 96,
    frameHeight: 96,
  });

  this.load.spritesheet("golem", "images/boss/golem.png", {
    frameWidth: 96,
    frameHeight: 96,
  });

  this.load.spritesheet("fireGiant", "images/boss/fireGiant.png", {
    frameWidth: 96,
    frameHeight: 96,
  });

  this.load.spritesheet("fireGiantAura", "images/boss/fireGiantAura.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  //enemy end
}

function create() {
  this.anims.create({
    key: "rainbow",
    frames: this.anims.generateFrameNumbers("rainbow", { start: 0, end: 1 }),
    frameRate: 8,
    repeat: -1,
  });

  this.input.setDefaultCursor("url(/images/cursor/aimNone.png), pointer");
  setSound.setBGM(1);

  thisScene = this;
  //map start
  map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  tileset_flower = map.addTilesetImage("flower", "flower");
  tileset_plant = map.addTilesetImage("plant", "plant");
  tileset_props = map.addTilesetImage("props", "props");
  tileset_basic = map.addTilesetImage("basic", "basic");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  fieldLayer = map.createLayer("field", tileset_basic, 0, 0);
  grassLayer = map.createLayer("grass", tileset_plant, 0, 0);
  flowersLayer = map.createLayer("flowers", tileset_flower, 0, 0);
  //   propsLayer = map.createLayer("props", tileset_props, 0, 0);
  //   treesLayer = map.createLayer("trees", tileset_plant, 0, 0);
  runeLayer = map.createLayer("rune", tileset_props, 0, 0);
  wallLayer = map.createLayer("wall", tileset_flower, 0, 0);

  wallLayer.setCollisionByProperty({ collides: true });
  //   treesLayer.setCollisionByProperty({ collides: true });
  //map end

  UICam = this.cameras.add(
    player.x,
    player.y,
    this.cameras.main.worldView.width,
    this.cameras.main.worldView.height
  );

  // this.cameras.main.setBounds(0, 0, mapSize, mapSize);
  // this.physics.world.setBounds(0, 0, mapSize, mapSize);

  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    slot1: Phaser.Input.Keyboard.KeyCodes.ONE,
    slot2: Phaser.Input.Keyboard.KeyCodes.TWO,
    slot3: Phaser.Input.Keyboard.KeyCodes.THREE,
    slot4: Phaser.Input.Keyboard.KeyCodes.FOUR,
    slot5: Phaser.Input.Keyboard.KeyCodes.FIVE,
    skill: Phaser.Input.Keyboard.KeyCodes.SPACE,
  });

  global.$this = this.scene;
  this.input.keyboard.on("keydown-" + "SHIFT", function (event) {
    initUpgrade();
  });
  //map end

  //player start
  player = new Player(this, 1, 20, 20, "cat" + (ChoiceCat + 1));
  this.physics.add.collider(player, wallLayer);
  //   this.physics.add.collider(player, treesLayer);
  player.ability = ChoiceCat + 1;
  player.setScale(0.7);
  player.setDepth(3);
  let hw = player.body.halfWidth;
  let hh = player.body.halfHeight;

  player.setCircle(hw * 0.6, hh - hw * 0.6, hh - hw * 0.6);
  camera = this.cameras.main;
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);
  camera.fadeEffect.alpha = 0;
  camera.flash(800, 1, 1, 1);
  input = this.input;
  mouse = input.mousePointer;
  this.input.on(
    "pointermove",
    function (pointer) {
      let cursor = pointer;
      let angle = Phaser.Math.Angle.Between(
        player.x,
        player.y,
        cursor.x + this.cameras.main.scrollX,
        cursor.y + this.cameras.main.scrollY
      );
    },
    this
  );

  // 플레이어, 요정 로딩
  global.wizard = fairySet[0] = new Fairy(
    this,
    100,
    15,
    3,
    1,
    60,
    20,
    500,
    1,
    player,
    0.5,
    1
  );
  fairySet[0].initFairy1(0, 0);
  global.reaper = fairySet[1] = new Fairy(
    this,
    100,
    10,
    2,
    1,
    80,
    20,
    160,
    2,
    player,
    0.5,
    1
  );
  global.ninja = fairySet[2] = new Fairy(
    this,
    100,
    5,
    1,
    3,
    60,
    10,
    300,
    3,
    player,
    0.5,
    1
  );
  fairySet[2].initFairy3(0, 0);
  global.slime = fairySet[3] = new Fairy(
    this,
    7200,
    10,
    2,
    10,
    60,
    10,
    400,
    4,
    player,
    0.5,
    2
  );

  global.witch = fairySet[4] = new Fairy(
    this,
    600,
    5,
    1,
    3,
    40,
    10,
    500,
    5,
    player,
    0.5,
    1
  );
  global.bombs = this.physics.add.group();
  fairySet[4].initFairy5(0.5, 1);
  for (let i = 0; i < 5; i++) {
    fairySet[i].setDepth(2);
  }
  player.changeFairy(fairySet[0]);
  normalAttackAS = fairySet[0].as;
  // animation
  this.anims.create({
    key: "fairy1_idle",
    frames: this.anims.generateFrameNumbers("fairy1", { start: 12, end: 21 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy1_attack",
    frames: this.anims.generateFrameNumbers("fairy1", { start: 6, end: 10 }),
    frameRate: 12,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy1_1_idle",
    frames: this.anims.generateFrameNumbers("fairy1_1", { start: 12, end: 21 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy1_1_attack",
    frames: this.anims.generateFrameNumbers("fairy1_1", { start: 6, end: 10 }),
    frameRate: 12,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy1_2_idle",
    frames: this.anims.generateFrameNumbers("fairy1_2", { start: 12, end: 21 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy1_2_attack",
    frames: this.anims.generateFrameNumbers("fairy1_2", { start: 6, end: 10 }),
    frameRate: 12,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy2_idle",
    frames: this.anims.generateFrameNumbers("fairy2", { start: 10, end: 19 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy2_attack",
    frames: this.anims.generateFrameNumbers("fairy2", { start: 0, end: 8 }),
    frameRate: 14,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy2_1_idle",
    frames: this.anims.generateFrameNumbers("fairy2_1", { start: 10, end: 19 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy2_1_attack",
    frames: this.anims.generateFrameNumbers("fairy2_1", { start: 0, end: 8 }),
    frameRate: 14,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy2_2_idle",
    frames: this.anims.generateFrameNumbers("fairy2_2", { start: 10, end: 19 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy2_2_attack",
    frames: this.anims.generateFrameNumbers("fairy2_2", { start: 0, end: 8 }),
    frameRate: 14,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy3_idle",
    frames: this.anims.generateFrameNumbers("fairy3", { start: 9, end: 18 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy3_attack",
    frames: this.anims.generateFrameNumbers("fairy3", { start: 0, end: 7 }),
    frameRate: 14,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy3_1_idle",
    frames: this.anims.generateFrameNumbers("fairy3_1", { start: 9, end: 18 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy3_1_attack",
    frames: this.anims.generateFrameNumbers("fairy3_1", { start: 0, end: 7 }),
    frameRate: 14,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy3_2_idle",
    frames: this.anims.generateFrameNumbers("fairy3_2", { start: 9, end: 18 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy3_2_attack",
    frames: this.anims.generateFrameNumbers("fairy3_2", { start: 0, end: 7 }),
    frameRate: 14,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy4_idle",
    frames: this.anims.generateFrameNumbers("fairy4", { start: 7, end: 14 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy4_attack",
    frames: this.anims.generateFrameNumbers("fairy4", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy4_1_idle",
    frames: this.anims.generateFrameNumbers("fairy4_1", { start: 7, end: 14 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy4_1_attack",
    frames: this.anims.generateFrameNumbers("fairy4_1", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy4_2_idle",
    frames: this.anims.generateFrameNumbers("fairy4_2", { start: 7, end: 14 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy4_2_attack",
    frames: this.anims.generateFrameNumbers("fairy4_2", { start: 0, end: 5 }),
    frameRate: 10,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy5_idle",
    frames: this.anims.generateFrameNumbers("fairy5", { start: 15, end: 24 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy5_attack",
    frames: this.anims.generateFrameNumbers("fairy5", { start: 0, end: 13 }),
    frameRate: 17,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy5_1_idle",
    frames: this.anims.generateFrameNumbers("fairy5_1", { start: 15, end: 24 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy5_1_attack",
    frames: this.anims.generateFrameNumbers("fairy5_1", { start: 0, end: 13 }),
    frameRate: 17,
    repeat: 0,
  });

  this.anims.create({
    key: "fairy5_2_idle",
    frames: this.anims.generateFrameNumbers("fairy5_2", { start: 15, end: 24 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy5_2_attack",
    frames: this.anims.generateFrameNumbers("fairy5_2", { start: 0, end: 13 }),
    frameRate: 17,
    repeat: 0,
  });

  // 공격 애니메이션
  this.anims.create({
    key: "magic1",
    frames: this.anims.generateFrameNumbers("magic1", {
      start: 0,
      end: 3,
      first: 0,
    }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic1_1",
    frames: this.anims.generateFrameNumbers("magic1_1", {
      start: 0,
      end: 6,
      first: 0,
    }),
    frameRate: 20,
    repeat: -1,
  });

  this.anims.create({
    key: "magic1_1_1",
    frames: this.anims.generateFrameNumbers("magic1_1_1", {
      start: 0,
      end: 24,
      first: 0,
    }),
    frameRate: 70,
    repeat: -1,
  });

  this.anims.create({
    key: "magic1_2_1",
    frames: this.anims.generateFrameNumbers("magic1_2_1", {
      start: 0,
      end: 24,
      first: 0,
    }),
    frameRate: 70,
    repeat: -1,
  });
  this.anims.create({
    key: "magic1_2",
    frames: this.anims.generateFrameNumbers("magic1_2", {
      start: 0,
      end: 3,
      first: 0,
    }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic2",
    frames: this.anims.generateFrameNumbers("magic2", {
      start: 0,
      end: 15,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "magic2_1",
    frames: this.anims.generateFrameNumbers("magic2_1", {
      start: 0,
      end: 15,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "magic2_1_1",
    frames: this.anims.generateFrameNumbers("magic2_1_1", {
      start: 0,
      end: 15,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "magic2_2",
    frames: this.anims.generateFrameNumbers("magic2_2", {
      start: 0,
      end: 15,
    }),
    frameRate: 16,
    repeat: -1,
  });

  this.anims.create({
    key: "magic2_2_1",
    frames: this.anims.generateFrameNumbers("magic2_2_1", {
      start: 3,
      end: 3,
      first: 0,
    }),
    frameRate: 1,
    repeat: -1,
  });

  this.anims.create({
    key: "magic3",
    frames: this.anims.generateFrameNumbers("magic3", {
      start: 0,
      end: 7,
      first: 0,
    }),
    frameRate: 20,
    repeat: -1,
  });

  this.anims.create({
    key: "magic3_1",
    frames: this.anims.generateFrameNumbers("magic3_1", {
      start: 0,
      end: 7,
      first: 0,
    }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic3_2",
    frames: this.anims.generateFrameNumbers("magic3_2", {
      start: 0,
      end: 7,
      first: 0,
    }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic4",
    frames: this.anims.generateFrameNumbers("magic4", {
      start: 0,
      end: 2,
      first: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "magic4_1",
    frames: this.anims.generateFrameNumbers("magic4_1", {
      start: 0,
      end: 2,
      first: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "magic4_2",
    frames: this.anims.generateFrameNumbers("magic4_2", {
      start: 0,
      end: 2,
      first: 0,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "magic5",
    frames: this.anims.generateFrameNumbers("magic5", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });

  this.anims.create({
    key: "magic5_1",
    frames: this.anims.generateFrameNumbers("magic5_1", {
      start: 0,
      end: 7,
      first: 0,
    }),
    frameRate: 50,
    repeat: -1,
  });
  this.anims.create({
    key: "magic5_2",
    frames: this.anims.generateFrameNumbers("magic5_2", {
      start: 0,
      end: 7,
      first: 0,
    }),
    frameRate: 50,
    repeat: -1,
  });
  this.anims.create({
    key: "magic5_3",
    frames: this.anims.generateFrameNumbers("magic5_3", {
      start: 0,
      end: 7,
      first: 0,
    }),
    frameRate: 50,
    repeat: -1,
  });
  fairySet[nowFairy].play(fairySet[nowFairy].idleKey, true);

  //player end

  //cointext start
  // cointext = this.add.text(500, 20, 'coin: 0', {font: 'Bold 15px Arial', fill: '#fff', fontStyle: "strong"}).setScrollFactor(0);
  // cointext.setStroke('#000', 2);
  // cointext.setDepth(2);
  //cointext end

  //enemy start

  bossSet = this.physics.add.group();
  bossMagicSet = this.physics.add.group();
  bombDead = this.physics.add.group();
  monsterSet = this.physics.add.group();
  magics = this.physics.add.group();
  petAttacks = this.physics.add.group();
  petSkillAttacks = this.physics.add.group();
  mines = this.physics.add.group();

  ingameUi();

  this.physics.add.collider(player, bossSet, player.hitPlayer);
  this.physics.add.collider(bossSet, monsterSet);
  thisScene.physics.add.overlap(magics, bossSet, attack);
  thisScene.physics.add.overlap(bossMagicSet, player, player.hitPlayer);

  // 만약 유저와 몬스터가 닿았다면 (hitplayer 함수 실행)
  this.physics.add.collider(player, monsterSet, player.hitPlayer);
  thisScene.physics.add.overlap(magics, monsterSet, attack);
  thisScene.physics.add.overlap(bombDead, monsterSet, bomb);
  thisScene.physics.add.overlap(bombDead, player, player.bombHitPlayer);

  //map start
  thisScene.physics.add.overlap(petAttacks, bossSet, petAttackFunc);
  thisScene.physics.add.overlap(petAttacks, monsterSet, petAttackFunc);

  //map end

  // ============== 몬스터 스프라이트 애니메이션 목록 ==================
  this.anims.create({
    key: "alien",
    frames: this.anims.generateFrameNumbers("alien", { start: 9, end: 14 }),
    frameRate: 3,
    repeat: -1, // -1은 무한 반복 의미
  });

  this.anims.create({
    key: "worm",
    frames: this.anims.generateFrameNumbers("worm", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "alienPlus",
    frames: this.anims.generateFrameNumbers("alienPlus", { start: 9, end: 14 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "alienFinal",
    frames: this.anims.generateFrameNumbers("alienFinal", {
      start: 9,
      end: 14,
    }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "wormPlus",
    frames: this.anims.generateFrameNumbers("wormPlus", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "wormFinal",
    frames: this.anims.generateFrameNumbers("wormFinal", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "wormFever",
    frames: this.anims.generateFrameNumbers("wormFever", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "sonic",
    frames: this.anims.generateFrameNumbers("sonic", { start: 0, end: 1 }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "turtle",
    frames: this.anims.generateFrameNumbers("turtle", { start: 0, end: 1 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "slime",
    frames: this.anims.generateFrameNumbers("slime", { start: 7, end: 14 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "fly",
    frames: this.anims.generateFrameNumbers("fly", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });
  // boss

  this.anims.create({
    key: "slimeKing",
    frames: this.anims.generateFrameNumbers("slimeKing", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "golem",
    frames: this.anims.generateFrameNumbers("golem", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "fireGiant",
    frames: this.anims.generateFrameNumbers("fireGiant", { start: 0, end: 2 }),
    frameRate: 3,
    repeat: -1,
  });

  this.anims.create({
    key: "monster_die",
    frames: this.anims.generateFrameNumbers("monster_die", {
      start: 0,
      end: 5,
    }),
    frameRate: 12,
    repeat: -1,
  });

  this.anims.create({
    key: "monster_boom",
    frames: this.anims.generateFrameNumbers("monster_boom", {
      start: 0,
      end: 7,
    }),
    frameRate: 12,
    repeat: 0,
  });

  this.anims.create({
    key: "monster_fever",
    frames: this.anims.generateFrameNumbers("monster_fever", {
      start: 0,
      end: 7,
    }),
    frameRate: 12,
    repeat: 0,
  });

  this.anims.create({
    key: "fireGiantAura",
    frames: this.anims.generateFrameNumbers("fireGiantAura", {
      start: 0,
      end: 5,
    }),
    frameRate: 12,
    repeat: -1,
  });
  //enemy end

  //tower start

  //pet start
  this.anims.create({
    key: "0_idle_pet",
    frames: this.anims.generateFrameNumbers("petNormal", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "1_idle_pet",
    frames: this.anims.generateFrameNumbers("petThunder", {
      start: 0,
      end: 2,
    }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "2_idle_pet",
    frames: this.anims.generateFrameNumbers("petFire", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "3_idle_pet",
    frames: this.anims.generateFrameNumbers("petWater", {
      start: 0,
      end: 2,
    }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "4_idle_pet",
    frames: this.anims.generateFrameNumbers("petEarth", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "5_idle_pet",
    frames: this.anims.generateFrameNumbers("petGod", {
      start: 0,
      end: 4,
    }),
    frameRate: 8,
    repeat: -1,
  });

  //petmagic
  this.anims.create({
    key: "0_idle_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "0_destory_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 2,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "1_idle_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "1_destory_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 2,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "2_idle_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "2_destory_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 2,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "3_idle_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "3_destory_magic",
    frames: this.anims.generateFrameNumbers("catNormalMagic", {
      start: 2,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "4_idle_magic",
    frames: this.anims.generateFrameNumbers("catEarthMagic", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "4_destory_magic",
    frames: this.anims.generateFrameNumbers("catEarthMagic", {
      start: 2,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "5_idle_magic",
    frames: this.anims.generateFrameNumbers("catGodMagic", {
      start: 0,
      end: 1,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "5_destory_magic",
    frames: this.anims.generateFrameNumbers("catGodMagic", {
      start: 2,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "0_idle_skill",
    frames: this.anims.generateFrameNumbers("catNormalSkill", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "1_idle_skill",
    frames: this.anims.generateFrameNumbers("catThunderSkill", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "2_idle_skill",
    frames: this.anims.generateFrameNumbers("catFireSkill", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "3_idle_skill",
    frames: this.anims.generateFrameNumbers("catWaterSkill", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "4_idle_skill",
    frames: this.anims.generateFrameNumbers("catEarthSkill", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });
  this.anims.create({
    key: "5_idle_skill",
    frames: this.anims.generateFrameNumbers("catGodSkill", {
      start: 0,
      end: 5,
    }),
    frameRate: 8,
    repeat: 0,
  });
  //pet end

  global.pets = this.add.group();

  let px = player.x;
  let py = player.y;

  global.petNormal = new CatTower(
    this,
    0,
    0,
    px,
    py,
    "0_idle_pet",
    "0_idle_magic",
    "0_destory_magic",
    "0_idle_skill"
  );
  global.petThunder = new CatTower(
    this,
    1,
    0,
    px,
    py,
    "1_idle_pet",
    "1_idle_magic",
    "1_destory_magic",
    "1_idle_skill"
  );
  global.petFire = new CatTower(
    this,
    2,
    0,
    px,
    py,
    "2_idle_pet",
    "2_idle_magic",
    "2_destory_magic",
    "2_idle_skill"
  );
  global.petWater = new CatTower(
    this,
    3,
    0,
    px,
    py,
    "3_idle_pet",
    "3_idle_magic",
    "3_destory_magic",
    "3_idle_skill"
  );
  global.petEarth = new CatTower(
    this,
    4,
    0,
    px,
    py,
    "4_idle_pet",
    "4_idle_magic",
    "4_destory_magic",
    "4_idle_skill"
  );
  global.petGod = new CatTower(
    this,
    5,
    0,
    px,
    py,
    "5_idle_pet",
    "5_idle_magic",
    "5_destory_magic",
    "5_idle_skill"
  );

  petNormal.setDepth(10);
  petThunder.setDepth(10);
  petFire.setDepth(10);
  petWater.setDepth(10);
  petEarth.setDepth(10);
  petGod.setDepth(10);

  petNormal.setVisible(false);
  petThunder.setVisible(false);
  petFire.setVisible(false);
  petWater.setVisible(false);
  petEarth.setVisible(false);
  petGod.setVisible(false);

  //디버그용
  // petNormal.setVisible(true);
  // petThunder.setVisible(true);
  // petFire.setVisible(true);
  // petWater.setVisible(true);
  // petEarth.setVisible(true);
  // petGod.setVisible(true);

  pets.add(petNormal);
  pets.add(petThunder);
  pets.add(petFire);
  pets.add(petWater);
  pets.add(petEarth);
  pets.add(petGod);

  global.petscircle = new Phaser.Geom.Circle(player.x, player.y, 800);

  global.startAngle = this.tweens.addCounter({
    from: 50,
    to: 100,
    duration: 100000,
    ease: "Linear",
    repeat: -1,
  });

  global.endAngle = this.tweens.addCounter({
    from: 100,
    to: 50,
    duration: 100000,
    ease: "Linear",
    repeat: -1,
  });

  //cattower animation start
  this.anims.create({
    key: "0_idle",
    frames: this.anims.generateFrameNumbers("catNone", {
      start: 0,
      end: 2,
    }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "0_attack",
    frames: this.anims.generateFrameNumbers("catNone", {
      start: 3,
      end: 8,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "1_idle",
    frames: this.anims.generateFrameNumbers("catThunder", {
      start: 0,
      end: 2,
    }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "1_attack",
    frames: this.anims.generateFrameNumbers("catThunder", {
      start: 3,
      end: 8,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "2_idle",
    frames: this.anims.generateFrameNumbers("catFire", {
      start: 0,
      end: 2,
    }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "2_attack",
    frames: this.anims.generateFrameNumbers("catFire", {
      start: 3,
      end: 8,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "3_idle",
    frames: this.anims.generateFrameNumbers("catWater", {
      start: 0,
      end: 2,
    }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "3_attack",
    frames: this.anims.generateFrameNumbers("catWater", {
      start: 3,
      end: 8,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "4_idle",
    frames: this.anims.generateFrameNumbers("catEarth", {
      start: 0,
      end: 2,
    }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "4_attack",
    frames: this.anims.generateFrameNumbers("catEarth", {
      start: 3,
      end: 8,
    }),
    frameRate: 8,
    repeat: 0,
  });

  this.anims.create({
    key: "5_idle",
    frames: this.anims.generateFrameNumbers("catFinal", {
      start: 0,
      end: 2,
    }),
    frameRate: 4,
    repeat: -1,
  });

  this.anims.create({
    key: "5_attack",
    frames: this.anims.generateFrameNumbers("catFinal", {
      start: 3,
      end: 8,
    }),
    frameRate: 8,
    repeat: 0,
  });
  //cattower animation end

  //tower end

  //mine start
  this.anims.create({
    key: "minecoin",
    frames: this.anims.generateFrameNumbers("mineani", {
      start: 0,
      end: 7,
    }),
    frameRate: 8,
    repeat: -1,
  });
  // ##보스 생성, 나중에 타이머 조건 넣고 업데이트에 넣기 ##

  //navi start
  //navi end

  //exp bar start
  expBar = this.add.graphics().setScrollFactor(0);
  expBarBG = this.add.graphics().setScrollFactor(0);
  expBar.setDepth(4);
  expBarBG.setDepth(3);

  this.cameras.main.ignore([expBar, expBarBG]);

  //exp bar end
  // hp bar start
  hpBar = this.add.graphics();
  hpBarBG = this.add.graphics();
  hpBar.setDepth(5);
  hpBarBG.setDepth(4);
  // hp bar end

  this.cameras.main.setZoom(0.8);
  UICam.setZoom(1);

  // 난이도
  if (global.ChoiceLevel === 1) {
    difficulty_hp = 10;
    difficulty_spawn = 10;
    difficulty_vel = 10;
  }

  if (global.ChoiceLevel === 2) {
    difficulty_hp = 20;
    difficulty_spawn = 20;
    difficulty_vel = 20;
  }

  // this.physics.add.collider(bossSet, wallLayer);
  // this.physics.add.collider(monsterSet, wallLayer);
  //   this.physics.add.collider(monsterSet, treesLayer);
  //   this.physics.add.collider(bossSet, treesLayer);

  if (cheatMode) {
    player.maxExp = 100000;
    for (let i = 0; i < 5; i++) {
      fairySet[i].cheat();
    }
  }
}

function update(time, delta) {
  petscircle.x = player.x;
  petscircle.y = player.y;
  Phaser.Actions.SetXY(petscircle, player.x, player.y);
  Phaser.Actions.PlaceOnCircle(pets.getChildren(), petscircle);
  Phaser.Actions.RotateAroundDistance(
    pets.getChildren(),
    petscircle,
    startAngle.getValue(),
    endAngle.getValue()
  );

  for (let i = 0; i < 5; i++) {
    if (fairySet[i].timer < fairySet[i].skillCD) {
      fairySet[i].timer++;
      if (fairySet[i].skillUse === true) {
        useSkill(i);
      }
    } else {
      if (fairySet[i].skillUse === true) {
        fairySet[i].skillUse = false;
        canSkill(i);
      }
    }
  }

  if (
    cursors.skill.isDown &&
    fairySet[nowFairy].isSkill &&
    !fairySet[nowFairy].skillUse
  ) {
    fairySet[nowFairy].skillFire();
    // fairySet[nowFairy].skillUse = true;
  }

  frameTime += delta;
  //  Health bar start
  hpBar.clear();
  hpBarBG.clear();
  hpBarBG.fillStyle(0xff0000);
  hpBarBG.fillRect(0, 0, 60, 10);

  hpBar.fillStyle(0x2ff40a);
  hpBar.fillRect(0, 0, 60 * (player.health / player.maxHealth), 10);
  // Health bar end
  player.move(hpBar, hpBarBG);

  if (frameTime > 16.5) {
    frameTime = 0;

    //map start
    this.cameras.main.startFollow(player, false);
    UICam.startFollow(player, false);
    //map end

    //player start
    changeSlot();
    normalAttackAS = fairySet[nowFairy].as;
    if (normalAttackTimer > normalAttackAS) {
      control = false;
    } else {
      normalAttackTimer++;
    }
    //mouse clicked
    if (
      mouse.leftButtonDown() &&
      !control &&
      fairySet[nowFairy].bombCount > 0
    ) {
      magic = new Magic(this, fairySet[nowFairy]);
      magic.setDepth(2);
      this.physics.add.overlap(
        magic,
        monsterSet,
        fairySet[nowFairy].attack,
        null,
        this
      );
      fairySet[nowFairy].normalAttack(magic);
    }

    for (let i = 0; i < 5; i++) {
      if (fairySet[i].timer < fairySet[i].skillCD) {
        fairySet[i].timer++;
      } else {
        fairySet[i].skillUse = false;
      }
    }

    if (cursors.skill.isDown && !fairySet[nowFairy].skillUse) {
      fairySet[nowFairy].skillFire();
    }

    player.healCount++;
    if (player.healCount > player.maxHealCount) {
      player.healCount = 0;
      player.health += player.heal;
      if (player.health > player.maxHealth) {
        player.health = player.maxHealth;
      }
    }

    if (player.invincible) {
      hitTimer++;
      if (hitTimer >= 15) {
        hitTimer = 0;

        if (hitVisible) {
          hitVisible = false;
        } else {
          hitVisible = true;
        }

        player.setVisible(hitVisible);
      }
    }

    //player end

    //enemy start

    // 몬스터가 유저 따라가게함
    if (monsterCount !== 0) {
      for (let i = 0; i < monsterSet.children.entries.length; i++) {
        if (monsterSet.children.entries[i].invincible) {
          monsterSet.children.entries[i].setTint(0xff0000);
        }
        this.physics.moveToObject(
          monsterSet.children.entries[i],
          player,
          monsterSet.children.entries[i].velocity
        );
      }
    }

    gameTimer++;
    UpdateTimer();

    // 플레이어 기준랜덤 위치에 몬스터 생성
    // 생성규칙: 몬스터이름, 애니메이션, 체력, 속도, x,y,타입,딜레이
    // monsterSpawn 초기값은 300
    if (gameTimer > 300 && gameTimer % monsterSpawn === 0) {
      // 1번 zombie
      enemySpawn(randomLocation);
      if (10800 < gameTimer && gameTimer <= 18000) {
        addMonster(this, "alien", "alienPlus", 60, 65, monX, monY);
      } else if (18000 < gameTimer) {
        addMonster(this, "alien", "alienFinal", 100, 75, monX, monY);
      } else {
        addMonster(this, "alien", "alien", 30, 50, monX, monY);
      }
    }
    if (gameTimer > 1200 && gameTimer % 120 === 0) {
      // 2번 worm
      enemySpawn(randomLocation);
      if (12000 < gameTimer && gameTimer <= 25200) {
        addMonster(this, "wormPlus", "wormPlus", 30, 50, monX, monY);
      } else if (25200 < gameTimer) {
        addMonster(this, "wormFinal", "wormFinal", 80, 60, monX, monY);
      } else if (gameTimer <= 12000) {
        addMonster(this, "worm", "worm", 10, 40, monX, monY);
      }
    }
    if (cheatMode && gameTimer > 0) {
      // 2번 worm
      enemySpawn(randomLocation);
      if (12000 < gameTimer && gameTimer <= 25200) {
        addMonster(this, "wormPlus", "wormPlus", 30, 50, monX, monY);
      } else if (25200 < gameTimer) {
        addMonster(this, "wormFinal", "wormFinal", 80, 60, monX, monY);
      } else if (gameTimer <= 12000) {
        addMonster(this, "worm", "worm", 10, 40, monX, monY);
      }
    }
    if (gameTimer > 12000 && gameTimer % 300 === 0) {
      enemySpawn(randomLocation);
      addMonster(this, "sonic", "sonic", 100, 85, monX, monY);
    }
    if (gameTimer > 23000 && gameTimer % 600 === 0) {
      enemySpawn(randomLocation);
      addMonster(this, "turtle", "turtle", 200, 50, monX, monY);
    }

    if (gameTimer > 19000 && gameTimer % 600 === 0) {
      enemySpawn(randomLocation);
      addMonster(this, "slime", "slime", 150, 75, monX, monY);
    }
    // 몬스터 빅 웨이브
    if (gameTimer === 7700) {
      messageBoss("빅 웨이브");
    }
    if (gameTimer === 19700) {
      messageBoss("빅 웨이브");
    }

    if (gameTimer > 8000 && gameTimer < 8300 && gameTimer % 3 === 0) {
      enemySpawn(randomLocation);
      addMonster(this, "fly", "fly", 10, 50, monX, monY);
    } else if (20000 < gameTimer && gameTimer < 21000 && gameTimer % 3 === 0) {
      enemySpawn(randomLocation);
      addMonster(this, "fly", "fly", 50, 50, monX, monY);
    }

    // 스폰 주기
    if (gameTimer < 4200) {
      monsterSpawn = 90;
    } else if (4200 <= gameTimer && gameTimer < 11000) {
      monsterSpawn = 60;
    } else if (11000 <= gameTimer && gameTimer < 23000) {
      monsterSpawn = 30;
    } else if (23000 <= gameTimer) {
      monsterSpawn = 15;
    }

    // 보스
    let slimeSpawnTime = 10800;
    let golemSpawnTime = 21000;
    let fireGiantSpawnTime = 28000;

    // 슬라임
    if (gameTimer === slimeSpawnTime - 600) {
      messageBoss("슬라임 킹");
    }

    if (gameTimer === slimeSpawnTime) {
      if (ChoiceCat === 5) {
        let rand = Math.floor(Math.random() * 20);
        setSound.playSE(rand);
      } else {
        setSound.playSE(13);
      }
      slimeKing = new Boss(
        this,
        300,
        70,
        player.x + 500,
        player.y + 500,
        "slimeKing",
        "slimeKing",
        3,
        1,
        "boss"
      );
      slimeKing.setDepth(2);
      slimeKing.anime(player);
      bossActive = true;
      let mw = slimeKing.body.halfWidth;
      let mh = slimeKing.body.halfHeight;

      slimeKing.setCircle(mh / 2, mw - mh / 2, mw);
      bossSet.add(slimeKing);
    }

    // 골렘
    if (gameTimer === golemSpawnTime - 600) {
      messageBoss("골렘");
    }
    if (gameTimer === golemSpawnTime) {
      if (ChoiceCat === 5) {
        let rand = Math.floor(Math.random() * 20);
        setSound.playSE(rand);
      } else {
        setSound.playSE(14);
      }
      golem = new Boss(
        this,
        500,
        30,
        player.x + 1500,
        player.y + 1500,
        "golem",
        "golem",
        3,
        10,
        "boss"
      );
      golem.setDepth(2);
      golem.anime(player);
      bossActive = true;
      bossGolemActive = true;
      let mw = golem.body.halfWidth;
      let mh = golem.body.halfHeight;
      golem.setCircle(mh / 2, mw - mh / 2, mw);
      bossSet.add(golem);
    }

    // 불거인
    if (gameTimer === fireGiantSpawnTime - 600) {
      messageBoss("불거인");
    }
    if (gameTimer === fireGiantSpawnTime) {
      if (ChoiceCat === 5) {
        let rand = Math.floor(Math.random() * 20);
        setSound.playSE(rand);
      } else {
        setSound.playSE(15);
      }
      fireGiant = new Boss(
        this,
        500,
        10,
        player.x - 600,
        player.y - 600,
        "fireGiant",
        "fireGiant",
        3,
        10,
        "boss"
      );
      let mw = fireGiant.body.halfWidth;
      let mh = fireGiant.body.halfHeight;
      fireGiant.setCircle(mh / 2, mw - mh / 2, mw);
      fireGiant.setDepth(6);
      fireGiant.anime(player);
      bossActive = true;
      bossFireGiantActive = true;
      bossSet.add(fireGiant);
      fireGiantIndex = bossSet.children.entries.length - 1;
    }

    if (gameTimer === fireGiantSpawnTime) {
      fireGiantAura = new Boss(
        this,
        10000,
        1000,
        player.x - 600,
        player.y - 600,
        "fireGiantAura",
        "fireGiantAura",
        1,
        10,
        "boss"
      );
      let mw = fireGiantAura.body.halfWidth;
      let mh = fireGiantAura.body.halfHeight;
      fireGiantAura.setCircle(mh / 2, mw - mh / 2, mw);
      fireGiantAura.setDepth(5);
      fireGiantAura.anime();
      bossMagicSet.add(fireGiantAura);
    }

    if (bossFireGiantActive && gameTimer % 120 === 0) {
      let x = bossSet.children.entries[fireGiantIndex].x;
      let y = bossSet.children.entries[fireGiantIndex].y;

      let aura = new Boss(
        this,
        10000,
        100,
        x,
        y,
        "fireGiantAura",
        "fireGiantAura",
        (gameTimer - fireGiantSpawnTime) / 120 + 1,
        10,
        "boss"
      );
      bossMagicSet.children.entries[0].destroy();
      let mw = aura.body.halfWidth;
      let mh = aura.body.halfHeight;
      aura.setCircle(mh / 2, mw - mh / 2, mw - mh / 2);
      aura.setDepth(5);
      aura.anime();
      bossMagicSet.add(aura);
    }

    // 보스 이동 및 사망 체크
    if (bossActive) {
      for (let i = 0; i < bossSet.children.entries.length; i++) {
        if (bossSet.children.entries[i].invincible) {
          bossSet.children.entries[i].setTint(0xff0000);
        }
        this.physics.moveToObject(
          bossSet.children.entries[i],
          player,
          bossSet.children.entries[i].velocity
        );

        if (bossSet.children.entries[i].monSpecie === "golem") {
          if (bossGolemActive && gameTimer % 240 === 0) {
            addMonster(
              this,
              "wormPlus",
              "wormPlus",
              100,
              50,
              bossSet.children.entries[i].x,
              bossSet.children.entries[i].y + 150
            );
          }
        }

        if (bossSet.children.entries[i].monSpecie === "fireGiant") {
          if (bossFireGiantActive) {
            this.physics.moveToObject(
              bossMagicSet.children.entries[0],
              bossSet.children.entries[i],
              bossMagicSet.children.entries[0].velocity
            );
          }
        }
        if (bossSet.children.entries[i].health <= 0) {
          for (let i = 0; i < 5; i++) {
            player.expUp(1);
          }
          if (bossSet.children.entries[i].monSpecie !== "slimeKing") {
            global.coin += 10;
          } else global.coin += 2;
          if (bossSet.children.entries[i].monSpecie === "slimeKing") {
            slimePattern(
              this,
              bossSet.children.entries[i].pt,
              bossSet.children.entries[i].x,
              bossSet.children.entries[i].y
            );
          }

          if (bossSet.children.entries[i].monSpecie === "golem") {
            bossGolemActive = false;
          }

          if (bossSet.children.entries[i].monSpecie === "fireGiant") {
            bossMagicSet.children.entries[0].destroy();
            bossFireGiantActive = false;
          }

          bossSet.children.entries[i].destroy();
          if (bossSet.children.entries.length === 0) {
            bossActive = false;
          }
        }
      }
    }

    // 피버 타임
    if (
      killCount != 0 &&
      killCount % (80 + fever_late) === 0 &&
      feverLock == false
    ) {
      feverTime = 600;
      feverLock = true;
    }

    if (feverTime != 0) {
      enemySpawn(randomLocation);
      addMonster(this, "wormFever", "wormFever", 10, 40, monX, monY);
      feverTime--;
      fever_late += 20;
    } else if (feverTime <= 0) {
      feverLock = false;
    }

    //enemy end

    //tower start

    //tower end

    //exp bar start
    expBar.clear();

    //  BG
    expBarBG.fillStyle(0x000000);
    expBarBG.fillRect(0, 0, UICam.worldView.width, 16); // x y 가로길이, 세로길이

    expBar.fillStyle(0x1ca1db);
    expBar.fillRect(
      0,
      0,
      UICam.worldView.width * (player.exp / player.maxExp),
      16
    );
  } //exp bar end
  UICam.ignore([
    map,
    // treesLayer,
    // propsLayer,
    flowersLayer,
    grassLayer,
    runeLayer,
    fieldLayer,
    player,
    bossSet,
    fairySet,
    monsterSet,
    hpBar,
    hpBarBG,
    magics,
    mines,
    petNormal,
    petThunder,
    petFire,
    petWater,
    petEarth,
    petGod,
    petAttacks,
    petSkillAttacks,
    bossMagicSet,
  ]);

  if (gameTimer % 600 === 0) {
    for (let i = 0; i < mineCount; i++) {
      let x =
        Math.random() * (EndMineRangeX - StartMineRangeX) + StartMineRangeX;
      let y =
        Math.random() * (EndMineRangeY - StartMineRangeY) + StartMineRangeY;
      mine = new Mine(this, x, y, "minecoin", 0);
      mine.setDepth(1);
      mine.scale_Circle();
      mine.set_anime();
      mines.add(mine);
    }
  }
}

//player start
function changeSlot() {
  if (cursors.slot1.isDown && nowFairy !== 0) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 0;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
  }

  if (cursors.slot2.isDown && nowFairy !== 1) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 1;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
  }

  if (cursors.slot3.isDown && nowFairy !== 2) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 2;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
  }

  if (cursors.slot4.isDown && nowFairy !== 3) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 3;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
  }

  if (cursors.slot5.isDown && nowFairy !== 4) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 4;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
  }

  if (!fairySet[nowFairy].anims.isPlaying) {
    fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
  }
}

function attack(magic, monster) {
  if (!monster.invincible) {
    if (ChoiceCat === 5) {
      let rand = Math.floor(Math.random() * 20);
      setSound.playSE(rand);
    } else {
      setSound.playSE(12);
    }
    if (magic.pierceCount > 0) {
      magic.pierceCount--;
    } else {
      magic.destroy();
    }

    if (nowFairy === 3 && !magic.isSkill) {
      if (monsterSet.children.entries.length !== 0) {
        let monNum = Math.floor(
          Math.random() * monsterSet.children.entries.length
        );
        if (magic.bounceCount <= 0) {
          magic.destroy();
        } else {
          thisScene.physics.moveTo(
            magic,
            monsterSet.children.entries[monNum].x,
            monsterSet.children.entries[monNum].y,
            magic.fairy.velocity
          );
          magic.bounceCount--;
        }

        let copy = Math.floor(Math.random() * 100 + 1);

        if (magic.isFirst && copy <= fairySet[3].copyCount) {
          // magic.isFirst = false;
          let copyMagic = new Magic(thisScene, fairySet[nowFairy]);
          // copyMagic.isFirst = false;
          magics.add(copyMagic);
          copyMagic.setPosition(magic.x, magic.y);
          if (magic.fairy.evo2) {
            copyMagic.anims.play("magic" + magic.fairy.fairyNum + "_2", true);
          } else if (magic.fairy.evo1) {
            copyMagic.anims.play("magic" + magic.fairy.fairyNum + "_1", true);
          } else {
            copyMagic.anims.play("magic" + magic.fairy.fairyNum, true);
          }
          thisScene.physics.moveTo(
            copyMagic,
            -monsterSet.children.entries[monNum].x,
            -monsterSet.children.entries[monNum].y,
            copyMagic.fairy.velocity
          );
          copyMagic.bounceCount = magic.bounceCount;
        }
      }
    }

    if (magic.fairy.fairyNum === 3 && magic.fairy.evo2) {
      //  && fairySet[nowFairy].level === 9 (추후에 레벨업 생길 때 추가)
      let num = Math.floor(Math.random() * 100 + 1);
      if (num <= magic.fairy.deathCount && monster.type !== "boss") {
        if (monster.monSpecie !== "slime") {
          if (
            monster.monSpecie === "worm" ||
            monster.monSpecie === "wormPlus" ||
            monster.monSpecie === "wormFinal" ||
            monster.monSpecie === "wormFever"
          ) {
            monster.boomAnim();
          } else {
            monster.dieAnim();
            Count;
          }
          if (monster.monSpecie === "wormFever") {
            killCount--;
            player.expUP(0.1);
          } else {
            monster.destroy();
            if (gameTimer < 9000) {
              player.expUp(1);
              player.expUp(1);
            } else {
              player.expUp(1);
            }
          }
          monsterCount -= 1;
          killCount += 1;
        } else if (monster.monSpecie === "slime") {
          for (let i = 0; i < 2; i++) {
            addMonster(
              thisScene,
              "babySlime",
              "slime",
              50,
              100,
              monster.x + i * 10,
              monster.y
            );
          }
          monster.destroy();
          monsterCount -= 1;
          killCount += 1;
        }
      }
    }
    if (magic.fairy.stun > 0) {
      monster.cc = "earth";
    }

    monster.invincible = true;
    monster.unInvincible();
    monster.health -= magic.fairy.dmg * player.dmgMul;

    if (monster.health <= 0 && monster.type !== "boss") {
      if (monster.monSpecie !== "slime") {
        if (
          monster.monSpecie === "worm" ||
          monster.monSpecie === "wormPlus" ||
          monster.monSpecie === "wormFinal" ||
          monster.monSpecie === "wormFever"
        ) {
          monster.boomAnim();
        } else {
          monster.dieAnim();
        }
        if (monster.monSpecie === "wormFever") {
          killCount -= 1;
          player.expUp(0.1);
        } else {
          if (gameTimer < 9000) {
            player.expUp(1);
            player.expUp(1);
          } else {
            player.expUp(1);
          }
        }
        monster.destroy();
        if (magic.fairy.fairyNum === 2) {
          let vampireNum = Math.floor(Math.random() * 100 + 1);
          if (vampireNum < 5) {
            player.health += magic.fairy.vampire;
            if (player.health > player.maxHealth) {
              player.health = player.maxHealth;
            }
          }
        }
        monsterCount -= 1;
        killCount += 1;
      } else if (monster.monSpecie === "slime") {
        for (let i = 0; i < 2; i++) {
          addMonster(
            thisScene,
            "babySlime",
            "slime",
            50 + difficulty_hp,
            100,
            monster.x + i * 20,
            monster.y
          );
        }
        monster.destroy();
        monsterCount -= 1;
        killCount += 1;
      }
    }
  }
}

function addMonster(scene, mon_name, monAnime, hp, velo, x, y) {
  monster = new Enemy(scene, hp, velo, x, y, mon_name, monAnime).setInteractive(
    { cursor: "url(images/cursor/aimHover.png), pointer" }
  );
  if (monster.monSpecie === "babySlime") {
    monster.scale = 2;
  } else if (
    monster.monSpecie === "alien" ||
    monster.monSpecie === "alienPlus" ||
    monster.monSpecie === "alienFinal" ||
    monster.monSpecie === "fly"
  ) {
    monster.scale = 2.5;
  } else if (
    monster.monSpecie === "turtle" ||
    monster.monSpecie === "sonic" ||
    monster.monSpecie === "slime"
  ) {
    monster.scale = 3;
  }
  monster.setDepth(2);
  monsterCount += 1;
  let mw = monster.body.halfWidth;
  let mh = monster.body.halfHeight;

  monster.setCircle(mh / 2, mw - mh / 2, mw);
  monsterSet.add(monster);
  scene.physics.add.collider(monsterSet, monster);
  monster.anime(player);
}

function enemySpawn(scene) {
  randomLocation = Math.floor(Math.random() * 4) + 1;
  if (randomLocation === 1) {
    monX = Phaser.Math.Between(player.x - 500, player.x + 500);
    monY = Phaser.Math.Between(player.y + 500, player.y + 510);
  } else if (randomLocation === 2) {
    monX = Phaser.Math.Between(player.x - 500, player.x + 500);
    monY = Phaser.Math.Between(player.y - 500, player.y - 510);
  } else if (randomLocation === 3) {
    monX = Phaser.Math.Between(player.x - 500, player.x - 500);
    monY = Phaser.Math.Between(player.y - 500, player.y + 500);
  } else if (randomLocation === 4) {
    monX = Phaser.Math.Between(player.x + 500, player.x + 500);
    monY = Phaser.Math.Between(player.y - 500, player.y + 500);
  }
}

function bomb(bomb, target) {
  if (!target.invincible && target.monSpecie != "golem") {
    target.invincible = true;
    target.health -= bomb.dmg;
    target.unInvincible();
    if (target.health <= 0 && target.type !== "boss") {
      if (target.monSpecie !== "slime") {
        if (
          target.monSpecie === "worm" ||
          target.monSpecie === "wormPlus" ||
          target.monSpecie === "wormFinal" ||
          target.monSpecie === "wormFever"
        ) {
          target.boomAnim();
        } else {
          target.dieAnim();
        }
        if (target.monSpecie === "wormFever") {
          killCount--;
          player.expUp(0.1);
        } else {
          if (gameTimer < 9000) {
            player.expUp(2);
          } else {
            player.expUp(1);
          }
        }
        target.destroy();
        monsterCount -= 1;
        killCount += 1;
      } else if (target.monSpecie === "slime") {
        for (let i = 0; i < 2; i++) {
          addMonster(
            thisScene,
            "babySlime",
            "slime",
            50 + difficulty_hp,
            100,
            target.x + i * 20,
            target.y
          );
        }
        target.destroy();
        monsterCount -= 1;
        killCount += 1;
      }
    }
  }
}

function slimePattern(scene, pt, x, y) {
  if (pt !== 16) {
    pt *= 2;
    for (let i = 0; i < 2; i++) {
      // 분열될 때마다 체력 감소 구현하기
      if (pt < 4) {
        slimeKing = new Boss(
          scene,
          200 + difficulty_hp,
          100,
          x + i * 100,
          y,
          "slimeKing",
          "slimeKing",
          2.5,
          pt,
          "boss"
        );
      } else if (pt < 8) {
        slimeKing = new Boss(
          scene,
          100 + difficulty_hp,
          100,
          x + i * 50,
          y,
          "slimeKing",
          "slimeKing",
          1.25,
          pt,
          "boss"
        );
      } else {
        slimeKing = new Boss(
          scene,
          50 + difficulty_hp,
          100,
          x + i * 25,
          y,
          "slimeKing_end",
          "slimeKing",
          0.5,
          pt,
          "boss"
        );
      }
      slimeKing.anime(player);
      scene.physics.add.collider(bossSet, slimeKing);
      let mw = slimeKing.body.halfWidth;
      let mh = slimeKing.body.halfHeight;
      slimeKing.setCircle(mh / 2, mw - mh / 2, mw);
      bossSet.add(slimeKing);
    }
  }
}

//enemy end

//map start
function petAttackFunc(magic, monster) {
  if (!monster.invincible) {
    monster.invincible = true;
    monster.unInvincible();
    monster.health -= magic.dmg;
    magic.destroy();
    if (monster.health <= 0 && monster.type !== "boss") {
      if (monster.monSpecie !== "slime") {
        if (
          monster.monSpecie === "worm" ||
          monster.monSpecie === "wormPlus" ||
          monster.monSpecie === "wormFinal" ||
          monster.monSpecie === "wormFever"
        ) {
          monster.boomAnim();
        } else {
          monster.dieAnim();
        }
        if (monster.monSpecie === "wormFever") {
          killCount--;
          player.expUp(0.1);
        } else {
          if (gameTimer < 9000) {
            player.expUp(1);
            player.expUp(1);
          } else {
            player.expUp(1);
          }
        }
        monster.destroy();

        if (gameTimer < 9000) {
          player.expUp(2);
        } else {
          player.expUp(1);
        }

        monsterCount -= 1;
        killCount += 1;
      } else if (monster.monSpecie === "slime") {
        for (let i = 0; i < 2; i++) {
          addMonster(
            thisScene,
            "babySlime",
            "slime",
            50 + difficulty_hp,
            100,
            monster.x + i * 20,
            monster.y
          );
        }
        monster.destroy();
        monsterCount -= 1;
        killCount += 1;
      }
    }
  }
}

export function petSkillAttackFunc(skill, monster) {
  if (!monster.invincible) {
    monster.invincible = true;
    monster.unInvincible();
    monster.health -= skill.dmg;
    // skill.destroy();
    if (monster.health <= 0 && monster.type !== "boss") {
      if (monster.monSpecie !== "slime") {
        if (
          monster.monSpecie === "worm" ||
          monster.monSpecie === "wormPlus" ||
          monster.monSpecie === "wormFinal"
        ) {
          monster.boomAnim();
        } else {
          monster.dieAnim();
        }
        monster.destroy();
        if (gameTimer < 9000) {
          player.expUp(2);
        } else {
          player.expUp(1);
        }
        monsterCount -= 1;
      } else if (monster.monSpecie === "slime") {
        for (let i = 0; i < 2; i++) {
          addMonster(
            thisScene,
            "babySlime",
            "slime",
            50 + difficulty_hp,
            100,
            monster.x + i * 20,
            monster.y
          );
        }
        monster.destroy();
        monsterCount -= 1;
      }
    }
  }
}

//map end
