import React from 'react'
import PropTypes from 'prop-types'

import { Col, Button, FormGroup, Input } from 'reactstrap'

const CommentEditForm = ({ editFormInput, handleInputChange, handleSubmit, toggleEditable }) => (
  <FormGroup row className="mt-3">
    <Col xs={12} sm={9}>
      <Input
        className="h-100" type="textarea" name="text" placeholder="Edit Comment..."
        value={editFormInput}
        onChange={handleInputChange}
      />
    </Col>
    <Col xs={12} sm={3}>
      <Button className="my-2 mt-sm-0 w-100" color="outline-success" onClick={handleSubmit}>Edit</Button>
      <Button className="w-100" color="outline-secondary" onClick={toggleEditable}>Cancel</Button>
    </Col>
  </FormGroup>
)

CommentEditForm.propTypes = {
  editFormInput: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleEditable: PropTypes.func.isRequired
}

export default CommentEditForm
