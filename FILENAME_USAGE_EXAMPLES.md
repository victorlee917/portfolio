# Firebase Storage - 파일 이름 기반 활용 가이드

## 개요

Firebase Storage의 파일들을 **파일 이름**을 기준으로 쉽게 활용할 수 있는 유틸리티 함수들을 제공합니다.

## 주요 함수들

### 1. `getFilesByName(path)` - 파일 이름으로 객체 생성 ⭐ 추천

파일 이름(확장자 제외)을 키로 하는 객체를 반환합니다.

```javascript
import { getFilesByName } from '@/lib/storage'

export default async function MojittoPage() {
  const files = await getFilesByName('mojitto')

  // 반환값:
  // {
  //   'profile': { name: 'profile.jpg', url: '...', extension: 'jpg', fullPath: '...', nameWithoutExtension: 'profile' },
  //   'hero': { name: 'hero.png', url: '...', extension: 'png', fullPath: '...', nameWithoutExtension: 'hero' },
  //   'banner': { name: 'banner.webp', url: '...', extension: 'webp', fullPath: '...', nameWithoutExtension: 'banner' }
  // }

  return (
    <div>
      {/* 파일 이름으로 직접 접근 */}
      <img src={files['profile'].url} alt="Profile" />
      <img src={files['hero'].url} alt="Hero" />
      <img src={files['banner'].url} alt="Banner" />

      {/* 확장자 정보도 함께 사용 */}
      {files['profile'].extension === 'jpg' && <p>JPEG 이미지</p>}
    </div>
  )
}
```

**장점:**
- 파일 이름만 알면 바로 접근 가능
- 확장자를 신경 쓰지 않아도 됨
- 조건부 렌더링이 쉬움

### 2. `getFileByName(path, filename)` - 특정 파일 검색

파일 이름으로 검색하여 하나의 파일을 가져옵니다 (부분 매칭 지원).

```javascript
import { getFileByName } from '@/lib/storage'

export default async function Page() {
  // 'hero'가 포함된 파일 찾기 (hero.jpg, hero-banner.png 등)
  const heroImage = await getFileByName('mojitto', 'hero')

  if (!heroImage) {
    return <div>Hero image not found</div>
  }

  return <img src={heroImage.url} alt="Hero" />
}
```

**사용 예시:**
```javascript
// Storage에 있는 파일들:
// - hero-main.jpg
// - hero-mobile.jpg
// - profile.jpg

const hero = await getFileByName('mojitto', 'hero')
// 'hero-main.jpg' 또는 'hero-mobile.jpg' 중 하나를 반환 (첫 번째 매칭)

const heroMain = await getFileByName('mojitto', 'hero-main')
// 'hero-main.jpg' 정확히 반환
```

### 3. `getFilesSortedByName(path, order)` - 정렬된 파일 목록

파일을 이름 순서대로 정렬하여 가져옵니다.

```javascript
import { getFilesSortedByName } from '@/lib/storage'

export default async function GalleryPage() {
  // 오름차순 정렬 (기본값)
  const files = await getFilesSortedByName('mojitto/gallery', 'asc')

  // 내림차순 정렬
  // const files = await getFilesSortedByName('mojitto/gallery', 'desc')

  return (
    <div className="gallery">
      {files.map((file) => (
        <img key={file.fullPath} src={file.url} alt={file.name} />
      ))}
    </div>
  )
}
```

**유용한 파일 명명 규칙:**
```
01-intro.jpg
02-main.jpg
03-detail.jpg
...
10-conclusion.jpg

// 또는
a-first.jpg
b-second.jpg
c-third.jpg
```

### 4. `getFilesGroupedByExtension(path)` - 확장자별 그룹화

파일들을 확장자별로 그룹화합니다.

```javascript
import { getFilesGroupedByExtension } from '@/lib/storage'

export default async function MediaPage() {
  const grouped = await getFilesGroupedByExtension('mojitto/media')

  // 반환값:
  // {
  //   'jpg': [{ name: 'photo1.jpg', url: '...' }, { name: 'photo2.jpg', url: '...' }],
  //   'png': [{ name: 'icon.png', url: '...' }],
  //   'mp4': [{ name: 'video.mp4', url: '...' }],
  //   'pdf': [{ name: 'resume.pdf', url: '...' }]
  // }

  return (
    <div>
      <section>
        <h2>Images (JPG)</h2>
        {grouped.jpg?.map((file) => (
          <img key={file.fullPath} src={file.url} alt={file.name} />
        ))}
      </section>

      <section>
        <h2>Images (PNG)</h2>
        {grouped.png?.map((file) => (
          <img key={file.fullPath} src={file.url} alt={file.name} />
        ))}
      </section>

      <section>
        <h2>Videos</h2>
        {grouped.mp4?.map((file) => (
          <video key={file.fullPath} src={file.url} controls />
        ))}
      </section>
    </div>
  )
}
```

## 실전 활용 예시

### 예시 1: 명명 규칙 기반 레이아웃

```javascript
import { getFilesByName } from '@/lib/storage'
import { getDotDataByPath } from '@/lib/firestore'

export default async function ProjectPage() {
  const data = await getDotDataByPath('mojitto')
  const files = await getFilesByName('mojitto')

  // Storage 구조:
  // mojitto/
  //   hero.jpg
  //   logo.png
  //   screenshot-1.jpg
  //   screenshot-2.jpg
  //   screenshot-3.jpg

  return (
    <div>
      {/* Hero 섹션 */}
      {files['hero'] && (
        <section className="hero">
          <img src={files['hero'].url} alt="Hero" />
        </section>
      )}

      {/* Logo */}
      {files['logo'] && (
        <img src={files['logo'].url} alt="Logo" className="logo" />
      )}

      {/* Screenshots */}
      <div className="screenshots">
        {files['screenshot-1'] && (
          <img src={files['screenshot-1'].url} alt="Screenshot 1" />
        )}
        {files['screenshot-2'] && (
          <img src={files['screenshot-2'].url} alt="Screenshot 2" />
        )}
        {files['screenshot-3'] && (
          <img src={files['screenshot-3'].url} alt="Screenshot 3" />
        )}
      </div>
    </div>
  )
}
```

### 예시 2: 동적 매핑

```javascript
import { getFilesByName } from '@/lib/storage'

export default async function TeamPage() {
  const files = await getFilesByName('team')

  // Storage 구조:
  // team/
  //   member-john.jpg
  //   member-jane.jpg
  //   member-bob.jpg

  const members = [
    { id: 'john', name: 'John Doe', role: 'Developer' },
    { id: 'jane', name: 'Jane Smith', role: 'Designer' },
    { id: 'bob', name: 'Bob Wilson', role: 'Manager' },
  ]

  return (
    <div className="team">
      {members.map((member) => (
        <div key={member.id} className="member">
          {files[`member-${member.id}`] && (
            <img
              src={files[`member-${member.id}`].url}
              alt={member.name}
            />
          )}
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  )
}
```

### 예시 3: Firestore + Storage 통합

```javascript
import { getDotDataByPath } from '@/lib/firestore'
import { getFilesByName } from '@/lib/storage'

export default async function PortfolioPage() {
  const data = await getDotDataByPath('mojitto')
  const files = await getFilesByName('mojitto')

  // Firestore contents 배열:
  // [
  //   { id: 'mojitto', title: 'Project Overview', imageKey: 'overview' },
  //   { id: 'mojitto', title: 'Features', imageKey: 'features' },
  //   { id: 'mojitto', title: 'Results', imageKey: 'results' }
  // ]

  return (
    <div>
      {data.contents.map((content, index) => (
        <section key={index}>
          <h2>{content.title}</h2>
          {content.imageKey && files[content.imageKey] && (
            <img
              src={files[content.imageKey].url}
              alt={content.title}
            />
          )}
        </section>
      ))}
    </div>
  )
}
```

### 예시 4: 반응형 이미지

```javascript
import { getFilesByName } from '@/lib/storage'

export default async function ResponsivePage() {
  const files = await getFilesByName('mojitto')

  // Storage 구조:
  // mojitto/
  //   hero-desktop.jpg
  //   hero-tablet.jpg
  //   hero-mobile.jpg

  return (
    <picture>
      {files['hero-desktop'] && (
        <source
          media="(min-width: 1024px)"
          srcSet={files['hero-desktop'].url}
        />
      )}
      {files['hero-tablet'] && (
        <source
          media="(min-width: 768px)"
          srcSet={files['hero-tablet'].url}
        />
      )}
      {files['hero-mobile'] && (
        <img src={files['hero-mobile'].url} alt="Hero" />
      )}
    </picture>
  )
}
```

## 권장 파일 명명 규칙

### 1. 역할 기반 명명
```
hero.jpg           - 메인 이미지
logo.png           - 로고
profile.jpg        - 프로필 사진
banner.webp        - 배너 이미지
thumbnail.jpg      - 썸네일
```

### 2. 순서 기반 명명
```
01-intro.jpg
02-overview.jpg
03-features.jpg
04-results.jpg
05-conclusion.jpg
```

### 3. 카테고리-이름 패턴
```
screenshot-main.jpg
screenshot-feature1.jpg
screenshot-feature2.jpg
icon-home.svg
icon-settings.svg
member-john.jpg
member-jane.jpg
```

### 4. 반응형 패턴
```
hero-desktop.jpg
hero-tablet.jpg
hero-mobile.jpg
```

## 장점 요약

✅ **직관적인 접근**: `files['hero'].url` 형태로 쉽게 접근
✅ **타입 안전성**: 파일 이름을 키로 사용하여 오타 방지
✅ **확장자 무관**: `.jpg`, `.png`, `.webp` 등 확장자에 관계없이 접근
✅ **조건부 렌더링**: 파일 존재 여부를 쉽게 확인
✅ **정렬과 필터링**: 파일 이름 기준으로 정렬 및 검색 가능

## 다른 함수와 비교

| 함수 | 반환 형태 | 사용 시기 |
|------|-----------|-----------|
| `getAllFilesInPath()` | 배열 | 모든 파일을 순회해야 할 때 |
| `getFilesByName()` | 객체 (이름: 파일) | 특정 파일에 직접 접근할 때 ⭐ |
| `getFileByName()` | 단일 객체 | 하나의 파일만 검색할 때 |
| `getFilesSortedByName()` | 정렬된 배열 | 순서대로 표시할 때 |
| `getFilesGroupedByExtension()` | 객체 (확장자: 배열) | 파일 타입별로 분류할 때 |

## 성능 팁

모든 함수는 내부적으로 `getAllFilesInPath()`를 호출하므로, 여러 함수를 동시에 사용할 경우 한 번만 호출하고 결과를 재사용하는 것이 좋습니다:

```javascript
// ❌ 비효율적
const fileMap = await getFilesByName('mojitto')
const sorted = await getFilesSortedByName('mojitto')

// ✅ 효율적
const allFiles = await getAllFilesInPath('mojitto')

// 직접 가공
const fileMap = {}
allFiles.forEach(file => {
  const name = file.name.split('.')[0]
  fileMap[name] = file
})

const sorted = [...allFiles].sort((a, b) => a.name.localeCompare(b.name))
```
