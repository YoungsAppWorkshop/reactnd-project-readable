import React from 'react'
import PropTypes from 'prop-types'

import Comment from '../../containers/comment/Comment'

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
