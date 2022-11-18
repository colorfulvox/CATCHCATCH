export default class Barrier extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {
    super(scene, x, y);
    thisScene.time.addEvent({
      delay: 800,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
    scene.add.existing(this);
    scene.physics.add.existing(this);

  }

  action(key, direction) {
    switch (key) {
      case "move":
        this.move(direction);
        break;
      case "attack":
        this.attack(direction);
        break;
      case "defense":
        this.defense();
        break;
    }
  }

  move(direction) {
    switch (direction) {
      // 오른쪽
      case 0:
        if (dx < 6) {
          this.dx++;
          this.setVisible = false;
          this.setPosition(
            global.map[this.dy][this.dx][0],
            global.map[this.dy][this.dx][1]
          );
        }
        break;
      // 왼쪽
      case 1:
        if (dx > 0) {
          this.dx--;
          this.setPosition(
            global.map[this.dy][this.dx][0],
            global.map[this.dy][this.dx][1]
          );
        }
        break;
      // 위쪽
      case 2:
        if (dy > 0) {
          this.dy--;
          this.setPosition(
            global.map[this.dy][this.dx][0],
            global.map[this.dy][this.dx][1]
          );
        }
        break;
      // 아래쪽
      case 3:
        if (dy < 6) {
          this.dy++;
          this.setPosition(
            global.map[this.dy][this.dx][0],
            global.map[this.dy][this.dx][1]
          );
        }
        break; 
    }
  }
  attack(direction) {
    switch (direction) {
      // 오른쪽
      case 0:
        if (dx < 6) {
          this.dx++;
          this.setPosition(
            global.map[this.dy][this.dx][0],
            global.map[this.dy][this.dx][1]
          );
        }
        break;
      // 왼쪽
      case 1:
        break;
      // 위쪽
      case 2:
        break;
      // 아래쪽
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
    }
  }
  defense() {
    this.isDefense = true;
  }

  hitPlayer(player, alien) {
    if (player.invincible === false) {
      player.invincible = true;
      player.body.checkCollision.none = true;
      player.health -= 1;
      // 피해 1 줌
      // stop_game -= 1;
      if (player.health <= 0) {
        gameover();
      }
    }
  }
}
