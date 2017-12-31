import React from 'react'
import PropTypes from 'prop-types'
import { ADD_POST, EDIT_POST } from '../../constants/ModalTypes'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { capitalize } from '../../utils/helpers'

const MODAL_TITLE = {
  [ADD_POST]: 'Add a New Post',
  [EDIT_POST]: 'Edit Post'
}

const PostModal = ({
    categories, defaultCategory, handleInputChange, handleSubmit,
    isModalOpen, modalType, postForm, toggleModal
}) => (

  <Modal isOpen={isModalOpen} toggle={toggleModal} className="modal-lg">

    <ModalHeader toggle={toggleModal}>{MODAL_TITLE[modalType]}</ModalHeader>

    <ModalBody>

      <Form>

        <FormGroup row>
          <Label sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="text" name="title" placeholder="Post title here..."
              value={postForm.title} onChange={handleInputChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Author</Label>
          <Col sm={10}>
            <Input type="text" name="author" placeholder="Author name"
              value={postForm.author} onChange={handleInputChange}
              disabled={modalType === EDIT_POST} />
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
              value={postForm.body} onChange={handleInputChange}/>
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

PostModal.propTypes = {
  categories: PropTypes.array.isRequired,
  defaultCategory: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  postForm: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default PostModal
