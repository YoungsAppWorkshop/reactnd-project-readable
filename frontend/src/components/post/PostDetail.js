import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/helpers'

import AlertModal from '../modals/AlertModal'
import FormModal from '../modals/FormModal'
import { DELETE_POST, EDIT_POST } from '../../constants/ModalTypes'

import { Button, ButtonGroup } from 'reactstrap'
import FaTrash from 'react-icons/lib/fa/trash'
import FaEdit from'react-icons/lib/fa/edit'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaCommentO from 'react-icons/lib/fa/comment-o'

const PostDetail = ({
  categories, downVotePost, handleAlertModalSubmit, handleInputChange, handleFormModalSubmit, isAlertModalOpen,
  isFormModalOpen, isInputValid, post, postForm, toggleAlertModal, toggleFormModal, upVotePost
}) => (

  <section className="post-detail">

    <h3 className="post-detail-title title mt-5"> {post.title} </h3>

    <h6 className="post-detail-subtitle mt-3 mb-4">
      <strong>{post.author}</strong>&nbsp;|&nbsp;{ formatDate(post.timestamp) }&nbsp;&nbsp;
      { post.commentCount > 0 && <span className="text-info mr-2"><FaCommentO size={15}/> {post.commentCount}</span> }
      { post.voteScore > 0 && <span className="text-success"><FaThumbsOUp size={15}/> {post.voteScore}</span> }
      { post.voteScore < 0 && <span className="text-danger"><FaThumbsODown size={15}/> {post.voteScore}</span> }
    </h6>

    <div className="post-detail-body text-justify">{post.body}</div>

    <ButtonGroup className="post-detail-small-btn-group">
      <Button className="px-2" color="outline-success" onClick={upVotePost}><FaThumbsOUp size={15}/></Button>{' '}
      <Button className="px-2" color="outline-danger" onClick={downVotePost}><FaThumbsODown size={15}/></Button>
    </ButtonGroup>

    <div className="post-detail-buttons clearfix my-5">
      <Button color="outline-danger" className="float-right" onClick={toggleAlertModal}><FaTrash size={20}/> &nbsp;Delete</Button>
      <Button color="outline-success" className="float-right mr-2" onClick={toggleFormModal}><FaEdit size={20}/> &nbsp; &nbsp;Edit &nbsp;</Button>
    </div>

    <FormModal
      categories={categories}
      defaultCategory={post.category}
      handleInputChange={handleInputChange}
      handleSubmit={handleFormModalSubmit}
      isModalOpen={isFormModalOpen}
      isInputValid={isInputValid}
      modalType={EDIT_POST}
      postForm={postForm}
      toggleModal={toggleFormModal}
    />

    <AlertModal
      handleSubmit={handleAlertModalSubmit}
      isModalOpen={isAlertModalOpen}
      modalType={DELETE_POST}
      toggleModal={toggleAlertModal}
    />

  </section>

)

PostDetail.propTypes = {
  categories: PropTypes.array.isRequired,
  downVotePost: PropTypes.func.isRequired,
  handleAlertModalSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleFormModalSubmit: PropTypes.func.isRequired,
  isAlertModalOpen: PropTypes.bool.isRequired,
  isFormModalOpen: PropTypes.bool.isRequired,
  isInputValid: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  postForm: PropTypes.object.isRequired,
  toggleAlertModal: PropTypes.func.isRequired,
  toggleFormModal: PropTypes.func.isRequired,
  upVotePost: PropTypes.func.isRequired
}

export default PostDetail
