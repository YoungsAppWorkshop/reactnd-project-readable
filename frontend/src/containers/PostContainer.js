import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CommentsList from '../components/CommentsList'
import PostDetail from '../components/PostDetail'
import PostModal from '../components/PostModal'
import { getComments, updatePost, fetchPostIfNeeded } from '../actions'
import { EDIT_POST } from '../constants/FormTypes'

class PostContainer extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    post: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    isModalOpen: false,
    postForm: { title: '', body: '', author: '' }
  }

  componentDidMount() {
    const selectedPostId = this.props.match.params.post_id
    this.props.dispatch(fetchPostIfNeeded(selectedPostId))
    this.props.dispatch(getComments(selectedPostId))
  }

  openModal = () => {
    const { post } = this.props
    this.setState({
      isModalOpen: true,
      postForm: { title: post.title, body: post.body, author: post.author, category: post.category }
    })
  }

  closeModal = () => this.setState({ isModalOpen: false })

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

  render() {
    const { isModalOpen, postForm } = this.state
    const { categories, post, comments } = this.props

    return (
      <div className="post">
        <PostDetail post={post}/>
        <button onClick={this.openModal}>Edit Post</button>
        <CommentsList comments={comments}/>

        <PostModal
          categories={categories}
          closeModal={this.closeModal}
          defaultCategory={post.category}
          formType={EDIT_POST}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          isModalOpen={isModalOpen}
          postForm={postForm}
          selectRef={el => this.categorySelector = el }
        />
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
