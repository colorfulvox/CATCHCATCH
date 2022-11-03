import Player from "./CodeObj/player.js";
import { Chunk, Tile } from "./entities.js";
import { sockConnect } from "./CodeObj/Execlient.js";
import IncodeUI from "../UI/incode-ui.js";
export const codeConfig = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  parent: "game-container",
  backgroundColor: "black",
  resolution: window.devicePixelRatio,
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
      fps: 20,
      debug: false,
      fixedStep: false,
    },
  },
};

let socket;

let IsStarted = false;
let PinNumber;

let IsRunning = false;

// 우리가 전달할 정보 --------------------------
let monsterpos = [
  [1, 2],
  [0, 2],
  [4, 5],
  [6, 2],
  [1, 2],
];
// ----------------------------------------

let cats;
var player = "";
global.thisScene = "";
var gameOver = false;
var scoreText;
global.gameTimer = 0;

var map;
var chunks = [];
export var camera;
let frameTime = 0;
let timer = 0;
// 몬스터 변수 선언
export var monsterSet;
var monster;

function preload() {
  //map start
  this.load.image("sprWater", "images/map/sprWater.png");
  this.load.image("sprSand", "images/map/sprSand.png");
  this.load.image("sprGrass", "images/map/sprGrass.png");
  //map end
  let frameTime = 0;

  //player start
  // 플레이어 스프라이트
  this.load.spritesheet("tower1", "images/cattower/normal_tower_38x64.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("tower2", "images/cattower/earth_tower_38x64.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("tower3", "images/cattower/fire_tower_38x64.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("tower4", "images/cattower/thunder_tower_38x64.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  this.load.spritesheet("tower5", "images/cattower/water_tower_38x64.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  // player end

  //attack sprite start
  this.load.spritesheet(
    "magic1",
    "images/attack/weapon/16_sunburn_spritesheet.png",
    {
      frameWidth: 100,
      frameHeight: 100,
      endFrame: 61,
    }
  );
  //attack sprite end
}

function create() {
  // resource load start
  IncodeUI();
  this.anims.create({
    key: "tower1_idle",
    frames: this.anims.generateFrameNumbers("tower1", { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "tower1_attack",
    frames: this.anims.generateFrameNumbers("tower1", { start: 3, end: 8 }),
    frameRate: 16,
    repeat: -1,
  });
  this.anims.create({
    key: "tower2_idle",
    frames: this.anims.generateFrameNumbers("tower2", { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "tower2_attack",
    frames: this.anims.generateFrameNumbers("tower2", { start: 3, end: 8 }),
    frameRate: 16,
    repeat: -1,
  });
  this.anims.create({
    key: "tower3_idle",
    frames: this.anims.generateFrameNumbers("tower3", { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "tower3_attack",
    frames: this.anims.generateFrameNumbers("tower3", { start: 3, end: 8 }),
    frameRate: 16,
    repeat: -1,
  });
  this.anims.create({
    key: "tower4_idle",
    frames: this.anims.generateFrameNumbers("tower4", { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "tower4_attack",
    frames: this.anims.generateFrameNumbers("tower4", { start: 3, end: 8 }),
    frameRate: 16,
    repeat: -1,
  });
  this.anims.create({
    key: "tower5_idle",
    frames: this.anims.generateFrameNumbers("tower5", { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "tower5_attack",
    frames: this.anims.generateFrameNumbers("tower5", { start: 3, end: 8 }),
    frameRate: 16,
    repeat: -1,
  });
  // resource load end

  //player start
  player = new Player(this, 10, 10, "tower1");
  player.play("tower1_attack");
  player.setScale(2);
  player.setDepth(3);
  //player end
  thisScene = this;
  //map start
  this.chunkSize = 8;
  this.tileSize = 300;
  this.cameraSpeed = 1;

  this.followPoint = new Phaser.Math.Vector2(
    this.cameras.main.worldView.x + this.cameras.main.worldView.width * 0.5,
    this.cameras.main.worldView.y + this.cameras.main.worldView.height * 0.5
  );

  global.$this = this.scene;

  camera = this.cameras.main;

  //map start
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

  this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
  //map enderlap(magics, monsterSet, attack);

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

  this.followPoint.x = player.x;
  this.followPoint.y = player.y;
  //map end

  this.cameras.main.setZoom(0.7);
  this.cameras.main.startFollow(player, false);
  console.log(this.cameras);

  socket = new WebSocket("ws://k7c106.p.ssafy.io:8080");

  socket.onopen = function () {
    IsStarted = false;
    PinNumber = null;

    var Data = {
      action: "exeClientInit",
    };
    socket.send(JSON.stringify(Data));
  };

  socket.onmessage = function (data) {
    var msg = JSON.parse(data.data.toString());

    if (msg.action === "PinNumber") {
      PinNumber = msg.pinnumber;
      console.log(`당신의 Pin번호는 "${PinNumber}" 입니다.`);
    }
    // 게임 시작시 1초 마다 서버에게 데이터를 보내는걸 시작한다.
    else if (msg.action === "StartGame") {
      IsStarted = true;
      IsRunning = false;
    }
    // 1번의 cycle이 끝나면 보낸다.
    else if (msg.action === "codeData") {
      //여기서 바뀐 정보를 전달 받는다.
      monster = msg.monster;
      monsterpos = msg.monsterpos;

      testshow();
      IsRunning = false;
    }
  };
}

function update(time, delta) {
  frameTime += delta;

  if (frameTime > 16.5) {
    frameTime = 0;
    timer++;
    if (timer > 60) {
      timer = 0;
      if (IsStarted) {
        dataSend();
      }
    }
  }
}

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

//sock start
function dataSend() {
  const tempMonster = [true, true, true, true, true];
  if (socket.bufferedAmount == 0) {
    if (IsStarted != false && IsRunning != true) {
      var Data = {
        action: "exeData",
        pinnumber: PinNumber,
        monster: tempMonster,
        monsterpos: monsterpos,
      };
      IsRunning = true;
      socket.send(JSON.stringify(Data));
    }
  }
}

function testshow() {
  monster[0] = false;
  for (let i = 0; i < monster.length; ++i) {
    console.log(monster[i] + " ");
  }
  console.log("");
  for (let i = 0; i < monster.length; ++i) {
    console.log("[" + monsterpos[i][0] + "," + monsterpos[i][1] + "]");
  }
  console.log("");
  console.log("-------------------------------");
}

// sock end
