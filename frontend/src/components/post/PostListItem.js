import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/helpers'

import AlertModal from '../modals/AlertModal'
import PostModal from '../modals/PostModal'
import { DELETE_POST, EDIT_POST } from '../../constants/ModalTypes'

import { Card, Button, CardTitle, CardSubtitle, ButtonGroup } from 'reactstrap'
import FaTrash from 'react-icons/lib/fa/trash'
import FaEdit from'react-icons/lib/fa/edit'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaCommentO from 'react-icons/lib/fa/comment-o'

const PostListItem = ({
  categories, downVotePost, handleAlertModalSubmit, handleInputChange, handlePostModalSubmit,
  isAlertModalOpen, isPostModalOpen, post, postForm, toggleAlertModal, togglePostModal, upVotePost
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
      <Button className="px-1" color="link" onClick={togglePostModal}><FaEdit size={15}/></Button>{' '}
      <Button className="px-1" color="link" onClick={toggleAlertModal}><FaTrash size={15}/></Button>{' '}
      <Button className="px-1" color="link" onClick={upVotePost}><FaThumbsOUp size={15}/></Button>{' '}
      <Button className="px-1" color="link" onClick={downVotePost}><FaThumbsODown size={15}/></Button>
    </ButtonGroup>

    <PostModal
      categories={categories}
      defaultCategory={post.category}
      handleInputChange={handleInputChange}
      handleSubmit={handlePostModalSubmit}
      isModalOpen={isPostModalOpen}
      modalType={EDIT_POST}
      postForm={postForm}
      toggleModal={togglePostModal}
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
  handlePostModalSubmit: PropTypes.func.isRequired,
  isAlertModalOpen: PropTypes.bool.isRequired,
  isPostModalOpen: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  postForm: PropTypes.object.isRequired,
  toggleAlertModal: PropTypes.func.isRequired,
  togglePostModal: PropTypes.func.isRequired,
  upVotePost: PropTypes.func.isRequired
}

export default PostListItem
