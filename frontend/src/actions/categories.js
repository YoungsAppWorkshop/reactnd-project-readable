import * as types from '../constants/ActionTypes'
import { ERROR_CONNECTION_REFUSED, ERROR_UNEXPECTED_ERROR } from '../constants/Status'
import * as API from '../utils/api'

/**
 *
 * Action Creators for Categories
 *
 */

// Handling error while fetching categories
const handleErrorCategories = status => ({ type: types.HANDLE_ERROR_CATEGORIES, status })

// Get Categories information
const requestGetCategories = () => ({ type: types.REQUEST_GET_CATEGORIES })
const receiveGetCategories = categories => ({ type: types.RECEIVE_GET_CATEGORIES, categories })
export const getCategories = () => dispatch => {
  dispatch(requestGetCategories())
  return API.getCategories().then(data => {
    if (data.categories) {
      dispatch(receiveGetCategories(data.categories))
    } else {
      // Handling 500 INTERNAL_SERVER_ERROR
      dispatch(handleErrorCategories(ERROR_UNEXPECTED_ERROR))
    }
    // Handling ERROR_CONNECTION_REFUSED
  }).catch(() => dispatch(handleErrorCategories(ERROR_CONNECTION_REFUSED)))
}

// Select/Unselect categories while user navigate from one page to another
export const selectCategory = category => ({ type: types.SELECT_CATEGORY, category })
export const unselectCategory = category => ({ type: types.UNSELECT_CATEGORY })
