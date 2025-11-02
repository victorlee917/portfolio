# Firebase Storage 설정 가이드

## Firebase Storage에서 파일 가져오기

`lib/storage.js`에서 제공하는 유틸리티 함수들을 사용하여 Firebase Storage의 파일에 접근할 수 있습니다.

## 사용 가능한 함수들

### 1. `getFileURL(path)` - 단일 파일 URL 가져오기

특정 파일의 다운로드 URL을 가져옵니다.

```javascript
import { getFileURL } from '@/lib/storage'

// Server Component
export default async function MyPage() {
  const imageUrl = await getFileURL('mojitto/profile.jpg')

  return <img src={imageUrl} alt="Profile" />
}

// Client Component
'use client'
import { useState, useEffect } from 'react'
import { getFileURL } from '@/lib/storage'

export default function MyComponent() {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    getFileURL('mojitto/profile.jpg').then(setImageUrl)
  }, [])

  return <img src={imageUrl} alt="Profile" />
}
```

### 2. `getAllFilesInPath(path)` - 디렉토리의 모든 파일 가져오기

특정 경로의 모든 파일과 다운로드 URL을 배열로 가져옵니다.

```javascript
import { getAllFilesInPath } from '@/lib/storage'

export default async function GalleryPage() {
  const files = await getAllFilesInPath('mojitto/images')

  return (
    <div>
      {files.map((file) => (
        <div key={file.fullPath}>
          <img src={file.url} alt={file.name} />
          <p>{file.name}</p>
        </div>
      ))}
    </div>
  )
}

// 반환값 예시:
// [
//   {
//     name: 'image1.jpg',
//     fullPath: 'mojitto/images/image1.jpg',
//     url: 'https://firebasestorage.googleapis.com/...'
//   },
//   {
//     name: 'image2.jpg',
//     fullPath: 'mojitto/images/image2.jpg',
//     url: 'https://firebasestorage.googleapis.com/...'
//   }
// ]
```

### 3. `getFilesAndFolders(path)` - 파일과 하위 폴더 모두 가져오기

```javascript
import { getFilesAndFolders } from '@/lib/storage'

export default async function BrowserPage() {
  const result = await getFilesAndFolders('mojitto')

  return (
    <div>
      <h2>Folders</h2>
      {result.folders.map((folder) => (
        <div key={folder.fullPath}>{folder.name}</div>
      ))}

      <h2>Files</h2>
      {result.files.map((file) => (
        <img key={file.fullPath} src={file.url} alt={file.name} />
      ))}
    </div>
  )
}

// 반환값 예시:
// {
//   files: [
//     { name: 'profile.jpg', fullPath: 'mojitto/profile.jpg', url: '...' }
//   ],
//   folders: [
//     { name: 'images', fullPath: 'mojitto/images' },
//     { name: 'videos', fullPath: 'mojitto/videos' }
//   ]
// }
```

### 4. `getMultipleFileURLs(paths)` - 여러 파일 URL 한 번에 가져오기

```javascript
import { getMultipleFileURLs } from '@/lib/storage'

export default async function MultiImagePage() {
  const urls = await getMultipleFileURLs([
    'mojitto/header.jpg',
    'mojitto/banner.jpg',
    'mojitto/footer.jpg'
  ])

  return (
    <div>
      {urls.map(({ path, url }) => (
        <img key={path} src={url} alt={path} />
      ))}
    </div>
  )
}
```

## Firestore와 Storage 함께 사용하기

Firestore에 파일 경로를 저장하고, Storage에서 실제 파일을 가져오는 패턴:

```javascript
import { getDotDataByPath } from '@/lib/firestore'
import { getFileURL, getAllFilesInPath } from '@/lib/storage'

export default async function MojittoPage() {
  // Firestore에서 메타데이터 가져오기
  const data = await getDotDataByPath('mojitto')

  // Storage에서 파일 가져오기 (옵션 1: 특정 파일)
  if (data.header.profileImage) {
    const profileUrl = await getFileURL(data.header.profileImage)
    data.header.profileUrl = profileUrl
  }

  // Storage에서 파일 가져오기 (옵션 2: 디렉토리 전체)
  const images = await getAllFilesInPath(`mojitto/gallery`)

  return (
    <div>
      {data.header.profileUrl && (
        <img src={data.header.profileUrl} alt="Profile" />
      )}

      <div className="gallery">
        {images.map((img) => (
          <img key={img.fullPath} src={img.url} alt={img.name} />
        ))}
      </div>
    </div>
  )
}
```

## Firestore 데이터 구조 권장사항

### 방법 1: Firestore에 파일 경로 저장

```javascript
// Firestore의 dots/mojitto 문서
{
  id: "mojitto",
  title: "Mojitto Project",
  profileImage: "mojitto/profile.jpg",        // Storage 경로
  galleryPath: "mojitto/gallery",             // Storage 디렉토리
  images: [
    "mojitto/image1.jpg",
    "mojitto/image2.jpg"
  ]
}

// 사용 예시
const data = await getDotDataByPath('mojitto')
const profileUrl = await getFileURL(data.header.profileImage)
const galleryImages = await getAllFilesInPath(data.header.galleryPath)
```

### 방법 2: Storage 경로를 path ID로 통일

```javascript
// 구조
// Firestore: dots/mojitto
// Storage: mojitto/ (모든 파일)

const data = await getDotDataByPath('mojitto')
const files = await getAllFilesInPath('mojitto')  // path와 동일한 경로
```

## Firebase Storage 보안 규칙

Firebase Console에서 Storage 규칙 설정:

1. **Firebase Console** → **Storage** → **Rules** 탭
2. 아래 규칙 적용:

```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Public read access for all files
    match /{allPaths=**} {
      allow read: if true;

      // Admin only write access
      allow write, create, update, delete: if request.auth != null;
    }

    // Or more specific rules per path
    match /{pathId}/{allFiles=**} {
      allow read: if true;
      allow write, create, update, delete: if request.auth != null;
    }
  }
}
```

3. **게시(Publish)** 클릭

## Next.js Image 컴포넌트와 함께 사용하기

Firebase Storage URL을 Next.js Image 컴포넌트에서 사용하려면 `next.config.mjs` 설정 필요:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
```

사용 예시:
```javascript
import Image from 'next/image'
import { getFileURL } from '@/lib/storage'

export default async function MyPage() {
  const imageUrl = await getFileURL('mojitto/profile.jpg')

  return (
    <Image
      src={imageUrl}
      alt="Profile"
      width={500}
      height={500}
    />
  )
}
```

## 성능 최적화 팁

### 1. 파일 URL 캐싱

Server Component에서 fetching하면 Next.js가 자동으로 캐싱합니다:

```javascript
// 자동 캐싱됨 (Server Component)
export default async function Page() {
  const url = await getFileURL('mojitto/profile.jpg')
  return <img src={url} alt="Profile" />
}
```

### 2. 병렬 로딩

여러 파일을 동시에 가져올 때:

```javascript
// Good: 병렬 처리
const [profile, banner, files] = await Promise.all([
  getFileURL('mojitto/profile.jpg'),
  getFileURL('mojitto/banner.jpg'),
  getAllFilesInPath('mojitto/gallery')
])

// Bad: 순차 처리
const profile = await getFileURL('mojitto/profile.jpg')
const banner = await getFileURL('mojitto/banner.jpg')
const files = await getAllFilesInPath('mojitto/gallery')
```

### 3. 이미지 최적화

Firebase Storage에 업로드하기 전에 이미지를 최적화하세요:
- WebP 포맷 사용
- 적절한 해상도로 리사이징
- 압축 적용

## 환경 변수 확인

`.env.local`에 Storage Bucket이 설정되어 있는지 확인:

```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=portfolio-7cb15.firebasestorage.app
```

## 문제 해결

### 권한 오류가 발생하는 경우

Firebase Console → Storage → Rules에서 읽기 권한이 public으로 설정되어 있는지 확인

### 파일을 찾을 수 없는 경우

1. Storage 경로 확인 (대소문자 구분)
2. Firebase Console → Storage에서 파일이 실제로 존재하는지 확인
3. 파일 경로에 슬래시(`/`) 확인 (예: `mojitto/image.jpg`)

### CORS 오류가 발생하는 경우

Firebase Storage는 기본적으로 CORS를 허용하지만, 문제가 있다면 gsutil로 설정:

```bash
# cors.json 파일 생성
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]

# 적용
gsutil cors set cors.json gs://portfolio-7cb15.firebasestorage.app
```
