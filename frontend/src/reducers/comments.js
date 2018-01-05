import * as types from '../constants/ActionTypes'
import { ERROR, FETCHING, INIT, READY } from '../constants/Status'

const initialState = {
  items: {},
  status: INIT
}

const comments = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_COMMENTS :
      return {
        ...state,
        items: {},
        status: INIT
      }
    case types.FAIL_REQUEST_COMMENTS :
      return {
        ...state,
        status: ERROR
      }
    case types.RECEIVE_ADD_COMMENT :
    case types.RECEIVE_DELETE_COMMENT :
    case types.RECEIVE_DOWNVOTE_COMMENT :
    case types.RECEIVE_UPDATE_COMMENT :
    case types.RECEIVE_UPVOTE_COMMENT :
      return {
        ...state,
        items: {
          ...state.items,
          [action.comment.id]: action.comment
        },
        status: READY
      }
    case types.RECEIVE_GET_COMMENTS :
      return {
        ...state,
        items: action.comments,
        status: READY
      }
    case types.REQUEST_ADD_COMMENT :
    case types.REQUEST_DOWNVOTE_COMMENT :
    case types.REQUEST_GET_COMMENTS :
    case types.REQUEST_UPDATE_COMMENT :
    case types.REQUEST_UPVOTE_COMMENT :
      return {
        ...state,
        status: FETCHING
      }
    default:
      return state
  }
}

export default comments
