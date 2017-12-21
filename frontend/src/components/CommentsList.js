import React from 'react'
import PropTypes from 'prop-types'

const CommentsList = ({ comments }) => (
  <div>
    {comments.map((comment) => (
      <li key={comment.id}>{comment.body}</li>
    ))}
  </div>
)

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentsList
