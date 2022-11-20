// 실행 방법 ----------------------------------------
// 1. Nodejs가 반드시 설치가 되어 있어야 합니다!
// 2. CodeCatch.js 파일 위치에서 터미널을 열고 npm init -y 초기화
// 3. npm install ws 로 WebSocket을 설치
// 4. node CodeCatch.js 명령어로 실행
// -----------------------------------------------

const PinNumber = "________"; //여기에 핀 번호를 입력해주세요.

// 수정가능한 데이터 입니다. ---------------------
let cmd; // int 0,1,2
// 0 : move
// 1 : attack
// 2 : defense

let movedir; // int
// 1 : ← 왼쪽
// 2 : → 오른쪽
// 3: ↑ 위
// 4: ↓ 아래

let attackdir = 5; // int 1 ~ 8
//  ↖ ↑ ↗    1    2    3
//  ←     →    4         5
//  ↙ ↓ ↘    6    7   8
// ----------------------------------------

let mapinfo; //현재 맵의 정보 : 2 array [][]
let playerhp; //현재 플레이어 체력 : int

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
        action: "codeData2",
        pinnumber: PinNumber,
        cmd: cmd,
        movedir: movedir,
        attackdir: attackdir,
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
  // 게임의 목표는 최대한 적은 턴안에 적을 잡는 것입니다.
  // 게임 방식은 턴제이며 1턴당 공격, 이동, 방어중 하나만 할 수 있습니다.
  // 게임 시작시 유저의 체력은 4로 시작하며 맵에는 플레이어와 적 그리고 벽이 있으며
  // 랜덤한 위치에 빔이 발사됩니다.

  // [빔]
  // 유저가 빔에 맞을경우 체력2가 감소하며
  // 적이 빔에 맞을 경우 대미지를 받지않으며 벽에 발사될경우 막힙니다.

  // [적]
  // 적은 랜덤하게 이동하며 체력은 1입니다.

  // mapinfo는 7x7의 int형 배열로 맵의 위치 정보입니다.
  // mapinfo에는 0 : 빈자리, 1: 플레이어, 2: 벽, 3: 적, 4: 빔 정보 5: 빔이랑 유저가 겹침 가 있습니다.
  // EX) mapinfo[0][1] => 2 이면 0,1 위치에 벽이 있다.
  // playerhp는 현재 유저의 체력 정보이며 처음 시작시 체력이 4입니다.

  // [명령] cmd = (int) 0~2
  // 플레이어는 한턴에 하나의 명령만 가능하며 cmd값으로 행동을 선택할 수 있습니다.

  // [이동] move = (int) 1 ~ 4
  // 1~4방향으로 이동이 가능하며 이동하려는 방향에 적이 있을경우 대미지 1를 받지만
  // 적은 제거되며 이동합니다.

  // [공격] attack = (int) 1 ~ 8
  // 플레이어는 공격시 탄환을 발사하며 8방향을 선택할 수 있으며
  // 탄환 대미지는 1입니다.
  // 탄환은 벽에 막힙니다.

  // [방어]
  // 방어를 하게되면 방향과 상관없이 공격받은 대미지가 1이 감소합니다.

  console.log("-------------------------------");

  // ----------------------------------------------------------------------------------------
}
