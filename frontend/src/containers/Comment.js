import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import AlertModal from '../components/AlertModal'
import { deleteComment, downVoteComment, upVoteComment } from '../actions'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
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

  render () {
    const { isAlertModalOpen } = this.state
    const { comment } = this.props
    return (
      <li>
        {comment.body} | {comment.author} | {comment.voteScore}
        <button onClick={this.openAlertModal}>Delete</button>
        <button onClick={this.upVote}>Up Vote</button>
        <button onClick={this.downVote}>Down Vote</button>
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
