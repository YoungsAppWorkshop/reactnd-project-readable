import React from 'react'
import PropTypes from 'prop-types'

const PostDetail = ({ post }) => (
  <div>
    <h1>Title : {post.title}</h1>
    <h4>Author : {post.author}</h4>
    <p>Num of comments : {post.commentCount}</p>
    <p>Vote Score : {post.voteScore}</p>
    <p>{post.body}</p>
  </div>
)

PostDetail.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostDetail
