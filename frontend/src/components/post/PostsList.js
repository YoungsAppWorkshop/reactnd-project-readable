import PropTypes from 'prop-types'
import React from 'react'

import { LIST_ITEM } from '../../constants/PostLayouts'
import Post from '../../containers/post/Post'


/**
 * Presentational Component which represent Posts List in List view
 */
const PostsList = ({ posts }) => (

  <section className="posts-list">

    {posts.map((post) => (
      <Post key={post.id} layout={LIST_ITEM} post={post} />
    ))}

  </section>
)

PostsList.propTypes = {
  /**
   * A list of posts for selected category(Or all categories)
   */
  posts: PropTypes.array.isRequired
}

export default PostsList
