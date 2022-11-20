# 실행 방법 ----------------------------------------
# 1. pip install websockets : 웹 소켓 모듈을 선언합니다.
# 2. python CodeCatch2.py로 실행
# -----------------------------------------------

PinNumber = "23078078"  # 화면에 나타난 PinNumber를 입력해 주세요.

import asyncio
import json
import websockets


#  수정가능한 데이터 입니다. ---------------------
cmd = 1; # int 0,1,2
#  0 : move
#  1 : attack
#  2 : defense

movedir = 1; # int
# 1 : → 오른쪽
# 2 : ← 왼쪽
# 3: ↑ 위
# 4: ↓ 아래

attackdir = 1; # int 1 ~ 8
#  ↖ ↑ ↗    1    2    3
#  ←   →    4         5
#  ↙ ↓ ↘    6    7    8
# ----------------------------------------

mapinfo = []#현재 맵의 정보 : 2 array [][]
playerhp = 0 #현재 플레이어 체력 : int


async def play(websocket, mapinfo, playerhp):
  # 게임의 목표는 최대한 적은 턴안에 적을 잡는 것입니다.
  # 게임 방식은 턴제이며 1턴당 공격, 이동, 방어중 하나만 할 수 있습니다.
  # 게임 시작시 유저의 체력은 4로 시작하며 맵에는 플레이어와 적 그리고 벽이 있으며
  # 랜덤한 위치에 빔이 발사됩니다.

  # [빔]
  # 유저가 빔에 맞을경우 체력2가 감소하며
  # 적이 빔에 맞을 경우 대미지를 받지않으며 벽에 발사될경우 막힙니다.

  # [적]
  # 적은 랜덤하게 이동하며 체력은 1입니다.

  # mapinfo는 7x7의 int형 배열로 맵의 위치 정보입니다.
  # mapinfo에는 0 : 빈자리, 1: 플레이어, 2: 벽, 3: 적, 4: 빔 정보 5: 빔이랑 유저가 겹침 가 있습니다.
  # EX) mapinfo[0][1] => 2 이면 0,1 위치에 벽이 있다.
  # playerhp는 현재 유저의 체력 정보이며 처음 시작시 체력이 4입니다.

  # [명령] cmd = (int) 0~2
  # 플레이어는 한턴에 하나의 명령만 가능하며 cmd값으로 행동을 선택할 수 있습니다.

  # [이동] move = (int) 1 ~ 4
  # 1~4방향으로 이동이 가능하며 이동하려는 방향에 적이 있을경우 대미지 1를 받지만
  # 적은 제거되며 이동합니다.

  # [공격] attack = (int) 1 ~ 8
  # 플레이어는 공격시 탄환을 발사하며 8방향을 선택할 수 있으며
  # 탄환 대미지는 1입니다.
  # 탄환은 벽에 막힙니다.

  # [방어]
  # 방어를 하게되면 방향과 상관없이 공격받은 대미지가 1이 감소합니다.
    for i in range(len(mapinfo)):
        print(mapinfo[i])
    print(playerhp)

    cmd = 1
    movedir = 1
    attackdir = 2
    print("-------------------------------")

    # ----------------------------------------------------------------------------------------
    return {
        'action': "codeData2",
        'pinnumber': PinNumber,
        'cmd': cmd,
        'movedir': movedir,
        'attackdir': attackdir,
    }




async def run(websocket):
    Data = {
        "action": "CodeInit",
        "pinnumber" : PinNumber
    }
    newData = json.dumps(Data)
    print(newData)
    await websocket.send(newData)
    msg = await websocket.recv()
    recvMsg = json.loads(msg)
    if recvMsg['action'] == 'ConnectSuccess':
        print("연결 성공")
    elif recvMsg['action'] == 'ConnectFail':
        print("연결 실패")
        exit()
    
    while 1:
        msg = await websocket.recv()
        recvMsg = json.loads(msg)
        if recvMsg['action'] == 'endGame':
            break
        if recvMsg['action'] == 'exeData2':
            AttackInfo = await play(websocket, recvMsg['mapinfo'], recvMsg['playerhp'])
            attackinfo = json.dumps(AttackInfo)
            await websocket.send(attackinfo)
async def connect():
  # 웹 소켓에 접속을 합니다.
  async with websockets.connect("wss://www.catchcatch.kr/api") as websocket:
    # 10번을 반복하면서 웹 소켓 서버로 메시지를 전송합니다.
    await run(websocket)
# 비동기로 서버에 접속한다.
asyncio.get_event_loop().run_until_complete(connect())
#---------------------------------------------------------------------------------
