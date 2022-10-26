import Fairy from "./GameObj/fairy.js";
import Magic from "./GameObj/magic.js";
import Player from "./GameObj/player.js";
import Enemy from "./GameObj/enemy.js";
import inGameUI, { updateExp } from "../UI/inGameUI.js";
import levelup from "../UI/levelup.js";
import initUpgrade, { closeUpgrade } from "../UI/upgrade.js";

import { Chunk, Tile } from "./Entities.js";

export const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  parent: "game-container",
  backgroundColor: "black",
  pixelArt: true,
  roundPixels: true,
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
      debug: true,
      fixedStep: false,
    },
  },
};

//player start
// 고양이 json
let cats;
// 플레이어 객체
let player;
// 캐릭터 선택 시 변경될 변수
let catNumber = 0;
// 요정
var nowFairy = 0;
var fairySet = [, , , , ,];
var fairy;
global.thisScene = "";
// 공격 및 공격 딜레이 관련
global.control = false;
global.normalAttackTimer = 0;
var normalAttackAS = 20;
var magic;
global.magics = "";
export var cursors;
var gameOver = false;
var scoreText;
// 마우스 포인터 관련
export var input;
var mouse;
//player end

//gametimer
var gameTimer = 0;

//map start
var map;
var chunks = [];
export var mapSize = 16000;
export var camera;
let controls;
//map end

//enemy start

// 몬스터 변수 선언
export var alienSet;
var alien;
var target;
var cursors;
var mon1Delay = 0;
var mon1X;
var mon1Y;
global.alienCount = 0;
var randomLocation;
var invincible = false;
var timer;

// 몬스터 이미지

//enemy end

function preload() {
  //map start
  this.load.image("sprWater", "images/map/sprWater.png");
  this.load.image("sprSand", "images/map/sprSand.png");
  this.load.image("sprGrass", "images/map/sprGrass.png");
  //map end

  //player start
  // 플레이어 스프라이트
  this.load.spritesheet("cat1", "images/cat/cat1.png", {
    frameWidth: 96,
    frameHeight: 100,
  });

  // 공격 스프라이트
  this.load.spritesheet(
    "magic1",
    "images/attack/weapon/16_sunburn_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );
  this.load.spritesheet(
    "magic2",
    "images/attack/weapon/7_firespin_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
    }
  );
  this.load.spritesheet(
    "magic3",
    "images/attack/weapon/18_midnight_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );
  this.load.spritesheet(
    "magic4",
    "images/attack/weapon/2_magic8_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );
  this.load.spritesheet(
    "magic5",
    "images/attack/weapon/8_protectioncircle_spritesheet.png",
    { frameWidth: 100, frameHeight: 100, endFrame: 61 }
  );
  this.load.spritesheet(
    "magic5_1",
    "images/attack/weapon/13_vortex_spritesheet.png",
    { frameWidth: 100, frameHeight: 100, endFrame: 61 }
  );

  // 스킬 스프라이트
  this.load.spritesheet(
    "skill1",
    "images/attack/weapon/17_felspell_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );
  this.load.spritesheet(
    "skill2",
    "images/attack/weapon/15_loading_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );
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
  this.load.spritesheet("fairy2", "images/fairy/fairy2.png", {
    frameWidth: 230,
    frameHeight: 210,
  });
  this.load.spritesheet("fairy3", "images/fairy/fairy3.png", {
    frameWidth: 134,
    frameHeight: 158,
  });
  this.load.spritesheet("fairy4", "images/fairy/fairy4.png", {
    frameWidth: 136,
    frameHeight: 170,
  });
  this.load.spritesheet("fairy5", "images/fairy/fairy5.png", {
    frameWidth: 160,
    frameHeight: 190,
  });
  //player end

  //enemy start
  this.load.spritesheet(
    "alien",
    "http://labs.phaser.io/assets/tests/invaders/invader1.png",
    { frameWidth: 32, frameHeight: 32 }
  );
  //enemy end
}

function create() {
  inGameUI();
  thisScene = this;
  //map start
  this.chunkSize = 8;
  this.tileSize = 1024;
  this.cameraSpeed = 10;

  this.cameras.main.setZoom(1);
  this.followPoint = new Phaser.Math.Vector2(
    this.cameras.main.worldView.x + this.cameras.main.worldView.width * 0.5,
    this.cameras.main.worldView.y + this.cameras.main.worldView.height * 0.5
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
  // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);
  global.$this = this.scene;
  this.input.keyboard.on("keydown-" + "SHIFT", function (event) {
    initUpgrade();
  });
  //map end

  //player start
  cats = require("./jsons/cats.json");
  fairySet = require("./jsons/fairys.json");
  console.log(cats);
  player = cats[catNumber];
  player = new Player(this, 1, 100, 100);
  player.setDepth(1);
  console.log(player);
  console.log(player);
  camera = this.cameras.main;
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
  fairySet[0] = new Fairy(this, 100, 4, 1, 1, 60, 10, 500, 1, player);
  fairySet[0].initFairy1(2, 2);
  fairySet[1] = new Fairy(this, 100, 10, 1, 1, 70, 10, 160, 2, player);
  fairySet[2] = new Fairy(this, 100, 0, 1, 3, 80, 10, 300, 3, player);
  fairySet[3] = new Fairy(this, 100, 10, 1, 4, 90, 10, 400, 4, player);
  fairySet[3].initFairy3(0, 0);
  fairySet[4] = new Fairy(this, 100, 10, 1, 5, 100, 10, 500, 5, player);
  for (let i = 0; i < 5; i++) {
    fairySet[i].setDepth(1);
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
    key: "fairy3_idle",
    frames: this.anims.generateFrameNumbers("fairy3", { start: 11, end: 19 }),
    frameRate: 8,
    repeat: -1,
  });

  this.anims.create({
    key: "fairy3_attack",
    frames: this.anims.generateFrameNumbers("fairy3", { start: 0, end: 9 }),
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
    key: "turn",
    frames: this.anims.generateFrameNumbers("cat1", { start: 0, end: 0 }),
    frameRate: 10,
  });
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("cat1", { start: 1, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("cat1", { start: 1, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  // 공격 애니메이션
  this.anims.create({
    key: "magic1",
    frames: this.anims.generateFrameNumbers("magic1", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic2",
    frames: this.anims.generateFrameNumbers("magic2", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic3",
    frames: this.anims.generateFrameNumbers("magic3", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  this.anims.create({
    key: "magic4",
    frames: this.anims.generateFrameNumbers("magic4", {
      start: 0,
      end: 60,
      first: 0,
    }),
    frameRate: 200,
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
      end: 60,
      first: 0,
    }),
    frameRate: 200,
    repeat: -1,
  });
  fairySet[nowFairy].play("fairy" + (nowFairy + 1) + "_idle", true);

  //player end

  //map start

  //map end

  //enemy start

  alienSet = this.physics.add.group();
  magics = this.physics.add.group();
  // 만약 유저와 몬스터가 닿았다면 (hitplayer 함수 실행)
  this.physics.add.collider(player, alienSet, player.hitPlayer);
  thisScene.physics.add.overlap(magics, alienSet, attack);
  //map start
  if (
    this.cameras.main.worldView.x > -1000 &&
    this.cameras.main.worldView.x < 1000 &&
    this.cameras.main.worldView.y > -1000 &&
    this.cameras.main.worldView.y < 1000
  ) {
    var snappedChunkX =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
    var snappedChunkY =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

    for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        var existingChunk = getChunk(x, y);

        if (existingChunk == null) {
          var newChunk = new Chunk(this, x, y);
          chunks.push(newChunk);
        }
      }
    }
    for (var i = 0; i < chunks.length; i++) {
      var chunk = chunks[i];

      if (
        Phaser.Math.Distance.Between(
          snappedChunkX,
          snappedChunkY,
          chunk.x,
          chunk.y
        ) < 3
      ) {
        if (chunk !== null) {
          chunk.load();
        }
      } else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }
  }

  if (cursors.up.isDown && this.cameras.main.worldView.y > -1000) {
    this.followPoint.y -= this.cameraSpeed;
  }
  if (cursors.down.isDown && this.cameras.main.worldView.y < 1000) {
    this.followPoint.y += this.cameraSpeed;
  }
  if (cursors.left.isDown && this.cameras.main.worldView.x > -1000) {
    this.followPoint.x -= this.cameraSpeed;
  }
  if (cursors.right.isDown && this.cameras.main.worldView.x < 1000) {
    this.followPoint.x += this.cameraSpeed;
  }

  this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
  //map enderlap(magics, alienSet, attack);
  this.anims.create({
    key: "swarm",
    frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 1 }),
    frameRate: 2,
    repeat: -1,
  });

  // 공격 맞은 후 일시 무적에 사용
  timer = this.time.addEvent({
    delay: 2000,
    callback: () => {
      player.invincible = false;
    },
    loop: true,
  });

  //enemy end
}

function update(time, delta) {

  //map start
  if (
    this.cameras.main.worldView.x > -1000 &&
    this.cameras.main.worldView.x < 1000 &&
    this.cameras.main.worldView.y > -1000 &&
    this.cameras.main.worldView.y < 1000
  ) {
    var snappedChunkX =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
    var snappedChunkY =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

    for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        var existingChunk = getChunk(x, y);

        if (existingChunk == null) {
          var newChunk = new Chunk(this, x, y);
          chunks.push(newChunk);
        }
      }
    }
    for (var i = 0; i < chunks.length; i++) {
      var chunk = chunks[i];

      if (
        Phaser.Math.Distance.Between(
          snappedChunkX,
          snappedChunkY,
          chunk.x,
          chunk.y
        ) < 3
      ) {
        if (chunk !== null) {
          chunk.load();
        }
      } else {
        if (chunk !== null) {
          chunk.unload();
        }
      }
    }
  }

  if (cursors.up.isDown && this.cameras.main.worldView.y > -1000) {
    this.followPoint.y -= this.cameraSpeed;
  }
  if (cursors.down.isDown && this.cameras.main.worldView.y < 1000) {
    this.followPoint.y += this.cameraSpeed;
  }
  if (cursors.left.isDown && this.cameras.main.worldView.x > -1000) {
    this.followPoint.x -= this.cameraSpeed;
  }
  if (cursors.right.isDown && this.cameras.main.worldView.x < 1000) {
    this.followPoint.x += this.cameraSpeed;
  }

  this.cameras.main.startFollow(player, false);
  //map end

  //player start
  changeSlot();

  if (normalAttackTimer > normalAttackAS) {
    control = false;
  } else {
    normalAttackTimer++;
  }
  //mouse clicked
  if (mouse.leftButtonDown() && !control) {
    magic = new Magic(this, fairySet[nowFairy]);
    this.physics.add.overlap(
      magic,
      alienSet,
      fairySet[nowFairy].attack,
      null,
      this
    );
    fairySet[nowFairy].normalAttack(magic);
  }

  for (let i = 0; i < 5; i++){
    if (fairySet[i].timer < fairySet[i].skillCD) {
      fairySet[i].timer++;
    } else {
      fairySet[i].skillUse = false;
    }
  }

  if (cursors.skill.isDown && !fairySet[nowFairy].skillUse) {
    console.log(fairySet[nowFairy].timer);
    console.log(fairySet[nowFairy].skillCD);
    fairySet[nowFairy].skillFire();
  }

  player.move();
  //player end

  //enemy start

  if (alienCount !== 0) {
    for (let i = 0; i < alienSet.children.entries.length; i++) {
      // console.log(this.physics.moveToObject(monsters[i], player, 100))
      // if ()
      this.physics.moveToObject(
        alienSet.children.entries[i],
        player,
        alienSet.children.entries[i].velo
      );
    }
  }

  mon1Delay++;


// 랜덤 위치에 몬스터 생성 (추후 player.x 및 y 좌표 기준 생성으로 변경)
  if (mon1Delay > 60) {
    gameTimer++;
    console.log(gameTimer);
    randomLocation = Math.floor(Math.random() * 4) + 1
    if (randomLocation === 1) {
      mon1X = Phaser.Math.Between(player.x - 2000, player.x + 2000);
      mon1Y = Phaser.Math.Between(player.y + 2000, player.y + 2010);
    }

    if (randomLocation === 2) {
      mon1X = Phaser.Math.Between(player.x - 2000, player.x + 2000);
      mon1Y = Phaser.Math.Between(player.y - 2000, player.y - 2010);
    }

    if (randomLocation === 3) {
      mon1X = Phaser.Math.Between(player.x - 2000, player.x - 2000);
      mon1Y = Phaser.Math.Between(player.y - 2000, player.y + 2000);
    }

    if (randomLocation === 4) {
      mon1X = Phaser.Math.Between(player.x + 2000, player.x + 2000);
      mon1Y = Phaser.Math.Between(player.y - 2000, player.y + 2000);
    }

    alien = new Enemy(this, 10, 100, mon1X, mon1Y, "alien", "swarm");
    alienCount += 1;
    mon1Delay = 0;
    alienSet.add(alien);
    this.physics.add.collider(alienSet, alien);
    alien.anime(alien);
  }

  //enemy end
}

//player start
function changeSlot() {
  if (
    cursors.slot1.isDown &&
    nowFairy !== 0 &&
    /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
  ) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 0;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
  }

  if (
    cursors.slot2.isDown &&
    nowFairy !== 1 &&
    /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
  ) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 1;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
  }

  if (
    cursors.slot3.isDown &&
    nowFairy !== 2 &&
    /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
  ) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 2;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
  }

  if (
    cursors.slot4.isDown &&
    nowFairy !== 3 &&
    /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
  ) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 3;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
  }

  if (
    cursors.slot5.isDown &&
    nowFairy !== 4 &&
    /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
  ) {
    fairySet[nowFairy].x = -10000;
    fairySet[nowFairy].y = -10000;
    nowFairy = 4;
    player.changeFairy(fairySet[nowFairy]);
    normalAttackAS = fairySet[nowFairy].as;
    fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
  }

  if (!fairySet[nowFairy].anims.isPlaying) {
    fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_idle", true);
  }
}

function attack(magic, alien) {
  if (!alien.invincible) {
    if (magic.pierceCount > 0) {
      magic.pierceCount--;
    } else {
      magic.destroy();
    }

    if (nowFairy === 2) {
      //  && fairySet[nowFairy].level === 9 (추후에 레벨업 생길 때 추가)
      let num = Math.floor((Math.random() * 100) + 1);
      if (num <= fairySet[nowFairy].deathCount) {
        alien.destroy();
        alienCount -= 1;
      }
    }

    alien.health -= fairySet[nowFairy].dmg;
    alien.invincible = true;
    if (alien.health <= 0) {
      alien.destroy();
      alienCount -= 1;
    }
  }
}
//enemy end

//map start
function getChunk(x, y) {
  var chunk = null;
  for (var i = 0; i < chunks.length; i++) {
    if (chunks[i].x == x && chunks[i].y == y) {
      chunk = chunks[i];
    }
  }
  return chunk;
}
//map end
