import React from 'react'
import PropTypes from 'prop-types'

import Post from '../containers/Post'
import { LIST_ITEM } from '../constants/PostLayouts'

const PostsList = ({ posts }) => (
  <section className="posts-list">
    {posts.map((post) => (
      <Post key={post.id} layout={LIST_ITEM} post={post} />
    ))}
  </section>
)

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostsList
