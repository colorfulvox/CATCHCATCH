/*
[사용 방법]
-Visual Studio 2019 버전 전용-
1. 새로운 프로젝트를 만드세요.
2. 도구 >> NuGet 패키지 관리자 >> 솔루션용 NuGet 패키지 관리
3. 찾아보기 클릭
4. 해당 패키지를 검색후 설치 해주세요. (반드시 해당 프로젝트를 체크하고 설치) 
    boost 
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

#define PINNUMBER "95514048" //여기에 핀 번호를 입력해주세요

websocket_client client;
class CatchObj {
public:
	float x;
	float y;
	int type;
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
		client.connect(U("ws://k7c106.p.ssafy.io:8080")).wait();
		cout << "서버와의 연결에 성공하셨습니다." << endl;
		cout << "---------------------------------" << endl;
	}

	catch (std::exception const& e)
	{
		cout << "서버와의 연결에 실패하셨습니다."<<endl;
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
		cout << "핀 번호 전달에 실패하셨습니다."<<endl;
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
						
						cout << "데이터를 전달 받지 못했습니다."<<endl;
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
						}
						play(catchobj,size);
					}
					
					}).wait();
		}
		catch (std::exception const& e)
		{
			cout << "서버와의 연결이 끊어졌습니다." << endl;
			cout << "---------------------------------" << endl;
			exit(1);
		}
	}
	return 0;
}
//-----------------------------------------------------------------------------------------
void play(CatchObj *catchobj,int objsize)
// catchobj : 전달 받는 오브젝트 정보
// CatchObj[i][0] -> 객체 x 위치 좌표
// CatchObj[i][1] -> 객체 y 위치 좌표
// CatchObj[i][2] -> 객체 타입 정보

// objsize : 객체 사이즈
{

	//여기서 부터 코딩 해주세요-------------------------------------------------
	for (int i = 0; i < objsize; ++i)
		cout << catchobj[i].x << " " << catchobj[i].y << " " << catchobj[i].type << endl;







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
		cout << "데이터 전달에 실패했습니다." << endl;
		cout << "---------------------------------" << endl;
		exit(1);
	}
}
