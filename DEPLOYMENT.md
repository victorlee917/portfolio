# Vercel 배포 가이드

이 문서는 Next.js 포트폴리오를 Vercel에 배포하는 단계별 가이드입니다.

## 📋 배포 전 체크리스트

### 1. Git 커밋 및 푸시

```bash
# 현재 변경사항 확인
git status

# 모든 변경사항 추가
git add .

# 커밋 (의미있는 메시지 작성)
git commit -m "feat: Complete portfolio with Firebase integration and optimizations"

# GitHub에 푸시
git push origin main
```

### 2. 환경 변수 확인

`.env.local` 파일에 다음 변수들이 설정되어 있는지 확인:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

⚠️ **중요**: `.env.local`은 Git에 푸시하지 마세요! Vercel에서 직접 설정합니다.

## 🚀 Vercel 배포 단계

### Step 1: Vercel 계정 생성 및 로그인

1. [Vercel 웹사이트](https://vercel.com) 방문
2. GitHub 계정으로 로그인 (권장)
3. GitHub 연동 승인

### Step 2: 새 프로젝트 생성

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. GitHub 리포지토리 목록에서 `portfolio` 선택
3. "Import" 클릭

### Step 3: 프로젝트 설정

#### Build & Development Settings
Vercel이 자동으로 감지하지만, 확인하세요:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (또는 `next build`)
- **Output Directory**: `.next` (기본값)
- **Install Command**: `npm install`

#### Environment Variables 설정 (중요!)

1. "Environment Variables" 섹션 펼치기
2. `.env.local`의 모든 변수 추가:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSy...` (실제 값) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `portfolio-7cb15.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `portfolio-7cb15` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `portfolio-7cb15.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `688833328181` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:688833...` (실제 값) |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-W2VH...` (실제 값) |

**Environment 선택**:
- ✅ Production
- ✅ Preview
- ✅ Development (선택사항)

### Step 4: 배포 시작

1. **"Deploy"** 버튼 클릭
2. 빌드 진행 상황 확인 (약 2-5분 소요)
3. 배포 완료 후 "Visit" 클릭하여 확인

## 🌐 배포 후 설정

### 1. 도메인 URL 업데이트

배포 완료 후 Vercel이 제공하는 URL (예: `https://portfolio-abc123.vercel.app`)을 확인하고, 다음 파일들의 `https://yourwebsite.com`을 실제 URL로 변경하세요:

#### 업데이트 필요한 파일들:

**app/sitemap.js** (7번째 줄)
```javascript
const baseUrl = 'https://portfolio-abc123.vercel.app' // 실제 Vercel URL
```

**app/robots.js** (2번째 줄)
```javascript
const baseUrl = 'https://portfolio-abc123.vercel.app' // 실제 Vercel URL
```

**app/layout.js** (23, 31번째 줄)
```javascript
url: 'https://portfolio-abc123.vercel.app', // 실제 Vercel URL
```

**app/page.js** (9번째 줄)
```javascript
canonical: 'https://portfolio-abc123.vercel.app', // 실제 Vercel URL
```

**app/[pathId]/page.js** (9번째 줄)
```javascript
const baseUrl = 'https://portfolio-abc123.vercel.app' // 실제 Vercel URL
```

### 2. Firebase 도메인 승인

Firebase Console에서 Vercel 도메인을 승인된 도메인에 추가:

1. [Firebase Console](https://console.firebase.google.com) 접속
2. 프로젝트 선택 (`portfolio-7cb15`)
3. **Authentication** → **Settings** → **Authorized domains**
4. "Add domain" 클릭
5. Vercel URL 추가 (예: `portfolio-abc123.vercel.app`)

### 3. URL 변경 후 재배포

```bash
# 변경사항 커밋
git add .
git commit -m "chore: Update domain URLs to Vercel deployment URL"
git push origin main
```

Vercel이 자동으로 재배포합니다 (약 1-2분 소요).

## 🔄 자동 배포 설정

Vercel은 기본적으로 다음을 자동으로 처리합니다:

- ✅ `main` 브랜치 푸시 시 자동 배포 (Production)
- ✅ PR 생성 시 Preview 배포
- ✅ 빌드 실패 시 알림
- ✅ HTTPS 자동 설정

## 🎨 커스텀 도메인 연결 (선택사항)

자신의 도메인을 사용하려면:

1. Vercel 프로젝트 → **Settings** → **Domains**
2. "Add" 클릭
3. 도메인 입력 (예: `junwoolee.com`)
4. DNS 설정 안내에 따라 도메인 제공업체에서 설정
5. 도메인 확인 완료 후, 위의 "도메인 URL 업데이트" 단계 반복

## 📊 배포 모니터링

### Vercel Analytics (선택사항)

1. Vercel 프로젝트 → **Analytics** 탭
2. "Enable Analytics" 클릭
3. 방문자 통계, 성능 지표 확인 가능

### 배포 로그 확인

- Vercel 대시보드 → **Deployments**
- 각 배포 클릭하여 빌드 로그 확인
- 에러 발생 시 상세 로그 확인 가능

## 🐛 문제 해결

### 빌드 실패

**에러**: `Module not found` 또는 `Cannot find module`
```bash
# package.json의 dependencies 확인
npm install
npm run build  # 로컬에서 테스트
```

**에러**: 환경 변수 관련
- Vercel 대시보드에서 Environment Variables 재확인
- 변수명이 정확한지 확인 (대소문자 구분)
- "Redeploy" 버튼으로 재배포

### Firebase 연결 실패

**증상**: 데이터가 로드되지 않음
- Firebase Console에서 도메인이 승인되었는지 확인
- Vercel 배포 로그에서 Firebase 연결 에러 확인
- 브라우저 개발자 도구 Console에서 에러 확인

### 404 에러 (동적 라우팅)

**증상**: `/[pathId]` 페이지가 404
- `app/[pathId]/page.js` 파일이 커밋되었는지 확인
- Vercel 로그에서 빌드 시 페이지가 생성되었는지 확인

## 📱 배포 후 테스트 체크리스트

- [ ] 홈페이지 로딩 확인
- [ ] Firebase 데이터 로딩 확인
- [ ] 이미지 로딩 확인 (Firebase Storage)
- [ ] 다크/라이트 모드 전환 확인
- [ ] 동적 라우팅 (`/[pathId]`) 확인
- [ ] 스크롤 애니메이션 확인
- [ ] 모바일 반응형 확인
- [ ] SEO 메타태그 확인 (View Page Source)
- [ ] sitemap.xml 접근 확인 (`/sitemap.xml`)
- [ ] robots.txt 접근 확인 (`/robots.txt`)

## 🔐 보안 체크리스트

- [ ] `.env.local`이 Git에 푸시되지 않았는지 확인
- [ ] Vercel 환경 변수가 올바르게 설정되었는지 확인
- [ ] Firebase 도메인이 승인되었는지 확인
- [ ] HTTPS가 활성화되었는지 확인 (Vercel 자동)

## 🎉 배포 완료!

축하합니다! 포트폴리오가 성공적으로 배포되었습니다.

**다음 단계**:
1. Google Search Console에 sitemap 제출
2. Google Analytics 설정 (선택사항)
3. 소셜 미디어에 공유

## 💡 추가 팁

### 빌드 성능 최적화
Vercel 프로젝트 → **Settings** → **Functions**
- Function Region: 사용자와 가까운 지역 선택 (예: Seoul)

### 환경별 설정
- **Production**: 실제 운영 환경
- **Preview**: PR 및 브랜치 배포 (테스트용)
- **Development**: 로컬 개발 환경

### Vercel CLI 사용 (고급)
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 로컬에서 배포
vercel

# Production 배포
vercel --prod
```

## 📚 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Firebase Hosting with Vercel](https://firebase.google.com/docs/hosting/frameworks/nextjs)
