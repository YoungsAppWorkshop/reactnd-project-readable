import { normalize } from 'normalizr'

import { decreaseCommentCount, increaseCommentCount } from './posts'
import * as types from '../constants/ActionTypes'
import * as API from '../utils/api'
import * as Schema from '../schema'

/**
 *
 * Action Creators for Comments
 *
 */

// Remove comments from Redux store when PostDetailView component will unmount
export const clearComments = () => ({ type: types.CLEAR_COMMENTS })

// On Connection Refused error
const failRequestComments = () => ({ type: types.FAIL_REQUEST_COMMENTS })

// Add a comment for a post
const requestAddComment = () => ({ type: types.REQUEST_ADD_COMMENT })
const receiveAddComment = comment => ({ type: types.RECEIVE_ADD_COMMENT, comment })
export const addComment = comment => dispatch => {
  dispatch(requestAddComment())
  return API.addComment(comment).then(comment => {
    dispatch(receiveAddComment(comment))
    dispatch(increaseCommentCount(comment.parentId))
  }).catch(() => dispatch(failRequestComments()))
}

// Delete a comment
const requestDeleteComment = () => ({ type: types.REQUEST_DELETE_COMMENT })
const receiveDeleteComment = comment => ({ type: types.RECEIVE_DELETE_COMMENT, comment })
export const deleteComment = commentId => dispatch => {
  dispatch(requestDeleteComment())
  return API.deleteComment(commentId).then(comment => {
    dispatch(receiveDeleteComment(comment))
    dispatch(decreaseCommentCount(comment.parentId))
  }).catch(() => dispatch(failRequestComments()))
}

// DownVote a comment
const requestDownVoteComment = () => ({ type: types.REQUEST_DOWNVOTE_COMMENT })
const receiveDownVoteComment = comment => ({ type: types.RECEIVE_DOWNVOTE_COMMENT, comment })
export const downVoteComment = commentId => dispatch => {
  dispatch(requestDownVoteComment())
  return API.downVoteComment(commentId).then(comment => {
    dispatch(receiveDownVoteComment(comment))
  }).catch(() => dispatch(failRequestComments()))
}

// Get comments for a post
const requestGetComments = () => ({ type: types.REQUEST_GET_COMMENTS })
const receiveGetComments = comments => ({ type: types.RECEIVE_GET_COMMENTS, comments })
export const getComments = parentId => dispatch => {
  dispatch(requestGetComments())
  return API.getComments(parentId).then(comments => {
    const data = normalize(comments, Schema.comments)
    dispatch(receiveGetComments(data.entities.comments || {}))
  }).catch(() => dispatch(failRequestComments()))
}

// Edit a comment
const requestUpdateComment = () => ({ type: types.REQUEST_UPDATE_COMMENT })
const receiveUpdateComment = comment => ({ type: types.RECEIVE_UPDATE_COMMENT, comment })
export const updateComment = comment => dispatch => {
  dispatch(requestUpdateComment())
  return API.updateComment(comment).then(comment => {
    dispatch(receiveUpdateComment(comment))
  }).catch(() => dispatch(failRequestComments()))
}

// UpVote a comment
const requestUpVoteComment = () => ({ type: types.REQUEST_UPVOTE_COMMENT })
const receiveUpVoteComment = comment => ({ type: types.RECEIVE_UPVOTE_COMMENT, comment })
export const upVoteComment = commentId => dispatch => {
  dispatch(requestUpVoteComment())
  return API.upVoteComment(commentId).then(comment => {
    dispatch(receiveUpVoteComment(comment))
  }).catch(() => dispatch(failRequestComments()))
}
