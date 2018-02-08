import { MOST_VOTED, RECENT_POST, TITLE } from '../constants/PostsOrder'

// Capitalize a string
export const capitalize = (str = '')  =>
  typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1)

// Format timestamp from 1468166872634 to 'Jul 11, 2016'
export const formatDate  = (timestamp) => {
  if (typeof timestamp !== 'number') {
    return ''
  }
  const d = new Date(timestamp).toDateString()
  return d.slice(4, 10) + ',' + d.slice(10)
}

// Define Array.sort() method's compareFunctions for sorting posts list
export const sortPostsBy = {
  [RECENT_POST]: {
    text: 'Recent Post',
    compareFunc: (post1, post2) => post2.timestamp - post1.timestamp,
  },
  [MOST_VOTED]: {
    text: 'Top Voted',
    compareFunc: (post1, post2) => post2.voteScore - post1.voteScore,
  },
  [TITLE]: {
    text: 'Post Title',
    compareFunc: (post1, post2) => (
      post1.title.toUpperCase() > post2.title.toUpperCase() ? 1 :
      post1.title.toUpperCase() < post2.title.toUpperCase() ? -1 : 0
    ),
  },
}

// Validate a single input string if it's not ''
export const validate = (inputStr)  => (
  (typeof inputStr === 'string') && (inputStr.trim() !== '')
)

// Validate several input strings if they're not ''
export const validateInputs = form => Object.keys(form).reduce((a, c) => {
  a[c] = validate(form[c])
  return a
}, {})
