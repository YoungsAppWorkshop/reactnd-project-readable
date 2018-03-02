import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import uuidv1 from 'uuid/v1'

import { selectCategory, unselectCategory } from '../actions/categories'
import { addPost, getPosts, initPost } from '../actions/posts'
import FormModal from '../components/modals/FormModal'
import PostsList from '../components/post/PostsList'
import PostsListController from '../components/post/PostsListController'
import ConnectionError from '../components/common/ConnectionError'
import UnexpectedError from '../components/common/UnexpectedError'
import Fetching from '../components/common/Fetching'
import Notification from '../components/common/Notification'
import { ADD_POST } from '../constants/ModalTypes'
import { NO_POST_IN_CATEGORY } from '../constants/NoteTypes'
import { RECENT_POST } from '../constants/PostsOrder'
import { ERROR_CONNECTION_REFUSED, ERROR_UNEXPECTED_ERROR, FETCHING, READY } from '../constants/Status'
import { capitalize, sortPostsBy, validateInputs } from '../utils/helpers'


/**
 * Container Component which represent List View of the app
 */
class ListView extends Component {
  static propTypes = {
    /**
     * The status of AJAX request fetching categories data from API server
     */
    categoryStatus: PropTypes.string.isRequired,
    /**
     * All categories in the app
     */
    categories: PropTypes.array.isRequired,
    /**
     * Redux store dispatch method
     */
    dispatch: PropTypes.func.isRequired,
    /**
     * Posts data for the current category
     */
    posts: PropTypes.object.isRequired,
    /**
     * The status of AJAX request fetching posts data from API server
     */
    postsStatus: PropTypes.string.isRequired,
    /**
     * The path of current category which is part of url
     */
    selectedCategory: PropTypes.string
  }

  // Define state to handle sorting posts, and adding a new post
  state = {
    postsOrder: RECENT_POST,
    isFormModalOpen: false,
    postForm: { title: '', body: '', author: '' },
    isInputValid: { title: null, body: null, author: null }
  }

  // Select Category on component mount
  componentDidMount() {
    const { dispatch, match } = this.props
    const selectedCategory = match.params.category

    dispatch(selectCategory(selectedCategory))
    dispatch(getPosts(selectedCategory))
    // Set adding post form's default category value as selected category
    this.setState({ postForm: { ...this.state.postForm, category: selectedCategory }})
  }

  // Select Category when /:category prop changed
  componentWillReceiveProps(nextProps) {
    const { dispatch, match } = this.props
    const previousCategory = match.params.category
    const nextCategory = nextProps.match.params.category
    if (nextCategory !== previousCategory) {
      dispatch(selectCategory(nextCategory))
      dispatch(getPosts(nextCategory))
      this.setState({ postForm: { ...this.state.postForm, category: nextCategory }})
    }
  }

  // Unselect Category and Initialize posts status when component will unmount
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(unselectCategory())
    dispatch(initPost())
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

    // Check if url's category path is valid
    const isValidCategory = categories.map(category => category.path)
      .includes(selectedCategory)
    // Filter out deleted posts and sort posts (RECENT_POST by default)
    const sortedPosts = Object.values(posts).filter(post => !post.deleted)
      .sort(sortPostsBy[postsOrder].compareFunc)

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

      { postsStatus === ERROR_CONNECTION_REFUSED && ( <ConnectionError /> )}
      { postsStatus === ERROR_UNEXPECTED_ERROR && ( <UnexpectedError /> )}
      { postsStatus === FETCHING && ( <Fetching /> )}
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
