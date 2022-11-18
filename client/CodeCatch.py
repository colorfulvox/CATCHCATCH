# 실행 방법 ----------------------------------------
# 1. pip install websockets : 웹 소켓 모듈을 선언합니다.
# 2. python CodeCatch.py로 실행
# -----------------------------------------------

PinNumber = "46506318"  # 화면에 나타난 PinNumber를 입력해 주세요.

import asyncio
import json
import websockets

# 수정가능한 데이터 입니다. -----------------
attack = False # Bool
angle = 0   # 0.0 ~ 360.0
type = 0     # int : 0,1,2,3
# -----------------------------------

async def Attack(websocket, catchobj):
    #catchObject는 x, y, type를 매개변수로 가지고 있는 객체의 배열입니다
	#x,y는 객체의 좌표갑, type는 객체의 속성, radius는 객체 충돌 원의 반지름입니다.
	#플레이어의 좌표는 0,0입니다.
	#공격속도는 1초이며, 플레이어는 1초에 한 번씩 공격여부, 공격 각도, 공격 타입을 정할 수 있습니다.
	#플레이어 공격의 충돌 객체는 반지름은 32의 원입니다.
	#객체는 자신의 속성 가지고있으며, 속성의 정보는 다음과 같습니다. 
	#[ 0 : 고양이(공격시 패배), 1 : 노멀타입, 2 : 전기 타입, 3 : 불 타입, 4 : 물 타입, 5 : 땅 타입 ]
	#노멀 타입의 체력은 1이고, 속성을 가지고 있는 적의 타입의 체력은 3입니다.
	#type은 각각의 약점 속성을 가지고 있습니다. 약점 정보는 다음과 같습니다. 
	#[물 > 불], [전기 > 물], [땅 > 전기], [ 불 > 땅 ] 
	#공격 타입은 다음과 같습니다. [ 1 : 일반 , 2 : 전기, 3 : 불, 4 : 물, 5 : 땅 ] 
	#플레이어는 적의 타입의 약점 타입의 공격을 맞췄을 경우, 3의 데미지를 입힐 수 있습니다. 
	#플레이어는 적의 타입의 약점이 아닌 타입의 공격을 맞췄을 경우, 1의 데미지를 입힐 수 있습니다. 
	#약점 속성 개념은 3라운드 부터 적용됩니다. 
	#플레이어가 적을 처치하면 점수가 100점 상승합니다.
	#플레이어가 만약 고양이를 공격했다면 점수가 200 점 감소합니다. 
	#적이 플레이어의 위치에 도달하게 되면 점수가 50점  감소합니다. 
	#모든 적을 물리치는 코드를 작성해보세요.
    # 여기서부터 코드를 작성해주세요. --------------------------------------
    # catchobj는 현재 적의 위치 좌표가 들어간 배열입니다.
    # catchobj[i][0] -> 객체 x 위치 좌표
    # catchobj[i][1] -> 객체 y 위치 좌표
    # catchobj[i][2] -> 객체 타입 정보
    # catchobj[i][3] -> 객체 충돌 반지름
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
  async with websockets.connect("wss://www.catchcatch.kr/api") as websocket:
    # 10번을 반복하면서 웹 소켓 서버로 메시지를 전송합니다.
    await run(websocket)
# 비동기로 서버에 접속한다.
asyncio.get_event_loop().run_until_complete(connect())
#---------------------------------------------------------------------------------
