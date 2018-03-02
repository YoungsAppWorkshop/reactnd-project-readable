import { normalize } from 'normalizr'

import * as types from '../constants/ActionTypes'
import {
  ERROR_CONNECTION_REFUSED,
  ERROR_UNEXPECTED_ERROR,
  ERROR_WRONG_POST_ID
} from '../constants/Status'
import * as API from '../utils/api'
import * as Schema from '../schema'

/**
 *
 * Action Creators for Posts
 *
 */

// Handle errors for API requests
const handleErrorPosts = status => ({ type: types.HANDLE_ERROR_POSTS, status })
// Set posts' status as INIT when ListView component will unmount
export const initPost = () => ({ type: types.INIT_POST })

// Increase/Decrease comment count for a post
export const decreaseCommentCount = postId => ({ type: types.DECREASE_COMMENT_COUNT, postId })
export const increaseCommentCount = postId => ({ type: types.INCREASE_COMMENT_COUNT, postId })

// Select/Unselect a post when PostDetailView component mount/unmount
const selectPost = postId => ({ type: types.SELECT_POST, postId })
export const unselectPost = () => ({ type: types.UNSELECT_POST })

// Add a new post
const requestAddPost = () => ({ type: types.REQUEST_ADD_POST })
const receiveAddPost = post => ({ type: types.RECEIVE_ADD_POST, post })
export const addPost = post => dispatch => {
  dispatch(requestAddPost())
  return API.addPost(post).then(data => {
    if (data.post) {
      dispatch(receiveAddPost(data.post))
    } else {
      dispatch(handleErrorPosts(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorPosts(ERROR_CONNECTION_REFUSED)))
}

// Delete a post
const requestDeletePost = () => ({ type: types.REQUEST_DELETE_POST })
const receiveDeletePost = post => ({ type: types.RECEIVE_DELETE_POST, post })
export const deletePost = postId => dispatch => {
  dispatch(requestDeletePost())
  return API.deletePost(postId).then(data => {
    if (data.post) {
      dispatch(receiveDeletePost(data.post))
    } else {
      dispatch(handleErrorPosts(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorPosts(ERROR_CONNECTION_REFUSED)))
}

// DownVote a post
const requestDownVotePost = () => ({ type: types.REQUEST_DOWNVOTE_POST })
const receiveDownVotePost = post => ({ type: types.RECEIVE_DOWNVOTE_POST, post })
export const downVotePost = postId => dispatch => {
  dispatch(requestDownVotePost())
  return API.downVotePost(postId).then(data => {
    if (data.post) {
      dispatch(receiveDownVotePost(data.post))
    } else {
      dispatch(handleErrorPosts(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorPosts(ERROR_CONNECTION_REFUSED)))
}

// Get a post's detail information
const requestGetPost = () => ({ type: types.REQUEST_GET_POST })
const receiveGetPost = post => ({ type: types.RECEIVE_GET_POST, post })
const fetchPost = postId => dispatch => {
  dispatch(requestGetPost())
  return API.getPost(postId).then(data => {
    if (data.post) {
      dispatch(receiveGetPost(data.post))
    } else if (data.error === 'No Result Found') {
      // When user typed wrong url(wrong post id) for post detail page
      dispatch(handleErrorPosts(ERROR_WRONG_POST_ID))
    } else {
      dispatch(handleErrorPosts(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorPosts(ERROR_CONNECTION_REFUSED)))
}

// Fetch post's information only if the post's information isn't stored in Redux
// e.g) When post detail page is refreshed or user typed url of the page in browser
const shouldFetchPost = (state, postId) => state.posts.items[postId] ? false : true
export const fetchPostIfNeeded = postId => (dispatch, getState) => {
  if (shouldFetchPost(getState(), postId)) {
    return dispatch(fetchPost(postId))
  }
  return dispatch(selectPost(postId))
}

// Get all posts or posts for a selected category
const requestGetPosts = () => ({ type: types.REQUEST_GET_POSTS })
const receiveGetPosts = posts => ({ type: types.RECEIVE_GET_POSTS, posts })
export const getPosts = category => dispatch => {
  dispatch(requestGetPosts())
  return API.getPosts(category).then(data => {
    if (data.posts) {
      const normailzed = normalize(data.posts, Schema.posts)
      dispatch(receiveGetPosts(normailzed.entities.posts || {}))
    } else {
      dispatch(handleErrorPosts(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorPosts(ERROR_CONNECTION_REFUSED)))
}

// Edit a post
const requestUpdatePost = () => ({ type: types.REQUEST_UPDATE_POST })
const receiveUpdatePost = post => ({ type: types.RECEIVE_UPDATE_POST, post })
export const updatePost = post => dispatch => {
  dispatch(requestUpdatePost())
  return API.updatePost(post).then(data => {
    if (data.post) {
      dispatch(receiveUpdatePost(data.post))
    } else {
      dispatch(handleErrorPosts(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorPosts(ERROR_CONNECTION_REFUSED)))
}

// UpVote a post
const requestUpVotePost = () => ({ type: types.REQUEST_UPVOTE_POST })
const receiveUpVotePost = post => ({ type: types.RECEIVE_UPVOTE_POST, post })
export const upVotePost = postId => dispatch => {
  dispatch(requestUpVotePost())
  return API.upVotePost(postId).then(data => {
    if (data.post) {
      dispatch(receiveUpVotePost(data.post))
    } else {
      dispatch(handleErrorPosts(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorPosts(ERROR_CONNECTION_REFUSED)))
}
