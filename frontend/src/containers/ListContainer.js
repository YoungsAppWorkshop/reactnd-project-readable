import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchPosts } from '../actions'

class ListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    category: PropTypes.string,
    dispatch: PropTypes.func.isRequired
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

  render() {
    const { posts } = this.props

    return (
      <div>
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id}><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></li>
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
