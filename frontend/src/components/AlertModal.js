import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

Modal.setAppElement('#root')

const AlertModal = ({ closeAlertModal, deletePost, isAlertModalOpen }) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={isAlertModalOpen}
    onRequestClose={closeAlertModal}
    contentLabel="Modal"
  >
    <div>
      <h3>Do You Want to Delete the Post?</h3>
      <button onClick={deletePost}>Delete</button>
      <button onClick={closeAlertModal}>Cancel</button>
    </div>
  </Modal>
)

AlertModal.propTypes = {
  closeAlertModal: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  isAlertModalOpen: PropTypes.bool.isRequired
}

export default AlertModal
