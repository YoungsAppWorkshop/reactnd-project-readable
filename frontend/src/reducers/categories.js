import * as types from '../constants/ActionTypes'
import { ERROR, FETCHING, INIT, READY } from '../constants/Status'

const initialState = {
  items: [],
  selectedCategory: null,
  status: INIT
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case types.RECEIVE_GET_CATEGORIES :
      return {
        ...state,
        items: action.categories,
        status: READY
      }
    case types.REQUEST_GET_CATEGORIES :
      return {
        ...state,
        status: FETCHING
      }
    case types.SELECT_CATEGORY :
      return {
        ...state,
        selectedCategory: action.category
      }
    case types.UNSELECT_CATEGORY :
      return {
        ...state,
        selectedCategory: null
      }
    default:
      return state
  }
}

export default categories
