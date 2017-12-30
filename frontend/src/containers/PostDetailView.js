import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'

import CommentAddForm from '../containers/CommentAddForm'
import CommentsList from '../components/CommentsList'
import Post from '../containers/Post'
import { fetchPostIfNeeded, getComments } from '../actions'
import { POST_DETAIL } from '../constants/PostLayouts'

class PostDetailView extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const selectedPostId = this.props.match.params.post_id
    this.props.dispatch(fetchPostIfNeeded(selectedPostId))
    this.props.dispatch(getComments(selectedPostId))
  }

  render() {
    const { post, comments } = this.props
    let filteredComments = Array.from(comments).filter(comment => !comment.deleted && !comment.parentDeleted)

    return (
      <Container className="main">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Post layout={POST_DETAIL} post={post} />
            <CommentsList comments={filteredComments}/>
            <CommentAddForm />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts.selectedPost,
  comments: Object.values(state.comments.items)
})

export default connect(
  mapStateToProps
)(PostDetailView)
