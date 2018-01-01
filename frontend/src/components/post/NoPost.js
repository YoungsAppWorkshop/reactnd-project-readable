import React from 'react'
import { Card, CardText, CardTitle } from 'reactstrap'

const NoPost = () => (

  <Card body className="mt-2">

    <CardTitle className="title">
      No Post in this Category
    </CardTitle>

    <CardText>
      <li>Add a New Post</li>
      <li>Be the first author in this Category</li>
    </CardText>

  </Card>
)

export default NoPost
