/*
[사용 방법]
-Visual Studio 2019 버전 전용-
1. 새로운 프로젝트를 만드세요.
2. 도구 >> NuGet 패키지 관리자 >> 솔루션용 NuGet 패키지 관리
3. 찾아보기 클릭
4. 해당 패키지를 검색후 설치 해주세요. (반드시 해당 프로젝트를 체크하고 설치) 
    boost (스크롤을 최상단으로 이동해 boost로 적힌 파일을 설치해주세요)
    cpprestsdk.v142
    openssl-vc142
	JsonCpp.Windows
5. CodeCatch.cpp 파일을 가져옵니다. 
6. CodeCatch.cpp 코드에서 핀 번호를 입력해주세요.
7. Ctrl + F5 실행
*/
#include <iostream>
#include <cpprest/ws_client.h>
#include <json/json.h>
using namespace std;
using namespace web;
using namespace web::websockets::client;
#pragma warning(disable: 4996)

#define PINNUMBER "________" //여기에 핀 번호를 입력해주세요

websocket_client client;
class CatchObj {
public:
	float x;
	float y;
	int type;
	float radius;
};
void play(CatchObj* catchobj, int objsize);
void PlaySend();

// 수정가능한 데이터 입니다. -----------------
bool attack = true;  // boolean : false or true
float angle = 90.0f;  // float : 0~360.0
int type = 1; // int : 0,1,2,3
// -----------------------------------
 
// 수정하시면 안됩니다! -------------------------------------------------------------------------
int main()
{
	bool IsConnect = false;
	try {
		client.connect(U("wss://www.catchcatch.kr/api")).wait();
		cout << "Successful connection with server." << endl;
		cout << "---------------------------------" << endl;
	}

	catch (std::exception const& e)
	{
		cout << "Connection with server failed."<<endl;
		cout << "---------------------------------" << endl;
		exit(1);
	}

	//핀 번호 전달
	websocket_outgoing_message msg;

	Json::Value Data;
	Data["action"] = "CodeInit";
	Data["pinnumber"] = PINNUMBER;

	Json::StyledWriter writer;
	string str = writer.write(Data);

	msg.set_utf8_message(str);
	try {
		client.send(msg).wait();
	}
	catch(std::exception const& e)
	{
		cout << "Pin number forwarding failed."<<endl;
		cout << "---------------------------------" << endl;
		exit(1);
	}

	while (true) {
		try {
			client.receive().then([](websocket_incoming_message in_msg)
				{
					return in_msg.extract_string();
				}).then([](string body) {
					Json::Reader _reader;
					Json::Value _data;
					
					_reader.parse(body, _data);

					if (_data["action"] == "ConnectFail")
					{
						
						cout << "Connection with CodeCatch failed"<<endl;
						cout << "---------------------------------" << endl;
						exit(1);
					}
					else 	if (_data["action"] == "ConnectSuccess")
					{
						cout << _data["log"].asString()<<endl;
					}
					else if (_data["action"] == "exeData")
					{
						CatchObj *catchobj = new CatchObj[_data["catchobj"].size()];
						int size = _data["catchobj"].size();
						for (int i = 0; i < _data["catchobj"].size(); ++i)
						{
							catchobj[i].x = _data["catchobj"][i][0].asFloat();
							catchobj[i].y = _data["catchobj"][i][1].asFloat();
							catchobj[i].type = _data["catchobj"][i][2].asInt();
							catchobj[i].radius = _data["catchobj"][i][3].asFloat();
						}
						play(catchobj,size);
					}
					
					}).wait();
		}
		catch (std::exception const& e)
		{
			cout << "The connection to the server has been lost." << endl;
			cout << "---------------------------------" << endl;
			exit(1);
		}
	}
	return 0;
}
//-----------------------------------------------------------------------------------------
void play(CatchObj *catchobj,int objsize)
{
	// catchobj : 전달 받는 오브젝트 정보
	// CatchObj[i][0] -> 객체 x 위치 좌표
	// CatchObj[i][1] -> 객체 y 위치 좌표
	// CatchObj[i][2] -> 객체 타입 정보

	// objsize : 객체 사이즈

	// catchObject는 x, y, type를 매개변수로 가지고 있는 객체의 배열입니다
	// x,y는 객체의 좌표갑, type는 객체의 속성, radius는 객체 충돌 원의 반지름입니다.
	// 플레이어의 좌표는 0,0입니다.
	// 공격속도는 1초이며, 플레이어는 1초에 한 번씩 공격여부, 공격 각도, 공격 타입을 정할 수 있습니다.
	// 플레이어 공격의 충돌 객체는 반지름은 32의 원입니다.
	// 객체는 자신의 속성 가지고있으며, 속성의 정보는 다음과 같습니다. 
	// [ 0 : 고양이(공격시 패배), 1 : 노멀타입, 2 : 전기 타입, 3 : 불 타입, 4 : 물 타입, 5 : 땅 타입 ]
	// 노멀 타입의 체력은 1이고, 속성을 가지고 있는 적의 타입의 체력은 3입니다.
	// type은 각각의 약점 속성을 가지고 있습니다. 약점 정보는 다음과 같습니다. 
	// [물 > 불], [전기 > 물], [땅 > 전기], [ 불 > 땅 ]  
	// 공격 타입은 다음과 같습니다. [ 1 : 일반 , 2 : 전기, 3 : 불, 4 : 물, 5 : 땅 ] 
	// 플레이어는 적의 타입의 약점 타입의 공격을 맞췄을 경우, 3의 데미지를 입힐 수 있습니다. 
	// 플레이어는 적의 타입의 약점이 아닌 타입의 공격을 맞췄을 경우, 1의 데미지를 입힐 수 있습니다. 
	// 약점 속성 개념은 3라운드 부터 적용됩니다. 
	// 플레이어가 적을 처치하면 점수가 100점 상승합니다.
	// 플레이어가 만약 고양이를 공격했다면 점수가 200 점 감소합니다. 
	// 적이 플레이어의 위치에 도달하게 되면 점수가 50점  감소합니다. 
	// 모든 적을 물리치는 코드를 작성해보세요.
	//여기서 부터 코딩 해주세요-------------------------------------------------
	for (int i = 0; i < objsize; ++i)
		cout << catchobj[i].x << " " << catchobj[i].y << " " << catchobj[i].type << " " << catchobj[i].radius << endl;

	// attack = true;  
	// angle = 90.0f;  
	// type = 1;

	//------------------------------------------------------------------
	PlaySend();
}

void PlaySend()
{
	Json::Value CodeData;

	CodeData["action"] = "codeData";
	CodeData["pinnumber"] = PINNUMBER;
	CodeData["attack"] = attack;
	CodeData["angle"] = angle;
	CodeData["type"] = type;

	Json::StyledWriter _writer;
	string str = _writer.write(CodeData);
	websocket_outgoing_message _msg;
	_msg.set_utf8_message(str);

	try {
		client.send(_msg).wait();
	}
	catch (std::exception const& e)
	{
		cout << "Data forwarding failed." << endl;
		cout << "---------------------------------" << endl;
		exit(1);
	}
}
