import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render() {
    const { posts } = this.props

    return (
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}><Link to={`/${post.category}/${post.id}`}>{post.title} | {post.timestamp} | {post.voteScore}</Link></li>
        ))}
      </ul>
    )
  }
}
