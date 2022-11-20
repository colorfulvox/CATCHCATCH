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

#define PINNUMBER "01497525" //여기에 핀 번호를 입력해주세요

websocket_client client;

int mapinfo[7][7];
int playerhp;
void play();
void PlaySend();

// 수정가능한 데이터 입니다. -----------------
int cmd = 1; // int 0,1,2
// 0 : move
// 1 : attack
// 2 : defense

int movedir = 1; // int
// 1 : → 오른쪽
// 2 : ← 왼쪽
// 3: ↑ 위
// 4: ↓ 아래

int attackdir = 1; // int 1 ~ 8
//  ↖ ↑ ↗    1    2    3
//  ←     →    4         5
//  ↙ ↓ ↘    6    7   8
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
					else if (_data["action"] == "exeData2")
					{

						for (int i = 0; i < 7; ++i)
						{
							for (int j = 0; j < 7; ++j)
							{
								mapinfo[i][j] = _data["mapinfo"][i][j].asInt();
							}
						}
						playerhp = _data["playerhp"].asInt();

					play();
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
void play()
{
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
	

	//여기서 부터 코딩 해주세요-------------------------------------------------
	cmd = 1;
	movedir = 1;
	attackdir = 2;

	//------------------------------------------------------------------
	PlaySend();
}

void PlaySend()
{
	Json::Value CodeData;

	CodeData["action"] = "codeData2";
	CodeData["pinnumber"] = PINNUMBER;
	CodeData["cmd"] = cmd;
	CodeData["movedir"] = movedir;
	CodeData["attackdir"] = attackdir;

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
