import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CommentEditForm from '../../components/comment/CommentEditForm'
import CommentListItem from '../../components/comment/CommentListItem'
import { deleteComment, downVoteComment, updateComment, upVoteComment } from '../../actions'
import { validate } from '../../utils/helpers'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    editable: false,
    editFormInput: '',
    isAlertModalOpen: false,
    isInputValid: null
  }

  componentDidMount = () => {
    const { comment } = this.props
    this.setState({ editFormInput: comment.body  })
  }

  upVote = () => {
    const { dispatch, comment } = this.props
    dispatch(upVoteComment(comment.id))
  }

  downVote = () => {
    const { dispatch, comment } = this.props
    dispatch(downVoteComment(comment.id))
  }

  toggleAlertModal = () => {
    this.setState((prevState) => ({ isAlertModalOpen: !prevState.isAlertModalOpen }))
  }

  deleteComment = () => {
    const { dispatch, comment } = this.props
    dispatch(deleteComment(comment.id))
    this.setState({ isAlertModalOpen: false })
  }

  handleCancel = () => {
    const { comment } = this.props
    this.setState({ editFormInput: comment.body, isInputValid: null })
    this.toggleEditable()
  }

  handleInputChange = event => { this.setState({ editFormInput: event.target.value })}

  toggleEditable = () => {
    this.setState((prevState) => ({ editable: !prevState.editable }))
  }

  validateInputValues = () => {
    const { editFormInput } = this.state
    this.setState({ isInputValid: validate(editFormInput) }, this.editComment)
  }

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

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps
)(Comment)
