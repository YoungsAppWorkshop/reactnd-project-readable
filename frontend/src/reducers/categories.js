import {
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: []
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CATEGORIES :
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_CATEGORIES :
      return {
        ...state,
        isFetching: false,
        items: action.categories
      }
    default:
      return state
  }
}

export default categories
