import React from 'react'
import PropTypes from 'prop-types'

import { Button, Col, Input, Row } from 'reactstrap'
import FaEdit from'react-icons/lib/fa/edit'

const PostsListController = ({ postsOrder, sortPosts, toggleModal }) => (
  <Row className="my-5">
    <Col lg={{ size: 4, offset: 4 }} xl={{ size: 3, offset: 6 }}>
      <Input type="select" value={postsOrder} onChange={e => sortPosts(e.target.value)}>
        <option value="MOST_RECENT">Recent Post</option>
        <option value="MOST_VOTED">Top Voted</option>
        <option value="TITLE">Post Title</option>
      </Input>
    </Col>
    <Col lg={4} xl={3}>
      <Button color="danger" className="float-right" onClick={toggleModal}><FaEdit size={20}/> &nbsp;Add New Post</Button>
    </Col>
  </Row>
)

PostsListController.propTypes = {
  postsOrder: PropTypes.string.isRequired,
  sortPosts: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
}

export default PostsListController
