# 프로젝트 컨텍스트: 릴테크 (ReelTech)

## 1. 프로젝트 개요

- **프로젝트명:** 릴테크 (ReelTech)
- **유형:** 모바일 웹 앱 (Mobile Web App / PWA)
- **핵심 가치:** 숏폼 영상을 시청하고 다면 평가를 남기면 보상을 받는 앱테크 서비스.
- **타겟:**
- 크리에이터: 피드백이 필요한 초보 영상 제작자.
- 시청자: 숏폼을 즐겨보며 수익을 창출하려는 앱테크 유저.

## 2. 기술 스택 (Tech Stack)

- **Frontend:** React (Vite), TypeScript
- **Styling:** Tailwind CSS (100% 모바일 뷰 기준)
- **Animation:** Framer Motion (스플래시, 모달 등장 효과)
- **State Management:** Zustand (영상 재생 상태, 타이머 관리)
- **Icons:** Lucide-react or React-icons
- **Backend:** Firebase (Auth, Firestore)

## 3. UX/UI 핵심 플로우 (User Flow) - _중요_

앱 실행 시 아래 순서대로 화면이 전환됨. 개발 시 이 시나리오를 엄수할 것.

### A. 스플래시 화면 (Splash Screen)

- 앱 접속 시, 화면 중앙에 1.5~2초간 로고 노출 후 페이드 아웃.
- 유저 인증(로그인 여부)을 백그라운드에서 체크하는 동안 보여줌.

### B. 출석 체크 모달 (Attendance Module)

- 메인 화면 위에 오버레이(Modal) 형태로 뜸.
- **UI:** "n일차 출석 달성! +포인트" 문구와 귀여운 아이콘/Lottie 애니메이션.
- **Action:** 우측 상단이나 하단 '닫기(X)' 버튼을 누르면 모달이 사라지고 메인 피드가 활성화됨.
- **Logic:** 하루에 한 번만 뜨도록 로컬 스토리지나 DB 확인 필요.

### C. 메인 피드 (Short-form Feed)

- **Layout:** 틱톡/릴스처럼 **화면 꽉 차는 세로 스크롤 (Full-page Vertical Scroll)**.
- **Scroll Behavior:** CSS `scroll-snap-type: y mandatory` 적용하여 영상 단위로 딱딱 끊겨서 넘어가야 함.
- **Focus Logic:** 현재 뷰포트 중앙에 위치한 영상만 재생(Play)하고, 벗어난 영상은 일시정지(Pause).

### D. 타이머 및 평가 진입 (Timer & Trigger)

- **Timer UI:** 영상 시청이 시작되면 상단(Header 영역)에 "15초 뒤 평가 가능" 같은 카운트다운 텍스트 표시.
- **Completion:** 지정된 시간(예: 15초 또는 영상 길이의 80%)이 지나면, "평가하기" 버튼이 활성화되거나 반짝이는 효과(Interaction) 추가.
- **Constraint:** 시간을 채우지 않고 스크롤을 넘기면 타이머 초기화.

### E. 평가 입력 폼 (Evaluation Form)

- **UI:** 영상을 다 본 후 '평가하기'를 누르면 하단에서 올라오는 **바텀 시트(Bottom Sheet)** 형태.
- **Input Fields (필수 항목):**

1. **종합 평점:** 별점 5점 만점.
2. **세부 지표 (리커트 5점 척도):**

- 재미 (Fun)
- 유익함 (Informative)
- 후킹/몰입도 (Hook)

3. **한줄평:** `textarea`. 최소 20자 이상 입력 제한 (20자 미만 시 제출 버튼 비활성화).

- **Action:** '제출하기' 누르면 포인트 지급 애니메이션 후 다음 영상으로 자동 스크롤 또는 폼 닫기.

## 4. 데이터 구조 (Firestore Schema)

### Collection: `campaigns` (평가 대상 영상)

- `id`: string
- `platform`: 'youtube' | 'instagram'
- `videoId`: string (URL에서 추출한 ID)
- `requiredWatchTime`: number (초 단위, 예: 15)
- ... (기타 메타데이터)

### Collection: `feedbacks` (평가 데이터)

- `id`: string
- `campaignId`: string
- `userId`: string
- `metrics`: Map (세부 점수)
- `rating`: number (종합)
- `fun`: number
- `informative`: number
- `hook`: number

- `comment`: string (20자 이상)
- `createdAt`: timestamp

## 5. 구현 시 유의 사항 (Developer Note)

- **모바일 퍼스트:** 모든 UI는 모바일(width: 100%, max-width: 480px 등) 기준으로 작성.
- **영상 처리:** `iframe` 사용 시 `pointer-events` 등을 조절하여 유저가 영상 내부 링크를 타고 유튜브로 이탈하지 않도록 방지하는 레이어 고려.
- **성능:** 리스트 가상화(Virtualization)는 초기 MVP엔 복잡하므로 제외하되, DOM 요소가 너무 많이 쌓이지 않게 관리 주의.
