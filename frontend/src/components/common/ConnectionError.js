import React from 'react'
import { Col, Row } from 'reactstrap'

/**
 *
 * Presentational Component which shows Connection Error Message
 *
 */
const ConnectionError = ({ noteType, path }) =>  (
  <Row>
    <Col sm="12" md={{ size: 8, offset: 2 }}>
      <p className="text-danger my-auto mx-auto">ERROR_CONNECTION_REFUSED: Connection Refused. Check your Network Connection</p>
    </Col>
  </Row>
)

export default ConnectionError
