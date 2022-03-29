# Clova EMR 마크업 산출물

이 저장소는 Clova EMR 프로젝트의 마크업 산출물을 공유하기 위한 목적으로 생성되었습니다.  
산출물의 문의를 위한 정보는 다음과 같습니다.

```
제작 : 하이브랩 FT개발실
담당자 : 마광습 (hellomrma@hivelab.co.kr)
메신저 : LINE (hellomrma)
```

## 개발 환경

마크업 산출물은 다음 환경에서 구동 됩니다.

```
Node 버전 : 10.xxx
Task runner : Gulp
OS : Windows
```

## 설치 및 실행
gulp 세팅이 nodejs 10.xxx 에 맞추져 있습니다.
```
- nodejs 설치 (10.xxx)
> npm install --global gulp-cli
> npm install
> (npm i 후) gulp
```

### 구조
```
.
├── dist
│   │─── css
│   │   │── components
│   │   │── pages
│   │   │── emr.css
│   │   │── emr.min.css
│   │   │── uio.css
│   │   └── uio.min.css
│   │── img
│   │   ├── 컴포넌트별 이미지
│   │   └── 페이지별 이미지
│   │── js
│   │   ├── component // 컴포넌트 별 자바스크립트 파일 모음
│   │── views // 페이지 모음
│   └── @index.html // 리스트
│── src
│   │─── css
│   │   ├── scss
│   │   │   ├── common
│   │   │   ├── components
│   │   │   ├── mixins
│   │   │   ├── pages
│   │   │   ├── svg
│   │   │   ├── emr.scss // 공통, 컴포넌트, 페이지 inlcude 파일
│   │   │   └── uio.scss // UIO 페이지를 위한 SCSS
│   │── img
│   │   ├── 컴포넌트별 이미지
│   │   └── 페이지별 이미지
│   │── js
│   │   └── component // 컴포넌트 별 자바스크립트 파일 모음
│   │── views
│   │   └── include // 각각의 페이지에서 불러오는 모듈 모음
│   └── index.html
└── {{...config files}}
```