import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'
import { Button, Col, FormGroup, Input } from 'reactstrap'

import { addComment } from '../../actions'

class CommentAddForm extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    commentForm: { body: '', author: '' }
  }

  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ commentForm: { ...this.state.commentForm, [key]: value }})
  }

  addNewComment = (event) => {
    event.preventDefault()
    const { commentForm } = this.state
    const { dispatch, post } = this.props
    const id = uuidv1()
    const timestamp = Date.now()
    let newComment = {
      id, timestamp, parentId: post.id,
      body: commentForm.body,
      author: commentForm.author
    }
    dispatch(addComment(newComment))
    this.setState({ commentForm: { body: '', author: '' } })
  }

  render() {
    const { commentForm } = this.state

    return (
      <FormGroup row className="mt-1">

        <Col xs={12} sm={9}>
          <Input
            className="h-100" type="textarea" name="body" placeholder="Add Comment here..."
            value={commentForm.body} onChange={this.handleInputChange}
          />
        </Col>

        <Col xs={12} sm={3}>
          <Input
            className="my-2 mt-sm-0" type="text" name="author" placeholder="Author"
            value={commentForm.author} onChange={this.handleInputChange}
          />
          <Button className="w-100" color="outline-success" onClick={this.addNewComment}>Submit</Button>
        </Col>

      </FormGroup>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts.selectedPost
})

export default connect(
  mapStateToProps
)(CommentAddForm)
