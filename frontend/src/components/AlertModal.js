import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

Modal.setAppElement('#root')

const AlertModal = ({ closeModal, handleSubmit, isModalOpen }) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    contentLabel="Modal"
  >
    <div>
      <h3>Do You Want to Delete?</h3>
      <button onClick={handleSubmit}>Delete</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  </Modal>
)

AlertModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired
}

export default AlertModal
