import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import AlertModal from '../components/AlertModal'
import PostModal from '../components/PostModal'
import { deletePost, downVotePost, updatePost, upVotePost } from '../actions'
import { EDIT_POST } from '../constants/FormTypes'

class ListItem extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }

  state = {
    isPostModalOpen: false,
    isAlertModalOpen: false,
    postForm: { title: '', body: '', author: '' }
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

  render() {
    const { isAlertModalOpen, isPostModalOpen, postForm } = this.state
    const { categories, post } = this.props
    return (
      <li>
        <Link to={`/${post.category}/${post.id}`}>{post.title} | {post.timestamp} | {post.voteScore}</Link>
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
      </li>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items
})

export default connect(
  mapStateToProps
)(ListItem)
