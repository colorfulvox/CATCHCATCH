export function sockConnect() {
  // const WebSocket = require("ws");
  const socket = new WebSocket("ws://localhost:8080");

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
  let monster = [true, true, true, true, true];
  // ----------------------------------------

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

  setInterval(() => {
    if (socket.bufferedAmount == 0) {
      if (IsStarted != false && IsRunning != true) {
        var Data = {
          action: "exeData",
          pinnumber: PinNumber,
          monster: monster,
          monsterpos: monsterpos,
        };
        IsRunning = true;
        socket.send(JSON.stringify(Data));
      }
    }
  }, 1000);
}

export function testshow() {
  monster[0] = false;
  for (let i = 0; i < monster.length; ++i) {
    process.stdout.write(monster[i] + " ");
  }
  for (let i = 0; i < monster.length; ++i) {
    process.stdout.write("[" + monsterpos[i][0] + "," + monsterpos[i][1] + "]");
  }
}
