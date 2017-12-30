import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'
import { Col, Container, Row } from 'reactstrap'

import CommentsList from '../components/CommentsList'
import Post from '../containers/Post'
import { addComment, fetchPostIfNeeded, getComments } from '../actions'
import { POST_DETAIL } from '../constants/PostLayouts'

class PostDetailView extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    commentForm: { body: '', author: '' }
  }

  componentDidMount() {
    const selectedPostId = this.props.match.params.post_id
    this.props.dispatch(fetchPostIfNeeded(selectedPostId))
    this.props.dispatch(getComments(selectedPostId))
  }

  handleChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ commentForm: { ...this.state.commentForm, [key]: value }})
  }

  addNewComment = (event) => {
    event.preventDefault()
    const { commentForm } = this.state
    const { dispatch, post } = this.props
    const id = uuidv1()
    const timestamp = Date.now()
    let newComment = {
      id, timestamp, parentId: post.id,
      body: commentForm.body,
      author: commentForm.author
    }
    dispatch(addComment(newComment))
    this.setState({ commentForm: { body: '', author: '' } })
  }

  clearCommentForm = (event) => {
    event.preventDefault()
    this.setState({ commentForm: { body: '', author: '' } })
  }

  render() {
    const { commentForm } = this.state
    const { post, comments } = this.props

    return (
      <Container className="main">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Post layout={POST_DETAIL} post={post} />

            <CommentsList comments={comments}/>
            <form>
              <input
                name="body"
                type="text"
                placeholder="Comment ..."
                value={commentForm.body}
                onChange={this.handleChange}
              />
              <input
                name="author"
                type="text"
                placeholder="Author"
                value={commentForm.author}
                onChange={this.handleChange}
              />
              <button onClick={this.addNewComment}>Submit</button>
              <button onClick={this.clearCommentForm}>Clear</button>
            </form>
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
