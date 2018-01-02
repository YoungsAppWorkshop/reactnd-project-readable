import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import Notification from './Notification'
import { NOT_FOUND } from '../constants/NoteTypes'

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
