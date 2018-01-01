import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'

import CommentAddForm from '../containers/comment/CommentAddForm'
import CommentsList from '../components/comment/CommentsList'
import Notification from '../components/Notification'
import Post from '../containers/post/Post'
import { fetchPostIfNeeded, getComments, selectCategory } from '../actions'
import { POST_DELETED } from '../constants/NoteTypes'
import { POST_DETAIL } from '../constants/PostLayouts'

class PostDetailView extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const selectedCategory = this.props.match.params.category
    const selectedPostId = this.props.match.params.post_id
    this.props.dispatch(selectCategory(selectedCategory))
    this.props.dispatch(fetchPostIfNeeded(selectedPostId))
    this.props.dispatch(getComments(selectedPostId))
  }

  render() {
    const { comments, post, selectedCategory } = this.props
    let filteredComments = Array.from(comments).filter(comment => !comment.deleted && !comment.parentDeleted)

    return (
      <Container className="main">

        <Row>

          {post.deleted || !post.id ? (

            <Col sm="12" md={{ size: 8, offset: 2 }} className="mt-5">
              <Notification noteType={POST_DELETED} path={selectedCategory} />
            </Col>

          ) : (

            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Post layout={POST_DETAIL} post={post} />
              <CommentsList comments={filteredComments}/>
              <CommentAddForm />
            </Col>

          )}

        </Row>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  comments: Object.values(state.comments.items),
  post: state.posts.selectedPost,
  selectedCategory: state.categories.selectedCategory
})

export default connect(
  mapStateToProps
)(PostDetailView)
