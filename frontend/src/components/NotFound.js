import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import Notification from './common/Notification'
import { NOT_FOUND } from '../constants/NoteTypes'

/**
 *
 * Presentational Component which represent 404 Not Found page
 *
 */
const NotFound = () => (

  <Container className="main">

    <Row>

      <Col sm="12" md={{ size: 8, offset: 2 }} className="mt-5">
        <Notification noteType={NOT_FOUND}/>
      </Col>

    </Row>

  </Container>
)

export default NotFound
