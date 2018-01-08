import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deletePost, downVotePost, updatePost, upVotePost } from '../../actions/posts'
import PostDetail from '../../components/post/PostDetail'
import PostListItem from '../../components/post/PostListItem'
import { LIST_ITEM, POST_DETAIL } from '../../constants/PostLayouts'
import { validateInputs } from '../../utils/helpers'

/**
 *
 * Container Component which represent a Post
 *
 */
class Post extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    layout: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired
  }

  state = {
    isFormModalOpen: false,
    isAlertModalOpen: false,
    postForm: { title: '', body: '', author: '' },
    isInputValid: { title: null, body: null, author: null }
  }

  // Initialize edit form on component mount
  componentDidMount = () => {
    const { post } = this.props
    this.setState({
      postForm: { title: post.title, body: post.body, author: post.author, category: post.category }
    })
  }

  // If post prop is changed reinitialize edit form
  componentWillReceiveProps(nextProps) {
    const previousPost = this.props.post
    const nextPost = nextProps.post
    if (nextPost !== previousPost) {
      this.setState({
        postForm: { title: nextPost.title, body: nextPost.body, author: nextPost.author, category: nextPost.category }
      })
    }
  }

  // Upvote the post
  upVotePost = () => {
    const { dispatch, post } = this.props
    dispatch(upVotePost(post.id))
  }

  // Downvote the post
  downVotePost = () => {
    const { dispatch, post } = this.props
    dispatch(downVotePost(post.id))
  }

  // Open, close Alert Modal for confirmation of deleting the post
  toggleAlertModal = () => {
    this.setState((prevState) => ({ isAlertModalOpen: !prevState.isAlertModalOpen }))
  }

  // Delete the post and close alert modal
  deletePost = () => {
    const { dispatch, post } = this.props
    dispatch(deletePost(post.id))
    this.setState({ isAlertModalOpen: false })
  }

  // Open, close Form Modal for editing the post
  toggleFormModal = () => {
    this.setState((prevState) => ({ isFormModalOpen: !prevState.isFormModalOpen }))
  }

  // Handle input change for edit form
  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  // When edit button clicked, validate input values and call back editPost method
  validateInputValues = () => {
    const formInputs = Object.assign({}, this.state.postForm)
    // Validate text inputs only - post title, author, body
    delete formInputs.category
    // If input is invalid, show warning in edit form
    this.setState({ isInputValid: validateInputs(formInputs) }, this.editPost)
  }

  // If all inputs are valid, edit the post
  editPost = () => {
    const { isInputValid, postForm } = this.state
    const { dispatch, post } = this.props

    const isFormValid = Object.values(isInputValid).reduce((a, c) => a && c)
    if (isFormValid) {
      let updatedPost = {
        id: post.id,
        title: postForm.title,
        body: postForm.body
      }
      dispatch(updatePost(updatedPost))
      this.setState({ isFormModalOpen: false })
    }
  }

  // Render the Post in PostListItem layout or PostDetail layout
  render() {
    const { isAlertModalOpen, isFormModalOpen, isInputValid, postForm } = this.state
    const { categories, layout, post } = this.props

    if (layout === LIST_ITEM) {
      return (
        <PostListItem
          categories={categories}
          downVotePost={this.downVotePost}
          handleAlertModalSubmit={this.deletePost}
          handleInputChange={this.handleInputChange}
          handleFormModalSubmit={this.validateInputValues}
          isAlertModalOpen={isAlertModalOpen}
          isFormModalOpen={isFormModalOpen}
          isInputValid={isInputValid}
          post={post}
          postForm={postForm}
          toggleAlertModal={this.toggleAlertModal}
          toggleFormModal={this.toggleFormModal}
          upVotePost={this.upVotePost}
        />
      )
    }
    if (layout === POST_DETAIL) {
      return (
        <PostDetail
          categories={categories}
          downVotePost={this.downVotePost}
          handleAlertModalSubmit={this.deletePost}
          handleInputChange={this.handleInputChange}
          handleFormModalSubmit={this.validateInputValues}
          isAlertModalOpen={isAlertModalOpen}
          isFormModalOpen={isFormModalOpen}
          isInputValid={isInputValid}
          post={post}
          postForm={postForm}
          toggleAlertModal={this.toggleAlertModal}
          toggleFormModal={this.toggleFormModal}
          upVotePost={this.upVotePost}
        />
      )
    }
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items
})

export default connect(
  mapStateToProps
)(Post)
