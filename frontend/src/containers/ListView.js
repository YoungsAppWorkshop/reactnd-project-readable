import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import { Col, Container, Row } from 'reactstrap'
import PostsListController from '../components/post/PostsListController'
import PostsList from '../components/post/PostsList'
import PostModal from '../components/modals/PostModal'
import { ADD_POST } from '../constants/ModalTypes'
import { selectCategory, getPosts, addPost } from '../actions'
import { capitalize } from '../utils/helpers'

const SORT_BY = {
  'MOST_RECENT': (post1, post2) => post2.timestamp - post1.timestamp,
  'MOST_VOTED': (post1, post2) => post2.voteScore - post1.voteScore,
  'TITLE': (post1, post2) => (
    post1.title.toUpperCase() > post2.title.toUpperCase() ? 1 :
    post1.title.toUpperCase() < post2.title.toUpperCase() ? -1 : 0
  )
}

class ListView extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    postsOrder: 'MOST_RECENT',
    isPostModalOpen: false,
    postForm: { title: '', body: '', author: '' }
  }

  componentDidMount() {
    const selectedCategory = this.props.match.params.category
    this.props.dispatch(selectCategory(selectedCategory))
    this.props.dispatch(getPosts(selectedCategory))
  }

  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    if (nextProps.match.params.category !== previousCategory) {
      this.props.dispatch(selectCategory(nextProps.match.params.category))
      this.props.dispatch(getPosts(nextProps.match.params.category))
    }
  }

  sortPosts = (postsOrder) => this.setState({ postsOrder })

  togglePostModal = () => {
    this.setState((prevState) => ({
      isPostModalOpen: !prevState.isPostModalOpen
    }))
  }

  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  handleSubmit = () => {
    const { postForm } = this.state
    const { dispatch } = this.props

    const id = uuidv1()
    const timestamp = Date.now()
    const category = this.categorySelector.value
    const newPost = {
      id, timestamp, title: postForm.title,
      body: postForm.body, author: postForm.author, category
    }
    dispatch(addPost(newPost))
    this.setState({
      postForm: { title: '', body: '', author: '' },
      isPostModalOpen: false
    })
  }

  render() {
    const { postsOrder, isPostModalOpen, postForm } = this.state
    const { selectedCategory, categories, posts } = this.props
    let sortedPosts = Array.from(posts).filter(post => !post.deleted).sort(SORT_BY[postsOrder])

    return (
      <Container className="main">
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h3 className="category title my-5">
              { selectedCategory ? capitalize(selectedCategory) : 'All Categories'}
            </h3>

            <PostsList posts={sortedPosts}/>

            <PostsListController
              postsOrder={postsOrder}
              toggleModal={this.togglePostModal}
              sortPosts={this.sortPosts}
            />

            <PostModal
              categories={categories}
              defaultCategory={selectedCategory}
              modalType={ADD_POST}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              isModalOpen={isPostModalOpen}
              postForm={postForm}
              selectRef={el => this.categorySelector = el }
              toggleModal={this.togglePostModal}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  selectedCategory: state.categories.selectedCategory,
  isFetching: state.posts.isFetching,
  posts: Object.values(state.posts.items)
})

export default connect(
  mapStateToProps
)(ListView)
