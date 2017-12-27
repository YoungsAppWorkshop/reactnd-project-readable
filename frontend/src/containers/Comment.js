import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AlertModal from '../components/AlertModal'
import { deleteComment, downVoteComment, updateComment, upVoteComment } from '../actions'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    editable: false,
    editFormInput: '',
    isAlertModalOpen: false
  }

  upVote = () => {
    const { dispatch, comment } = this.props
    dispatch(upVoteComment(comment.id))
  }

  downVote = () => {
    const { dispatch, comment } = this.props
    dispatch(downVoteComment(comment.id))
  }

  openAlertModal = () => this.setState({ isAlertModalOpen: true })
  closeAlertModal = () => this.setState({ isAlertModalOpen: false })
  deleteComment = () => {
    const { dispatch, comment } = this.props
    dispatch(deleteComment(comment.id))
  }

  handleInputChange = editFormInput => { this.setState({ editFormInput })}
  hideEditForm = () => this.setState({ editable: false })
  showEditForm = () => {
    const { comment } = this.props
    this.setState({ editable: true, editFormInput: comment.body })
  }

  editComment = () => {
    const { editFormInput } = this.state
    const { comment, dispatch } = this.props
    const timestamp = Date.now()
    const edittedComment = {
      id: comment.id,
      body: editFormInput,
      timestamp
    }
    dispatch(updateComment(edittedComment))
    this.setState({ editable: false, editFormInput: '' })
  }


  render () {
    const { editable, editFormInput, isAlertModalOpen } = this.state
    const { comment } = this.props
    return (
      <li>
        { !editable &&
          <div>
            <span>{comment.body} | {comment.author} | {comment.voteScore}</span>
            <button onClick={this.showEditForm}>Edit</button>
            <button onClick={this.openAlertModal}>Delete</button>
            <button onClick={this.upVote}>Up Vote</button>
            <button onClick={this.downVote}>Down Vote</button>
          </div>
        }
        { editable &&
          <div>
            <input
              name="body"
              type="text"
              value={editFormInput}
              onChange={event => this.handleInputChange(event.target.value)}
              placeholder="Post Contents Here..."
            />
            <button onClick={this.editComment}>Edit</button>
            <button onClick={this.hideEditForm}>Cancel</button>
          </div>
        }
        <AlertModal
          closeModal={this.closeAlertModal}
          handleSubmit={this.deleteComment}
          isModalOpen={isAlertModalOpen}
        />
      </li>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps
)(Comment)
