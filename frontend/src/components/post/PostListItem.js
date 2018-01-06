import PropTypes from 'prop-types'
import React from 'react'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaEdit from'react-icons/lib/fa/edit'
import FaTrash from 'react-icons/lib/fa/trash'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import { Link } from 'react-router-dom'
import { Card, Button, CardTitle, CardSubtitle, ButtonGroup } from 'reactstrap'

import AlertModal from '../modals/AlertModal'
import FormModal from '../modals/FormModal'
import { DELETE_POST, EDIT_POST } from '../../constants/ModalTypes'
import { formatDate } from '../../utils/helpers'

const PostListItem = ({
  categories, downVotePost, handleAlertModalSubmit, handleInputChange, handleFormModalSubmit, isAlertModalOpen,
  isFormModalOpen, isInputValid, post, postForm, toggleAlertModal, toggleFormModal, upVotePost
}) => (

  <Card body className="posts-list-item mt-2">

    <CardTitle className="posts-list-item-title title">
      <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
    </CardTitle>

    <CardSubtitle className="posts-list-item-subtitle">
      <small>
        <strong>{post.author}</strong>&nbsp;|&nbsp;{ formatDate(post.timestamp) }&nbsp; &nbsp;
        { post.commentCount > 0 && <span className="text-info mr-2"><FaCommentO size={15}/> {post.commentCount}</span> }
        { post.voteScore > 0 && <span className="text-success"><FaThumbsOUp size={15}/> {post.voteScore}</span> }
        { post.voteScore < 0 && <span className="text-danger"><FaThumbsODown size={15}/> {post.voteScore}</span> }
      </small>
    </CardSubtitle>

    <ButtonGroup className="posts-list-item-btn-group">
      <Button className="px-1" color="link" onClick={toggleFormModal}><FaEdit size={15}/></Button>{' '}
      <Button className="px-1" color="link" onClick={toggleAlertModal}><FaTrash size={15}/></Button>{' '}
      <Button className="px-1" color="link" onClick={upVotePost}><FaThumbsOUp size={15}/></Button>{' '}
      <Button className="px-1" color="link" onClick={downVotePost}><FaThumbsODown size={15}/></Button>
    </ButtonGroup>

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

  </Card>
)

PostListItem.propTypes = {
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

export default PostListItem
