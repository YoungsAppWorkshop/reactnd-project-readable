import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PostListItem from '../components/PostListItem'
import { deletePost, downVotePost, updatePost, upVotePost } from '../actions'

class Post extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }

  state = {
    isPostModalOpen: false,
    isAlertModalOpen: false,
    postForm: { title: '', body: '', author: '' }
  }

  componentDidMount = () => {
    const { post } = this.props
    this.setState({
      postForm: { title: post.title, body: post.body, author: post.author, category: post.category }
    })
  }

  toggleAlertModal = () => {
    this.setState((prevState) => ({ isAlertModalOpen: !prevState.isAlertModalOpen }))
  }

  togglePostModal = () => {
    this.setState((prevState) => ({ isPostModalOpen: !prevState.isPostModalOpen }))
  }

  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  editPost = () => {
    const { postForm } = this.state
    const { dispatch, post } = this.props
    let updatedPost = {
      id: post.id,
      title: postForm.title,
      body: postForm.body
    }
    dispatch(updatePost(updatedPost))
    this.setState({ isPostModalOpen: false })
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
    const { isAlertModalOpen, isPostModalOpen, postForm } = this.state
    const { categories, post } = this.props

    return (
      <PostListItem
        categories={categories}
        downVotePost={this.downVotePost}
        handleAlertModalSubmit={this.deletePost}
        handleInputChange={this.handleInputChange}
        handlePostModalSubmit={this.editPost}
        isAlertModalOpen={isAlertModalOpen}
        isPostModalOpen={isPostModalOpen}
        post={post}
        postForm={postForm}
        toggleAlertModal={this.toggleAlertModal}
        togglePostModal={this.togglePostModal}
        upVotePost={this.upVotePost}
      />
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items
})

export default connect(
  mapStateToProps
)(Post)
