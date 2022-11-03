# 실행 방법 ----------------------------------------
# 1. pip install websockets : 웹 소켓 모듈을 선언합니다.
# 2. python CodeCatch.py로 실행
# -----------------------------------------------

PinNumber = "77751005"  # 화면에 나타난 PinNumber를 입력해 주세요.

import asyncio
import json
import websockets

# 수정가능한 데이터 입니다. -----------------
attack = False # Bool
angle = 0   # 0.0 ~ 360.0
type = 0     # int : 0,1,2,3
# -----------------------------------

async def Attack(websocket, catchobj):
    # 여기서부터 코드를 작성해주세요. --------------------------------------
    # catchobj는 현재 적의 위치 좌표가 들어간 배열입니다.
    # catchobj[i][0] -> 객체 x 위치 좌표
    # catchobj[i][1] -> 객체 y 위치 좌표
    # catchobj[i][2] -> 객체 타입 정보
    print(catchobj)

    attack = True
    angle = 45  
    type = 0   

    #---------------------------------------------------------------------------------

    # 아래는 건드리면 안 됩니다.----------------------------------------------------------------
    return {
                'action' : "codeData",
                'pinnumber' : PinNumber,
                'attack' : attack,
                'angle' : angle,
                'type' : type
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
        if recvMsg['catchobj'] == [[]]:
            break
        if recvMsg['action'] == 'exeData':
            AttackInfo = await Attack(websocket, recvMsg['catchobj'])
            attackinfo = json.dumps(AttackInfo)
            await websocket.send(attackinfo)
async def connect():
  # 웹 소켓에 접속을 합니다.
  async with websockets.connect("ws://k7c106.p.ssafy.io:8080") as websocket:
    # 10번을 반복하면서 웹 소켓 서버로 메시지를 전송합니다.
    await run(websocket)
# 비동기로 서버에 접속한다.
asyncio.get_event_loop().run_until_complete(connect())
#---------------------------------------------------------------------------------