import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'
import Loading from 'react-loading'

import CommentAddForm from '../containers/comment/CommentAddForm'
import CommentsList from '../components/comment/CommentsList'
import Notification from '../components/Notification'
import Post from '../containers/post/Post'
import { clearComments, fetchPostIfNeeded, getComments, selectCategory, unselectCategory, unselectPost } from '../actions'
import { POST_DELETED } from '../constants/NoteTypes'
import { POST_DETAIL } from '../constants/PostLayouts'
import { ERROR, FETCHING, READY } from '../constants/Status'

class PostDetailView extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    commentsStatus: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    postStatus: PropTypes.string.isRequired
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
    const { comments, commentsStatus, post, postStatus, selectedCategory } = this.props
    let filteredComments = Array.from(comments).filter(comment => !comment.deleted && !comment.parentDeleted)
    let isValidCategory = post.category === selectedCategory

    if ( postStatus === READY && post.category && !isValidCategory ) {
      return ( <Redirect to="/404"/> )
    }

    return (
      <Container className="main">

        { postStatus === FETCHING && (
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Loading delay={200} type="spin" color="#222" className="mx-auto my-5 py-5"/>
          </Col>
        </Row>
        )}

        { postStatus === READY && (
        <Row>

          { post.deleted ? (
          <Col sm="12" md={{ size: 8, offset: 2 }} className="mt-5">
            <Notification noteType={POST_DELETED} path={selectedCategory} />
          </Col>

          ) : (
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Post layout={POST_DETAIL} post={post} />
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
  comments: Object.values(state.comments.items),
  commentsStatus: state.comments.status,
  post: state.posts.selectedPost,
  postStatus: state.posts.status,
  selectedCategory: state.categories.selectedCategory
})

export default connect(
  mapStateToProps
)(PostDetailView)
