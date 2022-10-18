# GIT Commit Rule, Flow

## 📌 Commit 규칙

<aside>
💡 **#git이슈번호 종류 - 내용(한국어/영어 상관없음)**

</aside>

**예시)** 

**#31 fix 빌드실패 - blob → recordedBlob**

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
