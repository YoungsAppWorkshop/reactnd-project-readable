import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostDetail from '../../components/post/PostDetail'
import PostListItem from '../../components/post/PostListItem'
import { deletePost, downVotePost, updatePost, upVotePost } from '../../actions'
import { validateInputs } from '../../utils/helpers'
import { LIST_ITEM, POST_DETAIL } from '../../constants/PostLayouts'

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

  componentDidMount = () => {
    const { post } = this.props
    this.setState({
      postForm: { title: post.title, body: post.body, author: post.author, category: post.category }
    })
  }

  componentWillReceiveProps(nextProps) {
    const previousPost = this.props.post
    const nextPost = nextProps.post
    if (nextPost !== previousPost) {
      this.setState({
        postForm: { title: nextPost.title, body: nextPost.body, author: nextPost.author, category: nextPost.category }
      })
    }
  }

  toggleAlertModal = () => {
    this.setState((prevState) => ({ isAlertModalOpen: !prevState.isAlertModalOpen }))
  }

  toggleFormModal = () => {
    this.setState((prevState) => ({ isFormModalOpen: !prevState.isFormModalOpen }))
  }

  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  validateInputValues = () => {
    const formInputs = Object.assign({}, this.state.postForm)
    delete formInputs.category
    const isInputValid = validateInputs(formInputs)
    this.setState({ isInputValid }, this.editPost)
  }

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

  upVotePost = () => {
    const { dispatch, post } = this.props
    dispatch(upVotePost(post.id))
  }

  downVotePost = () => {
    const { dispatch, post } = this.props
    dispatch(downVotePost(post.id))
  }

  deletePost = () => {
    const { dispatch, post } = this.props
    dispatch(deletePost(post.id))
    this.setState({ isAlertModalOpen: false })
  }

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
