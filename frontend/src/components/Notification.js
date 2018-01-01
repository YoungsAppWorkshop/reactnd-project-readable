import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { NO_POST_IN_CATEGORY, POST_DELETED } from '../constants/NoteTypes'
import { Card, CardText, CardTitle } from 'reactstrap'

const TITLE_TEXT = {
  [NO_POST_IN_CATEGORY]: "No Post in this Category",
  [POST_DELETED]: "This post is deleted"
}

const BODY_TEXT = {
  [NO_POST_IN_CATEGORY]: "Add a New Post, and be the First Author.",
  [POST_DELETED]: ">>> Go Back to Category"
}

const Notification = ({ noteType, path }) =>  (
  <Card body className="mt-2">

    <CardTitle className="title">{ TITLE_TEXT[noteType] }</CardTitle>

    <CardText>
      {noteType === NO_POST_IN_CATEGORY && BODY_TEXT[noteType] }
      {noteType === POST_DELETED && (<Link to={`/${path}`}>{BODY_TEXT[noteType]}</Link>)}
    </CardText>

  </Card>
)

Notification.propTypes = {
  noteType: PropTypes.string.isRequired,
  path: PropTypes.string
}

export default Notification
