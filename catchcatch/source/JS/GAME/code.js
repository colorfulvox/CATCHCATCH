import Player from "./CodeObj/player.js";
import { Chunk, Tile } from "./entities.js";
import { sockConnect } from "./CodeObj/Execlient.js";
import IncodeUI, { makeranking, codegameclear } from "../UI/incode-ui.js";
import Enemy from "./CodeObj/enemy.js";
import Magic from "./CodeObj/magic.js";
import { showscore } from "../UI/incode-ui.js";
import { setSound } from "../SOUND/sound";

export let codeConfig = {
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
      debug: debugmode,
      debugShowVelocity: true,
      fixedStep: false,
    },
  },
};

// 우리가 전달할 정보 --------------------------
let monsterpos = [
  [1, 2],
  [0, 2],
  [4, 5],
  [6, 2],
  [1, 2],
];
// ----------------------------------------
let monX;
let monY;
let randomLocation;
let cats;
let maxMon;
let monCount = 0;
var player = "";
global.codeScene = "";
let codeStart;
var gameOver = false;
var scoreText;
global.gameTimer = 0;
global.score = 0;
global.magicSet = "";
var map;
var chunks = [];
export var camera;
let frameTime = 0;
let timer = 0;
let monTimer = 30;
// 몬스터 변수 선언
var monster;
global.codeMonsterSet = "";
global.codeEnemySet = "";

export function config() {
  codeConfig = {
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
        debug: debugmode,
        debugShowVelocity: false,
        fixedStep: false,
      },
    },
  };
}

function preload() {
  //map start
  this.load.image("sprWater", "images/map/sprWater.png");
  this.load.image("sprSand", "images/map/sprSand.png");
  this.load.image("sprGrass", "images/map/sprGrass.png");
  this.load.image("ssafy", "images/map/ssafy.png");
  //map end
  let frameTime = 0;

  //player start
  // 플레이어 스프라이트
  this.load.spritesheet("tower1", "images/cattower/8_ssafy.png", {
    frameWidth: 38,
    frameHeight: 64,
  });

  this.load.spritesheet("tower2", "images/cattower/lucky_ssafy.png", {
    frameWidth: 38,
    frameHeight: 64,
  });
  // player end

  //attack sprite start
  this.load.spritesheet(
    "magic1",
    "images/attack/weapon/code_tower_normal.png",
    {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 5,
    }
  );
  this.load.spritesheet(
    "magic2",
    "images/attack/weapon/code_tower_thunder.png",
    {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 5,
    }
  );
  this.load.spritesheet("magic3", "images/attack/weapon/code_tower_fire.png", {
    frameWidth: 64,
    frameHeight: 64,
    endFrame: 5,
  });
  this.load.spritesheet("magic4", "images/attack/weapon/code_tower_water.png", {
    frameWidth: 64,
    frameHeight: 64,
    endFrame: 5,
  });
  this.load.spritesheet("magic5", "images/attack/weapon/code_tower_earth.png", {
    frameWidth: 64,
    frameHeight: 64,
    endFrame: 5,
  });
  //attack sprite end

  //object sprite start
  this.load.spritesheet("cat1", "images/cat/cat8.png", {
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
  // 몬스터
  this.load.spritesheet("monster_die", "images/monster/monster_die2.png", {
    frameWidth: 64,
    frameHeight: 64,
  });

  this.load.spritesheet("alien", "images/monster/normalSlime.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  this.load.spritesheet("worm", "images/monster/thunderSlime.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  this.load.spritesheet("sonic", "images/monster/fireSlime.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  this.load.spritesheet("turtle", "images/monster/waterSlime.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  this.load.spritesheet("slime", "images/monster/earthSlime.png", {
    frameWidth: 48,
    frameHeight: 48,
  });

  //object sprite end
}

function create() {
  // resource load start
  console.log(debugmode);
  IncodeUI();
  monCount = 0;
  chunks = [];
  score = 0;
  codeStart = true;
  this.anims.create({
    key: "tower1_idle",
    frames: this.anims.generateFrameNumbers("tower1", { start: 0, end: 1 }),
    frameRate: 8,
    repeat: -1,
  });
  this.anims.create({
    key: "tower2_idle",
    frames: this.anims.generateFrameNumbers("tower2", { start: 0, end: 1 }),
    frameRate: 8,
    repeat: -1,
  });
  // ============== 몬스터 스프라이트 애니메이션 목록 ==================
  this.anims.create({
    key: "alien",
    frames: this.anims.generateFrameNumbers("alien", { start: 0, end: 6 }),
    frameRate: 7,
    repeat: -1, // -1은 무한 반복 의미
  });

  this.anims.create({
    key: "worm",
    frames: this.anims.generateFrameNumbers("worm", { start: 0, end: 6 }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "sonic",
    frames: this.anims.generateFrameNumbers("sonic", { start: 0, end: 6 }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "turtle",
    frames: this.anims.generateFrameNumbers("turtle", { start: 0, end: 6 }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "slime",
    frames: this.anims.generateFrameNumbers("slime", { start: 0, end: 6 }),
    frameRate: 7,
    repeat: -1,
  });

  this.anims.create({
    key: "magic1",
    frames: this.anims.generateFrameNumbers("magic1", { start: 0, end: 5 }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic2",
    frames: this.anims.generateFrameNumbers("magic2", { start: 0, end: 5 }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic3",
    frames: this.anims.generateFrameNumbers("magic3", { start: 0, end: 5 }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic4",
    frames: this.anims.generateFrameNumbers("magic4", { start: 0, end: 5 }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "magic5",
    frames: this.anims.generateFrameNumbers("magic5", { start: 0, end: 5 }),
    frameRate: 20,
    repeat: -1,
  });
  this.anims.create({
    key: "cat1_turn",
    frames: this.anims.generateFrameNumbers("cat1", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: "cat1_left",
    frames: this.anims.generateFrameNumbers("cat1", {
      start: 1,
      end: 7,
    }),
    frameRate: 14,
    repeat: -1,
  });
  this.anims.create({
    key: "cat1_right",
    frames: this.anims.generateFrameNumbers("cat1", {
      start: 1,
      end: 7,
    }),
    frameRate: 14,
    repeat: -1,
  });
  this.anims.create({
    key: "cat2_turn",
    frames: this.anims.generateFrameNumbers("cat2", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: "cat2_left",
    frames: this.anims.generateFrameNumbers("cat2", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat2_right",
    frames: this.anims.generateFrameNumbers("cat2", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat3_turn",
    frames: this.anims.generateFrameNumbers("cat3", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: "cat3_left",
    frames: this.anims.generateFrameNumbers("cat3", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat3_right",
    frames: this.anims.generateFrameNumbers("cat3", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat4_turn",
    frames: this.anims.generateFrameNumbers("cat4", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: "cat4_left",
    frames: this.anims.generateFrameNumbers("cat4", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat4_right",
    frames: this.anims.generateFrameNumbers("cat4", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat5_turn",
    frames: this.anims.generateFrameNumbers("cat5", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: "cat5_left",
    frames: this.anims.generateFrameNumbers("cat5", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat5_right",
    frames: this.anims.generateFrameNumbers("cat5", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "cat6_turn",
    frames: this.anims.generateFrameNumbers("cat6", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: "cat6_left",
    frames: this.anims.generateFrameNumbers("cat6", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat6_right",
    frames: this.anims.generateFrameNumbers("cat6", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat7_turn",
    frames: this.anims.generateFrameNumbers("cat7", {
      start: 0,
      end: 0,
    }),
    frameRate: 10,
  });
  this.anims.create({
    key: "cat7_left",
    frames: this.anims.generateFrameNumbers("cat7", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "cat7_right",
    frames: this.anims.generateFrameNumbers("cat7", {
      start: 1,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // resource load end
  var ssafy = this.add.image(0, 0, "ssafy");
  ssafy.setDepth(2);
  ssafy.setAlpha(0.5);
  //player start
  player = new Player(this, 10, 10, "tower" + Math.floor(Math.random() * 2));
  let playerRandom = Math.floor(Math.random() * 2 + 1);
  player.play("tower" + playerRandom + "_idle");
  player.setScale(2);
  player.setDepth(3);
  player.body.debugBodyColor = 0x7f921b;
  //player end
  codeScene = this;
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
  //map enderlap(magics, codeMonsterSet, attack);

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

  //monster start
  codeMonsterSet = this.physics.add.group();
  codeEnemySet = this.physics.add.group();
  magicSet = this.physics.add.group();
  //monster end

  this.cameras.main.setZoom(0.7);
  this.cameras.main.startFollow(player, false);

  switch (stageNum) {
    case 1:
      maxMon = 10;
      break;
    case 2:
      maxMon = 10;
      break;
    case 3:
      maxMon = 10;
      break;
    case 4:
      maxMon = 10;
      for (let i = 0; i < 5; i++) {
        catSpawn();
        let enemy = new Enemy(
          this,
          60,
          monX,
          monY,
          "cat1",
          "cat1",
          0,
          randomLocation
        );

        codeMonsterSet.add(enemy);
      }
      break;
    case 5:
      maxMon = 10;
      for (let i = 0; i < 5; i++) {
        catSpawn();
        let enemy = new Enemy(
          this,
          60,
          monX,
          monY,
          "cat1",
          "cat1",
          0,
          randomLocation
        );

        codeMonsterSet.add(enemy);
      }
      break;
    case 6:
      maxMon = 15;
      for (let i = 0; i < 8; i++) {
        catSpawn();
        let enemy = new Enemy(
          this,
          60,
          monX,
          monY,
          "cat1",
          "cat1",
          0,
          randomLocation
        );
        codeMonsterSet.add(enemy);
      }
      break;
  }

  this.physics.add.overlap(magicSet, codeMonsterSet, monsterHit);
  this.physics.add.overlap(player, codeMonsterSet, playerHit);
  this.scene.pause();
}

function update(time, delta) {
  frameTime += delta;

  if (frameTime > 16.5) {
    showscore.textContent = global.score + " score";
    // 여기다가 UI 띄워라
    frameTime = 0;
    timer++;
    monTimer++;
    if (timer > 60) {
      timer = 0;
      if (IsStarted) {
        dataSend();
      }
    }

    if (monTimer > 40) {
      monTimer = 0;

      switch (stageNum) {
        case 1:
          if (monCount < maxMon) {
            let enemy =
              monCount % 2 === 0
                ? new Enemy(
                    this,
                    80,
                    400,
                    -400,
                    "alien",
                    "alien",
                    1,
                    randomLocation
                  )
                : new Enemy(
                    this,
                    80,
                    -400,
                    -400,
                    "alien",
                    "alien",
                    1,
                    randomLocation
                  );
            if (enemy.type === 1) {
              enemy.health = 1;
            }
            codeMonsterSet.add(enemy);
            codeEnemySet.add(enemy);
            this.physics.moveToObject(enemy, player, enemy.velo);
            monCount++;
          }
          break;
        case 2:
          if (monCount < maxMon) {
            enemySpawn();
            let enemy = new Enemy(
              this,
              60,
              monX,
              monY,
              "alien",
              "alien",
              1,
              randomLocation
            );
            if (enemy.type === 1) {
              enemy.health = 1;
            }
            codeMonsterSet.add(enemy);
            codeEnemySet.add(enemy);
            this.physics.moveToObject(enemy, player, enemy.velo);
            monCount++;
          }
          break;
        case 3:
          if (monCount < maxMon) {
            enemySpawn();
            let typeNum = Math.floor(Math.random() * 4 + 2);
            let enemy = new Enemy(
              this,
              60,
              monX,
              monY,
              "alien",
              "alien",
              typeNum,
              randomLocation
            );
            if (enemy.type === 1) {
              enemy.health = 1;
            }
            codeMonsterSet.add(enemy);
            codeEnemySet.add(enemy);
            this.physics.moveToObject(enemy, player, enemy.velo);
            monCount++;
          }
          break;
        case 4:
          if (monCount < maxMon) {
            enemySpawn();
            let typeNum = Math.floor(Math.random() * 5 + 1);
            let enemy = new Enemy(
              this,
              30,
              monX,
              monY,
              "alien",
              "alien",
              typeNum,
              randomLocation
            );

            // enemy.setScale(2);
            if (enemy.type === 1) {
              enemy.health = 1;
            }
            codeMonsterSet.add(enemy);
            codeEnemySet.add(enemy);
            this.physics.moveToObject(enemy, player, enemy.velo);
            monCount++;
          }

          break;
        case 5:
          if (monCount < maxMon) {
            enemySpawn();
            let typeNum = Math.floor(Math.random() * 5 + 1);
            let enemy = new Enemy(
              this,
              40,
              monX,
              monY,
              "alien",
              "alien",
              typeNum,
              randomLocation
            );
            if (enemy.type === 1) {
              enemy.health = 1;
            }
            codeMonsterSet.add(enemy);
            codeEnemySet.add(enemy);
            this.physics.moveToObject(enemy, player, enemy.velo);
            monCount++;
          }
          break;
        case 6:
          if (monCount < maxMon) {
            enemySpawn();
            let typeNum = Math.floor(Math.random() * 5 + 1);
            let enemy = new Enemy(
              this,
              40,
              monX,
              monY,
              "alien",
              "alien",
              typeNum,
              randomLocation
            );
            if (enemy.type === 1) {
              enemy.health = 1;
            }
            codeMonsterSet.add(enemy);
            codeEnemySet.add(enemy);
            this.physics.moveToObject(enemy, player, enemy.velo);
            monCount++;
          }
          break;
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
  if (socket.bufferedAmount == 0) {
    if (IsStarted != false && IsRunning != true) {
      if (codeEnemySet.children.entries.length > 0) {
        let objList = [[]];
        let obj = codeMonsterSet.children.entries;

        for (let i = 0; i < codeMonsterSet.children.entries.length; i++) {
          objList.push([
            obj[i].x,
            obj[i].y,
            obj[i].type,
            obj[i].body.halfWidth,
          ]);
        }
        for (let i = 0; i < objList.length; i++) {
          if (objList[i] == 0) {
            objList.splice(i, 1);
            i--;
          }
        }

        shuffle(objList);

        var Data = {
          action: "exeData",
          pinnumber: PinNumber,
          catchobj: objList,
        };
        codeStart = false;
        IsRunning = true;
        socket.send(JSON.stringify(Data));
      } else if (!codeStart) {
        setSound.playSE(26);
        console.log("Game End, Score : " + score);
        Data = {
          action: "endGame",
          pinnumber: PinNumber,
        };
        socket.send(JSON.stringify(Data));
        IsStarted = false;
        if (stageNum === 6) {
          makeranking();
        } else {
          codegameclear();
        }
      }
    }
  }
}

// sock end
export function attack(isAttack, angle, element) {
  if (isAttack) {
    let x = Math.cos(angle * (Math.PI / 180));
    let y = Math.sin(angle * (Math.PI / 180));

    let magic = new Magic(codeScene, element);
    setSound.playSE(25);
    magic.anims.play("magic" + element);
    magicSet.add(magic);
    codeScene.physics.moveTo(magic, x, y, 500);
  }
}

function monsterHit(magic, monster) {
  if (monster.type === 0) {
    score -= 300;
  }

  if (!monster.invincible) {
    if (monster.weak === magic.element) {
      monster.health -= 3;
    } else {
      monster.invincible = true;
      monster.health -= 1;
    }
    magic.destroy();

    if (monster.health <= 0) {
      if (monster.type !== 0) {
        setSound.playSE(23);
      } else {
        setSound.playSE(27);
      }
      score += 100;
      monster.destroy();
      console.log(score);
    }
  }
}

function playerHit(player, monster) {
  monster.destroy();
  score -= 50;
}

// sock end

function enemySpawn() {
  randomLocation = Math.floor(Math.random() * 4) + 1;
  if (randomLocation === 1) {
    monX = Phaser.Math.Between(player.x - 400, player.x + 400);
    monY = Phaser.Math.Between(player.y + 400, player.y + 400);
  } else if (randomLocation === 2) {
    monX = Phaser.Math.Between(player.x - 400, player.x + 400);
    monY = Phaser.Math.Between(player.y - 400, player.y - 400);
  } else if (randomLocation === 3) {
    monX = Phaser.Math.Between(player.x - 400, player.x - 400);
    monY = Phaser.Math.Between(player.y - 400, player.y + 400);
  } else if (randomLocation === 4) {
    monX = Phaser.Math.Between(player.x + 400, player.x + 400);
    monY = Phaser.Math.Between(player.y - 400, player.y + 400);
  }
}

function catSpawn() {
  randomLocation = Math.floor(Math.random() * 4) + 1;
  if (randomLocation === 1) {
    monX = Phaser.Math.Between(player.x - 220, player.x + 220);
    monY = Phaser.Math.Between(player.y + 220, player.y + 220);
  } else if (randomLocation === 2) {
    monX = Phaser.Math.Between(player.x - 220, player.x + 220);
    monY = Phaser.Math.Between(player.y - 220, player.y - 220);
  } else if (randomLocation === 3) {
    monX = Phaser.Math.Between(player.x - 220, player.x - 220);
    monY = Phaser.Math.Between(player.y - 220, player.y + 220);
  } else if (randomLocation === 4) {
    monX = Phaser.Math.Between(player.x + 220, player.x + 220);
    monY = Phaser.Math.Between(player.y - 220, player.y + 220);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
