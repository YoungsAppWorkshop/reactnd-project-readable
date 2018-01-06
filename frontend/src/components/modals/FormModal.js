import PropTypes from 'prop-types'
import React from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import { ADD_POST, EDIT_POST } from '../../constants/ModalTypes'
import { capitalize } from '../../utils/helpers'

const MODAL_TITLE = {
  [ADD_POST]: 'Add a New Post',
  [EDIT_POST]: 'Edit Post'
}

const FormModal = ({
    categories, defaultCategory, handleInputChange, handleSubmit,
    isModalOpen, isInputValid, modalType, postForm, toggleModal
}) => (

  <Modal isOpen={isModalOpen} toggle={toggleModal} className="modal-lg">

    <ModalHeader toggle={toggleModal}>{MODAL_TITLE[modalType]}</ModalHeader>

    <ModalBody>

      <Form>

        <FormGroup row>
          <Label sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="text" name="title" placeholder="Post title here..."
              value={postForm.title} onChange={handleInputChange} valid={isInputValid.title}/>
            <FormFeedback>Post title is Required</FormFeedback>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Author</Label>
          <Col sm={10}>
            <Input type="text" name="author" placeholder="Author name"
              value={postForm.author} onChange={handleInputChange}
              valid={isInputValid.author} disabled={modalType === EDIT_POST} />
            <FormFeedback>Author name is Required</FormFeedback>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Category</Label>
          <Col sm={10}>
            <Input type="select" name="category" value={postForm.category}
              onChange={handleInputChange}
              disabled={modalType === EDIT_POST } >
              <option disabled>Categories:</option>
              {categories.map((category) => (
                <option key={category.path} value={category.path}>{ capitalize(category.name) }</option>
              ))}
            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Content</Label>
          <Col sm={10}>
            <Input type="textarea" name="body" rows="10" placeholder="Post Contents Here..."
              value={postForm.body} valid={isInputValid.body} onChange={handleInputChange}/>
          </Col>
        </FormGroup>

      </Form>

    </ModalBody>

    <ModalFooter>
      <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>

  </Modal>
)

FormModal.propTypes = {
  categories: PropTypes.array.isRequired,
  defaultCategory: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  isInputValid: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  postForm: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default FormModal
