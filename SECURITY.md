# Security Guide

이 문서는 프로젝트의 보안 설정과 모범 사례를 설명합니다.

## 🔒 환경 변수 관리

### 중요: .env.local 파일은 절대 커밋하지 마세요!

이 프로젝트는 민감한 정보를 환경 변수로 관리합니다:

- ✅ `.env.local` - 실제 Firebase 키 (Git에서 무시됨)
- ✅ `.env.example` - 템플릿 파일 (커밋 가능, 실제 값 없음)

### 초기 설정

1. `.env.example`을 복사하여 `.env.local` 생성:
   ```bash
   cp .env.example .env.local
   ```

2. `.env.local`에 실제 Firebase 값 입력

3. `.env.local`이 `.gitignore`에 있는지 확인:
   ```bash
   git status # .env.local이 표시되지 않아야 함
   ```

## 🔥 Firebase 보안

### API 키 공개에 대하여

Firebase 클라이언트 API 키(`NEXT_PUBLIC_FIREBASE_API_KEY`)는 공개되어도 괜찮습니다.

**이유**:
- Firebase 클라이언트 SDK는 브라우저에서 실행됩니다
- API 키는 Firebase 프로젝트 식별자일 뿐입니다
- **실제 보안은 Firestore Security Rules로 관리됩니다**

### Firestore 보안 규칙

`firestore.rules` 파일에서 데이터 접근을 제어합니다:

```javascript
// 읽기: 누구나 가능 (포트폴리오 공개 데이터)
allow read: if true;

// 쓰기: 인증된 사용자만 (관리자)
allow write: if request.auth != null;
```

**보안 규칙 배포**:
```bash
firebase deploy --only firestore:rules
```

### Firebase 도메인 제한 (권장)

Firebase Console에서 승인된 도메인만 허용하도록 설정:

1. Firebase Console → Authentication → Settings
2. Authorized domains에 실제 도메인 추가
3. 개발 중에는 `localhost` 허용

## 🛡️ 보안 헤더

`next.config.mjs`에 다음 보안 헤더가 설정되어 있습니다:

- **Strict-Transport-Security**: HTTPS 강제
- **X-Content-Type-Options**: MIME 타입 스니핑 방지
- **X-Frame-Options**: 클릭재킹 공격 방지
- **Referrer-Policy**: 리퍼러 정보 제어
- **Permissions-Policy**: 불필요한 브라우저 기능 비활성화

## 📋 GitHub 푸시 전 체크리스트

푸시하기 전에 다음을 확인하세요:

```bash
# 1. .env.local이 staged 되지 않았는지 확인
git status

# 2. 커밋 이력에 .env 파일이 없는지 확인
git log --all --full-history --source -- .env*

# 3. 하드코딩된 시크릿이 없는지 검색
grep -r "AIzaSy" . --exclude-dir=node_modules --exclude-dir=.git
```

## ⚠️ 만약 실수로 키를 푸시했다면?

1. **즉시 Firebase API 키 재생성**:
   - Firebase Console → Project Settings → General
   - Web API Key 재생성

2. **Git 히스토리에서 제거** (주의: 협업 시 팀원과 조율 필요):
   ```bash
   # BFG Repo-Cleaner 사용 (권장)
   bfg --delete-files .env.local
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push --force
   ```

3. **팀원들에게 알리고 저장소 다시 클론**

## 🔐 추가 보안 권장 사항

### 1. Dependabot 활성화
GitHub에서 Dependabot 알림을 활성화하여 취약한 패키지 자동 업데이트

### 2. Firebase App Check (선택사항)
앱 트래픽이 정당한 곳에서 오는지 확인:
```javascript
// firebase/config.js에 추가
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('recaptcha-site-key'),
  isTokenAutoRefreshEnabled: true
});
```

### 3. Rate Limiting
Firebase Functions에 rate limiting 추가하여 남용 방지

## 📞 보안 이슈 보고

보안 취약점을 발견하면:
1. **공개 이슈로 보고하지 마세요**
2. 이메일로 직접 연락: [your-email@example.com]
3. 48시간 내에 응답 예정

## 🔄 정기 보안 점검

월 1회 실시:
- [ ] npm audit 실행 및 취약점 수정
- [ ] Firebase Security Rules 검토
- [ ] 접근 로그 검토 (Firebase Console)
- [ ] 승인된 도메인 목록 확인
