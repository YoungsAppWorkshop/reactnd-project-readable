import React from 'react'
import Loading from 'react-loading'
import { Col, Row } from 'reactstrap'

/**
 *
 * Presentational Component which shows spinner image when Fetching data
 *
 */
const Fetching = ({ noteType, path }) =>  (
  <Row>
    <Col sm="12" md={{ size: 8, offset: 2 }}>
      <Loading delay={200} type="spin" color="#222" className="mx-auto my-5 py-5"/>
    </Col>
  </Row>
)

export default Fetching
