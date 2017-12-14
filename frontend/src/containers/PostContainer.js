import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchPost } from '../actions'

class PostContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.dispatch(fetchPost(id))
  }

  render() {
    const { post } = this.props

    return (
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post.item
})

export default connect(
  mapStateToProps
)(PostContainer)
