# Windy Clone

**Windy Clone**은 3D 지구본 지도 위에 다양한 기상 및 지리 정보를 시각화하는 프로젝트입니다.
레이어 렌더링 및 히트맵 시각화를 구현하며, 직관적인 3D 지리 정보 경험을 제공하는 것을 목표로 합니다.

## 🛠 Tech Stack

| Category         | Technology                                                   |
| ---------------- | ------------------------------------------------------------ |
| **Language**     | TypeScript, React                                            |
| **Build Tool**   | Vite                                                         |
| **3D & Map**     | Deck.gl, React-map-gl, Maplibre-gl, Leaflet, Cesium (Resium) |
| **Architecture** | **FBA (Feature-Based Architecture)**                         |

**3D & Map** 관련 라이브러리는 아래와 같이 설치된 상태입니다. 필요하다면 라이브러리를 추가하여 사용하세요.

```bash
npm install deck.gl
npm install react-map-gl maplibre-gl maplibre-basemaps
npm install leaflet react-leaflet
npm install cesium resium
npm install -D vite-plugin-cesium
```

---

## 🚀 Getting Started (시작하기)

이 프로젝트를 로컬 환경에서 실행하기 위해 다음 단계를 따라주세요.

### 1. Prerequisites (사전 요구 사항)

개발을 위해 다음 도구들이 설치되어 있어야 합니다.

- **Node.js**: v22.0.0 이상
- **Package Manager**: npm

### 2. Installation (설치)

저장소를 클론하고 의존성을 설치합니다.

```bash
# Repository Clone
git clone https://github.com/wnsxk2/react-windy-clone.git
cd windy-clone

# Install Dependencies
npm install
```

### 3. Run (실행)

개발 서버를 실행합니다.

```bash
npm run dev
```

---

## 📂 Project Structure

이 프로젝트는 **FBA (Feature-Based Architecture)** 패턴을 따릅니다.
기능(Feature) 단위로 코드를 응집시켜 유지보수성을 높이는 것이 핵심입니다.

```
src
├─ app/          # 앱 진입점, 라우팅, 전역 Provider (비즈니스 로직 X)
├─ features/     # [핵심] 비즈니스 도메인별 기능 모듈 (Auth, Map, User 등)
├─ components/   # 도메인 무관한 재사용 UI (Button, Modal 등 Dumb Components)
├─ hooks/        # 도메인 무관한 범용 Hooks
├─ lib/          # 서드파티 라이브러리 설정 (Axios, MapBox Config 등)
├─ stores/       # 전역 상태 관리 (Feature 간 데이터 공유용)
└─ utils/        # 순수 자바스크립트 헬퍼 함수
```

---

## 💻 Development Guide (개발 가이드)

### 1. 아키텍처 철학 (Architecture Philosophy)

- **Co-location:** 관련된 코드는 가까운 곳에 둡니다.
- **Feature의 정의:** 단순 UI가 아닌, **사용자에게 비즈니스 가치를 제공하는 독립된 기능 단위** (예: `auth`, `payment`)를 의미합니다.

### 2. 파일 배치 의사결정 트리 (Decision Tree)

새로운 파일을 생성할 때 다음 흐름을 따라주세요.

1. 특정 비즈니스 도메인인가? 👉 **`src/features/{domain}/`**
2. 재사용 가능한 UI인가? 👉 **`src/components/`**
3. React Hook인가? 👉 **`src/hooks/`**
4. 순수 함수인가? 👉 **`src/utils/`**

### 3. 의존성 규칙 (Dependency Rules)

- 🚫 **Feature 간 직접 참조 금지:** `features/auth`가 `features/cart`를 import 할 수 없습니다.
- 🔄 **데이터 공유:** 전역 Store(`src/stores`)나 URL 파라미터를 통해 소통합니다.
- ✅ **상향 참조 허용:** Feature는 `components`, `hooks`, `utils`를 자유롭게 사용할 수 있습니다.

---

## 📏 Coding Convention

### Naming Rules

| 구분                | 규칙               | 예시                         |
| ------------------- | ------------------ | ---------------------------- |
| **폴더명**          | `kebab-case`       | `user-profile/`              |
| **컴포넌트 파일**   | `kebab-case.tsx`   | `login-form.tsx`             |
| **훅 파일**         | `kebab-case.ts`    | `use-auth.ts`                |
| **함수/변수**       | `camelCase`        | `getUserData`, `isLoading`   |
| **상태(Store)**     | `camelCase`        | `currentUser`, `isModalOpen` |
| **타입/인터페이스** | `PascalCase`       | `UserResponse`, `PopupData`  |
| **상수**            | `UPPER_SNAKE_CASE` | `API_TIMEOUT`, `MAX_COUNT`   |

### Code Style

- **Components:** Functional Component 사용.
- **Props:** `interface`로 타입 명시.
- **Handlers:** JSX 내부 인라인 작성 지양, 외부 함수 분리 (`handle+Event`).

---

## 🤝 Contributing

### Git Flow & Commit Message

**Conventional Commits** 규칙을 따릅니다.

- **브랜치 전략:** `feat/{대분류}/{기능명}` (예: `feat/map/layer-rendering`)
- **커밋 메시지:** `type: description`

| Type       | Description      | Example                             |
| ---------- | ---------------- | ----------------------------------- |
| `feat`     | 새로운 기능 추가 | `feat: 3D 히트맵 레이어 추가`       |
| `fix`      | 버그 수정        | `fix: 줌 레벨 오류 수정`            |
| `refactor` | 코드 리팩토링    | `refactor: 폴더 구조 개선`          |
| `docs`     | 문서 수정        | `docs: README 실행 가이드 업데이트` |
| `chore`    | 빌드/설정 수정   | `chore: vite 플러그인 추가`         |
