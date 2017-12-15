import {
  REQUEST_POSTS, RECEIVE_POSTS, ADD_POST
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  category: null,
  items: []
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS :
      return {
        ...state,
        isFetching: true,
        category: action.category
      }
    case RECEIVE_POSTS :
      return {
        ...state,
        isFetching: false,
        category: action.category,
        items: action.posts
      }
    case ADD_POST :
      return {
        ...state,
        items: action.posts
      }
    default:
      return state
  }
}

export default posts
