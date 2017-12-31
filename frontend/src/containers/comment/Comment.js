import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CommentEditForm from '../../components/comment/CommentEditForm'
import CommentListItem from '../../components/comment/CommentListItem'
import { deleteComment, downVoteComment, updateComment, upVoteComment } from '../../actions'

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

  handleInputChange = event => { this.setState({ editFormInput: event.target.value })}

  toggleEditable = () => {
    this.setState((prevState) => ({ editable: !prevState.editable }))
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
    this.setState({ editable: false })
  }


  render () {
    const { editable, editFormInput, isAlertModalOpen } = this.state
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
          handleInputChange={this.handleInputChange}
          handleSubmit={this.editComment}
          toggleEditable={this.toggleEditable}
        />
      )
    }
  }
}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps
)(Comment)
