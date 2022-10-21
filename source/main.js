const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  scene: { //scene 제어에 
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
};

//player start
var player;
// 요정
var now_fairy = 2;
var fairys = [, , , , ,];
var fairy;

// 공격 및 공격 딜레이 관련
var control = false;
var timer = 0;
var magic;

var cursors;
var gameOver = false;
var scoreText;
// 마우스 포인터 관련
var input;
var mouse;
//player end

//map start
var map;
var camera;
var backgroundLayer;
var portalLayer;
var wallLayer;
var stage1Layer;
var stage2Layer;
var stage3Layer;
var stage4Layer;
let controls;
//map end


//enemy start

//enemy end

var game = new Phaser.Game(config);

function preload() {
  //map start
  this.load.image("tiles", "./tiles.png");
  this.load.image("tiles2", "./tiles2.png");
  this.load.tilemapTiledJSON("map", "resources.tmj");
  this.load.image('j1', 'j1.png');
  this.load.image('j2', 'j2.png');
  this.load.image('j3', 'j3.png');
  //map end

  //player start
  // 플레이어 스프라이트
  this.load.spritesheet('dude', 'assets/cat1.png', { frameWidth: 96, frameHeight: 100 });

  // 공격 스프라이트
  this.load.spritesheet('magic1', 'assets/attack/16_sunburn_spritesheet.png', { frameWidth: 100, frameHeight: 100, endFrame: 61 });
  this.load.spritesheet('magic2', 'assets/attack/12_nebula_spritesheet.png', { frameWidth: 100, frameHeight: 100, endFrame: 61 });
  this.load.spritesheet('magic3', 'assets/attack/18_midnight_spritesheet.png', { frameWidth: 100, frameHeight: 100, endFrame: 61 });
  this.load.spritesheet('magic4', 'assets/attack/2_magic8_spritesheet.png', { frameWidth: 100, frameHeight: 100, endFrame: 61 });
  this.load.spritesheet('magic5', 'assets/attack/20_magicbubbles_spritesheet.png', { frameWidth: 100, frameHeight: 100, endFrame: 61 });
  // 요정 스프라이트
  this.load.spritesheet('fairy1', 'assets/fairy1.png', { frameWidth: 150, frameHeight: 142 });
  this.load.spritesheet('fairy2', 'assets/fairy2.png', { frameWidth: 230, frameHeight: 210 });
  this.load.spritesheet('fairy3', 'assets/fairy3.png', { frameWidth: 134, frameHeight: 158 });
  this.load.spritesheet('fairy4', 'assets/fairy4.png', { frameWidth: 136, frameHeight: 170 });
  this.load.spritesheet('fairy5', 'assets/fairy5.png', { frameWidth: 160, frameHeight: 190 });
  //player end


  //enemy start

  //enemy end

}

function create() {

  //map start
  this.cameras.main.setBounds(0, 0, 16000, 16000);
  this.physics.world.setBounds(0, 0, 16000, 16000);
  map = this.make.tilemap({ key: "map" }); //map을 키로 가지는 JSON 파일 가져와 적용하기
  const tileset = map.addTilesetImage("Tiles", "tiles"); //그릴떄 사용할 타일 이미지 적용하기
  const tileset2 = map.addTilesetImage("tiles2", "tiles2"); //그릴떄 사용할 타일 이미지 적용하기
  backgroundLayer = map.createDynamicLayer("background", tileset); //레이어 화면에 뿌려주기
  portalLayer = map.createDynamicLayer("portal", tileset2); //레이어 화면에 뿌려주기
  wallLayer = map.createDynamicLayer("wall", tileset2);
  stage1Layer = map.createDynamicLayer("stage1", tileset2);
  stage2Layer = map.createDynamicLayer("stage2", tileset);
  stage3Layer = map.createDynamicLayer("stage3", tileset2);
  stage4Layer = map.createDynamicLayer("stage4", tileset2);

  stage3Layer.setCollisionByProperty({ collides: true });
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
  camera = this.cameras.main;
  input = this.input;
  mouse = input.mousePointer;

  // 플레이어, 요정 로딩
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.setScale(1);
  fairys[0] = this.add.sprite(-100, -100, 'fairy1');
  fairys[1] = this.add.sprite(-100, -100, 'fairy2');
  fairys[2] = this.add.sprite(-100, -100, 'fairy3');
  fairys[3] = this.add.sprite(-100, -100, 'fairy4');
  fairys[4] = this.add.sprite(-100, -100, 'fairy5');
  fairys[0].setScale(0.5);
  fairys[1].setScale(0.5);
  fairys[2].setScale(0.5);
  fairys[3].setScale(0.5);
  fairys[4].setScale(0.5);



  // animation
  this.anims.create({
    key: 'fairy1_idle',
    frames: this.anims.generateFrameNumbers('fairy1', { start: 12, end: 21 }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: 'fairy1_attack',
    frames: this.anims.generateFrameNumbers('fairy1', { start: 6, end: 10 }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'fairy2_idle',
    frames: this.anims.generateFrameNumbers('fairy2', { start: 10, end: 19 }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: 'fairy2_attack',
    frames: this.anims.generateFrameNumbers('fairy2', { start: 0, end: 8 }),
    frameRate: 12,
    repeat: 0
  });

  this.anims.create({
    key: 'fairy3_idle',
    frames: this.anims.generateFrameNumbers('fairy3', { start: 11, end: 19 }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: 'fairy3_attack',
    frames: this.anims.generateFrameNumbers('fairy3', { start: 0, end: 9 }),
    frameRate: 12,
    repeat: 0
  });

  this.anims.create({
    key: 'fairy4_idle',
    frames: this.anims.generateFrameNumbers('fairy4', { start: 7, end: 14 }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: 'fairy4_attack',
    frames: this.anims.generateFrameNumbers('fairy4', { start: 0, end: 5 }),
    frameRate: 8,
    repeat: 0
  });

  this.anims.create({
    key: 'fairy5_idle',
    frames: this.anims.generateFrameNumbers('fairy5', { start: 15, end: 24 }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: 'fairy5_attack',
    frames: this.anims.generateFrameNumbers('fairy5', { start: 0, end: 13 }),
    frameRate: 15,
    repeat: 0
  });

  this.anims.create({
    key: 'turn',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 0 }),
    frameRate: 10
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  // 공격 애니메이션
  this.anims.create({
    key: 'magic1',
    frames: this.anims.generateFrameNumbers('magic1', { start: 0, end: 30, first: 0 }),
    frameRate: 200,
    repeat: -1
  });
  this.anims.create({
    key: 'magic2',
    frames: this.anims.generateFrameNumbers('magic2', { start: 0, end: 30, first: 0 }),
    frameRate: 200,
    repeat: -1
  });
  this.anims.create({
    key: 'magic3',
    frames: this.anims.generateFrameNumbers('magic3', { start: 0, end: 30, first: 0 }),
    frameRate: 200,
    repeat: -1
  });
  this.anims.create({
    key: 'magic4',
    frames: this.anims.generateFrameNumbers('magic4', { start: 0, end: 30, first: 0 }),
    frameRate: 200,
    repeat: -1
  });
  this.anims.create({
    key: 'magic5',
    frames: this.anims.generateFrameNumbers('magic5', { start: 0, end: 30, first: 0 }),
    frameRate: 200,
    repeat: -1
  });

  fairys[now_fairy].play('fairy' + (now_fairy + 1) + '_idle', true);
  //player end

  //map start
  var j1;

  for (var i = 0; i < 5; i++) {
    var x = Phaser.Math.Between(400, 600);
    var y = Phaser.Math.Between(400, 600);

    j1 = this.physics.add.sprite(x, y, 'j1');
    j1.body.immovable = true;

    this.physics.add.collider(player, j1);
  }

  console.log(j1)


  // this.physics.add.overlap(player, portalLayer);

  player.setPosition(8000, 8000); //width, height
  this.physics.add.collider(player, stage3Layer);
  camera.startFollow(player, true);
  //map end


  //enemy start

  //enemy end
}

function update(time, delta) {

  //player start
  if (cursors.slot1.isDown && now_fairy !== 0 && /idle/.test(fairys[now_fairy].anims.currentAnim.key)) {
    fairys[now_fairy].x = -100;
    fairys[now_fairy].y = -100;
    now_fairy = 0;
    fairys[now_fairy].anims.play('fairy' + (now_fairy + 1) + '_idle', true);
  }

  if (cursors.slot2.isDown && now_fairy !== 1 && /idle/.test(fairys[now_fairy].anims.currentAnim.key)) {
    fairys[now_fairy].x = -100;
    fairys[now_fairy].y = -100;
    now_fairy = 1;
    fairys[now_fairy].anims.play('fairy' + (now_fairy + 1) + '_idle', true);
  }

  if (cursors.slot3.isDown && now_fairy !== 2 && /idle/.test(fairys[now_fairy].anims.currentAnim.key)) {
    fairys[now_fairy].x = -100;
    fairys[now_fairy].y = -100;
    now_fairy = 2;
    fairys[now_fairy].anims.play('fairy' + (now_fairy + 1) + '_idle', true);
  }

  if (cursors.slot4.isDown && now_fairy !== 3 && /idle/.test(fairys[now_fairy].anims.currentAnim.key)) {
    fairys[now_fairy].x = -100;
    fairys[now_fairy].y = -100;
    now_fairy = 3;
    fairys[now_fairy].anims.play('fairy' + (now_fairy + 1) + '_idle', true);
  }

  if (cursors.slot5.isDown && now_fairy !== 4 && /idle/.test(fairys[now_fairy].anims.currentAnim.key)) {
    fairys[now_fairy].x = -100;
    fairys[now_fairy].y = -100;
    now_fairy = 4;
    fairys[now_fairy].anims.play('fairy' + (now_fairy + 1) + '_idle', true);
  }


  if (!fairys[now_fairy].anims.isPlaying) {
    fairys[now_fairy].anims.play('fairy' + (now_fairy + 1) + '_idle', true);
  }

  if (timer == 60) {
    timer = 0;
    control = false;
  } else {
    timer++;
  }
  // fairy.anims.playAfterRepeat('fairy1_idle');
  //mouse clicked
  if (mouse.isDown && !control) {
    // 게임에서 외부 UI 연관 테스트


    //for fire again
    magic = this.physics.add.sprite(fairys[now_fairy].x, fairys[now_fairy].y, 'magic' + (now_fairy + 1));
    timer = 0;
    fairys[now_fairy].anims.play('fairy' + (now_fairy + 1) + '_attack', true);

    let angle = Phaser.Math.Angle.Between(fairys[now_fairy].x, fairys[now_fairy].y, input.x, input.y);
    angle = ((angle + Math.PI / 2) * 180 / Math.PI + 90);
    console.log((angle - 180) / 60);
    magic.rotation += (angle - 180) / 60 - 1.5;
    magic.anims.play('magic' + (now_fairy + 1), true);

    //move to mouse position
    this.physics.moveTo(magic, input.x, input.y, 500);
    control = true;

  }
  move();
  //player end



  //map start

  // var tile = map.getTileAt(map.worldToTileX(player.x), map.worldToTileY(player.y));

  // if (tile) {
  //   console.log('' + JSON.stringify(tile.properties))
  // }

  //map end



  //enemy start

  //enemy end
}


//player start
var move = function () {
  fairys[now_fairy].x = player.x - 30;
  fairys[now_fairy].y = player.y - 70;
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
    player.flipX = true;
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.flipX = false;
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-160);

    if (cursors.left.isDown) {
      player.anims.play('left', true);
    } else {
      player.anims.play('right', true);
    }

  } else if (cursors.down.isDown) {
    player.setVelocityY(+160);

    if (cursors.left.isDown) {
      player.anims.play('left', true);
    } else {
      player.anims.play('right', true);
    }

  } else {
    player.setVelocityY(0);
    if (!cursors.left.isDown && !cursors.right.isDown) {
      player.anims.play('turn', true);
    }
  }
}
//player end



//enemy start

//enemy end