import Fairy from './GameObj/fairy';
import Magic from './GameObj/magic';
import Player from './GameObj/player';
import Enemy from './GameObj/enemy';

export const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    scene: {
        //scene 제어에
        preload: preload,
        create: create,
        update: update,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
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
let nowFairy = 0;
let fairySet = [, , , , ,];
let fairy;

// 공격 및 공격 딜레이 관련
let control = false;
let normalAttackTimer = 0;
let normalAttackAS = 20;
let magic;
let magics = [];
export let cursors;
let gameOver = false;
let scoreText;
// 마우스 포인터 관련
let input;
let mouse;
//player end

//map start
let map;
export let mapSize = 16000;
let camera;
let backGroundLayer;
let portalLayer;
let wallLayer;
let stage1Layer;
let stage2Layer;
let stage3Layer;
let stage4Layer;
let controls;
//map end

//enemy start

// 몬스터 변수 선언
let alienSet;
let alien;
let target;
let mon1Delay = 0;
let mon1X;
let mon1Y;
global.alienCount = 0;
let randomLocation;
let invincible = false;
let timer;

// 몬스터 이미지

//enemy end

function preload() {
    //map start
    this.load.image("tiles", "images/map/tiles.png");
    this.load.image("tiles2", "images/map/tiles2.png");
    this.load.tilemapTiledJSON("map", "images/map/resources.tmj");
    this.load.image("j1", "images/mine/j1.png");
    this.load.image("j2", "images/mine/j2.png");
    this.load.image("j3", "images/mine/j3.png");
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
        "images/attack/weapon/12_nebula_spritesheet.png",
        {
            frameWidth: 100,
            frameHeight: 100,
            endFrame: 61,
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
        "images/attack/weapon/20_magicbubbles_spritesheet.png",
        {frameWidth: 100, frameHeight: 100, endFrame: 61}
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
        {frameWidth: 32, frameHeight: 32}
    );
    //enemy end
}

function create() {

    //map start
    this.cameras.main.setBounds(0, 0, mapSize, mapSize);
    this.physics.world.setBounds(0, 0, mapSize, mapSize);
    map = this.make.tilemap({key: "map"}); //map을 키로 가지는 JSON 파일 가져와 적용하기
    const tileset = map.addTilesetImage("Tiles", "tiles"); //그릴떄 사용할 타일 이미지 적용하기
    const tileset2 = map.addTilesetImage("tiles2", "tiles2"); //그릴떄 사용할 타일 이미지 적용하기
    backGroundLayer = map.createDynamicLayer("background", tileset); //레이어 화면에 뿌려주기
    portalLayer = map.createDynamicLayer("portal", tileset2); //레이어 화면에 뿌려주기
    wallLayer = map.createDynamicLayer("wall", tileset2);
    stage1Layer = map.createDynamicLayer("stage1", tileset2);
    stage2Layer = map.createDynamicLayer("stage2", tileset);
    stage3Layer = map.createDynamicLayer("stage3", tileset2);
    stage4Layer = map.createDynamicLayer("stage4", tileset2);

    stage3Layer.setCollisionByProperty({collides: true});
    // const debugGraphics = this.add.graphics().setAlpha(0.7);
    // stage3Layer.renderDebug(debugGraphics, {
    //   tileColor: null,
    // })

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
    });
    // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);

    //map end

    //player start
    cats = require('./jsons/cats.json');
    fairySet = require('./jsons/fairys.json');
    console.log(cats);
    player = cats[catNumber];
    player = new Player(this, 1, 100, 100);
    console.log(player);
    console.log(player)
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
    fairySet[0] = new Fairy(this, 100, 10, 1, 360, 60, 10, 100, 1, player);
    fairySet[1] = new Fairy(this, 100, 10, 1, 300, 70, 10, 20, 2, player);
    fairySet[2] = new Fairy(this, 100, 10, 1, 240, 80, 10, 300, 3, player);
    fairySet[3] = new Fairy(this, 100, 10, 1, 180, 90, 10, 400, 4, player);
    fairySet[4] = new Fairy(this, 100, 10, 1, 120, 100, 10, 500, 5, player);
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

    this.anims.create({
        key: "turn",
        frames: this.anims.generateFrameNumbers("cat1", {start: 0, end: 0}),
        frameRate: 10,
    });
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("cat1", {start: 1, end: 7}),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("cat1", {start: 1, end: 7}),
        frameRate: 10,
        repeat: -1,
    });


    // 공격 애니메이션
    this.anims.create({
        key: "magic1",
        frames: this.anims.generateFrameNumbers("magic1", {
            start: 0,
            end: 30,
            first: 0,
        }),
        frameRate: 200,
        repeat: -1,
    });
    this.anims.create({
        key: "magic2",
        frames: this.anims.generateFrameNumbers("magic2", {
            start: 0,
            end: 30,
            first: 0,
        }),
        frameRate: 200,
        repeat: -1,
    });
    this.anims.create({
        key: "magic3",
        frames: this.anims.generateFrameNumbers("magic3", {
            start: 0,
            end: 30,
            first: 0,
        }),
        frameRate: 200,
        repeat: -1,
    });
    this.anims.create({
        key: "magic4",
        frames: this.anims.generateFrameNumbers("magic4", {
            start: 0,
            end: 30,
            first: 0,
        }),
        frameRate: 200,
        repeat: -1,
    });
    this.anims.create({
        key: "magic5",
        frames: this.anims.generateFrameNumbers("magic5", {
            start: 0,
            end: 30,
            first: 0,
        }),
        frameRate: 200,
        repeat: -1,
    });

    fairySet[nowFairy].play("fairy" + (nowFairy + 1) + "_idle", true);

    //player end

    //map start
    let j1;

    for (let i = 0; i < 5; i++) {
        let x = Phaser.Math.Between(400, 600);
        let y = Phaser.Math.Between(400, 600);

        j1 = this.physics.add.sprite(x, y, "j1");
        j1.body.immovable = true;

        this.physics.add.collider(player, j1);
    }

    console.log(j1);

    // this.physics.add.overlap(player, portalLayer);

    player.setPosition(8000, 8000); //width, height
    this.physics.add.collider(player, stage3Layer);
    camera.startFollow(player, false);
    //map end

    //enemy start

    alienSet = this.physics.add.group();

    // 만약 유저와 몬스터가 닿았다면 (hitplayer 함수 실행)
    this.physics.add.overlap(player, alienSet, player.hitPlayer);

    this.anims.create({
        key: 'swarm',
        frames: this.anims.generateFrameNumbers('alien', {start: 0, end: 1}),
        frameRate: 2,
        repeat: -1
    })

    // 공격 맞은 후 일시 무적에 사용
    timer = this.time.addEvent({
        delay: 2000, callback: () => {
            player.invincible = false
        }, loop: true
    });

    //enemy end
}

function update(time, delta) {
    //player start
    changeSlot();

    if (normalAttackTimer === normalAttackAS) {
        normalAttackTimer = 0;
        control = false;
    } else {
        normalAttackTimer++;
    }
    // fairy.anims.playAfterRepeat('fairy1_idle');
    //mouse clicked
    if (mouse.leftButtonDown() && !control) {
        magicFire(this);
    }
    player.move();
    //player end

    //map start

    // let tile = map.getTileAt(map.worldToTileX(player.x), map.worldToTileY(player.y));

    // if (tile) {
    //   console.log('' + JSON.stringify(tile.properties))
    // }

    //map end

    //enemy start

    if (alienCount !== 0) {
        for (let i = 0; i < alienSet.children.entries.length; i++) {
            // console.log(this.physics.moveToObject(monsters[i], player, 100))
            // if ()
            this.physics.moveToObject(alienSet.children.entries[i], player, alienSet.children.entries[i].velo);

        }

    }

    mon1Delay++;


// 랜덤 위치에 몬스터 생성 (추후 player.x 및 y 좌표 기준 생성으로 변경)
    if (mon1Delay > 60) {
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


        alien = new Enemy(this, 10, 100, mon1X, mon1Y, 'alien', 'swarm');
        alienCount += 1;
        mon1Delay = 0;
        alienSet.add(alien);
        this.physics.add.collider(alienSet, alien);
        alien.anime(alien);
    }
    for (let i = magics.length - 1; i >= 0; i--) {
        magics[i].timer++;
        if (magics[i].timer === magics[i].lifeTime) {
            magics[i].destroy();
            magics.splice(i, 1);
        }
    }

    //enemy end

}

//player start

// 플레이어 공격
let magicFire = function (game) {
    // 게임에서 외부 UI 연관 테스트

    //for fire again
    magic = new Magic(game, fairySet[nowFairy].range, fairySet[nowFairy]);
    magics.push(magic);
    // console.log(magic);
    // console.log(magic.body);
    game.physics.add.overlap(magic, alienSet, attack, null, this);
    // magic.body.setCircle(45);

    /*충돌관련 하드코딩 된 부분 나중에 수정 */
    magic.body.width = 50;
    magic.body.height = 50;
    magic.body.offset.x = 25;
    magic.body.offset.y = 25;
    normalAttackTimer = 0;
    fairySet[nowFairy].anims.play("fairy" + (nowFairy + 1) + "_attack", true);

    let angle = Phaser.Math.Angle.Between(
        fairySet[nowFairy].x,
        fairySet[nowFairy].y,
        input.x + camera.scrollX,
        input.y + camera.scrollY
    );

    // 각도 계산 공식
    angle = ((angle + Math.PI / 2) * 180) / Math.PI + 90;
    magic.rotation += (angle - 180) / 60 - 1.5;
    magic.anims.play("magic" + (nowFairy + 1), true);

    //move to mouse position
    game.physics.moveTo(
        magic,
        input.x + camera.scrollX,
        input.y + camera.scrollY,
        fairySet[nowFairy].velo
    );
    control = true;
};

function changeSlot() {
    if (
        cursors.slot1.isDown &&
        nowFairy !== 0 &&
        /idle/.test(fairySet[nowFairy].anims.currentAnim.key)
    ) {
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
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
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
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
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
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
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
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
        fairySet[nowFairy].x = -100;
        fairySet[nowFairy].y = -100;
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
    // magic.destroy();
    if (!alien.invincible) {
        alien.health -= 1
        alien.invincible = true;
        if (alien.health === 0) {
            alien.destroy();
            alienCount -= 1;
        }
    }

}


//enemy end
