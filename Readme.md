# CatchCatch

![Logo2](https://user-images.githubusercontent.com/52388470/202899769-831e69d1-8fbf-4417-abfa-a4f66284f7cd.gif)

### UCC : [Link](https://drive.google.com/file/d/1-FeOOLFria1NnWZ3JuNyF8lZp3i6uGit/view?usp=sharing)

### 시연 시나리오 : [Link](https://drive.google.com/file/d/1qfPGl3_dDk73lSG3AATmMey8rE3C1M2t/view?usp=sharing)

## Overview

핵 앤 슬래시 액션 장르 게임인 CatchCatch입니다.
귀여운 고양이들과 친구인 요정들과 함께 몬스터들을 물리치며 참치를 지키세요!

## 6JS 팀 소개 : JS만을 활용하여 게임을 제작하기 위해 모인 어벤져스 팀

추희원, 박무창, 한진성, 최용욱, 최영선, 김규민

## 핵심 서비스

### 마우스와 키보드로 몬스터를 물리치는 아케이드 모드

- 세부 내용
  - 10분동안 진행되는 아케이드 모드는 5가지의 무기인 요정과 레벨업시 선택 할 수 있는 특성중 6마리의 펫으로 <br>몬스터를 물리칩니다.
  - 게임을 진행할수록 몬스터의 개체수와 능력치가 증가하며 특성 시간마다 3마리의 보스가 등장합니다.
  - 레벨업시 무기 업그레이드, 펫 중 랜덤으로 3개의 특성중 한가지를 선택하며 성장할 수 있습니다.

### 자신이 작성한 코딩으로 몬스터를 물리치는 게이미피케이션 코딩 모드

- 세부 내용
  - 코딩 모드에는 디펜스 모드와 베타버전인 턴제 모드가 있습니다.
  - 디펜스 모드는 고정된 위치에서 다가오는 몬스터들의 각도를 계산하여 물리치게됩니다.
  - 턴제 모드
  - 사용가능한 언어로는 C++,Java,Python,JavaScript가 있으며 코드 파일이 제공됩니다.
  - 게임을 진행하기 위해서는 Client에 적힌 핀번호를 해당 코드 파일에 작성한뒤 코드를 실행합니다.
  - 1초에 한번 오브젝트의 정보가 전달되며 전달된 정보를 통해 공격여부,각도,타입을 제어하는 방식으로 진행됩니다.
    ## <br>코딩모드 매뉴얼 : [Link](https://drive.google.com/file/d/1fEKIuOr7IEHHTEd6ES0MyooSrU5hJyfP/view?usp=share_link)

## 개발 환경

**Application**

- Visual Studio Code

**Backend**

- FileDB
- Websocket

**Frontend**

- JavaScript
- Phaser 3

**CI/CD**

- AWS EC2 ubuntu 20.04
- Nginx 1.18.0
- gabia domain - www.catchcatch.kr

## 포팅 매뉴얼

### Web

1.  node.js를 설치합니다.
2.  터미널 경로를 프로젝트 경로로 설정합니다.
3.  npm i 를 하여 필요한 파일을 설치합니다.
4.  npm start로 실행합니다.

### Program

## Electron : [Link](https://drive.google.com/file/d/1RaM-Td99r52cWndkwsosyQ-09NtHYnZm/view?usp=share_link)

## 아키텍쳐

![architecture](https://user-images.githubusercontent.com/52388470/202593855-4546e6bf-a30b-413b-9070-c20abb354aab.png)

## 협업

- Git
- Jira
- Mattermost
- Webex
- discode

## Git 컨벤션

### Git Commit 규칙

<aside>
💡 **#git이슈번호 종류 - 내용(한국어/영어 상관없음)**

</aside>

**예시)**

**#31 fix 빌드실패 - blob → recordedBlob**

**#31 feat params fd 하나만 보내지말고 applicantNo 추가해서 백엔드에 보내기**

## 📌 종류 (+[깃모지 추가](https://gitmoji.dev/))

- **feat - 기능 추가**

```
 ✨ :sparkles: 기능 추가 Introduce new features.
```

- **fix - 버그 수정**

```
🐛	:bug:	버그 수정	Fix a bug.
```

- **docs - 문서 수정 (README.md)**

```
📝 :memo: 문서 추가/수정 Add or update documentation.
```

- **style - 스타일 관련 기능(코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)**

```
🎨 :art: 코드의 구조/형태 개선 Improve structure / format of the code.
```

- **refactor - 코드 리팩토링**

```
♻️ :recycle: 코드 리팩토링 Refactor code.
```

- **test - 테스트 코드**

```
✅ :white_check_mark: 테스트 추가/수정 Add or update tests.
```

- **database - DB 관련 작업**

```
🗃️ :card_file_box: DB 관련 작업 Perform database related changes.
```

- **simple_fix - 심플 이슈 수정**

```
🩹 :adhesive_bandage: 심플 이슈(오타 등) 수정 Simple fix for a non-critical issue.
```

- **comments - 주석**

```
💡 :bulb: 주석 추가 및 수정 Add or update comments in source code.
```

- **catch - 에러 해결**

```
🥅 :goal_net: 에러 잡음 Catch errors.
```

- **chore - 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)**

```
🙈 :see_no_evil: .gitignore 추가/수정 Add or update a .gitignore file.
```

- **delete - 코드/파일 삭제**

```
🔥 :fire: 코드/파일 삭제 Remove code or files.
```

- **improve - 개선할 필요가 있는 코드**

```
💩  :poop: 똥싼 코드 Write bad code that needs to be improved.
```

`**깃모지 출처**: [https://inpa.tistory.com/entry/GIT-⚡️-Gitmoji-사용법-Gitmoji-cli](https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-Gitmoji-%EC%82%AC%EC%9A%A9%EB%B2%95-Gitmoji-cli)`

### 제목

1. 제목과 본문을 `빈 행으로 구분`한다.
2. 제목 첫 글자는 `대문자`로 작성.
3. 제목은 `명령문`으로 사용하며 과거형을 사용하지 않는다.

### 본문

1. `72자 단위로 개행`한다.
2. 양에 구애 받지 않고 `최대한 상세히 작성`
3. 어떻게 했는지 보다는 `무엇을` 바꾸었고 `왜` 바꿨는지 설명

### 📌 GIT FLOW

- Main: 배포
- Develop: BE, FE를 모두 합쳐서 Master 브랜치에 배포
- FrontEnd : 각 기능별 브랜치로 나눠 작업한뒤 develop에 병합

## ERD

FileDB방식으로 Json파일에 지역, 점수, 이름을 형식으로 저장하였습니다.
