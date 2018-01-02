import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'

import CommentAddForm from '../containers/comment/CommentAddForm'
import CommentsList from '../components/comment/CommentsList'
import Notification from '../components/Notification'
import Post from '../containers/post/Post'
import { clearComments, fetchPostIfNeeded, getComments, selectCategory, unselectCategory, unselectPost } from '../actions'
import { POST_DELETED } from '../constants/NoteTypes'
import { POST_DETAIL } from '../constants/PostLayouts'

class PostDetailView extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isPostReady: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired
  }

  componentDidMount() {
    const selectedCategory = this.props.match.params.category
    const selectedPostId = this.props.match.params.post_id
    this.props.dispatch(selectCategory(selectedCategory))
    this.props.dispatch(fetchPostIfNeeded(selectedPostId))
    this.props.dispatch(getComments(selectedPostId))
  }

  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    const nextCategory = nextProps.match.params.category
    const previousPostId = this.props.match.params.post_id
    const nextPostId = nextProps.match.params.post_id
    if (nextCategory !== previousCategory) {
      this.props.dispatch(selectCategory(nextCategory))
    }
    if (nextPostId !== previousPostId) {
      this.props.dispatch(fetchPostIfNeeded(nextPostId))
      this.props.dispatch(getComments(nextPostId))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(unselectCategory())
    this.props.dispatch(unselectPost())
    this.props.dispatch(clearComments())
  }

  render() {
    const { comments, isFetching, isPostReady, post, selectedCategory } = this.props
    let filteredComments = Array.from(comments).filter(comment => !comment.deleted && !comment.parentDeleted)
    let isValidCategory = post.category === selectedCategory

    if ( !isFetching && isPostReady && !isValidCategory ) {
      return ( <Redirect to="/404"/> )
    }

    return (
      <Container className="main">

        <Row>

          { !isFetching && (post.deleted || !post.id) ? (

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
  isFetching: state.posts.isFetching,
  isPostReady: state.posts.ready,
  post: state.posts.selectedPost,
  selectedCategory: state.categories.selectedCategory
})

export default connect(
  mapStateToProps
)(PostDetailView)
