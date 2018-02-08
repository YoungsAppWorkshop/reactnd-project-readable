import PropTypes from 'prop-types'
import React from 'react'
import { Col, Button, FormGroup, Input } from 'reactstrap'


/**
 * Comment Edit Form UI shown on edit button click (Presentational Component for Comment)
 */
const CommentEditForm = ({ editFormInput, handleCancel, handleInputChange, handleSubmit, isInputValid }) => (
  <FormGroup row className="my-2">

    <Col xs={12} sm={9}>
      <Input
        className="h-100" type="textarea" name="text" placeholder="Edit Comment..."
        value={editFormInput} valid={isInputValid}
        onChange={handleInputChange}
      />
    </Col>

    <Col xs={12} sm={3}>
      <Button className="my-2 mt-sm-0 w-100" color="outline-success" onClick={handleSubmit}>Edit</Button>
      <Button className="w-100" color="outline-secondary" onClick={handleCancel}>Cancel</Button>
    </Col>

  </FormGroup>
)

CommentEditForm.propTypes = {
  /**
   * User input text for comment body
   */
  editFormInput: PropTypes.string.isRequired,
  /**
   * On cancel button click, close edit form
   */
  handleCancel: PropTypes.func.isRequired,
  /**
   * Handle user input change
   */
  handleInputChange: PropTypes.func.isRequired,
  /**
   * On submit, update the comment
   */
  handleSubmit: PropTypes.func.isRequired,
  /**
   * Comment body should not be blank ''
   */
  isInputValid: PropTypes.bool
}

export default CommentEditForm
