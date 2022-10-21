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
var backgroundLayer;
var portalLayer;
var wallLayer;
var stage1Layer;
var stage2Layer;
var stage3Layer;
var stage4Layer;

var game = new Phaser.Game(config);
let controls;

function preload() {
  this.load.image("tiles", "./tiles.png");
  this.load.image("tiles2", "./tiles2.png");
  this.load.tilemapTiledJSON("map", "resources.tmj");

  //player start

  //player end

  this.load.image('j1', 'j1.png');
  this.load.image('j2', 'j2.png');
  this.load.image('j3', 'j3.png');
}

function create() {
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

  camera = this.cameras.main;

  cursors = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  // // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true);


  //player start

  //player end

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
}

function update(time, delta) {

  //player start

  //player enda

  // var tile = map.getTileAt(map.worldToTileX(player.x), map.worldToTileY(player.y));

  // if (tile) {
  //   console.log('' + JSON.stringify(tile.properties))
  // }
}

//player start

//player end