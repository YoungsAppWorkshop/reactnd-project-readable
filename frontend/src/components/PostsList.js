import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '../containers/ListItem'

const PostsList = ({ posts }) => (
  <section className="posts-list">
    {posts.map((post) => (
      <ListItem key={post.id} post={post} />
    ))}
  </section>
)

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostsList
