import * as API from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES
})

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return API.getCategories().then(categories => dispatch(receiveCategories(categories)))
}
