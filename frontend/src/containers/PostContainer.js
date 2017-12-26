import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AlertModal from '../components/AlertModal'
import CommentsList from '../components/CommentsList'
import PostDetail from '../components/PostDetail'
import PostModal from '../components/PostModal'
import { deletePost, downVotePost, fetchPostIfNeeded, getComments, updatePost, upVotePost } from '../actions'
import { EDIT_POST } from '../constants/FormTypes'

class PostContainer extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    isPostModalOpen: false,
    isAlertModalOpen: false,
    postForm: { title: '', body: '', author: '' }
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

  render() {
    const { isAlertModalOpen, isPostModalOpen, postForm } = this.state
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
          closeAlertModal={this.closeAlertModal}
          deletePost={this.deletePost}
          isAlertModalOpen={isAlertModalOpen}
        />

        <CommentsList comments={comments}/>
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
)(PostContainer)
