# Readable: A Content & Comment App

Readable is a content and comment web app built with React, Redux and Bootstrap. Users can post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users can also edit and delete posts and comments. This project is one of assignments for the [Udacity's React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).

## How to Start

To start the Readable App:

* Clone the project with `git clone https://github.com/YoungsAppWorkshop/reactnd-project-readable`
* Change directory with `cd reactnd-project-readable`


* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`


* In another terminal window, install and start the frontend server
    - `cd frontend`
    - `npm install`
    - `npm start`


## Structure of the App
The structure of the Readable app is based on the idea of [separating presentational and container components](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components). The below is a simplified preview of the app structure:

```bash
├── README.md           # This file
├── api-server          # Simple API server code from Udacity's starter repository
└── frontend
    ├── ...
    ├── public
    └── src
        ├── actions     # Redux Action Creators
        ├── components  # Presentational components
        ├── constants
        ├── containers  # Container components
        │   └── App.js
        ├── reducers    # Redux Reducers
        ├── styles
        ├── utils
        ├── ...
        └── index.js

```
## Attributions
The Readable app was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and built with [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux), [Redux-thunk](https://github.com/gaearon/redux-thunk), [normalizr](https://github.com/paularmstrong/normalizr), [React Router](https://github.com/ReactTraining/react-router), [Bootstrap4](https://v4-alpha.getbootstrap.com/), [Reactstrap](http://reactstrap.github.io/) and others.

* The code for the backend API Server is contributed by [Udacity's project starter repository](https://github.com/udacity/reactnd-project-readable-starter).

## License
Readable is [MIT licensed](/LICENSE).
