var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 8080 });

class UserData {
  constructor(exeSocket) {
    this.exeSocket = exeSocket;
    this.codeSocket = null;
  }
}

const Sockets = {};

wss.on("connection", function (ws) {
  ws.on("message", (data) => {
    try {
      var msg = JSON.parse(data.toString());

      //exe 초기화
      if (msg.action === "exeClientInit") {
        //여기서 핀번호 조사-----
        while (true) {
          var Number = generateRandomCode(8);
          if (!(Number in Sockets)) break;
        }
        //------------------

        console.log("-----------------------------------------");
        console.log("CatchCatch연결 완료. \n" + Number + "번호를 할당합니다.");
        console.log("-----------------------------------------");

        // 구조체 생성
        const newuser = new UserData(ws);
        Sockets[Number] = newuser;

        var Data = {
          action: "PinNumber",
          pinnumber: Number,
        };
        ws.send(JSON.stringify(Data));
      }
      // Code 초기화
      else if (msg.action === "CodeInit") {
        if (Sockets[msg.pinnumber] != null) {
          Sockets[msg.pinnumber].codeSocket = ws;

          var Data = {
            action: "ConnectSuccess",
            log: "서버와의 연결에 성공하였습니다. \
        \n CatchCatch 데이터 전송을 실시합니다. \
        \n-----------------------------------------",
          };
          ws.send(JSON.stringify(Data));

          //CatchCatch에게 데이터 전달 요청 실시----------------
          var Data = { action: "StartGame" };
          // console.log(msg.pinnumber);
          Sockets[msg.pinnumber].exeSocket.send(JSON.stringify(Data));
          //--------------------------------------------
        } else {
          var Data = {
            action: "ConnectFail",
            log: "서버와의 연결에 실패하였습니다.",
          };
          ws.send(JSON.stringify(Data));
        }
      }
      // exe에서 전달 받은 데이터
      else if (msg.action === "exeData") {
        // Codeclient에게 전달
        Sockets[msg.pinnumber].codeSocket.send(JSON.stringify(msg));
      } else if (msg.action === "codeData") {
        var Data = {
          action: "codeData",
          monster: msg.monster,
          monsterpos: msg.monsterpos,
        };
        Sockets[msg.pinnumber].exeSocket.send(JSON.stringify(Data));
      }
    } catch (error) {
      console.log("[잘못된 요청] 요청을 무시합니다.");
      ws.send("잘못된 요청입니다.");
    }
  });

  ws.on("close", () => {
    for (key in Sockets) {
      if (Sockets[key].exeSocket === ws) {
        delete Sockets[key];
        console.log(`${key}삭제를 완료하였습니다.`);
      }
    }
  });
});

// 랜덤 핀 번호 배정
function generateRandomCode(n) {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}
