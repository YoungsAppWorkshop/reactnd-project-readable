import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, FormGroup, Input } from 'reactstrap'
import uuidv1 from 'uuid/v1'

import { addComment } from '../../actions'
import { validateInputs } from '../../utils/helpers'

/**
 *
 * Container Component which represent a Comment Add Form
 *
 */
class CommentAddForm extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    commentForm: { body: '', author: '' },
    isInputValid: { body: null, author: null }
  }

  // Handle input change for the form
  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ commentForm: { ...this.state.commentForm, [key]: value }})
  }

  // When Add button clicked, validate input values and call back addNewComment method
  validateInputValues = () => {
    const { commentForm } = this.state
    const isInputValid = validateInputs(commentForm)
    // If input is invalid, show warning in the form
    this.setState({ isInputValid }, this.addNewComment)
  }

  // If all inputs are valid, add the comment
  addNewComment = () => {
    const { commentForm, isInputValid } = this.state
    const { dispatch, post } = this.props

    const isFormValid = Object.values(isInputValid).reduce((a, c) => a && c)
    if (isFormValid) {
      const id = uuidv1()
      const timestamp = Date.now()
      let newComment = {
        id, timestamp, parentId: post.id,
        body: commentForm.body,
        author: commentForm.author
      }
      dispatch(addComment(newComment))
      this.setState({
        commentForm: { body: '', author: '' },
        isInputValid: { body: null, author: null }
      })
    }
  }

  // Render CommentAddForm
  render() {
    const { commentForm, isInputValid } = this.state

    return (
      <FormGroup row className="mt-1">

        <Col xs={12} sm={9}>
          <Input
            className="h-100" type="textarea" name="body" placeholder="Add Comment here..."
            value={commentForm.body} onChange={this.handleInputChange} valid={isInputValid.body}
          />
        </Col>

        <Col xs={12} sm={3}>
          <Input
            className="my-2 mt-sm-0" type="text" name="author" placeholder="Author"
            value={commentForm.author} onChange={this.handleInputChange} valid={isInputValid.author}
          />
          <Button className="w-100" color="outline-success" onClick={this.validateInputValues}>Submit</Button>
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
