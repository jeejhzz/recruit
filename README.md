# 디노티시아 채용 페이지 배포 가이드

## 파일 구조

```
dnotitia-recruit/
├── api/
│   └── match.js        ← Gemini API 호출 (API 키는 여기서만 사용)
├── public/
│   └── index.html      ← 채용 페이지 (API 키 없음, 안전)
├── vercel.json         ← Vercel 설정
└── README.md
```

---

## 배포 방법 (클릭 몇 번으로 완료!)

### 1단계 — GitHub에 올리기

1. [github.com](https://github.com) 로그인
2. 오른쪽 상단 **+** 버튼 → **New repository** 클릭
3. Repository name: `dnotitia-recruit` 입력
4. **Create repository** 클릭
5. 화면에 나오는 **"uploading an existing file"** 링크 클릭
6. 이 폴더 안의 파일들을 **모두 드래그앤드롭**으로 업로드
   - `api/match.js`
   - `public/index.html`
   - `vercel.json`
7. **Commit changes** 클릭

---

### 2단계 — Vercel에 배포하기

1. [vercel.com](https://vercel.com) 로그인
2. **Add New → Project** 클릭
3. GitHub 연결 → `dnotitia-recruit` 저장소 선택 → **Import** 클릭
4. **Environment Variables** 섹션에서:
   - Name: `GEMINI_API_KEY`
   - Value: 발급받은 Gemini API 키 붙여넣기
5. **Deploy** 클릭 → 1~2분 후 완료!

---

### 3단계 — 커스텀 도메인 연결 (dnotitia-recruit.com)

1. Vercel 프로젝트 → **Settings → Domains**
2. `dnotitia-recruit.com` 입력 후 **Add**
3. 나오는 DNS 설정값을 도메인 구매처에서 적용

---

## API 키 보안 확인

- ✅ `public/index.html` — API 키 없음 (안전)
- ✅ `api/match.js` — 환경변수로만 읽음 (브라우저에서 접근 불가)
- ✅ Vercel 환경변수 — 암호화 저장, 외부 노출 없음
