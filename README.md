# CDRI Books

## 과제 진행 일시

- 2026년 4월 3일 ~ 2026년 4월 5일

## 기술 스택

### 핵심

- `react` — UI 렌더링 프레임워크
- `react-dom` — React DOM 바인딩
- `typescript` — 정적 타입 검사로 코드 안정성 확보
- `vite` — 빠른 개발 서버 및 빌드 도구

### 스타일링

- `tailwindcss` — 유틸리티 기반 CSS 프레임워크
- `@tailwindcss/vite` — Vite 환경에서 Tailwind v4 통합 플러그인
- `tw-animate-css` — Tailwind용 애니메이션 유틸리티 (shadcn 의존)

### UI 컴포넌트

- `shadcn` — UI 컴포넌트 CLI, 필요한 컴포넌트를 프로젝트에 직접 추가
- `@base-ui/react` — shadcn 내부 헤드리스 컴포넌트 (접근성, 키보드 내비게이션 등)
- `lucide-react` — 아이콘 라이브러리 (shadcn 기본 아이콘)
- `class-variance-authority` — 컴포넌트 variant 스타일 관리 (size, color 등 조합)
- `clsx` — 조건부 클래스 이름 결합 유틸리티
- `tailwind-merge` — Tailwind 클래스 충돌 시 후순위 클래스 우선 적용

### 데이터 페칭

- `axios` — HTTP 클라이언트 (보안 이슈로 1.14.0 버전 고정)
- `@tanstack/react-query` — 서버 상태 관리 및 데이터 캐싱
- `@tanstack/react-query-devtools` — React Query 디버깅용 개발자 도구

## 스크립트

```bash
yarn dev       # 개발 서버 실행
yarn build     # 프로덕션 빌드
yarn lint      # ESLint 검사
yarn preview   # 빌드 결과 미리보기
```
