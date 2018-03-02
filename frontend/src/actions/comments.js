import { normalize } from 'normalizr'

import { decreaseCommentCount, increaseCommentCount } from './posts'
import * as types from '../constants/ActionTypes'
import {
  ERROR_CONNECTION_REFUSED,
  ERROR_UNEXPECTED_ERROR
} from '../constants/Status'
import * as API from '../utils/api'
import * as Schema from '../schema'

/**
 *
 * Action Creators for Comments
 *
 */

// Remove comments from Redux store when PostDetailView component will unmount
export const clearComments = () => ({ type: types.CLEAR_COMMENTS })

// Handle errors for API requests
const handleErrorComments = status => ({ type: types.HANDLE_ERROR_COMMENTS, status })

// Add a comment for a post
const requestAddComment = () => ({ type: types.REQUEST_ADD_COMMENT })
const receiveAddComment = comment => ({ type: types.RECEIVE_ADD_COMMENT, comment })
export const addComment = comment => dispatch => {
  dispatch(requestAddComment())
  return API.addComment(comment).then(data => {
    if (data.comment) {
      dispatch(receiveAddComment(data.comment))
      dispatch(increaseCommentCount(data.comment.parentId))
    } else {
      dispatch(handleErrorComments(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorComments(ERROR_CONNECTION_REFUSED)))
}

// Delete a comment
const requestDeleteComment = () => ({ type: types.REQUEST_DELETE_COMMENT })
const receiveDeleteComment = comment => ({ type: types.RECEIVE_DELETE_COMMENT, comment })
export const deleteComment = commentId => dispatch => {
  dispatch(requestDeleteComment())
  return API.deleteComment(commentId).then(data => {
    if (data.comment) {
      dispatch(receiveDeleteComment(data.comment))
      dispatch(decreaseCommentCount(data.comment.parentId))
    } else {
      dispatch(handleErrorComments(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorComments(ERROR_CONNECTION_REFUSED)))
}

// DownVote a comment
const requestDownVoteComment = () => ({ type: types.REQUEST_DOWNVOTE_COMMENT })
const receiveDownVoteComment = comment => ({ type: types.RECEIVE_DOWNVOTE_COMMENT, comment })
export const downVoteComment = commentId => dispatch => {
  dispatch(requestDownVoteComment())
  return API.downVoteComment(commentId).then(data => {
    if (data.comment) {
      dispatch(receiveDownVoteComment(data.comment))
    } else {
      dispatch(handleErrorComments(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorComments(ERROR_CONNECTION_REFUSED)))
}

// Get comments for a post
const requestGetComments = () => ({ type: types.REQUEST_GET_COMMENTS })
const receiveGetComments = comments => ({ type: types.RECEIVE_GET_COMMENTS, comments })
export const getComments = parentId => dispatch => {
  dispatch(requestGetComments())
  return API.getComments(parentId).then(data => {
    if (data.comments) {
      const normailzed = normalize(data.comments, Schema.comments)
      dispatch(receiveGetComments(normailzed.entities.comments || {}))
    } else {
      dispatch(handleErrorComments(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorComments(ERROR_CONNECTION_REFUSED)))
}

// Edit a comment
const requestUpdateComment = () => ({ type: types.REQUEST_UPDATE_COMMENT })
const receiveUpdateComment = comment => ({ type: types.RECEIVE_UPDATE_COMMENT, comment })
export const updateComment = comment => dispatch => {
  dispatch(requestUpdateComment())
  return API.updateComment(comment).then(data => {
    if (data.comment) {
      dispatch(receiveUpdateComment(data.comment))
    } else {
      dispatch(handleErrorComments(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorComments(ERROR_CONNECTION_REFUSED)))
}

// UpVote a comment
const requestUpVoteComment = () => ({ type: types.REQUEST_UPVOTE_COMMENT })
const receiveUpVoteComment = comment => ({ type: types.RECEIVE_UPVOTE_COMMENT, comment })
export const upVoteComment = commentId => dispatch => {
  dispatch(requestUpVoteComment())
  return API.upVoteComment(commentId).then(data => {
    if (data.comment) {
      dispatch(receiveUpVoteComment(data.comment))
    } else {
      dispatch(handleErrorComments(ERROR_UNEXPECTED_ERROR))
    }
  }).catch(() => dispatch(handleErrorComments(ERROR_CONNECTION_REFUSED)))
}
