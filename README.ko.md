# 📚 ELNB - 종합 개발자 지식 베이스

<div align="center">
  
[![License](https://img.shields.io/github/license/nwt-q/nwt-q.github.io?style=flat-square&color=blue)](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-41b883?style=flat-square&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5.22-41b883?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.6.10-6477D9?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)

[🌐 라이브 데모](https://vitepress.yiov.top/) | [📖 문서](https://vitepress.yiov.top/getting-started) | [🚀 GitHub](https://github.com/nwt-q/nwt-q.github.io)

</div>

---

## 🌟 프로젝트 개요

**ELNB**(Endless Learning & Notes Base)는 VitePress로 구축된 종합 기술 지식 베이스 플랫폼으로, 프론트엔드 개발자에게 체계적이고 구조화된 지식 공유 및 저장 공간을 제공하는 것을 목표로 합니다.

이 프로젝트는 단순한 문서 사이트가 아니라, 기본 프론트엔드 기술에서 고급 백엔드 개발에 이르기까지 광범위한 콘텐츠를 다루는 완전한 지식 관리 시스템입니다.

### ✨ 핵심 기능

- 📝 **마크다운 기반** - 익숙한 마크다운 구문을 사용하여 콘텐츠를 빠르게 생성 및 정리
- ⚡ **초고속** - 즉각적인 서버 시작, 초고속 핫 업데이트, Vite 생태계 플러그인 활용
- 🎨 **모던 테마** - 아름다운 기본 테마와 사용자 정의 가능한 UI 컴포넌트
- 🌐 **다국어 지원** - 다국어 문서 지원(중국어, 영어, 일본어, 한국어 등)
- 📊 **수식 지원** - 내장 KaTeX 지원으로 완벽한 수학식 렌더링
- 🔄 **플로우차트 지원** - 통합 Mermaid로 간편한 전문적인 플로우차트 생성
- 🎯 **컴포넌트 기반** - Vue 컴포넌트 삽입 지원으로 높은 사용자 정의성

---

## 🛠️ 기술 스택

### 핵심 프레임워크
- **[VitePress](https://vitepress.dev/)** - 정적 사이트 생성기
- **[Vue 3](https://vuejs.org/)** - 점진적 JavaScript 프레임워크
- **[Vite](https://vitejs.dev/)** - 차세대 프론트엔드 도구

### 플러그인 및 도구
- **[markdown-it-katex](https://github.com/GooglingXXX/markdown-it-katex)** - 수학식 렌더링
- **[vitepress-plugin-mermaid](https://github.com/alefViggia/vitepress-plugin-mermaid)** - 플로우차트 그리기
- **[vitepress-plugin-group-icons](https://github.com/alefViggia/vitepress-plugin-group-icons)** - 아이콘 그룹 지원
- **[markdown-it-task-checkbox](https://github.com/jgierer12/markdown-it-task-checkbox)** - 작업 목록

### 개발 도구
- **[pnpm](https://pnpm.io/)** - 빠르고 디스크 공간 효율적인 패키지 매니저
- **[TypeScript](https://www.typescriptlang.org/)** - 타입 지정 JavaScript

---

## 📖 빠른 시작

### 사전 요구사항

- Node.js 18+ 
- pnpm 8.6.10+

### 설치

```bash
# 저장소 복제
git clone https://github.com/nwt-q/nwt-q.github.io.git
cd nwt-q.github.io

# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm docs:dev
```

`http://localhost:5173` 에 접속하여 사이트를 미리보기하세요.

### 프로덕션용 빌드

```bash
# 사이트 빌드
pnpm docs:build

# 빌드 미리보기
pnpm docs:preview
```

---

## 📚 문서 콘텐츠

### 기본 튜토리얼
- [시작하기](https://vitepress.yiov.top/getting-started) - VitePress 사이트를 제로부터 구축
- [설정 가이드](https://vitepress.yiov.top/configuration) - 자세한 설정 가이드
- [마크다운 구문](https://vitepress.yiov.top/markdown) - 고급 마크다운 사용법
- [컴포넌트 사용법](https://vitepress.yiov.top/components) - Vue 컴포넌트 통합

### 기술 노트
- **프론트엔드 개발**
  - [React](https://vitepress.yiov.top/react/) - React 스택 노트
  - [Vue](https://vitepress.yiov.top/) - Vue 생태계 관련
  - [JavaScript](https://vitepress.yiov.top/) - JavaScript 심층 이해

- **백엔드 개발**
  - [Java](https://vitepress.yiov.top/Java/) - Java 개발 노트
  - [Redis](https://vitepress.yiov.top/Redis/) - 캐싱 기술
  - [PostgreSQL](https://vitepress.yiov.top/PostgreSQL/) - 데이터베이스 관리
  - [RabbitMQ](https://vitepress.yiov.top/RabbitMQ/) - 메시지 큐

- **DevOps**
  - [Docker](https://vitepress.yiov.top/docker/) - 컨테이너화
  - [Kubernetes](https://vitepress.yiov.top/kubernetes/) - 컨테이너 오케스트레이션
  - [Nginx](https://vitepress.yiov.top/nginx/) - 서버 설정

- **컴퓨터 과학**
  - [컴퓨터 네트워크](https://vitepress.yiov.top/Internet/) - 네트워크 지식
  - [Linux](https://vitepress.yiov.top/Linux/) - Linux 시스템
  - [컴퓨터 구조](https://vitepress.yiov.top/coa/) - 컴퓨터 아키텍처

- **기타 기술**
  - [Git](https://vitepress.yiov.top/Git/) - 버전 관리
  - [Python](https://vitepress.yiov.top/Python/) - Python 스크립팅
  - [Blander](https://vitepress.yiov.top/blander/) - 3D 모델링

---

## 🎨 테마 사용자 정의

이 프로젝트는 모던 테마 디자인을 특징으로 하며, 다음 기능을 갖추고 있습니다:

- 🎨 **사용자 정의 스타일** - 아름다운 코드 하이라이트 및 블록 스타일
- 🖱️ **인터랙티브 컴포넌트** - 마우스 팔로잉, 파티클 효과 등
- 📱 **반응형 디자인** - 데스크톱 및 모바일 완벽 대응
- 🌙 **다크 모드** - 눈의 부담을 줄여주는 기본 다크 테마

---

## 🌍 다국어 지원

이 프로젝트는 다국어 문서를 지원합니다. 현재 지원 언어:

- 🇨🇳 [중국어(간체)](https://vitepress.yiov.top/) (기본)
- 🇺🇸 [영어](https://vitepress.yiov.top/en/)
- 🇫🇷 [프랑스어](https://vitepress.yiov.top/fr/)

---

## 🤝 기여

모든 종류의 기여를 환영합니다! 오류를 발견하거나 새로운 학습 노트를 공유하고 싶다면 다음 단계를 따라주세요:

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경 사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. 풀 리퀘스트 열기

### 기여 유형

- 🐛 버그 수정
- ✨ 새로운 기능
- 📝 문서 개선
- 🎨 테마 최적화
- 🌐 다국어 번역

---

## 📊 사이트 통계

- 📄 **문서 수**: 100+ 개의 기술 기사
- 📚 **카테고리**: 15+ 개의 기술 도메인
- 🌐 **방문자 수**: 꾸준히 증가 중
- 🤝 **기여자**: 참여를 기다립니다

---

## 📬 문의

- 📧 이메일: [contact@vitepress.yiov.top](mailto:contact@vitepress.yiov.top)
- 💬 커뮤니티: [Discord](https://chat.vitejs.dev/)
- 🐦 Twitter: [@vitepress](https://twitter.com/vitepress)

---

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE) 하에 제공됩니다 - 자세한 내용은 LICENSE 파일을 참조하세요.

---

## 🙏 감사의 말

- [VitePress](https://vitepress.dev/) 팀에 훌륭한 도구를 제공해 주셔서 감사합니다
- 모든 기여자와 사용자의 지속적인 지원에 감사드립니다
- 오픈소스 커뮤니티의 소중한 자원에 감사드립니다

---

<div align="center">
  
⭐️ 이 프로젝트가 도움이 되셨다면 GitHub에서 Star를 부탁드립니다!

[![Star History Chart](https://api.star-history.com/svg?repos=nwt-q/nwt-q.github.io&type=Date)](https://star-history.com/#nwt-q/nwt-q.github.io&Date)

</div>

---

<p align="center">
  ❤️ 로 <a href="https://github.com/nwt-q">nwt-q</a>와 커뮤니티가 제작
</p>
