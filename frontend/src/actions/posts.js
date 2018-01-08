import { normalize } from 'normalizr'

import * as types from '../constants/ActionTypes'
import { ERROR_REQUEST_DELETED_POST, ERROR_WRONG_POST_ID } from '../constants/Status'
import * as API from '../utils/api'
import * as Schema from '../schema'

/**
 *
 * Action Creators for Posts
 *
 */

// On Connection Refused error
const failRequestPosts = () => ({ type: types.FAIL_REQUEST_POSTS })
// Handle errors on getting a post's detail information
const handleError = status => ({ type: types.HANDLE_ERROR, status })
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
  return API.addPost(post).then(post => {
    dispatch(receiveAddPost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

// Delete a post
const requestDeletePost = () => ({ type: types.REQUEST_DELETE_POST })
const receiveDeletePost = post => ({ type: types.RECEIVE_DELETE_POST, post })
export const deletePost = postId => dispatch => {
  dispatch(requestDeletePost())
  return API.deletePost(postId).then(post => {
    dispatch(receiveDeletePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

// DownVote a post
const requestDownVotePost = () => ({ type: types.REQUEST_DOWNVOTE_POST })
const receiveDownVotePost = post => ({ type: types.RECEIVE_DOWNVOTE_POST, post })
export const downVotePost = postId => dispatch => {
  dispatch(requestDownVotePost())
  return API.downVotePost(postId).then(post => {
    dispatch(receiveDownVotePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

// Get a post's detail information
const requestGetPost = () => ({ type: types.REQUEST_GET_POST })
const receiveGetPost = post => ({ type: types.RECEIVE_GET_POST, post })
const fetchPost = postId => dispatch => {
  dispatch(requestGetPost())
  return API.getPost(postId).then(post => {
    if ( post.error ) {
      // When user typed wrong url(wrong post id) for post detail page
      dispatch(handleError(ERROR_WRONG_POST_ID))
    } else if ( !post.id ) {
      // When user typed deleted post id(url) in browser
      dispatch(handleError(ERROR_REQUEST_DELETED_POST))
    } else {
      dispatch(receiveGetPost(post))
    }
  }).catch(() => dispatch(failRequestPosts()))
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
  return API.getPosts(category).then(posts => {
    const data = normalize(posts, Schema.posts)
    dispatch(receiveGetPosts(data.entities.posts || {}))
  }).catch(() => dispatch(failRequestPosts()))
}

// Edit a post
const requestUpdatePost = () => ({ type: types.REQUEST_UPDATE_POST })
const receiveUpdatePost = post => ({ type: types.RECEIVE_UPDATE_POST, post })
export const updatePost = post => dispatch => {
  dispatch(requestUpdatePost())
  return API.updatePost(post).then(post => {
    dispatch(receiveUpdatePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

// UpVote a post
const requestUpVotePost = () => ({ type: types.REQUEST_UPVOTE_POST })
const receiveUpVotePost = post => ({ type: types.RECEIVE_UPVOTE_POST, post })
export const upVotePost = postId => dispatch => {
  dispatch(requestUpVotePost())
  return API.upVotePost(postId).then(post => {
    dispatch(receiveUpVotePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}
