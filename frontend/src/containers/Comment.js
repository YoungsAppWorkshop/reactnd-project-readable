import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { downVoteComment, upVoteComment } from '../actions'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {}

  upVote = () => {
    const { dispatch, comment } = this.props
    dispatch(upVoteComment(comment.id))
  }

  downVote = () => {
    const { dispatch, comment } = this.props
    dispatch(downVoteComment(comment.id))
  }

  render () {
    const { comment } = this.props
    return (
      <li>
        {comment.body} | {comment.author} | {comment.voteScore}
        <button onClick={this.upVote}>Up Vote</button>
        <button onClick={this.downVote}>Down Vote</button>
      </li>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps
)(Comment)
