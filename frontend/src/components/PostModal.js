import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { EDIT_POST } from '../constants/FormTypes'

Modal.setAppElement('#root')

const PostModal = ({
    categories, closePostModal, defaultCategory, formType, handleInputChange,
    handleSubmit, isPostModalOpen, postForm, selectRef
  }) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={isPostModalOpen}
    onRequestClose={closePostModal}
    contentLabel="Modal"
  >
    <div>
      <p>This is Modal</p>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={postForm.title}
        onChange={handleInputChange}
      />
      <input
        name="author"
        type="text"
        placeholder="Author"
        value={postForm.author}
        onChange={handleInputChange}
        disabled={formType === EDIT_POST }
      />
      <select
        name="category"
        defaultValue={defaultCategory}
        onChange={handleInputChange}
        ref={selectRef}
        disabled={formType === EDIT_POST }
      >
        {categories.map((category) => (
          <option key={category.path} value={category.name}>{category.name}</option>
        ))}
      </select>
      <br/>
      <textarea
        name="body"
        rows="10" cols="60"
        placeholder="Post Contents Here..."
        value={postForm.body}
        onChange={handleInputChange}
      />
      <br/>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={closePostModal}>Close</button>
    </div>
  </Modal>
)

PostModal.propTypes = {
  categories: PropTypes.array.isRequired,
  closePostModal: PropTypes.func.isRequired,
  defaultCategory: PropTypes.string,
  formType: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isPostModalOpen: PropTypes.bool.isRequired,
  postForm: PropTypes.object.isRequired,
  selectRef: PropTypes.func.isRequired
}

export default PostModal
