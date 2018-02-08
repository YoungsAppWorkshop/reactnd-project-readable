import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deleteComment, downVoteComment, updateComment, upVoteComment } from '../../actions/comments'
import CommentEditForm from '../../components/comment/CommentEditForm'
import CommentListItem from '../../components/comment/CommentListItem'
import { validate } from '../../utils/helpers'


/**
 * Container Component which represent a Comment
 */
class Comment extends Component {
  static propTypes = {
    /**
     * A comment object
     */
    comment: PropTypes.object.isRequired,
    /**
     * Redux store dispatch method
     */
    dispatch: PropTypes.func.isRequired
  }

  // Define state to handle edit form and alert modal
  state = {
    editable: false,
    editFormInput: '',
    isAlertModalOpen: false,
    isInputValid: null
  }

  // Initialize edit form on component mount
  componentDidMount = () => {
    const { comment } = this.props
    this.setState({ editFormInput: comment.body  })
  }

  // Upvote the comment
  upVote = () => {
    const { dispatch, comment } = this.props
    dispatch(upVoteComment(comment.id))
  }

  // Downvote the comment
  downVote = () => {
    const { dispatch, comment } = this.props
    dispatch(downVoteComment(comment.id))
  }

  // Open, close Alert Modal for confirmation of deleting the comment
  toggleAlertModal = () => {
    this.setState((prevState) => ({ isAlertModalOpen: !prevState.isAlertModalOpen }))
  }

  // Delete the comment and close alert modal
  deleteComment = () => {
    const { dispatch, comment } = this.props
    dispatch(deleteComment(comment.id))
    this.setState({ isAlertModalOpen: false })
  }

  // When editting comment is cancelled, Initialize form and close edit form
  handleCancel = () => {
    const { comment } = this.props
    this.setState({ editFormInput: comment.body, isInputValid: null })
    this.toggleEditable()
  }

  // Handle input change for edit form
  handleInputChange = event => { this.setState({ editFormInput: event.target.value })}

  // Show or hide edit form
  toggleEditable = () => {
    this.setState((prevState) => ({ editable: !prevState.editable }))
  }

  // When edit button clicked, validate input values and call back editComment method
  validateInputValues = () => {
    const { editFormInput } = this.state
    // If input is invalid, show warning in edit form
    this.setState({ isInputValid: validate(editFormInput) }, this.editComment)
  }

  // If all inputs are valid, edit the comment
  editComment = () => {
    const { editFormInput, isInputValid } = this.state
    const { comment, dispatch } = this.props
    if (isInputValid) {
      const timestamp = Date.now()
      const edittedComment = {
        id: comment.id,
        body: editFormInput,
        timestamp
      }
      dispatch(updateComment(edittedComment))
      this.setState({ editable: false, isInputValid: null })
    }
  }

  // Render CommentEditForm if editable, else render CommentListItem
  render () {
    const { editable, editFormInput, isAlertModalOpen, isInputValid } = this.state
    const { comment } = this.props

    if (!editable) {
      return (
        <CommentListItem
          comment={comment}
          downVoteComment={this.downVote}
          handleAlertModalSubmit={this.deleteComment}
          isAlertModalOpen={isAlertModalOpen}
          toggleAlertModal={this.toggleAlertModal}
          toggleEditable={this.toggleEditable}
          upVoteComment={this.upVote}
        />
      )
    } else {
      return (
        <CommentEditForm
          editFormInput={editFormInput}
          handleCancel={this.handleCancel}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.validateInputValues}
          isInputValid={isInputValid}
        />
      )
    }
  }
}

export default connect()(Comment)
