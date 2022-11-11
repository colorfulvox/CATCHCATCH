import asyncio
import json
# 웹 소켓 모듈을 선언한다.
# pip install websockets
# python CodeCatch.py로 실행
import websockets
 # 화면에 나타난 PinNumber를 입력해 주세요.
PinNumber = "89544273"
attack = False # Bool
angle = 0   # 0~360
type = 0    # 0~4

async def Attack(websocket, catchobj):
    # 여기에 구현후 attack, angle, type의 값을 변화 시키면 됩니다.
    # catchobj는 현재 적의 위치 좌표가 들어간 배열입니다.
    print(catchobj)


    attack = True # Bool
    angle = 45  # 0~360
    type = 0    # 0~3
    # 아래는 건드리면 안 됩니다.
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