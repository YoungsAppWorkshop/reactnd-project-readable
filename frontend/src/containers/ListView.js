import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import uuidv1 from 'uuid/v1'

import { selectCategory, unselectCategory } from '../actions/categories'
import { addPost, getPosts, initPost } from '../actions/posts'
import FormModal from '../components/modals/FormModal'
import PostsList from '../components/post/PostsList'
import PostsListController from '../components/post/PostsListController'
import Notification from '../components/Notification'
import { ADD_POST } from '../constants/ModalTypes'
import { NO_POST_IN_CATEGORY } from '../constants/NoteTypes'
import { MOST_VOTED, RECENT_POST, TITLE } from '../constants/PostsOrder'
import { ERROR_CONNECTION_REFUSED, FETCHING, READY } from '../constants/Status'
import { capitalize, validateInputs } from '../utils/helpers'

// Define compareFunctions for sorting posts list
const SORT_BY = {
  [RECENT_POST]: (post1, post2) => post2.timestamp - post1.timestamp,
  [MOST_VOTED]: (post1, post2) => post2.voteScore - post1.voteScore,
  [TITLE]: (post1, post2) => (
    post1.title.toUpperCase() > post2.title.toUpperCase() ? 1 :
    post1.title.toUpperCase() < post2.title.toUpperCase() ? -1 : 0
  )
}

/**
 *
 * Container Component which represent List View of the app
 *
 */
class ListView extends Component {
  static propTypes = {
    categoryStatus: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    postsStatus: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string
  }

  state = {
    postsOrder: RECENT_POST,
    isFormModalOpen: false,
    postForm: { title: '', body: '', author: '' },
    isInputValid: { title: null, body: null, author: null }
  }

  // Select Category on component mount
  componentDidMount() {
    const selectedCategory = this.props.match.params.category
    this.props.dispatch(selectCategory(selectedCategory))
    this.props.dispatch(getPosts(selectedCategory))
    // Set adding post form's default category value as selected category
    this.setState({ postForm: { ...this.state.postForm, category: selectedCategory }})
  }

  // Select Category when /:category prop changed
  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    const nextCategory = nextProps.match.params.category
    if (nextCategory !== previousCategory) {
      this.props.dispatch(selectCategory(nextCategory))
      this.props.dispatch(getPosts(nextCategory))
      this.setState({ postForm: { ...this.state.postForm, category: nextCategory }})
    }
  }

  // Unselect Category and Initialize posts status when component will unmount
  componentWillUnmount() {
    this.props.dispatch(unselectCategory())
    this.props.dispatch(initPost())
  }

  // Sort Posts list
  sortPosts = (postsOrder) => this.setState({ postsOrder })

  // Open, close Adding post form modal
  toggleFormModal = () => {
    this.setState((prevState) => ({
      isFormModalOpen: !prevState.isFormModalOpen
    }))
  }

  // Handle input change for the form
  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  // When add button clicked, validate input values and call back addPost method
  validateInputValues = () => {
    const formInputs = Object.assign({}, this.state.postForm)
    // Validate text inputs only - post title, author, body
    delete formInputs.category
    // If input is invalid, show warning in the form
    this.setState({ isInputValid: validateInputs(formInputs) }, this.addPost)
  }

  // If all inputs are valid, add the post
  addPost = () => {
    const { isInputValid, postForm } = this.state
    const { categories, dispatch } = this.props

    const isFormValid = Object.values(isInputValid).reduce((a, c) => a && c)
    if (isFormValid) {
      const id = uuidv1()
      const timestamp = Date.now()
      // When user is adding new post in root page, and didn't change the category,
      // postForm.category is undefined. Then set category value as categories[0]
      const newPost = {
        id, timestamp, title: postForm.title, body: postForm.body, author: postForm.author,
        category: postForm.category || categories[0].path
      }
      dispatch(addPost(newPost))
      this.setState({
        postForm: { title: '', body: '', author: '' },
        isFormModalOpen: false
      })
    }
  }

  // Render ListView
  render() {
    const { postsOrder, isFormModalOpen, isInputValid, postForm } = this.state
    const { categories, categoryStatus, posts, postsStatus, selectedCategory } = this.props
    let sortedPosts = Object.values(posts).filter(post => !post.deleted).sort(SORT_BY[postsOrder])
    let isValidCategory = categories.map(category => category.path).includes(selectedCategory)

    // When user typed wrong category name in url, redirect to 404 page
    if (categoryStatus === READY && selectedCategory && !isValidCategory) {
      return ( <Redirect to="/404"/> )
    }

    return (
      <Container className="main">

        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h3 className="category title my-5">
              { selectedCategory ? capitalize(selectedCategory) : 'All Categories'}
            </h3>
          </Col>
        </Row>

      { postsStatus === ERROR_CONNECTION_REFUSED && (
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <p className="text-danger my-auto mx-auto">ERROR_CONNECTION_REFUSED: Connection Refused. Check your Network Connection</p>
          </Col>
        </Row>
      )}

      { postsStatus === FETCHING && (
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Loading delay={200} type="spin" color="#222" className="mx-auto my-5 py-5"/>
          </Col>
        </Row>
      )}

      { postsStatus === READY && (
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>

            <PostsList posts={sortedPosts}/>
            { sortedPosts.length === 0 && <Notification noteType={NO_POST_IN_CATEGORY}/> }

            <PostsListController
              postsOrder={postsOrder}
              toggleModal={this.toggleFormModal}
              sortPosts={this.sortPosts}
            />

            <FormModal
              categories={categories}
              defaultCategory={selectedCategory}
              modalType={ADD_POST}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.validateInputValues}
              isModalOpen={isFormModalOpen}
              isInputValid={isInputValid}
              postForm={postForm}
              toggleModal={this.toggleFormModal}
            />

          </Col>
        </Row>
      )}

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.items,
  categoryStatus: state.categories.status,
  selectedCategory: state.categories.selectedCategory,
  posts: state.posts.items,
  postsStatus: state.posts.status
})

export default connect(
  mapStateToProps
)(ListView)
