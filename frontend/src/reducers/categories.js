import {
  REQUEST_CATEGORIES, RECEIVE_CATEGORIES, SELECT_CATEGORY
} from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
  selectedCategory: null
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
        items: action.categories,
        isFetching: false
      }
    case SELECT_CATEGORY :
      return {
        ...state,
        selectedCategory: action.category
      }
    default:
      return state
  }
}

export default categories
