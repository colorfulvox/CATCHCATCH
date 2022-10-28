import Fairy from "./GameObj/fairy.js";
import Magic from "./GameObj/magic.js";
import Player from "./GameObj/player.js";
import Enemy from "./GameObj/enemy.js";
import inGameUI, {updateExp} from "../UI/inGameUI.js";
import levelup from "../UI/levelup.js";
import initUpgrade, {closeUpgrade} from "../UI/upgrade.js";

import {Chunk, Tile} from "./Entities.js";
import CatTower from "./GameObj/cattower.js";
import Boss from './GameObj/boss.js';
import Mine from "./GameObj/mine.js";

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
            debug: false,
            fixedStep: false,
        },
    },
};

//player start
// 고양이 json
let cats;
// 플레이어 객체
global.player = "";
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
let gameTimer = 0;

//map start
var map;
var chunks = [];
export var mapSize = 16000;
export var camera;
let controls;
//map end

//navi start
var navi;
//navi end

//coin start
global.coin = 0;
global.cointext = "";
//coin end

//enemy start


// 몬스터 변수 선언
export var monsterSet;
var monster;

export var bossSet;
// 1번 몬스터: alien
var alien;

// 2번 몬스터: worm
var worm;

// 3번 몬스터: sonic
var sonic;

// 4번 몬스터: turtle
var turtle;

// 5번 몬스터: alien_plus
var alien_plus;

// 6번 몬스터: worm_plus
var worm_plus;

var cursors;


// 보스
var slime_king;

// 보스 패턴
var pt;
// 보스 활성 확인
var boss_active;

var monX;
var monY;
global.monsterCount = 0;
var randomLocation = 0;
var timer;
var random_monster = 0;


// 임시 구멍
var hole;

// 몬스터 이미지

//enemy end


//tower start
var towerLU
var towerRU
var towerLD
var towerRD
global.towerAttacks = "";
global.towerSkillAttacks = "";
//tower end

//mine start
var mine;
var minecount = 10;
var StartMineRangeX = -1000;
var StartMineRangeY = -1000;
var EndMineRangeX = 1000;
var EndMineRangeY = 1000;

global.mines = "";

//mine end

//exp bar start
var expbar;
var expbarBG;

//exp bar end


function preload() {
    //map start
    this.load.image("sprWater", "images/map/sprWater.png");
    this.load.image("sprSand", "images/map/sprSand.png");
    this.load.image("sprGrass", "images/map/sprGrass.png");
    //map end

    //tower start
    this.load.image("cat", "images/cattower/cat.png");
    this.load.image("can", "images/cattower/can.png");
    this.load.image("skill", "images/cattower/skill.png");
    //tower end

    //hole start
    this.load.image("hole", "images/hole/hole.png");
    //hole end

    //navi start
    this.load.image("navi", "images/navi/arrow.png");
    //navi end

    //mine start
    this.load.image("mine", "images/mine/mine.png")
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
        {frameWidth: 100, frameHeight: 100, endFrame: 61}
    );

    this.load.spritesheet(
        "magic5_1",
        "images/attack/weapon/13_vortex_spritesheet.png",
        {frameWidth: 100, frameHeight: 100, endFrame: 61}
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

    // 몬스터
    this.load.spritesheet(
        "alien",
        "http://labs.phaser.io/assets/tests/invaders/invader1.png",
        {frameWidth: 32, frameHeight: 32}
    );

    // 보스

    //enemy end
}

function create() {
    thisScene = this;
    //map start
    this.chunkSize = 8;
    this.tileSize = 300;
    this.cameraSpeed = 1;

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


    player = cats[catNumber];
    player = new Player(this, 1, 100, 100, "cat" + (ChoiceCat + 1));
    player.setDepth(2);
    inGameUI();

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
    global.wizard = fairySet[0] = new Fairy(
        this,
        100,
        4,
        1,
        1,
        140,
        40,
        500,
        1,
        player
    );
    fairySet[0].initFairy1(0, 0);
    global.reaper = fairySet[1] = new Fairy(
        this,
        100,
        10,
        1,
        1,
        70,
        10,
        160,
        2,
        player
    );
    global.ninja = fairySet[2] = new Fairy(
        this,
        100,
        0,
        1,
        3,
        80,
        10,
        300,
        3,
        player
    );
    fairySet[2].initFairy3(0, 10);
    global.slime = fairySet[3] = new Fairy(
        this,
        7200,
        10,
        1,
        3,
        90,
        10,
        400,
        4,
        player
    );


    global.witch = fairySet[4] = new Fairy(
        this,
        100,
        10,
        1,
        5,
        40,
        10,
        500,
        5,
        player
    );
    fairySet[4].initFairy5(1, 1)
    for (let i = 0; i < 5; i++) {
        fairySet[i].setDepth(2);
    }
    player.changeFairy(fairySet[0]);
    normalAttackAS = fairySet[0].as;
    // animation
    this.anims.create({
        key: "fairy1_idle",
        frames: this.anims.generateFrameNumbers("fairy1", {start: 12, end: 21}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy1_attack",
        frames: this.anims.generateFrameNumbers("fairy1", {start: 6, end: 10}),
        frameRate: 12,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy2_idle",
        frames: this.anims.generateFrameNumbers("fairy2", {start: 10, end: 19}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy2_attack",
        frames: this.anims.generateFrameNumbers("fairy2", {start: 0, end: 8}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy3_idle",
        frames: this.anims.generateFrameNumbers("fairy3", {start: 11, end: 19}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy3_attack",
        frames: this.anims.generateFrameNumbers("fairy3", {start: 0, end: 9}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy4_idle",
        frames: this.anims.generateFrameNumbers("fairy4", {start: 7, end: 14}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy4_attack",
        frames: this.anims.generateFrameNumbers("fairy4", {start: 0, end: 5}),
        frameRate: 10,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy5_idle",
        frames: this.anims.generateFrameNumbers("fairy5", {start: 15, end: 24}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy5_attack",
        frames: this.anims.generateFrameNumbers("fairy5", {start: 0, end: 13}),
        frameRate: 17,
        repeat: 0,
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

    //cointext start
    cointext = this.add.text(500, 10, 'coin: 0', {font: '10px Arial Black', fill: '#000'}).setScrollFactor(0);
    cointext.setStroke('#fff', 1);
    cointext.setDepth(2);
    //cointext end

    //enemy start

    monsterSet = this.physics.add.group();
    magics = this.physics.add.group();
    towerAttacks = this.physics.add.group();
    towerSkillAttacks = this.physics.add.group();
    mines = this.physics.add.group();

    // 임시 구멍
    hole = this.physics.add.sprite(0, 0, 'fairy4')
    hole.hp = 100;
    hole.setDepth(1);

    // 그룹셋
    monsterSet = this.physics.add.group();
    bossSet = this.physics.add.group();
    magics = this.physics.add.group();


    this.physics.add.collider(player, bossSet, player.hitPlayer);
    this.physics.add.collider(bossSet, monsterSet);
    thisScene.physics.add.overlap(magics, bossSet, attack);

    // 만약 유저와 몬스터가 닿았다면 (hitplayer 함수 실행)
    this.physics.add.collider(player, monsterSet, player.hitPlayer);
    thisScene.physics.add.overlap(magics, monsterSet, attack);
    // 만약 몬스터와 구멍이 닿았다면 (hithole 함수 실행)
    thisScene.physics.add.overlap(hole, monsterSet, hithole)

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


    this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
    //map enderlap(magics, monsterSet, attack);
    this.anims.create({
        key: "swarm",
        frames: this.anims.generateFrameNumbers("alien", {start: 0, end: 1}),
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

    // ============== 몬스터 스프라이트 애니메이션 목록 ==================
    this.anims.create({
        key: 'swarm',
        frames: this.anims.generateFrameNumbers('alien', {start: 0, end: 1}),
        frameRate: 2,
        repeat: -1
    })
    //enemy end


    //tower start

    towerLU = new CatTower(this, -100, -100, "cat", "can", "skill");
    towerRU = new CatTower(this, 100, -100, "cat", "can", "skill");
    towerLD = new CatTower(this, -100, 100, "cat", "can", "skill");
    towerRD = new CatTower(this, 100, 100, "cat", "can", "skill");
    towerLU.scale_Circle();
    towerRU.scale_Circle();
    towerLD.scale_Circle();
    towerRD.scale_Circle();
    towerLU.setDepth(1);
    towerRU.setDepth(1);
    towerLD.setDepth(1);
    towerRD.setDepth(1);

    //tower end

    //mine start
    for (let i = 0; i < minecount; i++) {
        mine = new Mine(this, Math.random() * (EndMineRangeX - StartMineRangeX) + StartMineRangeX, Math.random() * (EndMineRangeY - StartMineRangeY) + StartMineRangeY, "mine");
        mine.scale_Circle();
        mines.add(mine);
    }
    //mine end

    // ##보스 생성, 나중에 타이머 조건 넣고 업데이트에 넣기 ##

    //navi start
    navi = this.add.image(50, 50, 'navi').setScrollFactor(0).setScale(0.1);
    navi.setDepth(2)
    //navi end

    //exp bar start
    expbar = this.add.graphics().setScrollFactor(0);
    expbarBG = this.add.graphics().setScrollFactor(0);
    expbar.setDepth(3);
    expbarBG.setDepth(2);
    //exp bar end
}

function update(time, delta) {
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


    this.followPoint.x = player.x
    this.followPoint.y = player.y

    this.cameras.main.startFollow(player, false);
    //map end

    //navi start

    navi.rotation = Phaser.Math.Angle.Between(hole.x, hole.y, player.x, player.y);

    //navi end

    //player start
    changeSlot();
    normalAttackAS = fairySet[nowFairy].as;
    if (normalAttackTimer > normalAttackAS) {
        control = false;
    } else {
        normalAttackTimer++;
    }
    //mouse clicked
    if (mouse.leftButtonDown() && !control && fairySet[nowFairy].bombcount > 0) {
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

    player.move();
    //player end

    //enemy start


    // 몬스터가 유저 따라가게함
    if (monsterCount !== 0) {
        for (let i = 0; i < monsterSet.children.entries.length; i++) {
            if (monsterSet.children.entries[i].type == 'follower') {
                this.physics.moveToObject(monsterSet.children.entries[i], player, monsterSet.children.entries[i].velo);
            }
            // #홀에 따라가게 하는 코드 작성하기#
            else if (monsterSet.children.entries[i].type == 'siege') {
                this.physics.moveToObject(monsterSet.children.entries[i], hole, monsterSet.children.entries[i].velo);
            }
        }
    }

    gameTimer++;

    // 플레이어 기준랜덤 위치에 몬스터 생성
    // 생성규칙: 몬스터이름, 애니메이션, 체력, 속도, x,y,타입,딜레이
    if ((gameTimer > 300) && (gameTimer % 30 == 0)) {
        // 1번 zombie
        enemySpawn(randomLocation)

        // #### if문으로 특정 시간 이후면 강화몹 소환으로 변경하기 ###
        addMonster(this, 'alien', 'swarm', 10, 100, monX, monY, 'follower')
        // addMonster(this, 'alien_plus', 'alien_plus_anim',20,100,monX,monY,'follower')
    }
    ;

    if ((gameTimer > 1200) && (gameTimer % 600 == 0)) {
        // 2번 worm
        enemySpawn(randomLocation)
        addMonster(this, 'worm', 'swarm', 10, 70, monX, monY, 'siege')

        // #### if문으로 특정 시간 이후면 강화몹 소환으로 변경하기 ###
        // addMonster(this, 'worm_plus', 'worm_plus_anim',20,100,monX,monY,'follower')
    }
    ;

    if ((gameTimer > 1500) && (gameTimer % 300 == 0)) {
        enemySpawn(randomLocation)
        addMonster(this, 'sonic', 'swarm', 5, 200, monX, monY, 'follower')
    }
    ;


    if ((gameTimer > 1800) && (gameTimer % 900 == 0)) {
        enemySpawn(randomLocation)
        addMonster(this, 'turtle', 'swarm', 100, 30, monX, monY, 'siege')
    }
    ;

    // 몬스터 빅웨이브
    if ((gameTimer > 600) && (gameTimer < 1200) && (gameTimer % 3 == 0)) {
        // 1번 zombie
        enemySpawn(randomLocation)

        // #### if문으로 특정 시간 이후면 강화몹 소환으로 변경하기 ###
        addMonster(this, 'alien', 'swarm', 10, 100, monX, monY, 'follower')
        // addMonster(this, 'alien_plus', 'alien_plus_anim',20,100,monX,monY,'follower')
    }

    // 보스

    // 슬라임
    if (gameTimer == 1800) {
        slime_king = new Boss(this, 200, 80, player.x + 300, player.y + 300, 'slime_king', 'swarm', 5, 1, 'boss')
        slime_king.setDepth(2);
        slime_king.anime()
        boss_active = true
        bossSet.add(slime_king)
    }

    if (boss_active) {
        for (let i = 0; i < bossSet.children.entries.length; i++) {
            this.physics.moveToObject(bossSet.children.entries[i], player, bossSet.children.entries[i].velo);
            if (bossSet.children.entries[i].health <= 0) {
                slime_pattern(this, bossSet.children.entries[i].pt, bossSet.children.entries[i].x, bossSet.children.entries[i].y)
                bossSet.children.entries[i].destroy()
            }
        }
    }

    for (let i = magics.length - 1; i >= 0; i--) {
        magics[i].timer++;
        if (magics[i].timer == magics[i].lifetime) {
            magics[i].destroy();
            magics.splice(i, 1);
        }
    }

    //enemy end


    //tower start

    towerLU.towerAttackTimer++;
    towerRU.towerAttackTimer++;
    towerLD.towerAttackTimer++;
    towerRD.towerAttackTimer++;

    towerLU.towerSkillAttackTimer++;
    towerRU.towerSkillAttackTimer++;
    towerLD.towerSkillAttackTimer++;
    towerRD.towerSkillAttackTimer++;
    //tower end


    //exp bar start
    expbar.clear();

    //  BG
    expbarBG.fillStyle(0x000000);
    expbarBG.fillRect(0, 0, this.cameras.main.worldView.width, 16); // x y 가로길이, 세로길이

    //  Health

    expbar.fillStyle(0xff0000);
    expbar.fillRect(0, 0, this.cameras.main.worldView.width * (player.exp / player.maxExp), 16);
    //exp bar end
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

function attack(magic, monster) {
    if (!monster.invincible) {
        if (magic.pierceCount > 0) {
            magic.pierceCount--;
        } else {
            magic.destroy();
        }

        if (nowFairy === 2) {
            //  && fairySet[nowFairy].level === 9 (추후에 레벨업 생길 때 추가)
            let num = Math.floor(Math.random() * 100 + 1);
            if (num <= fairySet[nowFairy].deathCount && monster.type != 'boss') {
                monster.die_anim();
                monster.destroy();
                player.levelUp();

                monsterCount -= 1;
            }
        }

        monster.health -= fairySet[nowFairy].dmg;
        monster.invincible = true;
        if (monster.health <= 0 && monster.type != 'boss') {
            monster.die_anim();
            monster.destroy();
            player.levelUp();
            monsterCount -= 1;
        }
    }
}

// 임시 구멍 구현
function hithole(hole, monster) {
    hole.hp -= 1
    monster.destroy()

    if (hole.hp <= 0) {
        console.log('game over')
    }
}


function addMonster(scene, mon_name, mon_anime, hp, velo, x, y, type) {
    monster = new Enemy(scene, hp, velo, x, y, mon_name, mon_anime, type);
    monster.setDepth(2);
    monsterCount += 1;
    monsterSet.add(monster);
    scene.physics.add.collider(monsterSet, monster);
    monster.anime();
}


function enemySpawn(scene) {
    randomLocation = Math.floor(Math.random() * 4) + 1
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

function slime_pattern(scene, pt, x, y) {
    if (pt != 16) {
        pt *= 2
        for (let i = 0; i < pt; i++) {
            // 분열될 때마다 체력 감소 구현하기
            if (pt < 4) {
                slime_king = new Boss(scene, 100, 100, x + i * 100, y, 'slime_king', 'swarm', 2.5, pt, 'boss')
            } else if (pt < 8) {
                slime_king = new Boss(scene, 50, 100, x + i * 50, y, 'slime_king', 'swarm', 1.25, pt, 'boss')
            } else {
                slime_king = new Boss(scene, 25, 100, x + i * 25, y, 'slime_king', 'swarm', 0.5, pt, 'boss')
            }
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
