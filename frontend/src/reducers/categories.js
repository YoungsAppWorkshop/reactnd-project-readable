import * as types from '../constants/ActionTypes'

const initialState = {
  isFetching: false,
  items: [],
  selectedCategory: null
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GET_CATEGORIES :
      return {
        ...state,
        isFetching: true
      }
    case types.RECEIVE_GET_CATEGORIES :
      return {
        ...state,
        items: action.categories,
        isFetching: false
      }
    case types.SELECT_CATEGORY :
      return {
        ...state,
        selectedCategory: action.category
      }
    default:
      return state
  }
}

export default categories
