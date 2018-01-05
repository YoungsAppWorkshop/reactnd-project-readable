import * as types from '../constants/ActionTypes'
import * as API from '../utils/api'
import * as Schema from '../schema'
import { normalize } from 'normalizr'

const failRequestCategories = () => ({ type: types.FAIL_REQUEST_CATEGORIES })
const requestGetCategories = () => ({ type: types.REQUEST_GET_CATEGORIES })
const receiveGetCategories = categories => ({ type: types.RECEIVE_GET_CATEGORIES, categories })
export const getCategories = () => dispatch => {
  dispatch(requestGetCategories())
  return API.getCategories().then(categories =>
    dispatch(receiveGetCategories(categories))
  ).catch(() => dispatch(failRequestCategories()))
}

export const selectCategory = category => ({ type: types.SELECT_CATEGORY, category })
export const unselectCategory = category => ({ type: types.UNSELECT_CATEGORY })

const failRequestPosts = () => ({ type: types.FAIL_REQUEST_POSTS })
const requestGetPosts = () => ({ type: types.REQUEST_GET_POSTS })
const receiveGetPosts = posts => ({ type: types.RECEIVE_GET_POSTS, posts })
export const getPosts = category => dispatch => {
  dispatch(requestGetPosts())
  return API.getPosts(category).then(posts => {
    const data = normalize(posts, Schema.posts)
    dispatch(receiveGetPosts(data.entities.posts || {}))
  }).catch(() => dispatch(failRequestPosts()))
}

const requestAddPost = () => ({ type: types.REQUEST_ADD_POST })
const receiveAddPost = post => ({ type: types.RECEIVE_ADD_POST, post })
export const addPost = post => dispatch => {
  dispatch(requestAddPost())
  return API.addPost(post).then(post => {
    dispatch(receiveAddPost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

const requestGetPost = () => ({ type: types.REQUEST_GET_POST })
const receiveGetPost = post => ({ type: types.RECEIVE_GET_POST, post })
const fetchPost = postId => dispatch => {
  dispatch(requestGetPost())
  return API.getPost(postId).then(post => {
    dispatch(receiveGetPost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

const selectPost = postId => ({ type: types.SELECT_POST, postId })
export const unselectPost = () => ({ type: types.UNSELECT_POST })
export const initPost = () => ({ type: types.INIT_POST })

const shouldFetchPost = (state, postId) => state.posts.items[postId] ? false : true
export const fetchPostIfNeeded = postId => (dispatch, getState) => {
  if (shouldFetchPost(getState(), postId)) {
    return dispatch(fetchPost(postId))
  }
  return dispatch(selectPost(postId))
}

const requestUpdatePost = () => ({ type: types.REQUEST_UPDATE_POST })
const receiveUpdatePost = post => ({ type: types.RECEIVE_UPDATE_POST, post })
export const updatePost = post => dispatch => {
  dispatch(requestUpdatePost())
  return API.updatePost(post).then(post => {
    dispatch(receiveUpdatePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

const requestUpVotePost = () => ({ type: types.REQUEST_UPVOTE_POST })
const receiveUpVotePost = post => ({ type: types.RECEIVE_UPVOTE_POST, post })
export const upVotePost = postId => dispatch => {
  dispatch(requestUpVotePost())
  return API.upVotePost(postId).then(post => {
    dispatch(receiveUpVotePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

const requestDownVotePost = () => ({ type: types.REQUEST_DOWNVOTE_POST })
const receiveDownVotePost = post => ({ type: types.RECEIVE_DOWNVOTE_POST, post })
export const downVotePost = postId => dispatch => {
  dispatch(requestDownVotePost())
  return API.downVotePost(postId).then(post => {
    dispatch(receiveDownVotePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

const requestDeletePost = () => ({ type: types.REQUEST_DELETE_POST })
const receiveDeletePost = post => ({ type: types.RECEIVE_DELETE_POST, post })
export const deletePost = postId => dispatch => {
  dispatch(requestDeletePost())
  return API.deletePost(postId).then(post => {
    dispatch(receiveDeletePost(post))
  }).catch(() => dispatch(failRequestPosts()))
}

const failRequestComments = () => ({ type: types.FAIL_REQUEST_COMMENTS })
const requestGetComments = () => ({ type: types.REQUEST_GET_COMMENTS })
const receiveGetComments = comments => ({ type: types.RECEIVE_GET_COMMENTS, comments })
export const getComments = parentId => dispatch => {
  dispatch(requestGetComments())
  return API.getComments(parentId).then(comments => {
    const data = normalize(comments, Schema.comments)
    dispatch(receiveGetComments(data.entities.comments || {}))
  }).catch(() => dispatch(failRequestComments()))
}

const requestUpVoteComment = () => ({ type: types.REQUEST_UPVOTE_COMMENT })
const receiveUpVoteComment = comment => ({ type: types.RECEIVE_UPVOTE_COMMENT, comment })
export const upVoteComment = commentId => dispatch => {
  dispatch(requestUpVoteComment())
  return API.upVoteComment(commentId).then(comment => {
    dispatch(receiveUpVoteComment(comment))
  }).catch(() => dispatch(failRequestComments()))
}

const requestDownVoteComment = () => ({ type: types.REQUEST_DOWNVOTE_COMMENT })
const receiveDownVoteComment = comment => ({ type: types.RECEIVE_DOWNVOTE_COMMENT, comment })
export const downVoteComment = commentId => dispatch => {
  dispatch(requestDownVoteComment())
  return API.downVoteComment(commentId).then(comment => {
    dispatch(receiveDownVoteComment(comment))
  }).catch(() => dispatch(failRequestComments()))
}

const decreaseCommentCount = postId => ({ type: types.DECREASE_COMMENT_COUNT, postId })
const requestDeleteComment = () => ({ type: types.REQUEST_DELETE_COMMENT })
const receiveDeleteComment = comment => ({ type: types.RECEIVE_DELETE_COMMENT, comment })
export const deleteComment = commentId => dispatch => {
  dispatch(requestDeleteComment())
  return API.deleteComment(commentId).then(comment => {
    dispatch(receiveDeleteComment(comment))
    dispatch(decreaseCommentCount(comment.parentId))
  }).catch(() => dispatch(failRequestComments()))
}

const requestUpdateComment = () => ({ type: types.REQUEST_UPDATE_COMMENT })
const receiveUpdateComment = comment => ({ type: types.RECEIVE_UPDATE_COMMENT, comment })
export const updateComment = comment => dispatch => {
  dispatch(requestUpdateComment())
  return API.updateComment(comment).then(comment => {
    dispatch(receiveUpdateComment(comment))
  }).catch(() => dispatch(failRequestComments()))
}

const increaseCommentCount = postId => ({ type: types.INCREASE_COMMENT_COUNT, postId })
const requestAddComment = () => ({ type: types.REQUEST_ADD_COMMENT })
const receiveAddComment = comment => ({ type: types.RECEIVE_ADD_COMMENT, comment })
export const addComment = comment => dispatch => {
  dispatch(requestAddComment())
  return API.addComment(comment).then(comment => {
    dispatch(receiveAddComment(comment))
    dispatch(increaseCommentCount(comment.parentId))
  }).catch(() => dispatch(failRequestComments()))
}

export const clearComments = () => ({ type: types.CLEAR_COMMENTS })
