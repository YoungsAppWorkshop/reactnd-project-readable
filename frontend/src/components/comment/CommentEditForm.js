import React from 'react'
import PropTypes from 'prop-types'

import { Col, Button, FormGroup, Input } from 'reactstrap'

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
  editFormInput: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isInputValid: PropTypes.bool
}

export default CommentEditForm
