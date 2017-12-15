import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchPosts } from '../actions'

const SORT_BY = {
  'MOST_RECENT': (post1, post2) => post2.timestamp - post1.timestamp,
  'MOST_VOTED': (post1, post2) => post2.voteScore - post1.voteScore,
  'TITLE': (post1, post2) => (
    post1.title.toUpperCase() > post2.title.toUpperCase() ? 1 :
    post1.title.toUpperCase() < post2.title.toUpperCase() ? -1 : 0
  )
}

class ListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    category: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    postsOrder: 'MOST_RECENT'
  }

  componentDidMount() {
    const category = this.props.match.params.category
    this.props.dispatch(fetchPosts(category))
  }

  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    if (nextProps.match.params.category !== previousCategory) {
      this.props.dispatch(fetchPosts(nextProps.match.params.category))
    }
  }

  sortPosts(postsOrder) {
    this.setState({ postsOrder })
  }

  render() {
    const { postsOrder } = this.state
    const { posts } = this.props
    let sortedPosts = Array.from(posts).sort(SORT_BY[postsOrder])

    return (
      <div>

        Order by:
        <select value={postsOrder} onChange={e => this.sortPosts(e.target.value)}>
          <option value='MOST_RECENT'>Date</option>
          <option value='MOST_VOTED'>Vote Score</option>
          <option value='TITLE'>Title</option>
        </select>

        <ul className="posts-list">
          {sortedPosts.map((post) => (
            <li key={post.id}><Link to={`/${post.category}/${post.id}`}>{post.title} | {post.timestamp} | {post.voteScore}</Link></li>
          ))}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.posts.isFetching,
  posts: state.posts.items,
  category: state.posts.category
})

export default connect(
  mapStateToProps
)(ListContainer)
