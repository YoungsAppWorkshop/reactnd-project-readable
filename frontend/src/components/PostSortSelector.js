import React from 'react'
import PropTypes from 'prop-types'

const PostSortSelector = ({ postsOrder, sortPosts }) => (
  <div>
    Order by:
    <select value={postsOrder} onChange={e => sortPosts(e.target.value)}>
      <option value="MOST_RECENT">Date</option>
      <option value="MOST_VOTED">Vote Score</option>
      <option value="TITLE">Title</option>
    </select>
  </div>
)

PostSortSelector.propTypes = {
  postsOrder: PropTypes.string.isRequired,
  sortPosts: PropTypes.func.isRequired
}

export default PostSortSelector
