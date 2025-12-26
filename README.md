# 🚀 Notion CMS Based Automated Portfolio

> **Notion을 Headless CMS로 활용하여, 컨텐츠 작성과 배포 과정을 자동화한 React 기반 정적 포트폴리오 사이트입니다.**

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen) ![React](https://img.shields.io/badge/React-19.0-blue) ![Notion API](https://img.shields.io/badge/Notion_API-v2.2.15-black) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF)

## 📖 프로젝트 개요 (Project Overview)

이 프로젝트는 단순한 포트폴리오 웹사이트 구현을 넘어, **지속 가능한 데이터 관리와 배포 자동화 파이프라인(CI/CD) 구축**을 목표로 했습니다.

기존의 하드코딩 방식은 프로젝트가 추가될 때마다 코드를 수정하고 다시 빌드해야 하는 비효율이 존재했습니다. 이를 해결하기 위해 **Notion을 데이터베이스(DB)로 활용**하고, GitHub Actions를 통해 **빌드 및 배포 과정을 전면 자동화**했습니다.

### 🏗️ 아키텍처 (Architecture)

**Serverless & Headless CMS Architecture**를 채택하여 별도의 백엔드 서버 구축 없이 데이터 파이프라인을 설계했습니다.

```mermaid
graph LR
    A[Notion DB\n(Content Writing)] -->|API Request| B(Node.js Script\nETL Process);
    B -->|Transform & Save| C[JSON Data\n(Local Storage)];
    C -->|Build| D[React Application];
    D -->|Deploy| E[GitHub Pages\n(Hosting)];
    
    subgraph CI/CD Pipeline
    B
    C
    D
    end
```

---

## 🛠️ 기술 스택 및 선정 이유 (Tech Stack)

백엔드 엔지니어링 관점에서 **유지보수성**과 **자동화**에 중점을 두고 기술을 선정했습니다.

| 구분 | 기술 (Stack) | 선정 이유 (Justification) |
| :-- | :-- | :-- |
| **Frontend** | **React + Vite** | 컴포넌트 기반의 재사용성과 Vite의 빠른 빌드 속도를 활용해 뷰(View) 계층을 효율적으로 구성하기 위함. |
| **CMS** | **Notion API** | 별도의 Admin 페이지 개발 없이, 익숙한 UI(Notion)에서 데이터를 관리하고 API로 추출할 수 있는 **Headless CMS**로 활용. |
| **ETL** | **Node.js** | 빌드 타임(Build Time)에 API 데이터를 추출(Extract)하고 프론트엔드에 맞는 JSON으로 변환(Transform)하는 스크립트 작성에 적합. |
| **CI/CD** | **GitHub Actions** | 코드 푸시부터 데이터 갱신, 빌드, 배포까지의 전 과정을 자동화하여 **Human Error**를 방지하고 운영 효율성을 높임. |

---

## 🔥 기술적 도전과 문제 해결 (Troubleshooting)

프로젝트 진행 중 발생한 주요 기술적 이슈와 이를 해결한 과정입니다.

### 1. Node.js 모듈 시스템 충돌 (ESM vs CommonJS)
*   **문제 상황:** 프로젝트가 `type: "module"` (ESM)로 설정되어 있으나, Notion Client 등 일부 라이브러리가 CommonJS 방식을 사용하여 호환성 에러 발생.
*   **해결:**
    *   `createRequire`를 사용하여 ESM 환경 내에서 CommonJS 모듈을 안전하게 로드하는 방식 고려.
    *   최종적으로는 `import` 구문을 표준화하고, Node.js 내장 모듈인 `process`를 명시적으로 import 하여 Linter 오류 및 런타임 호환성 문제를 해결함.

### 2. Notion API 버전 호환성 (Breaking Changes)
*   **문제 상황:** 최신 Notion SDK (`v5.x`)에서 `databases.query` 메서드가 삭제/변경되어 런타임 에러(`is not a function`) 발생.
*   **해결:** 공식 문서와 릴리즈 노트를 분석하여, 현재 작성된 코드 로직(Query 방식)과 가장 안정적으로 호환되는 **`v2.2.15` 버전으로 의존성을 고정(Pinning)**하여 시스템 안정성을 확보함.

### 3. CI/CD 환경 변수 보안 및 권한 관리
*   **문제 상황:** 로컬(`.env`)에서는 잘 작동하던 빌드가 GitHub Actions에서 API Key 누락으로 실패. 또한, PR 단계에서 배포 권한(`deployment`) 문제로 워크플로우가 중단됨.
*   **해결:**
    *   **Secrets 관리:** `Repository Secrets`를 통해 민감 정보를 암호화하여 저장하고, `yml` 파일에서 `env` 변수로 주입.
    *   **Job 분리:** CI/CD 파이프라인을 `Lint` -> `Build` -> `Deploy` 단계로 명확히 분리.
    *   **조건부 실행:** `Deploy` 단계는 오직 `main` 브랜치에서만 실행되도록 `if` 조건을 설정하여, PR 단계에서의 보안 사고 및 에러를 방지함.

---

## 🚀 실행 방법 (How to Run)

### 1. 설치 (Installation)
```bash
git clone https://github.com/[본인아이디]/[리포지토리명].git
npm install
```

### 2. 환경 변수 설정 (.env)
루트 디렉토리에 `.env` 파일을 생성하고 Notion API 정보를 입력합니다.
```properties
NOTION_API_KEY=ntn_...
NOTION_DATABASE_ID=...
```

### 3. 데이터 추출 및 개발 서버 실행
```bash
# Notion 데이터를 가져온 후 개발 서버 실행
npm run dev
```

---

## 📂 디렉토리 구조 (Directory Structure)

```
├── .github/workflows/ # CI/CD 설정 (deploy.yml)
├── scripts/           # ETL 스크립트 (fetch-notion.js)
├── src/
│   ├── components/    # React 컴포넌트
│   ├── data/          # 생성된 JSON 데이터 (projects.json)
│   └── ...
└── ...
```
---
