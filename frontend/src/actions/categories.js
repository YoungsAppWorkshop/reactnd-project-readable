import * as types from '../constants/ActionTypes'
import * as API from '../utils/api'

/**
 *
 * Action Creators for Categories
 *
 */

// On Connection Refused error
const failRequestCategories = () => ({ type: types.FAIL_REQUEST_CATEGORIES })

// Get Categories information
const requestGetCategories = () => ({ type: types.REQUEST_GET_CATEGORIES })
const receiveGetCategories = categories => ({ type: types.RECEIVE_GET_CATEGORIES, categories })
export const getCategories = () => dispatch => {
  dispatch(requestGetCategories())
  return API.getCategories().then(categories =>
    dispatch(receiveGetCategories(categories))
  ).catch(() => dispatch(failRequestCategories()))
}

// Select/Unselect categories while user navigate from one page to another
export const selectCategory = category => ({ type: types.SELECT_CATEGORY, category })
export const unselectCategory = category => ({ type: types.UNSELECT_CATEGORY })
