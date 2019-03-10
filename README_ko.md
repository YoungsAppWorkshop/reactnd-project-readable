# Readable: 컨텐츠 및 댓글 앱

`Readable`은 리액트(React), 리덕스(Redux) 및 부트스트랩(Bootstrap)을 활용하여 제작된 컨텐츠 및 댓글 작성 앱입니다. 사용자는 정해진 카테고리 내에서 포스트 및 댓글을 작성하고 수정/삭제/투표 등을 할 수 있습니다. 이 프로젝트는 [유다시티의 리액트 나노디그리 프로그램](https://www.udacity.com/course/react-nanodegree--nd019)의 일환으로 제작되었습니다.

- 영문 리드미(English README) 파일: [README.md](/README.md)

## 스크린샷
| 메인 페이지         | 포스트 수정 화면    |
|------------------|-----------------|
|![Screenshot_01](https://github.com/YoungsAppWorkshop/readable/blob/master/ScreenShot_01.jpg?raw=true)| ![Screenshot_02](https://github.com/YoungsAppWorkshop/readable/blob/master/ScreenShot_02.jpg?raw=true) |

## 설치 방법

GitHub 저장소를 복제(Clone)하고 아래와 같이 필요한 패키지를 설치합니다.

* GitHub 저장소 복제합니다: `git clone https://github.com/YoungsAppWorkshop/readable`
* 프로젝트 디렉토리로 이동합니다: `cd readable`


* API 서버를 설치하고 실행합니다.
    - `cd api-server`
    - `npm install`
    - `node server`


* 또다른 터미널에서 프론트엔드 서버를 설치하고 실행합니다.
    - `cd frontend`
    - `npm install`
    - `npm start`


## 어플리케이션 구조
이 앱은 [프레젠테이션 컴포넌트와 컨테이너 컴포넌트를 분리하는 구조](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components)로 설계되었습니다.

```bash
├── README.md
├── api-server          # 유다시티(Udacity)에서 제공한 단순한 API 서버
└── frontend
    ├── ...
    ├── public
    └── src
        ├── actions     # 리덕스 액션(Redux Action Creators)
        ├── components  # 프레젠테이션 컴포넌트(Presentational components)
        │   └── App.js
        ├── constants
        ├── containers  # 컨테이너 컴포넌트(Container components)
        ├── reducers    # 리덕스 리듀서(Redux Reducers)
        ├── store       # 리덕스 스토어(Redux Store)
        ├── styles
        ├── utils
        ├── ...
        └── index.js

```
## 참고자료
이 앱은 [Create React App](https://github.com/facebookincubator/create-react-app)를 활용해 제작되었으며 [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux), [Redux-thunk](https://github.com/gaearon/redux-thunk), [normalizr](https://github.com/paularmstrong/normalizr), [React Router](https://github.com/ReactTraining/react-router), [Bootstrap4](https://v4-alpha.getbootstrap.com/), [Reactstrap](http://reactstrap.github.io/) 등의 라이브러리를 사용하였습니다.

* API 서버 코드는 [유다시티의 프로젝트 시작 저장소](https://github.com/udacity/reactnd-project-readable-starter) 코드를 사용하였습니다.

## 라이센스
[MIT 라이센스](/LICENSE)
