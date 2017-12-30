import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import AlertModal from '../components/AlertModal'
import PostModal from '../components/PostModal'
import { deletePost, downVotePost, updatePost, upVotePost } from '../actions'
import { EDIT_POST } from '../constants/ModalTypes'
import { formatDate } from '../utils/helpers'

import {
  Card, Button, CardTitle, CardSubtitle, ButtonGroup
} from 'reactstrap'

import FaTrash from 'react-icons/lib/fa/trash'
import FaEdit from'react-icons/lib/fa/edit'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaCommentO from 'react-icons/lib/fa/comment-o'

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

      <Card body className="posts-list-item mt-2">
        <CardTitle className="posts-list-item-title title">
          <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
        </CardTitle>
        <CardSubtitle className="posts-list-item-subtitle">
          <small>
            <strong>{post.author}</strong>&nbsp;|&nbsp;{ formatDate(post.timestamp) }&nbsp; &nbsp;
            <span className="text-info"><FaCommentO size={15}/> {post.commentCount}</span>&nbsp;&nbsp;
            { post.voteScore >= 0 ? (
              <span className="text-success"><FaThumbsOUp size={15}/> {post.voteScore}</span>
            ) : (
              <span className="text-danger"><FaThumbsODown size={15}/> {post.voteScore}</span>
            )}
          </small>
        </CardSubtitle>

        <ButtonGroup className="posts-list-item-btn-group">
          <Button className="px-1" color="link" onClick={this.openPostModal}><FaEdit size={15}/></Button>{' '}
          <Button className="px-1" color="link" onClick={this.openAlertModal}><FaTrash size={15}/></Button>{' '}
          <Button className="px-1" color="link" onClick={this.upVotePost}><FaThumbsOUp size={15}/></Button>{' '}
          <Button className="px-1" color="link" onClick={this.downVotePost}><FaThumbsODown size={15}/></Button>
        </ButtonGroup>


      </Card>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items
})

export default connect(
  mapStateToProps
)(ListItem)
