import {
  REQUEST_POST, RECEIVE_POST
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  item: {}
}

const post = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POST :
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_POST :
      return {
        ...state,
        isFetching: false,
        item: action.post
      }
    default:
      return state
  }
}

export default post
