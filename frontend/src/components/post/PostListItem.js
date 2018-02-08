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


/**
 * Post Content Layout for List view (Presentational Component for Post)
 */
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
  /**
   * All categories in the app
   */
  categories: PropTypes.array.isRequired,
  /**
   * Dispatch downVotePost action
   */
  downVotePost: PropTypes.func.isRequired,
  /**
   * Dispatch deletePost action
   */
  handleAlertModalSubmit: PropTypes.func.isRequired,
  /**
   * Handle user input change
   */
  handleInputChange: PropTypes.func.isRequired,
  /**
   * Dispatch updatePost action
   */
  handleFormModalSubmit: PropTypes.func.isRequired,
  /**
   * A flag variable which represents if alert modal is open
   */
  isAlertModalOpen: PropTypes.bool.isRequired,
  /**
   * A flag variable which represents if form modal is open
   */
  isFormModalOpen: PropTypes.bool.isRequired,
  /**
   * Post title, author, and body should not be blank ''
   */
  isInputValid: PropTypes.object.isRequired,
  /**
   * A post object
   */
  post: PropTypes.object.isRequired,
  /**
   * User input object
   */
  postForm: PropTypes.object.isRequired,
  /**
   * Open/Close alert modal
   */
  toggleAlertModal: PropTypes.func.isRequired,
  /**
   * Open/Close form modal
   */
  toggleFormModal: PropTypes.func.isRequired,
  /**
   * Dispatch upvotePost action
   */
  upVotePost: PropTypes.func.isRequired
}

export default PostListItem
