import {
  REQUEST_POSTS, RECEIVE_POSTS, ADD_POST, SELECT_POST
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: {},
  selectedPost: {}
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS :
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POSTS :
      return {
        ...state,
        isFetching: false,
        items: action.posts
      }
    case ADD_POST :
      return {
        ...state,
        items: {
          ...state.items,
          [action.post.id]: action.post
        }
      }
    case SELECT_POST :
      return {
        ...state,
        selectedPost: state.items[action.postId]
      }
    default:
      return state
  }
}

export default posts
