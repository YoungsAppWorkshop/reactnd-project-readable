import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PostSortSelector extends Component {
  static propTypes = {
    postsOrder: PropTypes.string.isRequired,
    sortPosts: PropTypes.func.isRequired
  }

  render() {
    const { postsOrder, sortPosts } = this.props

    return (
      <div>
        Order by:
        <select value={postsOrder} onChange={e => sortPosts(e.target.value)}>
          <option value="MOST_RECENT">Date</option>
          <option value="MOST_VOTED">Vote Score</option>
          <option value="TITLE">Title</option>
        </select>
      </div>
    )
  }
}
