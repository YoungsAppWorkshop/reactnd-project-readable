import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import AlertModal from '../components/AlertModal'
import CommentsList from '../components/CommentsList'
import PostDetail from '../components/PostDetail'
import PostModal from '../components/PostModal'
import { addComment, deletePost, downVotePost, fetchPostIfNeeded, getComments, updatePost, upVotePost } from '../actions'
import { EDIT_POST } from '../constants/FormTypes'

class PostDetailPage extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    isPostModalOpen: false,
    isAlertModalOpen: false,
    postForm: { title: '', body: '', author: '' },
    commentForm: { body: '', author: '' }
  }

  componentDidMount() {
    const selectedPostId = this.props.match.params.post_id
    this.props.dispatch(fetchPostIfNeeded(selectedPostId))
    this.props.dispatch(getComments(selectedPostId))
  }

  openPostModal = () => {
    const { post } = this.props
    this.setState({
      isPostModalOpen: true,
      postForm: { title: post.title, body: post.body, author: post.author, category: post.category }
    })
  }

  closePostModal = () => this.setState({ isPostModalOpen: false })

  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  handleSubmit = () => {
    const { postForm } = this.state
    const { dispatch, post } = this.props
    let updatedPost = {
      id: post.id,
      title: postForm.title,
      body: postForm.body
    }
    dispatch(updatePost(updatedPost))
  }

  upVotePost = () => {
    const { dispatch, post } = this.props
    dispatch(upVotePost(post.id))
  }

  downVotePost = () => {
    const { dispatch, post } = this.props
    dispatch(downVotePost(post.id))
  }

  openAlertModal = () => this.setState({ isAlertModalOpen: true })
  closeAlertModal = () => this.setState({ isAlertModalOpen: false })
  deletePost = () => {
    const { dispatch, post } = this.props
    dispatch(deletePost(post.id))
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
    const { commentForm, isAlertModalOpen, isPostModalOpen, postForm } = this.state
    const { categories, post, comments } = this.props

    return (
      <div className="post">
        <PostDetail post={post}/>
        <button onClick={this.openPostModal}>Edit Post</button>
        <button onClick={this.openAlertModal}>Delete Post</button>
        <button onClick={this.upVotePost}>Up Vote</button>
        <button onClick={this.downVotePost}>Down Vote</button>
        <PostModal
          categories={categories}
          closePostModal={this.closePostModal}
          defaultCategory={post.category}
          formType={EDIT_POST}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          isPostModalOpen={isPostModalOpen}
          postForm={postForm}
          selectRef={el => this.categorySelector = el }
        />
        <AlertModal
          closeModal={this.closeAlertModal}
          handleSubmit={this.deletePost}
          isModalOpen={isAlertModalOpen}
        />

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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  post: state.posts.selectedPost,
  comments: Object.values(state.comments.items)
})

export default connect(
  mapStateToProps
)(PostDetailPage)
