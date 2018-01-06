import PropTypes from 'prop-types'
import React from 'react'

import Comment from '../../containers/comment/Comment'

/**
 *
 * Presentational Component which represent Comments List for a post
 *
 */
const CommentsList = ({ comments }) => (
  <div className="comments-list mb-5">

    <h5 className="title mb-3">Comments:</h5>

    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment}/>
    ))}

  </div>
)

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentsList
