import PropTypes from 'prop-types'
import React from 'react'
import FaEdit from'react-icons/lib/fa/edit'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaTrash from 'react-icons/lib/fa/trash'
import { Card, Button, CardText, CardSubtitle, ButtonGroup } from 'reactstrap'

import AlertModal from '../modals/AlertModal'
import { DELETE_COMMENT } from '../../constants/ModalTypes'
import { formatDate } from '../../utils/helpers'


/**
 * Comment List Item Layout (Presentational Component for Comment)
 */
const CommentListItem = ({
  comment, downVoteComment, handleAlertModalSubmit,
  isAlertModalOpen, toggleAlertModal, toggleEditable, upVoteComment
}) => (

  <Card body className="comments-list-item mt-2 p-3">

    <CardText className="title mb-2">
      {comment.body}
    </CardText>

    <CardSubtitle>
      <small>
        <strong>{comment.author}</strong>&nbsp;|&nbsp;{ formatDate(comment.timestamp) }&nbsp; &nbsp;
        { comment.voteScore > 0 && <span className="text-success"><FaThumbsOUp size={15}/> {comment.voteScore}</span> }
        { comment.voteScore < 0 && <span className="text-danger"><FaThumbsODown size={15}/> {comment.voteScore}</span> }
      </small>
    </CardSubtitle>

    <ButtonGroup className="comments-list-item-btn-group">
      <Button className="comments-list-item-btn px-1" color="link" onClick={toggleEditable}><FaEdit size={15}/></Button>{' '}
      <Button className="comments-list-item-btn px-1" color="link" onClick={toggleAlertModal}><FaTrash size={15}/></Button>{' '}
      <Button className="comments-list-item-btn px-1" color="link" onClick={upVoteComment}><FaThumbsOUp size={15}/></Button>{' '}
      <Button className="comments-list-item-btn px-1" color="link" onClick={downVoteComment}><FaThumbsODown size={15}/></Button>
    </ButtonGroup>

    <AlertModal
      handleSubmit={handleAlertModalSubmit}
      isModalOpen={isAlertModalOpen}
      modalType={DELETE_COMMENT}
      toggleModal={toggleAlertModal}
    />

  </Card>
)

CommentListItem.propTypes = {
  /**
   * A Comment object
   */
  comment: PropTypes.object.isRequired,
  /**
   * Dispatch downVoteComment action
   */
  downVoteComment: PropTypes.func.isRequired,
  /**
   * Dispatch deleteComment action
   */
  handleAlertModalSubmit: PropTypes.func.isRequired,
  /**
   * A flag variable which represents if alert modal is open
   */
  isAlertModalOpen: PropTypes.bool.isRequired,
  /**
   * Open/Close alert modal
   */
  toggleAlertModal: PropTypes.func.isRequired,
  /**
   * Show/Hide CommentEditForm
   */
  toggleEditable: PropTypes.func.isRequired,
  /**
   * Dispatch upVoteComment action
   */
  upVoteComment: PropTypes.func.isRequired
}

export default CommentListItem
