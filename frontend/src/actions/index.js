import * as types from '../constants/ActionTypes'
import * as API from '../utils/api'
import * as Schema from '../schema'
import { normalize } from 'normalizr'

export const requestGetCategories = () => ({ type: types.REQUEST_GET_CATEGORIES })
export const receiveGetCategories = categories => ({ type: types.RECEIVE_GET_CATEGORIES, categories })
export const getCategories = () => dispatch => {
  dispatch(requestGetCategories())
  return API.getCategories().then(categories =>
    dispatch(receiveGetCategories(categories))
  )
}

export const selectCategory = category => ({ type: types.SELECT_CATEGORY, category })

export const requestGetPosts = () => ({ type: types.REQUEST_GET_POSTS })
export const receiveGetPosts = posts => ({ type: types.RECEIVE_GET_POSTS, posts })
export const getPosts = category => dispatch => {
  dispatch(requestGetPosts())
  return API.getPosts(category).then(posts => {
    const data = normalize(posts, Schema.posts)
    dispatch(receiveGetPosts(data.entities.posts || {}))
  })
}

export const requestAddPost = () => ({ type: types.REQUEST_ADD_POST })
export const receiveAddPost = post => ({ type: types.RECEIVE_ADD_POST, post })
export const addPost = post => dispatch => {
  dispatch(requestAddPost())
  return API.addPost(post).then(post => {
    dispatch(receiveAddPost(post))
  })
}

export const selectPost = postId => ({ type: types.SELECT_POST, postId })

export const requestUpdatePost = () => ({ type: types.REQUEST_UPDATE_POST })
export const receiveUpdatePost = post => ({ type: types.RECEIVE_UPDATE_POST, post })
export const updatePost = post => dispatch => {
  dispatch(requestUpdatePost())
  return API.updatePost(post).then(post => {
    dispatch(receiveUpdatePost(post))
  })
}

export const requestGetComments = id => ({ type: types.REQUEST_GET_COMMENTS, id })
export const receiveGetComments = comments => ({ type: types.RECEIVE_GET_COMMENTS, comments })
export const getComments = id => dispatch => {
  dispatch(requestGetComments())
  return API.getComments(id).then(comments => {
    const data = normalize(comments, Schema.comments)
    dispatch(receiveGetComments(data.entities.comments || {}))
  })
}
