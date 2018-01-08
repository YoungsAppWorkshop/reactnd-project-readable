import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

import { selectCategory, unselectCategory } from '../actions/categories'
import { clearComments, getComments } from '../actions/comments'
import { fetchPostIfNeeded, unselectPost } from '../actions/posts'
import CommentsList from '../components/comment/CommentsList'
import ConnectionError from '../components/common/ConnectionError'
import Fetching from '../components/common/Fetching'
import Notification from '../components/common/Notification'
import { POST_DELETED } from '../constants/NoteTypes'
import { POST_DETAIL } from '../constants/PostLayouts'
import { ERROR_CONNECTION_REFUSED, ERROR_REQUEST_DELETED_POST, ERROR_WRONG_POST_ID, FETCHING, READY } from '../constants/Status'
import CommentAddForm from '../containers/comment/CommentAddForm'
import Post from '../containers/post/Post'

/**
 *
 * Container Component which represent Post Detail View of the app
 *
 */
class PostDetailView extends Component {
  static propTypes = {
    comments: PropTypes.object.isRequired,
    commentsStatus: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    postStatus: PropTypes.string.isRequired
  }

  // Select Category and Fetch Post and comments on component mount
  componentDidMount() {
    const { dispatch, match } = this.props
    const selectedCategory = match.params.category
    const selectedPostId = match.params.post_id

    dispatch(selectCategory(selectedCategory))
    dispatch(fetchPostIfNeeded(selectedPostId))
    dispatch(getComments(selectedPostId))
  }

  // On props change, select category and fetch post/comments
  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props
    const previousCategory = match.params.category
    const nextCategory = nextProps.match.params.category
    const previousPostId = match.params.post_id
    const nextPostId = nextProps.match.params.post_id

    if (nextCategory !== previousCategory) {
      dispatch(selectCategory(nextCategory))
    }
    if (nextPostId !== previousPostId) {
      dispatch(fetchPostIfNeeded(nextPostId))
      dispatch(getComments(nextPostId))
    }
  }

  // Clear Redux store when component will unmount
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(unselectCategory())
    dispatch(unselectPost())
    dispatch(clearComments())
  }

  // Render post detail view
  render() {
    const { comments, commentsStatus, post, postStatus, selectedCategory } = this.props
    let filteredComments = Object.values(comments).filter(comment => !comment.deleted && !comment.parentDeleted)
    let isValidCategory = post.category === selectedCategory

    // When user typed wrong category name in url, redirect to 404 page
    if ( postStatus === READY && post.category && !isValidCategory ) {
      return ( <Redirect to="/404"/> )
    }

    // When user typed wrong post id in url, redirect to 404 page
    if ( postStatus === ERROR_WRONG_POST_ID ) {
      return ( <Redirect to="/404"/> )
    }

    return (
      <Container className="main">

        { postStatus === ERROR_CONNECTION_REFUSED && ( <ConnectionError /> )}
        { postStatus === ERROR_REQUEST_DELETED_POST && (
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }} className="mt-5">
              <Notification noteType={POST_DELETED} path={selectedCategory} />
            </Col>
          </Row>
        )}

        { postStatus === FETCHING && ( <Fetching /> )}
        { postStatus === READY && (
          <Row>

            { post.deleted ? (
            <Col sm="12" md={{ size: 8, offset: 2 }} className="mt-5">
              <Notification noteType={POST_DELETED} path={selectedCategory} />
            </Col>

            ) : (
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Post layout={POST_DETAIL} post={post} />
              { commentsStatus === ERROR_CONNECTION_REFUSED && <p className="text-danger my-auto mx-auto">ERROR_CONNECTION_REFUSED: Connection Refused. Check your Network Connection</p>}
              { commentsStatus === FETCHING && <Loading delay={200} type="spin" color="#222" className="mx-auto my-5 py-5"/>}
              { commentsStatus === READY && <CommentsList comments={filteredComments}/>}
              { commentsStatus === READY && <CommentAddForm />}
            </Col>
            )}

          </Row>
        )}
      </Container>
    )

  }
}

const mapStateToProps = state => ({
  comments: state.comments.items,
  commentsStatus: state.comments.status,
  post: state.posts.selectedPost,
  postStatus: state.posts.status,
  selectedCategory: state.categories.selectedCategory
})

export default connect(
  mapStateToProps
)(PostDetailView)
