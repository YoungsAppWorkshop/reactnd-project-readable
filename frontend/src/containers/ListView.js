import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'
import { Col, Container, Row } from 'reactstrap'
import Loading from 'react-loading'

import Notification from '../components/Notification'
import PostsListController from '../components/post/PostsListController'
import PostsList from '../components/post/PostsList'
import FormModal from '../components/modals/FormModal'
import { ADD_POST } from '../constants/ModalTypes'
import { NO_POST_IN_CATEGORY } from '../constants/NoteTypes'
import { MOST_VOTED, RECENT_POST, TITLE } from '../constants/PostsOrder'
import { ERROR_CONNECTION_REFUSED, FETCHING, READY } from '../constants/Status'
import { addPost, getPosts, initPost, selectCategory, unselectCategory } from '../actions'
import { capitalize, validateInputs } from '../utils/helpers'

const SORT_BY = {
  [RECENT_POST]: (post1, post2) => post2.timestamp - post1.timestamp,
  [MOST_VOTED]: (post1, post2) => post2.voteScore - post1.voteScore,
  [TITLE]: (post1, post2) => (
    post1.title.toUpperCase() > post2.title.toUpperCase() ? 1 :
    post1.title.toUpperCase() < post2.title.toUpperCase() ? -1 : 0
  )
}

class ListView extends Component {
  static propTypes = {
    categoryStatus: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    postsStatus: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string
  }

  state = {
    postsOrder: RECENT_POST,
    isFormModalOpen: false,
    postForm: { title: '', body: '', author: '' },
    isInputValid: { title: null, body: null, author: null }
  }

  componentDidMount() {
    const selectedCategory = this.props.match.params.category
    this.props.dispatch(selectCategory(selectedCategory))
    this.props.dispatch(getPosts(selectedCategory))
    this.setState({ postForm: { ...this.state.postForm, category: selectedCategory }})
  }

  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    const nextCategory = nextProps.match.params.category
    if (nextCategory !== previousCategory) {
      this.props.dispatch(selectCategory(nextCategory))
      this.props.dispatch(getPosts(nextCategory))
      this.setState({ postForm: { ...this.state.postForm, category: nextCategory }})
    }
  }

  componentWillUnmount() {
    this.props.dispatch(unselectCategory())
    this.props.dispatch(initPost())
  }

  sortPosts = (postsOrder) => this.setState({ postsOrder })

  toggleFormModal = () => {
    this.setState((prevState) => ({
      isFormModalOpen: !prevState.isFormModalOpen
    }))
  }

  handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    this.setState({ postForm: { ...this.state.postForm, [key]: value }})
  }

  validateInputValues = () => {
    const formInputs = Object.assign({}, this.state.postForm)
    delete formInputs.category
    const isInputValid = validateInputs(formInputs)
    this.setState({ isInputValid }, this.addPost)
  }

  addPost = () => {
    const { isInputValid, postForm } = this.state
    const { categories, dispatch } = this.props

    const isFormValid = Object.values(isInputValid).reduce((a, c) => a && c)
    if (isFormValid) {
      const id = uuidv1()
      const timestamp = Date.now()
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

  render() {
    const { postsOrder, isFormModalOpen, isInputValid, postForm } = this.state
    const { categories, categoryStatus, posts, postsStatus, selectedCategory } = this.props
    let sortedPosts = Array.from(posts).filter(post => !post.deleted).sort(SORT_BY[postsOrder])
    let isValidCategory = categories.map(category => category.path).includes(selectedCategory)

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
  posts: Object.values(state.posts.items),
  postsStatus: state.posts.status
})

export default connect(
  mapStateToProps
)(ListView)
