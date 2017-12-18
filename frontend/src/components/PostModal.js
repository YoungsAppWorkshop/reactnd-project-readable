import React, { Component } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

Modal.setAppElement('#root')

export default class PostModal extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
    defaultCategory: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    postForm: PropTypes.object.isRequired
  }

  render() {
    const { categories, selectRef, closeModal, defaultCategory, handleInputChange, handleSubmit, isModalOpen, postForm } = this.props

    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <div>
          <p>Add a New Post</p>
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
          />
          <select
            name="category"
            defaultValue={defaultCategory}
            onChange={handleInputChange}
            ref={selectRef}
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
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    )
  }
}
