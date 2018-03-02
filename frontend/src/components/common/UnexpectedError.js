import React from 'react'
import { Col, Row } from 'reactstrap'


/**
 * Presentational Component which shows Internal Server Error Message
 */
const UnexpectedError = () =>  (
  <Row>
    <Col sm="12" md={{ size: 8, offset: 2 }}>
      <p className="text-danger my-auto mx-auto">Unexpected Error occured. Please Try Later</p>
    </Col>
  </Row>
)

export default UnexpectedError
