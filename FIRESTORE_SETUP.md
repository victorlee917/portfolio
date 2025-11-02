# Firestore 설정 가이드

## 오류 해결: Permission Denied

`Missing or insufficient permissions` 오류가 발생하는 경우, Firebase Console에서 Firestore 보안 규칙을 설정해야 합니다.

## 설정 방법

### 1. Firebase Console 접속

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택
3. 왼쪽 메뉴에서 **Firestore Database** 클릭

### 2. 보안 규칙 설정

1. **규칙(Rules)** 탭 클릭
2. 아래 규칙을 복사하여 붙여넣기:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /dots/{dotId} {
      // Public read access for portfolio website
      allow read: if true;

      // Admin only: write access for authenticated users
      allow write, create, update, delete: if request.auth != null;

      match /contents/{contentId} {
        // Public read access
        allow read: if true;

        // Admin only: write access
        allow write, create, update, delete: if request.auth != null;
      }
    }

    match /contents/{contentId} {
      // Public read access
      allow read: if true;

      // Admin only: write access for authenticated users
      allow write, create, update, delete: if request.auth != null;
    }
  }
}
```

**중요:**
- **읽기(read)**: 모든 사용자가 포트폴리오를 볼 수 있도록 public 허용
- **쓰기(write/create/update/delete)**: 어드민(인증된 사용자)만 가능

3. **게시(Publish)** 버튼 클릭

### 3. 개발 환경에서 임시로 모든 권한 허용 (권장하지 않음)

개발 중에만 사용하고, 배포 전에 반드시 적절한 보안 규칙으로 변경하세요:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 경고: 개발 환경에서만 사용!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Firestore 데이터 구조

프로젝트에서 사용하는 데이터 구조:

```
dots (collection)
  └── {pathId} (document) - 예: 'mojitto', 'amd'
      ├── [필드들...]
      └── contents (필드 또는 sub-collection)
```

### 옵션 1: contents를 필드로 저장

```javascript
// 문서 구조
{
  id: "mojitto",
  title: "Mojitto Project",
  contents: {
    description: "...",
    images: [...]
  }
}

// 사용 함수
import { getDotDataByPath } from '@/lib/firestore'
const data = await getDotDataByPath('mojitto')
```

### 옵션 2: contents를 sub-collection으로 저장

```javascript
// 문서 구조
dots/mojitto (document)
  └── contents (sub-collection)
      ├── item1 (document)
      ├── item2 (document)
      └── ...

// 사용 함수
import { fetchDotsWithSubCollection } from '@/lib/firestore'
const data = await fetchDotsWithSubCollection('mojitto')
```

## 로컬 개발 환경 설정

### Firebase Emulator 사용 (선택사항)

로컬에서 Firestore를 테스트하려면:

1. Firebase CLI 설치:
```bash
npm install -g firebase-tools
```

2. Firebase 로그인:
```bash
firebase login
```

3. Emulator 초기화:
```bash
firebase init emulators
```

4. Emulator 실행:
```bash
firebase emulators:start
```

5. `lib/firestore.js`에 emulator 연결 코드 추가:
```javascript
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import app from '@/firebase/config'

const db = getFirestore(app)

// 개발 환경에서만 emulator 사용
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080)
}
```

## 문제 해결

### 여전히 권한 오류가 발생하는 경우

1. **Firebase Console에서 규칙이 올바르게 게시되었는지 확인**
2. **프로젝트 ID가 올바른지 확인** (`.env.local`의 `NEXT_PUBLIC_FIREBASE_PROJECT_ID`)
3. **브라우저 캐시 삭제 후 재시도**
4. **Firebase Console의 Firestore Database가 생성되어 있는지 확인**
   - Firestore Database가 없다면 "데이터베이스 만들기" 클릭
   - 위치 선택 (예: asia-northeast3 - Seoul)
   - 프로덕션 모드로 시작

### 데이터가 없는 경우

Firebase Console에서 수동으로 테스트 데이터 생성:

1. Firestore Database > 데이터 탭
2. "컬렉션 시작" 클릭
3. 컬렉션 ID: `dots`
4. 문서 ID: `mojitto` (또는 원하는 path ID)
5. 필드 추가:
   - `title` (string): "Test Title"
   - `contents` (map 또는 array): 테스트 데이터

## 보안 권장사항

프로덕션 환경에서는 반드시:

1. **읽기 권한 제한**: 필요한 경우에만 공개
2. **쓰기 권한 보호**: 인증된 사용자만 허용
3. **데이터 검증**: `request.resource.data`를 사용한 유효성 검사
4. **속도 제한**: 과도한 요청 방지

예시:
```
match /dots/{dotId} {
  allow read: if true;
  allow create: if request.auth != null
    && request.resource.data.title is string
    && request.resource.data.title.size() > 0;
  allow update, delete: if request.auth != null
    && request.auth.uid == resource.data.authorId;
}
```
