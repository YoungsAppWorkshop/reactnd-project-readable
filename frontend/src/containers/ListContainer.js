import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import PostSortSelector from '../components/PostSortSelector'
import PostsList from '../components/PostsList'
import PostModal from '../components/PostModal'
import { selectCategory, fetchPosts, addPost } from '../actions'
import * as API from '../utils/api'

const SORT_BY = {
  'MOST_RECENT': (post1, post2) => post2.timestamp - post1.timestamp,
  'MOST_VOTED': (post1, post2) => post2.voteScore - post1.voteScore,
  'TITLE': (post1, post2) => (
    post1.title.toUpperCase() > post2.title.toUpperCase() ? 1 :
    post1.title.toUpperCase() < post2.title.toUpperCase() ? -1 : 0
  )
}

class ListContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    postsOrder: 'MOST_RECENT',
    isModalOpen: false,
    postForm: { title: '', body: '', author: '' }
  }

  componentDidMount() {
    const selectedCategory = this.props.match.params.category
    this.props.dispatch(selectCategory(selectedCategory))
    this.props.dispatch(fetchPosts(selectedCategory))
  }

  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    if (nextProps.match.params.category !== previousCategory) {
      this.props.dispatch(selectCategory(nextProps.match.params.category))
      this.props.dispatch(fetchPosts(nextProps.match.params.category))
    }
  }

  sortPosts = (postsOrder) => this.setState({ postsOrder })

  openModal = () => this.setState({ isModalOpen: true })
  closeModal = () => this.setState({ isModalOpen: false })

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
      body: postForm.body, author: postForm.author,
      category, voteScore: 1, deleted: false, commentCount: 0
    }

    dispatch(addPost(newPost))
    API.addPost(newPost)
    this.setState({ postForm: { title: '', body: '', author: '' }})
  }

  render() {
    const { postsOrder, isModalOpen, postForm } = this.state
    const { selectedCategory, categories, posts } = this.props
    let sortedPosts = Array.from(posts).sort(SORT_BY[postsOrder])

    return (
      <div>
        <PostSortSelector postsOrder={postsOrder} sortPosts={this.sortPosts} />
        <PostsList posts={sortedPosts}/>
        <button onClick={this.openModal}>Add a New Post</button>

        <PostModal
          categories={categories}
          closeModal={this.closeModal}
          defaultCategory={selectedCategory}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          isModalOpen={isModalOpen}
          postForm={postForm}
          selectRef={el => this.categorySelector = el }
        />
      </div>
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
)(ListContainer)
