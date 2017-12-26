import React from 'react'
import PropTypes from 'prop-types'

import Comment from '../containers/Comment'

const CommentsList = ({ comments }) => (
  <div>
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment}/>
    ))}
  </div>
)

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentsList
