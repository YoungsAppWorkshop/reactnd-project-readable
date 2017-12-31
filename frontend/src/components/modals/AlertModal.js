import React from 'react'
import PropTypes from 'prop-types'
import { DELETE_COMMENT, DELETE_POST } from '../../constants/ModalTypes'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const BODY_TEXT = {
  [DELETE_COMMENT]: "Do you really want to DELETE the comment?",
  [DELETE_POST]: "Do you really want to DELETE the post?"
}

const AlertModal = ({ handleSubmit, isModalOpen, modalType, toggleModal }) => (
  <Modal isOpen={isModalOpen} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>Warning</ModalHeader>
    <ModalBody> { BODY_TEXT[modalType] } <br/> It cannot be undone.</ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={handleSubmit}>Delete</Button>{' '}
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
)

AlertModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default AlertModal
