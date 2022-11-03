/*
[실행 필수 라이브러리 설치 안내]
☆Java-WebSocket 라이브러리 다운로드★
https://mvnrepository.com/artifact/org.java-websocket/Java-WebSocket
☆JsonObject 라이브러리 다운로드 ★
https://jar-download.com/artifacts/org.json
☆slf4j 라이브러리 다운로드 ★
https://mvnrepository.com/artifact/org.slf4j/slf4j-api
3개의 JAR파일을 프로젝트 우클릭 -> properties -> java build path -> Libraries -> Add External JARS를 통해 Import 시켜준다.
Apply and Close를 눌러 저장
*/

// 건들지 말아주세요! ------------------------------------------------------------------------
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft_6455;
import org.java_websocket.handshake.ServerHandshake;
import org.json.JSONArray;
import org.json.JSONObject;

class CatchObj {
	double x;
	double y;
	int type;
	public CatchObj() {}
	
	public CatchObj(double x, double y, int type) {
		super();
		this.x = x;
		this.y = y;
		this.type = type;
	}
	@Override 
	public String toString() {
		return "CatchObj [x=" + x + ", y=" + y + ", type=" + type + "]";
	}
}

public class CodeCatch {
// ---------------------------------------------------------------------------------------
	
	static String pinNumber = "________";  //여기에 핀 번호를 입력해주세요.
	
	
// ---------------------------------------------------------------------------------------
	public static void main(String[] args) throws URISyntaxException {

		WebSocketClient mWs = new WebSocketClient(new URI("ws://k7c106.p.ssafy.io:8080"),new Draft_6455()) {

			@Override
			public void onClose(int arg0, String arg1, boolean arg2) {
				System.out.println("onClose");
			}

			@Override
			public void onError(Exception arg0) {

				System.out.println("onError()");
			}

			@Override
			public void onMessage(String json) {


				JSONObject jsonData = new JSONObject(json);
				
				JSONArray obj;
				
				CatchObj catchObject[];

				if(jsonData.get("action").equals("exeData")) {
					obj = jsonData.getJSONArray("catchobj");
					catchObject = new CatchObj[obj.length()];

					for(int i=0,n=obj.length();i<n;i++) {
						JSONArray objSub = obj.getJSONArray(i);
						if(objSub.length() != 0) {
						catchObject[i] = new CatchObj(objSub.getDouble(0), objSub.getDouble(1), objSub.getInt(2));
						System.out.println(catchObject[i].toString());
						}
					}
				}
				// ------------------------------------------------------------------------

				// 여기서부터 코드 작성하시면 됩니다. --------------------------------------------------------------------------------------
				// catchObject는 x, y, type를 매개변수로 가지고 있는 객체입니다
				// x는 객체의 x좌표, y는 객체의 y좌표, type는 객체의 type입니다.
				// 객체는 자신의 type를 가지고있습니다. type의 정보는 다음과 같습니다. [ 0 : 고양이(공격시 패배), 1 : 전기 타입, 2 : 불 타입, 3 : 물 타입, 4 : 땅 타입 ]
				// 공격속도는 1초이며, 플레이어는 1초에 한 번씩 공격여부, 공격 각도, 공격 타입을 정할 수 있습니다.
				// 플레이어는 적의 타입과 같은 타입의 공격을 맞췄을 경우, 3의 데미지를 입힐 수 있습니다.
				// 플레이어는 적의 타입과 다른 타입의 공격을 맞췄을 경우, 1의 데미지를 입힐 수 있습니다.
				// 플레이어가 만약 고양이를 공격했다면, 즉시 패배합니다.
				// 적이 플레이어의 위치에 도달하게 되면, 즉시 패배합니다.
				// 모든 적을 물리치는 코드를 작성해보세요.
				
				boolean isAttack = true;
				int type = 0;
				double angle = 0.0;
				
				
				







				// -------------------------------------------------------------------------------------------------------------
				JSONObject sendData = new JSONObject();
				sendData.put("action","codeData");
				sendData.put("pinnumber",pinNumber);
				sendData.put("attack", isAttack);
				sendData.put("angle",angle);
				sendData.put("type", type);
				this.send(sendData.toString());
				
			}

			@Override
			public void onOpen(ServerHandshake arg0) {

				System.out.println("onOpen()");
				JSONObject data = new JSONObject();
				data.put("action", "CodeInit");
				data.put("pinnumber", pinNumber);
				this.send(data.toString());

			}
		};
		mWs.connect();
	}
	
	
}
