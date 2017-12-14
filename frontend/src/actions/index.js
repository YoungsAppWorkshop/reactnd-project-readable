import * as API from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES
})

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return API.getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
}

export const requestPosts = (category) => ({
  type: REQUEST_POSTS,
  category
})

export const receivePosts = (category, posts) => ({
  type: RECEIVE_POSTS,
  category,
  posts
})

export const fetchPosts = category => dispatch => {
  dispatch(requestPosts(category))
  return API.getPosts(category)
    .then(posts => dispatch(receivePosts(category, posts)))
}

export const requestPost = (id) => ({
  type: REQUEST_POST,
  id
})

export const receivePost = (id, post) => ({
  type: RECEIVE_POST,
  id,
  post
})

export const fetchPost = id => dispatch => {
  dispatch(requestPost(id))
  return API.getPost(id)
    .then(post => dispatch(receivePost(id, post)))
}

export const requestComments = (id) => ({
  type: REQUEST_COMMENTS,
  id
})

export const receiveComments = (id, comments) => ({
  type: RECEIVE_COMMENTS,
  id,
  comments
})

export const fetchComments = id => dispatch => {
  dispatch(requestComments(id))
  return API.getComments(id)
    .then(comments => dispatch(receiveComments(id, comments)))
}
