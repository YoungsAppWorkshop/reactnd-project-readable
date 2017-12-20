import {
  REQUEST_COMMENTS, RECEIVE_COMMENTS,
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: {}
}

const comments = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS :
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_COMMENTS :
      return {
        ...state,
        isFetching: false,
        items: action.comments
      }
    default:
      return state
  }
}

export default comments
