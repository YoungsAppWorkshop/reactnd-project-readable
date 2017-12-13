import * as API from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

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
