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

const { exit } = require("process");
// 수정 하시면 안됩니다! -------------------------------------------------------------------------------
const WebSocket = require("ws");
const socket = new WebSocket("wss://www.catchcatch.kr/api");

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
    } else if (msg.action === "endGame") {
      process.exit(1);
    }
  };
}

run();
// --------------------------------------------------------------------------

function play() {
  // catchObject는 x, y, type, redius를 요소로 가지고 있는 배열입니다
  // 배열의 0,1번 인덱스는 객체의 좌표값, 2번 인덱스는 객체의 속성, 3번 인덱스는 객체 충돌 원의 반지름입니다.
  // 플레이어의 좌표는 0,0 입니다.
  // 공격속도는 1초이며, 플레이어는 1초에 한 번씩 공격여부, 공격 각도, 공격 속성을 정할 수 있습니다.
  // 플레이어 공격의 충돌 객체는 반지름은 32의 원입니다.
  // 객체는 자신의 속성 가지고있으며, 속성의 정보는 다음과 같습니다.
  // [ 0 : 고양이(공격시 패배), 1 : 노멀속성, 2 : 전기 속성, 3 : 불 속성, 4 : 물 속성, 5 : 땅 속성 ]
  // 노멀 속성의 체력은 1이고, 속성을 가지고 있는 적의 속성의 체력은 3입니다.
  // type은 각각의 약점 속성을 가지고 있습니다. 약점 정보는 다음과 같습니다.
  // [물 > 불], [전기 > 물], [땅 > 전기], [ 불 > 땅 ]
  // 공격 속성은 다음과 같습니다. [ 1 : 일반 , 2 : 전기, 3 : 불, 4 : 물, 5 : 땅 ]
  // 플레이어는 적의 속성의 약점 속성의 공격을 맞췄을 경우, 3의 데미지를 입힐 수 있습니다.
  // 플레이어는 적의 속성의 약점이 아닌 속성의 공격을 맞췄을 경우, 1의 데미지를 입힐 수 있습니다.
  // 약점 속성 개념은 3라운드 부터 적용됩니다.
  // 플레이어가 적을 처치하면 점수가 100점 상승합니다.
  // 플레이어가 만약 고양이를 공격했다면 점수가 200 점 감소합니다.
  // 적이 플레이어의 위치에 도달하게 되면 점수가 50점  감소합니다.
  // 모든 적을 물리치는 코드를 작성해보세요.
  // 여기서부터 코드를 작성 해주시면 됩니다. ------------------------------------------------------------
  for (let i = 1; i < CatchObj.length; ++i) {
    console.log(
      " 위치 정보 : [" +
        CatchObj[i][0] +
        "," +
        CatchObj[i][1] +
        "] \n 속성 정보 : " +
        CatchObj[i][2] +
        "\n 충돌 반지름 : " +
        CatchObj[i][3]
    );
  }
  // 공격 여부
  attack = true;
  // 공격 각도
  angle = 45;
  // 공격 속성
  type = 1;

  console.log("-------------------------------");

  // ----------------------------------------------------------------------------------------
}
