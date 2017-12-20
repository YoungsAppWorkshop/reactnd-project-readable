import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { selectPost, fetchComments } from '../actions'

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const selectedPostId = this.props.match.params.post_id
    this.props.dispatch(selectPost(selectedPostId))
    this.props.dispatch(fetchComments(selectedPostId))
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
  post: state.posts.selectedPost,
  comments: Object.values(state.comments.items)
})

export default connect(
  mapStateToProps
)(PostContainer)
