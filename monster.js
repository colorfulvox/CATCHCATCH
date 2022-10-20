var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);
var group;
var target;

function preload()
{
    this.load.spritesheet('alien', 'assets/tests/invaders/invader1.png', { frameWidth: 32, frameHeight: 32 });
}

function create()
{

    this.anims.create({
        key: 'swarm',
        frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1
    });

    group = this.physics.add.group({
        key: 'alien',
        maxSize: 100,
        velocityX: 10,
        velocityY: 10,
    });

    Phaser.Actions.RandomRectangle(group.getChildren(), this.physics.world.bounds);

    // 유저와 몬스터간 콜라이더 처리
    // this.physics.add.collider(group,player)

    // 만약 유저와 몬스터가 닿았다면 (hitplayer 함수 실행)
    // this.physics.add.overlap(player, group, hitplayer, null, this);

    this.time.addEvent({
        delay: 100,
        loop: true,
        callback: addAlien});
   
}

function update()
{
    Phaser.Actions.IncY(group.getChildren(), 1);
    group.children.iterate(function (alien) {
        if (alien.y > 600) {
            // 리소스 때문에 임의로 죽임
            group.killAndHide(alien);
        }
    });
}

function hitplayer (player, group)
{

    // 일단 피해 준 몬스터는 사라지는데 추후 코드로 몇초간 안보이게 또는 유저 잠시 무적으로 수정해야함
    monster.disableBody(true, true);

    // 피해 1 줌
    life -= 1;

}

function activateAlien (alien) {
    alien
    .setActive(true)
    .setVisible(true)
    .setTint(Phaser.Display.Color.RandomRGB().color)
    .play('swarm');
}


function addAlien () {
    // Random position above screen
    const x = Phaser.Math.Between(250, 800);
    const y = Phaser.Math.Between(-64, 0);

    // Find first inactive sprite in group or add new sprite, and set position
    const alien = group.get(x, y);
    activateAlien(alien);
}
