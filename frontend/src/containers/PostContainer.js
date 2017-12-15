import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchPost, fetchComments } from '../actions'

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const post_id = this.props.match.params.post_id
    this.props.dispatch(fetchPost(post_id))
    this.props.dispatch(fetchComments(post_id))
  }

  render() {
    const { post, comments } = this.props

    return (
      <div className="post">
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <div>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post.item,
  comments: state.comments.items
})

export default connect(
  mapStateToProps
)(PostContainer)
