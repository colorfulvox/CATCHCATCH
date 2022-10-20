const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
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
  scale: {
    zoom: 1
  }
};

//player start
var player;
var turn;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var input;
//player end

var map;
var camera;
var objectLayer;

var game = new Phaser.Game(config);
let controls;

function preload() {
  this.load.image("tiles", "./tiles.png");
  this.load.tilemapTiledJSON("map", "resources.tmj");

  //player start
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  this.load.image('1', 'assets/1.png');
  this.load.image('2', 'assets/2.png');
  this.load.image('3', 'assets/3.png');
  this.load.image('4', 'assets/4.png');
  this.load.image('5', 'assets/5.png');
  this.load.image('6', 'assets/6.png');
  this.load.image('7', 'assets/7.png');
  this.load.image('8', 'assets/8.png');
  //player end

  this.load.image('j1', 'j1.png');
  this.load.image('j2', 'j2.png');
  this.load.image('j3', 'j3.png');
}

function create() {
  this.cameras.main.setBounds(0, 0, 16000, 16000);
  this.physics.world.setBounds(0, 0, 16000, 16000);
  map = this.make.tilemap({ key: "map" }); //map을 키로 가지는 JSON 파일 가져와 적용하기
  const tileset = map.addTilesetImage("tiles", "tiles"); //그릴떄 사용할 타일 이미지 적용하기
  const worldLayer = map.createDynamicLayer("Tile Layer 1", tileset); //레이어 화면에 뿌려주기
  const portalLayer = map.createDynamicLayer("Tile Layer 2", tileset); //레이어 화면에 뿌려주기
  objectLayer = map.createDynamicLayer("Tile Layer 3", tileset); //레이어 화면에 뿌려주기


  worldLayer.setCollisionByProperty({ collides: true });
  const debugGraphics = this.add.graphics().setAlpha(0.7);
  worldLayer.renderDebug(debugGraphics, {
    tileColor: null,
  })

  camera = this.cameras.main;

  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  // // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);


  //player start
  turn = this.physics.add.sprite(80, 400, 'star');

  turn.setScale(0.2);
  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();
  input = this.input;

  // The player and its settings
  player = this.physics.add.sprite(100, 450, 'dude');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  //player end

  var j1;

  for (var i = 0; i < 5; i++) {
    var x = Phaser.Math.Between(10, 1000);
    var y = Phaser.Math.Between(10, 1000);

    j1 = this.physics.add.sprite(x, y, 'j1');
    j1.body.immovable = true;

    this.physics.add.collider(player, j1);
  }

  console.log(j1)


  this.physics.add.overlap(player, portalLayer);

  player.setPosition(200, 100); //width, height
  this.physics.add.collider(player, worldLayer);
  camera.startFollow(player, true);
}

function update(time, delta) {

  //player start
  rotation();
  move();
  //player enda

  var tile = map.getTileAt(map.worldToTileX(player.x), map.worldToTileY(player.y));

  if (tile) {
    console.log('' + JSON.stringify(tile.properties))
  }
}

//player start
var rotation = function () {
  let angle = Phaser.Math.Angle.Between(turn.x, turn.y, input.x, input.y);
  //rotation cannon
  // turn.setRotation(angle);
  angle = ((angle + Math.PI / 2) * 180 / Math.PI + 90);

  turn.x = player.x - 20;
  turn.y = player.y - 50;

  if (angle > 22.5 && angle <= 67.5) {
    turn.setTexture("2");
  } else if (angle > 67.5 && angle <= 112.5) {
    turn.setTexture("3");
  } else if (angle > 112.5 && angle <= 157.5) {
    turn.setTexture("4");
  } else if (angle > 157.5 && angle <= 202.5) {
    turn.setTexture("5");
  } else if (angle > 202.5 && angle <= 247.5) {
    turn.setTexture("6");
  } else if (angle > 247.5 && angle <= 292.5) {
    turn.setTexture("7");
  } else if (angle > 292.5 && angle <= 337.5) {
    turn.setTexture("8");
  } else {
    turn.setTexture("1");
  }
}

var move = function () {
  // console.log(player);

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);

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

  }
  else if (cursors.down.isDown) {
    player.setVelocityY(+160);

    if (cursors.left.isDown) {
      player.anims.play('left', true);
    } else {
      player.anims.play('right', true);
    }

  }
  else {
    player.setVelocityY(0);
    if (!cursors.left.isDown && !cursors.right.isDown) {
      player.anims.play('turn', true);
    }
  }
}
//player end


function randomizeRoom() {
  // // Fill the floor of the room with random, weighted tiles
  // objectLayer.weightedRandomize([
  //   { index: -1, weight: 50 },
  //   { index: 63, weight: 1 }, // Place an empty tile most of the tile
  //   { index: 83, weight: 1 }, // Empty pot
  //   { index: 103, weight: 1 }, // Full pot
  // ], 1, 1, 1000, 1000);

  console.log(objectLayer);


}