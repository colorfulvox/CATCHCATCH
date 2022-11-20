var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 8080 });

let usercount = 0;

class UserData {
  constructor(exeSocket) {
    this.exeSocket = exeSocket;
    this.codeSocket = null;
  }
}

const Sockets = {};
let Ranking = [];

wss.on("connection", function (ws) {
  // console.log("누가 들어왔습니다.");

  ws.on("message", (data) => {
    try {
      var msg = JSON.parse(data.toString());

      //exe 초기화
      if (msg.action === "exeClientInit") {
        //여기서 핀번호 조사-----
        //while (true) {
        var Number = generateRandomCode(8);
        //   if (!(Number in Sockets)) break;
        // }
        //------------------

        //   console.log("-----------------------------------------");
        //   console.log("CatchCatch연결 완료. \n" + Number + "번호를 할당합니다.");
        //   console.log("-----------------------------------------");

        // 구조체 생성
        const newuser = new UserData(ws);
        Sockets[Number] = newuser;
        var rdata = null;

        //유저 갱신---------------------------
        const userfs = require("fs");
        userfs.readFile("./user.json", (err, usercount) => {
          if (err) {
            //     console.log("유저 수 데이터가 없네?");
          } else {
            cdata = JSON.parse(usercount.toString());
            ++cdata[0];

            //         console.log(cdata[0]);

            userfs.writeFile("./user.json", JSON.stringify(cdata), (err) => {
              if (err) {
              } //console.log("저장 실패");
            });
          }
        });

        //랭킹 가져오기-------------
        const fs = require("fs");
        fs.readFile("./Ranking.json", (err, data) => {
          if (err) {
            console.log("데이터가 없네?");
          } else {
            rdata = JSON.parse(data.toString());

            var Data = {
              action: "PinNumber",
              pinnumber: Number,
              ranking: rdata,
            };
            ws.send(JSON.stringify(Data));
          }
        });
        // ----------------------
        // console.log(Ranking);
      }
      // Code 초기화
      else if (msg.action === "CodeInit") {
        if (Sockets[msg.pinnumber] != null) {
          Sockets[msg.pinnumber].codeSocket = ws;
          //  console.log("CodeCatch 연결 성공");
          var Data = {
            action: "ConnectSuccess",
            log: "The connection with the server was successful. \
        \nPerforms a data transfer. \
        \n---------------------------------------",
          };
          ws.send(JSON.stringify(Data));

          //CatchCatch에게 데이터 전달 요청 실시----------------
          var Data = { action: "StartGame" };

          Sockets[msg.pinnumber].exeSocket.send(JSON.stringify(Data));
          //--------------------------------------------
        } else {
          var Data = {
            action: "ConnectFail",
            log: "Connection with server failed.",
          };
          ws.send(JSON.stringify(Data));
        }
      } else if (msg.action === "exeData") {
        // CatchCatch에서 보내는 데이터
        Sockets[msg.pinnumber].codeSocket.send(JSON.stringify(msg));
      } else if (msg.action === "exeData2") {
        // CatchCatch에서 보내는 데이터
        Sockets[msg.pinnumber].codeSocket.send(JSON.stringify(msg));
      } else if (msg.action === "codeData") {
        //codeCatch에서 보내는 데이터
        Sockets[msg.pinnumber].exeSocket.send(JSON.stringify(msg));
      } else if (msg.action === "codeData2") {
        Sockets[msg.pinnumber].exeSocket.send(JSON.stringify(msg));
      } else if (msg.action === "endGame") {
        //게임 끝날 경우 보내는 데이터
        Sockets[msg.pinnumber].codeSocket.send(JSON.stringify(msg));
      }
      // else if (msg.action === "searchranking") {
      //   const fs = require("fs");
      //   fs.readFile("./Ranking.txt", "utf8", (err, data) => {
      //     if (err) {
      //       console.log("데이터가 없네?");
      //     } else {
      //       var rdata = data.toString().split("\n");

      //       let flag = false;
      //       let index = 1;

      //       for (i in rdata) {
      //         var d = rdata[i].split(" ");
      //         if (d[0] === msg.searchname) {
      //           var Data = {
      //             action: "searchranking",
      //             check: true,
      //             grade: index,
      //             name: d[0],
      //             score: d[1],
      //           };
      //           ws.send(JSON.stringify(Data));
      //           flag = true;
      //           break;
      //         }
      //         ++index;
      //       }
      //       if (flag === false) {
      //         var Data = {
      //           action: "searchranking",
      //           check: false,
      //           log: "없는 유저입니다.",
      //         };
      //         ws.send(JSON.stringify(Data));
      //       }
      //     }
      //   });
      //   console.log(msg);
      // }
      else if (msg.action === "newranking") {
        //1. 일단 모든 데이터 정보를 가져온다.

        const fs = require("fs");
        fs.readFile("./Ranking.json", (err, data) => {
          if (err) {
            //  console.log("데이터가 없네?");
          } else {
            var rdata = JSON.parse(data.toString());

            //여기서 새로운 데이터 등록
            rdata.push([msg.name, msg.score, msg.area]);
            //-------------------------

            // console.log(rdata[0]);

            rdata.sort(function (a, b) {
              if (a[1] < b[1]) return 1;
              if (a[1] === b[1]) return 0;
              if (a[1] > b[1]) return -1;
            });
            // console.log(rdata);

            fs.writeFile("./Ranking.json", JSON.stringify(rdata), (err) => {
              if (err) {
              } // console.log("저장 실패");
            });

            UpdateRanking();
          }
        });

        //2. 그리고 해당 데이터를 추가한다.
        // ----이건 다른 함수에서 실행시킨다.-----
        //3.  정렬한다.
        //4.  파일을 다시 쓴다.
        //--------------------------
      }
    } catch (error) {
      // console.log("[잘못된 요청] 요청을 무시합니다.");
      //ws.send("invalid request.");
    }
  });

  ws.on("close", () => {
    for (key in Sockets) {
      if (Sockets[key].exeSocket === ws) {
        delete Sockets[key];
        //console.log(`${key}삭제를 완료하였습니다.`);
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

function UpdateRanking() {
  const fs = require("fs");
  fs.readFile("./Ranking.json", (err, data) => {
    if (err) {
      // console.log("데이터가 없네?");
    } else {
      rdata = JSON.parse(data.toString());

      var Data = {
        action: "RankingUpdate",
        ranking: rdata,
      };
      for (key in Sockets) {
        Sockets[key].exeSocket.send(JSON.stringify(Data));
      }

      //	console.log("ok!!!!!!!!!!");
    }
  });

  //여기서는 모든 클라에게 랭킹을 업데이트 시켜줘야한다.
}

var dummydata = {
  action: "dummy",
};

setInterval(() => {
  for (key in Sockets) {
    Sockets[key].exeSocket.send(JSON.stringify(dummydata));
  }
}, 10000);
