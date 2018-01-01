import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Col, Container, Row } from 'reactstrap'

import Notification from '../components/Notification'
import { NOT_FOUND } from '../constants/NoteTypes'
import { selectCategory } from '../actions'

class NotFound extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(selectCategory(null))
  }

  render() {

    return (

      <Container className="main">

        <Row>

          <Col sm="12" md={{ size: 8, offset: 2 }} className="mt-5">
            <Notification noteType={NOT_FOUND}/>
          </Col>

        </Row>

      </Container>

    )
  }
}

export default connect()(NotFound)
