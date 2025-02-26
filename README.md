# [Coffee Bean Shop] 커피 원두 온라인 주문 웹서비스

2025 프로그래머스 백엔드 데브코스 4기 5회차 10팀 커피프린스 10호점의 프로젝트입니다.

## 프로젝트 개요

이 프로젝트의 목표는 로컬 카페 Grids & Circles의 온라인 주문 시스템을 구축하는 것입니다. <br>
고객이 커피 원두 패키지를 온라인으로 주문하면, 해당 주문을 수집하여 일괄 처리하고, <br>
<당일 오후 2시 ~ 다음 날 오후 2시> 까지 같은 회원이 요청한 주문을 하나로 합쳐 효율적인 배송을 지원하는 구조를 갖춰 **사용자 및 운영자의 편의성을 향상시키는 것이 목적입니다.**

**Background**:

우리는 작은 로컬 카페 Grids & Circles 입니다. 고객들이 Coffee Bean package를 온라인 웹 사이트로 주문을 합니다. <br>
매일 전날 오후 2시부터 오늘 오후 2시까지의 주문을 모아서 처리합니다. 현재는 총 4개의 상품이 존재합니다.

**주요 특징**:

- **사용자**: 상품 검색, 장바구니 담기, 주문 및 주문 추적
- **관리자**: 상품 관리, 주문 관리 및 처리

![image](https://github.com/user-attachments/assets/0242bce0-fe30-4b62-9f09-799b7526a022)

---

## 최소 요구사항 (MVP)

프로젝트의 기본 기능은 다음과 같습니다:

1. **사용자 구분**
   - 이메일로 사용자를 구분
2. **상품 검색 및 상세 조회**
   - 전체 상품 목록과 세부 정보(상품명, 설명, 가격) 제공
3. **주문 처리**
   - 주문Form에 상품 추가 및 수량 조정
   - 주문 생성 및 주문 상세 조회
4. **관리자 기능**
   - 관리자 권한이 있는 사용자는 관리자 페이지에 접근하여 관리 기능을 수행
   - 상품 관리 : 상품 추가, 수정, 삭제
   - 주문 목록 관리 및 배송 상태 변경(매일 오후 2시 일괄 처리)

> 최소한 위의 기능들이 구현되어야 서비스로서의 기본 역할을 수행할 수 있습니다.

---

## 추가 기능

MVP 외에 추가적으로 구현된 기능들은 다음과 같습니다:

- **사용자 인증 및 관리**
  - 회원가입 (이름, 이메일, 비밀번호, 주소 입력)
  - 로그인/로그아웃 기능
- **상품 자동 재고 관리**: 주문 완료 시 자동으로 상품 재고 차감
- **장바구니 기능**:
  - 사용자가 상품을 장바구니에 담아 주문을 진행할 수 있도록 진행
  - 담은 상품의 수량 조정 및 삭제 기능 제공
  - 담은 상품 중 선택한 상품만 주문 가능
- **관리자 대시보드 기능**
  - **최근 주문 미리 보기**: 관리자 대시보드에서 최신 주문 3건의 주문 정보를 한 눈에 확인 가능
  - **주문 통계**: 현재 판매 중인 상품 개수와 주문 완료 상태의 주문 개수를 조회하여 현황을 한 눈에 파악 가능

---

## 팀원 및 역할

| 이 름  | GitHub 링크                              | 역 할                                                                                                                                                        |
| ------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 이화영 | [github](https://github.com/2hwayoung)   | - **팀장**: 팀 리딩, 프로젝트 관리 <br> - **기능**: 상품 조회/재고관리, 장바구니, 관리자 대시보드, FE 관리자 상품/주문 관리, FE 로그인/인증 관리, PR Test CI |
| 김형준 | [github](https://github.com/Hyung-Junn)  | - **문서**: Github Convention, UserStory, Swagger API 명세서 <br> - **기능**: 주문하기, 주문 목록 조회, 주문 상세 정보 조회                                  |
| 윤원석 | [github](https://github.com/wonseokyoon) | - **문서**: 요구사항 명세서, ERD 설계 <br> - **기능**: 고객 회원가입, 로그인/로그아웃                                                                        |
| 정준호 | [github](https://github.com/junho1131)   | - **설정**: 개발 환경 초기 세팅 - **문서**: 기술 스택 정리 <br> - **기능**: 상품 관리 (추가, 수정, 삭제), 관리자 주문 목록 조회, 배송 일괄 처리 (cron 활용)  |

---

## 주요 기능

> 요구사항 명세서는 [requirements.md](docs/requirements.md)에서 확인 가능합니다.

> 유저스토리는 [userstory.md](docs/userstory.md)에서 확인 가능합니다.

> 와이어프레임은 [Creatie Link](https://creatie.ai/file/152751559819701?page_id=M&shareId=152751559819701) 에서 확인할 수 있습니다.

- **사용자 관련**
  - 회원가입, 로그인/로그아웃, 사용자 정보 관리
  - 장바구니 추가 및 주문 생성
- **상품 및 주문 관리**
  - 상품 목록, 상세 조회
  - 주문 내역 조회 및 주문 상태 자동 관리
- **관리자 기능**
  - 상품 등록/수정/삭제 기능
  - 상품 및 주문 데이터의 통합 관리
  - 배송 상태 일괄 변경 처리

![Wireframe](docs/wireframe.png)

## 기술 스택

<div align=center>
    <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
    <img src="https://img.shields.io/badge/spring_boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
    <img src="https://img.shields.io/badge/spring_security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
    <img src="https://img.shields.io/badge/java-F2302F?style=for-the-badge&logo=openjdk&logoColor=white">
    <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
    <img src="https://img.shields.io/badge/jpa-F2302F?style=for-the-badge&logo=data&logoColor=white">
    <img src="https://img.shields.io/badge/lombok-EA7600?style=for-the-badge&logo=lombok&logoColor=white">
    <img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jwt&logoColor=white">
    <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/openapi-F2302F?style=for-the-badge&logo=openapi&logoColor=white">
</div>

- **Frontend**: Next.js (SSR & CSR 혼합)
- **Backend**: Spring Boot (REST API 서버)
- **Database**: MySQL (Docker-compose를 통한 로컬 DB 구축)
- **API 문서화 (Swagger)**: API 명세를 통해 개발 및 테스트 편의성 강화
- **테스트 자동화 및 CI**
  - 단위 테스트 진행 (Swagger, Postman 활용)
  - **Pull Request 테스트**: PR이 생성, 업데이트될 때마다 Spring Boot 프로젝트의 단위 테스트를 자동으로 실행하여 안정성 검증
  - **리뷰어 자동 할당**: PR 생성 시 특정 브랜치(`main`, `develop`)에 대해 지정된 리뷰어를 자동으로 할당하여 코드 리뷰 프로세스 효율화
- **프론트엔드 코드 제네레이션**: OpenAPI를 통한 TypeScript 타입 생성

---

## 개발 환경 설정 및 실행

**1️⃣ Run Backend (Spring Boot)**

```bash
# Navigate to backend project directory
cd backend

# Run the application
./gradlew bootRun

```

**2️⃣ Run Database (Docker Compose)**

```bash
# Start MySQL container with Docker Compose
# in root directory
docker-compose up -d

# Monitoring Logs
# Since logs are mapped to your local machine in ./mysql/conf, you can monitor them directly:
tail -f ./mysql_logs/general.log

# Stop Containers
docker-compose down

```

**3️⃣ Run Frontend (Next.js)**

```bash
# Navigate to frontend project directory
cd frontend

# Start Next.js development server
npm install  # Install dependencies (only needed once)
npm run dev  # Start development server

# Use OpenAPI to generate TypeScript types for the backend API
npm run codegen # Generate openapi typeScript definitions
npm run codegen:watch # Watch for API changes and regenerate types automatically

```

---

## 개발 프로세스 및 문서

### Architecture Overview

```
+-------------------------------------------------+
|                Frontend (Next.js)               |
|                [Runs in Browser]                |
+-----------------------+-------------------------+
                        |
                        | HTTP/REST (JSON)
                        |
+-----------------------v-------------------------+
|              Backend (Spring Boot)              |
|                [REST API Server]                |
+-----------------------+-------------------------+
                        |
                        | JPA (ORM)
                        |
+-----------------------v-------------------------+
|               DB (MySQL Container)              |
|           [Local DB via Docker-compose]         |
+-------------------------------------------------+

```

**1️⃣ Frontend (Next.js)**

- **기술 스택**: Next.js (React 기반 프레임워크)
- **렌더링 방식**: SSR(서버사이드 렌더링) 및 CSR(클라이언트사이드 렌더링) 혼합 사용
- **API 호출 방식**:
  - 내장된 `fetch` API 사용
  - `openapi-fetch` 라이브러리를 활용하여 API 호출
- **역할**: 사용자 인터페이스 제공 및 RESTful API를 통해 백엔드와 통신

**2️⃣ Backend (Spring Boot)**

- **기술 스택**: Spring Boot (Java 기반 프레임워크)
- **역할**:
  - RESTful API 제공 (JSON 형식)
  - 비즈니스 로직 처리 및 데이터 검증
  - 프론트엔드 요청을 처리하고 MySQL 데이터베이스와 연동
- **데이터 연동 방식**:
  - `Spring Data JPA (ORM)`을 사용하여 MySQL과 연결
  - 트랜잭션 관리 및 데이터 접근 계층 구성

**3️⃣ Database (MySQL - Docker-compose)**

- **기술 스택**: MySQL 8 (Docker-compose 컨테이너로 실행)
- **역할**:
  - 애플리케이션의 영구적인 데이터 저장소 역할 수행
  - Spring Boot 백엔드와 연결하여 CRUD 연산 수행
- **구동 방식**:
  - `docker-compose`를 활용하여 로컬 환경에서 MySQL 컨테이너 실행

---

### 프로젝트 구조

- {domain} : 도메인 주도 설계
  - controller
  - service
  - repository
  - entity
  - dto

---

### Agile & TDD: Development Approach

이 프로젝트는 애자일(Agile)과 테스트 주도 개발(TDD) 방식을 적용하여 빠른 개발과 유지보수성을 고려했습니다. 자세한 내용은 [develop_process.md](docs/develop_process.md)에서 확인할 수 있습니다.

---

### ERD 설계

![ERD](docs/ERD.png)

---

### API Spec

- Swagger API 문서화
- [API 명세서](docs/api_spec.jpg)

![image](https://github.com/user-attachments/assets/0f858ca3-886f-4e0f-9c54-6a741f1d49b2)

---

### 테스트

- local 환경 단위 테스트
- 유저 스토리 기반으로 최종 테스트 진행(Swagger,Postman)

---

### 참고 자료

- **컨벤션**:
  - [Naming Convention](docs/naming_convention.md)
  - [Github Convention](docs/commit_convention.md)
