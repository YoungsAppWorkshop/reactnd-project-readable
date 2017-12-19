import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PostsList = ({ posts }) => (
  <ul className="posts-list">
    {posts.map((post) => (
      <li key={post.id}><Link to={`/${post.category}/${post.id}`}>{post.title} | {post.timestamp} | {post.voteScore}</Link></li>
    ))}
  </ul>
)

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostsList
