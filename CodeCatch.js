// 실행 방법 ----------------------------------------
// 1. Nodejs가 반드시 설치가 되어 있어야 합니다!
// 2. CodeCatch.js 파일 위치에서 터미널을 열고 npm init -y 초기화
// 3. npm install ws 로 WebSocket을 설치
// 4. node CodeCatch.js 명령어로 실행
// -----------------------------------------------

const PinNumber = "________"; //여기에 핀 번호를 입력해주세요.

// 수정가능한 데이터 입니다. ----------
let attack = false; // boolean : false or true
let angle = 90.0; // float : 0~360.0
let type = 0; // int : 0,1,2,3
// ----------------------------

let CatchObj; //전달 받는 오브젝트 정보

// 수정 하시면 안됩니다! -------------------------------------------------------------------------------
const WebSocket = require("ws");
const socket = new WebSocket("ws://k7c106.p.ssafy.io:8080");

function run() {
  socket.onopen = function () {
    var Data = {
      action: "CodeInit",
      pinnumber: PinNumber,
    };
    socket.send(JSON.stringify(Data));
  };

  socket.onmessage = function (data) {
    var msg = JSON.parse(data.data.toString());

    //연결 성공
    if (msg.action === "ConnectSuccess") {
      console.log(msg.log);
    }
    //연결 실패시
    else if (msg.action === "ConnectFail") {
      console.log(msg.log);
      process.exit(1);
    }
    // 데이터를 전달 받음
    else if (msg.action === "exeData") {
      //데이터를 저장
      CatchObj = msg.catchobj;

      play(); //유저가 작성한 코드 수행

      var AttackInfo = {
        action: "codeData",
        pinnumber: PinNumber,
        attack: attack,
        angle: angle,
        type: type,
      };
      socket.send(JSON.stringify(AttackInfo));
    }
  };
}

run();
// --------------------------------------------------------------------------

function play() {
  // 여기서부터 코드를 작성 해주시면 됩니다. ------------------------------------------------------------
  for (let i = 1; i < CatchObj.length; ++i) {
    console.log(
      "위치 정보 : [" +
        CatchObj[i][0] +
        "," +
        CatchObj[i][1] +
        "] 타입 정보 : " +
        CatchObj[i][2]
    );
  }
  angle = 45;
  attack = true;
  type = 1;

  console.log("-------------------------------");

  // ----------------------------------------------------------------------------------------
}
