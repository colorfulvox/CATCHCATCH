import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;

import org.java_websocket.client.WebSocketClient;
//import org.java_websocket.drafts.Draft;
import org.java_websocket.drafts.Draft_6455;
import org.java_websocket.handshake.ServerHandshake;
import org.json.JSONArray;
import org.json.JSONObject;

class CatchObj {
	double x;
	double y;
	int type;
	double radius;
	public CatchObj() {
	}

	public CatchObj(double x, double y, int type, double radius) {
		super();
		this.x = x;
		this.y = y;
		this.type = type;
		this.radius = radius;
	}

	@Override
	public String toString() {
		return "CatchObj [x=" + x + ", y=" + y + ", type=" + type + ", radius=" + radius + "]";
	}

}

//*실행 필수 라이브러리 설치 안내*

// ☆Java-WebSocket 라이브러리 다운로드★
// https://mvnrepository.com/artifact/org.java-websocket/Java-WebSocket
// ☆JsonObject 라이브러리 다운로드 ★
// https://jar-download.com/artifacts/org.json
// ☆slf4j 라이브러리 다운로드 ★
// https://mvnrepository.com/artifact/org.slf4j/slf4j-api
// 3개의 JAR파일을 프로젝트 우클릭 -> properties -> java build path -> Libraries -> Add External JARS를 통해 Import 시켜준다.
// Apply and Close를 눌러 저장

public class CodeCatch {
	
	// 여기에 복사한 핀 번호를 입력하세요!
	static String pinNumber = "________";

	public static void main(String[] args) throws URISyntaxException {

		WebSocketClient mWs = new WebSocketClient(new URI("ws://k7c106.p.ssafy.io:8080"), new Draft_6455()) {

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
				System.out.println(jsonData.get("action"));
				CatchObj catchObject[] = null;
				if (jsonData.get("action").equals("exeData")) {
					obj = jsonData.getJSONArray("catchobj");
					catchObject = new CatchObj[obj.length()];

					for (int i = 0, n = obj.length(); i < n; i++) {
						JSONArray objSub = obj.getJSONArray(i);
						if (objSub.length() != 0) {
							catchObject[i] = new CatchObj(objSub.getDouble(0), objSub.getDouble(1), objSub.getInt(2), objSub.getDouble(3));

						}
					}
				}else if (jsonData.get("action").equals("endGame")) {
					System.out.println("------------------------------EndGame-------------------------");
					System.exit(1);
				}
				// 여기서부터 코드 작성하시면 됩니다.
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
				
				boolean isAttack = true;
				int type = 0;
				double angle = 0.0;

				double minDist = 9999999.9;
				int index = 0;
				System.out.println(Arrays.toString(catchObject));
				for(int i=0;i<catchObject.length;i++) {
					double temp = Math.sqrt(Math.pow(catchObject[i].x,2)+Math.pow(catchObject[i].y, 2));
					if(minDist > temp && catchObject[i].type != 0) {
						minDist = temp;
						index = i;
						System.out.println("dist:"+minDist+" i :"+ i);
					}
				}
				
				if (catchObject.length > 0) {
					angle = Math.atan2(catchObject[index].y - 0.0, catchObject[index].x - 0.0) * 180 / Math.PI;
					System.out.println(angle);
					type = catchObject[index].type;
					switch(catchObject[index].type) {
					case 0:
						type = 1;
						break;
					case 1:
						type = 1;
						break;
					case 2:
						type = 5;
						break;
					case 3:
						type = 4;
						break;
					case 4:
						type = 2;
						break;
					case 5:
						type = 3;
						break;
					}
					
				}

				// -----------------------------------------------------------------------
				JSONObject sendData = new JSONObject();
				sendData.put("action", "codeData");
				sendData.put("pinnumber", pinNumber);
				sendData.put("attack", isAttack);
				sendData.put("angle", angle);
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
