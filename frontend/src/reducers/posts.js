import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: {},
  selectedPost: {}
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GET_POSTS :
    case types.REQUEST_GET_POST :
    case types.REQUEST_ADD_POST :
    case types.REQUEST_UPDATE_POST :
    case types.REQUEST_UPVOTE_POST :
    case types.REQUEST_DOWNVOTE_POST :
    case types.REQUEST_DELETE_POST :
      return {
        ...state,
        isFetching: true
      }
    case types.RECEIVE_GET_POSTS :
      return {
        ...state,
        isFetching: false,
        items: action.posts
      }
    case types.RECEIVE_GET_POST :
      return {
        ...state,
        isFetching: false,
        selectedPost: action.post
      }
    case types.RECEIVE_ADD_POST :
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.post.id]: action.post
        }
      }
    case types.RECEIVE_UPDATE_POST :
    case types.RECEIVE_UPVOTE_POST :
    case types.RECEIVE_DOWNVOTE_POST :
    case types.RECEIVE_DELETE_POST :
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.post.id]: action.post
        },
        selectedPost: action.post
      }
    case types.SELECT_POST :
      return {
        ...state,
        selectedPost: state.items[action.postId]
      }
    default:
      return state
  }
}

export default posts
