# 도메인 관련

배포되고 있는 AWS 서버와 gabia에서 제공받은 도메인을 연결하였습니다.
<br>현재 도메인 주소는 catchcatch.kr 입니다.

# DB 덤프파일 관련

CATCH CATCH는 별도의 데이터베이스 관리 시스템을 사용하지 않습니다.
<br> 대신 웹소켓을 사용하여 Ranking.json 파일에 Json 형태로 유저의 랭킹 데이터만을 저장하는 <br>FileDB방식을 사용하였습니다.

# web 포팅 매뉴얼

1.  node.js를 설치합니다.
2.  터미널 경로를 프로젝트 경로로 설정합니다.
3.  npm i 를 하여 필요한 파일을 설치합니다.
4.  npm start로 실행합니다.

# 웹소켓 포팅 매뉴얼

1. AWS 서버에 node.js를 설치합니다.
2. server.js 경로에서 sudo npm init -y 로 환경 설정을 합니다.
3. sudo npm install express socket.io 를 작성하여 설치합니다.
4. sudo nohup node server.js start & 명령어로 서버에 백그라운드 실행을 합니다.
