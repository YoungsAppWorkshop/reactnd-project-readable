import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: {}
}

const comments = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GET_COMMENTS :
      return {
        ...state,
        isFetching: true
      }
    case types.RECEIVE_GET_COMMENTS :
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
