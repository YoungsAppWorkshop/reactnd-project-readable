import * as types from '../constants/ActionTypes'
import * as API from '../utils/api'

export const requestCategories = () => ({
  type: types.REQUEST_CATEGORIES
})

export const receiveCategories = (categories) => ({
  type: types.RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return API.getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
}

export const requestPosts = (category) => ({
  type: types.REQUEST_POSTS,
  category
})

export const receivePosts = (category, posts) => ({
  type: types.RECEIVE_POSTS,
  category,
  posts
})

export const fetchPosts = category => dispatch => {
  dispatch(requestPosts(category))
  return API.getPosts(category)
    .then(posts => dispatch(receivePosts(category, posts)))
}

export const requestPost = (id) => ({
  type: types.REQUEST_POST,
  id
})

export const receivePost = (id, post) => ({
  type: types.RECEIVE_POST,
  id,
  post
})

export const fetchPost = id => dispatch => {
  dispatch(requestPost(id))
  return API.getPost(id)
    .then(post => dispatch(receivePost(id, post)))
}

export const requestComments = (id) => ({
  type: types.REQUEST_COMMENTS,
  id
})

export const receiveComments = (id, comments) => ({
  type: types.RECEIVE_COMMENTS,
  id,
  comments
})

export const fetchComments = id => dispatch => {
  dispatch(requestComments(id))
  return API.getComments(id)
    .then(comments => dispatch(receiveComments(id, comments)))
}
