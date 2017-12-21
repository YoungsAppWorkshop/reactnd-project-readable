import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostDetail from '../components/PostDetail'
import CommentsList from '../components/CommentsList'
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
        <PostDetail post={post}/>
        <CommentsList comments={comments}/>
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
