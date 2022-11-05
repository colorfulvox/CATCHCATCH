import Fairy from "./GameObj/fairy.js";
import Magic from "./GameObj/magic.js";
import Player from "./GameObj/player.js";
import Enemy from "./GameObj/enemy.js";
import ingameUi, {GameOver, updateExp, updateHP} from "../UI/ingame-ui.js";
import levelup from "../UI/levelup.js";
import initUpgrade, {closeUpgrade} from "../UI/upgrade.js";

import {Chunk, Tile} from "./entities.js";
import CatTower from "./GameObj/cat-tower.js";
import Boss from "./GameObj/boss.js";
import Mine from "./GameObj/mine.js";

import {UpdateTimer} from "../UI/ingame-ui.js";
import {setSound} from "../SOUND/sound.js";

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
        disableWebAudio: true
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
            debug: true,
            fixedStep: false,
        },
    },
};

//player start
// 고양이 json
let cats;
// 플레이어 객체
global.player = "";
// 타워
global.towerLU = "";
global.towerRU = "";
global.towerLD = "";
global.towerRD = "";
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

export let cursors;
let gameOver = false;
let scoreText;
// 마우스 포인터 관련
export let input;
let mouse;
//player end

//gametimer
global.gameTimer = 0;

//map start
let map;
let chunks = [];
export let mapSize = 16000;
export let camera;
//map end
let frameTime = 0;
//navi start
let navi;
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

// 1번 몬스터: alien
let alien;

// 2번 몬스터: worm
let worm;

// 3번 몬스터: sonic
let sonic;

// 4번 몬스터: turtle
let turtle;

// 5번 몬스터: alienPlus
let alienPlus;

// 6번 몬스터: wormPlus
let wormPlus;

// 보스
let slimeKing;
let golem;
let fireGiant;
let fireGiantAura;
// 보스 패턴
let pt;
// 보스 활성 확인
let bossActive;
let bossFireGiantActive;

let monX;
let monY;
global.monsterCount = 0;
let randomLocation = 0;
let timer;
let randomMonster = 0;

// 임시 구멍
global.hole = "";

// 몬스터 이미지

//enemy end

//tower start
// let towerLU;
// let towerRU;
// let towerLD;
// let towerRD;
global.towerAttacks = "";
global.towerSkillAttacks = "";
//tower end

//mine start
let mine;
let mineshowtime = 0;
let mineCount = [3, 15, 60, 120, 400, 500, 500, 550, 800, 1000];
let StartMineRangeX = [
    -200, -500, -1200, -5000, -7200, -15000, -32000, -45000, -52000, -72000,
];
let StartMineRangeY = [
    -200, -500, -1200, -5000, -7200, -15000, -32000, -45000, -52000, -72000,
];
let EndMineRangeX = [
    500, 1200, 5000, 7200, 15000, 32000, 45000, 52000, 72000, 100000,
];
let EndMineRangeY = [
    500, 1200, 5000, 7200, 15000, 32000, 45000, 52000, 72000, 100000,
];

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
    this.load.image("sprWater", "images/map/sprWater.png");
    this.load.image("sprSand", "images/map/sprSand.png");
    this.load.image("sprGrass", "images/map/sprGrass.png");
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
    this.load.image("can", "images/cattower/can.png");
    this.load.image("skill", "images/cattower/skill.png");
    //tower end

    //hole start
    this.load.spritesheet(
        "new_hole",
        "images/hole/new_hole.png",
        {
            frameWidth: 100,
            frameHeight: 100
        })
    //hole end

    //navi start
    this.load.image("navi", "images/navi/arrow.png");
    //navi end

    //mine start
    this.load.image("minearrow", "images/mine/boxarrow.png");
    this.load.image("mine", "images/mine/mine.png");
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
        "images/attack/weapon/magic1.png",
        {
            frameWidth: 138,
            frameHeight: 138,
            endFrame: 4,
        }
    );

    this.load.spritesheet(
        "magic1_1",
        "images/attack/weapon/magic1_1.png",
        {
            frameWidth: 362,
            frameHeight: 362,
            endFrame: 7,
        }
    );

    this.load.spritesheet(
        "magic1_2",
        "images/attack/weapon/magic1_2.png",
        {
            frameWidth: 138,
            frameHeight: 138,
            endFrame: 4,
        }
    );

    this.load.spritesheet(
        "magic2",
        "images/attack/weapon/magic2.png",
        {
            frameWidth: 192,
            frameHeight: 108,
        }
    );
    this.load.spritesheet(
        "magic2_1",
        "images/attack/weapon/magic2_1.png",
        {
            frameWidth: 192,
            frameHeight: 108,
        }
    );
    this.load.spritesheet(
        "magic2_2",
        "images/attack/weapon/magic2_2.png",
        {
            frameWidth: 192,
            frameHeight: 108,
        }
    );
    this.load.spritesheet(
        "magic2_1_1",
        "images/attack/weapon/magic2_1_1.png",
        {
            frameWidth: 74,
            frameHeight: 74,
        }
    );
    this.load.spritesheet(
        "magic2_2_1",
        "images/attack/weapon/19_freezing_spritesheet.png",
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
        "images/attack/weapon/slime_attack1_48x48.png",
        {
            frameWidth: 48,
            frameHeight: 48,
            endFrame: 2,
        }
    );

    this.load.spritesheet(
        "magic4_1",
        "images/attack/weapon/slime_attack1_48x48.png",
        {
            frameWidth: 48,
            frameHeight: 48,
            endFrame: 2,
        }
    );

    this.load.spritesheet(
        "magic4_2",
        "images/attack/weapon/slime_attack2_48x48.png",
        {
            frameWidth: 48,
            frameHeight: 48,
            endFrame: 2,
        }
    );

    this.load.spritesheet(
        "magic5",
        "images/attack/weapon/8_protectioncircle_spritesheet.png",
        {frameWidth: 100, frameHeight: 100, endFrame: 61}
    );

    this.load.spritesheet(
        "magic5_1",
        "images/attack/weapon/magic5_1.png",
        {frameWidth: 74, frameHeight: 74, endFrame: 8}
    );
    this.load.spritesheet(
        "magic5_2",
        "images/attack/weapon/magic5_2.png",
        {frameWidth: 74, frameHeight: 74, endFrame: 8}
    );
    this.load.spritesheet(
        "magic5_3",
        "images/attack/weapon/magic5_3.png",
        {frameWidth: 74, frameHeight: 74, endFrame: 8}
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

    this.load.spritesheet("fairy1_2", "images/fairy/fairy1_red.png", {
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

    this.load.spritesheet('monster_die', 'images/monster/monster_die2.png',
        {frameWidth: 64, frameHeight: 64});

    this.load.spritesheet(
        "alien",
        "images/monster/alien.png",
        {frameWidth: 20, frameHeight: 20}
    );

    this.load.spritesheet(
        "worm",
        "images/monster/worm.png",
        {
            frameWidth: 48,
            frameHeight: 48
        })

    this.load.spritesheet(
        "sonic",
        "images/monster/sonic.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })

    this.load.spritesheet(
        "turtle",
        "images/monster/turtle.png",
        {
            frameWidth: 32,
            frameHeight: 32
        })

    this.load.spritesheet(
        "slime",
        "images/monster/slime.png",
        {
            frameWidth: 16,
            frameHeight: 16
        })

  this.load.spritesheet(
    "fly",
    "images/monster/fly.png",
    {
    frameWidth: 32,
    frameHeight: 32
})

  this.load.spritesheet(
    "alienPlus",
    "images/monster/alienPlus.png",
    {
    frameWidth: 20,
    frameHeight: 20
})

    this.load.spritesheet(
        "wormPlus",
        "images/monster/wormPlus.png",
        {
            frameWidth: 48,
            frameHeight: 48
        })

//   보스
    this.load.spritesheet(
        "slimeKing",
        "images/boss/slimeKing.png",
        {
            frameWidth: 96,
            frameHeight: 96
        })

    this.load.spritesheet(
        "golem",
        "images/boss/golem.png",
        {
            frameWidth: 96,
            frameHeight: 96
        })

    this.load.spritesheet(
        "fireGiant",
        "images/boss/fireGiant.png",
        {
            frameWidth: 96,
            frameHeight: 96
        })


    this.load.spritesheet(
        "fireGiantAura",
        "images/boss/fireGiantAura.png",
        {
            frameWidth: 64,
            frameHeight: 64
        })
    //enemy end
}

function create() {
    this.input.setDefaultCursor("url(/images/cursor/aimNone.png), pointer")
    setSound.setBGM(1);
    thisScene = this;
    //map start
    this.chunkSize = 8;
    this.tileSize = 300;
    this.cameraSpeed = 1;
    UICam = this.cameras.add(
        player.x,
        player.y,
        this.cameras.main.worldView.width,
        this.cameras.main.worldView.height
    );
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
  player = new Player(this, 1, 20, 20, "cat" + (ChoiceCat + 1));
  player.ability = ChoiceCat + 1
  player.setScale(0.7);
  player.setDepth(2);
  let hw = player.body.halfWidth;
  let hh = player.body.halfHeight;

    player.setCircle(hw*0.6, hh - hw*0.6, hh - hw*0.6);
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
        10,
        1,
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
        1,
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
        6,
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
        1,
        99999,
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
        key: "fairy1_1_idle",
        frames: this.anims.generateFrameNumbers("fairy1_1", {start: 12, end: 21}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy1_1_attack",
        frames: this.anims.generateFrameNumbers("fairy1_1", {start: 6, end: 10}),
        frameRate: 12,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy1_2_idle",
        frames: this.anims.generateFrameNumbers("fairy1_2", {start: 12, end: 21}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy1_2_attack",
        frames: this.anims.generateFrameNumbers("fairy1_2", {start: 6, end: 10}),
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
        key: "fairy2_1_idle",
        frames: this.anims.generateFrameNumbers("fairy2_1", {start: 10, end: 19}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy2_1_attack",
        frames: this.anims.generateFrameNumbers("fairy2_1", {start: 0, end: 8}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy2_2_idle",
        frames: this.anims.generateFrameNumbers("fairy2_2", {start: 10, end: 19}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy2_2_attack",
        frames: this.anims.generateFrameNumbers("fairy2_2", {start: 0, end: 8}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy3_idle",
        frames: this.anims.generateFrameNumbers("fairy3", {start: 9, end: 18}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy3_attack",
        frames: this.anims.generateFrameNumbers("fairy3", {start: 0, end: 7}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy3_1_idle",
        frames: this.anims.generateFrameNumbers("fairy3_1", {start: 9, end: 18}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy3_1_attack",
        frames: this.anims.generateFrameNumbers("fairy3_1", {start: 0, end: 7}),
        frameRate: 14,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy3_2_idle",
        frames: this.anims.generateFrameNumbers("fairy3_2", {start: 9, end: 18}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy3_2_attack",
        frames: this.anims.generateFrameNumbers("fairy3_2", {start: 0, end: 7}),
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
        key: "fairy4_1_idle",
        frames: this.anims.generateFrameNumbers("fairy4_1", {start: 7, end: 14}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy4_1_attack",
        frames: this.anims.generateFrameNumbers("fairy4_1", {start: 0, end: 5}),
        frameRate: 10,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy4_2_idle",
        frames: this.anims.generateFrameNumbers("fairy4_2", {start: 7, end: 14}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy4_2_attack",
        frames: this.anims.generateFrameNumbers("fairy4_2", {start: 0, end: 5}),
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

    this.anims.create({
        key: "fairy5_1_idle",
        frames: this.anims.generateFrameNumbers("fairy5_1", {start: 15, end: 24}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy5_1_attack",
        frames: this.anims.generateFrameNumbers("fairy5_1", {start: 0, end: 13}),
        frameRate: 17,
        repeat: 0,
    });

    this.anims.create({
        key: "fairy5_2_idle",
        frames: this.anims.generateFrameNumbers("fairy5_2", {start: 15, end: 24}),
        frameRate: 8,
        repeat: -1,
    });

    this.anims.create({
        key: "fairy5_2_attack",
        frames: this.anims.generateFrameNumbers("fairy5_2", {start: 0, end: 13}),
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


    // 홀 애니메이션

    this.anims.create({
        key: "new_hole",
        frames: this.anims.generateFrameNumbers("new_hole", {start: 0, end: 2}),
        frameRate: 6,
        repeat: -1,
    });

    this.anims.create({
        key: "hole_damage",
        frames: this.anims.generateFrameNumbers("new_hole", {start: 3, end: 7}),
        frameRate: 12,
        repeat: 0,
    })

    //cointext start
    // cointext = this.add.text(500, 20, 'coin: 0', {font: 'Bold 15px Arial', fill: '#fff', fontStyle: "strong"}).setScrollFactor(0);
    // cointext.setStroke('#000', 2);
    // cointext.setDepth(2);
    //cointext end

    //enemy start

    bossSet = this.physics.add.group();
    bossMagicSet = this.physics.add.group();
    monsterSet = this.physics.add.group();
    magics = this.physics.add.group();
    towerAttacks = this.physics.add.group();
    towerSkillAttacks = this.physics.add.group();
    mines = this.physics.add.group();

    // 임시 구멍
    hole = this.physics.add.sprite(0, 0, "new_hole").play('new_hole');
    hole.setScale(2.3);
    hw = hole.body.halfWidth;
    hh = hole.body.halfHeight;
    hole.setCircle(hw * 0.7, hh - hw * 0.7, hh - hw * 0.7);
    hole.hp = 500;
    hole.setDepth(1);
    ingameUi();

    this.physics.add.collider(player, bossSet, player.hitPlayer);
    this.physics.add.collider(bossSet, monsterSet);
    thisScene.physics.add.overlap(magics, bossSet, attack);
    thisScene.physics.add.overlap(bossMagicSet, player, player.hitPlayer);

    // 만약 유저와 몬스터가 닿았다면 (hitplayer 함수 실행)
    this.physics.add.collider(player, monsterSet, player.hitPlayer);
    thisScene.physics.add.overlap(magics, monsterSet, attack);
    // 만약 몬스터와 구멍이 닿았다면 (hitHole 함수 실행)
    thisScene.physics.add.overlap(hole, monsterSet, hitHole);
    thisScene.physics.add.overlap(hole, bossSet, destroyHole);
    //map start
    let snappedChunkX =
        this.chunkSize *
        this.tileSize *
        Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
    let snappedChunkY =
        this.chunkSize *
        this.tileSize *
        Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

    for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
        for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
            let existingChunk = getChunk(x, y);

            if (existingChunk == null) {
                let newChunk = new Chunk(this, x, y);
                chunks.push(newChunk);
            }
        }
    }
    for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];

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

    for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];

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

    // 공격 맞은 후 일시 무적에 사용
    timer = this.time.addEvent({
        delay: 2000,
        callback: () => {
            player.invincible = false;
            player.body.checkCollision.none = false;
            player.setVisible(true);
        },
        loop: true,
    });

    // ============== 몬스터 스프라이트 애니메이션 목록 ==================
    this.anims.create({
        key: "alien",
        frames: this.anims.generateFrameNumbers("alien", {start: 9, end: 14}),
        frameRate: 3,
        repeat: -1, // -1은 무한 반복 의미

    });


    this.anims.create({
        key: "worm",
        frames: this.anims.generateFrameNumbers("worm", {start: 0, end: 2}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "alienPlus",
        frames: this.anims.generateFrameNumbers("alienPlus", {start: 9, end: 14}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "wormPlus",
        frames: this.anims.generateFrameNumbers("wormPlus", {start: 0, end: 2}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "sonic",
        frames: this.anims.generateFrameNumbers("sonic", {start: 0, end: 1}),
        frameRate: 4,
        repeat: -1,
    });

    this.anims.create({
        key: "turtle",
        frames: this.anims.generateFrameNumbers("turtle", {start: 0, end: 1}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "slime",
        frames: this.anims.generateFrameNumbers("slime", {start: 7, end: 14}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("fly", {start: 0, end: 2}),
        frameRate: 3,
        repeat: -1,
    });
// boss

    this.anims.create({
        key: "slimeKing",
        frames: this.anims.generateFrameNumbers("slimeKing", {start: 0, end: 2}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "golem",
        frames: this.anims.generateFrameNumbers("golem", {start: 0, end: 2}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "fireGiant",
        frames: this.anims.generateFrameNumbers("fireGiant", {start: 0, end: 2}),
        frameRate: 3,
        repeat: -1,
    });

    this.anims.create({
        key: "monster_die",
        frames: this.anims.generateFrameNumbers("monster_die", {start: 0, end: 5}),
        frameRate: 12,
        repeat: -1,
    });

    this.anims.create({
        key: "fireGiantAura",
        frames: this.anims.generateFrameNumbers("fireGiantAura", {start: 0, end: 5}),
        frameRate: 12,
        repeat: -1,
    });
    //enemy end

    //tower start

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
//cattower animation end

  towerLU = new CatTower(this, -140, -140, "0_idle", "can", "skill", 0);
  towerRU = new CatTower(this, 140, -140, "0_idle", "can", "skill", 0);
  towerLD = new CatTower(this, -140, 140, "0_idle", "can", "skill", 0);
  towerRD = new CatTower(this, 140, 140, "0_idle", "can", "skill", 0);
  towerLU.scale_Circle();
  towerRU.scale_Circle();
  towerLD.scale_Circle();
  towerRD.scale_Circle();

    towerLU.scale = 2;
    towerRU.scale = 2;
    towerLD.scale = 2;
    towerRD.scale = 2;

    towerLU.setDepth(1);
    towerRU.setDepth(1);
    towerLD.setDepth(1);
    towerRD.setDepth(1);


    //tower end

    //mine start
    for (let i = 0; i < mineCount[mineshowtime]; i++) {
        let x =
            Math.random() *
            (EndMineRangeX[mineshowtime] - StartMineRangeX[mineshowtime]) +
            StartMineRangeX[mineshowtime];
        let y =
            Math.random() *
            (EndMineRangeY[mineshowtime] - StartMineRangeY[mineshowtime]) +
            StartMineRangeY[mineshowtime];
        mine = new Mine(this, x, y, "mine", 0);
        mine.scale_Circle();
        mines.add(mine);
    }
      //mine end

    // ##보스 생성, 나중에 타이머 조건 넣고 업데이트에 넣기 ##

    //navi start
    navi = this.add.image(58, 80, "navi").setScrollFactor(0).setScale(1);
    navi.setDepth(4);
    //navi end

    //exp bar start
    expBar = this.add.graphics().setScrollFactor(0);
    expBarBG = this.add.graphics().setScrollFactor(0);
    expBar.setDepth(4);
    expBarBG.setDepth(3);

    this.cameras.main.ignore([expBar, expBarBG, navi]);

    //exp bar end
    // hp bar start
    hpBar = this.add.graphics();
    hpBarBG = this.add.graphics();
    hpBar.setDepth(5);
    hpBarBG.setDepth(4);
    // hp bar end

    this.cameras.main.setZoom(0.8);
    UICam.setZoom(1);
}

function update(time, delta) {
    frameTime += delta;
    player.move();
    //  Health bar start
    hpBar.clear();

    hpBarBG.fillStyle(0xff0000);
    hpBarBG.fillRect(0, 0, 60, 10);

    hpBar.fillStyle(0x2ff40a);
    hpBar.fillRect(0, 0, 60 * (player.health / player.maxHealth), 10);

    hpBar.setPosition(Math.floor(player.x) - 30, Math.floor(player.y) + 40);
    hpBarBG.setPosition(Math.floor(player.x) - 30, Math.floor(player.y) + 40);
    // expBar.setPosition(Math.floor(player.x)-375, Math.floor(player.y) - 372);
    // expBarBG.setPosition(Math.floor(player.x)-375, Math.floor(player.y) - 372);
    // Health bar end
    if (frameTime > 16.5) {
        frameTime = 0;

        let snappedChunkX =
            this.chunkSize *
            this.tileSize *
            Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
        let snappedChunkY =
            this.chunkSize *
            this.tileSize *
            Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

        snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
        snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

        for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
            for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
                let existingChunk = getChunk(x, y);

                if (existingChunk == null) {
                    let newChunk = new Chunk(this, x, y);
                    chunks.push(newChunk);
                }
            }
        }
        for (let i = 0; i < chunks.length; i++) {
            let chunk = chunks[i];

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

        this.cameras.main.startFollow(player, false);
        UICam.startFollow(player, false);
        //map end

        //navi start

        navi.rotation = Phaser.Math.Angle.Between(
            hole.x,
            hole.y,
            player.x,
            player.y
        );

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

                if (
                    monsterSet.children.entries[i].type === "follower" ||
                    monsterSet.children.entries[i].type === "wave"
                ) {
                    this.physics.moveToObject(
                        monsterSet.children.entries[i],
                        player,
                        monsterSet.children.entries[i].velocity
                    );
                }
                // 몬스터가 홀에 도달하게 함
                else if (monsterSet.children.entries[i].type === "siege") {
                    this.physics.moveToObject(
                        monsterSet.children.entries[i],
                        hole,
                        monsterSet.children.entries[i].velocity
                    );
                }
            }
        }

        if (hole.hp <= 0) {
            $this.pause();
            updateHP();
            GameOver();
        }

        gameTimer+=3;
        UpdateTimer();

        // 플레이어 기준랜덤 위치에 몬스터 생성
        // 생성규칙: 몬스터이름, 애니메이션, 체력, 속도, x,y,타입,딜레이
        // monsterSpawn 초기값은 300
        if (gameTimer > 300 && gameTimer % monsterSpawn === 0) {
            // 1번 zombie
            enemySpawn(randomLocation);
            if (10800 < gameTimer && gameTimer <= 18000) {
                addMonster(this, "alienPlus", "alienPlus", 70, 55, monX, monY, "follower");
            } else if (18000 < gameTimer) {
                addMonster(this, "alienPlus", "alienPlus", 130, 75, monX, monY, "follower");
            } else {
                addMonster(this, "alien", "alien", 30, 45, monX, monY, "follower");
            }
        }
        if (gameTimer > 6000 && gameTimer % 240 === 0) {
            // 2번 worm
            siegeSpawn(randomLocation);
            if (12000 < gameTimer && gameTimer <= 18000) {
                addMonster(this, "wormPlus", "wormPlus", 100, 50, monX, monY, "siege");
            } else if (18000 < gameTimer) {
                addMonster(this, "wormPlus", "wormPlus", 160, 60, monX, monY, "siege");
            } else if (gameTimer <= 12000) {
                addMonster(this, "worm", "worm", 40, 40, monX, monY, "siege");
            }
        }
        if (gameTimer > 12000 && gameTimer % 300 === 0) {
            enemySpawn(randomLocation);
            addMonster(this, "sonic", "sonic", 150, 80, monX, monY, "follower");
        }
        if (gameTimer > 21000 && gameTimer % 600 === 0) {
            siegeSpawn(randomLocation);
            addMonster(this, "turtle", "turtle", 300, 50, monX, monY, "siege");
        }

        if (gameTimer > 18000 && gameTimer % 200 === 0) {
            enemySpawn(randomLocation);
            addMonster(this, "slime", "slime", 240, 75, monX, monY, "follower");
        }
        // 몬스터 빅 웨이브
        if (gameTimer > 8000 && gameTimer < 8300 && gameTimer % 3 === 0) {
            enemySpawn(randomLocation);
            addMonster(this, "fly", "fly", 10, 50, monX, monY, "wave");
        } else if (20000 < gameTimer && gameTimer < 21000 && gameTimer % 3 === 0) {
            enemySpawn(randomLocation);
            addMonster(this, "fly", "fly", 100, 50, monX, monY, "wave");
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

        // 슬라임
        if (gameTimer === 10800) {
            setSound.playSE(13);

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
    
      slimeKing.setCircle(mh / 2, mw - (mh / 2), mw);
      bossSet.add(slimeKing);
    }

        // 골렘
        if (gameTimer === 21000) {
            setSound.playSE(14);

            golem = new Boss(
                this,
                500,
                30,
                hole.x + 2000,
                hole.y - 2000,
                "golem",
                "golem",
                3,
                10,
                "boss"
            );
            golem.setDepth(2);
            golem.anime(player);
            bossActive = true;
            let mw = golem.body.halfWidth;
            let mh = golem.body.halfHeight;
            golem.setCircle(mh / 2, mw - (mh / 2), mw);
            bossSet.add(golem);
        }

        // 불거인
        if (gameTimer === 28000) {
            setSound.playSE(15);

            fireGiant = new Boss(
                this,
                500,
                10,
                player.x - 60,
                player.y - 60,
                "fireGiant",
                "fireGiant",
                3,
                10,
                "boss"
            );
            let mw = fireGiant.body.halfWidth;
            let mh = fireGiant.body.halfHeight;
            fireGiant.setCircle(mh / 2, mw - (mh / 2), mw);
            fireGiant.setDepth(6);
            fireGiant.anime(player);
            bossActive = true;
            bossFireGiantActive = true;
            bossSet.add(fireGiant);
            fireGiantIndex = bossSet.children.entries.length - 1;
        }

        if (gameTimer === 28000) {
            fireGiantAura = new Boss(
                this,
                10000,
                1000,
                player.x - 60,
                player.y - 60,
                "fireGiantAura",
                "fireGiantAura",
                1,
                10,
                "boss"
            );
            let mw = fireGiantAura.body.halfWidth;
            let mh = fireGiantAura.body.halfHeight;
            fireGiantAura.setCircle(mh / 2, mw - (mh / 2), mw);
            fireGiantAura.setDepth(5);
            fireGiantAura.anime();
            bossMagicSet.add(fireGiantAura);
        }

        if (bossFireGiantActive && (gameTimer % 120 == 0)) {
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
                gameTimer / 120,
                10,
                "boss"
            );
            bossMagicSet.children.entries[0].destroy();
            let mw = aura.body.halfWidth;
            let mh = aura.body.halfHeight;
            aura.setCircle(mh / 2, mw - (mh / 2), mw - (mh / 2));
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
                if (bossSet.children.entries[i].bossSpecie !== "golem") {
                    this.physics.moveToObject(
                        bossSet.children.entries[i],
                        player,
                        bossSet.children.entries[i].velocity
                    );
                    if (bossSet.children.entries[i].bossSpecie === "fireGiant") {
                        if (bossFireGiantActive) {
                            this.physics.moveToObject(
                                bossMagicSet.children.entries[0],
                                bossSet.children.entries[i],
                                bossMagicSet.children.entries[0].velocity
                            );
                        }
                    }
                } else if (bossSet.children.entries[i].bossSpecie === "golem") {
                    this.physics.moveToObject(
                        bossSet.children.entries[i],
                        hole,
                        bossSet.children.entries[i].velocity
                    );
                }
                if (bossSet.children.entries[i].health <= 0) {
                    for (let i = 0; i < 5; i++) {
                        player.expUp();
                    }
                    if (bossSet.children.entries[i].bossSpecie !== "slimeKing") {
                        global.coin += 10;
                    } else global.coin += 2;
                    if (bossSet.children.entries[i].bossSpecie === "slimeKing") {
                        slimePattern(
                            this,
                            bossSet.children.entries[i].pt,
                            bossSet.children.entries[i].x,
                            bossSet.children.entries[i].y
                        );
                    }

                    if (bossSet.children.entries[i].bossSpecie === "fireGiant") {
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

        for (let i = magics.length - 1; i >= 0; i--) {
            magics[i].timer++;
            if (magics[i].timer === magics[i].lifetime) {
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
        expBar.clear();

        //  BG
        expBarBG.fillStyle(0x000000);
        expBarBG.fillRect(0, 0, UICam.worldView.width, 16); // x y 가로길이, 세로길이

        expBar.fillStyle(0xff0000);
        expBar.fillRect(
            0,
            0,
            UICam.worldView.width * (player.exp / player.maxExp),
            16
        );
    } //exp bar end
    UICam.ignore([
        player,
        bossSet,
        fairySet,
        monsterSet,
        hpBar,
        hpBarBG,
        hole,
        towerLD,
        towerLU,
        towerRD,
        towerRU,
        magics,
        mines,
        towerAttacks,
        towerSkillAttacks,
        bossMagicSet,
    ]);

    if (gameTimer % 3600 === 0) {
        ++mineshowtime;
        for (let i = 0; i < mineCount[mineshowtime]; i++) {
            let x =
                Math.random() *
                (EndMineRangeX[mineshowtime] - StartMineRangeX[mineshowtime]) +
                StartMineRangeX[mineshowtime];
            let y =
                Math.random() *
                (EndMineRangeY[mineshowtime] - StartMineRangeY[mineshowtime]) +
                StartMineRangeY[mineshowtime];
            mine = new Mine(this, x, y, "mine", 0);
            mine.scale_Circle();
            mines.add(mine);
        }
        console.log(mines);
    }

    if (!towerLU.anims.isPlaying) {
        console.log(towerLU.stone)
        towerLU.anims.play(`${towerLU.stone}_idle`, true);
    }
    if (!towerLD.anims.isPlaying) {
        towerLD.anims.play(`${towerLD.stone}_idle`, true);
    }
    if (!towerRU.anims.isPlaying) {
        towerRU.anims.play(`${towerRU.stone}_idle`, true);
    }
    if (!towerRD.anims.isPlaying) {
        towerRD.anims.play(`${towerRD.stone}_idle`, true);
    }

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
        fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
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
        fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
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
        fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
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
        fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
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
        fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
    }

    if (!fairySet[nowFairy].anims.isPlaying) {
        fairySet[nowFairy].anims.play(fairySet[nowFairy].idleKey, true);
    }
}

function attack(magic, monster) {
    if (!monster.invincible) {
        setSound.playSE(12);

        if (magic.pierceCount > 0) {
            magic.pierceCount--;
        } else {
            magic.destroy();
        }

        if (nowFairy === 3) {
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
                    monster.dieAnim();
                    monster.destroy();
                    player.expUp();
                    monsterCount -= 1;
                } else if (monster.monSpecie === "slime") {
                    for (let i = 0; i < 2; i++) {
                        addMonster(
                            thisScene,
                            "babySlime",
                            "slime",
                            150,
                            125,
                            monster.x + i * 10,
                            monster.y,
                            "follower"
                        );
                    }
                    monster.destroy();
                    monsterCount -= 1;
                }
            }
        }
        if (magic.fairy.stun > 0) {
            monster.cc = "earth";
        }

        monster.invincible = true;
        monster.health -= magic.fairy.dmg * player.dmgMul;

        if (monster.health <= 0 && monster.type !== "boss") {
            if (monster.monSpecie !== "slime") {
                monster.dieAnim();
                monster.destroy();
                player.expUp();
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
            } else if (monster.monSpecie === "slime") {
                for (let i = 0; i < 2; i++) {
                    addMonster(
                        thisScene,
                        "babySlime",
                        "slime",
                        150,
                        125,
                        monster.x + i * 20,
                        monster.y,
                        "follower"
                    );
                }
                monster.destroy();
                monsterCount -= 1;
            }
        }
    }
}

// 임시 구멍 구현
function hitHole(hole, monster) {
    if (monster.type === "wave" || monster.type === "follower") {
        return;
    }
    hole.hp -= 1;
    updateHP();
    monster.destroy();
    monsterCount -= 1;
    hole
        .play('hole_damage')
    thisScene.time.addEvent({
        delay: 600,
        callback: () => {
            hole
                .play('new_hole')
        },
        loop: false,
    });
}

function addMonster(scene, mon_name, monAnime, hp, velo, x, y, type) {
    monster = new Enemy(scene, hp, velo, x, y, mon_name, monAnime, type).setInteractive({cursor: 'url(images/cursor/aimHover.png), pointer'});
    if (monster.monSpecie === "babySlime") {
        monster.scale = 2;
    } else if (monster.monSpecie === 'alien' || monster.monSpecie === 'alienPlus' || monster.monSpecie === 'fly') {
        monster.scale = 2.5;
    } else if (monster.monSpecie === 'turtle' || monster.monSpecie === 'sonic' || monster.monSpecie === 'slime') {
        monster.scale = 3;
    }
    monster.setDepth(2);
    monsterCount += 1;
    let mw = monster.body.halfWidth;
    let mh = monster.body.halfHeight;

  monster.setCircle(mh / 2, mw - (mh / 2), mw);
  monsterSet.add(monster);
  scene.physics.add.collider(monsterSet, monster);
  monster.anime(player);
}

function destroyHole(hole, golem) {
    if (golem.bossSpecie === "golem") {
        hole.hp -= 9999;
        golem.destroy();
    }
}

function siegeSpawn() {
    randomLocation = Math.floor(Math.random() * 4) + 1;
    if (randomLocation === 1) {
        monX = Phaser.Math.Between(hole.x - 1500, hole.x + 1500);
        monY = Phaser.Math.Between(hole.y + 1500, hole.y + 1510);
    } else if (randomLocation === 2) {
        monX = Phaser.Math.Between(hole.x - 1500, hole.x + 1500);
        monY = Phaser.Math.Between(hole.y - 1500, hole.y - 1510);
    } else if (randomLocation === 3) {
        monX = Phaser.Math.Between(hole.x - 1500, hole.x - 1500);
        monY = Phaser.Math.Between(hole.y - 1500, hole.y + 1500);
    } else if (randomLocation === 4) {
        monX = Phaser.Math.Between(hole.x + 1500, hole.x + 1500);
        monY = Phaser.Math.Between(hole.y - 1500, hole.y + 1500);
    }
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

function slimePattern(scene, pt, x, y) {
    if (pt !== 16) {
        pt *= 2;
        for (let i = 0; i < 2; i++) {
            // 분열될 때마다 체력 감소 구현하기
            if (pt < 4) {
                slimeKing = new Boss(
                    scene,
                    200,
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
                    100,
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
                    50,
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
            slimeKing.setCircle(mh / 2, mw - (mh / 2), mw);
            bossSet.add(slimeKing);
        }
    }
}

//enemy end

//map start
function getChunk(x, y) {
    let chunk = null;
    for (let i = 0; i < chunks.length; i++) {
        if (chunks[i].x === x && chunks[i].y === y) {
            chunk = chunks[i];
        }
    }
    return chunk;
}

//map end
