import * as types from '../constants/ActionTypes'
import { ERROR_CONNECTION_REFUSED, FETCHING, INIT, READY } from '../constants/Status'

const initialState = {
  items: {},
  selectedPost: {},
  status: INIT
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.DECREASE_COMMENT_COUNT:
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          commentCount: --state.selectedPost.commentCount
        }
      }
    case types.FAIL_REQUEST_POSTS:
      return {
        ...state,
        status: ERROR_CONNECTION_REFUSED
      }
    case types.HANDLE_ERROR:
      return {
        ...state,
        status: action.status
      }
    case types.INCREASE_COMMENT_COUNT:
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          commentCount: ++state.selectedPost.commentCount
        }
      }
    case types.INIT_POST:
      return {
        ...state,
        status: INIT
      }
    case types.RECEIVE_ADD_POST :
      return {
        ...state,
        items: {
          ...state.items,
          [action.post.id]: action.post
        },
        status: READY
      }
    case types.RECEIVE_GET_POST :
      return {
        ...state,
        selectedPost: action.post,
        status: READY
      }
    case types.RECEIVE_GET_POSTS :
      return {
        ...state,
        items: action.posts,
        status: READY
      }
    case types.RECEIVE_DELETE_POST :
    case types.RECEIVE_DOWNVOTE_POST :
    case types.RECEIVE_UPDATE_POST :
    case types.RECEIVE_UPVOTE_POST :
      return {
        ...state,
        items: {
          ...state.items,
          [action.post.id]: action.post
        },
        selectedPost: action.post,
        status: READY
      }
    case types.REQUEST_ADD_POST :
    case types.REQUEST_DELETE_POST :
    case types.REQUEST_DOWNVOTE_POST :
    case types.REQUEST_GET_POST :
    case types.REQUEST_GET_POSTS :
    case types.REQUEST_UPDATE_POST :
    case types.REQUEST_UPVOTE_POST :
      return {
        ...state,
        status: FETCHING
      }
    case types.SELECT_POST :
      return {
        ...state,
        selectedPost: state.items[action.postId],
        status: READY
      }
    case types.UNSELECT_POST :
      return {
        ...state,
        selectedPost: {},
        status: INIT
      }
    default:
      return state
  }
}

export default posts
