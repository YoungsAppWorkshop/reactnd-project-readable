import * as types from '../constants/ActionTypes'
import * as API from '../utils/api'
import * as Schema from '../schema'
import { normalize } from 'normalizr'

export const requestCategories = () => ({
  type: types.REQUEST_CATEGORIES
})

export const receiveCategories = (categories) => ({
  type: types.RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return API.getCategories().then(categories =>
    dispatch(receiveCategories(categories))
  )
}

export const selectCategory = (category) => ({
  type: types.SELECT_CATEGORY,
  category
})

export const requestPosts = () => ({
  type: types.REQUEST_POSTS
})

export const receivePosts = (posts) => ({
  type: types.RECEIVE_POSTS,
  posts
})

export const fetchPosts = category => dispatch => {
  dispatch(requestPosts())
  return API.getPosts(category).then(posts => {
    const data = normalize(posts, Schema.posts)
    dispatch(receivePosts(data.entities.posts || {}))
  })
}

export const addPost = (post) => ({
  type: types.ADD_POST,
  post
})

export const selectPost = (postId) => ({
  type: types.SELECT_POST,
  postId
})

export const requestComments = (id) => ({
  type: types.REQUEST_COMMENTS,
  id
})

export const receiveComments = (comments) => ({
  type: types.RECEIVE_COMMENTS,
  comments
})

export const fetchComments = id => dispatch => {
  dispatch(requestComments())
  return API.getComments(id).then(comments => {
    const data = normalize(comments, Schema.comments)
    dispatch(receiveComments(data.entities.comments || {}))
  })
}
