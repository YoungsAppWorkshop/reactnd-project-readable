import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: {},
  selectedPost: {}
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GET_POSTS :
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
    case types.REQUEST_ADD_POST :
      return {
        ...state,
        isFetching: true
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
    case types.SELECT_POST :
      return {
        ...state,
        selectedPost: state.items[action.postId]
      }
    case types.REQUEST_UPDATE_POST :
      return {
        ...state,
        isFetching: true
      }
    case types.RECEIVE_UPDATE_POST :
      return {
        ...state,
        isFetching: false,
        items: {
          ...state.items,
          [action.post.id]: action.post
        },
        selectedPost: action.post
      }
    default:
      return state
  }
}

export default posts
